<script lang="ts" setup>
  import ContactForm from '~/components/shared/ContactForm.vue'
  interface Props {
    text?: string
    href?: string
  }
  const { href = '#', text = 'Contacto y soporte' } = defineProps<Props>()
  const { showSupportButton, openMessageSupportBox } = storeToRefs(useGlobalStore())
  const tab = ref('contact-support')
  const years = [
    {
      color: 'cyan',
      year: '1960',
    },
    {
      color: 'green',
      year: '1970',
    },
    {
      color: 'pink',
      year: '1980',
    },
    {
      color: 'amber',
      year: '1990',
    },
    {
      color: 'orange',
      year: '2000',
    },
  ]
</script>
<template>
  <client-only>
    <div class="position-relative">
      <v-menu
        v-model="openMessageSupportBox"
        v-if="showSupportButton"
        :close-on-content-click="false"
        location="top left"
        offset="-48px, 16px"
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
        <v-card max-width="380" class="futzo-rounded" variant="outlined" density="compact">
          <v-card-item>
            <v-tabs color="primary" v-model="tab">
              <v-tab value="contact-support"> Contacto y soporte </v-tab>
              <v-tab value="history"> Historial </v-tab>
            </v-tabs>
          </v-card-item>
          <v-card-text>
            <v-tabs-window v-model="tab">
              <v-tabs-window-item value="contact-support">
                <ContactForm @submitted="openMessageSupportBox = false" />
              </v-tabs-window-item>
              <v-tabs-window-item value="history">
                <v-sheet
                  min-height="100%"
                  max-height="400px"
                  min-width="100%"
                  max-width="350px"
                  class="px-2 overflow-y-auto"
                >
                  <v-timeline align="start">
                    <v-timeline-item v-for="(year, i) in years" :key="i" :dot-color="year.color" size="small">
                      <template v-slot:opposite>
                        <div :class="`pt-1 headline font-weight-bold text-${year.color}`" v-text="year.year"></div>
                      </template>
                      <div>
                        <h2 :class="`mt-n1 headline font-weight-light mb-4 text-${year.color}`">Lorem ipsum</h2>
                        <div>
                          Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed
                          euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando
                          voluptatibus, vix an salutandi sententiae.
                        </div>
                      </div>
                    </v-timeline-item>
                  </v-timeline>
                </v-sheet>
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>
        </v-card>
      </v-menu>
    </div>
  </client-only>
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
