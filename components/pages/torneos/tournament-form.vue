<script  lang="ts" setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {useSanctumClient} from "#imports";
import {useTournamentStore} from "~/store";
import {storeToRefs} from "pinia";
const flow = ref(['month', 'year', 'calendar']);
const client = useSanctumClient();
const {categories} = storeToRefs(useTournamentStore());
const {
  fields,
  handleSubmit,
  resetForm,
} = useSchemas( 'create-tournament')
const dialog = ref(false);
const createTournament = handleSubmit(async (values) => {

  if (values.start_date instanceof Date) {
    values.start_date = values.start_date.toISOString();
  }
  if (values.end_date instanceof Date) {
    values.end_date = values.end_date.toISOString();
  }
  const formData = new FormData();
  for (const key in values) {
    if (values[key]){
      formData.append(key, values[key]);
    }
  }
  await useTournamentStore().storeTournament(formData)
      .then(() => {
        resetForm();
        dialog.value = false;
      })
});

watch(() => dialog.value, (value) => {
  if (!value) {
    resetForm();
  }
});
</script>
<template>
  <v-btn  size="30" :icon="true" class="position-absolute top-0.5">
    <v-icon>mdi-plus</v-icon>
    <v-dialog width="500"  v-model="dialog" activator="parent">
      <v-card class="card-in-dialog" title="Crear Torneo" variant="elevated">
        <v-card-text>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                      v-model="fields.name.fieldValue"
                      v-bind="fields.name.fieldPropsValue"
                      label="Nombre del torneo"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                      clearable
                      v-model="fields.category.fieldValue"
                      v-bind="fields.category.fieldPropsValue"
                      label="categoría"
                      :items="categories"
                      item-title="name"
                      item-value="id"
                  >
                    <template #details>
                      <LazyPagesTorneosCategoryForm />
                    </template>
                    <template v-slot:item="{ props,item }">
                      <v-list-item
                          variant="flat"
                          v-bind="props"
                          :subtitle="item.raw.age_range === '*' ? 'Edad libre' : item.raw.age_range ">
                      </v-list-item>
                    </template>
                  </v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                      v-model="fields.prize.fieldValue"
                      v-bind="fields.prize.fieldPropsValue"
                      label="Premio"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6" lg="6">
                  <small>Inicia</small>
                  <VueDatePicker
                      teleport-center
                      :min-date="new Date()"
                      timezone="America/Mexico_City"
                      format="dd/MM/yyyy"
                      v-model="fields.start_date.fieldValue"
                      v-bind="fields.start_date.fieldPropsValue"
                      :dark="true"
                  />
                </v-col>
                <v-col cols="12" md="6" lg="6">
                  <small>Termina</small>
                  <VueDatePicker
                      teleport-center
                      timezone="America/Mexico_City"
                      format="dd/MM/yyyy"
                      :min-date="new Date()"
                      v-model="fields.end_date.fieldValue"
                      v-bind="fields.end_date.fieldPropsValue"
                      :dark="true"
                  />
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
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions class="px-10">
          <v-btn
              block
              size="50"
              text="Crear"
              @click="createTournament"
              variant="elevated"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>
<style>
@import url('~/assets/css/vue-datepicker-custom.css');
.card-in-dialog {
  padding: 2rem 2rem 1.5rem 2rem ;
}
@media (max-width: 600px) {
  .card-in-dialog {
    padding: 2rem .5rem 1.5rem .5rem ;
  }
}
</style>