import { BLOG_ORGANIZAR_LIGA_SLUG, BLOG_ROL_JUEGOS_SLUG } from '~/composables/blog/useBlogPosts'

export { BLOG_ROL_JUEGOS_SLUG }

type TocItem = {
  id: string
  label: string
}

type WeeklyTask = {
  day: string
  task: string
}

type InternalLink = {
  label: string
  href: string
}

const pageTitle = 'Cómo hacer un rol de juegos para liga de fútbol (sin conflictos)'
const pageDescription =
  'Aprende a crear un rol de juegos claro y operable: formato, horarios, canchas, reglas de reprogramación y checklist semanal.'
const pageUrl = `https://futzo.io${BLOG_ROL_JUEGOS_SLUG}`
const heroImagePath = '/images/functionalities/blogs/como-hacer-rol-de-juegos-liga-futbol/secondary-image.webp'
const heroImage = `https://futzo.io${heroImagePath}`

const keywordPrincipal = 'cómo hacer un rol de juegos para liga de fútbol'
const keywordsSecundarias = [
  'rol de partidos de fútbol',
  'calendario de jornadas liga amateur',
  'programar partidos sin conflictos',
  'software para calendario de torneos',
]

const tocItems: TocItem[] = [
  { id: 'marco-programacion', label: '1) Define el marco antes de programar' },
  { id: 'disponibilidad-canchas', label: '2) Levanta disponibilidad real de canchas' },
  { id: 'estructura-jornada', label: '3) Elige una estructura de jornada clara' },
  { id: 'validar-conflictos', label: '4) Arma el primer rol y valida conflictos' },
  { id: 'version-oficial', label: '5) Publica una sola versión oficial' },
  { id: 'politica-reprogramacion', label: '6) Crea política de reprogramación' },
  { id: 'rutina-semanal', label: '7) Establece rutina semanal de operación' },
  { id: 'plantilla-rapida', label: 'Plantilla rápida para tu rol de juegos' },
  { id: 'errores-comunes', label: 'Errores comunes que rompen un rol' },
  { id: 'cuando-migrar', label: 'Cuándo conviene pasar a software' },
]

const planningFrame = [
  'Formato del torneo',
  'Número de equipos',
  'Duración del torneo',
  'Días oficiales de juego',
  'Reglas de reprogramación',
]

const availabilityChecklist = [
  'Canchas activas',
  'Ventanas por día',
  'Tiempos de transición entre partidos',
  'Bloqueos recurrentes',
]

const matchdayStructureChecklist = [
  'Prioridad por categoría',
  'Ventanas de prime time',
  'Reglas para evitar dobles juegos en la misma jornada',
]

const validationChecklist = [
  'Choques de cancha u horario',
  'Partidos fuera de ventana',
  'Equipos repetidos en la misma jornada',
  'Descansos desbalanceados',
]

const officialVersionChannels = ['Enlace público', 'Tablero oficial', 'Vista de calendario central']

const reschedulePolicyChecklist = [
  'Quién puede pedir cambio',
  'Cuánto tiempo antes',
  'Condiciones para aprobar',
  'Prioridad de reasignación',
]

const weeklyTasks: WeeklyTask[] = [
  { day: 'Lunes', task: 'Confirmar resultados y sanciones' },
  { day: 'Martes', task: 'Recalcular tabla y publicar' },
  { day: 'Miércoles', task: 'Preparar siguiente jornada' },
  { day: 'Jueves', task: 'Cerrar cambios permitidos' },
  { day: 'Viernes', task: 'Publicar versión final' },
]

const templateFields = ['Jornada', 'Equipo local vs visitante', 'Fecha', 'Hora', 'Sede', 'Cancha', 'Estado (programado/reprogramado/jugado)']

const commonMistakes = [
  'Programar sin disponibilidad real de canchas',
  'Cambiar partidos sin actualizar versión oficial',
  'No documentar reglas de reprogramación',
  'Ajustar por presión del chat, no por regla',
  'No dejar trazabilidad de cambios',
]

const migrationSignals = [
  'Tienes 8 o más equipos',
  'Haces cambios semanales de horario',
  'Operas en más de una sede',
]

const softwareBenefits = [
  'Generar y ajustar sin rehacer todo',
  'Validar conflictos automáticamente',
  'Compartir calendario en tiempo real',
]

const internalLinks: InternalLink[] = [
  { label: 'Calendario automático de partidos', href: '/funcionalidades/calendario-automatico' },
  { label: 'Gestión de canchas y horarios', href: '/funcionalidades/gestion-canchas-horarios' },
  { label: 'Vista pública del torneo', href: '/funcionalidades/vista-publica-torneo' },
  { label: 'Todas las funcionalidades', href: '/funcionalidades' },
  { label: 'Cómo organizar una liga paso a paso', href: BLOG_ORGANIZAR_LIGA_SLUG },
]

const articleSchema = {
  '@type': 'Article',
  headline: 'Cómo hacer un rol de juegos para liga de fútbol sin volverte loco',
  description: 'Guía práctica para crear y operar un rol de juegos sin conflictos de horario y con reglas de reprogramación claras.',
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

export const useBlogRolJuegosContent = () => ({
  pageTitle,
  pageDescription,
  pageUrl,
  heroImagePath,
  heroImage,
  keywordPrincipal,
  keywordsSecundarias,
  tocItems,
  planningFrame,
  availabilityChecklist,
  matchdayStructureChecklist,
  validationChecklist,
  officialVersionChannels,
  reschedulePolicyChecklist,
  weeklyTasks,
  templateFields,
  commonMistakes,
  migrationSignals,
  softwareBenefits,
  internalLinks,
  articleSchema,
})
