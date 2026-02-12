<script lang="ts" setup>
import Breadcrumbs from '~/components/breadcrumbs.vue'
import {Icon} from '#components'
import {useDisplay} from 'vuetify'

const { mobile } = useDisplay()
  const { drawer } = storeToRefs(useGlobalStore())

  const toggleDrawer = () => {
    drawer.value = !drawer.value
  }
  type Props = {
    extended?: boolean
    height?: number
    density?: 'default' | 'compact' | 'prominent' | 'comfortable'
  }
  const props = withDefaults(defineProps<Props>(), {
    extended: true,
    height: 90,
    density: 'default',
  })
</script>
<template>
  <v-app-bar
    :density="props.density"
    color="#f9fafb"
    :border="false"
    elevation="0"
    class="app-bar-shell pt-2 pt-lg-0 pt-md-0"
    app
    :height="mobile ? 56 : props.height"
    :extension-height="mobile && props.extended ? 56 : 0"
    :extended="props.extended"
  >
    <template #title>
      <div v-if="mobile" class="app-bar-mobile">
        <v-btn
          variant="text"
          icon
          aria-label="Abrir navegación"
          class="app-bar-mobile__toggle"
          @click.stop="toggleDrawer"
        >
          <Icon name="lucide:menu" size="20" />
        </v-btn>
        <Logo class="app-bar-mobile__logo" max-width="120" />
      </div>
      <slot v-else name="title">
        <breadcrumbs />
      </slot>
    </template>
    <template #append>
      <slot v-if="!mobile" name="buttons"></slot>
    </template>
    <template #extension>
      <slot name="extension"></slot>
    </template>
  </v-app-bar>
</template>
<style scoped>
  .app-bar-shell {
    border-bottom: 1px solid #eaecf0;
    background: #f9fafb !important;
  }

  .app-bar-mobile {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .app-bar-mobile__toggle {
    margin-left: -4px;
  }

  .app-bar-mobile__logo {
    max-height: 28px;
  }
</style>
