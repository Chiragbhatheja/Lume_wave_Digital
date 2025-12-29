import { NextResponse } from 'next/server';
import { initDatabase, saveContactSubmission } from '@/lib/db';
import { sendContactNotificationEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, requirement } = body;

    // Validate required fields
    if (!name || !email || !phone || !service || !requirement) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Initialize database
    await initDatabase();

    // Save to database
    const submitResult = await saveContactSubmission({
      name,
      email,
      phone,
      service,
      requirement,
    });

    if (!submitResult.success || !submitResult.data) {
      return NextResponse.json(
        { success: false, error: 'Failed to save submission' },
        { status: 500 }
      );
    }

    // Send notification email to admin
    await sendContactNotificationEmail({
      name,
      email,
      phone,
      service,
      requirement,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your inquiry has been received. We will get back to you soon!',
        submissionId: submitResult.data.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
