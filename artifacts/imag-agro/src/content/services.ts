export type Service = {
  slug: string;
  number: string;
  name: string;
  short: string;
  description: string;
  detail: string;
  questions: string[];
  accent: 'gold' | 'burgundy' | 'sage';
};

export const services: Service[] = [
  {
    slug: 'semillas',
    number: '01',
    name: 'Semillas',
    short: 'Elegir el material correcto para cada ambiente y objetivo.',
    description: 'Semillas para cultivos extensivos, con una conversación técnica que empieza en el lote y termina en la decisión de siembra.',
    detail: 'Trabajamos sobre ambiente, fecha, antecesor y destino de la producción. La propuesta no parte de un catálogo: parte de entender qué tiene que hacer cada lote y qué riesgo conviene asumir.',
    questions: ['¿Qué ambiente querés sembrar?', '¿Buscás estabilidad o explorar potencial?', '¿Cómo pensás manejar la fecha de siembra?'],
    accent: 'gold',
  },
  {
    slug: 'genetica-bovina',
    number: '02',
    name: 'Genética bovina',
    short: 'Genética pensada para el sistema, no para la vidriera.',
    description: 'Acompañamiento en genética bovina para producir terneros y rodeos que respondan a tu ambiente y a tu negocio.',
    detail: 'La genética se decide con horizonte. Miramos objetivo productivo, adaptación, sanidad, manejo y mercado antes de recomendar un camino. El rodeo tiene que funcionar cuando vuelve al campo.',
    questions: ['¿Qué tipo de rodeo estás construyendo?', '¿Qué atributo querés priorizar?', '¿Cómo es tu ambiente de producción?'],
    accent: 'burgundy',
  },
  {
    slug: 'insumos',
    number: '03',
    name: 'Insumos agrícolas',
    short: 'Herramientas agronómicas para una campaña con criterio.',
    description: 'Insumos y acompañamiento para resolver decisiones de manejo con información del lote y del momento.',
    detail: 'Ordenamos la necesidad antes de hablar de producto. En cada recomendación ponemos en juego diagnóstico, oportunidad de aplicación, compatibilidades y la realidad operativa de tu establecimiento.',
    questions: ['¿Qué problema apareció en el lote?', '¿En qué momento del cultivo estás?', '¿Qué margen operativo tenés para intervenir?'],
    accent: 'sage',
  },
  {
    slug: 'forrajes',
    number: '04',
    name: 'Forrajes',
    short: 'Más previsibilidad para la base del sistema ganadero.',
    description: 'Forrajes para planificar la oferta, cubrir baches y sostener la producción a lo largo del año.',
    detail: 'Pensamos la base forrajera como una decisión productiva, no como una compra aislada. La especie, el suelo, el uso y el momento hacen la diferencia en el resultado del sistema.',
    questions: ['¿Qué bache querés cubrir?', '¿Qué disponibilidad tiene hoy tu campo?', '¿Qué uso va a tener el forraje?'],
    accent: 'gold',
  },
  {
    slug: 'materias-primas',
    number: '05',
    name: 'Materias primas para alimentos',
    short: 'Abastecimiento con calidad, trazabilidad y previsión.',
    description: 'Materias primas para alimentos balanceados y producción animal, con foco en disponibilidad y especificación.',
    detail: 'Ayudamos a ordenar una compra crítica: qué se necesita, con qué calidad, en qué ventana y cómo se documenta. La previsión vale tanto como el precio de la tonelada.',
    questions: ['¿Qué especificación necesitás?', '¿Qué volumen y ventana de entrega manejás?', '¿Cómo estás documentando el abastecimiento?'],
    accent: 'burgundy',
  },
  {
    slug: 'hacienda',
    number: '06',
    name: 'Hacienda',
    short: 'Un vínculo comercial que respeta la lectura del negocio.',
    description: 'Compra y venta de hacienda con una mirada completa sobre categoría, momento y destino.',
    detail: 'La hacienda se mueve dentro de una estrategia. Conversamos sobre categoría, condición, tiempos y necesidades reales para encontrar una alternativa comercial clara.',
    questions: ['¿Qué categoría querés mover?', '¿Cuál es tu ventana de decisión?', '¿Qué destino estás buscando?'],
    accent: 'sage',
  },
  {
    slug: 'campos',
    number: '07',
    name: 'Campos',
    short: 'Información para mirar una oportunidad con los pies en la tierra.',
    description: 'Búsqueda y análisis de campos para producción, inversión o reordenamiento de un sistema.',
    detail: 'Una tierra no se explica en una ficha. Ponemos en conversación aptitud, ubicación, agua, mejoras, escala y proyecto productivo para que cada visita tenga mejores preguntas.',
    questions: ['¿Qué proyecto querés llevar adelante?', '¿Qué escala y zona estás considerando?', '¿Qué información necesitás antes de visitar?'],
    accent: 'gold',
  },
  {
    slug: 'granos-y-back-office',
    number: '08',
    name: 'Granos y back office',
    short: 'La parte documental también produce valor.',
    description: 'Orden y seguimiento para la comercialización de granos, documentación y tareas de back office.',
    detail: 'Cuando los papeles están en orden, las decisiones aparecen más rápido. Acompañamos la gestión documental y comercial de granos para bajar ruido operativo y cuidar cada paso.',
    questions: ['¿Dónde se traba hoy la documentación?', '¿Qué necesitás seguir con más claridad?', '¿Cómo ordenás las entregas y liquidaciones?'],
    accent: 'burgundy',
  },
];

export const getService = (slug?: string) => services.find((service) => service.slug === slug);