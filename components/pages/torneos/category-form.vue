<script lang="ts" setup>
import {useTournamentStore} from "~/store";

const dialog = ref(false);
const {
  fields,
  handleSubmit,
  resetForm,
} = useSchemas( 'create-category')
const createCategory = handleSubmit(async (values) => {
  await useTournamentStore().storeCategory(values)
      .then(() => {
        resetForm();
        dialog.value = false;
      })
});
</script>
<template>
  <v-tooltip text="Agrega una nueva categoría"  location="left">
    <template v-slot:activator="{props}">
      <v-btn v-bind="props" :icon="true" density="compact">
        <v-icon>mdi-plus</v-icon>
        <v-dialog max-width="400"  v-model="dialog" activator="parent">
          <v-card>
            <v-card-title>
              <h1 class="text-h5">{{'Agregar categoría'}}</h1>
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                          v-model="fields.name.fieldValue"
                          v-bind="fields.name.fieldPropsValue"
                          label="Nombre de la categoría"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                          hint="Ejemplo: 18-25 años | 90-89"
                          v-model="fields.age_range.fieldValue"
                          v-bind="fields.age_range.fieldPropsValue"
                          label="Rango de edad"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                          clearable
                          v-model="fields.gender.fieldValue"
                          v-bind="fields.gender.fieldPropsValue"
                          label="Genero"
                          :items="[{id: 'male', name: 'Varonil'}, {id: 'female', name: 'Femenil'}]"
                          item-title="name"
                          item-value="id"
                      >
                        <template v-slot:item="{ props }">
                          <v-list-item  variant="flat" v-bind="props" ></v-list-item>
                        </template>
                      </v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions class="d-flex justify-center align-center">
              <v-btn
                  variant="elevated"
                  color="primary"
                  block
                  @click="createCategory"
              >
                Agregar categoría
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </template>
  </v-tooltip>

</template>