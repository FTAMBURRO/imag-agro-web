export type Article = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readingTime: string;
  status?: 'draft';
  body: string[];
};

export const articles: Article[] = [
  {
    slug: 'interpretar-el-mercado-ganadero',
    category: 'Mercados',
    title: 'Cómo interpretar categorías y precios del mercado ganadero',
    excerpt: 'Una guía para leer categorías, momentos y referencias sin separar el mercado de la realidad productiva.',
    readingTime: '4 min de lectura',
    status: 'draft',
    body: ['Leer el mercado ganadero requiere mirar más de una referencia. La categoría, el estado, el momento de venta y el destino forman parte de una misma conversación.', 'Un precio aislado no reemplaza el análisis del sistema. Conviene preguntarse qué se está comparando, en qué ventana y con qué costos o condiciones alrededor.', 'Este material propone preguntas de lectura general. Las referencias concretas deben revisarse con información actual y el contexto de cada operación.'],
  },
  {
    slug: 'preparar-hacienda-ante-lluvias',
    category: 'Clima',
    title: 'Seis aspectos para preparar la hacienda ante lluvias intensas',
    excerpt: 'Una lista de observación para anticiparse a los cambios de piso, acceso, agua y manejo que puede traer un evento de lluvia.',
    readingTime: '5 min de lectura',
    status: 'draft',
    body: ['Antes de una lluvia intensa conviene mirar el sistema completo: accesos, bajos, corrales, aguadas, reservas y alternativas de movimiento.', 'También importa definir quién toma decisiones, qué información se actualiza y qué cambios no conviene hacer con apuro. El estado de los animales y la seguridad del personal van primero.', 'Este contenido es una guía general. Cada establecimiento necesita revisar sus condiciones, recursos y protocolos con asesoramiento técnico.'],
  },
  {
    slug: 'elegir-un-hibrido',
    category: 'Agricultura',
    title: 'Cómo elegir un híbrido según ambiente y objetivo',
    excerpt: 'La elección empieza mucho antes de mirar una ficha: ambiente, fecha, manejo y destino tienen que entrar en la conversación.',
    readingTime: '4 min de lectura',
    status: 'draft',
    body: ['Un híbrido no se elige en abstracto. La fecha de siembra, el ambiente, el antecesor, el manejo y el destino del cultivo ordenan qué atributos mirar primero.', 'La estabilidad puede ser más importante que perseguir un máximo puntual, según el lote y el objetivo. Por eso la selección necesita conversar con la estrategia de la campaña.', 'La recomendación final debe revisarse con información técnica actualizada y el acompañamiento agronómico correspondiente.'],
  },
  {
    slug: 'planificacion-verdeos-invierno',
    category: 'Ganadería',
    title: 'Planificación de verdeos de invierno',
    excerpt: 'Qué conviene conversar antes de definir una base forrajera para atravesar el invierno con más previsibilidad.',
    readingTime: '3 min de lectura',
    status: 'draft',
    body: ['Planificar verdeos de invierno es conectar una necesidad futura con la disponibilidad de hoy. La fecha, el suelo, el uso esperado y la logística tienen que mirarse juntos.', 'Una base forrajera útil no se define solamente por especie. También necesita contemplar cómo entra al sistema, qué bache busca cubrir y con qué margen de ajuste cuenta.', 'Antes de cerrar una recomendación conviene validar ambiente, manejo y objetivo productivo con asesoramiento técnico.'],
  },
  {
    slug: 'orden-documental-mercado-granos',
    category: 'Gestión',
    title: 'Por qué el orden documental es clave en el mercado de granos',
    excerpt: 'Contratos, entregas y liquidaciones forman parte de la operación: ordenarlos reduce ruido y permite decidir a tiempo.',
    readingTime: '4 min de lectura',
    status: 'draft',
    body: ['La comercialización de granos tiene una parte que no se ve en el lote: contratos, entregas, cartas de porte, liquidaciones y fechas.', 'Poner esa información en un mismo recorrido permite saber qué está cerrado, qué falta y qué decisión todavía está abierta.', 'El back office no reemplaza el criterio comercial. Lo vuelve más fácil de ejercer y ayuda a sostener la trazabilidad de cada operación.'],
  },
];

export const getArticle = (slug?: string) => articles.find((article) => article.slug === slug);