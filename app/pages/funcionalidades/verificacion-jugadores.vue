<script setup lang="ts">
import LandingMarketingShell from '~/components/layout/LandingMarketingShell.vue'
import { useVerificacionJugadoresContent } from '~/composables/funcionalidades/useVerificacionJugadoresContent'

const {
  pageTitle,
  pageDescription,
  pageUrl,
  keywords,
  controlScopes,
  blockingRules,
  transferWindowNotes,
  rejectionEvidence,
  chatVsSystemBenefits,
  faqs,
  relatedLinks,
  verificacionPageJsonLd,
} = useVerificacionJugadoresContent()

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
      children: JSON.stringify(verificacionPageJsonLd),
    },
  ],
})
</script>

<template>
  <LandingMarketingShell>
    <div class="feature-verification-page" role="main">
      <section class="feature-verification-page__hero">
        <v-container class="feature-verification-page__container">
          <div class="feature-verification-page__hero-grid">
            <div class="feature-verification-page__hero-copy">
              <p class="feature-verification-page__eyebrow">Funcionalidad de Futzo</p>
              <h1>Verificación de jugadores y transferencias sin jugadores no elegibles</h1>
              <p>
                Cuando no hay control de jugadores, el torneo se llena de dudas y reclamos. Con Futzo operas validación de identidad, bloqueos de
                transferencia y reglas de torneo desde un solo flujo.
              </p>
              <v-btn color="primary" rounded="lg" size="large" data-testid="verificacion-cta-hero" @click.prevent="goToTrial">
                {{ ctaLabel }}
              </v-btn>
            </div>

            <div class="feature-verification-page__image-placeholder" data-testid="verificacion-hero-placeholder">
              <v-img src="/images/functionalities/verify-players/admin-verification-player.webp" alt="Panel de verificación y transferencias" contain />
            </div>
          </div>
        </v-container>
      </section>

      <section class="feature-verification-page__section">
        <v-container class="feature-verification-page__container">
          <header class="feature-verification-page__section-header">
            <h2>¿Qué controla esta funcionalidad?</h2>
          </header>

          <ul class="feature-verification-page__bullet-list">
            <li v-for="item in controlScopes" :key="item">{{ item }}</li>
          </ul>
        </v-container>
      </section>

      <section class="feature-verification-page__section feature-verification-page__section--muted">
        <v-container class="feature-verification-page__container">
          <header class="feature-verification-page__section-header">
            <h2>Reglas que hoy pueden bloquear un movimiento</h2>
          </header>

          <ol class="feature-verification-page__ordered-list">
            <li v-for="rule in blockingRules" :key="rule">{{ rule }}</li>
          </ol>

          <p class="feature-verification-page__note">
            Nota de transparencia: no se aplica una regla absoluta de “si ya jugó con otro equipo en este torneo, nunca puede cambiar”.
          </p>
        </v-container>
      </section>

      <section class="feature-verification-page__section">
        <v-container class="feature-verification-page__container">
          <div class="feature-verification-page__card-grid feature-verification-page__card-grid--two">
            <article class="feature-verification-page__card">
              <h2>Ventana de transferencias configurable</h2>
              <ul class="feature-verification-page__bullet-list feature-verification-page__bullet-list--inside-card">
                <li v-for="item in transferWindowNotes" :key="item">{{ item }}</li>
              </ul>
            </article>

            <article class="feature-verification-page__card">
              <h2>Liberación manual por admin</h2>
              <p>Si hay un caso excepcional, el administrador puede liberar manualmente al jugador para habilitar el cambio.</p>
              <p>Esto te da control: ni bloqueo rígido sin salida, ni desorden total.</p>
            </article>
          </div>
        </v-container>
      </section>

      <section class="feature-verification-page__section feature-verification-page__section--muted">
        <v-container class="feature-verification-page__container">
          <div class="feature-verification-page__split-panel">
            <article class="feature-verification-page__card">
              <h2>Validación de identidad cuando la liga la activa</h2>
              <p>Si el torneo exige validación, el jugador debe cargar identificación para revisión de admin.</p>
              <p>Cuando se rechaza una validación, el sistema guarda:</p>
              <ul class="feature-verification-page__bullet-list feature-verification-page__bullet-list--inside-card">
                <li v-for="item in rejectionEvidence" :key="item">{{ item }}</li>
              </ul>
            </article>

            <div class="feature-verification-page__image-placeholder" data-testid="verificacion-evidence-placeholder">
              <v-img src="/images/functionalities/verify-players/rejection-evidence.webp" alt="Evidencia de rechazo de validación" contain />
            </div>
          </div>
        </v-container>
      </section>

      <section class="feature-verification-page__section">
        <v-container class="feature-verification-page__container">
          <header class="feature-verification-page__section-header">
            <h2>¿Por qué es mejor que resolverlo por chat?</h2>
          </header>

          <div class="feature-verification-page__card">
            <ul class="feature-verification-page__bullet-list">
              <li v-for="item in chatVsSystemBenefits" :key="item">{{ item }}</li>
            </ul>
          </div>
        </v-container>
      </section>

      <section class="feature-verification-page__section feature-verification-page__section--muted">
        <v-container class="feature-verification-page__container">
          <header class="feature-verification-page__section-header">
            <h2>Preguntas frecuentes</h2>
          </header>

          <v-expansion-panels variant="accordion" class="feature-verification-page__faq">
            <v-expansion-panel v-for="faq in faqs" :key="faq.question" rounded="lg">
              <v-expansion-panel-title>{{ faq.question }}</v-expansion-panel-title>
              <v-expansion-panel-text>{{ faq.answer }}</v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-container>
      </section>

      <section class="feature-verification-page__section">
        <v-container class="feature-verification-page__container">
          <header class="feature-verification-page__section-header">
            <h2>Explora más funcionalidades</h2>
          </header>

          <div class="feature-verification-page__links">
            <NuxtLink v-for="link in relatedLinks" :key="link.href" class="feature-verification-page__related-link" :to="link.href">
              {{ link.label }}
            </NuxtLink>
          </div>
        </v-container>
      </section>

      <section class="feature-verification-page__final-cta">
        <v-container class="feature-verification-page__container">
          <div class="feature-verification-page__final-cta-panel">
            <h2>Si quieres cortar reclamos y operar con reglas claras, esta funcionalidad te da control real.</h2>
            <p>Empieza tu prueba gratis en Futzo.</p>
            <v-btn color="primary" rounded="lg" size="large" data-testid="verificacion-cta-final" @click.prevent="goToTrial">
              {{ ctaLabel }}
            </v-btn>
          </div>
        </v-container>
      </section>
    </div>
  </LandingMarketingShell>
</template>

<style scoped src="~/assets/scss/pages/feature-verification-page.scss"></style>
