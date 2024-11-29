<script lang="ts" setup></script>
<template>
  <v-card class="futzo-rounded">
    <v-card-title> Horarios Globales del Torneo</v-card-title>
    <v-card-subtitle
      >Estos son los días y horarios permitidos para programar partidos en este
      torneo. Si necesitas modificarlos, puedes configurarlos a continuación.
    </v-card-subtitle>
    <v-card-text>
      <v-table>
        <thead>
          <tr>
            <th>Dia</th>
            <th>Horario de Disponibilidad</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Lunes</td>
            <td>10:00 AM- 08:00 PM</td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
    <v-card-actions>
      <v-btn variant="outlined">Configurar Horarios Globales</v-btn>
    </v-card-actions>
  </v-card>
</template>
