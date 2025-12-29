import { NextResponse } from 'next/server';
import { getAllSubscribers, getSubscriberCount } from '@/lib/db';

export async function GET(request: Request) {
  try {
    // Simple auth check - you should replace this with proper authentication
    const authHeader = request.headers.get('authorization');
    const adminKey = process.env.ADMIN_API_KEY;

    if (!adminKey || authHeader !== `Bearer ${adminKey}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(request.url);
    const format = url.searchParams.get('format') || 'json';

    const subscribers = await getAllSubscribers();
    const count = await getSubscriberCount();

    if (format === 'csv') {
      // Export as CSV
      const csv = [
        'ID,Email,Subscribed At,Email Sent',
        ...subscribers.map(s => 
          `${s.id},${s.email},${s.subscribed_at},${s.email_sent}`
        )
      ].join('\n');

      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="subscribers-${new Date().toISOString().split('T')[0]}.csv"`,
        },
      });
    }

    // Return JSON by default
    return NextResponse.json({
      success: true,
      count,
      subscribers,
    });
  } catch (error) {
    console.error('Get subscribers error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
