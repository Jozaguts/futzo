<script lang="ts" setup>
  import { useDisplay } from 'vuetify/framework'

  const routeName = computed(() => useRoute().name)
  type Breadcrumbs = {
    title: string
    href: string
    disabled: boolean
  }

  const breadcrumbs = computed((): Breadcrumbs[] => {
    switch (routeName.value) {
      case 'index':
        return [
          {
            title: useAuthStore().user?.league?.name as string,
            disabled: false,
            href: '/',
          },
        ]
      case 'torneos':
        return [
          {
            title: 'Torneos',
            href: 'torneos',
            disabled: false,
          },
        ]
      case 'torneos-torneo':
        return [
          {
            title: 'Torneos',
            href: '/torneos',
            disabled: false,
          },
          {
            title: useRoute().params.torneo.toString().replace(/-/g, ' ') as string,
            href: ('/torneos/' + useRoute().params.torneo) as string,
            disabled: true,
          },
        ]
      case 'torneos-torneo-calendario':
        return [
          {
            title: 'Torneos',
            href: '/torneos',
            disabled: false,
          },
          {
            title: useRoute().params.torneo.toString().replace(/-/g, ' ') as string,
            href: ('/torneos/' + useRoute().params.torneo) as string,
            disabled: false,
          },
          {
            title: 'Calendario',
            href: 'calendario',
            disabled: true,
          },
        ]
      case 'equipos':
        return [
          {
            title: 'Equipos',
            href: '/equipos',
            disabled: false,
          },
        ]
      case 'equipos-equipo':
        return [
          {
            title: 'Equipos',
            href: '/equipos',
            disabled: false,
          },
          {
            title: useRoute().params.equipo.toString().replace(/-/g, ' ') as string,
            href: ('/equipos/' + useRoute().params.equipo) as string,
            disabled: true,
          },
        ]
      case 'jugadores':
        return [
          {
            title: 'Jugadores',
            href: '/jugadores',
            disabled: false,
          },
        ]
      case 'ubicaciones':
        return [
          {
            title: 'Ubicaciones',
            href: '/ubicaciones',
            disabled: false,
          },
        ]
      case 'configuracion':
        return [
          {
            title: 'Configuración',
            href: '/configuracion',
            disabled: false,
          },
        ]
      default:
        return [
          {
            title: '',
            href: '/',
            disabled: false,
          },
        ]
    }
  })
  const { mobile } = useDisplay()
</script>
<template>
  <v-breadcrumbs :items="breadcrumbs" active-class="active">
    <template v-slot:item="{ item, index }">
      <span
        class="text-capitalize"
        :class="[
          item.disabled ? 'active' : 'cursor-pointer',
          breadcrumbs.length > 1 ? 'text-breadcrumbs' : 'text-breadcrumb',
          index ? 'text-truncate' : 'text-nowrap',
        ]"
        :style="[mobile ? 'max-width: 100px' : '']"
        @click="() => $router.push(item.href as string)"
      >
        {{ item.title }}
      </span>
    </template>
    <template #divider>
      <Icon v-if="breadcrumbs.length > 0" name="futzo-icon:breadcrumbs-arrow" size="12" />
    </template>
  </v-breadcrumbs>
</template>
<style lang="sass">
  .text-breadcrumbs
    font-size: 20px
    font-weight: 500
    line-height: 30px
    color: #182230

  .text-breadcrumb
    font-size: 36px
    font-weight: 600
    line-height: 44px
    color: #000000

  .text-breadcrumbs.active
    color: #9155FD
    font-weight: 700
</style>
