import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function GET() {
  try {
    const testEmail = {
      to: process.env.TEST_EMAIL || 'your-email@example.com', // Replace with your test email
      subject: 'SMTP Test Email',
      html: `
        <h1>SMTP Test Successful!</h1>
        <p>If you're reading this, your SMTP settings are working correctly.</p>
        <p>Sent at: ${new Date().toISOString()}</p>
      `,
    };

    const result = await sendEmail(testEmail);
    
    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      messageId: result.messageId,
    });
  } catch (error) {
    console.error('Error sending test email:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send test email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
