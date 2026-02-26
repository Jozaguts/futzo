<script setup lang="ts">
import LandingMarketingShell from '~/components/layout/LandingMarketingShell.vue'
import { useGestionCanchasHorariosContent } from '~/composables/funcionalidades/useGestionCanchasHorariosContent'

const {
  pageTitle,
  pageDescription,
  pageUrl,
  keywords,
  canchaSettings,
  conflictPrevention,
  reprogrammingBenefits,
  availabilityNotes,
  blockingNotes,
  excelVsSystemBenefits,
  faqs,
  relatedLinks,
  gestionCanchasPageJsonLd,
} = useGestionCanchasHorariosContent()

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
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(gestionCanchasPageJsonLd),
    },
  ],
})
</script>

<template>
  <LandingMarketingShell>
    <div class="feature-fields-page" role="main">
      <section class="feature-fields-page__hero">
        <v-container class="feature-fields-page__container">
          <div class="feature-fields-page__hero-grid">
            <div class="feature-fields-page__hero-copy">
              <p class="feature-fields-page__eyebrow">Funcionalidad de Futzo</p>
              <h1>Gestiona canchas y horarios sin choques en tu torneo</h1>
              <p>
                Cuando operas varias canchas, el reto no es solo armar partidos. También es evitar empalmes y resolver cambios sin romper todo. Con Futzo
                configuras disponibilidad real por cancha y mueves partidos de forma controlada.
              </p>
              <v-btn color="primary" rounded="lg" size="large" data-testid="canchas-cta-hero" @click.prevent="goToTrial">
                {{ ctaLabel }}
              </v-btn>
            </div>

            <div class="feature-fields-page__image-placeholder" data-testid="canchas-hero-placeholder">
              <p>Placeholder de imagen Hero: configuración de canchas y horarios</p>
            </div>
          </div>
        </v-container>
      </section>

      <section class="feature-fields-page__section">
        <v-container class="feature-fields-page__container">
          <header class="feature-fields-page__section-header">
            <h2>Qué puedes configurar por cancha hoy</h2>
          </header>

          <div class="feature-fields-page__card">
            <ul class="feature-fields-page__bullet-list">
              <li v-for="item in canchaSettings" :key="item">{{ item }}</li>
            </ul>
            <p class="feature-fields-page__paragraph">También puedes definir ventanas distintas por día.</p>
            <p class="feature-fields-page__paragraph">
              Nota de transparencia: hoy no existen como campos nativos el aforo/capacidad ni costo por cancha.
            </p>
          </div>
        </v-container>
      </section>

      <section class="feature-fields-page__section feature-fields-page__section--muted">
        <v-container class="feature-fields-page__container">
          <header class="feature-fields-page__section-header">
            <h2>Cómo evita conflictos de programación</h2>
          </header>

          <div class="feature-fields-page__card-grid feature-fields-page__card-grid--two">
            <article class="feature-fields-page__card">
              <p>Futzo valida choques de cancha y horario al programar y reprogramar.</p>
              <ol class="feature-fields-page__ordered-list feature-fields-page__ordered-list--inside-card">
                <li v-for="item in conflictPrevention" :key="item">{{ item }}</li>
              </ol>
            </article>

            <article class="feature-fields-page__card">
              <h3>Reprograma sin rehacer el torneo</h3>
              <ul class="feature-fields-page__bullet-list feature-fields-page__bullet-list--inside-card">
                <li v-for="item in reprogrammingBenefits" :key="item">{{ item }}</li>
              </ul>
            </article>
          </div>
        </v-container>
      </section>

      <section class="feature-fields-page__section">
        <v-container class="feature-fields-page__container">
          <div class="feature-fields-page__split-panel">
            <article class="feature-fields-page__card">
              <h2>Disponibilidad operativa por cancha</h2>
              <ul class="feature-fields-page__bullet-list feature-fields-page__bullet-list--inside-card">
                <li v-for="item in availabilityNotes" :key="item">{{ item }}</li>
              </ul>

              <h3 class="feature-fields-page__subheading">Qué tipo de bloqueos puedes aplicar hoy</h3>
              <ul class="feature-fields-page__bullet-list feature-fields-page__bullet-list--inside-card">
                <li v-for="item in blockingNotes" :key="item">{{ item }}</li>
              </ul>
            </article>

            <div class="feature-fields-page__image-placeholder" data-testid="canchas-availability-placeholder">
              <p>Placeholder de imagen: disponibilidad por cancha y reprogramación</p>
            </div>
          </div>
        </v-container>
      </section>

      <section class="feature-fields-page__section feature-fields-page__section--muted">
        <v-container class="feature-fields-page__container">
          <header class="feature-fields-page__section-header">
            <h2>¿Por qué esto es mejor que usar Excel y chat?</h2>
          </header>

          <div class="feature-fields-page__card">
            <ul class="feature-fields-page__bullet-list">
              <li v-for="item in excelVsSystemBenefits" :key="item">{{ item }}</li>
            </ul>
          </div>
        </v-container>
      </section>

      <section class="feature-fields-page__section">
        <v-container class="feature-fields-page__container">
          <header class="feature-fields-page__section-header">
            <h2>Preguntas frecuentes</h2>
          </header>

          <v-expansion-panels variant="accordion" class="feature-fields-page__faq">
            <v-expansion-panel v-for="faq in faqs" :key="faq.question" rounded="lg">
              <v-expansion-panel-title>{{ faq.question }}</v-expansion-panel-title>
              <v-expansion-panel-text>{{ faq.answer }}</v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-container>
      </section>

      <section class="feature-fields-page__section feature-fields-page__section--muted">
        <v-container class="feature-fields-page__container">
          <header class="feature-fields-page__section-header">
            <h2>Explora más funcionalidades</h2>
          </header>

          <div class="feature-fields-page__links">
            <NuxtLink v-for="link in relatedLinks" :key="link.href" class="feature-fields-page__related-link" :to="link.href">
              {{ link.label }}
            </NuxtLink>
          </div>
        </v-container>
      </section>

      <section class="feature-fields-page__final-cta">
        <v-container class="feature-fields-page__container">
          <div class="feature-fields-page__final-cta-panel">
            <h2>Si quieres operar canchas sin empalmes y sin apagar incendios cada jornada, centraliza tu programación en Futzo.</h2>
            <p>Empieza tu prueba gratis.</p>
            <v-btn color="primary" rounded="lg" size="large" data-testid="canchas-cta-final" @click.prevent="goToTrial">
              {{ ctaLabel }}
            </v-btn>
          </div>
        </v-container>
      </section>
    </div>
  </LandingMarketingShell>
</template>

<style scoped src="~/assets/scss/pages/feature-fields-page.scss"></style>
