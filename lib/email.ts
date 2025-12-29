import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const defaultFrom = process.env.RESEND_FROM || 'onboarding@resend.dev';
const adminEmail = process.env.ADMIN_EMAIL || 'info@lumewavedigital.com';

if (!resendApiKey) {
  // We avoid throwing at import time to keep build working; runtime will check
  console.warn('[email] RESEND_API_KEY is not set. Emails will fail until configured.');
}

export const resend = new Resend(resendApiKey || '');

export async function sendPdfEmail(params: {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  pdfFilename: string; // e.g., 'insights.pdf'
  pdfBase64Content: string; // base64-encoded file content
  from?: string;
}) {
  const { to, subject, html, text, pdfFilename, pdfBase64Content, from } = params;

  // Build unsubscribe link
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const secret = process.env.UNSUBSCRIBE_SECRET || 'dev-secret';
  const crypto = await import('crypto');
  const token = crypto.createHmac('sha256', secret).update(to.toLowerCase()).digest('hex');
  const unsubscribeUrl = `${baseUrl}/api/subscribers/unsubscribe?email=${encodeURIComponent(to)}&token=${token}`;

  const footerHtml = `
    <div style="margin-top:24px;border-top:1px solid #e8f1f7;padding-top:12px;color:#7a8699;font-size:12px;font-family:Inter,Arial,sans-serif;">
      <p style="margin:0;">You are receiving this because you subscribed on our website.</p>
      <p style="margin:8px 0 0;">To unsubscribe, <a href="${unsubscribeUrl}" style="color:#1ba9e8;text-decoration:none;">click here</a>.</p>
    </div>
  `;

  const htmlBody = (html || '<p>Thanks for subscribing! Your PDF is attached.</p>') + footerHtml;
  const textBody = (text || 'Thanks for subscribing! Your PDF is attached.') + `\n\nUnsubscribe: ${unsubscribeUrl}`;

  return await resend.emails.send({
    from: from || defaultFrom,
    to,
    subject,
    html: htmlBody,
    text: textBody,
    attachments: [
      {
        filename: pdfFilename,
        content: pdfBase64Content,
      },
    ],
  });
}

export async function sendContactNotificationEmail(params: {
  name: string;
  email: string;
  phone: string;
  service: string;
  requirement: string;
}) {
  const { name, email, phone, service, requirement } = params;

  const html = `
    <div style="font-family: Inter, Arial, sans-serif; color: #001f3f; line-height: 1.6; max-width: 600px;">
      <div style="background: linear-gradient(135deg, #1ba9e8 0%, #0a66a9 100%); padding: 24px; border-radius: 8px; margin-bottom: 24px;">
        <h2 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h2>
      </div>
      
      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e8f1f7;">
              <strong style="color: #001f3f; display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #00407a; margin-bottom: 4px;">Name</strong>
              <span style="color: #003366; font-size: 16px;">${name}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e8f1f7;">
              <strong style="color: #001f3f; display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #00407a; margin-bottom: 4px;">Email</strong>
              <a href="mailto:${email}" style="color: #1ba9e8; text-decoration: none; font-size: 16px;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e8f1f7;">
              <strong style="color: #001f3f; display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #00407a; margin-bottom: 4px;">Phone</strong>
              <a href="tel:${phone}" style="color: #1ba9e8; text-decoration: none; font-size: 16px;">${phone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e8f1f7;">
              <strong style="color: #001f3f; display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #00407a; margin-bottom: 4px;">Service Interested In</strong>
              <span style="color: #003366; font-size: 16px;">${service}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0;">
              <strong style="color: #001f3f; display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #00407a; margin-bottom: 4px;">Requirement</strong>
              <p style="color: #003366; margin: 0; font-size: 16px; white-space: pre-wrap; word-break: break-word;">${requirement}</p>
            </td>
          </tr>
        </table>
      </div>

      <div style="background: #e6f7ff; padding: 16px; border-left: 4px solid #1ba9e8; border-radius: 4px; margin-bottom: 24px;">
        <p style="margin: 0; color: #003366; font-size: 14px;">
          <strong>Tip:</strong> Click on the email or phone to quickly respond to this lead.
        </p>
      </div>

      <div style="text-align: center; color: #999999; font-size: 12px; padding-top: 16px; border-top: 1px solid #e8f1f7;">
        <p style="margin: 0;">This submission was received from your website contact form.</p>
      </div>
    </div>
  `;

  try {
    const result = await resend.emails.send({
      from: defaultFrom,
      to: adminEmail,
      subject: `New Contact Form Submission - ${service}`,
      html,
    });
    return result;
  } catch (error) {
    console.error('Failed to send contact notification email:', error);
    return null;
  }
}

export async function sendInsightsEmail(params: {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  attachmentFilename?: string;
  attachmentBase64?: string;
  from?: string;
}) {
  const { to, subject, html, text, attachmentFilename, attachmentBase64, from } = params;
  const attachments = attachmentFilename && attachmentBase64 ? [{ filename: attachmentFilename, content: attachmentBase64 }] : undefined;

  // Build unsubscribe link
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const secret = process.env.UNSUBSCRIBE_SECRET || 'dev-secret';
  const crypto = await import('crypto');
  const token = crypto.createHmac('sha256', secret).update(to.toLowerCase()).digest('hex');
  const unsubscribeUrl = `${baseUrl}/api/subscribers/unsubscribe?email=${encodeURIComponent(to)}&token=${token}`;

  const footerHtml = `
    <div style="margin-top:24px;border-top:1px solid #e8f1f7;padding-top:12px;color:#7a8699;font-size:12px;font-family:Inter,Arial,sans-serif;">
      <p style="margin:0;">You are receiving this because you subscribed on our website.</p>
      <p style="margin:8px 0 0;">To unsubscribe, <a href="${unsubscribeUrl}" style="color:#1ba9e8;text-decoration:none;">click here</a>.</p>
    </div>
  `;

  return await resend.emails.send({
    from: from || defaultFrom,
    to,
    subject,
    html: (html || (text ? `<pre>${text}</pre>` : '<p>Hello from Insights</p>')) + footerHtml,
    text: text || undefined,
    attachments,
  });
}

