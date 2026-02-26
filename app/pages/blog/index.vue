<script setup lang="ts">
import LandingMarketingShell from '~/components/layout/LandingMarketingShell.vue'
import { useBlogPosts } from '~/composables/blog/useBlogPosts'

definePageMeta({
  layout: 'legacy',
  sanctum: { excluded: true },
})

const pageTitle = 'Blog Futzo: guías para organizar ligas de fútbol amateur'
const pageDescription =
  'Aprende a organizar torneos, programar jornadas, definir reglamentos y operar tu liga con procesos claros y menos caos.'
const pageUrl = 'https://futzo.io/blog'

const { hubTitle, hubDescription, blogPosts } = useBlogPosts()
const { isAuthenticated } = useSanctumAuth()
const router = useRouter()

const ctaLabel = computed(() => (isAuthenticated?.value ? 'Ir al Dashboard' : 'Prueba Futzo gratis'))

const collectionSchema = {
  '@type': 'CollectionPage',
  name: pageTitle,
  description: pageDescription,
  url: pageUrl,
  hasPart: blogPosts.map((post) => ({
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: `https://futzo.io${post.slug}`,
    inLanguage: 'es-MX',
  })),
}

const listSchema = {
  '@type': 'ItemList',
  itemListElement: blogPosts.map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: post.title,
    url: `https://futzo.io${post.slug}`,
  })),
}

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: 'website',
  ogUrl: pageUrl,
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
})

useHead({
  link: [{ rel: 'canonical', href: pageUrl }],
})

useSchemaOrg([collectionSchema, listSchema])

const goToTrial = async () => {
  if (isAuthenticated?.value) {
    await router.push('/dashboard')
    return
  }

  await router.push('/login')
}
</script>

<template>
  <LandingMarketingShell>
    <div class="blog-hub-page" role="main">
      <section class="blog-hub-page__hero">
        <v-container class="blog-hub-page__container">
          <div class="blog-hub-page__hero-grid">
            <div class="blog-hub-page__hero-copy">
              <p class="blog-hub-page__eyebrow">Blog Futzo</p>
              <h1>{{ hubTitle }}</h1>
              <p>{{ hubDescription }}</p>
              <div class="blog-hub-page__hero-actions">
                <v-btn color="primary" rounded="lg" size="large" data-testid="blog-hub-cta-hero" @click.prevent="goToTrial">
                  {{ ctaLabel }}
                </v-btn>
                <v-btn variant="outlined" color="white" rounded="lg" size="large" to="/funcionalidades">Ver funcionalidades</v-btn>
              </div>
            </div>

            <div class="blog-hub-page__hero-image" data-testid="blog-hub-hero-image">
              <v-img src="/images/functionalities/index/sass-product-marketing.webp" alt="Blog para administradores de ligas de futbol" cover />
            </div>
          </div>
        </v-container>
      </section>

      <section class="blog-hub-page__section">
        <v-container class="blog-hub-page__container">
          <header class="blog-hub-page__section-header">
            <h2>Guías publicadas</h2>
            <p>Contenido creado para administradores de ligas, coordinadores de torneos y propietarios de complejos deportivos.</p>
          </header>

          <div class="blog-hub-page__posts-grid">
            <v-card v-for="post in blogPosts" :key="post.slug" class="blog-hub-page__post-card" rounded="lg" variant="flat">
              <NuxtLink :to="post.slug" class="blog-hub-page__post-media">
                <v-img :src="post.heroImage" :alt="post.title" cover />
              </NuxtLink>

              <div class="blog-hub-page__post-content">
                <p class="blog-hub-page__post-meta">
                  <span>{{ post.publishedAt }}</span>
                  <span aria-hidden="true">•</span>
                  <span>{{ post.readTime }}</span>
                </p>
                <NuxtLink :to="post.slug" class="blog-hub-page__post-title">{{ post.title }}</NuxtLink>
                <p class="blog-hub-page__post-description">{{ post.description }}</p>
                <NuxtLink :to="post.slug" class="blog-hub-page__post-link">Leer guia completa</NuxtLink>
              </div>
            </v-card>
          </div>
        </v-container>
      </section>
    </div>
  </LandingMarketingShell>
</template>

<style scoped src="~/assets/scss/pages/blog-hub-page.scss"></style>
