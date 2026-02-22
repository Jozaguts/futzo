<script lang="ts" setup>
import {useProductPrices} from '~/composables/useProductPrices'
import PlanCard from '~/components/pages/PlanCard.vue'
import {capiContext} from '~/utils/capi'

definePageMeta({
  layout: 'legacy',
  sanctum: { excluded: true },
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      // @ts-ignore
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Futzo',
        operatingSystem: 'Web',
        applicationCategory: 'BusinessApplication',
        description: 'Software para administrar ligas de fútbol: equipos, jugadores, calendarios, resultados y estadísticas.',
        url: 'https://futzo.io/',
      }),
    },
  ],
})

const imgSrc = '/futzo/logos/logo-17.png'
const { $buildAppUrl, $fbq, $attribution } = useNuxtApp() as any
const router = useRouter()
const url = ref('')
const mobileDrawer = ref(false)

const updateUrl = (value: { url?: string } | null | undefined) => {
  if (value?.url) url.value = $buildAppUrl(value.url)
}

const { priceMode, setPriceMode, loading, kickoffPlan, proPlayPlan, eliteLeaguePlan, load } = useProductPrices()
const hasRequestedPrices = ref(false)
const hasTrackedPricingView = ref(false)
const pricingRef = ref<HTMLElement | null>(null)

watch(kickoffPlan, (newVal) => { updateUrl(newVal) }, { deep: true })

const loadPricesNearViewport = async () => {
  if (hasRequestedPrices.value || kickoffPlan.value || loading.value) return
  hasRequestedPrices.value = true
  await load()
}

const { gtag } = useGtag()
const { isAuthenticated } = useSanctumAuth()
const textButton = computed(() => (isAuthenticated?.value ? 'Ir al Dashboard' : 'Comenzar'))
const mainRoute = computed(() => (isAuthenticated?.value ? '/dashboard' : '/login'))

const trackCta = (location: 'hero' | 'nav') => {
  if (isAuthenticated?.value) return
  gtag('event', 'sign_up', { method: location, event_label: 'Comenzar' })
}

const generateEventId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  return `evt-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const toInternalUrl = (maybeAbsoluteUrl: string) => {
  if (!maybeAbsoluteUrl) return maybeAbsoluteUrl
  try {
    const u = new URL(maybeAbsoluteUrl, window.location.origin)
    return `${u.pathname}${u.search}${u.hash}`
  } catch { return maybeAbsoluteUrl }
}

const trackStartRegistration = (placement: 'hero' | 'nav', eventId: string) => {
  if (isAuthenticated?.value) return
  const attr = $attribution?.get?.() || (globalThis as any).$attribution?.get?.() || {}
  const fbq = typeof $fbq === 'function' ? $fbq : (globalThis as any).$fbq
  if (typeof fbq === 'function') {
    fbq('trackCustom', 'StartRegistration', {
      source: 'landing', placement,
      fbclid: attr.fbclid, fbp: attr.fbp, fbc: attr.fbc, ...attr.utm,
    }, { eventID: eventId })
  }
}

const startRegistrationClick = async (placement: 'hero' | 'nav') => {
  if (isAuthenticated?.value) { await router.push('/dashboard'); return }
  trackCta(placement)
  const eventId = generateEventId()
  trackStartRegistration(placement, eventId)
  const buildUrl = typeof $buildAppUrl === 'function' ? $buildAppUrl : (globalThis as any).$buildAppUrl
  const destination = buildUrl?.('/login', { eventId }) || `/login?event_id=${encodeURIComponent(eventId)}`
  try { capiContext() } catch {}
  await router.push(toInternalUrl(destination))
}

const { stop: stopPricingPrefetchObserver } = useIntersectionObserver(
    pricingRef,
    ([entry]) => {
      if (!entry?.isIntersecting) return
      void loadPricesNearViewport()
      stopPricingPrefetchObserver()
    },
    { rootMargin: '200px 0px' }
)

const { stop: stopPricingPixelObserver } = useIntersectionObserver(
    pricingRef,
    ([entry]) => {
      if (!entry?.isIntersecting || hasTrackedPricingView.value) return
      hasTrackedPricingView.value = true
      const fbq = typeof $fbq === 'function' ? $fbq : (globalThis as any).$fbq
      if (typeof fbq === 'function') {
        fbq('track', 'ViewContent', { content_name: 'pricing', content_category: 'plans', content_type: 'pricing' })
      }
      stopPricingPixelObserver()
    },
    { threshold: 0.2 }
)

const navLinks = [
  { label: 'Home',            href: '#home' },
  { label: 'Características', href: '#features' },
  { label: 'Imágenes',        href: '#screenshots' },
  { label: 'Precio',          href: '#pricing' },
]

const features = [
  { icon: 'futzo-icon:trophy',        title: 'Gestión de Torneos',               desc: 'Crea torneos en minutos y deja que los equipos se registren solos desde un link o QR.' },
  { icon: 'futzo-icon:calendar',      title: 'Calendario de Partidos',           desc: 'Genera el calendario automáticamente y ajusta fechas o canchas en cualquier momento.' },
  { icon: 'futzo-icon:field',         title: 'Asignación de Canchas',            desc: 'Controla horarios y evita empalmes con validación automática de disponibilidad.' },
  { icon: 'futzo-icon:football',      title: 'Equipos y Jugadores',              desc: 'Registros completos sin trabajo manual: cada dueño puede inscribir a su equipo y jugadores desde un enlace único o QR.' },
  { icon: 'futzo-icon:communication', title: 'Registro por Links y QR',          desc: 'Comparte un link o QR autogenerado y deja que equipos y jugadores llenen su info. Tú solo revisas y apruebas.' },
  { icon: 'futzo-icon:stats',         title: 'Reportes y Estadísticas',          desc: 'Rendimiento, goles, tarjetas y más. Todo actualizado al instante sin capturas manuales.' },
]

const howItWorks = [
  { icon: 'futzo-icon:register', title: 'Regístrate y crea tu cuenta', desc: 'Inscríbete en Futzo.io rápidamente. Con solo registrarte, tendrás acceso a todas las funciones que necesitas.' },
  { icon: 'futzo-icon:settings', title: 'Inicia tu liga',               desc: 'Empieza configurando tu liga: define sus reglas, horarios, y otros detalles importantes.' },
  { icon: 'futzo-icon:eos-icons-config-map', title: 'Configura y gestiona tu liga', desc: 'Agrega equipos y jugadores fácilmente. Organiza todos los aspectos de tu liga desde un solo lugar.' },
]

const serviceList = [
  { icon: 'futzo-icon:cogs',  text: 'Gestión Integral de Ligas: Administra fácilmente equipos, torneos y calendarios desde un solo lugar.' },
  { icon: 'futzo-icon:users', text: 'Control Detallado de Equipos y Jugadores: Registra y gestiona estadísticas y rendimientos de manera profesional.' },
  { icon: 'futzo-icon:sync',  text: 'Automatización de Procesos: Ahorra tiempo con herramientas que simplifican la organización de tu liga.' },
  { icon: 'futzo-icon:lock',  text: 'Acceso Fácil y Seguro: Todo lo que necesitas disponible en cualquier momento y desde cualquier dispositivo.' },
  { icon: 'futzo-icon:form',  text: 'Registro Automático: Genera URLs únicas para que equipos y jugadores se registren sin intervención manual.' },
]

const screenshots = [
  { src: 'images/image4 - laptop - teams-resized.png',      alt: 'Calendario de partidos',     w: 250, h: 444 },
  { src: 'images/dashboard.png',                      alt: 'Página de registro',         w: 250, h: 444 },
  { src: 'images/tournaments.png',                      alt: 'Página torneos',    w: 250, h: 444 },
  { src: 'images/teams.png',                      alt: 'Página de equipos',     w: 250, h: 444 },
  { src: 'images/players.png',                      alt: 'Página de jugadores',         w: 250, h: 444 },
  { src: 'images/locations.png',                      alt: 'Página de ubicaciones',         w: 250, h: 444 },
  { src: 'images/slider2-resized.png',                      alt: 'Registros de jugadores',     w: 250, h: 444 },
]

const faqs = [
  {
    q: '¿Qué es Futzo.io y cómo puede ayudarme en la gestión de mi liga de fútbol?',
    a: 'Futzo.io es una plataforma integral diseñada para optimizar la administración de ligas de fútbol, haciéndola más eficiente y menos complicada. Desde la programación automatizada de partidos hasta la gestión de equipos, Futzo.io centraliza todas las funciones clave en un solo lugar. Una de sus características destacadas es la automatización del proceso de inscripción: genera URLs únicas para que cada equipo y jugador se registren de forma autónoma, reduciendo significativamente el esfuerzo administrativo.',
  },
  {
    q: '¿Necesito instalar algún software para usar Futzo.io?',
    a: 'No, Futzo.io es una plataforma basada en la web. Solo necesitas registrarte y acceder desde cualquier dispositivo con conexión a internet. No requiere instalación, lo que te permite empezar a usarla de inmediato.',
  },
  {
    q: '¿Puedo gestionar múltiples torneos al mismo tiempo con Futzo.io?',
    a: 'Sí, Futzo.io te permite organizar y administrar múltiples torneos simultáneamente. La plataforma está diseñada para manejar la complejidad de gestionar varios torneos sin perder de vista los detalles importantes.',
  },
  {
    q: '¿Qué tipo de soporte técnico ofrece Futzo.io?',
    a: 'Futzo.io ofrece soporte técnico 24/7 para todos sus usuarios. Nuestro equipo está disponible para ayudarte con cualquier problema técnico o consulta que puedas tener.',
  },
  {
    q: '¿Es seguro almacenar los datos de mi liga en Futzo.io?',
    a: 'Absolutamente. Futzo.io utiliza tecnologías de encriptación avanzadas y copias de seguridad diarias para garantizar que todos tus datos estén seguros y protegidos.',
  },
]

onMounted(() => { updateUrl(kickoffPlan.value) })
</script>

<template>
  <PageLayout styles="main pa-0">
    <template #default>

      <!-- ══════════════════════════════════════════════════════
           NAVBAR
      ══════════════════════════════════════════════════════ -->
      <v-app-bar
          id="home"
          color="#28243D"
          scroll-behavior="elevate"
          elevation="0"
          :elevation-threshold="10"
      >
        <v-container class="d-flex align-center pa-0">
          <!-- Logo -->
          <a href="/" class="d-flex align-center text-decoration-none">
            <img :src="imgSrc" width="140" height="42" alt="Futzo.io logo" class="navbar-logo-full" />
            <img src="/futzo/logos/icon/logo-02.png" width="40" height="40" alt="Futzo icon" class="navbar-logo-icon d-none" />
          </a>

          <v-spacer />

          <!-- Desktop nav -->
          <nav v-if="useRoute().name !== 'gracias'" class="d-none d-lg-flex align-center ga-1">
            <v-btn
                v-for="link in navLinks"
                :key="link.href"
                :href="link.href"
                variant="text"
                color="white"
                class="text-body-2 font-weight-medium opacity-80"
                rounded="lg"
            >
              {{ link.label }}
            </v-btn>

            <v-btn
                color="white"
                variant="flat"
                rounded="lg"
                class="ml-2 text-primary font-weight-bold"
                data-testid="landing-cta-nav"
                @click.prevent="startRegistrationClick('nav')"
            >
              {{ textButton }}
            </v-btn>
          </nav>

          <!-- Mobile hamburger -->
          <v-app-bar-nav-icon
              class="d-lg-none"
              color="white"
              @click="mobileDrawer = !mobileDrawer"
          />
        </v-container>
      </v-app-bar>

      <!-- Mobile Drawer -->
      <v-navigation-drawer
          v-model="mobileDrawer"
          temporary
          location="right"
          color="#28243D"
          width="260"
      >
        <v-list class="pt-4">
          <v-list-item
              v-for="link in navLinks"
              :key="link.href"
              :href="link.href"
              :title="link.label"
              base-color="white"
              rounded="lg"
              class="mb-1"
              @click="mobileDrawer = false"
          />
          <v-divider class="my-3 border-opacity-20" color="primary" />
          <v-list-item class="px-4">
            <v-btn
                color="primary"
                variant="flat"
                block
                rounded="lg"
                data-testid="landing-cta-mobile"
                @click.prevent="startRegistrationClick('nav'); mobileDrawer = false"
            >
              {{ textButton }}
            </v-btn>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>


      <!-- ══════════════════════════════════════════════════════
           HERO
      ══════════════════════════════════════════════════════ -->
      <section class="hero-section">
        <div class="hero-bg-shape" />
        <v-container class="hero-container">
          <v-row align="center" class="fill-height">

            <!-- Copy -->
            <v-col cols="12" md="7">
              <h1 class="text-h3 text-md-h2 font-weight-bold text-white mb-3">
                Software para administrar<br />
                <span class="text-primary">ligas de fútbol</span>
              </h1>
              <p class="text-h6 font-weight-bold text-white mb-2">
                Administra tu liga amateur en minutos
              </p>
              <p class="text-body-1 text-white opacity-70 mb-4">
                Calendarios automáticos, equipos, resultados, estadísticas y control desde un solo lugar.
              </p>

              <v-list class="hero-benefits-list bg-transparent pa-0 mb-5" density="compact">
                <v-list-item
                    v-for="benefit in [
                    'Calendario y resultados en tiempo real',
                    'Registro automatizado de torneos, equipos, jugadores',
                    'Control de sedes/campos de juego',
                    'Reprograma, suspende o cancela partidos fácilmente',
                    'Estadísticas automáticas sin trabajo manual',
                  ]"
                    :key="benefit"
                    :title="benefit"
                    prepend-icon="mdi-check-circle"
                    base-color="white"
                    class="px-0"
                >
                  <template #prepend>
                    <v-icon color="primary" size="20" class="mr-2">mdi-check-circle</v-icon>
                  </template>
                </v-list-item>
              </v-list>

              <div class="d-flex ga-3 flex-wrap">
                <v-btn
                    color="primary"
                    size="large"
                    rounded="lg"
                    elevation="4"
                    data-testid="landing-cta-hero"
                    @click.prevent="startRegistrationClick('hero')"
                >
                  Comenzar gratis
                </v-btn>
              </div>
              <p class="text-caption text-white opacity-50 mt-3">
                Sin instalación. Prueba rápida. Soporte por chat.
              </p>
            </v-col>

            <!-- Hero image -->
            <v-col cols="12" md="5" class="d-flex justify-center">
              <v-img
                  src="assets/images/dashboard.png"
                  width="445"
                  max-width="100%"
                  alt="Panel de administración de liga en Futzo"
                  class="hero-image"
              />
            </v-col>

          </v-row>
        </v-container>
      </section>


      <!-- ══════════════════════════════════════════════════════
           FEATURES
      ══════════════════════════════════════════════════════ -->
      <section id="features" class="section-white">
        <v-container>
          <v-row justify="center" class="mb-10">
            <v-col cols="12" md="8" lg="6" class="text-center">
              <p class="text-overline text-primary font-weight-bold mb-2">Características</p>
              <h2 class="text-h4 font-weight-bold text-on-surface mb-4">
                Gestiona tu liga fácil, rápido y en un solo lugar
              </h2>
              <p class="text-body-1 text-medium-emphasis">
                Todas las herramientas que necesitas en un solo lugar. Con Futzo.io, controla todos los aspectos de tu liga de fútbol.
              </p>
            </v-col>
          </v-row>

          <v-row>
            <v-col
                v-for="feature in features"
                :key="feature.title"
                cols="12" sm="6" lg="4"
            >
              <v-card
                  flat
                  rounded="xl"
                  color="#F4F5FA"
                  class="feature-card pa-6 text-center h-100"
              >
                <div class="feature-icon-wrap mb-4">
                  <client-only>
                    <Icon :name="feature.icon" size="52" class="feature-icon" filled />
                  </client-only>
                </div>
                <v-card-title class="text-h6 font-weight-bold pa-0 mb-2 text-on-surface justify-center">
                  {{ feature.title }}
                </v-card-title>
                <v-card-text class="text-body-2 text-medium-emphasis pa-0">
                  {{ feature.desc }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>


      <!-- ══════════════════════════════════════════════════════
           DISCOVER
      ══════════════════════════════════════════════════════ -->
      <section class="section-gray">
        <v-container>
          <v-row align="center" justify="space-between">

            <!-- Image -->
            <v-col cols="12" lg="6" order="2" order-lg="1" class="d-flex justify-center">
              <v-img
                  src="assets/images/stats.png"
                  max-width="540"
                  alt="Explora nuestras funciones"
              />
            </v-col>

            <!-- Text -->
            <v-col cols="12" lg="6" order="1" order-lg="2">
              <p class="text-overline text-primary font-weight-bold mb-2">Funciones avanzadas</p>
              <h2 class="text-h4 font-weight-bold text-on-surface mb-6">
                Explora nuestras funciones avanzadas.
              </h2>

              <v-list class="bg-transparent pa-0 mb-6">
                <v-list-item
                    v-for="item in [
                    'Registro y administración completa de equipos, jugadores y cuerpo técnico, con información detallada. Genera URLs únicas para registro automático.',
                    'Automatización de calendarios: Creación automática considerando disponibilidad de estadios y preferencias de equipos.',
                    'Estadísticas detalladas y análisis: Recopilación y presentación de estadísticas de juegos y rendimiento.',
                  ]"
                    :key="item"
                    :title="item"
                    class="px-0 mb-3 align-start"
                >
                  <template #prepend>
                    <v-icon color="primary" size="20" class="mr-3 mt-1">mdi-check-circle</v-icon>
                  </template>
                </v-list-item>
              </v-list>

              <div class="d-flex ga-3">
                <v-sheet color="primary" rounded="lg" width="44" height="44" class="d-flex align-center justify-center">
                  <v-icon color="white">mdi-bell</v-icon>
                </v-sheet>
                <v-sheet color="primary" rounded="lg" width="44" height="44" class="d-flex align-center justify-center">
                  <v-icon color="white">mdi-calendar-alt</v-icon>
                </v-sheet>
                <v-sheet color="primary" rounded="lg" width="44" height="44" class="d-flex align-center justify-center">
                  <v-icon color="white">mdi-account-cog</v-icon>
                </v-sheet>
              </div>
            </v-col>

          </v-row>
        </v-container>
      </section>


      <!-- ══════════════════════════════════════════════════════
           SERVICE / CHARACTERISTICS
      ══════════════════════════════════════════════════════ -->
      <section class="section-white">
        <v-container>
          <v-row align="center" justify="space-between">

            <!-- Service list -->
            <v-col cols="12" lg="7" order="2" order-lg="1">
              <p class="text-overline text-primary font-weight-bold mb-2">Todo en uno</p>
              <h2 class="text-h4 font-weight-bold text-on-surface mb-6">
                Características de Futzo.io
              </h2>

              <v-list class="bg-transparent pa-0 mb-6">
                <v-list-item
                    v-for="svc in serviceList"
                    :key="svc.text"
                    :subtitle="svc.text"
                    class="px-0 mb-3"
                    rounded="lg"
                >
                  <template #prepend>
                    <v-sheet
                        color="primary"
                        rounded="lg"
                        width="40"
                        height="40"
                        class="d-flex align-center justify-center mr-4 flex-shrink-0"
                    >
                      <client-only>
                        <Icon :name="svc.icon" size="20" class="text-white" filled />
                      </client-only>
                    </v-sheet>
                  </template>
                </v-list-item>
              </v-list>

              <v-btn
                  :href="url"
                  target="_blank"
                  variant="outlined"
                  color="primary"
                  size="large"
                  rounded="lg"
              >
                Empieza gratis
              </v-btn>
            </v-col>

            <!-- Phone image -->
            <v-col cols="12" lg="4" order="1" order-lg="2" class="d-none d-md-flex justify-center">
              <v-img
                  src="assets/images/teams.png"
                  max-width="274"
                  alt="Características de futzo.io"
              />
            </v-col>

          </v-row>
        </v-container>
      </section>


      <!-- ══════════════════════════════════════════════════════
           HOW IT WORKS
      ══════════════════════════════════════════════════════ -->
      <section class="section-dark">
        <v-container>
          <v-row justify="center" class="mb-10">
            <v-col cols="12" lg="6" class="text-center">
              <p class="text-overline text-primary font-weight-bold mb-2">Paso a paso</p>
              <h2 class="text-h4 font-weight-bold text-white mb-3">¿Cómo funciona Futzo.io?</h2>
              <p class="text-body-1 text-white opacity-70">Sigue estos pasos para empezar a disfrutar de sus beneficios.</p>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col
                v-for="(step, i) in howItWorks"
                :key="step.title"
                cols="12" md="4"
            >
              <div class="how-card text-center pa-6">
                <div class="how-step-badge mb-4">{{ i + 1 }}</div>
                <div class="how-icon-wrap mb-4">
                  <client-only>
                    <Icon :name="step.icon" size="40" class="text-primary" filled />
                  </client-only>
                </div>
                <h3 class="text-h6 font-weight-bold text-white mb-3">{{ step.title }}</h3>
                <p class="text-body-2 text-white opacity-70">{{ step.desc }}</p>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>


      <!-- ══════════════════════════════════════════════════════
           SCREENSHOTS
      ══════════════════════════════════════════════════════ -->
      <section id="screenshots" class="section-gray">
        <v-container>
          <v-row justify="center" class="mb-10">
            <v-col cols="12" md="10" lg="7" class="text-center">
              <p class="text-overline text-primary font-weight-bold mb-2">Interfaz</p>
              <h2 class="text-h4 font-weight-bold text-on-surface mb-4">Interfaz Simple y Atractiva</h2>
              <p class="text-body-1 text-medium-emphasis d-none d-sm-block">
                Futzo.io ofrece una interfaz clara y organizada, diseñada para facilitar la gestión eficiente de tu liga.
              </p>
            </v-col>
          </v-row>

          <client-only>
            <v-slide-group show-arrows="always" class="screenshots-slider">
              <v-slide-group-item v-for="shot in screenshots" :key="shot.src">
                <div class="screenshot-item mx-3">
                  <v-img
                      :src="shot.src"
                      :alt="shot.alt"
                      :width="shot.w"
                      :height="shot.h"
                      cover
                      rounded="xl"
                      class="screenshot-img"
                  />
                </div>
              </v-slide-group-item>
            </v-slide-group>
          </client-only>
        </v-container>
      </section>


      <!-- ══════════════════════════════════════════════════════
           PRICING
      ══════════════════════════════════════════════════════ -->
      <section ref="pricingRef" id="pricing" class="section-white">
        <v-container v-if="!loading">
          <v-row justify="center" class="mb-8">
            <v-col cols="12" md="10" lg="7" class="text-center">
              <p class="text-overline text-primary font-weight-bold mb-2">Planes</p>
              <h2 class="text-h4 font-weight-bold text-on-surface mb-4">
                Elige tu plan después de tu prueba gratis
              </h2>
              <p class="text-body-1 text-medium-emphasis d-none d-sm-block">
                Comienza hoy con tu <strong>trial gratis de 7 días</strong>. Al finalizar, selecciona el plan que mejor se adapte al tamaño de tu liga.
              </p>
            </v-col>
          </v-row>

          <!-- Toggle anual/mensual -->
          <v-row justify="center" class="mb-8">
            <v-col cols="12" sm="6" md="4">
              <v-btn-toggle
                  :model-value="priceMode"
                  mandatory
                  divided
                  rounded="lg"
                  color="primary"
                  class="w-100"
                  @update:model-value="setPriceMode"
              >
                <v-btn value="annually_price" class="flex-1-1">Anual</v-btn>
                <v-btn value="monthly_price"  class="flex-1-1">Mensual</v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>

          <!-- Plan cards -->
          <v-row justify="center">
            <v-col cols="12" md="4">
              <PlanCard
                  :title="kickoffPlan?.name"
                  img_path="/images/logo-08.png"
                  :price="kickoffPlan?.price"
                  :symbol="kickoffPlan?.currency?.symbol"
                  :iso_code="kickoffPlan?.currency?.iso_code"
                  :annually_price="kickoffPlan?.annually_price"
                  :annual_saving="kickoffPlan?.annual_saving"
                  cta="Empieza gratis"
                  :url="kickoffPlan?.url"
                  :features="['Torneos ilimitados','Gestión de ligas, torneos y fases','Registro de equipos y jugadores','Calendario automático','Resultados y tablas de posiciones','Vista pública del torneo + QR']"
                  :mode="priceMode"
              />
            </v-col>
            <v-col cols="12" md="4">
              <PlanCard
                  :title="proPlayPlan?.name"
                  img_path="/images/logo-07.png"
                  :price="proPlayPlan?.price"
                  :symbol="proPlayPlan?.currency?.symbol"
                  :iso_code="proPlayPlan?.currency?.iso_code"
                  :annually_price="proPlayPlan?.annually_price"
                  :annual_saving="proPlayPlan?.annual_saving"
                  cta="Empieza gratis"
                  :url="proPlayPlan?.url"
                  :features="['Incluye Kickoff','Verificación de jugadores','Bloqueo de transferencias de jugadores','Reprogramación completa de partidos','Gestión de ubicaciones y canchas','Soporte prioritario']"
                  :mode="priceMode"
                  featured
                  badge="Más elegido"
              />
            </v-col>
            <v-col cols="12" md="4">
              <PlanCard
                  :title="eliteLeaguePlan?.name"
                  img_path="/images/logo-08.png"
                  :price="eliteLeaguePlan?.price"
                  :symbol="eliteLeaguePlan?.currency?.symbol"
                  :iso_code="eliteLeaguePlan?.currency?.iso_code"
                  :annually_price="eliteLeaguePlan?.annually_price"
                  :annual_saving="eliteLeaguePlan?.annual_saving"
                  cta="Empieza gratis"
                  :url="eliteLeaguePlan?.url"
                  :features="['Incluye ProPlay','Roles avanzados (staff, árbitros, admins)','Historial completo de torneos','Soporte prioritario + WhatsApp','Personalización visual (branding básico)','Acceso anticipado a nuevas funciones']"
                  :mode="priceMode"
              />
            </v-col>
          </v-row>

          <!-- Trust copy -->
          <v-row justify="center" class="mt-8">
            <v-col cols="12" md="8" class="text-center">
              <p class="text-body-1 font-weight-medium mb-1">Cambia o cancela tu plan en cualquier momento.</p>
              <p class="text-body-2 text-medium-emphasis mb-1">Tu progreso y configuración se conservan cuando pasas del trial a un plan.</p>
              <p class="text-body-2 text-medium-emphasis">
                ¿Dudas? <a href="#faq" class="text-primary">Consulta las preguntas frecuentes</a> o escríbenos por chat.
              </p>
            </v-col>
          </v-row>
        </v-container>
      </section>


      <!-- ══════════════════════════════════════════════════════
           FAQ
      ══════════════════════════════════════════════════════ -->
      <section id="faq" class="section-gray">
        <v-container>
          <v-row justify="center" class="mb-10">
            <v-col cols="12" md="10" lg="7" class="text-center">
              <p class="text-overline text-primary font-weight-bold mb-2">FAQ</p>
              <h2 class="text-h4 font-weight-bold text-on-surface mb-4">¿Tienes Preguntas?</h2>
              <p class="text-body-1 text-medium-emphasis d-none d-sm-block">
                Si tienes alguna pregunta sobre Futzo.io, consulta nuestras preguntas frecuentes.
              </p>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="12" md="10" lg="8">
              <v-expansion-panels variant="accordion" class="faq-panels">
                <v-expansion-panel
                    v-for="faq in faqs"
                    :key="faq.q"
                    rounded="lg"
                    class="mb-2"
                >
                  <v-expansion-panel-title class="text-body-1 font-weight-medium">
                    {{ faq.q }}
                  </v-expansion-panel-title>
                  <v-expansion-panel-text class="text-body-2 text-medium-emphasis">
                    {{ faq.a }}
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-container>
      </section>


      <!-- ══════════════════════════════════════════════════════
           FOOTER
      ══════════════════════════════════════════════════════ -->
      <footer id="footer" class="footer-section">
        <v-container class="py-12">
          <v-row>

            <!-- Brand + Social -->
            <v-col cols="12" sm="6" lg="3">
              <a href="#" class="d-inline-block mb-4">
                <img
                    src="/images/logo-07.png"
                    alt="Futzo"
                    width="170"
                    height="140"
                />
              </a>
              <div class="d-flex ga-2 mt-2">
                <v-btn
                    icon
                    variant="tonal"
                    color="primary"
                    size="small"
                    rounded="lg"
                    href="https://www.facebook.com/futzo.io"
                    aria-label="Facebook"
                >
                  <Icon name="lucide:facebook" size="18" />
                </v-btn>
                <v-btn
                    icon
                    variant="tonal"
                    color="primary"
                    size="small"
                    rounded="lg"
                    href="https://www.instagram.com/futzo.io/"
                    aria-label="Instagram"
                >
                  <Icon name="lucide:instagram" size="18" />
                </v-btn>
                <v-btn
                    icon
                    variant="tonal"
                    color="primary"
                    size="small"
                    rounded="lg"
                    href="https://www.youtube.com/@futzo-oficial"
                    aria-label="YouTube"
                >
                  <Icon name="lucide:youtube" size="18" />
                </v-btn>
              </div>
            </v-col>

            <!-- Links -->
            <v-col cols="12" sm="3" lg="3">
              <p class="text-subtitle-2 font-weight-bold text-on-surface mb-3">Enlaces útiles</p>
              <v-list class="bg-transparent pa-0" density="compact">
                <v-list-item
                    v-for="link in [
                    { label: 'Home',                    href: '#home' },
                    { label: 'Características',         href: '#features' },
                    { label: 'Preguntas frecuentes',    href: '#faq' },
                  ]"
                    :key="link.label"
                    :href="link.href"
                    :title="link.label"
                    class="px-0"
                    base-color="medium-emphasis"
                    rounded="lg"
                />
                <v-list-item class="px-0" base-color="medium-emphasis" rounded="lg">
                  <nuxt-link to="/politica-de-privacidad" class="text-decoration-none text-medium-emphasis text-body-2">Política de privacidad</nuxt-link>
                </v-list-item>
                <v-list-item class="px-0" base-color="medium-emphasis" rounded="lg">
                  <nuxt-link to="/terminos-de-servicio" class="text-decoration-none text-medium-emphasis text-body-2">Términos de servicio</nuxt-link>
                </v-list-item>
              </v-list>
            </v-col>

            <!-- About -->
            <v-col cols="12" sm="6" lg="6">
              <p class="text-subtitle-2 font-weight-bold text-on-surface mb-3">Sobre Futzo.io</p>
              <p class="text-body-2 text-medium-emphasis mb-3">
                Futzo.io es una plataforma diseñada para facilitar la administración de ligas deportivas. Ayudamos a organizadores, árbitros y dueños de equipos a crear torneos, registrar jugadores, gestionar calendarios y generar estadísticas fácilmente desde un solo lugar.
              </p>
              <p class="text-body-2 text-medium-emphasis mb-3">Con Futzo.io, llevar el control de tu liga es simple, rápido y profesional.</p>
              <p class="text-body-2 text-medium-emphasis mb-1">📍 Puerto Vallarta, Jalisco, México</p>
              <p class="text-body-2 text-medium-emphasis mb-1">📞 +52 322 327 8118</p>
              <p class="text-body-2 text-medium-emphasis">📧 contacto [arroba] futzo.io</p>
            </v-col>

          </v-row>
        </v-container>

        <v-divider />
        <v-container class="py-4">
          <p class="text-caption text-medium-emphasis text-center">
            © {{ new Date().getFullYear() }} Futzo.io — Todos los derechos reservados.
          </p>
        </v-container>
      </footer>

      <!-- Scroll to top -->
      <v-btn
          id="scrollUp"
          icon="mdi-arrow-up"
          color="primary"
          size="small"
          class="scroll-top-btn"
          elevation="4"
          @click="window?.scrollTo({ top: 0, behavior: 'smooth' })"
      />

    </template>
  </PageLayout>
</template>

<style scoped>
/* ── SECTION HELPERS ───────────────────────────────────── */
.section-white { background: var(--futzo-surface); padding: 80px 0; }
.section-gray  { background: #F4F5FA; padding: 80px 0; }
.section-dark  {
  background: #28243D;
  padding: 80px 0;
  position: relative;
  overflow: hidden;
}
.section-dark::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 60% 0%, rgba(145,85,253,0.18) 0%, transparent 70%);
  pointer-events: none;
}

/* ── NAVBAR ────────────────────────────────────────────── */
.navbar-logo-full { object-fit: contain; }

/* ── HERO ──────────────────────────────────────────────── */
.hero-section {
  background: #28243D;
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 100px 0 60px;
}
.hero-bg-shape {
  position: absolute;
  inset: 0;
  background:
      radial-gradient(ellipse at 80% 50%, rgba(145,85,253,0.22) 0%, transparent 60%),
      radial-gradient(ellipse at 10% 80%, rgba(145,85,253,0.10) 0%, transparent 50%);
  pointer-events: none;
}
.hero-container { position: relative; z-index: 1; }
.hero-image { filter: drop-shadow(0 20px 60px rgba(145,85,253,0.3)); }
.hero-benefits-list :deep(.v-list-item__prepend) { width: auto; margin-inline-end: 8px; }

/* ── FEATURES ──────────────────────────────────────────── */
.feature-card {
  transition: transform .2s, box-shadow .2s;
}
.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(145,85,253,0.12) !important;
}
.feature-icon-wrap {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: rgba(145,85,253,0.10);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
.feature-icon { color: #9155FD; }

/* ── HOW IT WORKS ──────────────────────────────────────── */
.how-card {
  border: 1px solid rgba(145,85,253,0.15);
  border-radius: 16px;
  background: rgba(145,85,253,0.05);
  position: relative;
}
.how-step-badge {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #9155FD;
  color: var(--futzo-on-surface);
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 8px;
}
.how-icon-wrap { color: #9155FD; }

/* ── SCREENSHOTS ───────────────────────────────────────── */
.screenshots-slider { overflow: visible; }
.screenshot-item { flex-shrink: 0; }
.screenshot-img {
  box-shadow: 0 8px 32px rgba(40,36,61,0.15);
  transition: transform .2s;
}
.screenshot-img:hover { transform: translateY(-4px); }

/* ── FAQ ───────────────────────────────────────────────── */
.faq-panels :deep(.v-expansion-panel) {
  border: 1px solid rgba(145,85,253,0.12) !important;
  background: var(--futzo-surface);
}
.faq-panels :deep(.v-expansion-panel--active) {
  border-color: rgba(145,85,253,0.35) !important;
}
.faq-panels :deep(.v-expansion-panel-title--active) {
  color: #9155FD;
}

/* ── FOOTER ────────────────────────────────────────────── */
.footer-section { background: #F4F5FA; }

/* ── SCROLL TOP ────────────────────────────────────────── */
.scroll-top-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 999;
}
</style>
