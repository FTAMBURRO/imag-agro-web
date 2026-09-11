# IMAG AGRO SAS

Sitio público de IMAG AGRO SAS, construido para presentar soluciones agropecuarias, información útil para productores y un canal de conversación directa por WhatsApp.

## Stack

- React + Vite
- TypeScript estricto
- Tailwind CSS
- Wouter para routing client-side
- Lucide React para iconos
- CSS/SVG local para la dirección visual de campo
- Fotografías locales temporales optimizadas para la segunda iteración

No usa base de datos, autenticación, servicios propietarios de Replit ni URLs de imágenes externas en runtime.

## Instalación y desarrollo

Desde la raíz del workspace:

```bash
pnpm install
pnpm --filter @workspace/imag-agro run dev
```

Comandos equivalentes desde `artifacts/imag-agro`:

```bash
pnpm install
pnpm run dev
pnpm run lint
pnpm run typecheck
pnpm run build
pnpm run serve
```

El workflow de Replit ejecuta `pnpm --filter @workspace/imag-agro run dev` y configura automáticamente el puerto y el prefijo de preview.

## Variables de entorno

Copiá `.env.example` como `.env` cuando necesites cambiar valores:

- `VITE_SITE_URL`: URL canónica usada al generar el sitemap. En local usa `http://localhost:3000`.
- `VITE_WHATSAPP_URL`: enlace directo de WhatsApp.
- `VITE_WHATSAPP_NUMBER`: opcional. Si existe, habilita el formulario que arma mensajes prellenados.
- `VITE_CONTACT_EMAIL`: opcional. No se muestra mientras esté vacío.

No subas secretos reales al repositorio.

## Estructura

- `src/content/site.ts`: identidad, navegación, WhatsApp, footer y alianzas.
- `src/content/services.ts`: las ocho soluciones y sus textos.
- `src/content/articles.ts`: las cinco piezas editoriales.
- `src/content/media.ts`: mapa centralizado de fotografías, textos alternativos y usos temporales.
- `src/components/site-shell.tsx`: header, menú móvil, footer y breadcrumb.
- `src/pages/public-pages.tsx`: páginas públicas y estado client-only.
- `public/brand/`: logo original adjunto y derivados WebP/PNG.
- `public/images/demo/`: fotografías temporales descargadas y optimizadas localmente.
- `public/app/`: iconos y Open Graph derivados del logo y la fotografía del hero.
- `public/site.webmanifest`, `public/robots.txt`: SEO y recursos de instalación.
- `IMAGE_REPLACEMENT_GUIDE.md`: reemplazos recomendados por material propio de IMAG.
- `scripts/generate-sitemap.mjs`: genera `public/sitemap.xml` en cada build.
- `scripts/lint.mjs`: control liviano de placeholders, TODOs y URLs externas accidentales.

## Gestión de contenido y assets

El contenido editable está centralizado en `src/content`. Natal Seeds, Produsem y Cabaña Las Lilas se presentan como marcas y alianzas de portfolio, no como representaciones exclusivas.

La segunda iteración usa fotografías reales temporales, descargadas localmente y con atribución documentada. Revisá `IMAGE_REPLACEMENT_GUIDE.md` y `ASSETS_NEEDED.md` antes de publicar. Registrá derechos y licencias en `ATTRIBUTION.md`.

No inventar antes de publicar: teléfono, email, domicilio, integrantes del equipo, certificaciones, precios, stock, financiación vigente, resultados productivos, cobertura general o cotizaciones en vivo.

## Contacto

Mientras `VITE_WHATSAPP_NUMBER` está vacío, el sitio muestra únicamente el enlace directo oficial configurado. Esto evita presentar un formulario que parezca enviar información cuando todavía no existe un número para construir el mensaje.

Cuando haya un número real:

1. Definí `VITE_WHATSAPP_NUMBER`.
2. Revisá el formato oficial de WhatsApp.
3. Probá nombre, solución y mensaje.
4. Verificá que no se almacenen datos en servidor.

## GitHub y Vercel

1. Conectá el workspace a un repositorio GitHub.
2. Confirmá que estén versionados `artifacts/imag-agro`, `package.json`, `pnpm-lock.yaml` y la configuración del workspace.
3. Importá el repositorio en Vercel.
4. Configurá el proyecto como Vite.
5. Build command: `pnpm --filter @workspace/imag-agro run build`.
6. Output directory: `artifacts/imag-agro/dist/public`.
7. Agregá las variables `VITE_SITE_URL`, `VITE_WHATSAPP_URL` y las opcionales en el panel de Vercel.
8. Ejecutá el deployment.
9. Confirmá que el dominio definitivo esté en `VITE_SITE_URL` para que el sitemap no use el fallback local.
10. Verificá sitemap, robots, metadata, enlaces, WhatsApp, mobile y accesibilidad.

## Checklist previo a producción

- [ ] Reemplazar las fotografías temporales por material oficial de IMAG si está disponible.
- [ ] Confirmar licencia de cualquier foto temporal que permanezca.
- [ ] Confirmar logo vectorial, favicon y datos de marca.
- [ ] Confirmar WhatsApp, email y zona de atención.
- [ ] Revisar textos marcados como `Revisión técnica pendiente`.
- [ ] Probar las ocho rutas de soluciones.
- [ ] Probar las cinco rutas de información.
- [ ] Probar menú mobile y bloqueo de scroll.
- [ ] Ejecutar `pnpm --filter @workspace/imag-agro run lint`.
- [ ] Ejecutar `pnpm --filter @workspace/imag-agro run typecheck`.
- [ ] Ejecutar `VITE_SITE_URL=https://dominio-definitivo.com pnpm --filter @workspace/imag-agro run build`.
- [ ] Revisar Preview en 320, 390, 768, 1024 y 1440 px.