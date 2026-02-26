<script setup lang="ts">
import LandingMarketingShell from '~/components/layout/LandingMarketingShell.vue'
import { useCalendarioAutomaticoContent } from '~/composables/funcionalidades/useCalendarioAutomaticoContent'

const {
  pageTitle,
  pageDescription,
  pageUrl,
  keywords,
  mainBenefits,
  supportedFormats,
  workflowBlocks,
  diferentialBlocks,
  usageCases,
  faqs,
  relatedLinks,
  calendarPageJsonLd,
} = useCalendarioAutomaticoContent()

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
      children: JSON.stringify(calendarPageJsonLd),
    },
  ],
})
</script>

<template>
  <LandingMarketingShell>
    <div class="feature-calendar-page" role="main">
      <section class="feature-calendar-page__hero">
        <v-container class="feature-calendar-page__container">
          <div class="feature-calendar-page__hero-grid">
            <div class="feature-calendar-page__hero-copy">
              <p class="feature-calendar-page__eyebrow">Funcionalidad de Futzo</p>
              <h1>Calendario automático para liga de fútbol sin Excel</h1>
              <p>
                Armar jornadas a mano funciona hasta que cambia una cancha o un horario. Con Futzo puedes generar el calendario automáticamente, validando
                disponibilidad y evitando choques básicos desde el inicio.
              </p>
              <v-btn color="primary" rounded="lg" size="large" data-testid="calendario-cta-hero" @click.prevent="goToTrial">
                {{ ctaLabel }}
              </v-btn>
            </div>

            <div class="feature-calendar-page__image-placeholder" data-testid="calendario-hero-placeholder">
             <v-img src="/images/functionalities/calendario-automatico/calendario-de-partidos.webp" alt="generacion de calenadario"></v-img>
            </div>
          </div>
        </v-container>
      </section>

      <section class="feature-calendar-page__section">
        <v-container class="feature-calendar-page__container">
          <header class="feature-calendar-page__section-header">
            <h2>¿Qué resuelve el calendario automático de Futzo?</h2>
          </header>

          <ul class="feature-calendar-page__bullet-list">
            <li v-for="item in mainBenefits" :key="item">{{ item }}</li>
          </ul>
        </v-container>
      </section>

      <section class="feature-calendar-page__section feature-calendar-page__section--muted">
        <v-container class="feature-calendar-page__container">
          <header class="feature-calendar-page__section-header">
            <h2>Formatos que sí puedes operar hoy</h2>
          </header>

          <div class="feature-calendar-page__card-grid">
            <article v-for="format in supportedFormats" :key="format.title" class="feature-calendar-page__card">
              <h3>{{ format.title }}</h3>
              <p>{{ format.description }}</p>
              <ul v-if="format.points?.length" class="feature-calendar-page__inline-list">
                <li v-for="point in format.points" :key="point">{{ point }}</li>
              </ul>
            </article>
          </div>

          <p class="feature-calendar-page__note">Nota de transparencia: el formato suizo no está habilitado actualmente.</p>
        </v-container>
      </section>

      <section class="feature-calendar-page__section">
        <v-container class="feature-calendar-page__container">
          <header class="feature-calendar-page__section-header">
            <h2>Cómo funciona en la práctica</h2>
          </header>

          <div class="feature-calendar-page__card-grid feature-calendar-page__card-grid--two">
            <article v-for="block in workflowBlocks" :key="block.title" class="feature-calendar-page__card">
              <h3>{{ block.title }}</h3>
              <p>{{ block.description }}</p>
              <ul v-if="block.points?.length" class="feature-calendar-page__bullet-list feature-calendar-page__bullet-list--inside-card">
                <li v-for="point in block.points" :key="point">{{ point }}</li>
              </ul>
            </article>
          </div>
        </v-container>
      </section>

      <section class="feature-calendar-page__section feature-calendar-page__section--muted">
        <v-container class="feature-calendar-page__container">
          <header class="feature-calendar-page__section-header">
            <h2>¿Qué lo hace diferente a Excel?</h2>
          </header>

          <div class="feature-calendar-page__card-grid">
            <article v-for="item in diferentialBlocks" :key="item.title" class="feature-calendar-page__card">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </article>
          </div>
        </v-container>
      </section>

      <section class="feature-calendar-page__section">
        <v-container class="feature-calendar-page__container">
          <div class="feature-calendar-page__split-panel">
            <article class="feature-calendar-page__card">
              <h2>Casos donde más se nota la diferencia</h2>
              <ul class="feature-calendar-page__bullet-list">
                <li v-for="item in usageCases" :key="item">{{ item }}</li>
              </ul>
            </article>

            <div class="feature-calendar-page__image-placeholder" data-testid="calendario-cases-placeholder">
             <v-img src="/images/functionalities/calendario-automatico/conflicto-cancha.webp" alt="resolucion de conflictos en calendario"></v-img>
            </div>
          </div>
        </v-container>
      </section>

      <section class="feature-calendar-page__section feature-calendar-page__section--muted">
        <v-container class="feature-calendar-page__container">
          <header class="feature-calendar-page__section-header">
            <h2>Preguntas frecuentes</h2>
          </header>

          <v-expansion-panels variant="accordion" class="feature-calendar-page__faq">
            <v-expansion-panel v-for="faq in faqs" :key="faq.question" rounded="lg">
              <v-expansion-panel-title>{{ faq.question }}</v-expansion-panel-title>
              <v-expansion-panel-text>{{ faq.answer }}</v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-container>
      </section>

      <section class="feature-calendar-page__section">
        <v-container class="feature-calendar-page__container">
          <header class="feature-calendar-page__section-header">
            <h2>Explora más funcionalidades</h2>
          </header>

          <div class="feature-calendar-page__links">
            <NuxtLink class="feature-calendar-page__hub-link" to="/funcionalidades">Ver todas las funcionalidades</NuxtLink>
            <NuxtLink v-for="link in relatedLinks" :key="link.href" class="feature-calendar-page__related-link" :to="link.href">
              {{ link.label }}
            </NuxtLink>
          </div>
        </v-container>
      </section>

      <section class="feature-calendar-page__final-cta">
        <v-container class="feature-calendar-page__container">
          <div class="feature-calendar-page__final-cta-panel">
            <h2>Tu calendario no tiene por qué depender de una hoja frágil.</h2>
            <p>Prueba Futzo gratis y arma tu próxima jornada en minutos.</p>
            <v-btn color="primary" rounded="lg" size="large" data-testid="calendario-cta-final" @click.prevent="goToTrial">
              {{ ctaLabel }}
            </v-btn>
          </div>
        </v-container>
      </section>
    </div>
  </LandingMarketingShell>
</template>

<style scoped src="~/assets/scss/pages/feature-calendar-page.scss"></style>
