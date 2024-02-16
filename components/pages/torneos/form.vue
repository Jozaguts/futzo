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
    formData.append(key, values[key]);
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
<style>
@import url('~/assets/css/vue-datepicker-custom.css');
</style>