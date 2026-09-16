# IMAG AGRO Web

Web comercial y editorial desarrollada para IMAG AGRO SAS, una empresa argentina vinculada a la producción agropecuaria.

## El proyecto

La web está pensada para un visitante que necesita entender rápidamente qué puede consultar y cómo iniciar una conversación. En lugar de presentar una marca de forma abstracta, organiza la propuesta alrededor de situaciones concretas del campo: semillas, genética bovina, insumos, forrajes, materias primas, hacienda, campos y gestión documental de granos.

El desafío fue conservar una identidad visual editorial, con verde profundo, crema, dorado moderado y fotografía de campo, pero convertirla en una experiencia más clara y accionable para productores.

## Qué resuelve

- Presenta las áreas de trabajo de IMAG AGRO en una navegación simple.
- Lleva cada servicio a una página propia con información específica y preguntas para iniciar la consulta.
- Genera mensajes de WhatsApp relacionados con el servicio elegido.
- Permite recorrer la web cómodamente en desktop y mobile.
- Separa el contenido editorial aprobado del material que todavía está en revisión.
- Evita publicar fotografías, testimonios, resultados o datos comerciales que no hayan sido confirmados.

## Decisiones de producto

La interfaz prioriza lectura, contexto y confianza por sobre la cantidad de elementos visuales. El hero explica la propuesta y muestra sus dos acciones principales sin scroll en un viewport desktop común. La sección “¿Qué necesitás resolver?” funciona como un punto de entrada orientado a la necesidad del visitante.

El contenido está separado de los componentes de presentación. Los servicios, artículos, navegación, marcas y fotografías se administran desde fuentes de contenido centralizadas. Esto permite actualizar la información sin mezclarla con la estructura visual.

También incorporé un estado editorial (`draft`, `review`, `published`). Los artículos no aprobados no aparecen en los listados públicos, no tienen enlaces públicos y no se agregan al sitemap.

## Stack y arquitectura

- React + TypeScript.
- Vite para desarrollo y producción.
- Wouter para routing del lado del cliente.
- Tailwind CSS y CSS propio para la identidad visual.
- Lucide React para iconos.
- Assets locales y metadata preparada para SEO.
- Sitemap generado según el contenido publicado.
- SPA preparada para despliegue en Vercel.

La aplicación pública vive en `artifacts/imag-agro/` y no necesita base de datos ni backend para funcionar.

```text
artifacts/imag-agro/
├── public/       # Logo, fotografías y recursos públicos
├── scripts/      # Sitemap y validaciones
└── src/
    ├── content/  # Servicios, artículos, navegación y media
    ├── pages/    # Home y páginas públicas
    ├── components/
    └── App.tsx   # Router principal
```

## Calidad y estado

## Configuración de Mercado en Vercel

La ruta `/api/market` consulta Airtable exclusivamente desde el servidor. En el proyecto de Vercel, dentro de **Settings > Environment Variables**, cargar estas variables privadas para el entorno de producción:

- `AIRTABLE_PAT`: token de Airtable de solo lectura.
- `AIRTABLE_BASE_ID`: identificador de la base.
- `AIRTABLE_TABLE_ID`: identificador de la tabla.

No usar prefijos `VITE_` para estas variables. Después de cargarlas, crear un nuevo deployment desde `main`. Si alguna falta, la API devuelve un estado seguro sin exponer credenciales ni detalles internos.

El proyecto fue validado en desktop y mobile, incluyendo navegación, rutas internas, foco de teclado, overflow horizontal, enlaces de WhatsApp e imágenes.

Los scripts de typecheck, lint y build pasan correctamente. La web está preparada para publicarse, aunque quedan pendientes fotografías propias y datos comerciales que IMAG AGRO debe entregar o aprobar. El detalle está documentado en [CONTENT_ASSETS_PENDING.md](artifacts/imag-agro/CONTENT_ASSETS_PENDING.md).
