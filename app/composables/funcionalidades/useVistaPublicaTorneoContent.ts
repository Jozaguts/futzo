type FaqItem = {
  question: string
  answer: string
}

type RelatedLink = {
  label: string
  href: string
}

const pageTitle = 'Vista pública de torneo: resultados, tabla y calendario | Futzo'
const pageDescription =
  'Comparte el estado de tu torneo por URL o QR: tabla de posiciones, últimos resultados, próximos partidos y calendario. Sin login para consultar.'
const pageUrl = 'https://futzo.io/funcionalidades/vista-publica-torneo'

const keywords = [
  'vista pública de torneo de fútbol',
  'tabla de posiciones en línea',
  'compartir resultados de liga por QR',
  'calendario de partidos público',
  'seguimiento de torneo amateur',
]

const publicViewSections: string[] = [
  'Resumen del torneo (liga, nombre, fecha de inicio, formato, equipos).',
  'Tabla de posiciones.',
  'Últimos resultados.',
  'Próximos partidos.',
  'Estadísticas destacadas (goleo, asistencias, tarjetas).',
  'Calendario y jornadas con fecha, hora, sede y cancha.',
]

const accessModel: string[] = [
  'Público: consulta de información deportiva por link o QR.',
  'Privado/admin: gestión interna del torneo.',
]

const privacyGuards: string[] = [
  'No se exponen datos de contacto privados.',
  'No se exponen documentos personales de jugadores.',
]

const realtimeNotes: string[] = [
  'La información suele reflejarse en segundos.',
  'Algunos bloques como tabla de posiciones pueden tardar un poco más durante recálculo.',
  'El flujo se mantiene en actualización continua.',
]

const shareChannels: string[] = [
  'QR (ideal en cancha o publicaciones físicas).',
  'URL directa (ideal para WhatsApp y redes).',
  'El QR apunta a la misma URL pública.',
]

const transparencyNotes: string[] = [
  'La página pública principal está centrada en el torneo.',
  'Hoy no hay ficha pública independiente por partido como página separada.',
]

const operationalBenefits: string[] = [
  'Menos mensajes repetidos de “¿cómo quedó?”.',
  'Menos capturas manuales.',
  'Información más clara para equipos y seguidores.',
  'Mejor experiencia de seguimiento del torneo.',
]

const faqs: FaqItem[] = [
  {
    question: '¿Cualquiera puede ver la tabla y el calendario?',
    answer: 'Sí, con el link o QR público.',
  },
  {
    question: '¿Necesito cuenta para consultar?',
    answer: 'No. El login es para administración.',
  },
  {
    question: '¿Se puede compartir en WhatsApp?',
    answer: 'Sí, con URL directa o QR.',
  },
  {
    question: '¿Se muestran documentos de jugadores?',
    answer: 'No. La vista pública no expone datos sensibles.',
  },
]

const relatedLinks: RelatedLink[] = [
  { label: 'Ver todas las funcionalidades', href: '/funcionalidades' },
  { label: 'Ver estadísticas y tabla', href: '/funcionalidades/estadisticas-torneos' },
  { label: 'Ver calendario automático', href: '/funcionalidades/calendario-automatico' },
  { label: 'Ver registro por QR', href: '/funcionalidades/registro-equipos-qr' },
]

const vistaPublicaPageJsonLd = {
  '@type': 'SoftwareApplication',
  name: 'Futzo',
  url: pageUrl,
  description: 'Compartir públicamente el estado de un torneo de fútbol mediante URL o QR, sin login.',
  applicationCategory: 'SportsManagementApplication',
  operatingSystem: 'Web',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.6,
    ratingCount: 8864,
  },
  featureList: [
    'Tabla de posiciones pública',
    'Últimos resultados y próximos partidos',
    'Calendario por jornadas',
    'Compartir por QR y URL',
    'Consulta sin login',
  ],
}

export const useVistaPublicaTorneoContent = () => ({
  pageTitle,
  pageDescription,
  pageUrl,
  keywords,
  publicViewSections,
  accessModel,
  privacyGuards,
  realtimeNotes,
  shareChannels,
  transparencyNotes,
  operationalBenefits,
  faqs,
  relatedLinks,
  vistaPublicaPageJsonLd,
})
