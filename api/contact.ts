import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
  website?: string; // honeypot field
}

// Simple validation function
function validateContactForm(data: any): data is ContactFormData {
  return (
    data &&
    typeof data.name === 'string' &&
    data.name.trim().length > 0 &&
    typeof data.email === 'string' &&
    data.email.includes('@') &&
    typeof data.message === 'string' &&
    data.message.trim().length >= 5
  );
}

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
  // Only allow POST requests
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
    if (!validateContactForm(req.body)) {
      return res.status(400).json({ 
        ok: false, 
        message: "Invalid form data. Please check all required fields." 
      });
    }

    const { name, email, company, message, website } = req.body;

    // Honeypot check - if website field is filled, it's likely spam
    if (website && website.trim() !== '') {
      return res.status(200).json({ ok: true, message: "Thank you for your message!" });
    }

    // Log the contact form submission (replace with actual email/database logic)
    console.log('Contact form submission:', {
      name,
      email,
      company: company || 'Not provided',
      message,
      timestamp: new Date().toISOString()
    });

    // Simulate successful submission
    res.json({ 
      ok: true, 
      message: "Thank you for your message! We'll get back to you soon." 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      ok: false, 
      message: "Internal server error. Please try again later." 
    });
  }
}