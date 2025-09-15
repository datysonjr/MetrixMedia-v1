import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const host = req.headers.host;
  const baseUrl = host?.includes('localhost') ? 
    `http://${host}` : 
    `https://${host}`;
    
  const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/api/sitemap`;

  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(robots);
}