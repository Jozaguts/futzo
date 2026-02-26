import { BLOG_ROL_JUEGOS_SLUG, BLOG_TABLA_POSICIONES_SLUG } from '~/composables/blog/useBlogPosts'

export { BLOG_TABLA_POSICIONES_SLUG }

type TocItem = {
  id: string
  label: string
}

type TeamExample = {
  name: string
  won: number
  draw: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  points: number
  goalDifference: number
}

type InternalLink = {
  label: string
  href: string
}

const pageTitle = 'Cómo calcular la tabla de posiciones en fútbol (guía simple)'
const pageDescription = 'Aprende a calcular puntos, diferencia de goles y desempates en una liga de fútbol con ejemplo paso a paso.'
const pageUrl = `https://futzo.io${BLOG_TABLA_POSICIONES_SLUG}`
const heroImagePath = '/images/functionalities/blogs/como-calcular-tabla-de-posiciones-futbol/secondary-image.webp'
const heroImage = `https://futzo.io${heroImagePath}`

const keywordPrincipal = 'cómo calcular la tabla de posiciones en fútbol'
const keywordsSecundarias = [
  'tabla de posiciones fútbol fórmula',
  'criterios de desempate fútbol',
  'puntos ganados empatados perdidos',
  'diferencia de goles cómo se calcula',
]

const tocItems: TocItem[] = [
  { id: 'sistema-puntos', label: '1) Sistema básico de puntos' },
  { id: 'metricas-tabla', label: '2) Métricas que debe tener la tabla' },
  { id: 'diferencia-goles', label: '3) Cómo calcular la diferencia de goles' },
  { id: 'orden-desempate', label: '4) Orden recomendado de desempate' },
  { id: 'ejemplo-completo', label: '5) Ejemplo completo' },
  { id: 'errores-comunes', label: '6) Errores comunes al calcular standings' },
  { id: 'buenas-practicas', label: '7) Buenas prácticas para evitar conflictos' },
  { id: 'cuanto-automatizar', label: '8) ¿Cuándo conviene automatizar?' },
]

const pointsSystem = ['Ganado: 3 puntos', 'Empatado: 1 punto', 'Perdido: 0 puntos']
const pointsFormula = 'Puntos = (Ganados × 3) + (Empatados × 1) + (Perdidos × 0)'

const requiredMetrics = ['PJ: partidos jugados', 'G: ganados', 'E: empatados', 'P: perdidos', 'GF: goles a favor', 'GC: goles en contra', 'DG: diferencia de goles (GF - GC)', 'PTS: puntos']

const goalDifferenceFormula = 'DG = GF - GC'
const goalDifferenceExamples = ['Equipo A: GF 12, GC 7 → DG +5', 'Equipo B: GF 10, GC 9 → DG +1']

const tiebreakerOrder = ['Puntos', 'Diferencia de goles', 'Goles a favor', 'Goles en contra', 'Resultado entre equipos', 'Sorteo (si aplica)']

const teamExamples: TeamExample[] = [
  {
    name: 'Leones',
    won: 4,
    draw: 1,
    lost: 1,
    goalsFor: 14,
    goalsAgainst: 8,
    points: 13,
    goalDifference: 6,
  },
  {
    name: 'Tiburones',
    won: 4,
    draw: 1,
    lost: 1,
    goalsFor: 12,
    goalsAgainst: 7,
    points: 13,
    goalDifference: 5,
  },
]

const exampleSteps = [
  'Paso A: ambos tienen 13 puntos (4×3 + 1×1).',
  'Paso B: Leones tiene DG +6 y Tiburones DG +5.',
  'Resultado: Leones queda arriba por mejor diferencia de goles.',
]

const commonMistakes = [
  'Sumar mal partidos jugados.',
  'No actualizar goles en contra.',
  'Aplicar desempates en orden incorrecto.',
  'Cambiar criterio a mitad del torneo.',
  'Llevar una versión en Excel y otra en chat.',
]

const bestPractices = [
  'Usa una sola fuente oficial de tabla.',
  'Publica actualización en horario fijo semanal.',
  'Mantén visibles los criterios de desempate.',
  'Registra resultados con validación.',
  'Exporta tabla para respaldo (imagen o Excel).',
]

const automationSignals = [
  'Tienes más de 8 equipos.',
  'Hay varias jornadas activas al mismo tiempo.',
  'Hay cambios frecuentes en resultados o programación.',
]

const automationBenefits = ['Recalcular rápido.', 'Reducir reclamos.', 'Publicar standings más confiables.']

const internalLinks: InternalLink[] = [
  { label: 'Estadísticas y tabla de posiciones', href: '/funcionalidades/estadisticas-torneos' },
  { label: 'Calendario automático', href: '/funcionalidades/calendario-automatico' },
  { label: 'Vista pública del torneo', href: '/funcionalidades/vista-publica-torneo' },
  { label: 'Todas las funcionalidades', href: '/funcionalidades' },
  { label: 'Cómo hacer un rol de juegos de liga', href: BLOG_ROL_JUEGOS_SLUG },
]

const articleSchema = {
  '@type': 'Article',
  headline: 'Cómo calcular la tabla de posiciones en fútbol sin errores',
  description: 'Guía simple para calcular puntos, diferencia de goles y desempates en una liga de fútbol amateur.',
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

export const useBlogTablaPosicionesContent = () => ({
  pageTitle,
  pageDescription,
  pageUrl,
  heroImagePath,
  heroImage,
  keywordPrincipal,
  keywordsSecundarias,
  tocItems,
  pointsSystem,
  pointsFormula,
  requiredMetrics,
  goalDifferenceFormula,
  goalDifferenceExamples,
  tiebreakerOrder,
  teamExamples,
  exampleSteps,
  commonMistakes,
  bestPractices,
  automationSignals,
  automationBenefits,
  internalLinks,
  articleSchema,
})
