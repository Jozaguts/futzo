<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css'
import VueDatePicker from "@vuepic/vue-datepicker";
definePageMeta({
  middleware: ['sanctum:auth']
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
  console.log(1)
  useSanctumUser().value.league = data.value;
  navigateTo('/');
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="6" md="6"  offset-md="3" offset-lg="3">
        <h1 class="text-h4 text-lg-h3 ">Bienvenido!</h1>
        <p class="text-subtitle-2 text-md-body-1">Antes de sumergirte en todas las funcionalidades que <span class="font-weight-bold">Futzo</span> tiene para ofrecer, hay un paso que necesitas completar.</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="6" md="6"  offset-md="3" offset-lg="3">
         <v-card>
            <v-card-title>
              <h3 class="text-h5 ">Crear tu primera liga</h3>
            </v-card-title>
            <v-card-text>
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
                     <small>Fecha de Creación</small>
                     <VueDatePicker
                         vertical
                         :teleport="true"
                         hide-offset-dates
                         position="right"
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
            </v-card-text>
            <v-card-actions>
              <v-btn @click="createLeague" variant="outlined" block  color="primary">Crear</v-btn>
            </v-card-actions>
          </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
  @import url('~/assets/css/vue-datepicker-custom.css');
</style>
