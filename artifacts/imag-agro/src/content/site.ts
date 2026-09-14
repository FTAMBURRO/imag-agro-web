import { publishedArticles } from "./articles";

export const whatsappLink = "https://wa.me/message/UE6HDSE35A5GI1";

export const siteConfig = {
  name: "IMAG AGRO SAS",
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
  { href: "/#marcas", label: "Marcas y alianzas" },
  { href: "/#como-trabajamos", label: "Cómo trabajamos" },
  { href: "/informacion", label: "Información" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

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
