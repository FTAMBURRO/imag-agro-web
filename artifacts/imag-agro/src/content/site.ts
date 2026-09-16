import { publishedArticles } from "./articles";

export const whatsappLink = "https://wa.me/message/UE6HDSE35A5GI1";

export const siteConfig = {
  name: "IMAG Agro Group",
  shortName: "IMAG AGRO",
  tagline: "Cada decisión del campo, mejor acompañada.",
  subtagline: "Soluciones que producen resultados.",
  whatsappLink,
  whatsappNumber: "",
  contactEmail: "",
  contactPhone: "",
  address: "",
};

export const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/soluciones", label: "Soluciones" },
  { href: "/mercados", label: "Mercados" },
  { href: "/catalogos", label: "Catálogos" },
  { href: "/informacion", label: "Información" },
  { href: "/nosotros", label: "Nosotros" },
];

export const marketSources = [
  { label: "Mercado Agroganadero de Cañuelas", url: "https://www.mercadoagroganadero.com.ar/" },
  { label: "Cámara Arbitral de Cereales de Rosario", url: "https://cac.bcr.com.ar/es/frontpage" },
];

export const catalogConfig = [
  { brand: "Natalseeds", title: "Catálogo 2025", description: "Híbridos de maíz y sorgo desarrollados para distintos ambientes, manejos y objetivos productivos.", categories: ["Maíz y sorgo", "Silo, doble propósito y grano"], pages: "20 páginas", cover: "images/catalogs/natalseeds-2025-cover.png", pdfUrl: "https://natalseeds.com/wp-content/uploads/2025/03/NATALSEEDS-CATALOGO-DIGITAL-mobile.pdf", message: "Hola, quiero consultar por el catálogo 2025 de Natalseeds." },
  { brand: "Estancias y Cabaña Las Lilas", title: "Anuario 2025–2026", description: "Genética bovina, reproductores, semen y embriones de una de las cabañas referentes del país.", categories: ["Angus Negro y Colorado", "Polled Hereford", "Brangus, Braford y Brahman"], pages: "124 páginas", cover: "images/catalogs/las-lilas-2025-2026-cover.png", pdfUrl: "https://laslilas.com/pdf/Anuario-LLG-2526.pdf", message: "Hola, quiero consultar por genética del Anuario 2025–2026 de Las Lilas." },
] as const;

const winterPlanningArticle = publishedArticles.find(
  (article) => article.slug === "planificacion-verdeos-invierno",
);
const grainDocumentsArticle = publishedArticles.find(
  (article) => article.slug === "orden-documental-mercado-granos",
);

export const footerGroups = [
  {
    title: "En el campo",
    links: [
      { href: "/soluciones", label: "Todas las soluciones" },
      { href: "/soluciones/semillas", label: "Semillas" },
      { href: "/soluciones/genetica-bovina", label: "Genética bovina" },
      {
        href: "/soluciones/granos-y-back-office",
        label: "Granos y back office",
      },
    ],
  },
  {
    title: "Para leer",
    links: [
      { href: "/informacion", label: "Información para productores" },
      {
        href: winterPlanningArticle
          ? `/informacion/${winterPlanningArticle.slug}`
          : "/informacion",
        label: "Planificar verdeos de invierno",
      },
      {
        href: grainDocumentsArticle
          ? `/informacion/${grainDocumentsArticle.slug}`
          : "/informacion",
        label: "Orden documental de granos",
      },
    ],
  },
];

export const brands = ["Natal Seeds", "Produsem", "Cabaña Las Lilas"];
