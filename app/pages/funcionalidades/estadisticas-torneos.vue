<script setup lang="ts">
import LandingMarketingShell from '~/components/layout/LandingMarketingShell.vue'
import { useEstadisticasTorneosContent } from '~/composables/funcionalidades/useEstadisticasTorneosContent'

const {
  pageTitle,
  pageDescription,
  pageUrl,
  keywords,
  teamStats,
  playerStats,
  rankingTop5,
  realtimeNotes,
  tieBreakers,
  adminExports,
  publicShare,
  replaceWhatsAppBenefits,
  faqs,
  relatedLinks,
  estadisticasPageJsonLd,
} = useEstadisticasTorneosContent()

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
      children: JSON.stringify(estadisticasPageJsonLd),
    },
  ],
})
</script>

<template>
  <LandingMarketingShell>
    <div class="feature-stats-page" role="main">
      <section class="feature-stats-page__hero">
        <v-container class="feature-stats-page__container">
          <div class="feature-stats-page__hero-grid">
            <div class="feature-stats-page__hero-copy">
              <p class="feature-stats-page__eyebrow">Funcionalidad de Futzo</p>
              <h1>Estadísticas y tabla de posiciones en tiempo real para tu liga</h1>
              <p>
                Cuando las estadísticas están repartidas en hojas, chats y capturas, siempre hay discusiones. Con Futzo, standings y estadísticas viven en
                un solo lugar para consulta y publicación.
              </p>
              <v-btn color="primary" rounded="lg" size="large" data-testid="estadisticas-cta-hero" @click.prevent="goToTrial">
                {{ ctaLabel }}
              </v-btn>
            </div>

            <div class="feature-stats-page__image-placeholder" data-testid="estadisticas-hero-placeholder">
              <p>Placeholder de imagen Hero: tabla de posiciones y rankings</p>
            </div>
          </div>
        </v-container>
      </section>

      <section class="feature-stats-page__section">
        <v-container class="feature-stats-page__container">
          <header class="feature-stats-page__section-header">
            <h2>Qué puedes medir hoy en Futzo</h2>
          </header>

          <div class="feature-stats-page__card-grid feature-stats-page__card-grid--two">
            <article class="feature-stats-page__card">
              <h3>Estadísticas por equipo</h3>
              <ul class="feature-stats-page__bullet-list feature-stats-page__bullet-list--inside-card">
                <li v-for="item in teamStats" :key="item">{{ item }}</li>
              </ul>
              <p>Además, puedes ver tendencia por periodo (24h, semana, mes, año) y serie histórica del periodo.</p>
            </article>

            <article class="feature-stats-page__card">
              <h3>Estadísticas por jugador</h3>
              <ul class="feature-stats-page__bullet-list feature-stats-page__bullet-list--inside-card">
                <li v-for="item in playerStats" :key="item">{{ item }}</li>
              </ul>
              <p>Nota de transparencia: minutos jugados y porterías en cero aparecen, pero hoy están en 0.</p>
            </article>
          </div>
        </v-container>
      </section>

      <section class="feature-stats-page__section feature-stats-page__section--muted">
        <v-container class="feature-stats-page__container">
          <header class="feature-stats-page__section-header">
            <h2>Rankings que más consulta una liga</h2>
          </header>

          <div class="feature-stats-page__pills">
            <span v-for="item in rankingTop5" :key="item" class="feature-stats-page__pill">Top 5: {{ item }}</span>
          </div>
          <p class="feature-stats-page__paragraph">
            Esto te permite comunicar rendimiento y mantener enganchados a equipos y jugadores durante el torneo.
          </p>
        </v-container>
      </section>

      <section class="feature-stats-page__section">
        <v-container class="feature-stats-page__container">
          <div class="feature-stats-page__card-grid feature-stats-page__card-grid--two">
            <article class="feature-stats-page__card">
              <h2>¿Se actualiza al instante?</h2>
              <ul class="feature-stats-page__bullet-list feature-stats-page__bullet-list--inside-card">
                <li v-for="item in realtimeNotes" :key="item">{{ item }}</li>
              </ul>
            </article>

            <article class="feature-stats-page__card">
              <h2>Criterios de desempate soportados hoy</h2>
              <ol class="feature-stats-page__ordered-list feature-stats-page__ordered-list--inside-card">
                <li v-for="item in tieBreakers" :key="item">{{ item }}</li>
              </ol>
              <p>Aclaración: “sorteo” existe como criterio configurado, pero sin una resolución automática robusta en el flujo actual.</p>
            </article>
          </div>
        </v-container>
      </section>

      <section class="feature-stats-page__section feature-stats-page__section--muted">
        <v-container class="feature-stats-page__container">
          <header class="feature-stats-page__section-header">
            <h2>Exporta y comparte sin fricción</h2>
          </header>

          <div class="feature-stats-page__split-panel">
            <article class="feature-stats-page__card">
              <h3>Exportación (admin)</h3>
              <ul class="feature-stats-page__bullet-list feature-stats-page__bullet-list--inside-card">
                <li v-for="item in adminExports" :key="item">{{ item }}</li>
              </ul>

              <h3 class="feature-stats-page__subheading">Compartir público</h3>
              <ul class="feature-stats-page__bullet-list feature-stats-page__bullet-list--inside-card">
                <li v-for="item in publicShare" :key="item">{{ item }}</li>
              </ul>
            </article>

            <div class="feature-stats-page__image-placeholder" data-testid="estadisticas-public-placeholder">
              <p>Placeholder de imagen: vista pública + QR del torneo</p>
            </div>
          </div>
        </v-container>
      </section>

      <section class="feature-stats-page__section">
        <v-container class="feature-stats-page__container">
          <header class="feature-stats-page__section-header">
            <h2>Por qué esto reemplaza las capturas por WhatsApp</h2>
          </header>

          <div class="feature-stats-page__card">
            <ul class="feature-stats-page__bullet-list">
              <li v-for="item in replaceWhatsAppBenefits" :key="item">{{ item }}</li>
            </ul>
          </div>
        </v-container>
      </section>

      <section class="feature-stats-page__section feature-stats-page__section--muted">
        <v-container class="feature-stats-page__container">
          <header class="feature-stats-page__section-header">
            <h2>Preguntas frecuentes</h2>
          </header>

          <v-expansion-panels variant="accordion" class="feature-stats-page__faq">
            <v-expansion-panel v-for="faq in faqs" :key="faq.question" rounded="lg">
              <v-expansion-panel-title>{{ faq.question }}</v-expansion-panel-title>
              <v-expansion-panel-text>{{ faq.answer }}</v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-container>
      </section>

      <section class="feature-stats-page__section">
        <v-container class="feature-stats-page__container">
          <header class="feature-stats-page__section-header">
            <h2>Explora más funcionalidades</h2>
          </header>

          <div class="feature-stats-page__links">
            <NuxtLink v-for="link in relatedLinks" :key="link.href" class="feature-stats-page__related-link" :to="link.href">
              {{ link.label }}
            </NuxtLink>
          </div>
        </v-container>
      </section>

      <section class="feature-stats-page__final-cta">
        <v-container class="feature-stats-page__container">
          <div class="feature-stats-page__final-cta-panel">
            <h2>Si quieres dejar capturas y hojas viejas, centraliza todo en Futzo.</h2>
            <p>Empieza tu prueba gratis y publica estadísticas claras desde la primera jornada.</p>
            <v-btn color="primary" rounded="lg" size="large" data-testid="estadisticas-cta-final" @click.prevent="goToTrial">
              {{ ctaLabel }}
            </v-btn>
          </div>
        </v-container>
      </section>
    </div>
  </LandingMarketingShell>
</template>

<style scoped src="~/assets/scss/pages/feature-stats-page.scss"></style>
