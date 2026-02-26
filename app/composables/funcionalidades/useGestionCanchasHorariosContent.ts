type FaqItem = {
  question: string
  answer: string
}

type RelatedLink = {
  label: string
  href: string
}

const pageTitle = 'Gestión de canchas y horarios para torneos de fútbol | Futzo'
const pageDescription =
  'Configura sedes, canchas y ventanas por día para programar sin choques. Reasigna partidos a otra cancha y horario sin rehacer todo el calendario.'
const pageUrl = 'https://futzo.io/funcionalidades/gestion-canchas-horarios'

const keywords = [
  'gestión de canchas y horarios de fútbol',
  'asignación de canchas para torneos',
  'evitar choques de cancha y horario',
  'disponibilidad de canchas deportivas',
  'reprogramar partidos por cancha',
]

const canchaSettings: string[] = [
  'Nombre de cancha',
  'Sede o ubicación',
  'Tipo de cancha (fútbol 5, 7 o 11)',
  'Dimensiones',
  'Días y franjas horarias',
]

const conflictPrevention: string[] = [
  'Dos partidos en la misma cancha al mismo tiempo.',
  'Cambios de último minuto que pisan otro partido.',
]

const reprogrammingBenefits: string[] = [
  'Mover un partido individual a otra cancha y hora.',
  'Sin reconstruir todo el calendario.',
  'Menos trabajo operativo y menos errores en cascada.',
]

const availabilityNotes: string[] = [
  'Vista de disponibilidad por cancha para programar con contexto.',
  'La agenda mensual dedicada como módulo separado no aparece hoy como flujo estándar.',
]

const blockingNotes: string[] = [
  'El bloqueo principal es por patrón recurrente de día + franja.',
  'El bloqueo puntual por fecha exacta no está como flujo estándar principal.',
]

const excelVsSystemBenefits: string[] = [
  'Menos choques de cancha y horario.',
  'Cambios más rápidos en operación real.',
  'Mejor control cuando manejas varias sedes.',
  'Menos retrabajo por reprogramaciones.',
]

const faqs: FaqItem[] = [
  {
    question: '¿Se puede evitar doble asignación de cancha?',
    answer: 'Sí. Futzo valida choques de cancha y horario.',
  },
  {
    question: '¿Puedo definir horarios distintos por día?',
    answer: 'Sí. Puedes configurar ventanas diferentes por día.',
  },
  {
    question: '¿Se puede mover un partido a otra cancha?',
    answer: 'Sí, desde reprogramación puedes cambiar cancha y horario sin rehacer todo.',
  },
  {
    question: '¿Puedo bloquear solo una fecha puntual?',
    answer: 'Hoy el flujo principal de bloqueo es recurrente por día + franja.',
  },
]

const relatedLinks: RelatedLink[] = [
  { label: 'Ver todas las funcionalidades', href: '/funcionalidades' },
  { label: 'Ver calendario automático', href: '/funcionalidades/calendario-automatico' },
  { label: 'Ver registro por QR', href: '/funcionalidades/registro-equipos-qr' },
  { label: 'Ver vista pública del torneo', href: '/funcionalidades/vista-publica-torneo' },
]

const gestionCanchasPageJsonLd = {
  '@type': 'SoftwareApplication',
  name: 'Futzo',
  url: pageUrl,
  description: 'Configuración de canchas, ventanas horarias y programación de partidos sin choques de cancha y horario.',
  applicationCategory: 'SportsManagementApplication',
  operatingSystem: 'Web',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.6,
    ratingCount: 8864,
  },
  featureList: [
    'Configuración de canchas por sede',
    'Ventanas horarias por día',
    'Validación de choques de programación',
    'Reasignación de partidos por cancha y horario',
    'Vista de disponibilidad por cancha',
  ],
}

export const useGestionCanchasHorariosContent = () => ({
  pageTitle,
  pageDescription,
  pageUrl,
  keywords,
  canchaSettings,
  conflictPrevention,
  reprogrammingBenefits,
  availabilityNotes,
  blockingNotes,
  excelVsSystemBenefits,
  faqs,
  relatedLinks,
  gestionCanchasPageJsonLd,
})
