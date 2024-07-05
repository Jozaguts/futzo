<script lang="ts" setup>
</script>
<template>
  <v-table class="next-games-table" :hover="false">
    <template #top>
      <div class="next-games-table__header">
        <h2 class="next-games-table-title">Próximos juegos</h2>
        <nuxt-link to="/" class="next-games-table-link">Ver todos</nuxt-link>
      </div>
    </template>
    <template #wrapper>
      <div class="v-table__wrapper">
        <table>
          <tbody>
            <tr>
              <td>
                <div class="game-container">
                  <div class="teams">
                    <div class="team-local">
                      <img src="https://placehold.co/50x50" alt="team logo"  class="logo"/>
                      <span class="team_name">Equipo 1</span>
                    </div>
                    <div class="vs-container">
                      <div class="vs">vs</div>
                    </div>
                    <div class="team-away">
                      <img src="https://placehold.co/50x50" alt="team logo"  class="logo"/>
                      <span class="team_name">Equipo 1</span>
                    </div>
                  </div>
                  <div class="data">
                    <span class="date">24/06/2024</span>
                    <span class="hour">10:00</span>
                    <span class="field">Campo 1</span>
                  </div>
                  <div class="btn-container">
                    <nuxt-link>
                      <span class="btn-text"> Ver detalles</span>
                      <nuxt-icon name="arrow-right" filled />
                    </nuxt-link>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="game-container">
                  <div class="teams">
                    <div class="team-local">
                      <img src="https://placehold.co/50x50" alt="team logo"  class="logo"/>
                      <span class="team_name">Equipo 1</span>
                    </div>
                    <div class="vs-container">
                      <div class="vs">vs</div>
                    </div>
                    <div class="team-away">
                      <img src="https://placehold.co/50x50" alt="team logo"  class="logo"/>
                      <span class="team_name">Equipo 1</span>
                    </div>
                  </div>
                  <div class="data">
                    <span class="date">24/06/2024</span>
                    <span class="hour">10:00</span>
                    <span class="field">Campo 1</span>
                  </div>
                  <div class="btn-container">
                    <nuxt-link>
                      <span class="btn-text"> Ver detalles</span>
                      <nuxt-icon name="arrow-right" filled />
                    </nuxt-link>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </v-table>
</template>
<style lang="scss" scoped>
.v-table__wrapper > table{
  width: 100%;
  padding: 0 1rem 1rem 1rem;
}
.v-table__wrapper > table > tbody > tr > td{
  padding-left: 0;
  padding-right: 0;
}
.game-container{
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: var(--radius-md, 8px);
  border: 2px solid var(--colors-gray-light-mode-200, #EEE);
  background: var(--Colors-Base-White, #FFF);
  margin-top: 1rem;
  padding: 1rem 1.5rem;
}
.next-games-table{
  width: 100%;
}
.next-games-table__header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  padding: 1rem;
}
.next-games-table-title{
  color: var(--Component-colors-Utility-Gray-utility-gray-800, #182230);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
}
.next-games-table-link{
  color: var(--colors-primary-light-mode-500, #9155FD);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  text-decoration: none;
}
.teams-container {
  display: flex;
  padding: var(--spacing-xl, 16px) var(--spacing-3xl, 24px);
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-none, 0px);
  align-self: stretch;
  border-radius: var(--radius-md, 8px);
  border: 2px solid var(--colors-gray-light-mode-200, #EEE);
  background: var(--Colors-Base-White, #FFF);
}
.teams{
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--spacing-5xl, 40px);
}
.teams > .team-local {
  display: flex;
  width: 130px;
  align-items: center;
  gap: var(--spacing-xl, 16px);
}
.team-local > .team_name{
  color: var(--Component-colors-Utility-Gray-utility-gray-700, #344054);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
}
.team-away {
  display: flex;
  width: 120px;
  justify-content: flex-end;
  align-items: center;
  gap: var(--spacing-xl, 16px);
}
.logo{
  display: flex;
  width: 48px;
  height: 48px;
  padding: var(--spacing-md, 8px);
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  border-radius: 100px;
  //background: url(<path-to-image>) lightgray 50% / cover no-repeat;
}
.vs-container{
  position: relative;
}
.vs-container > .vs {
  color: #000;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px; /* 150% */
}
.vs-container::after {
  content: '';
  display: block;
  width: 1px; /* Establece el ancho a 1px para una línea vertical */
  height: 10px; /* Establece la altura al 100% para que abarque todo el contenedor */
  background: var(--colors-gray-light-mode-400, #BDBDBD);
  position: absolute; /* Posiciona el pseudo-elemento de forma absoluta */
  left: 50%; /* Centra la línea vertical */
  top: 90%;
}
.vs-container::before {
  content: "";
  display: block;
  width: 1px;
  height: 10px;
  background: var(--colors-gray-light-mode-400, #BDBDBD);
  position: absolute;
  left: 50%;
  top: -5px;


}
.data{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-xs, 4px);
}
.data > .date{
  color: var(--colors-gray-light-mode-700, #616161);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
}
.data > .hour {
  display: flex;
  padding: var(--spacing-none, 0px) 16px;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md, 8px);
  border-radius: 100px;
  color: var(--Colors-Base-Black, #000);
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
}
.data > .field {
  color: var(--colors-gray-light-mode-700, #616161);
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 180% */
}
.btn-container{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm, 6px);
}
.btn-text{
  color: var(--Component-colors-Utility-Gray-utility-gray-600, #475467);
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  margin-right: .5rem;
}

</style>