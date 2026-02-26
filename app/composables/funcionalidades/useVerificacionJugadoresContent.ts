type FaqItem = {
  question: string
  answer: string
}

type RelatedLink = {
  label: string
  href: string
}

const pageTitle = 'Verificación de jugadores y control de transferencias | Futzo'
const pageDescription =
  'Controla altas, validaciones y transferencias de jugadores en tu liga. Define bloqueos por días, aplica reglas de torneo y registra motivos de rechazo con trazabilidad.'
const pageUrl = 'https://futzo.io/funcionalidades/verificacion-jugadores'

const keywords = [
  'verificación de jugadores liga de fútbol',
  'evitar jugadores no elegibles en torneo',
  'control de transferencias de jugadores',
  'validación de identidad de jugadores',
  'bloqueo de jugadores por reglas de torneo',
]

const controlScopes: string[] = [
  'Estado de validación del jugador.',
  'Reglas para permitir o bloquear movimientos.',
  'Cupos del equipo destino.',
  'Evidencia de revisión: motivo, fecha y revisor.',
]

const blockingRules: string[] = [
  'El jugador ya pertenece al equipo al que lo quieren mover.',
  'El equipo destino ya no tiene cupo disponible.',
  'Tiene bloqueo de transferencia activo y aún no vence.',
  'El torneo exige validación de identidad y está pendiente.',
  'No cumple reglas del torneo (por ejemplo, edad/cupo según regla).',
]

const transferWindowNotes: string[] = [
  'Puedes definir cuántos días dura el bloqueo (7, 15, 30, etc.).',
  'Si pones 0 días, prácticamente no hay bloqueo por tiempo.',
  'Si defines un valor mayor, el sistema respeta esa ventana antes de permitir cambios.',
]

const rejectionEvidence: string[] = [
  'Motivo de rechazo.',
  'Fecha de revisión.',
  'Quién hizo la revisión.',
  'Estado actual.',
  'Documentos cargados.',
]

const chatVsSystemBenefits: string[] = [
  'Decisiones consistentes, no a criterio del momento.',
  'Menos discusiones por falta de evidencia.',
  'Reglas visibles para todos.',
  'Trazabilidad operativa para auditoría interna.',
]

const faqs: FaqItem[] = [
  {
    question: '¿Puedo liberar un jugador manualmente?',
    answer: 'Sí. El admin puede liberarlo para permitir el cambio.',
  },
  {
    question: '¿Se puede configurar la ventana de transferencias?',
    answer: 'Sí, por días. Si es 0, no hay bloqueo por tiempo.',
  },
  {
    question: '¿Siempre se exige validación de identidad?',
    answer: 'No. Solo cuando el torneo o la liga la activa.',
  },
  {
    question: '¿Qué información queda cuando rechazo una validación?',
    answer: 'Motivo, fecha, revisor, estado y documentos.',
  },
]

const relatedLinks: RelatedLink[] = [
  { label: 'Ver todas las funcionalidades', href: '/funcionalidades' },
  { label: 'Ver calendario automático', href: '/funcionalidades/calendario-automatico' },
  { label: 'Ver registro por QR', href: '/funcionalidades/registro-equipos-qr' },
  { label: 'Ver estadísticas y tabla', href: '/funcionalidades/estadisticas-torneos' },
]

const verificacionPageJsonLd = {
  '@type': 'SoftwareApplication',
  name: 'Futzo',
  url: pageUrl,
  description: 'Validación de identidad de jugadores y control de transferencias con reglas configurables por torneo.',
  applicationCategory: 'SportsManagementApplication',
  operatingSystem: 'Web',
  featureList: [
    'Validación opcional de identidad',
    'Bloqueo de transferencias por días',
    'Liberación manual por admin',
    'Control por cupos y reglas de torneo',
    'Registro de motivo y revisor en rechazos',
  ],
}

export const useVerificacionJugadoresContent = () => ({
  pageTitle,
  pageDescription,
  pageUrl,
  keywords,
  controlScopes,
  blockingRules,
  transferWindowNotes,
  rejectionEvidence,
  chatVsSystemBenefits,
  faqs,
  relatedLinks,
  verificacionPageJsonLd,
})
