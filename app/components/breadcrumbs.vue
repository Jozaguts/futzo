<script lang="ts" setup>
  import { useDisplay } from 'vuetify'

  const routeName = computed(() => useRoute().name)
  type Breadcrumbs = {
    title: string
    href: string
    disabled: boolean
  }
  const { player } = storeToRefs(usePlayerStore())

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
      case 'jugadores-jugador': {
        const playerName = player.value
          ? `${player.value?.name ?? ''} ${player.value?.last_name ?? ''}`.trim() || 'Detalle del jugador'
          : `Jugador #${useRoute().params.jugador}`
        return [
          {
            title: 'Jugadores',
            href: '/jugadores',
            disabled: false,
          },
          {
            title: playerName,
            href: useRoute().fullPath,
            disabled: true,
          },
        ]
      }
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
