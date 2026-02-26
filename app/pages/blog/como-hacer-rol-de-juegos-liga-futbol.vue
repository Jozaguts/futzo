<script setup lang="ts">
import LandingMarketingShell from '~/components/layout/LandingMarketingShell.vue'
import { BLOG_ROL_JUEGOS_SLUG, useBlogRolJuegosContent } from '~/composables/blog/useBlogRolJuegosContent'

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
  planningFrame,
  availabilityChecklist,
  matchdayStructureChecklist,
  validationChecklist,
  officialVersionChannels,
  reschedulePolicyChecklist,
  weeklyTasks,
  templateFields,
  commonMistakes,
  migrationSignals,
  softwareBenefits,
  internalLinks,
  articleSchema,
} = useBlogRolJuegosContent()

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
    blog_slug: BLOG_ROL_JUEGOS_SLUG,
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
    blog_slug: BLOG_ROL_JUEGOS_SLUG,
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
              <p class="blog-article-page__eyebrow">Operación de jornadas 2026</p>
              <h1>Cómo hacer un rol de juegos para liga de fútbol sin volverte loco</h1>
              <p>Un método operativo para programar jornadas sin choques, publicar versiones claras y reducir retrabajo semanal.</p>
              <div class="blog-article-page__hero-actions">
                <v-btn color="primary" rounded="lg" size="large" data-testid="blog3-cta-hero" @click.prevent="goToTrial('hero')">
                  {{ ctaLabel }}
                </v-btn>
                <NuxtLink to="/blog" class="blog-article-page__back-link">Volver al blog</NuxtLink>
              </div>
            </div>

            <div class="blog-article-page__hero-media" data-testid="blog3-hero-image">
              <v-img :src="heroImagePath" alt="Rol de juegos para liga de futbol" cover />
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

              <v-card id="marco-programacion" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>1) Define el marco antes de programar</h2>
                <p>Sin base operativa, cualquier calendario se rompe en las primeras jornadas.</p>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="item in planningFrame" :key="item" rounded="lg">
                    <template #prepend>
                      <Icon name="lucide:chevron-right" size="16" />
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card id="disponibilidad-canchas" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>2) Levanta disponibilidad real de canchas</h2>
                <p>No programes sobre supuestos: cada restricción real evita conflictos posteriores.</p>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="item in availabilityChecklist" :key="item" rounded="lg">
                    <template #prepend>
                      <Icon name="lucide:chevron-right" size="16" />
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card id="estructura-jornada" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>3) Elige una estructura de jornada clara</h2>
                <p>Aquí defines capacidad por franja y reglas para mantener estabilidad semanal.</p>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="item in matchdayStructureChecklist" :key="item" rounded="lg">
                    <template #prepend>
                      <Icon name="lucide:chevron-right" size="16" />
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card id="validar-conflictos" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>4) Arma el primer rol y valida conflictos</h2>
                <p>Validar antes de publicar evita retrabajo y pérdida de credibilidad con los equipos.</p>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="item in validationChecklist" :key="item" rounded="lg">
                    <template #prepend>
                      <Icon name="lucide:chevron-right" size="16" />
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card id="version-oficial" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>5) Publica una sola versión oficial</h2>
                <p>Define una fuente única. Si no está ahí, no existe.</p>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="item in officialVersionChannels" :key="item" rounded="lg">
                    <template #prepend>
                      <Icon name="lucide:chevron-right" size="16" />
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card class="blog-article-page__inline-cta" rounded="lg" variant="flat" data-testid="blog3-cta-mid">
                <h2>Programa jornadas con menos fricción operativa</h2>
                <p>Prueba Futzo y centraliza calendario, canchas y publicación de cambios en un solo flujo.</p>
                <v-btn color="primary" rounded="lg" size="large" @click.prevent="goToTrial('mid')">{{ ctaLabel }}</v-btn>
              </v-card>

              <v-card id="politica-reprogramacion" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>6) Crea política de reprogramación</h2>
                <p>Reprogramar no es excepción. Es una parte crítica de la operación.</p>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="item in reschedulePolicyChecklist" :key="item" rounded="lg">
                    <template #prepend>
                      <Icon name="lucide:chevron-right" size="16" />
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card id="rutina-semanal" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>7) Establece rutina semanal de operación</h2>
                <p>La rutina fija baja caos y mejora la confianza de equipos y staff.</p>
                <v-list density="comfortable" class="blog-article-page__weekly-list">
                  <v-list-item v-for="item in weeklyTasks" :key="item.day" rounded="lg">
                    <v-list-item-title>{{ item.day }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.task }}</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card id="plantilla-rapida" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>Plantilla rápida para tu rol de juegos</h2>
                <p>Incluye estos campos mínimos para tener una base profesional.</p>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="item in templateFields" :key="item" rounded="lg">
                    <template #prepend>
                      <Icon name="lucide:chevron-right" size="16" />
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card id="errores-comunes" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>Errores comunes que rompen un rol</h2>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="item in commonMistakes" :key="item" rounded="lg">
                    <template #prepend>
                      <Icon name="lucide:chevron-right" size="16" />
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card id="cuando-migrar" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>Cuándo conviene pasar a software y salir de Excel</h2>
                <p>Si se cumplen estos puntos, el costo operativo manual ya es demasiado alto:</p>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="item in migrationSignals" :key="item" rounded="lg">
                    <template #prepend>
                      <Icon name="lucide:chevron-right" size="16" />
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
                <p>Con software dedicado puedes:</p>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="item in softwareBenefits" :key="item" rounded="lg">
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
              <v-card class="blog-article-page__aside-cta" rounded="lg" variant="flat" data-testid="blog3-aside-cta">
                <h2>¿Listo para publicar un rol sin caos?</h2>
                <p>Prueba Futzo gratis y opera tus jornadas con versión oficial y trazabilidad.</p>
                <v-btn color="primary" rounded="lg" size="large" block @click.prevent="goToTrial('aside')">{{ ctaLabel }}</v-btn>
              </v-card>
            </aside>
          </div>
        </v-container>
      </section>

      <section class="blog-article-page__final-cta" data-testid="blog3-cta-final">
        <v-container class="blog-article-page__container">
          <div class="blog-article-page__final-cta-panel">
            <h2>Un rol estable no se improvisa: se diseña como sistema.</h2>
            <p>Evalúa Futzo con tu próxima jornada y mide cuánto retrabajo eliminas.</p>
            <v-btn color="primary" rounded="lg" size="large" data-testid="blog3-cta-final-btn" @click.prevent="goToTrial('final')">
              {{ ctaLabel }}
            </v-btn>
          </div>
        </v-container>
      </section>
    </div>
  </LandingMarketingShell>
</template>

<style scoped src="~/assets/scss/pages/blog-organizar-liga-page.scss"></style>
