import type { VercelRequest, VercelResponse } from '@vercel/node';
import { insertContactSubmissionSchema } from '../shared/schema';
import { sendEmail } from '../server/services/sendgrid';

// Rate limiting storage (in-memory for serverless)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const rateLimitData = rateLimitMap.get(ip);

  if (!rateLimitData || now > rateLimitData.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (rateLimitData.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  rateLimitData.count++;
  return true;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  try {
    // Rate limiting
    const clientIp = req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown';
    const ip = Array.isArray(clientIp) ? clientIp[0] : clientIp;
    
    if (!checkRateLimit(ip)) {
      return res.status(429).json({ 
        ok: false, 
        message: "Too many requests. Please try again later." 
      });
    }

    // Validate request body
    const result = insertContactSubmissionSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ 
        ok: false, 
        message: "Invalid form data",
        errors: result.error.errors 
      });
    }

    const { name, email, company, message, website } = result.data;

    // Honeypot check
    if (website && website.trim() !== '') {
      return res.status(200).json({ ok: true });
    }

    // Send email notification
    const emailSuccess = await sendEmail({
      to: process.env.CONTACT_TO_EMAIL || 'hello@metrixmedia.com',
      from: process.env.CONTACT_FROM_EMAIL || 'noreply@metrixmedia.com',
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}

Message:
${message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Company:</strong> ${company || 'Not provided'}</p>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    if (!emailSuccess) {
      console.error('Failed to send email notification');
    }

    res.json({ ok: true, message: "Thank you for your message! We'll get back to you soon." });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      ok: false, 
      message: "Internal server error. Please try again later." 
    });
  }
}