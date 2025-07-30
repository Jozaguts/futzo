<script lang="ts" setup>
  definePageMeta({
    layout: 'blank',
    bodyAttrs: {
      class: 'd-none',
    },
    sanctum: {
      excluded: true,
      guestOnly: true,
    },
  })
  useHead({
    meta: [
      {
        property: 'og:url',
        content: 'https://futzo.io' + useRoute().path,
      },
    ],
  })
</script>
<template>
  <v-container class="mb-8">
    <v-row>
      <v-col cols="12">
        <v-empty-state
          headline="Instrucciones de eliminación de datos de Facebook"
          title="Última actualización: 30-Jul-2025"
        >
          <template #media>
            <Icon
              @click="$router.push({ name: 'index' })"
              class="cursor-pointer"
              name="futzo-icon:futzo-horizontal"
              size="100"
            ></Icon>
          </template>
          <v-container>
            <v-row>
              <v-col cols="12">
                <div class="term-container">
                  <p class="text-body-1">
                    De acuerdo con las regulaciones de Facebook para Apps y sitios web, debemos brindarle a los usuarios
                    las instrucciones para eliminar sus datos. Si quieres eliminar tu actividad relacionada al Futzo.io
                    App, lo puedes hacer de la siguiente manera.
                  </p>
                  <p class="text-body-1">
                    Ingresa a tu cuenta de Facebook y haz clic en “Configuración y privacidad”. Después haz clic en
                    “Configuración”.
                  </p>
                  <p class="text-body-1">
                    Ve a la sección de “Apps y sitios web”, aquí podrás ver toda tu actividad relacionada a aplicaciones
                    y páginas web registradas en tu cuenta de Facebook.
                  </p>
                  <p class="text-body-1">
                    3. Selecciona la casilla correspondiente al Futzo App y haz clic en “Eliminar”.
                  </p>
                  <v-img src="/futzo/eliminar-datos/step-2.jpeg" rounded class="mt-2" />
                  <p class="text-body-1">
                    4. Selecciona las casillas de acuerdo a tu preferencia y haz clic en “Eliminar”.
                  </p>
                  <v-img src="/futzo/eliminar-datos/step-3.jpeg" rounded class="mt-2" />
                  <p class="text-body-1">5. ¡Listo! Eliminaste a Futzo App de tus actividades de manera exitosa.</p>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-empty-state>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss" scoped>
  .term-container {
    margin-top: 8px;
  }

  .term-list {
    list-style-type: disc;
    padding-left: 20px;
  }

  .term-list-item {
    margin-bottom: 10px;
  }

  .text-h6.term-sub-title {
    margin: 16px;
  }

  p.text-body-1 {
    margin-top: 8px;
  }

  h3.text-subtitle-1 {
    margin-top: 16px;
  }
</style>
