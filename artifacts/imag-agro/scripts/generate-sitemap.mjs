import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const configuredUrl = process.env.VITE_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const siteUrl = (configuredUrl ? (configuredUrl.startsWith('http') ? configuredUrl : `https://${configuredUrl}`) : 'http://localhost:3000').replace(/\/$/, '');
const publicDir = fileURLToPath(new URL('../public/', import.meta.url));
const serviceRoutes = [
  '/',
  '/soluciones',
  '/soluciones/semillas',
  '/soluciones/genetica-bovina',
  '/soluciones/insumos',
  '/soluciones/forrajes',
  '/soluciones/materias-primas',
  '/soluciones/hacienda',
  '/soluciones/campos',
  '/soluciones/granos-y-back-office',
  '/informacion',
  '/mercados',
  '/catalogos',
  '/nosotros',
  '/contacto',
];

const articleSource = await readFile(fileURLToPath(new URL('../src/content/articles.ts', import.meta.url)), 'utf8');
const publishedArticleSlugs = articleSource
  .split(/\n  \},\n  \{/)
  .map((articleBlock) => {
    const slug = articleBlock.match(/slug: '([^']+)'/);
    return slug && /status: 'published'/.test(articleBlock) ? `/informacion/${slug[1]}` : null;
  })
  .filter((route) => route !== null);
const routes = [...serviceRoutes, ...publishedArticleSlugs];

const escapeXml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
const body = routes.map((route) => `  <url><loc>${escapeXml(`${siteUrl}${route}`)}</loc></url>`).join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

await mkdir(publicDir, { recursive: true });
await writeFile(join(publicDir, 'sitemap.xml'), sitemap);
console.log(`Sitemap generado para ${siteUrl}.`);