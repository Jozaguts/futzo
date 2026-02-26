<script setup lang="ts">
import LandingMarketingShell from '~/components/layout/LandingMarketingShell.vue'

type FeatureModule = {
  title: string
  description: string
  idealFor: string
  path: string
  icon: string
}

type FaqItem = {
  question: string
  answer: string
}

const modules: FeatureModule[] = [
  {
    title: 'Calendario automático de partidos',
    description: 'Genera jornadas sin choques de horario y ajusta partidos sin rehacer toda la programación.',
    idealFor: 'ligas que reprograman seguido y quieren evitar errores manuales.',
    path: '/funcionalidades/calendario-automatico',
    icon: 'lucide:calendar-check-2',
  },
  {
    title: 'Registro de equipos y jugadores por QR',
    description: 'Organiza inscripciones en 2 pasos: QR del torneo para equipos y QR del equipo para jugadores.',
    idealFor: 'ligas que quieren dejar de pedir datos por WhatsApp.',
    path: '/funcionalidades/registro-equipos-qr',
    icon: 'lucide:qr-code',
  },
  {
    title: 'Verificación de jugadores y transferencias',
    description: 'Aplica reglas de validación, bloqueos por ventana y liberaciones manuales cuando haga falta.',
    idealFor: 'ligas que necesitan control operativo y menos disputas por elegibilidad.',
    path: '/funcionalidades/verificacion-jugadores',
    icon: 'lucide:shield-check',
  },
  {
    title: 'Estadísticas y tabla de posiciones',
    description: 'Consulta standings, rankings y estadísticas de equipo/jugador. Exporta a imagen o Excel.',
    idealFor: 'torneos que quieren reporteo claro y comunicación profesional.',
    path: '/funcionalidades/estadisticas-torneos',
    icon: 'lucide:chart-column-big',
  },
  {
    title: 'Gestión de canchas y horarios',
    description: 'Configura sedes, ventanas horarias por día y evita empalmes al programar o reprogramar.',
    idealFor: 'operaciones con varias canchas y alta rotación de horarios.',
    path: '/funcionalidades/gestion-canchas-horarios',
    icon: 'lucide:map-pinned',
  },
  {
    title: 'Vista pública del torneo',
    description: 'Comparte tabla, resultados y próximos partidos por URL o QR, sin login para consulta.',
    idealFor: 'ligas que quieren visibilidad pública sin carga operativa extra.',
    path: '/funcionalidades/vista-publica-torneo',
    icon: 'lucide:monitor-smartphone',
  },
]

const quickFaqs: FaqItem[] = [
  {
    question: '¿Necesito instalar algo?',
    answer: 'No. Futzo funciona en navegador.',
  },
  {
    question: '¿Los equipos necesitan cuenta para consultar el torneo?',
    answer: 'No para consultar vista pública; el login es para administración.',
  },
  {
    question: '¿Puedo empezar gratis?',
    answer: 'Sí, puedes iniciar prueba sin tarjeta.',
  },
]

const pageTitle = 'Funcionalidades para administrar ligas y torneos de fútbol | Futzo'
const pageDescription =
  'Conoce todas las funcionalidades de Futzo: calendario automático, registro por QR, verificación de jugadores, estadísticas, gestión de canchas y vista pública del torneo.'
const pageUrl = 'https://futzo.io/funcionalidades'

definePageMeta({
  layout: 'legacy',
  sanctum: { excluded: true },
})

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  keywords: [
    'funcionalidades para administrar ligas de fútbol',
    'software para torneos de fútbol',
    'herramientas para organizar ligas amateur',
    'gestión de torneos en línea',
    'sistema para ligas de fútbol',
  ].join(', '),
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: 'website',
  ogUrl: pageUrl,
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
})

const collectionPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Funcionalidades para administrar ligas y torneos de fútbol',
  url: pageUrl,
  description: 'Página índice de funcionalidades de Futzo para operar ligas y torneos de fútbol amateur.',
  hasPart: modules.map((module) => ({
    '@type': 'WebPage',
    name: module.title,
    url: `https://futzo.io${module.path}`,
  })),
}

const { isAuthenticated } = useSanctumAuth()
const router = useRouter()

const ctaLabel = computed(() => (isAuthenticated?.value ? 'Ir al Dashboard' : 'Prueba Futzo gratis'))
const firstModules = computed(() => modules.slice(0, 3))
const remainingModules = computed(() => modules.slice(3))

const goToTrial = async () => {
  if (isAuthenticated?.value) {
    await router.push('/dashboard')
    return
  }
  await router.push('/login')
}

useHead({
  link: [{ rel: 'canonical', href: pageUrl }],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(collectionPageJsonLd),
    },
  ],
})
</script>

<template>
  <LandingMarketingShell>
    <div class="feature-hub-page" role="main">
        <section class="feature-hub-page__hero">
          <v-container class="feature-hub-page__container">
            <div class="feature-hub-page__hero-grid">
              <div class="feature-hub-page__hero-copy">
                <p class="feature-hub-page__eyebrow">Hub de funcionalidades</p>
                <h1>Todas las funcionalidades que necesitas para operar tu liga en un solo sistema</h1>
                <p>
                  Futzo está diseñado para que dejes de coordinar una liga con Excel, capturas y chats sueltos. Aquí puedes ver las funcionalidades clave
                  para operar torneos de fútbol amateur con control, orden y velocidad.
                </p>
                <div class="feature-hub-page__hero-actions">
                  <v-btn color="primary" rounded="lg" size="large" data-testid="funcionalidades-cta-hero" @click.prevent="goToTrial">
                    {{ ctaLabel }}
                  </v-btn>
                </div>
              </div>

              <div class="feature-hub-page__image-placeholder" data-testid="funcionalidades-hero-placeholder">
                <p>Placeholder de imagen Hero (mosaico de módulos)</p>
              </div>
            </div>
          </v-container>
        </section>

        <section class="feature-hub-page__section">
          <v-container class="feature-hub-page__container">
            <header class="feature-hub-page__section-header">
              <h2>Qué puedes hacer con Futzo</h2>
            </header>

            <div class="feature-hub-page__module-grid">
              <article v-for="module in firstModules" :key="module.path" class="feature-hub-page__module-card">
                <div class="feature-hub-page__module-icon">
                  <Icon :name="module.icon" size="18" />
                </div>
                <h3>{{ module.title }}</h3>
                <p>{{ module.description }}</p>
                <p class="feature-hub-page__module-ideal">
                  <strong>Ideal para:</strong> {{ module.idealFor }}
                </p>
                <NuxtLink :to="module.path">Ver {{ module.title.toLowerCase() }}</NuxtLink>
              </article>
            </div>

            <div class="feature-hub-page__mid-cta">
              <v-btn color="primary" rounded="lg" size="large" data-testid="funcionalidades-cta-mid" @click.prevent="goToTrial">
                {{ ctaLabel }}
              </v-btn>
            </div>

            <div class="feature-hub-page__module-grid">
              <article v-for="module in remainingModules" :key="module.path" class="feature-hub-page__module-card">
                <div class="feature-hub-page__module-icon">
                  <Icon :name="module.icon" size="18" />
                </div>
                <h3>{{ module.title }}</h3>
                <p>{{ module.description }}</p>
                <p class="feature-hub-page__module-ideal">
                  <strong>Ideal para:</strong> {{ module.idealFor }}
                </p>
                <NuxtLink :to="module.path">Ver {{ module.title.toLowerCase() }}</NuxtLink>
              </article>
            </div>
          </v-container>
        </section>

        <section class="feature-hub-page__section feature-hub-page__section--muted">
          <v-container class="feature-hub-page__container">
            <div class="feature-hub-page__integrated-grid">
              <article class="feature-hub-page__panel">
                <h2>¿Por qué usar un sistema integral y no herramientas sueltas?</h2>
                <p>
                  Con herramientas separadas, cada cambio se vuelve retrabajo. Con Futzo, tus módulos están conectados:
                </p>
                <ul>
                  <li>Lo que programas impacta calendario y operación.</li>
                  <li>Lo que capturas alimenta standings y estadísticas.</li>
                  <li>Lo que publicas se comparte al instante por vista pública.</li>
                </ul>
              </article>

              <div class="feature-hub-page__image-placeholder" data-testid="funcionalidades-system-placeholder">
                <p>Placeholder comparativo (sistema integral vs herramientas sueltas)</p>
              </div>
            </div>
          </v-container>
        </section>

        <section class="feature-hub-page__section">
          <v-container class="feature-hub-page__container">
            <header class="feature-hub-page__section-header">
              <h2>Para quién está pensado Futzo</h2>
            </header>

            <div class="feature-hub-page__audience-grid">
              <article class="feature-hub-page__audience-item">Organizadores de ligas amateur</article>
              <article class="feature-hub-page__audience-item">Dueños de complejos deportivos</article>
              <article class="feature-hub-page__audience-item">Coordinadores de torneos relámpago</article>
            </div>
          </v-container>
        </section>

        <section class="feature-hub-page__section feature-hub-page__section--muted">
          <v-container class="feature-hub-page__container">
            <header class="feature-hub-page__section-header">
              <h2>FAQ rápida</h2>
            </header>

            <v-expansion-panels variant="accordion" class="feature-hub-page__faq">
              <v-expansion-panel v-for="faq in quickFaqs" :key="faq.question" rounded="lg">
                <v-expansion-panel-title>{{ faq.question }}</v-expansion-panel-title>
                <v-expansion-panel-text>{{ faq.answer }}</v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-container>
        </section>

        <section class="feature-hub-page__final-cta">
          <v-container class="feature-hub-page__container">
            <div class="feature-hub-page__final-cta-panel">
              <h2>Si quieres operar tu liga como sistema profesional, empieza por centralizar las funcionalidades clave.</h2>
              <p>Prueba Futzo gratis y configura tu primer torneo hoy.</p>
              <v-btn color="primary" rounded="lg" size="large" data-testid="funcionalidades-cta-final" @click.prevent="goToTrial">
                {{ ctaLabel }}
              </v-btn>
            </div>
          </v-container>
        </section>
    </div>
  </LandingMarketingShell>
</template>

<style scoped lang="scss">
.feature-hub-page {
  background: #ffffff;
  color: #111827;
}

.feature-hub-page__container {
  max-width: 1200px;
}

.feature-hub-page__hero {
  background:
    radial-gradient(130% 120% at 85% 0%, rgba(34, 87, 246, 0.24) 0%, rgba(34, 87, 246, 0) 55%),
    radial-gradient(90% 90% at 0% 100%, rgba(29, 160, 242, 0.16) 0%, rgba(29, 160, 242, 0) 60%),
    #0f1b33;
  padding: 96px 0 52px;
}

.feature-hub-page__hero-grid {
  display: grid;
  gap: 24px;
}

.feature-hub-page__eyebrow {
  margin: 0 0 10px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.88rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.feature-hub-page__hero-copy h1 {
  margin: 0;
  color: #ffffff;
  font-size: 1.95rem;
  line-height: 1.15;
}

.feature-hub-page__hero-copy p {
  margin: 14px 0 0;
  color: rgba(255, 255, 255, 0.86);
  font-size: 1rem;
  line-height: 1.55;
}

.feature-hub-page__hero-actions {
  margin-top: 18px;
}

.feature-hub-page__section {
  padding: 46px 0;
}

.feature-hub-page__section--muted {
  background: #f8fafc;
}

.feature-hub-page__section-header {
  max-width: 760px;
  margin-bottom: 18px;
}

.feature-hub-page__section-header h2 {
  margin: 0;
  color: #101828;
  font-size: 1.52rem;
  line-height: 1.2;
}

.feature-hub-page__module-grid,
.feature-hub-page__audience-grid {
  display: grid;
  gap: 14px;
}

.feature-hub-page__module-card,
.feature-hub-page__panel,
.feature-hub-page__audience-item {
  background: #ffffff;
  border: 1px solid #eaecf0;
  border-radius: 14px;
  padding: 16px;
}

.feature-hub-page__module-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #eff4ff;
  color: #2257f6;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.feature-hub-page__module-card h3 {
  margin: 0;
  font-size: 1.06rem;
  line-height: 1.35;
}

.feature-hub-page__module-card p,
.feature-hub-page__panel p,
.feature-hub-page__panel li {
  margin: 8px 0 0;
  color: #475467;
  font-size: 0.97rem;
  line-height: 1.55;
}

.feature-hub-page__module-ideal {
  margin-top: 10px;
}

.feature-hub-page__module-card a {
  display: inline-block;
  margin-top: 12px;
  color: #1d4ed8;
  font-weight: 600;
  text-decoration: none;
}

.feature-hub-page__module-card a:hover {
  text-decoration: underline;
}

.feature-hub-page__mid-cta {
  margin: 18px 0;
  display: flex;
  justify-content: center;
}

.feature-hub-page__integrated-grid {
  display: grid;
  gap: 14px;
}

.feature-hub-page__panel h2 {
  margin: 0;
  font-size: 1.45rem;
  line-height: 1.25;
}

.feature-hub-page__panel ul {
  margin: 12px 0 0;
  padding-left: 18px;
}

.feature-hub-page__image-placeholder {
  border: 1px dashed #d0d5dd;
  border-radius: 14px;
  min-height: 220px;
  background: linear-gradient(145deg, #f8fafc 0%, #eef4ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 18px;
}

.feature-hub-page__image-placeholder p {
  margin: 0;
  color: #667085;
  font-size: 0.95rem;
}

.feature-hub-page__audience-item {
  font-weight: 600;
  color: #1d2939;
}

.feature-hub-page__faq :deep(.v-expansion-panel) {
  border: 1px solid #eaecf0;
}

.feature-hub-page__final-cta {
  padding: 24px 0 52px;
}

.feature-hub-page__final-cta-panel {
  background: linear-gradient(135deg, #0f1b33 0%, #182a52 100%);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  padding: 22px;
  text-align: center;
}

.feature-hub-page__final-cta-panel h2 {
  margin: 0;
  color: #f8fafc;
  font-size: 1.45rem;
  line-height: 1.25;
}

.feature-hub-page__final-cta-panel p {
  margin: 12px 0 16px;
  color: rgba(248, 250, 252, 0.88);
}

@media (min-width: 600px) {
  .feature-hub-page__hero {
    padding-top: 114px;
  }

  .feature-hub-page__hero-copy h1 {
    font-size: 2.3rem;
  }

  .feature-hub-page__module-grid,
  .feature-hub-page__audience-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 960px) {
  .feature-hub-page__hero-grid,
  .feature-hub-page__integrated-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: center;
    gap: 24px;
  }

  .feature-hub-page__hero-copy h1 {
    font-size: 2.85rem;
  }

  .feature-hub-page__module-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .feature-hub-page__audience-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
