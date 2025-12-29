import { NextResponse } from 'next/server';
import { sendPdfEmail } from '@/lib/email';
import { initDatabase, saveSubscriber } from '@/lib/db';
import fs from 'node:fs/promises';
import path from 'node:path';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email: string | undefined = body?.email;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ success: false, error: 'Invalid email' }, { status: 400 });
    }

    // Ensure database table exists
    await initDatabase();

    // Locate PDF from public folder
    const pdfRelPath = process.env.SUBSCRIPTION_PDF_PATH || 'insights.pdf';
    const pdfPath = path.join(process.cwd(), 'public', pdfRelPath);

    const pdfBuffer = await fs.readFile(pdfPath).catch(() => null);
    if (!pdfBuffer) {
      // Save subscriber even if email fails
      await saveSubscriber(email, false);
      return NextResponse.json({ success: false, error: 'PDF file not found on server' }, { status: 500 });
    }

    const pdfBase64 = pdfBuffer.toString('base64');

    const subject = 'Your Insights PDF – LumeWave Digital';
    const html = `
      <div style="font-family: Inter, Arial, sans-serif; color: #001f3f; line-height: 1.6;">
        <p style="margin: 0 0 16px">Hi,</p>
        <p style="margin: 0 0 16px">You're now subscribed to receive occasional insights on building clarity, inbound systems, and automation.</p>
        <p style="margin: 0 0 16px">These are short notes based on what we see while building real growth systems — no noise, no spam.</p>
        <p style="margin: 0 0 16px">You'll hear from us occasionally. Until then, feel free to explore the site or reach out if something feels stuck.</p>
        <p style="margin: 0 0 6px">— Chirag</p>
        <p style="margin: 0; font-weight: 500;">LumeWave Digital</p>
      </div>
    `;

    const result = await sendPdfEmail({
      to: email,
      subject,
      html,
      pdfFilename: path.basename(pdfRelPath),
      pdfBase64Content: pdfBase64,
    });

    // Save to database with email status
    const emailSent = !result.error;
    await saveSubscriber(email, emailSent);

    if (result.error) {
      return NextResponse.json({ success: false, error: result.error?.message || 'Email send failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Subscription email error:', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
