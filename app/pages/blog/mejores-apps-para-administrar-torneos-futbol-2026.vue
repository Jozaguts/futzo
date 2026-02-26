<script setup lang="ts">
import LandingMarketingShell from '~/components/layout/LandingMarketingShell.vue'
import { useBlogMejoresAppsContent, BLOG_MEJORES_APPS_SLUG } from '~/composables/blog/useBlogMejoresAppsContent'

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
  mustSolvePoints,
  toolTypes,
  comparisonMatrix,
  migrationSignals,
  evaluationBlocks,
  recommendationPoints,
  decisionChecklist,
  internalLinks,
  articleSchema,
} = useBlogMejoresAppsContent()

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
    blog_slug: BLOG_MEJORES_APPS_SLUG,
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
    blog_slug: BLOG_MEJORES_APPS_SLUG,
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
              <p class="blog-article-page__eyebrow">Comparativa Futzo 2026</p>
              <h1>Mejores apps para administrar torneos de fútbol en 2026</h1>
              <p>
                Una comparación práctica para ligas amateur que buscan dejar Excel y operar con más control, menos retrabajo y mejor experiencia para
                equipos y jugadores.
              </p>
              <div class="blog-article-page__hero-actions">
                <v-btn color="primary" rounded="lg" size="large" data-testid="blog2-cta-hero" @click.prevent="goToTrial('hero')">
                  {{ ctaLabel }}
                </v-btn>
                <NuxtLink to="/blog" class="blog-article-page__back-link">Volver al blog</NuxtLink>
              </div>
            </div>

            <div class="blog-article-page__hero-media" data-testid="blog2-hero-image">
              <v-img :src="heroImagePath" alt="Comparativa de apps para torneos de fútbol" cover />
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

              <v-card id="que-debe-resolver" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>Qué debe resolver una app de torneos (sí o sí)</h2>
                <p>Antes de comparar opciones, valida estos 6 puntos críticos.</p>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="item in mustSolvePoints" :key="item" rounded="lg">
                    <template #prepend>
                      <Icon name="lucide:chevron-right" size="16" />
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card id="tipos-herramientas" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>Tipos de herramientas que suele evaluar una liga</h2>
                <div class="blog-article-page__format-grid">
                  <v-card v-for="tool in toolTypes" :key="tool.title" class="blog-article-page__format-card" rounded="lg" variant="flat">
                    <h3>{{ tool.title }}</h3>
                    <p><strong>Pros:</strong> {{ tool.pros }}</p>
                    <p><strong>Contras:</strong> {{ tool.cons }}</p>
                    <p>{{ tool.note }}</p>
                  </v-card>
                </div>
              </v-card>

              <v-card id="comparar-objetivo" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>Cómo comparar apps de forma objetiva</h2>
                <p>Usa una matriz simple con puntuación del 1 al 5 y evita decidir por intuición.</p>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="item in comparisonMatrix" :key="item" rounded="lg">
                    <template #prepend>
                      <Icon name="lucide:chevron-right" size="16" />
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card id="senales-migracion" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>Señales de que ya debes migrar de Excel</h2>
                <p>Si te identificas con 3 o más señales, la migración ya no es opcional.</p>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="item in migrationSignals" :key="item" rounded="lg">
                    <template #prepend>
                      <Icon name="lucide:chevron-right" size="16" />
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card id="evaluar-antes-contratar" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>Qué evaluar antes de contratar</h2>
                <div class="blog-article-page__format-grid">
                  <v-card v-for="block in evaluationBlocks" :key="block.title" class="blog-article-page__format-card" rounded="lg" variant="flat">
                    <h3>{{ block.title }}</h3>
                    <v-list density="compact" class="blog-article-page__list">
                      <v-list-item v-for="item in block.points" :key="item" rounded="lg">
                        <template #prepend>
                          <Icon name="lucide:chevron-right" size="16" />
                        </template>
                        <v-list-item-title>{{ item }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </div>
              </v-card>

              <v-card class="blog-article-page__inline-cta" rounded="lg" variant="flat" data-testid="blog2-cta-mid">
                <h2>Compara con datos, no con promesas</h2>
                <p>Prueba Futzo y valida en tu operación semanal cuánto tiempo recuperas.</p>
                <v-btn color="primary" rounded="lg" size="large" @click.prevent="goToTrial('mid')">{{ ctaLabel }}</v-btn>
              </v-card>

              <v-card id="recomendacion-practica" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>Recomendación práctica (para ligas amateur)</h2>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="item in recommendationPoints" :key="item" rounded="lg">
                    <template #prepend>
                      <Icon name="lucide:chevron-right" size="16" />
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card id="checklist-decision" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>Checklist rápido de decisión</h2>
                <v-list density="comfortable" class="blog-article-page__checklist-list">
                  <v-list-item v-for="item in decisionChecklist" :key="item" rounded="lg">
                    <template #prepend>
                      <Icon name="lucide:check-circle-2" size="18" />
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
              <v-card class="blog-article-page__aside-cta" rounded="lg" variant="flat" data-testid="blog2-aside-cta">
                <h2>¿Quieres validar una app en operación real?</h2>
                <p>Prueba Futzo gratis y mide el impacto con tu propio torneo.</p>
                <v-btn color="primary" rounded="lg" size="large" block @click.prevent="goToTrial('aside')">{{ ctaLabel }}</v-btn>
              </v-card>
            </aside>
          </div>
        </v-container>
      </section>

      <section class="blog-article-page__final-cta" data-testid="blog2-cta-final">
        <v-container class="blog-article-page__container">
          <div class="blog-article-page__final-cta-panel">
            <h2>La mejor app es la que te quita trabajo operativo de verdad.</h2>
            <p>Evalúa Futzo con tu liga durante una semana y decide con datos.</p>
            <v-btn color="primary" rounded="lg" size="large" data-testid="blog2-cta-final-btn" @click.prevent="goToTrial('final')">
              {{ ctaLabel }}
            </v-btn>
          </div>
        </v-container>
      </section>
    </div>
  </LandingMarketingShell>
</template>

<style scoped src="~/assets/scss/pages/blog-organizar-liga-page.scss"></style>
