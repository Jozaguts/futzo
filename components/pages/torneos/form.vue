<script  lang="ts" setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {useSanctumClient} from "#imports";
const flow = ref(['month', 'year', 'calendar']);
const client = useSanctumClient();
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
    if (values[key].length && values[key][0] instanceof File) {
      formData.append(key, values[key][0]);
    } else if (values[key]) {
      formData.append(key, values[key]);
    }
  }
  const {data, error, pending} = await useAsyncData('store-tournament', async () =>{
      await client('api/v1/admin/tournaments', {
        method: 'POST',
        body: formData,

      });
      pending.value = false;
      dialog.value = false;
  });
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
    <v-dialog width="500"  v-model="dialog"
              activator="parent">
      <template #default>
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
                  <v-col cols="12" md="6" lg="6">
                    <small>Inicia</small>
                    <VueDatePicker
                        vertical
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
                        vertical
                        format="dd/MM/yyyy"
                        :min-date="new Date()"
                        v-model="fields.end_date.fieldValue"
                        v-bind="fields.end_date.fieldPropsValue"
                        :dark="true"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                        v-model="fields.location.fieldValue"
                        v-bind="fields.location.fieldPropsValue"
                        label="Ubicación"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                        timezone="America/Mexico_City"
                        format="MM/dd/yyyy HH:mm"
                        v-model="fields.description.fieldValue"
                        v-bind="fields.description.fieldPropsValue"
                        label="Descripción"
                        max-rows="5"
                        rows="3"
                    ></v-textarea>
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
            <v-spacer></v-spacer>
            <v-btn
                block
                text="Crear"
                :disabled="pending"
                @click="createTournament"
                variant="elevated"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-btn>
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