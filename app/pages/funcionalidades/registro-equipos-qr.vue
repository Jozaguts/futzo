<script setup lang="ts">
import LandingMarketingShell from '~/components/layout/LandingMarketingShell.vue'
import { useRegistroEquiposQrContent } from '~/composables/funcionalidades/useRegistroEquiposQrContent'

const {
  pageTitle,
  pageDescription,
  pageUrl,
  keywords,
  registrationSteps,
  organizerControls,
  doesIncludeItems,
  doesNotIncludeItems,
  chatProblemsSolved,
  usageCases,
  faqs,
  relatedLinks,
  registroQrPageJsonLd,
} = useRegistroEquiposQrContent()

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

useSchemaOrg([registroQrPageJsonLd])
</script>

<template>
  <LandingMarketingShell>
    <div class="feature-qr-page" role="main">
      <section class="feature-qr-page__hero">
        <v-container class="feature-qr-page__container">
          <div class="feature-qr-page__hero-grid">
            <div class="feature-qr-page__hero-copy">
              <p class="feature-qr-page__eyebrow">Funcionalidad de Futzo</p>
              <h1>Registro de equipos y jugadores por QR, sin caos en WhatsApp</h1>
              <p>
                Cuando una liga crece, pedir datos por chat se vuelve una pesadilla. Con Futzo organizas inscripciones en 2 pasos por QR para que cada
                actor capture solo lo que le corresponde.
              </p>
              <v-btn color="primary" rounded="lg" size="large" data-testid="registro-qr-cta-hero" @click.prevent="goToTrial">
                {{ ctaLabel }}
              </v-btn>
            </div>

            <div class="feature-qr-page__image-placeholder" data-testid="registro-qr-hero-placeholder">
              <v-img src="/images/functionalities/registro-equipos-qr/registro-equipos-qr.webp" alt="registro de equipos y jugadores por QR" />
            </div>
          </div>
        </v-container>
      </section>

      <section class="feature-qr-page__section">
        <v-container class="feature-qr-page__container">
          <header class="feature-qr-page__section-header">
            <h2>Cómo funciona el registro por QR en Futzo</h2>
          </header>

          <div class="feature-qr-page__card-grid feature-qr-page__card-grid--two">
            <article v-for="step in registrationSteps" :key="step.title" class="feature-qr-page__card">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
              <ul class="feature-qr-page__bullet-list feature-qr-page__bullet-list--inside-card">
                <li v-for="field in step.fields" :key="field">{{ field }}</li>
              </ul>
            </article>
          </div>
        </v-container>
      </section>

      <section class="feature-qr-page__section feature-qr-page__section--muted">
        <v-container class="feature-qr-page__container">
          <header class="feature-qr-page__section-header">
            <h2>¿Qué control conserva el organizador?</h2>
          </header>

          <ul class="feature-qr-page__bullet-list">
            <li v-for="control in organizerControls" :key="control">{{ control }}</li>
          </ul>
        </v-container>
      </section>

      <section class="feature-qr-page__section">
        <v-container class="feature-qr-page__container">
          <header class="feature-qr-page__section-header">
            <h2>Lo que sí y lo que no hace hoy</h2>
          </header>

          <div class="feature-qr-page__card-grid feature-qr-page__card-grid--two">
            <article class="feature-qr-page__card">
              <h3>Sí hace</h3>
              <ul class="feature-qr-page__bullet-list feature-qr-page__bullet-list--inside-card">
                <li v-for="item in doesIncludeItems" :key="item">{{ item }}</li>
              </ul>
            </article>

            <article class="feature-qr-page__card">
              <h3>No hace (hoy)</h3>
              <ul class="feature-qr-page__bullet-list feature-qr-page__bullet-list--inside-card">
                <li v-for="item in doesNotIncludeItems" :key="item">{{ item }}</li>
              </ul>
            </article>
          </div>
        </v-container>
      </section>

      <section class="feature-qr-page__section feature-qr-page__section--muted">
        <v-container class="feature-qr-page__container">
          <header class="feature-qr-page__section-header">
            <h2>¿Por qué es mejor que pedir datos por chat?</h2>
          </header>

          <div class="feature-qr-page__card">
            <ul class="feature-qr-page__bullet-list">
              <li v-for="item in chatProblemsSolved" :key="item">{{ item }}</li>
            </ul>
          </div>
        </v-container>
      </section>

      <section class="feature-qr-page__section">
        <v-container class="feature-qr-page__container">
          <div class="feature-qr-page__split-panel">
            <article class="feature-qr-page__card">
              <h2>Casos donde más se nota la diferencia</h2>
              <ul class="feature-qr-page__bullet-list">
                <li v-for="item in usageCases" :key="item">{{ item }}</li>
              </ul>
            </article>

            <div class="feature-qr-page__image-placeholder" data-testid="registro-qr-cases-placeholder">
              <v-img src="/images/functionalities/registro-equipos-qr/registro-equipos-qr-cases.webp" alt="casos de uso del registro por QR"></v-img>
            </div>
          </div>
        </v-container>
      </section>

      <section class="feature-qr-page__section feature-qr-page__section--muted">
        <v-container class="feature-qr-page__container">
          <header class="feature-qr-page__section-header">
            <h2>Preguntas frecuentes</h2>
          </header>

          <v-expansion-panels variant="accordion" class="feature-qr-page__faq">
            <v-expansion-panel v-for="faq in faqs" :key="faq.question" rounded="lg">
              <v-expansion-panel-title>{{ faq.question }}</v-expansion-panel-title>
              <v-expansion-panel-text>{{ faq.answer }}</v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-container>
      </section>

      <section class="feature-qr-page__section">
        <v-container class="feature-qr-page__container">
          <header class="feature-qr-page__section-header">
            <h2>Explora más funcionalidades</h2>
          </header>

          <div class="feature-qr-page__links">
            <NuxtLink v-for="link in relatedLinks" :key="link.href" class="feature-qr-page__related-link" :to="link.href">
              {{ link.label }}
            </NuxtLink>
          </div>
        </v-container>
      </section>

      <section class="feature-qr-page__final-cta">
        <v-container class="feature-qr-page__container">
          <div class="feature-qr-page__final-cta-panel">
            <h2>Si quieres ordenar inscripciones sin perseguir capitanes por WhatsApp, este flujo te ahorra horas operativas.</h2>
            <p>Empieza tu prueba gratis en Futzo.</p>
            <v-btn color="primary" rounded="lg" size="large" data-testid="registro-qr-cta-final" @click.prevent="goToTrial">
              {{ ctaLabel }}
            </v-btn>
          </div>
        </v-container>
      </section>
    </div>
  </LandingMarketingShell>
</template>

<style scoped src="~/assets/scss/pages/feature-qr-page.scss"></style>
