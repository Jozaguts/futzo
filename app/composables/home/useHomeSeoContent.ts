import type {FutzoPlan} from '~/types'

type NavLink = {
  label: string
  href: string
}

type SocialProofItem = {
  value: string
  label: string
}

type StepItem = {
  title: string
  description: string
  icon: string
}

type BenefitItem = {
  title: string
  description: string
  icon: string
}

type ScreenshotItem = {
  src: string
  alt: string
  title: string
}

type TestimonialItem = {
  quote: string
  author: string
  role: string
  city: string
}

type AudienceItem = {
  title: string
  description: string
}

type ComparisonItem = {
  withoutFutzo: string
  withFutzo: string
}

type FaqItem = {
  question: string
  answer: string
}

type PlanMeta = {
  key: 'kickoff' | 'proPlay' | 'eliteLeague'
  image: string
  features: string[]
  featured?: boolean
  badge?: string
  fallback: Pick<FutzoPlan, 'name' | 'price' | 'annually_price' | 'annual_saving'>
}

export const useHomeSeoContent = () => {
  const seoTitle = 'Software para administrar ligas de fútbol | Futzo'
  const seoDescription =
    'Organiza tu liga amateur sin Excel ni caos en WhatsApp. Calendario automático, registro por QR, estadísticas al instante. Prueba gratis 7 días.'

  const navLinks: NavLink[] = [
    { label: 'Cómo funciona', href: '#como-funciona' },
    { label: 'Beneficios', href: '#beneficios' },
    { label: 'Precios', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ]

  const socialProof: SocialProofItem[] = [
    { value: '62', label: 'ligas ya operan con Futzo' },
    { value: '59', label: 'torneos creados' },
    { value: '1028', label: 'jugadores registrados' },
  ]

  const problemParagraphs = [
    'Armar el calendario a mano. Perseguir a los capitanes por WhatsApp para confirmar horarios. Actualizar la tabla de posiciones en una hoja de cálculo que siempre tiene un error.',
    'Si tu semana se ve así, no es porque seas desorganizado. Es porque estás usando herramientas que no se hicieron para esto.',
  ]

  const steps: StepItem[] = [
    {
      title: 'Paso 1: Crea tu torneo',
      description:
        'Define formato (liga, eliminatoria, suizo o combinado), reglas y fechas. Toma menos de 5 minutos.',
      icon: 'lucide:clipboard-check',
    },
    {
      title: 'Paso 2: Comparte el QR con tus equipos',
      description:
        'Cada equipo recibe un enlace o QR para registrarse solo. Los jugadores suben su información y tú solo apruebas.',
      icon: 'lucide:qr-code',
    },
    {
      title: 'Paso 3: El calendario se genera solo',
      description:
        'Futzo arma jornadas, asigna canchas según disponibilidad y publica horarios. Si mueves un partido, lo haces en dos clics.',
      icon: 'lucide:calendar-check-2',
    },
  ]

  const benefits: BenefitItem[] = [
    {
      title: 'Calendario automático de partidos',
      description:
        'Define canchas, horarios y preferencias de equipo. Futzo genera jornadas sin conflictos y te permite reprogramar al momento.',
      icon: 'lucide:calendar-days',
    },
    {
      title: 'Registro de equipos y jugadores por QR',
      description:
        'Comparte un enlace o código QR. El dueño del equipo inscribe a sus jugadores desde el celular y tú apruebas.',
      icon: 'lucide:user-round-check',
    },
    {
      title: 'Verificación y bloqueo de jugadores',
      description:
        'Si un jugador ya participó con otro equipo, Futzo lo detecta. Configura reglas de transferencia por torneo.',
      icon: 'lucide:shield-check',
    },
    {
      title: 'Estadísticas actualizadas al instante',
      description:
        'Goles, tarjetas, tabla de posiciones y rendimiento por jugador se actualizan cuando registras resultados.',
      icon: 'lucide:chart-column-big',
    },
    {
      title: 'Control de canchas y horarios',
      description:
        'Registra sedes, define ventanas de disponibilidad y evita rehacer el calendario cuando hay cambios de último minuto.',
      icon: 'lucide:map-pinned',
    },
    {
      title: 'Vista pública del torneo',
      description:
        'Tus equipos consultan calendario, resultados y posiciones desde un enlace público, sin pedir capturas por chat.',
      icon: 'lucide:monitor-smartphone',
    },
  ]

  const screenshots: ScreenshotItem[] = [
    {
      src: '/images/dashboard-desktop.png',
      alt: 'Vista del dashboard principal de Futzo',
      title: 'Dashboard operativo',
    },
    {
      src: '/images/tournament-desktop.png',
      alt: 'Vista de torneos y calendario en Futzo',
      title: 'Torneos y calendario',
    },
    {
      src: '/images/teams-desktop.png',
      alt: 'Vista de gestión de equipos en Futzo',
      title: 'Gestión de equipos',
    },
    {
      src: '/images/players-desktop.png',
      alt: 'Vista de registro y control de jugadores en Futzo',
      title: 'Control de jugadores',
    },
    {
      src: '/images/location-desktop.png',
      alt: 'Vista de sedes y campos de juego en Futzo',
      title: 'Sedes y canchas',
    },
    {
      src: '/images/public-view-desktop.png',
      alt: 'Vista de flujo de registro de jugadores en Futzo',
      title: 'Registro digital',
    },
  ]

  const testimonials: TestimonialItem[] = [
    {
      quote:
        'Antes tardaba todo el martes armando el calendario de la semana. Ahora lo hace Futzo en segundos y yo solo reviso.',
      author: 'Alex',
      role: 'Organizador de Liga Ixtapa',
      city: 'Puerto Vallarta',
    },
    {
      quote:
        'Pasamos de perseguir capitanes por WhatsApp a recibir registros completos por QR. La operación cambió por completo.',
      author: 'Mónica',
      role: 'Coordinadora de Torneo Bahía',
      city: 'Guadalajara',
    },
  ]

  const audiences: AudienceItem[] = [
    {
      title: 'Organizadores de ligas amateur',
      description:
        'Si manejas una liga con 4 o 40 equipos, Futzo se adapta y escala contigo sin complicar la operación.',
    },
    {
      title: 'Dueños de complejos deportivos',
      description: 'Si rentas canchas y organizas torneos, Futzo te ayuda a ocupar horarios y evitar conflictos.',
    },
    {
      title: 'Coordinadores de torneos relámpago',
      description:
        'Para torneos de fin de semana con fase de grupos y eliminatoria: configuras una vez, publicas y listo.',
    },
  ]

  const comparisonRows: ComparisonItem[] = [
    {
      withoutFutzo: 'Calendario en Excel que siempre tiene un error',
      withFutzo: 'Calendario generado automáticamente sin conflictos',
    },
    {
      withoutFutzo: 'Perseguir capitanes por WhatsApp para inscripciones',
      withFutzo: 'Registro automático por QR desde el celular',
    },
    {
      withoutFutzo: 'No hay forma confiable de validar cachirules',
      withFutzo: 'Sistema de bloqueo y transferencias por torneo',
    },
    {
      withoutFutzo: 'Tabla de posiciones actualizada a mano',
      withFutzo: 'Posiciones y estadísticas actualizadas al instante',
    },
    {
      withoutFutzo: 'Capturas de pantalla compartidas por chat',
      withFutzo: 'Vista pública con enlace directo para equipos y jugadores',
    },
  ]

  const faqs: FaqItem[] = [
    {
      question: '¿Necesito instalar algo?',
      answer:
        'No. Futzo funciona en el navegador de cualquier dispositivo. No hay app que instalar ni software que configurar.',
    },
    {
      question: '¿Qué pasa cuando terminan los 7 días de prueba?',
      answer:
        'Si no eliges un plan, tu cuenta se pausa y no se te cobra nada. Tu configuración y datos se guardan por 30 días.',
    },
    {
      question: '¿Puedo migrar los datos de mi liga actual?',
      answer:
        'Sí. Puedes importar jugadores desde archivo y configurar la estructura de tu liga. Si necesitas ayuda, soporte te guía.',
    },
    {
      question: '¿Cuántos equipos y torneos puedo tener?',
      answer: 'Todos los planes incluyen torneos ilimitados. El número de equipos depende del torneo, no del plan.',
    },
    {
      question: '¿Funciona para torneos de un solo día?',
      answer:
        'Sí. Puedes crear torneos relámpago con fase de grupos y eliminatoria. Configuras, publicas y listo.',
    },
    {
      question: '¿Qué formatos de torneo soporta?',
      answer: 'Liga (round robin), eliminatoria directa, liga + eliminatoria y formato suizo.',
    },
    {
      question: '¿Los equipos y jugadores necesitan cuenta?',
      answer:
        'No. Se registran desde un enlace público o QR sin crear cuenta. Tú apruebas o rechazas desde tu panel.',
    },
  ]

  const pricingPlans: PlanMeta[] = [
    {
      key: 'kickoff',
      image: '/images/logo-08.png',
      features: [
        'Torneos ilimitados',
        'Calendario automático',
        'Registro de equipos y jugadores',
        'Resultados y tabla de posiciones',
        'Vista pública del torneo con QR',
      ],
      fallback: {
        name: 'Kickoff',
        price: '499',
        annually_price: '439',
        annual_saving: '720',
      },
    },
    {
      key: 'proPlay',
      image: '/images/logo-07.png',
      features: [
        'Incluye todo lo de Kickoff',
        'Verificación de jugadores',
        'Bloqueo de transferencias por torneo',
        'Reprogramación completa de partidos',
        'Gestión de canchas y horarios',
      ],
      featured: true,
      badge: 'Más popular',
      fallback: {
        name: 'ProPlay',
        price: '799',
        annually_price: '639',
        annual_saving: '1920',
      },
    },
    {
      key: 'eliteLeague',
      image: '/images/logo-08.png',
      features: [
        'Incluye todo lo de ProPlay',
        'Roles avanzados (árbitros, staff, admins)',
        'Historial completo de torneos',
        'Branding básico para la liga',
        'Acceso anticipado a funciones nuevas',
      ],
      fallback: {
        name: 'EliteLeague',
        price: '1499',
        annually_price: '1274',
        annual_saving: '2700',
      },
    },
  ]

  return {
    seoTitle,
    seoDescription,
    navLinks,
    socialProof,
    problemParagraphs,
    steps,
    benefits,
    screenshots,
    testimonials,
    audiences,
    comparisonRows,
    faqs,
    pricingPlans,
  }
}
