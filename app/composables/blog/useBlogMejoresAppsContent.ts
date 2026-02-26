import { BLOG_MEJORES_APPS_SLUG, BLOG_ORGANIZAR_LIGA_SLUG } from '~/composables/blog/useBlogPosts'

export { BLOG_MEJORES_APPS_SLUG }

type TocItem = {
  id: string
  label: string
}

type ToolType = {
  title: string
  pros: string
  cons: string
  note: string
}

type EvaluationBlock = {
  title: string
  points: string[]
}

type InternalLink = {
  label: string
  href: string
}

const pageTitle = 'Mejores apps para administrar torneos de fútbol [2026]'
const pageDescription =
  'Comparativa práctica de apps para gestionar torneos de fútbol. Qué evaluar, errores comunes y cuándo conviene migrar de Excel a un sistema especializado.'
const pageUrl = `https://futzo.io${BLOG_MEJORES_APPS_SLUG}`
const heroImagePath = '/images/functionalities/blogs/mejores-apps-para-administrar-torneos-futbol-2026/secondary-image.webp'
const heroImage = `https://futzo.io${heroImagePath}`

const keywordPrincipal = 'mejores apps para administrar torneos de fútbol'
const keywordsSecundarias = [
  'software para ligas de fútbol amateur',
  'alternativas a excel para torneos',
  'app para organizar campeonato de fútbol',
  'herramientas para gestionar torneos',
]

const tocItems: TocItem[] = [
  { id: 'que-debe-resolver', label: 'Qué debe resolver una app de torneos' },
  { id: 'tipos-herramientas', label: 'Tipos de herramientas que suele evaluar una liga' },
  { id: 'comparar-objetivo', label: 'Cómo comparar apps de forma objetiva' },
  { id: 'senales-migracion', label: 'Señales de que ya debes migrar de Excel' },
  { id: 'evaluar-antes-contratar', label: 'Qué evaluar antes de contratar' },
  { id: 'recomendacion-practica', label: 'Recomendación práctica para ligas amateur' },
  { id: 'checklist-decision', label: 'Checklist rápido de decisión' },
]

const mustSolvePoints = [
  'Calendario automático con reprogramación sin romper todo.',
  'Registro ordenado de equipos y jugadores.',
  'Control de jugadores (validación, bloqueos, transferencias).',
  'Tabla y estadísticas confiables para publicar.',
  'Gestión de canchas y horarios para evitar choques.',
  'Vista pública para compartir por link o QR.',
]

const toolTypes: ToolType[] = [
  {
    title: '1) Hojas de cálculo (Excel / Sheets)',
    pros: 'Bajo costo inicial y flexibilidad.',
    cons: 'Errores manuales, cero trazabilidad y mala escalabilidad.',
    note: 'Útil para torneos pequeños de corta duración. Riesgoso cuando sube la complejidad.',
  },
  {
    title: '2) Herramientas de chat (WhatsApp / Telegram)',
    pros: 'Todos ya lo usan.',
    cons: 'Información dispersa, difícil de auditar y nada estructurado.',
    note: 'Sirve para comunicación, no para operar una liga completa.',
  },
  {
    title: '3) Software especializado para torneos',
    pros: 'Flujo integrado entre registro, calendario, standings y vista pública.',
    cons: 'Curva de adopción inicial y disciplina de uso.',
    note: 'Es la opción más sólida cuando buscas crecimiento sin perder control.',
  },
]

const comparisonMatrix = [
  'Facilidad de implementación',
  'Flexibilidad de formatos de torneo',
  'Control de reglas y validaciones',
  'Calidad de reportes y estadísticas',
  'Experiencia pública para equipos y seguidores',
  'Soporte y velocidad de respuesta',
  'Costo total operativo (no solo mensualidad)',
]

const migrationSignals = [
  'Reprogramas partidos todas las semanas.',
  'Ya tienes conflictos de elegibilidad de jugadores.',
  'Tus capitanes te piden la última versión de la tabla.',
  'El calendario se rompe cuando cambias una cancha.',
  'Pasas más tiempo administrando que creciendo la liga.',
]

const evaluationBlocks: EvaluationBlock[] = [
  {
    title: 'Operación real',
    points: ['Permite ajustes sin rehacer todo?', 'Valida choques de horarios y canchas?', 'Controla reglas del torneo?'],
  },
  {
    title: 'Adopción',
    points: [
      'Tu equipo lo puede usar sin capacitación eterna?',
      'Los capitanes y jugadores entienden el flujo de registro?',
    ],
  },
  {
    title: 'Visibilidad',
    points: ['Puedes compartir estado del torneo públicamente sin login?'],
  },
  {
    title: 'Datos',
    points: ['Te permite exportar información cuando lo necesites?'],
  },
]

const recommendationPoints = [
  'No elijas la app más bonita. Elige la que mejor aguanta tu operación semanal.',
  'En ligas amateur pesa más la integración entre módulos que una feature aislada.',
  'Calendario + registro + control de jugadores + estadísticas + comunicación pública deben funcionar como sistema.',
]

const decisionChecklist = [
  'Soporta tu formato de torneo actual',
  'Te ahorra tiempo real en programación semanal',
  'Reduce errores de inscripción',
  'Mejora la transparencia con equipos',
  'Tiene costo sostenible para tu liga',
]

const internalLinks: InternalLink[] = [
  { label: 'Funcionalidades para administrar ligas', href: '/funcionalidades' },
  { label: 'Calendario automático para torneos', href: '/funcionalidades/calendario-automatico' },
  { label: 'Registro de equipos por QR', href: '/funcionalidades/registro-equipos-qr' },
  { label: 'Verificación de jugadores', href: '/funcionalidades/verificacion-jugadores' },
  { label: 'Estadísticas y tabla de posiciones', href: '/funcionalidades/estadisticas-torneos' },
  { label: 'Cómo organizar una liga paso a paso', href: BLOG_ORGANIZAR_LIGA_SLUG },
]

const articleSchema = {
  '@type': 'Article',
  headline: 'Mejores apps para administrar torneos de fútbol en 2026',
  description: 'Comparativa práctica para elegir software de torneos de fútbol según operación real, escalabilidad y control.',
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

export const useBlogMejoresAppsContent = () => ({
  pageTitle,
  pageDescription,
  pageUrl,
  heroImagePath,
  heroImage,
  keywordPrincipal,
  keywordsSecundarias,
  tocItems,
  mustSolvePoints,
  toolTypes,
  comparisonMatrix,
  migrationSignals,
  evaluationBlocks,
  recommendationPoints,
  decisionChecklist,
  internalLinks,
  articleSchema,
})
