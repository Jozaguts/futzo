<script lang="ts" setup></script>
<template>
  <v-table class="next-games-today-table futzo-rounded" density="comfortable">
    <template #top>
      <h2 class="next-games-today-table__title">Próximos partidos hoy</h2>
    </template>
    <template #wrapper>
      <div class="v-table__wrapper content">
        <table>
          <tbody>
            <tr class="next-games-today-table__cell">
              <td class="team">
                <img
                  src="https://placehold.co/50x50"
                  alt="team logo"
                  class="logo"
                />
                <span class="team_name">Equipo 1</span>
              </td>
              <td class="data">
                <span class="date">24/06/2024</span>
                <span class="result">10:00</span>
                <span class="field">Campo 1</span>
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
            <tr class="next-games-today-table__cell">
              <td class="team">
                <img
                  src="https://placehold.co/50x50"
                  alt="team logo"
                  class="logo"
                />
                <span class="team_name">Equipo 1</span>
              </td>
              <td class="data">
                <span class="date">24/06/2024</span>
                <span class="result">10:00</span>
                <span class="field">Campo 1</span>
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
            <tr class="next-games-today-table__cell">
              <td class="team">
                <img
                  src="https://placehold.co/50x50"
                  alt="team logo"
                  class="logo"
                />
                <span class="team_name">Equipo 1</span>
              </td>
              <td class="data">
                <span class="date">24/06/2024</span>
                <span class="result">10:00</span>
                <span class="field">Campo 1</span>
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
.next-games-today-table {
  height: 100%;
  display: flex;
  width: 100%;
  padding: 1rem 1rem 0 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-xl, 16px);
}
.next-games-today-table__title {
  color: var(--Component-colors-Utility-Gray-utility-gray-800, #182230);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 150% */
}
.v-table__wrapper.content {
  width: 100%;
}
.next-games-today-table__cell {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  width: 100%;
  border-radius: var(--radius-md, 8px);
  border: 2px solid var(--colors-gray-light-mode-200, #eee);
}
.next-games-today-table__cell:not(:last-child) {
  margin: 1rem 0;
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
  color: var(--colors-gray-light-mode-700, #616161);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 150% */
}
.data > .result {
  color: var(--Colors-Base-Black, #000);
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
}
.data > .result > .hour {
  color: var(--Colors-Base-Black, #000);
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
}
.data > .date {
  color: var(--colors-gray-light-mode-700, #616161);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
}
.data > .field {
  color: var(--colors-gray-light-mode-700, #616161);
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
}
</style>
