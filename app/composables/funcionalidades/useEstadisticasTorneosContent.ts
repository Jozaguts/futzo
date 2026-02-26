type FaqItem = {
  question: string
  answer: string
}

type RelatedLink = {
  label: string
  href: string
}

const pageTitle = 'Estadísticas y tabla de posiciones para torneos de fútbol | Futzo'
const pageDescription =
  'Consulta standings, goleadores y estadísticas de equipo/jugador en tu torneo. Exporta a imagen o Excel y comparte la vista pública con QR.'
const pageUrl = 'https://futzo.io/funcionalidades/estadisticas-torneos'

const keywords = [
  'estadísticas de torneos de fútbol',
  'tabla de posiciones fútbol',
  'ranking de goleadores y asistencias',
  'desempates en liga de fútbol',
  'exportar tabla de posiciones excel',
]

const teamStats: string[] = [
  'Partidos jugados',
  'Ganados',
  'Empatados',
  'Perdidos',
  'Goles a favor',
  'Goles en contra',
  'Diferencia de goles',
  'Puntos',
]

const playerStats: string[] = [
  'Partidos jugados',
  'Torneos jugados',
  'Goles',
  'Asistencias',
  'Faltas',
  'Amarillas',
  'Rojas',
  'Autogoles',
]

const rankingTop5: string[] = ['Goleadores', 'Asistidores', 'Más amarillas', 'Más rojas']

const realtimeNotes: string[] = [
  'Los eventos y resultados capturados se reflejan prácticamente al momento.',
  'La tabla de posiciones se recalcula en segundo plano (normalmente en segundos).',
  'Si el proceso de recálculo se detiene, puede haber retraso temporal hasta que vuelva a procesar.',
]

const tieBreakers: string[] = [
  'Puntos',
  'Diferencia de goles',
  'Goles a favor',
  'Goles en contra',
  'Resultado entre equipos',
  'Sorteo',
]

const adminExports: string[] = [
  'Tabla de posiciones: imagen y Excel.',
  'Estadísticas del torneo: imagen y Excel.',
  'Jornada y calendario: exportable.',
]

const publicShare: string[] = [
  'Vista pública del torneo con standings, últimos resultados, próximos partidos y stats.',
  'Vista pública de calendario.',
  'QR para compartir seguimiento del torneo.',
]

const replaceWhatsAppBenefits: string[] = [
  'Una sola fuente de verdad para toda la liga.',
  'Menos discusiones por datos desactualizados.',
  'Menos trabajo manual del organizador.',
  'Mejor experiencia para jugadores y seguidores.',
]

const faqs: FaqItem[] = [
  {
    question: '¿Puedo exportar la tabla de posiciones?',
    answer: 'Sí. Puedes exportarla en imagen y Excel.',
  },
  {
    question: '¿También exporta estadísticas del torneo?',
    answer: 'Sí, también en imagen y Excel.',
  },
  {
    question: '¿Qué ve el público sin entrar al panel admin?',
    answer: 'Puede ver standings, resultados recientes, próximos partidos y estadísticas en la vista pública.',
  },
  {
    question: '¿Cómo comparto esas estadísticas?',
    answer: 'Con enlace público y QR del torneo.',
  },
]

const relatedLinks: RelatedLink[] = [
  { label: 'Ver todas las funcionalidades', href: '/funcionalidades' },
  { label: 'Ver calendario automático', href: '/funcionalidades/calendario-automatico' },
  { label: 'Ver vista pública del torneo', href: '/funcionalidades/vista-publica-torneo' },
  { label: 'Ver control de jugadores', href: '/funcionalidades/verificacion-jugadores' },
]

const estadisticasPageJsonLd = {
  '@type': 'SoftwareApplication',
  name: 'Futzo',
  url: pageUrl,
  description:
    'Standings, estadísticas de equipos y jugadores, rankings y exportaciones para torneos de fútbol amateur.',
  applicationCategory: 'SportsManagementApplication',
  operatingSystem: 'Web',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.6,
    ratingCount: 8864,
  },
  featureList: [
    'Tabla de posiciones con criterios de desempate',
    'Estadísticas por equipo y jugador',
    'Rankings Top 5 de torneo',
    'Exportación a imagen y Excel',
    'Vista pública y QR para compartir',
  ],
}

export const useEstadisticasTorneosContent = () => ({
  pageTitle,
  pageDescription,
  pageUrl,
  keywords,
  teamStats,
  playerStats,
  rankingTop5,
  realtimeNotes,
  tieBreakers,
  adminExports,
  publicShare,
  replaceWhatsAppBenefits,
  faqs,
  relatedLinks,
  estadisticasPageJsonLd,
})
