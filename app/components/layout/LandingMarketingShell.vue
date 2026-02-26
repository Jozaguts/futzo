<script setup lang="ts">
import {useHomeSeoContent} from '~/composables/home/useHomeSeoContent'

const { navLinks, productLinks } = useHomeSeoContent()
const { isAuthenticated } = useSanctumAuth()
const router = useRouter()
const mobileDrawer = ref(false)

const textButton = computed(() => (isAuthenticated?.value ? 'Ir al Dashboard' : 'Prueba gratis'))
const shellNavLinks = computed(() =>
  navLinks.map((link) => ({
    ...link,
    href: link.href.startsWith('#') ? `/${link.href}` : link.href,
  }))
)

const goToPrimaryAction = async () => {
  if (isAuthenticated?.value) {
    await router.push('/dashboard')
    return
  }

  await router.push('/login')
}
</script>

<template>
  <PageLayout styles="main pa-0">
    <template #default>
      <v-app-bar id="home" color="#13203d" scroll-behavior="elevate" elevation="0" :elevation-threshold="12" class="landing-navbar">
        <v-container class="d-flex align-center py-0">
          <a href="/" class="landing-brand" aria-label="Futzo inicio">
            <img src="/futzo/logos/logo-17.png" width="132" height="40" alt="Futzo logo" />
          </a>

          <v-spacer />

          <nav class="landing-nav d-none d-md-flex">
            <a v-for="link in shellNavLinks" :key="link.href" :href="link.href" class="landing-nav__link">{{ link.label }}</a>
            <v-btn color="primary" rounded="lg" class="ml-2" data-testid="landing-shell-cta-nav" @click.prevent="goToPrimaryAction">
              {{ textButton }}
            </v-btn>
          </nav>

          <v-app-bar-nav-icon class="d-md-none" color="white" @click="mobileDrawer = !mobileDrawer" />
        </v-container>
      </v-app-bar>

      <v-navigation-drawer v-model="mobileDrawer" temporary location="right" class="landing-drawer" width="260">
        <v-list class="pt-4">
          <v-list-item v-for="link in shellNavLinks" :key="link.href" :title="link.label" :href="link.href" @click="mobileDrawer = false" />
          <v-list-item>
            <v-btn block color="primary" rounded="lg" data-testid="landing-shell-cta-mobile" @click.prevent="goToPrimaryAction(); mobileDrawer = false">
              {{ textButton }}
            </v-btn>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <slot />

      <footer class="landing-footer">
        <v-container class="landing-footer__content">
          <p>© {{ new Date().getFullYear() }} Futzo.io · Software para administrar ligas de fútbol.</p>
          <div class="landing-footer__meta">
            <div class="landing-footer__groups">
              <div class="landing-footer__group">
                <p class="landing-footer__group-title">Legal</p>
                <div class="landing-footer__links landing-footer__links--stack">
                  <nuxt-link to="/politica-de-privacidad">Política de privacidad</nuxt-link>
                  <nuxt-link to="/terminos-de-servicio">Términos de servicio</nuxt-link>
                </div>
              </div>

              <div class="landing-footer__group">
                <p class="landing-footer__group-title">Producto</p>
                <div class="landing-footer__links landing-footer__links--stack">
                  <nuxt-link v-for="link in productLinks" :key="link.href" :to="link.href">{{ link.label }}</nuxt-link>
                </div>
              </div>
            </div>
            <div class="landing-footer__socials">
              <a href="https://www.facebook.com/futzo.io" target="_blank" rel="noopener noreferrer" aria-label="Facebook Futzo">
                <Icon name="lucide:facebook" size="16" />
              </a>
              <a href="https://www.instagram.com/futzo.io/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Futzo">
                <Icon name="lucide:instagram" size="16" />
              </a>
              <a href="https://www.youtube.com/@futzo-oficial" target="_blank" rel="noopener noreferrer" aria-label="YouTube Futzo">
                <Icon name="lucide:youtube" size="16" />
              </a>
            </div>
          </div>
        </v-container>
      </footer>
    </template>
  </PageLayout>
</template>

<style scoped src="~/assets/scss/pages/home-seo.scss"></style>
