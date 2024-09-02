<script lang="ts" setup></script>
<template>
  <v-table class="live-games-table futzo-rounded" density="comfortable">
    <template #top>
      <h2 class="live-games-table__title">Tabla de posiciones</h2>
    </template>
    <template #wrapper>
      <div class="v-table__wrapper content">
        <table>
          <tbody>
            <tr class="live-games-table__cell">
              <td class="team">
                <img
                  src="https://placehold.co/50x50"
                  alt="team logo"
                  class="logo"
                />
                <span class="team_name">Equipo 1</span>
              </td>
              <td class="data">
                <div class="live">
                  <nuxt-icon name="Ellipse-red" filled></nuxt-icon>
                  <span>Live</span>
                </div>
                <div class="result">
                  <div class="text">1:3</div>
                </div>
              </td>
              <td class="team">
                <img
                  src="https://placehold.co/50x50"
                  alt="team logo"
                  class="logo"
                />
                <span class="team_name">Equipo 1</span>
              </td>
            </tr>
            <tr class="live-games-table__cell">
              <td class="team">
                <img
                  src="https://placehold.co/50x50"
                  alt="team logo"
                  class="logo"
                />
                <span class="team_name">Equipo 1</span>
              </td>
              <td class="data">
                <div class="live">
                  <nuxt-icon name="Ellipse-red" filled></nuxt-icon>
                  <span>Live</span>
                </div>
                <div class="result">
                  <div class="text">1:3</div>
                </div>
              </td>
              <td class="team">
                <img
                  src="https://placehold.co/50x50"
                  alt="team logo"
                  class="logo"
                />
                <span class="team_name">Equipo 1</span>
              </td>
            </tr>
            <tr class="live-games-table__cell">
              <td class="team">
                <img
                  src="https://placehold.co/50x50"
                  alt="team logo"
                  class="logo"
                />
                <span class="team_name">Equipo 1</span>
              </td>
              <td class="data">
                <div class="live">
                  <nuxt-icon name="Ellipse-red" filled></nuxt-icon>
                  <span>Live</span>
                </div>
                <div class="result">
                  <div class="text">1:3</div>
                </div>
              </td>
              <td class="team">
                <img
                  src="https://placehold.co/50x50"
                  alt="team logo"
                  class="logo"
                />
                <span class="team_name">Equipo 1</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </v-table>
</template>
<style lang="scss" scoped>
.live-games-table {
  height: 100%;
  display: flex;
  width: 100%;
  padding: 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-xl, 16px);
}
.live-games-table__title {
  color: var(--Component-colors-Utility-Gray-utility-gray-800, #182230);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 150% */
}
.v-table__wrapper.content {
  width: 100%;
}
.live-games-table__cell {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  width: 100%;
  border-radius: var(--radius-md, 8px);
  border: 2px solid var(--colors-gray-light-mode-200, #eee);
}
.live-games-table__cell:not(:last-child) {
  margin: 0 0 1rem 0;
}
.team {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs, 4px);
  flex: 1 0 0;
  min-height: 80px;
}
.data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-xs, 4px);
  flex: 1 0 0;
}
.logo {
  display: flex;
  width: 48px;
  height: 48px;
  padding: var(--spacing-md, 8px);
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 100px;
  //background: url(<path-to-image>) lightgray 50% / cover no-repeat;
}
.team_name {
  color: var(--Component-colors-Utility-Gray-utility-gray-700, #344054);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
}
.data > .live {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-xs, 4px);
}
.data > .live > span {
  color: var(--Colors-Error-600, #e8454a);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 150% */
}
.data > .result {
  display: flex;
  padding: var(--spacing-none, 0px) 16px;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md, 8px);
  border-radius: 100px;
  background: var(--Colors-Base-Black, #000);
}
.data > .result > .text {
  color: var(--Colors-Base-White, #fff);
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px; /* 150% */
}
</style>
