<script setup lang="ts">
import LandingMarketingShell from '~/components/layout/LandingMarketingShell.vue'
import { useVistaPublicaTorneoContent } from '~/composables/funcionalidades/useVistaPublicaTorneoContent'

const {
  pageTitle,
  pageDescription,
  pageUrl,
  keywords,
  publicViewSections,
  accessModel,
  privacyGuards,
  realtimeNotes,
  shareChannels,
  transparencyNotes,
  operationalBenefits,
  faqs,
  relatedLinks,
  vistaPublicaPageJsonLd,
} = useVistaPublicaTorneoContent()

definePageMeta({
  layout: 'legacy',
  sanctum: { excluded: true },
})

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  keywords: keywords.join(', '),
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: 'website',
  ogUrl: pageUrl,
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
})

const { isAuthenticated } = useSanctumAuth()
const router = useRouter()

const ctaLabel = computed(() => (isAuthenticated?.value ? 'Ir al Dashboard' : 'Prueba Futzo gratis'))

const goToTrial = async () => {
  if (isAuthenticated?.value) {
    await router.push('/dashboard')
    return
  }

  await router.push('/login')
}

useHead({
  link: [{ rel: 'canonical', href: pageUrl }],
})

useSchemaOrg([vistaPublicaPageJsonLd])
</script>

<template>
  <LandingMarketingShell>
    <div class="feature-public-view-page" role="main">
      <section class="feature-public-view-page__hero">
        <v-container class="feature-public-view-page__container">
          <div class="feature-public-view-page__hero-grid">
            <div class="feature-public-view-page__hero-copy">
              <p class="feature-public-view-page__eyebrow">Funcionalidad de Futzo</p>
              <h1>Comparte tu torneo en vivo con una vista pública por link o QR</h1>
              <p>
                Tus equipos siempre preguntan lo mismo: cómo quedó, cuándo juegan y cómo va la tabla. Con Futzo tienes una vista pública para que
                cualquiera consulte el estado del torneo sin pedir capturas por chat.
              </p>
              <v-btn color="primary" rounded="lg" size="large" data-testid="vista-publica-cta-hero" @click.prevent="goToTrial">
                {{ ctaLabel }}
              </v-btn>
            </div>

            <div class="feature-public-view-page__image-placeholder" data-testid="vista-publica-hero-placeholder">
              <v-img src="/images/functionalities/public-view/vista-publica-hero.webp" alt="Vista previa de la vista pública de un torneo en Futzo" />
            </div>
          </div>
        </v-container>
      </section>

      <section class="feature-public-view-page__section">
        <v-container class="feature-public-view-page__container">
          <header class="feature-public-view-page__section-header">
            <h2>Qué ve un usuario en la vista pública</h2>
          </header>

          <div class="feature-public-view-page__card">
            <ul class="feature-public-view-page__bullet-list">
              <li v-for="item in publicViewSections" :key="item">{{ item }}</li>
            </ul>
          </div>
        </v-container>
      </section>

      <section class="feature-public-view-page__section feature-public-view-page__section--muted">
        <v-container class="feature-public-view-page__container">
          <div class="feature-public-view-page__card-grid feature-public-view-page__card-grid--two">
            <article class="feature-public-view-page__card">
              <h2>Sin login para consultar</h2>
              <ul class="feature-public-view-page__bullet-list feature-public-view-page__bullet-list--inside-card">
                <li v-for="item in accessModel" :key="item">{{ item }}</li>
              </ul>
              <p>Así separas operación interna de comunicación pública.</p>
            </article>

            <article class="feature-public-view-page__card">
              <h2>Qué se protege por privacidad</h2>
              <ul class="feature-public-view-page__bullet-list feature-public-view-page__bullet-list--inside-card">
                <li v-for="item in privacyGuards" :key="item">{{ item }}</li>
              </ul>
            </article>
          </div>
        </v-container>
      </section>

      <section class="feature-public-view-page__section">
        <v-container class="feature-public-view-page__container">
          <div class="feature-public-view-page__split-panel">
            <article class="feature-public-view-page__card">
              <h2>Actualización casi en tiempo real</h2>
              <ul class="feature-public-view-page__bullet-list feature-public-view-page__bullet-list--inside-card">
                <li v-for="item in realtimeNotes" :key="item">{{ item }}</li>
              </ul>

              <h3 class="feature-public-view-page__subheading">Comparte por QR o URL directa</h3>
              <ol class="feature-public-view-page__ordered-list feature-public-view-page__ordered-list--inside-card">
                <li v-for="item in shareChannels" :key="item">{{ item }}</li>
              </ol>
            </article>

            <div class="feature-public-view-page__image-placeholder" data-testid="vista-publica-share-placeholder">
              <v-img src="/images/functionalities/public-view/vista-publica-share.webp" alt="Ejemplo de compartir la vista pública de un torneo en Futzo por QR y URL" />
            </div>
          </div>
        </v-container>
      </section>

      <section class="feature-public-view-page__section feature-public-view-page__section--muted">
        <v-container class="feature-public-view-page__container">
          <header class="feature-public-view-page__section-header">
            <h2>Estructura pública actual</h2>
          </header>

          <div class="feature-public-view-page__card">
            <ul class="feature-public-view-page__bullet-list">
              <li v-for="item in transparencyNotes" :key="item">{{ item }}</li>
            </ul>
          </div>
        </v-container>
      </section>

      <section class="feature-public-view-page__section">
        <v-container class="feature-public-view-page__container">
          <header class="feature-public-view-page__section-header">
            <h2>¿Por qué reduce carga operativa?</h2>
          </header>

          <div class="feature-public-view-page__card">
            <ul class="feature-public-view-page__bullet-list">
              <li v-for="item in operationalBenefits" :key="item">{{ item }}</li>
            </ul>
          </div>
        </v-container>
      </section>

      <section class="feature-public-view-page__section feature-public-view-page__section--muted">
        <v-container class="feature-public-view-page__container">
          <header class="feature-public-view-page__section-header">
            <h2>Preguntas frecuentes</h2>
          </header>

          <v-expansion-panels variant="accordion" class="feature-public-view-page__faq">
            <v-expansion-panel v-for="faq in faqs" :key="faq.question" rounded="lg">
              <v-expansion-panel-title>{{ faq.question }}</v-expansion-panel-title>
              <v-expansion-panel-text>{{ faq.answer }}</v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-container>
      </section>

      <section class="feature-public-view-page__section">
        <v-container class="feature-public-view-page__container">
          <header class="feature-public-view-page__section-header">
            <h2>Explora más funcionalidades</h2>
          </header>

          <div class="feature-public-view-page__links">
            <NuxtLink v-for="link in relatedLinks" :key="link.href" class="feature-public-view-page__related-link" :to="link.href">
              {{ link.label }}
            </NuxtLink>
          </div>
        </v-container>
      </section>

      <section class="feature-public-view-page__final-cta">
        <v-container class="feature-public-view-page__container">
          <div class="feature-public-view-page__final-cta-panel">
            <h2>Si quieres que tu torneo se vea profesional sin responder todo por chat, publícalo en Futzo.</h2>
            <p>Empieza tu prueba gratis y comparte tu torneo por QR.</p>
            <v-btn color="primary" rounded="lg" size="large" data-testid="vista-publica-cta-final" @click.prevent="goToTrial">
              {{ ctaLabel }}
            </v-btn>
          </div>
        </v-container>
      </section>
    </div>
  </LandingMarketingShell>
</template>

<style scoped src="~/assets/scss/pages/feature-public-view-page.scss"></style>
