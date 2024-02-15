<script  lang="ts" setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import type {Tournament} from "~/models/tournament";
const tournament = ref<Tournament>({
  id: 1,
  name: '',
  location: '',
  start_date: new Date(),
  end_date: new Date(),
  prize: '',
  winner: '',
  description: '',
  logo: [],
  banner: [],
  status: ''
});
const date = ref();
const flow = ref(['month', 'year', 'calendar']);
const {
  fields,
  handleSubmit,
  resetForm,
} = useSchemas( 'create-tournament')
const createTournament = handleSubmit((values) => {
  console.log('Submitted with', values);
});

</script>
<template>
  <v-dialog width="500">

    <template v-slot:activator="{ props }">

      <v-btn v-bind="props"  icon size="30" class="position-absolute top-0.5">
        <v-icon size="">mdi-plus</v-icon>
      </v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card title="Crear Torneo">
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
                  <v-text-field
                      v-model="fields.location.fieldValue"
                      v-bind="fields.location.fieldPropsValue"
                      label="Ubicación"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <small>Inicia</small>
                  <VueDatePicker
                      v-model="fields.start_date.fieldValue"
                      v-bind="fields.start_date.fieldPropsValue"
                      :flow="flow"
                      :dark="true"
                  />
                  {{fieldPropsValue}}
                </v-col>
                <v-col cols="6">
                  <small>Termina</small>
                  <VueDatePicker v-model="date" :flow="flow"  :dark="true" />
                </v-col>
                <v-col cols="12">
                  <v-textarea
                      v-model="tournament.description"
                      label="Descripción"
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-file-input
                      :model-value="tournament.logo"
                      clearable
                      accept="image/*"
                      label="Logo"
                  ></v-file-input>
                </v-col>
                <v-col cols="12">
                  <v-file-input
                      :model-value="tournament.banner"
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
          <v-spacer></v-spacer>
          <v-btn
              block
              text="Crear"
              @click="createTournament"
              variant="elevated"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<style >
.dp__theme_dark {
  --dp-background-color: #312D4B;
  --dp-text-color: #fff;
  --dp-hover-color: #484848;
  --dp-hover-text-color: #fff;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #9155FD;
  --dp-primary-disabled-color: #b088f8;
  --dp-primary-text-color: #fff;
  --dp-secondary-color: #a9a9a9;
  //--dp-border-color: #E7E3FC;
  --dp-border-color: #8b86a4;
  --dp-menu-border-color: #2d2d2d;
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #737373;
  --dp-disabled-color-text: #d0d0d0;
  --dp-scroll-bar-background: #212121;
  --dp-scroll-bar-color: #484848;
  --dp-success-color: #00701a;
  --dp-success-color-disabled: #428f59;
  --dp-icon-color: #959595;
  --dp-danger-color: #e53935;
  --dp-marker-color: #e53935;
  --dp-tooltip-color: #3e3e3e;
  --dp-highlight-color: rgb(0 92 178 / 20%);
  --dp-range-between-dates-background-color: var(--dp-hover-color, #484848);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
  --dp-range-between-border-color: var(--dp-hover-color, #fff);
}
</style>