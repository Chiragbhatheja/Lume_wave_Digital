"use client";

import { useEffect, useState } from 'react';

type Campaign = {
  id?: number;
  name: string;
  subject: string;
  html?: string;
  text?: string;
  attachment_filename?: string | null;
  attachment_base64?: string | null;
  schedule_type: 'one_time' | 'recurring' | 'drip';
  send_at?: string | null;
  every_days?: number | null;
  drip_days?: number | null;
  active?: boolean;
};

export default function InsightsAdminPage() {
  const [list, setList] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Campaign>({ name: '', subject: '', schedule_type: 'one_time' });

  const load = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/insights/campaigns', { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to load');
      setList(data.campaigns || []);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onFile = async (file: File) => {
    const buf = await file.arrayBuffer();
    const b64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
    setForm((f) => ({ ...f, attachment_filename: file.name, attachment_base64: b64 }));
  };

  const save = async () => {
    try {
      setSaving(true);
      setError(null);
      const res = await fetch('/api/insights/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to save');
      setForm({ name: '', subject: '', schedule_type: 'one_time' });
      load();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  const runNow = async (id?: number) => {
    try {
      const res = await fetch('/api/insights/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id ? { campaignId: id } : {}),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Run failed');
      load();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'An error occurred');
    }
  };

  const edit = (c: Campaign) => {
    setForm({
      id: c.id,
      name: c.name,
      subject: c.subject,
      html: c.html,
      text: c.text,
      attachment_filename: c.attachment_filename ?? null,
      attachment_base64: c.attachment_base64 ?? null,
      schedule_type: c.schedule_type,
      send_at: c.send_at || null,
      every_days: c.every_days || null,
      drip_days: c.drip_days || null,
      active: c.active,
    });
  };

  const viewLogs = async (id?: number) => {
    if (!id) return;
    try {
      const res = await fetch(`/api/insights/logs?campaignId=${id}`, { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to fetch logs');
      alert(
        (data.logs || [])
          .slice(0, 20)
          .map((l: Record<string, unknown>) => `${l.sent_at} - ${l.email} - ${l.status}${l.error ? ' (' + l.error + ')' : ''}`)
          .join('\n') || 'No logs yet'
      );
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'An error occurred');
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-poppins text-4xl font-bold text-[#001f3f] mb-2">Insights</h1>
        <p className="font-inter text-[#003366]">Create campaigns and schedule automated sends to subscribers</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm font-inter mb-4">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="bg-white rounded-xl border border-[#e8f1f7] p-5">
          <h2 className="font-poppins text-xl font-semibold text-[#001f3f] mb-4">New Campaign</h2>
          <div className="space-y-3">
            <input className="w-full border border-[#e8f1f7] rounded-md px-3 py-2" placeholder="Name" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="w-full border border-[#e8f1f7] rounded-md px-3 py-2" placeholder="Subject" value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })} />
            <textarea className="w-full border border-[#e8f1f7] rounded-md px-3 py-2" placeholder="HTML (optional)" rows={6} value={form.html || ''}
              onChange={(e) => setForm({ ...form, html: e.target.value })} />
            <textarea className="w-full border border-[#e8f1f7] rounded-md px-3 py-2" placeholder="Text (optional)" rows={4} value={form.text || ''}
              onChange={(e) => setForm({ ...form, text: e.target.value })} />

            <div>
              <label className="font-inter text-sm text-[#003366] mb-1 block">Attachment (PDF optional)</label>
              <input type="file" accept="application/pdf" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
              {form.attachment_filename && (
                <p className="text-xs text-[#00407a]/70 mt-1">Selected: {form.attachment_filename}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="font-inter text-sm text-[#003366]">Schedule Type</label>
                <select className="w-full border border-[#e8f1f7] rounded-md px-3 py-2" value={form.schedule_type}
                  onChange={(e) => setForm({ ...form, schedule_type: e.target.value as Campaign['schedule_type'] })}>
                  <option value="one_time">One-time</option>
                  <option value="recurring">Recurring</option>
                  <option value="drip">Drip (after subscribe)</option>
                </select>
              </div>
              {form.schedule_type === 'one_time' && (
                <div className="md:col-span-2">
                  <label className="font-inter text-sm text-[#003366]">Send at (UTC)</label>
                  <input type="datetime-local" className="w-full border border-[#e8f1f7] rounded-md px-3 py-2"
                    value={form.send_at || ''}
                    onChange={(e) => setForm({ ...form, send_at: e.target.value })} />
                </div>
              )}
              {form.schedule_type === 'recurring' && (
                <div className="md:col-span-2">
                  <label className="font-inter text-sm text-[#003366]">Every N days</label>
                  <input type="number" min={1} className="w-full border border-[#e8f1f7] rounded-md px-3 py-2"
                    value={form.every_days || 1}
                    onChange={(e) => setForm({ ...form, every_days: parseInt(e.target.value || '1') })} />
                </div>
              )}
              {form.schedule_type === 'drip' && (
                <div className="md:col-span-2">
                  <label className="font-inter text-sm text-[#003366]">Send X days after subscribe</label>
                  <input type="number" min={1} className="w-full border border-[#e8f1f7] rounded-md px-3 py-2"
                    value={form.drip_days || 1}
                    onChange={(e) => setForm({ ...form, drip_days: parseInt(e.target.value || '1') })} />
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button onClick={save} disabled={saving} className="px-4 py-2 bg-[#1ba9e8] text-white rounded-md">
                {saving ? 'Saving...' : 'Save Campaign'}
              </button>
              <button onClick={() => runNow()} className="px-4 py-2 border border-[#e8f1f7] rounded-md">Run All Due</button>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="bg-white rounded-xl border border-[#e8f1f7] p-5">
          <h2 className="font-poppins text-xl font-semibold text-[#001f3f] mb-4">Campaigns</h2>
          {loading ? (
            <div className="min-h-[200px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1ba9e8]"></div>
            </div>
          ) : (
            <div className="divide-y divide-[#e8f1f7]">
              {list.length === 0 && <p className="font-inter text-sm text-[#003366]">No campaigns yet</p>}
              {list.map((c) => (
                <div key={c.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-poppins font-semibold text-[#001f3f]">{c.name}</p>
                    <p className="font-inter text-xs text-[#00407a]/70">{c.schedule_type}</p>
                    <p className="font-inter text-xs text-[#00407a]/70">Subject: {c.subject}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => runNow(c.id)} className="px-3 py-1.5 text-sm bg-[#e6f7ff] text-[#0a66a9] rounded-md">Run Now</button>
                    <button onClick={() => edit(c)} className="px-3 py-1.5 text-sm border border-[#e8f1f7] rounded-md">Edit</button>
                    <button onClick={() => viewLogs(c.id)} className="px-3 py-1.5 text-sm border border-[#e8f1f7] rounded-md">Logs</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
