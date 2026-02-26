<script lang="ts" setup>
import type {FutzoPlan} from '~/types'
import {capiContext} from '~/utils/capi'
import PlanCard from '~/components/pages/PlanCard.vue'
import {useHomeSeoContent} from '~/composables/home/useHomeSeoContent'

definePageMeta({
  layout: 'legacy',
  sanctum: { excluded: true },
})

const {
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
  productLinks,
} = useHomeSeoContent()

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterSite: '@futzoio',
  twitterCreator: '@futzoio',
})

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Futzo',
  operatingSystem: 'Web',
  applicationCategory: 'BusinessApplication',
  description: seoDescription,
  url: 'https://futzo.io/',
  offers: pricingPlans.map((plan) => ({
    '@type': 'Offer',
    name: plan.fallback.name,
    price: plan.fallback.price,
    priceCurrency: 'MXN',
    availability: 'https://schema.org/InStock',
    url: 'https://futzo.io/login',
  })),
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

useHead({
  link: [{ rel: 'canonical', href: 'https://futzo.io/' }],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(softwareJsonLd),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify(faqJsonLd),
    },
  ],
})

const { $buildAppUrl, $fbq, $attribution } = useNuxtApp() as any
const router = useRouter()
const mobileDrawer = ref(false)
const hasRequestedPrices = ref(false)
const hasTrackedPricingView = ref(false)
const hasShownPricingError = ref(false)
const pricingRef = ref<HTMLElement | null>(null)
const heroSectionRef = ref<HTMLElement | null>(null)
const isHeroVisible = ref(true)
const isMobileViewport = useMediaQuery('(max-width: 599px)')

const { gtag } = useGtag()
const { isAuthenticated } = useSanctumAuth()
const textButton = computed(() => (isAuthenticated?.value ? 'Ir al Dashboard' : 'Prueba gratis'))
const showMobileStickyCta = computed(() => isMobileViewport.value && !isHeroVisible.value && !mobileDrawer.value && !isAuthenticated?.value)

type CtaPlacement = 'hero' | 'nav' | 'steps' | 'final' | 'mobile-sticky'

const {
  priceMode,
  setPriceMode,
  loading,
  error,
  kickoffPlan,
  proPlayPlan,
  eliteLeaguePlan,
  load,
} = useProductPrices()

const fallbackPlanUrl = computed(() => {
  const buildUrl = typeof $buildAppUrl === 'function' ? $buildAppUrl : (globalThis as any).$buildAppUrl
  return buildUrl?.('/login') || '/login'
})

const resolvedPlans = computed(() => {
  const fetched: Record<'kickoff' | 'proPlay' | 'eliteLeague', FutzoPlan | undefined> = {
    kickoff: kickoffPlan.value,
    proPlay: proPlayPlan.value,
    eliteLeague: eliteLeaguePlan.value,
  }

  return pricingPlans.map((planMeta) => {
    const plan = fetched[planMeta.key]
    const symbol = plan?.currency?.symbol || '$'
    const isoCode = plan?.currency?.iso_code || ' MXN'

    return {
      title: plan?.name || planMeta.fallback.name,
      price: plan?.price || planMeta.fallback.price,
      annually_price: plan?.annually_price || planMeta.fallback.annually_price,
      annual_saving: plan?.annual_saving || planMeta.fallback.annual_saving,
      symbol,
      iso_code: isoCode,
      url: plan?.url || fallbackPlanUrl.value,
      img_path: planMeta.image,
      features: planMeta.features,
      featured: planMeta.featured,
      badge: planMeta.badge,
    }
  })
})

const loadPricesNearViewport = async () => {
  if (hasRequestedPrices.value || loading.value || kickoffPlan.value) return
  hasRequestedPrices.value = true
  await load()
}

const trackCta = (placement: CtaPlacement) => {
  if (isAuthenticated?.value) return
  gtag('event', 'sign_up', { method: placement, event_label: 'Prueba gratis' })
}

const generateEventId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  return `evt-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const toInternalUrl = (maybeAbsoluteUrl: string) => {
  if (!maybeAbsoluteUrl) return maybeAbsoluteUrl
  try {
    const u = new URL(maybeAbsoluteUrl, 'https://futzo.io')
    return `${u.pathname}${u.search}${u.hash}`
  } catch {
    return maybeAbsoluteUrl
  }
}

const trackStartRegistration = (placement: CtaPlacement, eventId: string) => {
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

const startRegistrationClick = async (placement: CtaPlacement) => {
  if (isAuthenticated?.value) {
    await router.push('/dashboard')
    return
  }

  trackCta(placement)

  const eventId = generateEventId()
  trackStartRegistration(placement, eventId)

  const buildUrl = typeof $buildAppUrl === 'function' ? $buildAppUrl : (globalThis as any).$buildAppUrl
  const destination = buildUrl?.('/login', { eventId }) || `/login?event_id=${encodeURIComponent(eventId)}`

  try {
    capiContext()
  } catch {}

  await router.push(toInternalUrl(destination))
}

const onScrollTop = () => {
  if (!import.meta.client) return
  window.scrollTo({ top: 0, behavior: 'smooth' })
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
      fbq('track', 'ViewContent', {
        content_name: 'pricing',
        content_category: 'plans',
        content_type: 'pricing',
      })
    }

    stopPricingPixelObserver()
  },
  { threshold: 0.2 }
)

useIntersectionObserver(
  heroSectionRef,
  ([entry]) => {
    isHeroVisible.value = entry?.isIntersecting ?? false
  },
  { threshold: 0.05 }
)

watch(
  error,
  (value) => {
    if (!value || hasShownPricingError.value) return
    hasShownPricingError.value = true

    try {
      useToast().toast({
        type: 'error',
        msg: 'No pudimos cargar precios en vivo',
        description: 'Mostramos precios base temporalmente.',
      })
    } catch {}
  },
  { flush: 'post' }
)
</script>

<template>
  <PageLayout styles="main pa-0">
    <template #default>
      <v-app-bar id="home" color="#13203d" scroll-behavior="elevate" elevation="0" :elevation-threshold="12" class="landing-navbar">
        <v-container class="d-flex align-center py-0">
          <a href="/" class="landing-brand" aria-label="Futzo inicio">
            <img src="/futzo/logos/logo-17.png" width="132" height="40" alt="Futzo logo" />
          </a>

          <v-spacer />

          <nav class="landing-nav d-none d-md-flex">
            <a v-for="link in navLinks" :key="link.href" :href="link.href" class="landing-nav__link">{{ link.label }}</a>
            <v-btn color="primary" rounded="lg" class="ml-2" data-testid="landing-cta-nav" @click.prevent="startRegistrationClick('nav')">
              {{ textButton }}
            </v-btn>
          </nav>

          <v-app-bar-nav-icon class="d-md-none" color="white" @click="mobileDrawer = !mobileDrawer" />
        </v-container>
      </v-app-bar>

      <v-navigation-drawer v-model="mobileDrawer" temporary location="right" class="landing-drawer" width="260">
        <v-list class="pt-4">
          <v-list-item v-for="link in navLinks" :key="link.href" :title="link.label" :href="link.href" @click="mobileDrawer = false" />
          <v-list-item>
            <v-btn block color="primary" rounded="lg" data-testid="landing-cta-mobile" @click.prevent="startRegistrationClick('nav'); mobileDrawer = false">
              {{ textButton }}
            </v-btn>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <div class="landing-home" :class="{ 'landing-home--sticky-cta': showMobileStickyCta }" role="main">
        <section ref="heroSectionRef" class="hero-section">
          <v-container class="hero-grid">
            <div class="hero-copy reveal">
              <h1>Deja de armar tu liga en Excel y WhatsApp</h1>
              <p class="hero-subheadline">Calendario automático, registro de equipos por QR, estadísticas en tiempo real. Todo en un solo lugar.</p>

              <div class="hero-actions">
                <v-btn color="primary" size="large" rounded="lg" data-testid="landing-cta-hero" @click.prevent="startRegistrationClick('hero')">
                  Prueba gratis
                </v-btn>
                <v-btn variant="outlined" color="white" size="large" rounded="lg" href="#como-funciona">
                  Ver cómo funciona ↓
                </v-btn>
              </div>

              <p class="hero-trust">Sin tarjeta de crédito. Sin instalación. Cancela cuando quieras.</p>
            </div>

            <div class="hero-media reveal reveal--delay-1">
              <v-img src="assets/images/dashboard.png" alt="Panel principal de Futzo"  class="hero-media__image" />
            </div>
          </v-container>
        </section>

        <section class="social-proof" aria-label="Prueba social">
          <v-container>
            <ul>
              <li v-for="item in socialProof" :key="item.label">
                <strong>{{ item.value }}</strong>
                <span>{{ item.label }}</span>
              </li>
            </ul>
          </v-container>
        </section>

        <section class="content-section">
          <v-container>
            <article class="content-panel reveal">
              <h2>Organizar una liga no debería ser un segundo trabajo</h2>
              <p v-for="paragraph in problemParagraphs" :key="paragraph">{{ paragraph }}</p>
            </article>
          </v-container>
        </section>

        <section class="content-section content-section--alt">
          <v-container>
            <article class="content-panel reveal">
              <h2>Futzo se encarga de la operación. Tú te encargas de la liga.</h2>
              <p>
                Futzo es un sistema diseñado para organizadores de ligas y torneos de fútbol amateur. Automatiza lo que hoy haces a mano y te da control
                de todo desde un solo panel.
              </p>
            </article>
          </v-container>
        </section>

        <section id="como-funciona" class="content-section">
          <v-container>
            <header class="section-header reveal">
              <h2>Arranca tu liga en 3 pasos</h2>
            </header>

            <div class="steps-grid">
              <article v-for="(step, index) in steps" :key="step.title" class="step-card reveal" :style="{ '--delay': `${index * 90}ms` }">
                <div class="step-card__icon">
                  <Icon :name="step.icon" size="20" />
                </div>
                <h3>{{ step.title }}</h3>
                <p>{{ step.description }}</p>
              </article>
            </div>

            <div class="section-cta reveal">
              <v-btn color="primary" rounded="lg" size="large" @click.prevent="startRegistrationClick('steps')">Crea tu primer torneo gratis</v-btn>
            </div>
          </v-container>
        </section>

        <section id="beneficios" class="content-section content-section--alt">
          <v-container>
            <header class="section-header reveal">
              <h2>Lo que tu liga gana con Futzo</h2>
            </header>

            <div class="benefits-grid">
              <article v-for="(benefit, index) in benefits" :key="benefit.title" class="benefit-card reveal" :style="{ '--delay': `${index * 60}ms` }">
                <div class="benefit-card__icon">
                  <Icon :name="benefit.icon" size="20" />
                </div>
                <h3>{{ benefit.title }}</h3>
                <p>{{ benefit.description }}</p>
                <nuxt-link :to="benefit.ctaHref" class="benefit-card__link">{{ benefit.ctaLabel }}</nuxt-link>
              </article>
            </div>

            <div class="section-cta reveal">
              <v-btn variant="outlined" color="primary" rounded="lg" size="large" data-testid="landing-cta-funcionalidades" to="/funcionalidades">
                Ver todas las funcionalidades
              </v-btn>
            </div>
          </v-container>
        </section>

        <section class="content-section">
          <v-container>
            <header class="section-header reveal">
              <h2>Mira Futzo en acción</h2>
              <p>Capturas reales del dashboard, calendario, tabla de posiciones y módulos operativos.</p>
            </header>

            <div class="screenshots-grid">
              <figure
                v-for="(shot, index) in screenshots"
                :key="shot.src"
                class="screenshot-card reveal"
                :style="{ '--delay': `${index * 50}ms` }"
              >
                <img :src="shot.src" :alt="shot.alt" loading="lazy" decoding="async" width="1280" height="720" />
                <figcaption>{{ shot.title }}</figcaption>
              </figure>
            </div>
          </v-container>
        </section>

        <section class="content-section testimonials-section-wrap">
          <TestimonialsSection
            :items="testimonials"
            title="Lo que dicen organizadores que ya usan Futzo"
            subtitle="Testimonios reales de organizadores, coordinadoras y dueños de complejos deportivos que ya operan su liga con Futzo."
            />
        </section>

        <section class="content-section">
          <v-container>
            <header class="section-header reveal">
              <h2>Hecho para quien arma la liga</h2>
            </header>

            <div class="audience-grid">
              <article v-for="(audience, index) in audiences" :key="audience.title" class="audience-card reveal" :style="{ '--delay': `${index * 70}ms` }">
                <h3>{{ audience.title }}</h3>
                <p>{{ audience.description }}</p>
              </article>
            </div>
          </v-container>
        </section>

        <section class="content-section content-section--alt">
          <v-container>
            <header class="section-header reveal">
              <h2>Lo que cambia cuando dejas de improvisar</h2>
            </header>

            <div class="comparison-list">
              <article v-for="(row, index) in comparisonRows" :key="row.withFutzo" class="comparison-item reveal" :style="{ '--delay': `${index * 55}ms` }">
                <div class="comparison-item__before">
                  <Icon name="lucide:x-circle" size="18" />
                  <span>{{ row.withoutFutzo }}</span>
                </div>
                <div class="comparison-item__after">
                  <Icon name="lucide:check-circle-2" size="18" />
                  <span>{{ row.withFutzo }}</span>
                </div>
              </article>
            </div>
          </v-container>
        </section>

        <section ref="pricingRef" id="pricing" class="content-section">
          <v-container>
            <header class="section-header reveal">
              <h2>Empieza gratis. Elige tu plan cuando estés listo.</h2>
              <p>7 días de prueba gratis en cualquier plan. Sin tarjeta. Tu progreso se conserva al elegir plan.</p>
            </header>

            <div class="pricing-toggle-wrap">
              <v-btn-toggle :model-value="priceMode" mandatory divided rounded="lg" color="primary" @update:model-value="setPriceMode">
                <v-btn value="annually_price">Anual</v-btn>
                <v-btn value="monthly_price">Mensual</v-btn>
              </v-btn-toggle>
            </div>

            <div class="pricing-grid">
              <PlanCard
                v-for="plan in resolvedPlans"
                :key="plan.title"
                :title="plan.title"
                :img_path="plan.img_path"
                :price="plan.price"
                :symbol="plan.symbol"
                :iso_code="plan.iso_code"
                :annually_price="plan.annually_price"
                :annual_saving="plan.annual_saving"
                cta="Empieza tu prueba gratis"
                :url="plan.url"
                :features="plan.features"
                :mode="priceMode"
                :featured="plan.featured"
                :badge="plan.badge"
              />
            </div>

            <p v-if="!loading && hasShownPricingError" class="pricing-fallback-note">Mostramos una versión base de precios mientras recuperamos la actualización en vivo.</p>
          </v-container>
        </section>

        <section id="faq" class="content-section content-section--alt">
          <v-container>
            <header class="section-header reveal">
              <h2>Preguntas frecuentes</h2>
            </header>

            <v-expansion-panels variant="accordion" class="faq-panels">
              <v-expansion-panel v-for="faq in faqs" :key="faq.question" rounded="lg">
                <v-expansion-panel-title>{{ faq.question }}</v-expansion-panel-title>
                <v-expansion-panel-text>{{ faq.answer }}</v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-container>
        </section>

        <section class="final-cta">
          <v-container class="final-cta__panel reveal">
            <h2>Tu liga merece mejor que un grupo de WhatsApp y una hoja de Excel</h2>
            <v-btn color="primary" rounded="lg" size="large" @click.prevent="startRegistrationClick('final')">
              Prueba Futzo gratis — 7 días, sin tarjeta
            </v-btn>
          </v-container>
        </section>

        <Transition name="mobile-sticky-cta-fade">
          <div v-if="showMobileStickyCta" class="mobile-sticky-cta" data-testid="landing-cta-mobile-sticky">
            <v-btn
              block
              color="primary"
              size="large"
              rounded="lg"
              data-testid="landing-cta-mobile-sticky-btn"
              @click.prevent="startRegistrationClick('mobile-sticky')"
            >
              Prueba gratis
            </v-btn>
          </div>
        </Transition>
      </div>

      <footer class="landing-footer">
        <v-container class="landing-footer__content">
          <p>© {{ new Date().getFullYear() }} Futzo.io · Software para administrar ligas de fútbol.</p>
          <div class="landing-footer__meta">
            <div class="landing-footer__groups">
              <div class="landing-footer__group">
                <p class="landing-footer__group-title">Legal</p>
                <div class="landing-footer__links landing-footer__links--stack">
                  <nuxt-link to="/politica-de-privacidad">Política de privacidad</nuxt-link>
                  <nuxt-link to="/terminos-de-servicio">Términos de servicio</nuxt-link>
                </div>
              </div>

              <div class="landing-footer__group">
                <p class="landing-footer__group-title">Producto</p>
                <div class="landing-footer__links landing-footer__links--stack">
                  <nuxt-link v-for="link in productLinks" :key="link.href" :to="link.href">{{ link.label }}</nuxt-link>
                </div>
              </div>
            </div>
            <div class="landing-footer__socials">
              <a href="https://www.facebook.com/futzo.io" target="_blank" rel="noopener noreferrer" aria-label="Facebook Futzo">
                <Icon name="lucide:facebook" size="16" />
              </a>
              <a href="https://www.instagram.com/futzo.io/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Futzo">
                <Icon name="lucide:instagram" size="16" />
              </a>
              <a href="https://www.youtube.com/@futzo-oficial" target="_blank" rel="noopener noreferrer" aria-label="YouTube Futzo">
                <Icon name="lucide:youtube" size="16" />
              </a>
            </div>
          </div>
        </v-container>
      </footer>

    </template>
  </PageLayout>
</template>

<style scoped src="~/assets/scss/pages/home-seo.scss"></style>
