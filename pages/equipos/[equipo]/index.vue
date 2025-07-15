<script lang="ts" setup>
  import LiveGames from '~/components/pages/equipos/live-games.vue'
  import NextGamesToday from '~/components/pages/equipos/next-games-today.vue'
  import NextGames from '~/components/pages/equipos/next-games.vue'
  import PageLayout from '~/components/shared/PageLayout.vue'
  import AppBar from '~/components/layout/AppBar.vue'
  import AppBarBtn from '~/components/pages/equipos/equipo/app-bar-btn.vue'
  import CreateTeamDialog from '~/components/pages/equipos/CreateTeamDialog/index.vue'
  import LinesupContainer from '~/components/pages/calendario/game-report/linesup-container.vue'
  import type { Team } from '~/models/Team'
  import { useTeamStore } from '~/store'
  const team = ref<Team>()
  onMounted(async () => {
    const params = useRoute().params?.equipo
    team.value = await useTeamStore().getTeam(params as string)
  })
</script>
<template>
  <PageLayout>
    <template #app-bar>
      <AppBar>
        <template #buttons>
          <AppBarBtn />
        </template>
      </AppBar>
    </template>
    <template #default>
      <div class="teams-team-container">
        <div class="table-container">
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus,
            reprehenderit?
          </div>
          <LinesupContainer :home="team" />
        </div>
        <div class="games-container">
          <div class="live-games">
            <LiveGames />
          </div>
          <div class="next-games-today">
            <NextGamesToday />
          </div>
        </div>
        <div class="next-games">
          <NextGames />
        </div>
        <CreateTeamDialog />
      </div>
    </template>
  </PageLayout>
</template>
<style lang="sass">
  @use "@/assets/scss/pages/teams-team.sass"
</style>
