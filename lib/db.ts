import { sql } from '@vercel/postgres';

export interface Subscriber {
  id: number;
  email: string;
  subscribed_at: Date;
  email_sent: boolean;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  requirement: string;
  submitted_at: Date;
}

export interface SeoEntry {
  page: string;
  title: string;
  description: string;
  keywords?: string | null;
  og_image?: string | null;
  updated_at: Date;
}

export interface AnalyticsEvent {
  id: number;
  ts: Date;
  path: string;
  session_id: string;
  referrer?: string | null;
  user_agent?: string | null;
  country?: string | null;
  is_bot: boolean;
}

export interface InsightsCampaign {
  id: number;
  name: string;
  subject: string;
  html?: string | null;
  text?: string | null;
  attachment_filename?: string | null;
  attachment_base64?: string | null;
  schedule_type: 'one_time' | 'recurring' | 'drip';
  send_at?: Date | null; // for one_time (UTC)
  every_days?: number | null; // for recurring
  drip_days?: number | null; // for drip from subscribed_at
  active: boolean;
  last_run_at?: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface InsightsSendLog {
  id: number;
  campaign_id: number;
  email: string;
  sent_at: Date;
  status: 'sent' | 'failed';
  error?: string | null;
}

/**
 * Initialize the subscribers and contact_submissions tables if they don't exist
 */
export async function initDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        email_sent BOOLEAN DEFAULT FALSE,
        unsubscribed BOOLEAN DEFAULT FALSE
      )
    `;
    // Ensure column exists for legacy databases
    await sql`
      ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS unsubscribed BOOLEAN DEFAULT FALSE
    `;
    await sql`
      UPDATE subscribers SET unsubscribed = FALSE WHERE unsubscribed IS NULL
    `;
    
    await sql`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        service VARCHAR(255),
        requirement TEXT,
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS seo_entries (
        page VARCHAR(255) PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        keywords TEXT,
        og_image TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS analytics_events (
        id SERIAL PRIMARY KEY,
        ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        path TEXT NOT NULL,
        session_id TEXT NOT NULL,
        referrer TEXT,
        user_agent TEXT,
        country TEXT,
        is_bot BOOLEAN DEFAULT FALSE
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS insights_campaigns (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        subject TEXT NOT NULL,
        html TEXT,
        text TEXT,
        attachment_filename TEXT,
        attachment_base64 TEXT,
        schedule_type TEXT NOT NULL,
        send_at TIMESTAMP,
        every_days INTEGER,
        drip_days INTEGER,
        active BOOLEAN DEFAULT TRUE,
        last_run_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS insights_send_log (
        id SERIAL PRIMARY KEY,
        campaign_id INTEGER NOT NULL REFERENCES insights_campaigns(id) ON DELETE CASCADE,
        email VARCHAR(255) NOT NULL,
        sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status TEXT NOT NULL,
        error TEXT
      )
    `;
    
    return { success: true };
  } catch (error) {
    console.error('Database initialization error:', error);
    return { success: false, error };
  }
}

/**
 * Save a new subscriber to the database
 */
export async function saveSubscriber(email: string, emailSent: boolean = false) {
  try {
    const result = await sql`
      INSERT INTO subscribers (email, email_sent, subscribed_at)
      VALUES (${email}, ${emailSent}, NOW())
      ON CONFLICT (email) 
      DO UPDATE SET subscribed_at = NOW(), email_sent = ${emailSent}
      RETURNING *
    `;
    return { success: true, data: result.rows[0] };
  } catch (error) {
    console.error('Save subscriber error:', error);
    return { success: false, error };
  }
}

/**
 * Get all subscribers
 */
export async function getAllSubscribers(): Promise<Subscriber[]> {
  try {
    const result = await sql`
      SELECT * FROM subscribers 
      ORDER BY subscribed_at DESC
    `;
    return result.rows as Subscriber[];
  } catch (error) {
    console.error('Get subscribers error:', error);
    return [];
  }
}

/**
 * Get subscriber count
 */
export async function getSubscriberCount(): Promise<number> {
  try {
    const result = await sql`
      SELECT COUNT(*) as count FROM subscribers
    `;
    return parseInt(result.rows[0].count);
  } catch (error) {
    console.error('Get subscriber count error:', error);
    return 0;
  }
}

/**
 * Save a contact form submission to the database
 */
export async function saveContactSubmission(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  requirement: string;
}) {
  try {
    const result = await sql`
      INSERT INTO contact_submissions (name, email, phone, service, requirement, submitted_at)
      VALUES (${data.name}, ${data.email}, ${data.phone}, ${data.service}, ${data.requirement}, NOW())
      RETURNING *
    `;
    return { success: true, data: result.rows[0] };
  } catch (error) {
    console.error('Save contact submission error:', error);
    return { success: false, error };
  }
}

/**
 * Get all contact submissions
 */
export async function getAllContactSubmissions(): Promise<ContactSubmission[]> {
  try {
    const result = await sql`
      SELECT * FROM contact_submissions 
      ORDER BY submitted_at DESC
    `;
    return result.rows as ContactSubmission[];
  } catch (error) {
    console.error('Get contact submissions error:', error);
    return [];
  }
}

/**
 * Get contact submission by ID
 */
export async function getContactSubmissionById(id: number): Promise<ContactSubmission | null> {
  try {
    const result = await sql`
      SELECT * FROM contact_submissions 
      WHERE id = ${id}
    `;
    return result.rows[0] as ContactSubmission | null;
  } catch (error) {
    console.error('Get contact submission error:', error);
    return null;
  }
}

/**
 * Get all SEO entries as an object keyed by page
 */
export async function getSeoEntries(): Promise<Record<string, SeoEntry>> {
  try {
    const result = await sql<SeoEntry>`
      SELECT * FROM seo_entries
    `;
    const map: Record<string, SeoEntry> = {};
    for (const row of result.rows) {
      map[row.page] = row;
    }
    return map;
  } catch (error) {
    console.error('Get SEO entries error:', error);
    return {};
  }
}

/**
 * Upsert SEO entries from an object keyed by page
 */
export async function upsertSeoEntries(data: Record<string, Partial<SeoEntry>>) {
  try {
    const entries = Object.entries(data);
    if (!entries.length) return { success: true };

    for (const [page, entry] of entries) {
      if (!entry?.title || !entry?.description) continue;

      await sql`
        INSERT INTO seo_entries (page, title, description, keywords, og_image, updated_at)
        VALUES (${page}, ${entry.title}, ${entry.description}, ${entry.keywords ?? null}, ${entry.og_image ?? null}, NOW())
        ON CONFLICT (page) DO UPDATE SET
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          keywords = EXCLUDED.keywords,
          og_image = EXCLUDED.og_image,
          updated_at = NOW()
      `;
    }

    return { success: true };
  } catch (error) {
    console.error('Upsert SEO entries error:', error);
    return { success: false, error };
  }
}

export async function listInsightsCampaigns(): Promise<InsightsCampaign[]> {
  try {
    const res = await sql<InsightsCampaign>`
      SELECT * FROM insights_campaigns ORDER BY created_at DESC
    `;
    return res.rows as InsightsCampaign[];
  } catch (error) {
    console.error('List insights campaigns error:', error);
    return [];
  }
}

export async function saveInsightsCampaign(input: Partial<InsightsCampaign>) {
  try {
    const sendAtISO = input.send_at ? new Date(input.send_at as unknown as string).toISOString() : null;
    if (input.id) {
      const res = await sql`
        UPDATE insights_campaigns SET
          name = ${input.name},
          subject = ${input.subject},
          html = ${input.html ?? null},
          text = ${input.text ?? null},
          attachment_filename = ${input.attachment_filename ?? null},
          attachment_base64 = ${input.attachment_base64 ?? null},
          schedule_type = ${input.schedule_type},
          send_at = ${sendAtISO},
          every_days = ${input.every_days ?? null},
          drip_days = ${input.drip_days ?? null},
          active = ${input.active ?? true},
          updated_at = NOW()
        WHERE id = ${input.id}
        RETURNING *
      `;
      return { success: true, data: res.rows[0] as InsightsCampaign } as const;
    } else {
      const res = await sql`
        INSERT INTO insights_campaigns (
          name, subject, html, text, attachment_filename, attachment_base64,
          schedule_type, send_at, every_days, drip_days, active, created_at, updated_at
        ) VALUES (
          ${input.name}, ${input.subject}, ${input.html ?? null}, ${input.text ?? null}, ${input.attachment_filename ?? null}, ${input.attachment_base64 ?? null},
          ${input.schedule_type}, ${sendAtISO}, ${input.every_days ?? null}, ${input.drip_days ?? null}, ${input.active ?? true}, NOW(), NOW()
        ) RETURNING *
      `;
      return { success: true, data: res.rows[0] as InsightsCampaign } as const;
    }
  } catch (error) {
    console.error('Save insights campaign error:', error);
    return { success: false, error } as const;
  }
}

export async function listSubscribersForCampaign(campaign: InsightsCampaign) {
  try {
    if (campaign.schedule_type === 'drip' && campaign.drip_days) {
      const res = await sql`
        SELECT s.email, s.subscribed_at FROM subscribers s
        WHERE s.unsubscribed = FALSE
          AND s.subscribed_at <= NOW() - make_interval(days => ${campaign.drip_days})
          AND NOT EXISTS (
            SELECT 1 FROM insights_send_log l WHERE l.campaign_id = ${campaign.id} AND l.email = s.email
          )
        LIMIT 500
      `;
      return res.rows as Array<{ email: string; subscribed_at: Date }>;
    }

    // one_time and recurring: send to all unsubscribed=false, but avoid duplicate if one_time already sent
    const res = await sql`
      SELECT s.email, s.subscribed_at FROM subscribers s
      WHERE s.unsubscribed = FALSE
      LIMIT 1000
    `;
    return res.rows as Array<{ email: string; subscribed_at: Date }>;
  } catch (error) {
    console.error('List subscribers for campaign error:', error);
    return [] as Array<{ email: string; subscribed_at: Date }>;
  }
}

export async function recordSendLog(campaignId: number, email: string, status: 'sent' | 'failed', error?: string) {
  try {
    await sql`
      INSERT INTO insights_send_log (campaign_id, email, status, error, sent_at)
      VALUES (${campaignId}, ${email}, ${status}, ${error ?? null}, NOW())
    `;
  } catch (e) {
    console.error('Record send log error:', e);
  }
}

export async function markCampaignRun(campaignId: number) {
  try {
    await sql`
      UPDATE insights_campaigns SET last_run_at = NOW(), updated_at = NOW() WHERE id = ${campaignId}
    `;
  } catch (e) {
    console.error('Mark campaign run error:', e);
  }
}

export async function setSubscriberUnsubscribed(email: string, value: boolean) {
  try {
    await sql`
      UPDATE subscribers SET unsubscribed = ${value}, subscribed_at = subscribed_at WHERE email = ${email}
    `;
    return { success: true } as const;
  } catch (error) {
    console.error('Set unsubscribed error:', error);
    return { success: false, error } as const;
  }
}

export async function getSendLogs(campaignId: number, limit: number = 100) {
  try {
    const res = await sql`
      SELECT email, status, error, sent_at FROM insights_send_log
      WHERE campaign_id = ${campaignId}
      ORDER BY sent_at DESC
      LIMIT ${Math.max(1, Math.min(limit, 1000))}
    `;
    return { success: true, rows: res.rows } as const;
  } catch (error) {
    console.error('Get send logs error:', error);
    return { success: false, error } as const;
  }
}

/**
 * Insert an analytics event
 */
export async function insertAnalyticsEvent(evt: {
  path: string;
  session_id: string;
  referrer?: string | null;
  user_agent?: string | null;
  country?: string | null;
  is_bot?: boolean;
}) {
  try {
    await sql`
      INSERT INTO analytics_events (path, session_id, referrer, user_agent, country, is_bot, ts)
      VALUES (${evt.path}, ${evt.session_id}, ${evt.referrer ?? null}, ${evt.user_agent ?? null}, ${evt.country ?? null}, ${evt.is_bot ?? false}, NOW())
    `;
    return { success: true };
  } catch (error) {
    console.error('Insert analytics event error:', error);
    return { success: false, error };
  }
}

/**
 * Get basic analytics summary for a given period (days)
 */
export async function getAnalyticsSummary(days: number = 30) {
  try {
    const period = Math.max(1, Math.min(365, days));

    const pageviewsRes = await sql`
      SELECT COUNT(*) AS pageviews
      FROM analytics_events
      WHERE ts >= NOW() - make_interval(days => ${period})
    `;

    const visitorsRes = await sql`
      SELECT COUNT(DISTINCT session_id) AS visitors
      FROM analytics_events
      WHERE ts >= NOW() - make_interval(days => ${period})
        AND (is_bot = FALSE OR is_bot IS NULL)
    `;

    const botsRes = await sql`
      SELECT COUNT(*) AS bots
      FROM analytics_events
      WHERE ts >= NOW() - make_interval(days => ${period}) AND is_bot = TRUE
    `;

    const topPagesRes = await sql`
      SELECT path, COUNT(*) AS views
      FROM analytics_events
      WHERE ts >= NOW() - make_interval(days => ${period}) AND (is_bot = FALSE OR is_bot IS NULL)
      GROUP BY path
      ORDER BY views DESC
      LIMIT 10
    `;

    return {
      success: true,
      data: {
        pageviews: parseInt(pageviewsRes.rows[0]?.pageviews ?? '0'),
        visitors: parseInt(visitorsRes.rows[0]?.visitors ?? '0'),
        bots: parseInt(botsRes.rows[0]?.bots ?? '0'),
        topPages: (topPagesRes.rows as Array<{ path: string; views: string | number }>).map((r) => ({
          path: r.path,
          views: typeof r.views === 'string' ? parseInt(r.views) : r.views,
        })),
      },
    } as const;
  } catch (error) {
    console.error('Get analytics summary error:', error);
    return { success: false, error } as const;
  }
}
