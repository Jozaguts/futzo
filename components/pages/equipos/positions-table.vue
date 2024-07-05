<script setup lang="ts">
</script>
<template>
  <v-table class="positions-table" >
    <template #top>
      <h2 class="positions-table-title">Tabla de posiciones</h2>
    </template>
   <template #wrapper>
     <div class="v-table__wrapper ">
       <table >
         <thead>
           <tr>
             <th >Posición</th>
             <th>Equipo</th>
             <th>PJ</th>
             <th>PG</th>
             <th>PE</th>
             <th>PP</th>
             <th>GF</th>
             <th>GC</th>
             <th>DG</th>
             <th>Pts</th>
           </tr>
         </thead>
         <tbody>
         <tr>
           <td>1</td>
           <td>Equipo 1</td>
           <td>5</td>
           <td>3</td>
           <td>2</td>
           <td>0</td>
           <td>10</td>
           <td>5</td>
           <td>5</td>
           <td>11</td>
         </tr>
         <tr>
           <td>2</td>
           <td>Equipo 2</td>
           <td>5</td>
           <td>3</td>
           <td>2</td>
           <td>0</td>
           <td>10</td>
           <td>5</td>
           <td>5</td>
           <td>11</td>
         </tr>
         <tr>
           <td>2</td>
           <td>Equipo 2</td>
           <td>5</td>
           <td>3</td>
           <td>2</td>
           <td>0</td>
           <td>10</td>
           <td>5</td>
           <td>5</td>
           <td>11</td>
         </tr>
         <tr>
           <td>2</td>
           <td>Equipo 2</td>
           <td>5</td>
           <td>3</td>
           <td>2</td>
           <td>0</td>
           <td>10</td>
           <td>5</td>
           <td>5</td>
           <td>11</td>
         </tr>
         <tr>
           <td>2</td>
           <td>Equipo 2</td>
           <td>5</td>
           <td>3</td>
           <td>2</td>
           <td>0</td>
           <td>10</td>
           <td>5</td>
           <td>5</td>
           <td>11</td>
         </tr>
         <tr>
           <td>2</td>
           <td>Equipo 2</td>
           <td>5</td>
           <td>3</td>
           <td>2</td>
           <td>0</td>
           <td>10</td>
           <td>5</td>
           <td>5</td>
           <td>11</td>
         </tr>
         <tr>
           <td>2</td>
           <td>Equipo 2</td>
           <td>5</td>
           <td>3</td>
           <td>2</td>
           <td>0</td>
           <td>10</td>
           <td>5</td>
           <td>5</td>
           <td>11</td>
         </tr>
         <tr>
           <td>2</td>
           <td>Equipo 2</td>
           <td>5</td>
           <td>3</td>
           <td>2</td>
           <td>0</td>
           <td>10</td>
           <td>5</td>
           <td>5</td>
           <td>11</td>
         </tr>
         <tr>
           <td>2</td>
           <td>Equipo 2</td>
           <td>5</td>
           <td>3</td>
           <td>2</td>
           <td>0</td>
           <td>10</td>
           <td>5</td>
           <td>5</td>
           <td>11</td>
         </tr>
         <tr>
           <td>2</td>
           <td>Equipo 2</td>
           <td>5</td>
           <td>3</td>
           <td>2</td>
           <td>0</td>
           <td>10</td>
           <td>5</td>
           <td>5</td>
           <td>11</td>
         </tr>
         </tbody>
       </table>
     </div>
   </template>
  </v-table>
</template>
<style lang="scss" scoped>
.positions-table{
  background: var(--Colors-Base-White, #FFF);
  border-radius: var(--radius-md, 8px);
}
.positions-table > .v-table__wrapper > table > tbody > tr:nth-child(odd) {
  border-bottom: 1px solid var(--Colors-Border-border-secondary, #EAECF0);
  background: var(--Colors-Background-bg-primary_hover, #F9FAFB);
}
.positions-table-title {
  color: var(--Component-colors-Utility-Gray-utility-gray-800, #182230);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 150% */
  margin: 1rem;
}
.positions-table > .v-table__wrapper > table{
  border-radius: var(--radius-md, 8px);
  border: 1px solid var(--Colors-Border-border-secondary, #EAECF0);
}
.positions-table > .v-table__wrapper > table > tbody > tr > td, table > tbody > tr{
  text-align: center !important;
  border-bottom: 1px solid #EAECF0 !important;
}
.positions-table > .v-table__wrapper  > table > thead > tr > th{
  text-align: center !important;
  border-bottom: 1px solid #EAECF0 !important;
}
</style>