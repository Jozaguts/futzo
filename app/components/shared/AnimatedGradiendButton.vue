<script lang="ts" setup>
  interface Props {
    text?: string
    href?: string
  }
  const { href = '#', text = 'Contacto y soporte' } = defineProps<Props>()
  const { showSupportButton, openMessageSupportBox } = storeToRefs(useGlobalStore())
</script>
<template>
  <div class="position-relative">
    <v-menu
      v-model="openMessageSupportBox"
      v-if="showSupportButton"
      :close-on-content-click="false"
      location="top left"
    >
      <template v-slot:activator="{ props }">
        <v-btn class="buy-now-button" v-bind="props">
          <div v-auto-animate>
            <span v-show="!openMessageSupportBox">{{ text }}</span>
          </div>
          <Icon name="mdi:send" class="mx-2"></Icon>
          <template #append>
            <v-btn
              @click.stop="showSupportButton = !showSupportButton"
              icon="mdi-close"
              size="small"
              variant="outlined"
              density="compact"
              class="position-absolute"
              style="top: -30px"
            ></v-btn>
          </template>
        </v-btn>
      </template>
      <v-card max-width="300" class="futzo-rounded" variant="outlined" density="compact">
        <v-card-title class="text-body-1">Contacto y soporte</v-card-title>
        <v-card-subtitle class="text-wrap"
          >¿Te atoraste o tienes un problema? Escríbenos y te ayudamos lo antes posible.</v-card-subtitle
        >
        <v-card-text>
          <v-textarea
            class="text-area"
            placeholder="Cuéntanos qué pasó Si puedes, agrega el nombre de tu liga o torneo."
            style="min-height: 100%; max-height: 210px"
          ></v-textarea>
          <small class="text-wrap"
            >Respondemos al correo o número con el que te registraste. Si usaste teléfono, revisa WhatsApp.</small
          >
        </v-card-text>
        <v-card-actions>
          <PrimaryBtn text="Enviar Mensaje" icon="mdi:send" block class="pa-4" icon-position="right"></PrimaryBtn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>
<style>
  .text-area > .v-input__control > .v-field > .v-field__field > textarea {
    padding-top: 10px;
  }
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
    inset-block-end: 2%;
    inset-inline-end: 32px;
  }
</style>
