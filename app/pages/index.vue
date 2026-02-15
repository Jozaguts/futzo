<script lang="ts" setup>
import {useProductPrices} from '~/composables/useProductPrices'
import PlanCard from '~/components/pages/PlanCard.vue'
import {capiContext} from '~/utils/capi'

definePageMeta({
  layout: 'legacy',
  sanctum: {
    excluded: true,
  },
})
useHead({
  script: [
    {
      type: 'application/ld+json',
      //@ts-ignore
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Futzo",
        "operatingSystem": "Web",
        "applicationCategory": "BusinessApplication",
        "description": "Software para administrar ligas de fútbol: equipos, jugadores, calendarios, resultados y estadísticas.",
        "url": "https://futzo.io/"
      })
    }
  ]
})
  const imgSrc = '/futzo/logos/logo-17.png'
  const { $buildAppUrl, $fbq, $attribution } = useNuxtApp() as any
  const router = useRouter()
  const url = ref('')

  const updateUrl = (value: { url?: string } | null | undefined) => {
    if (value?.url) {
      url.value = $buildAppUrl(value.url)
    }
  }
  const { priceMode, setPriceMode, loading, kickoffPlan, proPlayPlan, eliteLeaguePlan, load } = useProductPrices()
  const hasRequestedPrices = ref(false)
  const hasTrackedPricingView = ref(false)
  const pricingRef = ref<HTMLElement | null>(null)
  watch(
    kickoffPlan,
    (newVal) => {
      updateUrl(newVal)
    },
    { deep: true }
  )

  const loadPricesNearViewport = async () => {
    if (hasRequestedPrices.value || kickoffPlan.value || loading.value) {
      return
    }
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
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID()
    }
    return `evt-${Date.now()}-${Math.random().toString(16).slice(2)}`
  }

  const toInternalUrl = (maybeAbsoluteUrl: string) => {
    if (!maybeAbsoluteUrl) return maybeAbsoluteUrl
    try {
      const u = new URL(maybeAbsoluteUrl, window.location.origin)
      return `${u.pathname}${u.search}${u.hash}`
    } catch {
      return maybeAbsoluteUrl
    }
  }

  const trackStartRegistration = (placement: 'hero' | 'nav', eventId: string) => {
    if (isAuthenticated?.value) return
    const attr = $attribution?.get?.() || (globalThis as any).$attribution?.get?.() || {}
    const fbq = typeof $fbq === 'function' ? $fbq : (globalThis as any).$fbq

    if (typeof fbq === 'function') {
      fbq(
        'trackCustom',
        'StartRegistration',
        {
          source: 'landing',
          placement,
          fbclid: attr.fbclid,
          fbp: attr.fbp,
          fbc: attr.fbc,
          ...attr.utm,
        },
        { eventID: eventId }
      )
    }
  }

  const startRegistrationClick = async (placement: 'hero' | 'nav') => {
    if (isAuthenticated?.value) {
      await router.push('/dashboard')
      return
    }

    trackCta(placement)
    const eventId = generateEventId()
    trackStartRegistration(placement, eventId)

    // Propagate event_id into /login so registration can reuse it (CAPI/Px dedupe).
    const buildUrl = typeof $buildAppUrl === 'function' ? $buildAppUrl : (globalThis as any).$buildAppUrl
    const destination =
      buildUrl?.('/login', { eventId }) || `/login?event_id=${encodeURIComponent(eventId)}`

    // Keep capiContext aligned even if plugins haven't run yet.
    try {
      capiContext()
    } catch {}

    await router.push(toInternalUrl(destination))
  }

const { stop: stopPricingPrefetchObserver } = useIntersectionObserver(
    pricingRef,
    ([entry]) => {
      if (!entry?.isIntersecting) return
      void loadPricesNearViewport()
      stopPricingPrefetchObserver()
    },
    {
      rootMargin: '200px 0px',
    }
)
const { stop: stopPricingPixelObserver } = useIntersectionObserver(
    pricingRef,
    ([entry]) => {
      if (!entry?.isIntersecting || hasTrackedPricingView.value) return
      hasTrackedPricingView.value = true
      const fbq = typeof $fbq === 'function' ? $fbq : (globalThis as any).$fbq
      if (typeof fbq === 'function') {
        fbq('track', 'ViewContent', {
          content_name: 'pricing',
          content_category: 'plans',
          content_type: 'pricing'
        })
      }
      stopPricingPixelObserver()
    },
    {
      threshold: 0.2,
    }
)
onMounted(()=>{
  updateUrl(kickoffPlan.value)
  // window.onload = function() { window.Calendly?.initBadgeWidget({ url: 'https://calendly.com/futzo', text: 'Agenda tu demo con Futzo ⚽', color: '#9155FD', textColor: '#ffffff', branding: false }); }

})
</script>
<template>
  <PageLayout styles="main pa-0">
    <template #default>
      <header class="navbar navbar-sticky navbar-expand-lg navbar-dark">
        <div class="container position-relative">
          <a class="navbar-brand" href="/">
            <img class="navbar-brand-regular mt-4" width="180" height="54" :src="imgSrc" alt="Futzo.io logo" />
            <img
              class="navbar-brand-sticky"
              width="80"
              height="56"
              src="/futzo/logos/icon/logo-02.png"
              alt="sticky brand-logo"
            />
          </a>
          <button
            class="navbar-toggler d-lg-none"
            type="button"
            data-toggle="navbarToggler"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="navbar-inner">
            <!--  Mobile Menu Toggler -->
            <button
              class="navbar-toggler d-lg-none"
              type="button"
              data-toggle="navbarToggler"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <nav v-if="useRoute().name !== 'gracias'">
              <ul class="navbar-nav" id="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link scroll" href="#home">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link scroll" href="#features">Características</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link scroll" href="#screenshots">Imágenes</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link scroll" href="#pricing">Precio</a>
                </li>
                <li class="nav-item">
                  <nuxt-link
                    class="nav-link bg-white futzo-rounded px-3 py-2 ma-6 text-primary font-weight-bold"
                    :to="mainRoute"
                    data-testid="landing-cta-nav"
                    @click.prevent="startRegistrationClick('nav')"
                    >{{ textButton }}</nuxt-link
                  >
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <section id="home" class="section welcome-area bg-inherit h-100vh overflow-hidden">
        <div class="shapes-container">
          <div class="bg-shape"></div>
        </div>
        <div class="container h-100">
          <div class="row align-items-center h-100">
            <!-- Welcome Intro Start -->
            <div class="col-12 col-md-7">
              <div class="welcome-intro">
                <h1>Software para administrar ligas de fútbol</h1>
                <h2 class="text-h5"><strong>Administra tu liga amateur en minutos</strong></h2>
                <p class="text-body-2 py-2">
                  Calendarios automáticos, equipos, resultados, estadísticas y control desde un solo lugar.
                </p>
                <ul class="hero-benefits">
                  <li>✅ Calendario y resultados en tiempo real</li>
                  <li>✅ Registro automatizado de torneos, equipos, jugadores</li>
                  <li>✅ Control de sedes/campos de juego</li>
                  <li>✅ Reprograma, suspende o cancela partidos fácilmente</li>
                  <li>✅ Estadísticas automáticas sin trabajo manual</li>
                </ul>
                <div class="hero-ctas">
                  <nuxt-link
                    class="btn btn-primary"
                    to="/login"
                    data-testid="landing-cta-hero"
                    @click.prevent="startRegistrationClick('hero')"
                  >Comenzar</nuxt-link>
                </div>
                <small class="hero-note"> Sin instalación. Prueba rápida. Soporte por chat. </small>
              </div>
            </div>
            <div class="col-12 col-md-5">
              <!-- Welcome Thumb -->
              <div class="welcome-thumb" data-aos="fade-right" data-aos-delay="500" data-aos-duration="1000">
                <figure class="hero-media">
                  <img
                    src="assets/images/dashboard.png"
                    width="445"
                    height="425"
                    loading="eager"
                    fetchpriority="high"
                    alt="Panel de administración de liga en Futzo mostrando calendario y equipos"
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="features" class="section features-area bg-white ptb_100">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-6">
              <!-- Section Heading -->
              <div class="section-heading text-center">
                <h2>Gestiona tu liga fácil, rápido y en un solo lugar</h2>
                <p class="d-none d-sm-block mt-4">
                  Todas las herramientas que necesitas en un solo lugar Con Futzo.io, controla todos los aspectos de tu
                  liga de fútbol.
                </p>
                <p class="d-block d-sm-none mt-4">
                  Futzo.io te ofrece todo lo que necesitas para gestionar tu liga de fútbol de manera eficiente y
                  profesional.
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-6 col-lg-4">
              <!-- Icon Box -->
              <div class="icon-box text-center p-4 wow fadeInUp" data-wow-duration="2s">
                <!-- Featured Icon -->
                <div class="featured-icon mb-3">
                  <client-only>
                    <Icon size="70" class="feature-icon" name="futzo-icon:trophy" filled></Icon>
                  </client-only>
                </div>
                <!-- Icon Text -->
                <div class="icon-text">
                  <h3 class="mb-2">Gestión de Torneos</h3>
                  <p>Crea torneos en minutos y deja que los equipos se registren solos desde un link o QR.</p>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-4">
              <!-- Icon Box -->
              <div class="icon-box text-center p-4 wow fadeInUp" data-wow-duration="2s" data-wow-delay="0.2s">
                <!-- Featured Icon -->
                <div class="featured-icon mb-3">
                  <Icon size="70" class="feature-icon" name="futzo-icon:calendar" filled></Icon>
                </div>
                <!-- Icon Text -->
                <div class="icon-text">
                  <h3 class="mb-2">Calendario de Partidos</h3>
                  <p>Genera el calendario automáticamente y ajusta fechas o canchas en cualquier momento.</p>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-4">
              <!-- Icon Box -->
              <div class="icon-box text-center p-4 wow fadeInUp" data-wow-duration="2s" data-wow-delay="0.4s">
                <!-- Featured Icon -->
                <div class="featured-icon mb-3">
                  <Icon size="70" name="futzo-icon:field" filled class="feature-icon" />
                </div>
                <!-- Icon Text -->
                <div class="icon-text">
                  <h3 class="mb-2">Asignación de Canchas</h3>
                  <p>Controla horarios y evita empalmes con validación automática de disponibilidad.</p>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-4">
              <!-- Icon Box -->
              <div class="icon-box text-center p-4 wow fadeInUp" data-wow-duration="2s" data-wow-delay="0.6s">
                <!-- Featured Icon -->
                <div class="featured-icon mb-3">
                  <Icon size="70" name="futzo-icon:football" filled class="feature-icon" />
                </div>
                <!-- Icon Text -->
                <div class="icon-text">
                  <h3 class="mb-2">Equipos y Jugadores</h3>
                  <p>
                    Registros completos sin trabajo manual: cada dueño puede inscribir a su equipo y jugadores desde un
                    enlace único o QR.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-4">
              <!-- Icon Box -->
              <div class="icon-box text-center p-4 wow fadeInUp" data-wow-duration="2s" data-wow-delay="0.8s">
                <!-- Featured Icon -->
                <div class="featured-icon mb-3">
                  <Icon size="70" name="futzo-icon:communication" filled class="feature-icon" />
                </div>
                <!-- Icon Text -->
                <div class="icon-text">
                  <h3 class="mb-2">Registro Automático por Links y QR</h3>
                  <p>
                    Comparte un link o QR autogenerado y deja que los equipos, jugadores o interesados llenen su
                    información directamente. Tú solo revisas y apruebas.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-4">
              <!-- Icon Box -->
              <div class="icon-box text-center p-4 wow fadeInUp" data-wow-duration="2s" data-wow-delay="1s">
                <!-- Featured Icon -->
                <div class="featured-icon mb-3">
                  <Icon size="70" name="futzo-icon:stats" filled class="feature-icon" />
                </div>
                <!-- Icon Text -->
                <div class="icon-text">
                  <h3 class="mb-2">Reportes y Estadísticas</h3>
                  <p>Rendimiento, goles, tarjetas y más. Todo actualizado al instante sin capturas manuales.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section discover-area bg-gray overflow-hidden ptb_100">
        <div class="container">
          <div class="row justify-content-between align-items-center">
            <div class="col-12 col-lg-6 order-2 order-lg-1">
              <!-- Discover Thumb -->
              <div class="service-thumb discover-thumb mx-auto text-center">
                <img src="assets/images/stats.png" alt="explora nuestras funciones" width="540" height="359" />
              </div>
            </div>
            <div class="col-12 col-lg-6 order-1 order-lg-2">
              <!-- Discover Text -->
              <div class="discover-text px-0 px-lg-4 pt-4 pt-lg-0">
                <h2 class="pb-4">Explora nuestras funciones avanzadas.</h2>
                <!-- Check List -->
                <ul class="check-list">
                  <li class="py-1">
                    <!-- List Box -->
                    <div class="list-box media">
                      <span class="icon align-self-center">
                        <client-only>
                          <i class="fas fa-check"></i>
                        </client-only>
                      </span>
                      <span class="media-body pl-2"
                        >Registro y administración completa de equipos, jugadores y cuerpo técnico, con información
                        detallada y precisa. Además, genera URLs únicas para que equipos y jugadores se registren
                        automáticamente en los torneos.</span
                      >
                    </div>
                  </li>
                  <li class="py-1">
                    <!-- List Box -->
                    <div class="list-box media">
                      <span class="icon align-self-center">
                        <client-only>
                          <i class="fas fa-check"></i>
                        </client-only>
                      </span>
                      <span class="media-body pl-2"
                        >Automatización de calendarios de partidos: Creación automática de calendarios considerando
                        disponibilidad de estadios y preferencias de equipos.</span
                      >
                    </div>
                  </li>
                  <li class="py-1">
                    <!-- List Box -->
                    <div class="list-box media">
                      <span class="icon align-self-center">
                        <client-only>
                          <i class="fas fa-check"></i>
                        </client-only>
                      </span>
                      <span class="media-body pl-2"
                        >Estadísticas detalladas y análisis: Recopilación y presentación de estadísticas de juegos y
                        rendimiento de equipos y jugadores</span
                      >
                    </div>
                  </li>
                </ul>
                <div class="icon-box d-flex mt-3 mb-3">
                  <div class="service-icon">
                    <span>
                      <client-only>
                        <i class="fas fa-bell"></i>
                      </client-only>
                    </span>
                  </div>
                  <div class="service-icon mx-3">
                    <span>
                      <client-only>
                        <i class="fas fa-calendar-alt"></i>
                      </client-only>
                    </span>
                  </div>
                  <div class="service-icon">
                    <span>
                      <client-only>
                        <i class="fas fa-users-cog"></i>
                      </client-only>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section service-area overflow-hidden bg-white ptb_100">
        <div class="container">
          <div class="row justify-content-between">
            <div class="col-12 col-lg-6 order-2 order-lg-1">
              <!-- Service Text -->
              <div class="service-text pt-4 pt-lg-0">
                <h2 class="mb-4">Características de Futzo.io</h2>
                <!-- Service List -->
                <ul class="service-list">
                  <!-- Single Service -->
                  <li class="single-service media py-2">
                    <div class="service-icon mr-4">
                      <span>
                        <client-only>
                          <Icon class="bg-primary w-50" name="futzo-icon:cogs" filled></Icon>
                        </client-only>
                      </span>
                    </div>
                    <div class="service-text media-body">
                      <p>
                        Gestión Integral de Ligas: Administra fácilmente equipos, torneos y calendarios desde un solo
                        lugar.
                      </p>
                    </div>
                  </li>
                  <!-- Single Service -->
                  <li class="single-service media py-2">
                    <div class="service-icon mr-4">
                      <span>
                        <client-only>
                          <Icon class="bg-primary w-50" name="futzo-icon:users" filled></Icon>
                        </client-only>
                      </span>
                    </div>
                    <div class="service-text media-body">
                      <p>
                        Control Detallado de Equipos y Jugadores: Registra y gestiona estadísticas y rendimientos de
                        manera profesional.
                      </p>
                    </div>
                  </li>
                  <!-- Single Service -->
                  <li class="single-service media py-2">
                    <div class="service-icon mr-4">
                      <span>
                        <client-only>
                          <Icon class="bg-primary w-50" name="futzo-icon:sync" filled></Icon>
                        </client-only>
                      </span>
                    </div>
                    <div class="service-text media-body">
                      <p>
                        Automatización de Procesos: Ahorra tiempo con herramientas que simplifican la organización y
                        administración de tu liga.
                      </p>
                    </div>
                  </li>
                  <!-- Single Service -->
                  <li class="single-service media py-2">
                    <div class="service-icon mr-4">
                      <span>
                        <client-only>
                          <Icon class="bg-primary w-50" name="futzo-icon:lock"></Icon>
                        </client-only>
                      </span>
                    </div>
                    <div class="service-text media-body">
                      <p>
                        Acceso Fácil y Seguro: Todo lo que necesitas para gestionar tu liga, disponible en cualquier
                        momento y desde cualquier dispositivo.
                      </p>
                    </div>
                  </li>
                  <li class="single-service media py-2">
                    <div class="service-icon mr-4">
                      <Icon size="30" name="futzo-icon:form" filled></Icon>
                    </div>
                    <div class="service-text media-body">
                      <p>
                        Registro Automático de Equipos y Jugadores: Genera URLs únicas para cada torneo, permitiendo que
                        los equipos y jugadores se registren automáticamente sin necesidad de intervención manual.
                      </p>
                    </div>
                  </li>
                </ul>
                <a :href="url" target="_blank" class="btn btn-bordered mt-4">Empieza gratis</a>
              </div>
            </div>
            <div class="col-12 col-lg-4 order-1 order-lg-2 d-none d-md-block">
              <!-- Service Thumb -->
              <div class="service-thumb mx-auto">
                <img src="assets/images/teams.png" alt="Características de futzo.io" width="274" height="550" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section work-area bg-overlay overflow-hidden ptb_100">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12 col-lg-6">
              <!-- Work Content -->
              <div class="work-content text-center">
                <h2 class="text-white">¿Cómo funciona Futzo.io?</h2>
                <p class="text-white my-3 mt-sm-4 mb-sm-5">
                  Sigue estos pasos para empezar a disfrutar de sus beneficios.
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-4">
              <!-- Single Work -->
              <div class="single-work text-center p-3">
                <!-- Work Icon -->
                <div class="work-icon">
                  <client-only>
                    <Icon name="futzo-icon:register" filled class="work-icon" size="32"></Icon>
                  </client-only>
                </div>
                <h3 class="text-white py-3">Regístrate y crea tu cuenta</h3>
                <p class="text-white">
                  Inscríbete en Futzo.io rápidamente. Con solo registrarte, tendrás acceso a todas las funciones que
                  necesitas para administrar tu liga.
                </p>
              </div>
            </div>
            <div class="col-12 col-md-4">
              <!-- Single Work -->
              <div class="single-work text-center p-3">
                <!-- Work Icon -->
                <div class="work-icon">
                  <client-only>
                    <Icon name="futzo-icon:settings" filled class="work-icon" size="32"></Icon>
                  </client-only>
                </div>
                <h3 class="text-white py-3">Inicia tu liga</h3>
                <p class="text-white">
                  Empieza configurando tu liga: define sus reglas, horarios, y otros detalles importantes para que esté
                  lista para el juego.
                </p>
              </div>
            </div>
            <div class="col-12 col-md-4">
              <!-- Single Work -->
              <div class="single-work text-center p-3">
                <!-- Work Icon -->
                <div class="work-icon">
                  <Icon name="futzo-icon:eos-icons-config-map" filled class="work-icon" size="32"></Icon>
                </div>
                <h3 class="text-white py-3">Configura y gestiona tu liga</h3>
                <p class="text-white">
                  Agrega equipos y jugadores fácilmente. Asigna roles y organiza todos los aspectos de tu liga, todo
                  desde un solo lugar, para que la administración sea más sencilla y eficiente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="screenshots" class="section screenshots-area ptb_100 bg-gray overflow-hidden ptb_100">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-7">
              <!-- Section Heading -->
              <div class="section-heading text-center">
                <h2 class="text-capitalize">Interfaz Simple y Atractiva</h2>
                <p class="d-none d-sm-block mt-4">
                  Futzo.io ofrece una interfaz clara y organizada, diseñada para facilitar la gestión eficiente de tu
                  liga de fútbol. Navega fácilmente por todas las funciones clave.
                </p>
                <p class="d-block d-sm-none mt-4">
                  Futzo te facilita gestionar tu liga con una interfaz intuitiva y visualmente atractiva.
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <!-- App Screenshot Slider Area -->
              <client-only>
                <div class="app-screenshots d-flex">
                  <!-- Single Screenshot Item -->
                  <div class="single-screenshot">
                    <img src="assets/images/slider1-resized.png" alt="pagina de registro" width="250" height="444" />
                  </div>
                  <!-- Single Screenshot Item -->
                  <div class="single-screenshot">
                    <img
                      src="assets/images/slider2-resized.png"
                      alt="estadísticas de tu liga"
                      width="250"
                      height="444"
                    />
                  </div>
                  <!-- Single Screenshot Item -->
                  <div class="single-screenshot">
                    <img
                      src="assets/images/image4 - laptop - teams-resized.png"
                      alt="Calendario de partidos"
                      width="250"
                      height="501"
                    />
                  </div>
                  <div class="single-screenshot">
                    <img
                      src="assets/images/slider2-resized.png"
                      alt="Registros de jugadores"
                      width="250"
                      height="444"
                    />
                  </div>
                  <div class="single-screenshot">
                    <img src="assets/images/slider1-resized.png" alt="pagina de registro" width="250" height="444" />
                  </div>
                  <div class="single-screenshot">
                    <img
                      src="assets/images/slider2-resized.png"
                      alt="Registros de jugadores"
                      width="250"
                      height="444"
                    />
                  </div>
                </div>
              </client-only>
            </div>
          </div>
        </div>
      </section>
      <section ref="pricingRef" id="pricing" class="section price-plan-area overflow-hidden bg-white ptb_100">
        <div v-if="!loading" class="container">
          <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-7">
              <!-- Section Heading -->
              <div class="section-heading text-center">
                <h2>Elige tu plan después de tu prueba gratis</h2>
                <p class="d-none d-sm-block mt-4">
                  Comienza hoy con tu <strong>trial gratis de 7 días</strong>. Al finalizar, selecciona el plan que
                  mejor se adapte al tamaño de tu liga.
                </p>
                <p class="d-block d-sm-none mt-4">
                  Gestión eficiente de tu liga de fútbol con las herramientas avanzadas de Futzo.
                </p>
              </div>
            </div>
          </div>
          <div class="row justify-content-center pb-2">
            <div class="col-12 col-md-6">
              <ul class="nav nav-pills nav-justified align-items-center">
                <li class="nav-item mx-2 mb-2">
                  <button
                    @click="() => setPriceMode('annually_price')"
                    type="button"
                    class="btn btn-block custom-btn"
                    :class="{ active: priceMode === 'annually_price' }"
                  >
                    Anual <span v-if="kickoffPlan?.annual_saving"></span>
                  </button>
                </li>
                <li class="nav-item mx-2 mb-2">
                  <button
                    @click="() => setPriceMode('monthly_price')"
                    type="button"
                    class="btn btn-block custom-btn"
                    :class="{ active: priceMode === 'monthly_price' }"
                  >
                    Mensual
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-12">
              <div class="row price-plan-wrapper">
                <!-- Kickoff -->
                <div class="col-12 col-md-4">
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
                    :features="[
                        'Torneos ilimitados',
                        'Gestión de ligas, torneos y fases',
                        'Registro de equipos y jugadores',
                        'Calendario automático',
                        'Resultados y tablas de posiciones',
                        'Vista pública del torneo + QR'
                        ]"
                    :mode="priceMode"
                  />
                </div>

                <!-- ProPlay (recomendado) -->
                <div class="col-12 col-md-4">
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
                    :features="[
                      'Incluye Kickoff',
                      'Verificación de jugadores',
                      'Bloqueo de transferencias de jugadores',
                      'Reprogramación completa de partidos',
                      'Gestión de ubicaciones y canchas',
                      'Soporte prioritario'
                      ]"
                    :mode="priceMode"
                    featured
                    badge="Más elegido"
                  />
                </div>

                <!-- EliteLeague -->
                <div class="col-12 col-md-4 mt-4 mt-md-0">
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
                    :features="[
                      'Incluye ProPlay',
                      'Roles avanzados (staff, árbitros, admins)',
                      'Historial completo de torneos',
                      'Soporte prioritario + WhatsApp',
                      'Personalización visual (branding básico)',
                      'Acceso anticipado a nuevas funciones'
                      ]"
                    :mode="priceMode"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- Confianza -->
          <div class="row justify-content-center pt-5 text-center">
            <div class="col-12 col-md-10">
              <p class="text-body pt-2 fw-6">Cambia o cancela tu plan en cualquier momento.</p>
              <p class="text-body fw-2">Tu progreso y configuración se conservan cuando pasas del trial a un plan.</p>
              <p class="text-body fw-2">
                ¿Dudas? <a href="#faq">Consulta las preguntas frecuentes</a> o escríbenos por chat.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="section faq-area ptb_100 bg-white" id="faq">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-7">
              <!-- Section Heading -->
              <div class="section-heading text-center">
                <h2 class="text-capitalize">¿Tienes Preguntas?</h2>
                <p class="d-none d-sm-block mt-4">
                  Si tienes alguna pregunta sobre Futzo.io, consulta nuestras preguntas frecuentes. Hemos reunido las
                  dudas más comunes para que puedas resolverlas rápidamente.
                </p>
                <p class="d-block d-sm-none mt-4">
                  Consulta nuestras preguntas frecuentes para resolver tus dudas sobre Futzo.io de manera rápida.
                </p>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-12">
              <!-- FAQ Content -->
              <div class="faq-content">
                <!-- sApp Accordion -->
                <div class="accordion" id="sApp-accordion">
                  <div class="row justify-content-center">
                    <div class="col-12 col-md-10 col-lg-8">
                      <!-- Single Accordion Item -->
                      <div class="card border-top-0 border-left-0 border-right-0 border-bottom">
                        <!-- Card Header -->
                        <div class="card-header bg-inherit border-0 p-0">
                          <h3 class="mb-0">
                            <button
                              class="btn px-0 py-3"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseOne"
                            >
                              ¿Qué es Futzo.io y cómo puede ayudarme en la gestión de mi liga de fútbol?
                            </button>
                          </h3>
                        </div>
                        <div id="collapseOne" class="collapse show" data-parent="#sApp-accordion">
                          <!-- Card Body -->
                          <div class="card-body px-0 py-3">
                            Futzo.io es una plataforma integral diseñada para optimizar la administración de ligas de
                            fútbol, haciéndola más eficiente y menos complicada. Desde la programación automatizada de
                            partidos hasta la gestión de equipos, Futzo.io centraliza todas las funciones clave en un
                            solo lugar. Una de sus características destacadas es la automatización del proceso de
                            inscripción: Futzo.io genera URLs únicas para que cada equipo y jugador se registren de
                            forma autónoma, reduciendo significativamente el esfuerzo administrativo. Además, facilita
                            la comunicación directa con los jugadores, asegurando que todo el proceso sea fluido y sin
                            complicaciones.
                          </div>
                        </div>
                      </div>
                      <!-- Single Accordion Item -->
                      <div class="card border-top-0 border-left-0 border-right-0 border-bottom">
                        <!-- Card Header -->
                        <div class="card-header bg-inherit border-0 p-0">
                          <h3 class="mb-0">
                            <button
                              class="btn collapsed px-0 py-3"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseTwo"
                            >
                              ¿Necesito instalar algún software para usar Futzo.io?
                            </button>
                          </h3>
                        </div>
                        <div id="collapseTwo" class="collapse" data-parent="#sApp-accordion">
                          <!-- Card Body -->
                          <div class="card-body px-0 py-3">
                            No, Futzo.io es una plataforma basada en la web. Solo necesitas registrarte y acceder desde
                            cualquier dispositivo con conexión a internet. No requiere instalación, lo que te permite
                            empezar a usarla de inmediato.
                          </div>
                        </div>
                      </div>
                      <!-- Single Accordion Item -->
                      <div class="card border-top-0 border-left-0 border-right-0 border-bottom">
                        <!-- Card Header -->
                        <div class="card-header bg-inherit border-0 p-0">
                          <h3 class="mb-0">
                            <button
                              class="btn collapsed px-0 py-3"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseThree"
                            >
                              ¿Puedo gestionar múltiples torneos al mismo tiempo con Futzo.io?
                            </button>
                          </h3>
                        </div>
                        <div id="collapseThree" class="collapse" data-parent="#sApp-accordion">
                          <!-- Card Body -->
                          <div class="card-body px-0 py-3">
                            Sí, Futzo.io te permite organizar y administrar múltiples torneos simultáneamente. La
                            plataforma está diseñada para manejar la complejidad de gestionar varios torneos sin perder
                            de vista los detalles importantes.
                          </div>
                        </div>
                      </div>
                      <!-- Single Accordion Item -->
                      <div class="card border-top-0 border-left-0 border-right-0 border-bottom">
                        <!-- Card Header -->
                        <div class="card-header bg-inherit border-0 p-0">
                          <h3 class="mb-0">
                            <button
                              class="btn collapsed px-0 py-3"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseFour"
                            >
                              ¿Qué tipo de soporte técnico ofrece Futzo.io?
                            </button>
                          </h3>
                        </div>
                        <div id="collapseFour" class="collapse" data-parent="#sApp-accordion">
                          <!-- Card Body -->
                          <div class="card-body px-0 py-3">
                            Futzo.io ofrece soporte técnico 24/7 para todos sus usuarios. Nuestro equipo está disponible
                            para ayudarte con cualquier problema técnico o consulta que puedas tener, asegurando que
                            siempre tengas acceso a la asistencia que necesitas.
                          </div>
                        </div>
                      </div>
                      <!-- Single Accordion Item -->
                      <div class="card border-top-0 border-left-0 border-right-0 border-bottom">
                        <!-- Card Header -->
                        <div class="card-header bg-inherit border-0 p-0">
                          <h3 class="mb-0">
                            <button
                              class="btn collapsed px-0 py-3"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseFive"
                            >
                              ¿Es seguro almacenar los datos de mi liga en Futzo.io?
                            </button>
                          </h3>
                        </div>
                        <div id="collapseFive" class="collapse" data-parent="#sApp-accordion">
                          <!-- Card Body -->
                          <div class="card-body px-0 py-3">
                            Absolutamente. Futzo.io utiliza tecnologías de encriptación avanzadas y copias de seguridad
                            diarias para garantizar que todos tus datos estén seguros y protegidos. La privacidad y
                            seguridad de tu información son nuestras prioridades.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div id="scrollUp" title="Scroll To Top">
        <client-only>
          <i class="fas fa-arrow-up"></i>
        </client-only>
      </div>
      <section id="footer">
        <div class="height-emulator d-none d-lg-block"></div>
        <div class="footer-area bg-gray">
          <!-- Footer Top -->
          <div class="footer-top ptb_100">
            <div class="container">
              <div class="row">
                <div class="col-12 col-sm-6 col-lg-3">
                  <!-- Footer Items -->
                  <div class="footer-items">
                    <!-- Logo -->
                    <a class="navbar-brand" href="#">
                      <img
                          class="logo"
                          src="assets/images/logo-07.png"
                          alt="futzo plataforma admintrativa de ligas deportivas"
                          width="140"
                          height="169"
                      />
                    </a>
                    <p class="mt-2 mb-3"></p>
                    <!-- Social Icons -->
                    <div class="social-icons d-flex">
                      <a class="facebook" href="https://www.facebook.com/futzo.io" aria-label="Visit Futzo on Facebook">
                        <Icon name="lucide:facebook" class="mx-auto my-auto" size="42"></Icon>
                      </a>
                      <a
                          class="bg-danger"
                          href="https://www.instagram.com/futzo.io/"
                          aria-label="Visit Futzo on Instagram"
                      >
                        <Icon name="lucide:instagram" class="mx-auto my-auto" size="42"></Icon>
                      </a>
                      <a
                          class="bg-danger"
                          href="https://www.youtube.com/@futzo-oficial"
                          aria-label="Visit Futzo on Youtube"
                      >
                        <Icon name="lucide:youtube" class="mx-auto my-auto" size="42"></Icon>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-sm-3 col-lg-3">
                  <!-- Footer Items -->
                  <div class="footer-items">
                    <!-- Footer Title -->
                    <h3 class="footer-title mb-2">Enlaces útiles</h3>
                    <ul>
                      <li class="py-2"><a href="#home">Home</a></li>
                      <li class="py-2"><a href="#features">Características</a></li>
                      <li class="py-2"><a href="#faq">Preguntas frecuentes</a></li>
                      <li class="py-2">
                        <nuxt-link to="/politica-de-privacidad">Política de privacidad</nuxt-link>
                      </li>
                      <li class="py-2">
                        <nuxt-link to="/terminos-de-servicio">Términos de servicio</nuxt-link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="col-12 col-sm-6 col-lg-6">
                  <!-- Footer Items -->
                  <div class="footer-items">
                    <!-- Footer Title -->
                    <h3 class="footer-title mb-2">Sobre Futzo.io</h3>
                    <p class="mb-3">
                      Futzo.io es una plataforma diseñada para facilitar la administración de ligas deportivas. Ayudamos
                      a organizadores, árbitros y dueños de equipos a crear torneos, registrar jugadores, gestionar
                      calendarios y generar estadísticas fácilmente desde un solo lugar.
                    </p>
                    <p class="mb-3">Con Futzo.io, llevar el control de tu liga es simple, rápido y profesional.</p>
                    <p><span>📍</span> Con sede en Puerto Vallarta, Jalisco, México</p>
                    <p><span>📞</span> Contacto: +52 322 327 8118</p>
                    <p><span>📧</span> Email: contacto [arroba] futzo.io</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--          Footer Bottom-->
          <div class="footer-bottom">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <!-- Copyright Area -->
                  <div
                      class="copyright-area d-flex flex-wrap justify-content-center justify-content-sm-between text-center py-4"
                  >
                    <!-- Copyright Left -->
                    <div class="copyright-left">
                      &copy; Copyrights {{ new Date().getFullYear() }} Futzo.io todos los derechos reservados.
                    </div>
                    <!-- Copyright Right -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
  </PageLayout>
</template>
<style scoped>
  @import '~/assets/css/style.css';
  @import '~/assets/css/responsive.css';
  html{
    overflow-y: hidden;
  }
  a.text-primary:hover,
  .btn-primary:hover {
    color: white !important;
    background-color: #9155fd !important;
  }
  .hero {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  .hero-subtitle {
    margin-top: 0.75rem;
  }
  .hero-benefits {
    margin: 1rem 0;
    padding-left: 1.25rem;
  }
  .hero-ctas {
    display: flex;
    gap: 0.75rem;
    margin: 1rem 0;
  }
  .btn {
    display: inline-block;
    padding: 0.8rem 1.25rem;
    border-radius: 4px;
    text-decoration: none;
  }
  .btn-primary {
    background: #9155fd;
  }
  .btn-outline {
    border: 1px solid #9155fd;
    color: #9155fd;
    background: transparent;
  }
  .btn-outline:hover {
    border: 1px solid #9155fd;
    color: #9155fd;
    background: transparent;
  }
  .btn-outline:focus {
    border: 1px solid #9155fd;
    color: #9155fd;
    background: transparent;
  }
  .hero-note {
    display: block;
    opacity: 0.8;
  }
</style>
