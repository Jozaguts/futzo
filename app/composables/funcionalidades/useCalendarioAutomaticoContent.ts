type ListBlock = {
  title: string
  description: string
  points?: string[]
}

type FaqItem = {
  question: string
  answer: string
}

type RelatedLink = {
  label: string
  href: string
}

const pageTitle = 'Calendario automático para liga de fútbol | Futzo'
const pageDescription =
  'Genera el calendario de tu liga en minutos, evita choques de horario y reprograma partidos sin rehacer todo. Funciona con liga, liga+eliminatoria y grupos+eliminatoria.'
const pageUrl = 'https://futzo.io/funcionalidades/calendario-automatico'

const mainBenefits: string[] = [
  'Te evita construir jornadas manualmente una por una.',
  'Reduce errores de operación (solapes, inconsistencias de jornada).',
  'Te deja ajustar sin tirar todo el trabajo previo.',
  'Se conecta directo con tabla de posiciones, fases y llaves.',
]

const supportedFormats: ListBlock[] = [
  {
    title: 'Liga (round robin)',
    description: 'Calendarios de fase regular para torneos por puntos.',
    points: ['Solo ida', 'Ida y vuelta'],
  },
  {
    title: 'Liga + eliminatoria',
    description: 'Fase regular y etapa final dentro del mismo flujo operativo.',
  },
  {
    title: 'Grupos + eliminatoria',
    description: 'Clasificación por grupo con soporte para mejores terceros cuando aplica.',
  },
]

const workflowBlocks: ListBlock[] = [
  {
    title: 'Generación automática',
    description: 'Futzo toma disponibilidad de canchas por día/hora y evita que un equipo juegue dos veces en la misma jornada.',
  },
  {
    title: 'Reprogramación individual',
    description: 'Si cae un horario, puedes mover un solo partido sin rehacer todo el torneo.',
  },
  {
    title: 'Regeneración parcial',
    description: 'Puedes fijar una jornada y regenerar desde ese punto, manteniendo lo que ya se jugó.',
  },
  {
    title: 'Validaciones automáticas',
    description: 'Antes de guardar, Futzo valida conflictos reales para evitar errores en operación.',
    points: [
      'Que el horario quepa en la ventana.',
      'Que no choque con otro partido en el mismo campo/fecha.',
      'Que la programación se mantenga consistente.',
    ],
  },
]

const diferentialBlocks: ListBlock[] = [
  {
    title: 'No pierdes avance por un cambio',
    description: 'Con ajustes parciales, no destruyes lo que ya estaba correcto.',
  },
  {
    title: 'Menos doble captura',
    description: 'El calendario se integra con standings, fases y llaves.',
  },
  {
    title: 'Trazabilidad operativa',
    description: 'Puedes auditar regeneraciones y operar también por API/exportes.',
  },
]

const usageCases: string[] = [
  'Ligas semanales con cambios frecuentes de cancha y horario.',
  'Torneos con fase de grupos + final.',
  'Organizaciones que manejan más de un torneo al mismo tiempo.',
]

const faqs: FaqItem[] = [
  {
    question: '¿Puedo mover un partido ya programado sin rehacer todo?',
    answer: 'Sí. Puedes reprogramar partidos de forma individual.',
  },
  {
    question: '¿Qué pasa si hay choque de horario en cancha?',
    answer: 'Futzo valida el conflicto antes de confirmar el cambio.',
  },
  {
    question: '¿Sirve para torneos con grupos y eliminatoria?',
    answer: 'Sí, ese flujo está soportado.',
  },
  {
    question: '¿Soporta formato suizo?',
    answer: 'No actualmente.',
  },
]

const relatedLinks: RelatedLink[] = [
  { label: 'Ver registro por QR', href: '/funcionalidades/registro-equipos-qr' },
  { label: 'Ver gestión de canchas', href: '/funcionalidades/gestion-canchas-horarios' },
  { label: 'Ver estadísticas y tabla', href: '/funcionalidades/estadisticas-torneos' },
]

const keywords = [
  'calendario automático para liga de fútbol',
  'generar calendario de liga de fútbol',
  'software para rol de partidos',
  'reprogramar partidos sin conflictos',
  'liga + eliminatoria calendario',
  'grupos y eliminatoria fútbol',
]

const calendarPageJsonLd = {
  '@type': 'SoftwareApplication',
  name: 'Futzo',
  url: pageUrl,
  description:
    'Calendario automático para generar y ajustar jornadas de ligas de fútbol con validaciones de conflictos y reprogramación parcial.',
  applicationCategory: 'SportsManagementApplication',
  operatingSystem: 'Web',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.6,
    ratingCount: 8864,
  },
  featureList: [
    'Generación automática de jornadas',
    'Reprogramación individual de partidos',
    'Regeneración parcial sin perder avance',
    'Validación de solapes por cancha y horario',
    'Integración con standings y fases',
  ],
}

export const useCalendarioAutomaticoContent = () => ({
  pageTitle,
  pageDescription,
  pageUrl,
  keywords,
  mainBenefits,
  supportedFormats,
  workflowBlocks,
  diferentialBlocks,
  usageCases,
  faqs,
  relatedLinks,
  calendarPageJsonLd,
})
