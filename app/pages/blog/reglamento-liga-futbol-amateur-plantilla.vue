<script setup lang="ts">
import LandingMarketingShell from '~/components/layout/LandingMarketingShell.vue'
import { BLOG_REGLAMENTO_PLANTILLA_SLUG, useBlogReglamentoContent } from '~/composables/blog/useBlogReglamentoContent'

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
  minimumSections,
  templateBlocks,
  practicalRecommendations,
  commonMistakes,
  operationalFlow,
  internalLinks,
  articleSchema,
} = useBlogReglamentoContent()

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
    blog_slug: BLOG_REGLAMENTO_PLANTILLA_SLUG,
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
    blog_slug: BLOG_REGLAMENTO_PLANTILLA_SLUG,
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
              <p class="blog-article-page__eyebrow">Plantilla operativa 2026</p>
              <h1>Reglamento para liga de fútbol amateur: plantilla práctica y editable</h1>
              <p>Una estructura clara para definir reglas sin ambigüedad y evitar conflictos recurrentes durante el torneo.</p>
              <div class="blog-article-page__hero-actions">
                <v-btn color="primary" rounded="lg" size="large" data-testid="blog4-cta-hero" @click.prevent="goToTrial('hero')">
                  {{ ctaLabel }}
                </v-btn>
                <NuxtLink to="/blog" class="blog-article-page__back-link">Volver al blog</NuxtLink>
              </div>
            </div>

            <div class="blog-article-page__hero-media" data-testid="blog4-hero-image">
              <v-img :src="heroImagePath" alt="Plantilla de reglamento para liga de futbol" cover />
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

              <v-card id="que-debe-incluir" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>Qué debe incluir un reglamento de liga amateur</h2>
                <p>Si falta uno de estos bloques, tarde o temprano aparece una discusión operativa.</p>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="item in minimumSections" :key="item" rounded="lg">
                    <template #prepend>
                      <Icon name="lucide:chevron-right" size="16" />
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card id="plantilla-base" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>Plantilla base (copiar y adaptar)</h2>
                <p>Usa esta estructura como versión inicial y ajústala a la operación real de tu liga.</p>
                <div class="blog-article-page__format-grid">
                  <v-card v-for="block in templateBlocks" :key="block.title" class="blog-article-page__format-card" rounded="lg" variant="flat">
                    <h3>{{ block.title }}</h3>
                    <v-list density="compact" class="blog-article-page__list">
                      <v-list-item v-for="item in block.items" :key="item" rounded="lg">
                        <template #prepend>
                          <Icon name="lucide:chevron-right" size="16" />
                        </template>
                        <v-list-item-title>{{ item }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </div>
              </v-card>

              <v-card class="blog-article-page__inline-cta" rounded="lg" variant="flat" data-testid="blog4-cta-mid">
                <h2>Convierte reglas en operación real</h2>
                <p>Prueba Futzo y conecta reglamento, registros, calendario y standings en un solo flujo.</p>
                <v-btn color="primary" rounded="lg" size="large" @click.prevent="goToTrial('mid')">{{ ctaLabel }}</v-btn>
              </v-card>

              <v-card id="recomendaciones-practicas" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>Recomendaciones para que sí funcione en la vida real</h2>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="item in practicalRecommendations" :key="item" rounded="lg">
                    <template #prepend>
                      <Icon name="lucide:chevron-right" size="16" />
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card id="errores-comunes" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>Errores comunes al redactar reglamentos</h2>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="item in commonMistakes" :key="item" rounded="lg">
                    <template #prepend>
                      <Icon name="lucide:chevron-right" size="16" />
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card id="operacion-sin-friccion" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>Cómo operarlo sin fricción</h2>
                <p>El reglamento debe estar conectado con estos frentes operativos:</p>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="item in operationalFlow" :key="item" rounded="lg">
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
              <v-card class="blog-article-page__aside-cta" rounded="lg" variant="flat" data-testid="blog4-aside-cta">
                <h2>¿Necesitas reglas claras y aplicables?</h2>
                <p>Prueba Futzo gratis y estandariza tu operación con menos discusiones evitables.</p>
                <v-btn color="primary" rounded="lg" size="large" block @click.prevent="goToTrial('aside')">{{ ctaLabel }}</v-btn>
              </v-card>
            </aside>
          </div>
        </v-container>
      </section>

      <section class="blog-article-page__final-cta" data-testid="blog4-cta-final">
        <v-container class="blog-article-page__container">
          <div class="blog-article-page__final-cta-panel">
            <h2>Un reglamento útil no es un PDF decorativo: es una guía operativa.</h2>
            <p>Evalúa Futzo gratis y convierte tu plantilla en reglas que sí se cumplen.</p>
            <v-btn color="primary" rounded="lg" size="large" data-testid="blog4-cta-final-btn" @click.prevent="goToTrial('final')">
              {{ ctaLabel }}
            </v-btn>
          </div>
        </v-container>
      </section>
    </div>
  </LandingMarketingShell>
</template>

<style scoped src="~/assets/scss/pages/blog-organizar-liga-page.scss"></style>
