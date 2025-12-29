import { NextRequest, NextResponse } from 'next/server';
import { initDatabase, listInsightsCampaigns, listSubscribersForCampaign, markCampaignRun, recordSendLog, type InsightsCampaign } from '@/lib/db';
import { sendInsightsEmail } from '@/lib/email';

function isDue(c: InsightsCampaign, now: Date) {
  if (!c.active) return false;
  if (c.schedule_type === 'one_time') {
    if (!c.send_at) return false;
    const ran = !!c.last_run_at;
    return !ran && now >= new Date(c.send_at);
  }
  if (c.schedule_type === 'recurring') {
    const every = c.every_days || 0;
    if (every <= 0) return false;
    const last = c.last_run_at ? new Date(c.last_run_at) : null;
    if (!last) return true;
    const next = new Date(last.getTime());
    next.setDate(next.getDate() + every);
    return now >= next;
  }
  if (c.schedule_type === 'drip') {
    return (c.drip_days || 0) > 0;
  }
  return false;
}

export async function POST(req: NextRequest) {
  try {
    await initDatabase();

    const body = await req.json().catch(() => ({}));
    const onlyId = (body?.campaignId as number | undefined) ?? undefined;
    const now = new Date();

    const all = await listInsightsCampaigns();
    const targets = all.filter((c) => (onlyId ? c.id === onlyId : true)).filter((c) => isDue(c, now));

    for (const c of targets) {
      const subscribers = await listSubscribersForCampaign(c);
      console.log(`[Insights] Campaign ${c.id} targeting ${subscribers.length} subscribers`);
      for (const s of subscribers) {
        try {
          console.log(`[Insights] Sending to ${s.email}...`);
          await sendInsightsEmail({
            to: s.email,
            subject: c.subject,
            html: c.html ?? undefined,
            text: c.text ?? undefined,
            attachmentFilename: c.attachment_filename ?? undefined,
            attachmentBase64: c.attachment_base64 ?? undefined,
          });
          console.log(`[Insights] Sent to ${s.email}`);
          await recordSendLog(c.id, s.email, 'sent');
        } catch (e: any) {
          console.error(`[Insights] Failed to send to ${s.email}:`, e?.message);
          await recordSendLog(c.id, s.email, 'failed', e?.message);
        }
      }
      if (c.schedule_type !== 'drip') {
        await markCampaignRun(c.id);
      }
    }

    return NextResponse.json({ success: true, processed: targets.map((t) => t.id) });
  } catch (error) {
    console.error('Insights run error:', error);
    return NextResponse.json({ error: 'Failed to run insights' }, { status: 500 });
  }
}
