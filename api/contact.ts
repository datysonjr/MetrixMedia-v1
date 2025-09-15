import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { MailService } from '@sendgrid/mail';

const bodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(5),
  website: z.string().optional() // honeypot
});

const mail = new MailService();
if (process.env.SENDGRID_API_KEY) mail.setApiKey(process.env.SENDGRID_API_KEY);


export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, message: 'Method not allowed' });

  // Safe JSON parsing for req.body
  let body = req.body;
  if (typeof req.body === 'string') {
    try {
      body = JSON.parse(req.body);
    } catch {
      return res.status(400).json({ ok: false, message: 'Invalid JSON' });
    }
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) return res.status(400).json({ ok: false, message: 'Invalid form data', errors: parsed.error.errors });

  const { name, email, company, message, website } = parsed.data;
  if (website && website.trim() !== '') return res.status(200).json({ ok: true }); // bot trap

  // Send email if SendGrid is configured
  if (process.env.SENDGRID_API_KEY) {
    try {
      await mail.send({
        to: process.env.CONTACT_TO_EMAIL || 'hello@metrixmedia.com',
        from: process.env.CONTACT_FROM_EMAIL || 'noreply@metrixmedia.com',
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\n\n${message}`
      });
    } catch (e) { 
      console.error('SendGrid error:', e);
      // Continue even if email fails
    }
  }

  return res.json({ ok: true, message: "Thank you for your message! We'll get back to you soon." });
}