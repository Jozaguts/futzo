import { BLOG_ORGANIZAR_LIGA_SLUG } from '~/composables/blog/useBlogPosts'

type TocItem = {
  id: string
  label: string
}

type TournamentFormat = {
  title: string
  description: string
}

type WeeklyTask = {
  day: string
  task: string
}

type InternalLink = {
  label: string
  href: string
}

const pageTitle = 'Cómo organizar una liga de fútbol amateur paso a paso (guía 2026)'
const pageDescription =
  'Guía práctica para organizar una liga amateur: formato, reglas, calendario, registro de equipos y operación semanal sin caos.'
const pageUrl = `https://futzo.io${BLOG_ORGANIZAR_LIGA_SLUG}`
const heroImagePath = '/images/functionalities/blogs/como-organizar-liga-futbol-amateur/secondary-image.webp'
const heroImage = `https://futzo.io${heroImagePath}`

const keywordPrincipal = 'cómo organizar una liga de fútbol amateur'
const keywordsSecundarias = [
  'organizar torneo de fútbol paso a paso',
  'cómo hacer una liga de fútbol',
  'reglas para torneo amateur',
  'software para administrar ligas de fútbol',
]

const tocItems: TocItem[] = [
  { id: 'objetivo-liga', label: '1) Define el objetivo de tu liga' },
  { id: 'formato-torneo', label: '2) Elige formato de torneo' },
  { id: 'reglamento-base', label: '3) Cierra reglas antes de arrancar' },
  { id: 'canchas-horarios', label: '4) Planifica canchas y horarios reales' },
  { id: 'inscripciones', label: '5) Abre inscripciones con flujo claro' },
  { id: 'calendario-planb', label: '6) Genera calendario y prepara plan B' },
  { id: 'resultados-standings', label: '7) Publica resultados y standings' },
  { id: 'ritmo-semanal', label: '8) Crea un ritmo operativo semanal' },
  { id: 'errores-comunes', label: 'Errores comunes' },
  { id: 'checklist-lanzamiento', label: 'Checklist rápido' },
]

const objectiveQuestions = [
  '¿La liga es recreativa, competitiva o mixta?',
  '¿Qué duración tendrá (8, 12 o 16 semanas)?',
  '¿Qué experiencia quieres dar a equipos y jugadores?',
]

const tournamentFormats: TournamentFormat[] = [
  {
    title: 'Liga (round robin)',
    description: 'Todos juegan contra todos. Ideal cuando quieres una tabla de posiciones estable.',
  },
  {
    title: 'Liga + eliminatoria',
    description: 'Primero fase regular, luego playoffs. Mantiene competitividad hasta el final.',
  },
  {
    title: 'Grupos + eliminatoria',
    description: 'Útil cuando tienes muchos equipos y poco calendario disponible.',
  },
]

const rulesChecklist = [
  'Sistema de puntuación',
  'Criterios de desempate',
  'Sanciones (faltas, tarjetas, suspensión)',
  'Reglas de registro de jugadores',
  'Reglas de transferencias',
]

const venueChecklist = [
  'Sedes y canchas disponibles',
  'Ventanas por día y hora',
  'Bloqueos recurrentes (días y horas no jugables)',
  'Tiempos de transición entre partidos',
]

const registrationFlow = [
  'Alta de equipos',
  'Alta de jugadores',
  'Validación (si aplica)',
]

const planBChecklist = [
  'Quién puede solicitar reprogramación',
  'Con cuánta anticipación',
  'Qué pasa si no hay cancha disponible',
  'Cómo se comunica el cambio',
]

const publicationChecklist = [
  'Tabla de posiciones',
  'Ultimos resultados',
  'Proximos partidos',
  'Estadísticas clave (goleadores, tarjetas)',
]

const weeklyTasks: WeeklyTask[] = [
  { day: 'Lunes', task: 'Cierre de resultados y sanciones' },
  { day: 'Martes', task: 'Publicacion de standings actualizados' },
  { day: 'Miércoles', task: 'Ajustes de jornada siguiente' },
  { day: 'Jueves / Viernes', task: 'Confirmaciones finales' },
  { day: 'Fin de semana', task: 'Operacion de partidos' },
]

const commonMistakes = [
  'Cambiar reglas a mitad del torneo',
  'Programar sin validar disponibilidad real',
  'Aceptar registros incompletos "porque luego lo arreglamos"',
  'No definir criterio de desempate desde el inicio',
  'Operar todo por chat sin sistema',
]

const launchChecklist = [
  'Formato de torneo definido',
  'Reglamento cerrado y comunicado',
  'Equipos inscritos con datos completos',
  'Jugadores registrados y validados (si aplica)',
  'Calendario publicado',
  'Canal oficial para resultados y standings',
  'Proceso claro para reprogramaciones',
]

const internalLinks: InternalLink[] = [
  {
    label: 'Calendario automático para ligas',
    href: '/funcionalidades/calendario-automatico',
  },
  {
    label: 'Registro de equipos y jugadores por QR',
    href: '/funcionalidades/registro-equipos-qr',
  },
  {
    label: 'Verificación de jugadores',
    href: '/funcionalidades/verificacion-jugadores',
  },
  {
    label: 'Estadísticas y tabla de posiciones',
    href: '/funcionalidades/estadisticas-torneos',
  },
  {
    label: 'Todas las funcionalidades',
    href: '/funcionalidades',
  },
]

const articleSchema = {
  '@type': 'Article',
  headline: 'Cómo organizar una liga de fútbol amateur paso a paso',
  description: 'Guía práctica para organizar una liga amateur: formato, reglas, calendario, registro de equipos y operación semanal.',
  image: heroImage,
  author: {
    '@type': 'Organization',
    name: 'Futzo',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Futzo',
    logo: {
      '@type': 'ImageObject',
      url: 'https://futzo.io/futzo/logos/logo-17.png',
    },
  },
  mainEntityOfPage: pageUrl,
  inLanguage: 'es-MX',
  datePublished: '2026-02-26',
  dateModified: '2026-02-26',
}

export const useBlogOrganizarLigaContent = () => ({
  pageTitle,
  pageDescription,
  pageUrl,
  heroImagePath,
  heroImage,
  keywordPrincipal,
  keywordsSecundarias,
  tocItems,
  objectiveQuestions,
  tournamentFormats,
  rulesChecklist,
  venueChecklist,
  registrationFlow,
  planBChecklist,
  publicationChecklist,
  weeklyTasks,
  commonMistakes,
  launchChecklist,
  internalLinks,
  articleSchema,
})
