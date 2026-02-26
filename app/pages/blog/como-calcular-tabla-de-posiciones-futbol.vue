<script setup lang="ts">
import LandingMarketingShell from '~/components/layout/LandingMarketingShell.vue'
import { BLOG_TABLA_POSICIONES_SLUG, useBlogTablaPosicionesContent } from '~/composables/blog/useBlogTablaPosicionesContent'

type CtaPlacement = 'hero' | 'mid' | 'final' | 'aside'

const {
  pageTitle,
  pageDescription,
  pageUrl,
  heroImagePath,
  heroImage,
  keywordPrincipal,
  keywordsSecundarias,
  tocItems,
  pointsSystem,
  pointsFormula,
  requiredMetrics,
  goalDifferenceFormula,
  goalDifferenceExamples,
  tiebreakerOrder,
  teamExamples,
  exampleSteps,
  commonMistakes,
  bestPractices,
  automationSignals,
  automationBenefits,
  internalLinks,
  articleSchema,
} = useBlogTablaPosicionesContent()

definePageMeta({
  layout: 'legacy',
  sanctum: { excluded: true },
})

const { isAuthenticated } = useSanctumAuth()
const router = useRouter()
const { gtag } = useGtag()
const { y } = useWindowScroll()

const hasTrackedScroll50 = ref(false)
const hasTrackedScroll90 = ref(false)
const ctaLabel = computed(() => (isAuthenticated?.value ? 'Ir al Dashboard' : 'Prueba Futzo gratis'))

const trackBlogEvent = (eventName: 'blog_scroll_depth' | 'blog_cta_click', payload: Record<string, string | number>) => {
  if (typeof gtag !== 'function') return
  gtag('event', eventName, payload)
}

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  keywords: [keywordPrincipal, ...keywordsSecundarias].join(', '),
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: 'article',
  ogUrl: pageUrl,
  ogImage: heroImage,
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterImage: heroImage,
})

useHead({
  link: [{ rel: 'canonical', href: pageUrl }],
})

useSchemaOrg([articleSchema])

const scrollProgress = computed(() => {
  if (!import.meta.client) return 0

  const doc = document.documentElement
  const maxScrollable = doc.scrollHeight - window.innerHeight
  if (maxScrollable <= 0) return 0

  return Math.round((y.value / maxScrollable) * 100)
})

const trackScrollDepth = (depth: 50 | 90) => {
  trackBlogEvent('blog_scroll_depth', {
    blog_slug: BLOG_TABLA_POSICIONES_SLUG,
    depth,
  })
}

watch(
  scrollProgress,
  (value) => {
    if (value >= 50 && !hasTrackedScroll50.value) {
      hasTrackedScroll50.value = true
      trackScrollDepth(50)
    }

    if (value >= 90 && !hasTrackedScroll90.value) {
      hasTrackedScroll90.value = true
      trackScrollDepth(90)
    }
  },
  { flush: 'post' }
)

const goToTrial = async (placement: CtaPlacement) => {
  trackBlogEvent('blog_cta_click', {
    blog_slug: BLOG_TABLA_POSICIONES_SLUG,
    placement,
  })

  if (isAuthenticated?.value) {
    await router.push('/dashboard')
    return
  }

  await router.push('/login')
}
</script>

<template>
  <LandingMarketingShell>
    <div class="blog-article-page" role="main">
      <section class="blog-article-page__hero">
        <v-container class="blog-article-page__container">
          <div class="blog-article-page__hero-grid">
            <div class="blog-article-page__hero-copy">
              <p class="blog-article-page__eyebrow">Standings sin errores 2026</p>
              <h1>Cómo calcular la tabla de posiciones en fútbol sin errores</h1>
              <p>Guía práctica para calcular puntos, diferencia de goles y desempates con un método claro y consistente.</p>
              <div class="blog-article-page__hero-actions">
                <v-btn color="primary" rounded="lg" size="large" data-testid="blog5-cta-hero" @click.prevent="goToTrial('hero')">
                  {{ ctaLabel }}
                </v-btn>
                <NuxtLink to="/blog" class="blog-article-page__back-link">Volver al blog</NuxtLink>
              </div>
            </div>

            <div class="blog-article-page__hero-media" data-testid="blog5-hero-image">
              <v-img :src="heroImagePath" alt="Tabla de posiciones de futbol" cover />
            </div>
          </div>
        </v-container>
      </section>

      <section class="blog-article-page__section">
        <v-container class="blog-article-page__container">
          <div class="blog-article-page__content-grid">
            <article class="blog-article-page__article">
              <v-card class="blog-article-page__toc" rounded="lg" variant="flat" aria-label="Tabla de contenidos">
                <h2>Tabla de contenidos</h2>
                <v-list density="compact" nav class="blog-article-page__toc-list">
                  <v-list-item v-for="item in tocItems" :key="item.id" :href="`#${item.id}`" :title="item.label" rounded="lg" />
                </v-list>
              </v-card>

              <v-card id="sistema-puntos" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>1) Sistema básico de puntos</h2>
                <p>En la mayoría de ligas amateur se usa esta base:</p>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="item in pointsSystem" :key="item" rounded="lg">
                    <template #prepend>
                      <Icon name="lucide:chevron-right" size="16" />
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
                <p><strong>Fórmula:</strong> {{ pointsFormula }}</p>
              </v-card>

              <v-card id="metricas-tabla" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>2) Métricas que debe tener la tabla</h2>
                <p>Si te falta una métrica, los desempates se vuelven ambiguos.</p>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="item in requiredMetrics" :key="item" rounded="lg">
                    <template #prepend>
                      <Icon name="lucide:chevron-right" size="16" />
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card id="diferencia-goles" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>3) Cómo calcular la diferencia de goles</h2>
                <p><strong>Fórmula:</strong> {{ goalDifferenceFormula }}</p>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="item in goalDifferenceExamples" :key="item" rounded="lg">
                    <template #prepend>
                      <Icon name="lucide:chevron-right" size="16" />
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card id="orden-desempate" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>4) Orden recomendado de desempate</h2>
                <p>Publica este orden desde el inicio del torneo para evitar reclamaciones.</p>
                <v-list density="compact" class="blog-article-page__ordered-list">
                  <v-list-item v-for="(item, index) in tiebreakerOrder" :key="item" rounded="lg">
                    <template #prepend>
                      <span class="blog-article-page__order-pill">{{ index + 1 }}</span>
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card id="ejemplo-completo" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>5) Ejemplo completo</h2>
                <p>Mini tabla con equipos empatados en puntos:</p>
                <div class="blog-article-page__format-grid">
                  <v-card v-for="team in teamExamples" :key="team.name" class="blog-article-page__format-card" rounded="lg" variant="flat">
                    <h3>{{ team.name }}</h3>
                    <p>G {{ team.won }} · E {{ team.draw }} · P {{ team.lost }}</p>
                    <p>GF {{ team.goalsFor }} · GC {{ team.goalsAgainst }} · DG +{{ team.goalDifference }}</p>
                    <p><strong>PTS {{ team.points }}</strong></p>
                  </v-card>
                </div>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="step in exampleSteps" :key="step" rounded="lg">
                    <template #prepend>
                      <Icon name="lucide:chevron-right" size="16" />
                    </template>
                    <v-list-item-title>{{ step }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card class="blog-article-page__inline-cta" rounded="lg" variant="flat" data-testid="blog5-cta-mid">
                <h2>Publica standings confiables cada jornada</h2>
                <p>Prueba Futzo y evita errores manuales en cálculos y desempates.</p>
                <v-btn color="primary" rounded="lg" size="large" @click.prevent="goToTrial('mid')">{{ ctaLabel }}</v-btn>
              </v-card>

              <v-card id="errores-comunes" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>6) Errores comunes al calcular standings</h2>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="item in commonMistakes" :key="item" rounded="lg">
                    <template #prepend>
                      <Icon name="lucide:chevron-right" size="16" />
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card id="buenas-practicas" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>7) Buenas prácticas para evitar conflictos</h2>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="item in bestPractices" :key="item" rounded="lg">
                    <template #prepend>
                      <Icon name="lucide:check-circle-2" size="16" />
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card id="cuanto-automatizar" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>8) ¿Cuándo conviene automatizar?</h2>
                <p>Si se cumple uno o más de estos puntos, el cálculo manual ya te resta tiempo:</p>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="item in automationSignals" :key="item" rounded="lg">
                    <template #prepend>
                      <Icon name="lucide:chevron-right" size="16" />
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
                <p>Automatizar te ayuda a:</p>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="item in automationBenefits" :key="item" rounded="lg">
                    <template #prepend>
                      <Icon name="lucide:check-circle-2" size="16" />
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>Enlaces recomendados</h2>
                <div class="blog-article-page__links-grid">
                  <NuxtLink v-for="link in internalLinks" :key="link.href" :to="link.href" class="blog-article-page__related-link">
                    {{ link.label }}
                  </NuxtLink>
                </div>
              </v-card>
            </article>

            <aside class="blog-article-page__aside">
              <v-card class="blog-article-page__aside-cta" rounded="lg" variant="flat" data-testid="blog5-aside-cta">
                <h2>¿Quieres standings sin discusiones?</h2>
                <p>Prueba Futzo gratis y centraliza resultados, criterios y tabla en un solo flujo.</p>
                <v-btn color="primary" rounded="lg" size="large" block @click.prevent="goToTrial('aside')">{{ ctaLabel }}</v-btn>
              </v-card>
            </aside>
          </div>
        </v-container>
      </section>

      <section class="blog-article-page__final-cta" data-testid="blog5-cta-final">
        <v-container class="blog-article-page__container">
          <div class="blog-article-page__final-cta-panel">
            <h2>El problema no es la fórmula, es la operación cuando crece la liga.</h2>
            <p>Evalúa Futzo gratis y publica tablas confiables desde la primera jornada.</p>
            <v-btn color="primary" rounded="lg" size="large" data-testid="blog5-cta-final-btn" @click.prevent="goToTrial('final')">
              {{ ctaLabel }}
            </v-btn>
          </div>
        </v-container>
      </section>
    </div>
  </LandingMarketingShell>
</template>

<style scoped src="~/assets/scss/pages/blog-organizar-liga-page.scss"></style>
