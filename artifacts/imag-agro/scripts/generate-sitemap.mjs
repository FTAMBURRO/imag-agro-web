import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteUrl = (process.env.VITE_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
const publicDir = fileURLToPath(new URL('../public/', import.meta.url));
const routes = [
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
  '/informacion/interpretar-el-mercado-ganadero',
  '/informacion/preparar-hacienda-ante-lluvias',
  '/informacion/elegir-un-hibrido',
  '/informacion/planificacion-verdeos-invierno',
  '/informacion/orden-documental-mercado-granos',
  '/nosotros',
  '/contacto',
];

const body = routes.map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`).join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

await mkdir(publicDir, { recursive: true });
await writeFile(join(publicDir, 'sitemap.xml'), sitemap);
console.log(`Sitemap generado para ${siteUrl}.`);