<script lang="ts" setup>
  import Breadcrumbs from '~/components/breadcrumbs.vue'
  import { useDisplay } from 'vuetify'

  const { mobile } = useDisplay()
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
    color="white"
    :border="false"
    elevation="0"
    class="pt-2 pt-lg-0 pt-md-0"
    app
    :height="mobile ? 40 : props.height"
    :extension-height="mobile && props.extended ? 55 : 0"
    :extended="props.extended"
  >
    <template #title>
      <slot name="title">
        <breadcrumbs />
      </slot>
    </template>
    <template #append>
      <slot name="buttons"></slot>
    </template>
    <template #extension>
      <slot name="extension"></slot>
    </template>
  </v-app-bar>
</template>
