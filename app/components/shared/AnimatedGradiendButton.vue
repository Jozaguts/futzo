<script lang="ts" setup>
  interface Props {
    text?: string
    href?: string
  }
  const { href = '#', text = 'Contacto y soporte' } = defineProps<Props>()
  const menu = ref(false)
</script>
<template>
  <v-menu v-model="menu" :close-on-content-click="false" location="top right">
    <template v-slot:activator="{ props }">
      <v-btn class="buy-now-button" :href="href" rel="noopener noreferrer" v-bind="props">
        {{ text }} <Icon name="mdi:send" class="mx-2"></Icon>
      </v-btn>
    </template>
    <v-card class="futzo-rounded mx-4" variant="outlined" density="compact" v-if="!$vuetify.mobile">
      <v-card-title class="text-body-1">Contacto y soporte</v-card-title>
      <v-card-subtitle class="text-wrap"
        >¿Te atoraste o tienes un problema? Escríbenos y te ayudamos lo antes posible.</v-card-subtitle
      >
      <v-card-text>
        <v-textarea
          rows="8"
          placeholder="Cuéntanos qué pasó (qué estabas haciendo, en qué pantalla, y si te salió algún error). Si puedes, agrega el nombre de tu liga o torneo."
          style="min-height: 100%; max-height: 210px"
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <PrimaryBtn text="Enviar Mensaje" icon="mdi:send" block class="pa-4" icon-position="right"></PrimaryBtn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>
<style scoped>
  @keyframes gradient-animation {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
  .buy-now-button {
    display: inline-flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    border: 0;
    border-radius: 6px;
    margin: 0;
    animation: gradient-animation 12s linear infinite;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: linear-gradient(-45deg, #8c57ff, #2e263d, #338aff, #3cf0c5);
    background-size: 600%;
    color: #ffffffe6;
    cursor: pointer;
    font-size: 0.9375rem;
    font-weight: 500;
    letter-spacing: 0.43px;
    line-height: 1.2;
    min-inline-size: 50px;
    outline: 0;
    padding-block: 0.625rem;
    padding-inline: 1.25rem;
    text-decoration: none;
    text-transform: none;
    vertical-align: middle;
  }
  .buy-now-button {
    position: fixed;
    z-index: 900;
    inset-block-end: 5%;
    inset-inline-end: 79px;
  }
</style>
