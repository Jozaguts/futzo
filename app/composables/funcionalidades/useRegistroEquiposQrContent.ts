type StepItem = {
  title: string
  description: string
  fields: string[]
}

type FaqItem = {
  question: string
  answer: string
}

type RelatedLink = {
  label: string
  href: string
}

const pageTitle = 'Registro de equipos y jugadores por QR | Futzo'
const pageDescription =
  'Inscribe equipos y jugadores en 2 pasos con QR: alta de equipo por torneo y registro de jugadores por equipo. Controla cupos y valida identidad cuando lo necesites.'
const pageUrl = 'https://futzo.io/funcionalidades/registro-equipos-qr'

const keywords = [
  'registro de equipos y jugadores por QR',
  'inscripción de equipos en línea',
  'registro de jugadores para torneo de fútbol',
  'QR para registrar equipos',
  'validación de jugadores liga amateur',
]

const registrationSteps: StepItem[] = [
  {
    title: 'Paso 1: QR del torneo → registro de equipo',
    description: 'El organizador comparte el QR del torneo y cada responsable registra su equipo en el formulario correspondiente.',
    fields: ['Nombre del equipo', 'Categoría', 'Torneo'],
  },
  {
    title: 'Paso 2: QR del equipo → registro de jugadores',
    description: 'Luego cada equipo comparte su QR para que cada jugador complete su alta en el paso correcto.',
    fields: ['Nombre', 'Fecha de nacimiento', 'Tipo de identificación (si aplica)', 'Documento (si aplica)'],
  },
]

const organizerControls: string[] = [
  'Control de cupos: cerrar registro al llegar al máximo de equipos o jugadores.',
  'Bloqueo por fase: al entrar a eliminatoria, el registro se bloquea.',
  'Revisión de identidad opcional: si activas validación, los jugadores pasan por aprobación manual.',
]

const doesIncludeItems: string[] = [
  'Registro de equipo y jugadores por QR en flujo separado.',
  'Campos obligatorios claros por rol.',
  'Validación opcional de identidad en jugadores.',
  'Control por cupos y fase del torneo.',
]

const doesNotIncludeItems: string[] = [
  'No es un solo QR para todo el proceso.',
  'No tiene cierre automático principal por fecha exacta (por ejemplo: "30 de junio").',
]

const chatProblemsSolved: string[] = [
  'Cada persona captura sus datos en el paso correcto.',
  'Menos errores de transcripción.',
  'Menos idas y vueltas por información incompleta.',
  'Más orden para arrancar el torneo sin atrasos.',
]

const usageCases: string[] = [
  'Ligas con alta rotación de jugadores.',
  'Torneos con muchos equipos entrando al mismo tiempo.',
  'Operaciones donde se exige validar identidad de jugadores.',
]

const faqs: FaqItem[] = [
  {
    question: '¿Un solo QR registra equipo y jugadores?',
    answer: 'No. Hoy el flujo es en 2 pasos: QR del torneo para equipo y QR del equipo para jugadores.',
  },
  {
    question: '¿Los equipos necesitan aprobación para entrar?',
    answer: 'Normalmente no. El equipo suele quedar inscrito sin aprobación previa.',
  },
  {
    question: '¿Los jugadores siempre requieren aprobación?',
    answer: 'Solo cuando la liga activa validación de identidad.',
  },
  {
    question: '¿Puedo cerrar registros cuando se llenen los cupos?',
    answer: 'Sí. Puedes cerrar por cupos, y también se bloquea al entrar a fase eliminatoria.',
  },
]

const relatedLinks: RelatedLink[] = [
  { label: 'Ver todas las funcionalidades', href: '/funcionalidades' },
  { label: 'Ver calendario automático', href: '/funcionalidades/calendario-automatico' },
  { label: 'Ver control de jugadores', href: '/funcionalidades/verificacion-jugadores' },
  { label: 'Ver estadísticas y tabla', href: '/funcionalidades/estadisticas-torneos' },
]

const registroQrPageJsonLd = {
  '@type': 'SoftwareApplication',
  name: 'Futzo',
  url: pageUrl,
  description:
    'Registro de equipos y jugadores mediante flujo de dos códigos QR, con validación opcional de identidad y control de cupos.',
  applicationCategory: 'SportsManagementApplication',
  operatingSystem: 'Web',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.6,
    ratingCount: 8864,
  },
  featureList: [
    'QR del torneo para alta de equipos',
    'QR del equipo para alta de jugadores',
    'Campos obligatorios por rol',
    'Validación opcional de identidad',
    'Control de cupos y bloqueo por fase',
  ],
}

export const useRegistroEquiposQrContent = () => ({
  pageTitle,
  pageDescription,
  pageUrl,
  keywords,
  registrationSteps,
  organizerControls,
  doesIncludeItems,
  doesNotIncludeItems,
  chatProblemsSolved,
  usageCases,
  faqs,
  relatedLinks,
  registroQrPageJsonLd,
})
