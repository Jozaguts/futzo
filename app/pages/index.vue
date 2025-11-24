<script lang="ts" setup>
  import { useProductPrices } from '~/composables/useProductPrices'

  definePageMeta({
    layout: 'blank',
    bodyAttrs: {
      class: 'd-none',
    },
  })
  useHead({
    link: [{ rel: 'stylesheet', href: 'https://assets.calendly.com/assets/external/widget.css' }],
    script: [
      { src: 'https://futzo.s3.us-east-2.amazonaws.com/assets/js/jquery-3.3.1.min.js', tagPosition: 'bodyClose' },
      { src: 'https://futzo.s3.us-east-2.amazonaws.com/assets/js/popper.min.js', tagPosition: 'bodyClose' },
      { src: 'https://futzo.s3.us-east-2.amazonaws.com/assets/js/bootstrap.min.js', tagPosition: 'bodyClose' },
      { src: 'https://futzo.s3.us-east-2.amazonaws.com/assets/js/plugins.min.js', tagPosition: 'bodyClose' },
      { src: 'https://futzo.s3.us-east-2.amazonaws.com/assets/js/scripts.js', tagPosition: 'bodyClose' },
      { src: 'https://assets.calendly.com/assets/external/widget.js', tagPosition: 'bodyClose', async: true },
    ],
    meta: [
      { name: 'description', content: 'Futzo.io es una plataforma para organizar y administrar ligas deportivas.' },
      { property: 'og:site_name', content: 'Futzo.io' },
      { property: 'og:title', content: 'Futzo.io - Gestiona tu liga como un profesional' },
      {
        property: 'og:description',
        content:
          'Crea torneos, registra equipos y jugadores, genera calendarios y estadísticas desde una plataforma intuitiva.',
      },
      { property: 'og:image', content: 'https://futzo.io/images/futzo.png' },
      { property: 'og:url', content: 'https://futzo.io' },
      { property: 'og:site_name', content: 'Futzo.io' },
      { property: 'og:type', content: 'website' },
    ],
  })
  const imgSrc = '/futzo/logos/logo-17.png'
  const { kickoffPlan } = useProductPrices()
  const { $buildAppUrl } = useNuxtApp() as any
  const url = ref('')

  const updateUrl = (value: { url?: string } | null | undefined) => {
    if (value?.url) {
      url.value = $buildAppUrl(value.url)
    }
  }

  watch(
    kickoffPlan,
    (newVal) => {
      updateUrl(newVal)
    },
    { deep: true }
  )

  onMounted(() => {
    updateUrl(kickoffPlan.value)
  })
</script>
<template>
  <PageLayout class-="pa-0">
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
                    class="nav-link scroll bg-white futzo-rounded px-3 py-2 ma-6 text-primary font-weight-bold"
                    to="/login"
                    >Ingresar</nuxt-link
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
                <h1>Futzo.io</h1>
                <h2><strong>Administra tu liga en minutos</strong></h2>
                <p class="hero-subtitle my-0">Calendarios, equipos y resultados en un solo lugar.</p>
                <ul class="hero-benefits">
                  <li>✅ Calendario y resultados en tiempo real</li>
                  <li>✅ Registro automatizado de torneos, equipos, jugadores</li>
                  <li>✅ Control de sedes/campos de juego</li>
                  <li>✅ Recalendarización de partidos, suspende, pospone o cancela partidos</li>
                  <li>✅ Estadísticas automáticas</li>
                </ul>
                <div class="hero-ctas">
                  <nuxt-link class="btn btn-primary" to="/login">Comenzar</nuxt-link>
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
                      <span class="icon align-self-center"><i class="fas fa-check"></i></span>
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
                      <span class="icon align-self-center"><i class="fas fa-check"></i></span>
                      <span class="media-body pl-2"
                        >Automatización de calendarios de partidos: Creación automática de calendarios considerando
                        disponibilidad de estadios y preferencias de equipos.</span
                      >
                    </div>
                  </li>
                  <li class="py-1">
                    <!-- List Box -->
                    <div class="list-box media">
                      <span class="icon align-self-center"><i class="fas fa-check"></i></span>
                      <span class="media-body pl-2"
                        >Estadísticas detalladas y análisis: Recopilación y presentación de estadísticas de juegos y
                        rendimiento de equipos y jugadores</span
                      >
                    </div>
                  </li>
                </ul>
                <div class="icon-box d-flex mt-3 mb-3">
                  <div class="service-icon">
                    <span><i class="fas fa-bell"></i></span>
                  </div>
                  <div class="service-icon mx-3">
                    <span><i class="fas fa-calendar-alt"></i></span>
                  </div>
                  <div class="service-icon">
                    <span><i class="fas fa-users-cog"></i></span>
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
    </template>
  </PageLayout>
</template>
<style>
  @import '~/assets/css/style.css';
  @import '~/assets/css/responsive.css';
  a.text-primary:hover,
  .btn-primary:hover {
    color: white !important;
    background-color: #9155fd !important;
  }
  .main {
    padding: 0 !important;
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
