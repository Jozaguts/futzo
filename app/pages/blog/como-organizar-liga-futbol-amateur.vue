<script setup lang="ts">
import LandingMarketingShell from '~/components/layout/LandingMarketingShell.vue'
import { BLOG_ORGANIZAR_LIGA_SLUG } from '~/composables/blog/useBlogPosts'
import { useBlogOrganizarLigaContent } from '~/composables/blog/useBlogOrganizarLigaContent'

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
  objectiveQuestions,
  tournamentFormats,
  rulesChecklist,
  venueChecklist,
  registrationFlow,
  planBChecklist,
  publicationChecklist,
  weeklyTasks,
  commonMistakes,
  launchChecklist,
  internalLinks,
  articleSchema,
} = useBlogOrganizarLigaContent()

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
    blog_slug: BLOG_ORGANIZAR_LIGA_SLUG,
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

const trackBlogCta = (placement: CtaPlacement) => {
  trackBlogEvent('blog_cta_click', {
    blog_slug: BLOG_ORGANIZAR_LIGA_SLUG,
    placement,
  })
}

const goToTrial = async (placement: CtaPlacement) => {
  trackBlogCta(placement)

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
              <p class="blog-article-page__eyebrow">Guía Futzo 2026</p>
              <h1>Cómo organizar una liga de fútbol amateur paso a paso</h1>
              <p>
                Una ruta clara para administradores de ligas y dueños de complejos deportivos que quieren operar mejor, reducir errores y escalar sin
                caos.
              </p>
              <div class="blog-article-page__hero-actions">
                <v-btn color="primary" rounded="lg" size="large" data-testid="blog-article-cta-hero" @click.prevent="goToTrial('hero')">
                  {{ ctaLabel }}
                </v-btn>
                <NuxtLink to="/blog" class="blog-article-page__back-link">Volver al blog</NuxtLink>
              </div>
            </div>

            <div class="blog-article-page__hero-media" data-testid="blog-article-hero-image">
              <v-img :src="heroImagePath" alt="Planificacion de liga de futbol amateur" cover />
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

              <v-card id="objetivo-liga" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>1) Define el objetivo de tu liga</h2>
                <p>
                  Antes de abrir inscripciones, define el objetivo deportivo y operativo. Si esta base no es clara, el resto del torneo se vuelve reactivo.
                </p>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="question in objectiveQuestions" :key="question" rounded="lg">
                    <template #prepend>
                      <Icon name="lucide:chevron-right" size="16" />
                    </template>
                    <v-list-item-title>{{ question }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card id="formato-torneo" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>2) Elige formato de torneo</h2>
                <p>No elijas formato por moda. Elige el formato que se adapte a tus canchas, horarios y número de equipos.</p>
                <div class="blog-article-page__format-grid">
                  <v-card v-for="format in tournamentFormats" :key="format.title" class="blog-article-page__format-card" rounded="lg" variant="flat">
                    <h3>{{ format.title }}</h3>
                    <p>{{ format.description }}</p>
                  </v-card>
                </div>
              </v-card>

              <v-card id="reglamento-base" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>3) Cierra reglas antes de arrancar</h2>
                <p>Si no dejas reglas claras desde el inicio, los conflictos llegan en la jornada 2.</p>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="rule in rulesChecklist" :key="rule" rounded="lg">
                    <template #prepend>
                      <Icon name="lucide:chevron-right" size="16" />
                    </template>
                    <v-list-item-title>{{ rule }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card id="canchas-horarios" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>4) Planifica canchas y horarios reales</h2>
                <p>La operación se cae cuando el calendario no respeta disponibilidad real.</p>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="item in venueChecklist" :key="item" rounded="lg">
                    <template #prepend>
                      <Icon name="lucide:chevron-right" size="16" />
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card id="inscripciones" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>5) Abre inscripciones con flujo claro</h2>
                <p>Evita recibir datos por chat sin estructura. Usa un flujo separado para cada etapa:</p>
                <v-list density="compact" class="blog-article-page__ordered-list">
                  <v-list-item v-for="(item, index) in registrationFlow" :key="item" rounded="lg">
                    <template #prepend>
                      <span class="blog-article-page__order-pill">{{ index + 1 }}</span>
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card id="calendario-planb" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>6) Genera calendario y prepara plan B</h2>
                <p>
                  Una liga estable no es la que nunca cambia partidos, es la que sabe resolver cambios con reglas claras y tiempos definidos.
                </p>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="item in planBChecklist" :key="item" rounded="lg">
                    <template #prepend>
                      <Icon name="lucide:chevron-right" size="16" />
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card class="blog-article-page__inline-cta" rounded="lg" variant="flat" data-testid="blog-article-cta-mid">
                <h2>Operación ordenada desde la jornada 1</h2>
                <p>Centraliza calendario, registros y resultados en una sola plataforma para reducir retrabajo semanal.</p>
                <v-btn color="primary" rounded="lg" size="large" @click.prevent="goToTrial('mid')">{{ ctaLabel }}</v-btn>
              </v-card>

              <v-card id="resultados-standings" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>7) Publica resultados y standings de forma consistente</h2>
                <p>La liga necesita una sola fuente de verdad para evitar discusiones y duplicidad de versiones.</p>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="item in publicationChecklist" :key="item" rounded="lg">
                    <template #prepend>
                      <Icon name="lucide:chevron-right" size="16" />
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card id="ritmo-semanal" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>8) Crea un ritmo operativo semanal</h2>
                <p>La consistencia vale más que la perfección. Un ritmo claro baja fricción con equipos y staff.</p>
                <v-list density="comfortable" class="blog-article-page__weekly-list">
                  <v-list-item v-for="item in weeklyTasks" :key="item.day" rounded="lg">
                    <v-list-item-title>{{ item.day }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.task }}</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card id="errores-comunes" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>Errores comunes que conviene evitar</h2>
                <v-list density="compact" class="blog-article-page__list">
                  <v-list-item v-for="item in commonMistakes" :key="item" rounded="lg">
                    <template #prepend>
                      <Icon name="lucide:chevron-right" size="16" />
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card id="checklist-lanzamiento" class="blog-article-page__content-panel" rounded="lg" variant="flat">
                <h2>Checklist rápido para lanzar tu liga</h2>
                <v-list density="comfortable" class="blog-article-page__checklist-list">
                  <v-list-item v-for="item in launchChecklist" :key="item" rounded="lg">
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
              <v-card class="blog-article-page__aside-cta" rounded="lg" variant="flat" data-testid="blog-article-aside-cta">
                <h2>¿Listo para dejar Excel y chat?</h2>
                <p>Prueba Futzo gratis y arma tu primer torneo en minutos.</p>
                <v-btn color="primary" rounded="lg" size="large" block @click.prevent="goToTrial('aside')">{{ ctaLabel }}</v-btn>
              </v-card>
            </aside>
          </div>
        </v-container>
      </section>

      <section class="blog-article-page__final-cta" data-testid="blog-article-cta-final">
        <v-container class="blog-article-page__container">
          <div class="blog-article-page__final-cta-panel">
            <h2>Tu liga puede verse profesional desde la primera jornada.</h2>
            <p>Centraliza operación, publica resultados y escala tu torneo con control.</p>
            <v-btn color="primary" rounded="lg" size="large" data-testid="blog-article-cta-final-btn" @click.prevent="goToTrial('final')">
              {{ ctaLabel }}
            </v-btn>
          </div>
        </v-container>
      </section>
    </div>
  </LandingMarketingShell>
</template>

<style scoped src="~/assets/scss/pages/blog-organizar-liga-page.scss"></style>
