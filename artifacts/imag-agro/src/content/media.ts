export type SitePhoto = {
  src: string;
  alt: string;
  role: string;
  temporary: boolean;
};

export const photos = {
  hero: {
    src: "images/demo/hero-field-sunset.jpg",
    alt: "Lote de cereal iluminado por el sol al atardecer",
    role: "Hero principal",
    temporary: true,
  },
  fieldRows: {
    src: "images/demo/field-crop-rows.jpg",
    alt: "Lote productivo con hileras de cultivo bajo luz de mañana",
    role: "Experiencia de campo y campos",
    temporary: true,
  },
  seedlings: {
    src: "images/demo/seedlings-hand.jpg",
    alt: "Asset pendiente: cultivo o bolsa de semilla autorizada para IMAG AGRO",
    role: "Semillas: reemplazo pendiente",
    temporary: true,
  },
  wheatSeeds: {
    src: "images/demo/wheat-seeds.jpg",
    alt: "Detalle de granos de trigo sobre una superficie",
    role: "Semillas y granos",
    temporary: true,
  },
  cattle: {
    src: "images/demo/cattle-pasture-sunset.jpg",
    alt: "Hacienda en una pastura durante el atardecer",
    role: "Genética bovina",
    temporary: true,
  },
  cattleDetail: {
    src: "images/demo/cattle-detail.jpg",
    alt: "Primer plano de un bovino en un entorno rural",
    role: "Hacienda",
    temporary: true,
  },
  farm: {
    src: "images/demo/farm-barn-sunset.jpg",
    alt: "Campo productivo y galpón rural con luz de atardecer",
    role: "CTA final de campo",
    temporary: true,
  },
  soil: {
    src: "images/demo/soil-hands.jpg",
    alt: "Manos sosteniendo tierra para observar su textura",
    role: "Insumos y diagnóstico de lote",
    temporary: true,
  },
  tractor: {
    src: "images/demo/tractor-crop.jpg",
    alt: "Tractor trabajando sobre un cultivo",
    role: "Producción y materias primas",
    temporary: true,
  },
  office: {
    src: "images/demo/agro-office.jpg",
    alt: "Oficina luminosa para ordenar documentación y operaciones",
    role: "Granos y back office",
    temporary: true,
  },
  market: {
    src: "images/demo/produce-market.jpg",
    alt: "Bolsas con diferentes semillas y materias primas",
    role: "Materias primas",
    temporary: true,
  },
} satisfies Record<string, SitePhoto>;

export const servicePhotos: Record<string, SitePhoto> = {
  semillas: photos.seedlings,
  "genetica-bovina": photos.cattle,
  insumos: photos.soil,
  forrajes: photos.cattle,
  "materias-primas": photos.market,
  hacienda: photos.cattleDetail,
  campos: photos.fieldRows,
  "granos-y-back-office": photos.office,
};
