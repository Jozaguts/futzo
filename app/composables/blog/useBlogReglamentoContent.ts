import { BLOG_REGLAMENTO_PLANTILLA_SLUG, BLOG_ROL_JUEGOS_SLUG } from '~/composables/blog/useBlogPosts'

export { BLOG_REGLAMENTO_PLANTILLA_SLUG }

type TocItem = {
  id: string
  label: string
}

type TemplateBlock = {
  title: string
  items: string[]
}

type InternalLink = {
  label: string
  href: string
}

const pageTitle = 'Reglamento para liga de fútbol amateur: plantilla gratis'
const pageDescription =
  'Descarga una estructura práctica de reglamento para tu liga amateur: puntuación, desempates, sanciones, registro y transferencias.'
const pageUrl = `https://futzo.io${BLOG_REGLAMENTO_PLANTILLA_SLUG}`
const heroImagePath = '/images/functionalities/blogs/reglamento-liga-futbol-amateur-plantilla/secondary-image.webp'
const heroImage = `https://futzo.io${heroImagePath}`

const keywordPrincipal = 'reglamento para liga de fútbol amateur'
const keywordsSecundarias = [
  'plantilla reglamento torneo de fútbol',
  'reglas para liga amateur',
  'desempates y sanciones torneo',
  'documento de reglas para campeonato',
]

const tocItems: TocItem[] = [
  { id: 'que-debe-incluir', label: 'Qué debe incluir un reglamento de liga amateur' },
  { id: 'plantilla-base', label: 'Plantilla base (copiar y adaptar)' },
  { id: 'recomendaciones-practicas', label: 'Recomendaciones para que sí funcione' },
  { id: 'errores-comunes', label: 'Errores comunes al redactar reglamentos' },
  { id: 'operacion-sin-friccion', label: 'Cómo operarlo sin fricción' },
]

const minimumSections = [
  'Estructura del torneo (formato, jornadas, fases)',
  'Sistema de puntuación',
  'Criterios de desempate',
  'Reglas de inscripción de equipos y jugadores',
  'Normas disciplinarias (amarillas, rojas, sanciones)',
  'Política de transferencias y reemplazos',
  'Reglas de reprogramación',
  'Canales oficiales de comunicación',
]

const templateBlocks: TemplateBlock[] = [
  {
    title: '1) Datos generales',
    items: ['Nombre del torneo', 'Temporada', 'Organizador', 'Fecha de inicio', 'Fecha estimada de cierre'],
  },
  {
    title: '2) Formato de competencia',
    items: ['Formato (Liga / Liga+Eliminatoria / Grupos+Eliminatoria)', 'Número de equipos', 'Número de jornadas', 'Clasificados a fase final'],
  },
  {
    title: '3) Puntuación',
    items: ['Partido ganado: 3 puntos', 'Partido empatado: 1 punto', 'Partido perdido: 0 puntos'],
  },
  {
    title: '4) Criterios de desempate (orden sugerido)',
    items: ['1. Puntos', '2. Diferencia de goles', '3. Goles a favor', '4. Goles en contra', '5. Resultado entre equipos', '6. Sorteo'],
  },
  {
    title: '5) Inscripción de equipos y jugadores',
    items: ['Requisitos de alta de equipo', 'Requisitos de alta de jugador', 'Fecha o condición de cierre de inscripciones', 'Validación de identidad (si aplica)'],
  },
  {
    title: '6) Transferencias y cambios de plantilla',
    items: ['Ventana de transferencias (días)', 'Condiciones para liberar jugador', 'Casos excepcionales autorizables por administración'],
  },
  {
    title: '7) Disciplina y sanciones',
    items: ['Acumulación de amarillas', 'Expulsiones y suspensión mínima', 'Conductas sancionables', 'Proceso de apelación (si aplica)'],
  },
  {
    title: '8) Reprogramaciones',
    items: ['Quién puede solicitar cambio', 'Anticipación mínima', 'Condiciones de aprobación', 'Criterio de resolución en caso de conflicto'],
  },
  {
    title: '9) Publicación oficial',
    items: ['Canal oficial de calendario', 'Canal oficial de resultados y tabla', 'Regla de única versión válida'],
  },
  {
    title: '10) Aceptación',
    items: ['Aceptación por parte de responsables de equipo', 'Fecha de publicación del reglamento', 'Versión del documento'],
  },
]

const practicalRecommendations = [
  'Escribe reglas cortas y sin ambigüedad.',
  'Evita párrafos jurídicos imposibles de aplicar.',
  'No cambies reglas a mitad del torneo salvo emergencia y por escrito.',
  'Guarda versión y fecha de cada actualización.',
]

const commonMistakes = [
  'Copiar un reglamento ajeno que no coincide con tu operación.',
  'Dejar vacíos en transferencias y sanciones.',
  'No definir desempates desde el inicio.',
  'Publicar reglas en PDF y operar distinto en chat.',
]

const operationalFlow = [
  'Inscripción de equipos y jugadores',
  'Calendario y reprogramaciones',
  'Validación de jugadores',
  'Standings y estadísticas',
  'Comunicación pública',
]

const internalLinks: InternalLink[] = [
  { label: 'Verificación de jugadores', href: '/funcionalidades/verificacion-jugadores' },
  { label: 'Registro de equipos y jugadores por QR', href: '/funcionalidades/registro-equipos-qr' },
  { label: 'Calendario automático de partidos', href: '/funcionalidades/calendario-automatico' },
  { label: 'Tabla de posiciones y estadísticas', href: '/funcionalidades/estadisticas-torneos' },
  { label: 'Todas las funcionalidades', href: '/funcionalidades' },
  { label: 'Cómo hacer un rol de juegos de liga', href: BLOG_ROL_JUEGOS_SLUG },
]

const articleSchema = {
  '@type': 'Article',
  headline: 'Reglamento para liga de fútbol amateur: plantilla práctica y editable',
  description: 'Plantilla útil para redactar reglamento de liga amateur con puntuación, desempates, sanciones y transferencias.',
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

export const useBlogReglamentoContent = () => ({
  pageTitle,
  pageDescription,
  pageUrl,
  heroImagePath,
  heroImage,
  keywordPrincipal,
  keywordsSecundarias,
  tocItems,
  minimumSections,
  templateBlocks,
  practicalRecommendations,
  commonMistakes,
  operationalFlow,
  internalLinks,
  articleSchema,
})
