# IMAG AGRO Web

Sitio web comercial y editorial para IMAG AGRO SAS, una empresa argentina de soluciones agropecuarias.

Este proyecto fue construido para transformar una presencia digital principalmente visual en una experiencia más clara, auténtica y útil para productores: entender qué hace la empresa, encontrar una solución concreta y abrir una conversación directa por WhatsApp.

## Qué construí

- Home editorial con hero, propuesta de valor y llamados a la acción visibles en desktop.
- Catálogo de ocho soluciones: semillas, genética bovina, insumos, forrajes, materias primas, hacienda, campos y granos/back office.
- Páginas de servicio con información concreta, preguntas iniciales y CTAs de WhatsApp contextuales.
- Navegación responsive con menú mobile, breadcrumbs y estados de foco accesibles.
- Sección Nosotros con espacio preparado para sumar la presentación real del dueño o equipo.
- Sección Información con estados editoriales (`draft`, `review`, `published`). Solo el contenido aprobado se publica.
- Sitemap generado automáticamente a partir de los artículos publicados.
- Inventario de fotografías y datos pendientes para evitar imágenes o afirmaciones no verificadas.
- Configuración preparada para desplegar como SPA en Vercel.

## Decisiones técnicas destacadas

- React y TypeScript para una interfaz tipada y mantenible.
- Vite para desarrollo y build de producción.
- Wouter para routing client-side liviano.
- Tailwind CSS y CSS propio para conservar una identidad editorial, no una interfaz genérica de dashboard.
- Lucide React para iconografía.
- Contenido centralizado en archivos TypeScript, sin base de datos ni backend necesario para el sitio público.
- Assets locales para evitar dependencias de imágenes externas en runtime.
- `vercel.json` con rewrite SPA para que las rutas internas funcionen al recargar o ingresar directamente.

## Arquitectura principal

```text
artifacts/imag-agro/
├── public/                  # Logo, fotografías, manifest, robots y sitemap
├── scripts/
│   ├── generate-sitemap.mjs # Sitemap según artículos publicados
│   └── lint.mjs             # Validaciones livianas del contenido
└── src/
    ├── components/          # Shell del sitio y componentes UI
    ├── content/             # Servicios, artículos, navegación y media
    ├── pages/               # Home y páginas públicas
    ├── App.tsx              # Router principal
    └── index.css            # Tokens visuales y estilos editoriales
```

## Ejecutar localmente

Requiere Node.js y pnpm.

Desde la raíz del repositorio:

```bash
pnpm install
pnpm --filter @workspace/imag-agro run dev
```

El sitio queda disponible en `http://localhost:5000` o en el puerto configurado por `PORT`.

## Validaciones

```bash
pnpm --filter @workspace/imag-agro run lint
pnpm --filter @workspace/imag-agro run typecheck
pnpm --filter @workspace/imag-agro run build
```

También se puede validar todo el workspace:

```bash
pnpm run typecheck
PORT=5000 BASE_PATH=/ pnpm run build
```

## Deploy en Vercel

La aplicación pública está dentro de `artifacts/imag-agro`.

Configuración recomendada:

- **Root Directory:** `artifacts/imag-agro`
- **Framework Preset:** `Vite`
- **Build Command:** `pnpm run build`
- **Output Directory:** `dist/public`
- **Install Command:** `pnpm install --frozen-lockfile`

Variables de entorno:

```env
VITE_SITE_URL=https://tu-dominio.vercel.app
VITE_WHATSAPP_URL=https://wa.me/message/UE6HDSE35A5GI1
VITE_WHATSAPP_NUMBER=
VITE_CONTACT_EMAIL=
```

`VITE_SITE_URL` se utiliza para generar el sitemap con el dominio definitivo.

## Contenido y autenticidad

Las imágenes demo están centralizadas en `artifacts/imag-agro/src/content/media.ts` y documentadas como temporales. El archivo `artifacts/imag-agro/CONTENT_ASSETS_PENDING.md` especifica las fotografías y datos que IMAG AGRO debe entregar o aprobar antes de reemplazarlas.

No se inventan integrantes, clientes, testimonios, resultados, precios, stock, cobertura ni exclusividades comerciales. Los artículos no aprobados permanecen fuera del sitio público y del sitemap.

## Estado del proyecto

El sitio está preparado para una primera publicación en Vercel. Queda pendiente incorporar los assets propios y la información comercial que IMAG AGRO apruebe para producción.
