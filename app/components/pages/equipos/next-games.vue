<script lang="ts" setup>
import type {NextGames} from '~/models/Game'
import NoGames from '~/components/shared/empty-states/NoGames.vue'
import InitialsAvatar from '~/components/shared/InitialsAvatar.vue'

const { nextGames, title } = defineProps({
    nextGames: Object as PropType<NextGames>,
    title: {
      type: String,
      default: 'Próximos partidos',
    },
  })
  const disabled = computed(() => {
    return !nextGames || nextGames.data?.length === 0
  })
</script>
<template>
  <v-table class="next-games-table" :hover="false">
    <template #top>
      <div class="next-games-table__header pa-4">
        <h2 class="next-games-table-title">{{ title }}</h2>
        <v-btn variant="text" :disabled="disabled" to="/" class="next-games-table-link">Ver todos</v-btn>
      </div>
    </template>
    <template #wrapper>
      <div class="v-table__wrapper">
        <table v-if="!disabled">
          <tbody>
            <tr v-for="(game, index) in nextGames?.data" :key="index">
              <td>
                <div class="game-container">
                  <div class="teams">
                    <div class="team-local">
                      <InitialsAvatar
                        :image="game.home_team.image"
                        :name="game.home_team.name"
                        :fallback-color="game.home_team?.colors?.home?.primary"
                        class="logo"
                      />
                      <span class="team_name text-truncate" style="max-width: 130px">{{ game.home_team.name }}</span>
                    </div>
                    <div class="vs-container">
                      <div class="vs">vs</div>
                    </div>
                    <div class="team-away">
                      <InitialsAvatar
                        :image="game.away_team.image"
                        :name="game.away_team.name"
                        :fallback-color="game.away_team?.colors?.home?.primary"
                        class="logo"
                      />
                      <span class="team_name text-truncate" style="max-width: 130px">{{ game.away_team.name }}</span>
                    </div>
                  </div>
                  <div class="data">
                    <span class="date">{{ game.match_date }}</span>
                    <span class="hour">{{ game.match_time }}</span>
                    <span class="field">{{ game.field.name }}</span>
                  </div>
                  <div class="btn-container">
                    <v-btn variant="text" class="d-flex align-center" disabled>
                      <span class="btn-text text-disabled"> Ver detalles</span>
                      <Icon name="futzo-icon:arrow-right" class="text-disabled" />
                    </v-btn>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <NoGames v-else />
      </div>
    </template>
  </v-table>
</template>
<style lang="scss" scoped>
  .next-games-table {
    width: 100%;
  }
  .next-games-table__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    width: 100%;
  }
  .next-games-table-title {
    color: var(--Component-colors-Utility-Gray-utility-gray-800, #182230);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
  }
  .game-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    border: 2px solid var(--colors-gray-light-mode-200, #eee);
    border-radius: var(--radius-md, 8px);
    background: var(--futzo-surface);
    margin-top: 1rem;
    padding: 1rem 1rem;
    flex-direction: column;
  }
  .v-table .v-table__wrapper > table > tbody > tr > td {
    padding: 0;
  }
  .teams {
    position: relative;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex: 0 1 50%;
    flex-direction: row;
  }
  .team-local,
  .team-away {
    display: flex;
    width: 50%;
    align-items: center;
    gap: var(--spacing-xl, 16px);
    flex-direction: column;
    justify-content: center;
  }
  .team_name {
    color: var(--Component-colors-Utility-Gray-utility-gray-700, #344054);
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
    max-width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .logo {
    display: flex;
    width: 48px;
    height: 48px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    border-radius: 12px;
  }
  .v-table__wrapper > table {
    width: 100%;
  }

  .v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td,
  .v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > th {
    border-bottom: none !important;
  }

  .next-games-table-link {
    color: var(--colors-primary-light-mode-500, #9155fd);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    text-decoration: none;
  }

  .vs-container {
    position: relative;
  }

  .vs-container > .vs {
    color: #000;
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
  }

  .vs-container::after {
    content: '';
    display: block;
    width: 1px;
    height: 10px;
    background: var(--colors-gray-light-mode-400, #bdbdbd);
    position: absolute;
    left: 50%;
    top: 90%;
  }

  .vs-container::before {
    content: '';
    display: block;
    width: 1px;
    height: 10px;
    background: var(--colors-gray-light-mode-400, #bdbdbd);
    position: absolute;
    left: 50%;
    top: -5px;
  }
  //
  .data {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-xs, 4px);
    flex-direction: column;
  }
  @media screen and (width >= 600px) {
    .game-container {
      flex-direction: row;
    }
    .game-container > .teams {
      flex-direction: row;
    }
    .team-local,
    .team-away {
      flex-direction: row;
    }
    .game-container > .data {
      flex-direction: row;
    }
  }
</style>
