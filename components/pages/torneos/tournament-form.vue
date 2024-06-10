<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useCategoryStore} from "~/store/useCategoryStore";
import DragDropImage from "~/components/pages/torneos/drag-drop-image.vue";
import type {TournamentForm } from "~/models/tournament";
import {useTeamStore} from "~/store/useTeamStore";
import Calendar from "~/components/pages/torneos/calendar.vue";
import {useGlobalStore, useTournamentStore} from "~/store";
import useSchemas from "~/composables/useSchemas";
const {categories,formats} = storeToRefs(useCategoryStore());
const {locations} = storeToRefs(useTeamStore());
const tournamentStore = useTournamentStore();
const globalStore = useGlobalStore();
const form = ref<TournamentForm>({
  name: '',
  category_id: null,
  tournament_format_id: null,
  club: '',
  city: '',
  address: '',
  dates: [],
  prize: '',
  description: '',
  image: {
    file: null,
    name: '',
    size: 0,
  }
})
const {
  handleSubmit,
  resetForm,
  fields
} = useSchemas('create-tournament')
const saveImage = (file: File) => {
  form.value.image.file = file;
  form.value.image.name = file.name;
  form.value.image.size = file.size;
  fields.image.fieldValue = file;
}
const removeImage = () => {
  form.value.image.file = null;
  form.value.image.name = '';
  form.value.image.size = 0;
  fields.image.fieldValue = null;
}
const setDates = (dates: string[]) => {
  fields.start_date.fieldValue = dates[0];
  fields.end_date.fieldValue = dates[1];
}
const storeHandler = handleSubmit(async (values) => {
  const formData = new FormData();
  for (const key in values) {

    if (values[key]?.length && values[key][0] instanceof File) {
      formData.append(key, values[key][0]);
    } else if(typeof values[key] === 'object' && !(values[key] instanceof File)) {
      formData.append(key, JSON.stringify(values[key]));
    }else if (values[key]) {
      formData.append(key, values[key]);
    }
  }
  // //validate form
  tournamentStore.storeTournament(formData)
      .then((response) => {
        if(response){
          tournamentStore.loadTournaments();
          tournamentStore.dialog = false;
          resetForm();
          globalStore.showSuccessNotification({message: 'Torneo creado correctamente'});
        }

      })
      .catch((error) => {
        console.error(error)
      });
});

</script>
<template>
  <v-container class="container">
    <v-row>
      <v-col cols="12" lg="4" md="4">
             <span class="text-body-1">
                Nombre del torneo*
             </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-text-field
            placeholder="p.ej. Torneo de verano"
            outlined
            v-model="fields.name.fieldValue"
            v-bind="fields.name.fieldPropsValue"
            density="compact"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
              <span class="text-body-1">
                  Imagen del torneo*
              </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <DragDropImage
            :image="form.image"
            @image-dropped="saveImage"
            @remove-image="removeImage"
        />
        <span class="text-error text-caption ml-2">{{fields.image.fieldPropsValue['error-messages'][0] ?? '' }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
              <span class="text-body-1">
                  Categoría*
              </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-select
            no-data-text="No hay categorías"
            :items="categories"
            density="compact"
            item-title="name"
            item-value="id"
            placeholder="Categoría"
            menu-icon="mdi-chevron-down"
            v-model="fields.category_id.fieldValue"
            v-bind="fields.category_id.fieldPropsValue"
        >
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
              <span class="text-body-1">
                  Formato*
              </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-select
            no-data-text="No hay formatos"
            :items="formats"
            density="compact"
            item-title="name"
            item-value="id"
            placeholder="Formato"
            menu-icon="mdi-chevron-down"
            v-model="fields.tournament_format_id.fieldValue"
            v-bind="fields.tournament_format_id.fieldPropsValue"
        >
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" >
              <v-tooltip activator="parent" location="end"  max-width="300">
               {{item.raw.description}}
              </v-tooltip>
            </v-list-item>
          </template>
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
              <span class="text-body-1">
                  Club/Lugar*
              </span>
      </v-col>
      <v-col  cols="12" lg="8" md="8">
        <v-text-field
            placeholder="p ej. Club Deportivo Las Americas"
            density="compact"
            variant="outlined"
            v-model="fields.location.fieldValue"
            v-bind="fields.location.fieldPropsValue"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
              <span class="text-body-1">
                  Ciudad*
              </span>
      </v-col>
      <v-col  cols="12" lg="8" md="8">
        <v-text-field
            placeholder="p.ej. Puerto Vallarta"
            density="compact"
            variant="outlined"
            v-model="fields.city.fieldValue"
            v-bind="fields.city.fieldPropsValue"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
              <span class="text-body-1">
                  Dirección*
              </span>
      </v-col>
      <v-col  cols="12" lg="8" md="8">
        <v-text-field
            placeholder="p.ej. Las Américas #323 Centro, Puerto Vallarta."
            density="compact"
            variant="outlined"
            v-model="fields.address.fieldValue"
            v-bind="fields.address.fieldPropsValue"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
              <span class="text-body-1">
                 Fechas del torneo*
              </span>
      </v-col>
      <v-col  cols="12" lg="8" md="8" id="test">
        <Calendar @selected-dates="setDates" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
              <span class="text-body-1">
                  Premio*
              </span>
      </v-col>
      <v-col  cols="12" lg="8" md="8">
        <v-text-field
            placeholder="p.ej. 10:00 a 18:00"
            density="compact"
            variant="outlined"
            v-model="fields.prize.fieldValue"
            v-bind="fields.prize.fieldPropsValue"
        >
          <template #append-inner>
            <nuxt-icon name="help-circle" filled class="cursor-pointer"></nuxt-icon>
           <v-tooltip activator="parent">
             Este premio será otorgado al finalizar el torneo.
           </v-tooltip>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
              <span class="text-body-1">
                  Descripción*
              </span>
      </v-col>
      <v-col  cols="12" lg="8" md="8">
        <v-textarea
            v-model="fields.description.fieldValue"
            v-bind="fields.description.fieldPropsValue"
            placeholder="Una breve descripción del torneo..."
            variant="outlined"
            dense
            rows="2"
            class="rounded-lg"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
          <v-btn variant="outlined" block color="secondary" size="large">Cancelar</v-btn>
      </v-col>
      <v-col cols="6" >
          <v-btn variant="elevated" block color="primary" size="large" @click="storeHandler">Crear torneo</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
