<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css'
import VueDatePicker from "@vuepic/vue-datepicker";
import {useDisplay} from "vuetify";
import {useLeaguesStore} from "~/store/useLeaguesStore";
import {storeToRefs} from "pinia";
definePageMeta({
  middleware: ['sanctum:auth'],
});
const {
  fields,
  handleSubmit,
  resetForm,
} = useSchemas( 'create-league')

const createLeague = handleSubmit(async (values) => {
  const {data, error, pending} = await useAsyncData('store-league', async () =>{
    if (values.creation_date instanceof Date) {
      values.creation_date = values.creation_date.toISOString();
    }
    const formData = new FormData();
    for (const key in values) {
      if (values[key].length && values[key][0] instanceof File) {
        formData.append(key, values[key][0]);
      } else if (values[key]) {
        formData.append(key, values[key]);
      }
    }
    const client = useSanctumClient()
   return  await client('api/v1/admin/leagues', {
      method: 'POST',
      body: formData,
    })
  });
  if (error.value) {
    console.log(error);
  }
  if (!error.value && !pending.value) {
    resetForm();
  }
  useSanctumUser().value.league = data.value;
  navigateTo('/');
});
const variant = computed(() =>{
 return useDisplay().mobile ? 'elevated' : 'outlined'
})
const {footballTypes}  = storeToRefs( useLeaguesStore() )
console.log({footballTypes: footballTypes.value})
</script>

<template>
  <v-main>
    <v-card class="custom-v-card" max-width="600" min-width="340" :variant="variant" >
      <v-card-item>
        <v-card-title>
          <p class="title font-weight-bold text-lg-h5">¡Empieza tu Aventura Deportiva con Futzo!</p>
        </v-card-title>
      </v-card-item>
      <v-card-text>
        <v-container fluid class="px-0">
          <v-row no-gutters>
            <v-col cols="12">
              <v-card-subtitle>
                <h3 class="text-body-1 font-weight-bold">Crea tu primera liga</h3>
              </v-card-subtitle>
            </v-col>
            <v-col cols="12">
              <v-form>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                          v-model="fields.name.fieldValue"
                          v-bind="fields.name.fieldPropsValue"
                          label="Nombre"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                          v-model="fields.football_type_id.fieldValue"
                          v-bind="fields.football_type_id.fieldPropsValue"
                          label="Tipo" :items="footballTypes" item-title="name" item-value="id"></v-select>
                    </v-col>
                    <v-col>
                      <v-text-field
                          v-model="fields.location.fieldValue"
                          v-bind="fields.location.fieldPropsValue"
                          label="Locación"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                          v-model="fields.description.fieldValue"
                          v-bind="fields.description.fieldPropsValue"
                          label="Descripción"
                          max-rows="5"
                          rows="3"
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12">
                      <span class="text-medium-emphasis">Fecha de Creación</span>
                      <VueDatePicker
                          vertical
                          :teleport="true"
                          hide-offset-dates
                          format="dd/MM/yyyy"
                          v-model="fields.creation_date.fieldValue"
                          v-bind="fields.creation_date.fieldPropsValue"
                          :dark="true"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-file-input
                          v-model="fields.logo.fieldValue"
                          v-bind="fields.logo.fieldPropsValue"
                          clearable
                          accept="image/*"
                          label="Logo"
                      ></v-file-input>
                    </v-col>
                    <v-col cols="12">
                      <v-file-input
                          v-model="fields.banner.fieldValue"
                          v-bind="fields.banner.fieldPropsValue"
                          clearable
                          accept="image/*"
                          label="Banner"
                      ></v-file-input>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="px-5">
        <v-btn @click="createLeague" size="50"  variant="flat" block  color="primary">Crear</v-btn>
      </v-card-actions>
    </v-card>
  </v-main>
</template>
<style>
  @import url('~/assets/css/vue-datepicker-custom.css');
  @media (max-width: 600px) {
    .title {
      font-size: .9rem;
    }
  }
  .custom-v-card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 4.5rem 3.5rem;
  }
  @media (max-width: 600px) {
    .custom-v-card {
      padding: 1rem 0 1.5rem 0;
    }
  }
</style>
