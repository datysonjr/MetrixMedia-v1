import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { sendEmail } from "./services/sendgrid";

// Rate limiting storage
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const rateLimitData = rateLimitMap.get(ip);

  if (!rateLimitData || now > rateLimitData.resetTime) {
    // Reset or create new rate limit data
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (rateLimitData.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  rateLimitData.count++;
  return true;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // SEO Routes
  app.get("/sitemap.xml", (req: Request, res: Response) => {
    const baseUrl = req.get('host')?.includes('localhost') ? 
      `http://${req.get('host')}` : 
      'https://metrixmedia.com';
      
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

    res.set('Content-Type', 'application/xml');
    res.send(sitemap);
  });

  app.get("/robots.txt", (req: Request, res: Response) => {
    const baseUrl = req.get('host')?.includes('localhost') ? 
      `http://${req.get('host')}` : 
      'https://metrixmedia.com';
      
    const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`;

    res.set('Content-Type', 'text/plain');
    res.send(robots);
  });

  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Rate limiting
      const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
      if (!checkRateLimit(clientIp)) {
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

      // Honeypot check - if website field is filled, it's likely a bot
      if (website && website.trim() !== '') {
        return res.status(200).json({ ok: true }); // Return success to not reveal honeypot
      }

      // Store submission
      await storage.createContactSubmission(result.data);

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
  });

  const httpServer = createServer(app);
  return httpServer;
}
