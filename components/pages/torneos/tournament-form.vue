<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useCategoryStore} from "~/store/useCategoryStore";
import DragDropImage from "~/components/pages/torneos/drag-drop-image.vue";
import type {ImageForm, TournamentForm, TournamentStoreRequest} from "~/models/tournament";
import {useTeamStore} from "~/store/useTeamStore";
import Calendar from "~/components/pages/torneos/calendar.vue";
import {useGlobalStore, useTournamentStore} from "~/store";
import useSchemas from "~/composables/useSchemas";
const tournamentStore = useTournamentStore();
const dragDropImageRef = ref(null);
const calendarRef = ref(null)
const imageForm =  ref<ImageForm>({
  file: null,
  name: '',
  size: 0
})
const {tournamentToEdit,tournamentId} = storeToRefs(useTournamentStore());
const {categories,formats} = storeToRefs(useCategoryStore());
const {locations} = storeToRefs(useTeamStore());
let locationsFind = ref([]);
const {
  handleSubmit,
  resetForm,
  fields
} = useSchemas('create-tournament')
onMounted(async () => {
  if (tournamentId.value && tournamentToEdit.value){

    if (tournamentStore.tournamentToEdit.image){
      dragDropImageRef.value.loadImage();
    }

    calendarRef.value.setDatesFromRequest([
      convertToDateFormat(tournamentToEdit.value.start_date),
      convertToDateFormat(tournamentToEdit.value.end_date)
    ])
    resetForm({values:  {
        name: tournamentToEdit.value.name,
        category_id: tournamentToEdit.value.category_id,
        tournament_format_id: tournamentToEdit.value.tournament_format_id,
        prize: tournamentToEdit.value.prize,
        description: tournamentToEdit.value.description,
        location: tournamentToEdit.value.location,
        city: tournamentToEdit.value.city,
        address: tournamentToEdit.value.address,
        image: tournamentToEdit.value.image,
      }})
  }
})
function convertToDateFormat(dateString) {
  const [day, month, year] = dateString.split('/');
  const fullYear = `20${year}`; // Asumiendo que el año es 21 para 2021
  return new Date(`${month}/${day}/${fullYear}`);
}
const saveImage = (file: File) => {
  imageForm.value.file = file;
  imageForm.value.name = file.name;
  imageForm.value.size = file.size;
  fields.image.fieldValue = file;
}
const removeImage = () => {
  imageForm.value.file = null;
  imageForm.value.name = '';
  imageForm.value.size = 0;
  fields.image.fieldValue = null;
}
const setDates = (dates: string[]) => {
  fields.start_date.fieldValue = dates[0];
  fields.end_date.fieldValue = dates[1];
}
const isEdit = computed(() => !!tournamentId.value)
const handleSelectLocation = (value: any) => {
  console.log(value)
  fields.address.fieldValue = value.description;
  fields.city.fieldValue = value.terms[2].value
}

const search = useDebounceFn(async (place: string) => {
  if (!window.google || !window.google.maps || !window.google.maps.places) {
    console.error('Google Maps JavaScript API library is not loaded.');
    return [];
  }
  const autocompleteService = new window.google.maps.places.AutocompleteService()
  return new Promise((resolve, reject) => {
    autocompleteService.getPlacePredictions({ input: place }, (predictions, status) => {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
        console.error('Error fetching place predictions:', status);
        resolve([]);
        return;
      }
      resolve(predictions);
    })
  })
},400);
const searchHandler = async(place: string) =>{
  const response =  await search(place)
   if (response){
     locationsFind.value = response;
   }

}
const textButton = computed(() => {
  return isEdit.value ? 'Editar torneo' : 'Crear torneo'
})
const submitHandler = handleSubmit(async (values: TournamentForm) => {
  const formData = new FormData ();

  let tournamentStoreRequest: TournamentStoreRequest = {
    category_id: values.category_id,
    description: values.description,
    end_date: values.end_date,
    location: values.location,
    name: values.name,
    prize: values.prize,
    start_date: values.start_date,
    tournament_format_id: values.tournament_format_id,
  }
  if (values.image instanceof File ){
    tournamentStoreRequest.image = values.image;
  }

  for (const key in tournamentStoreRequest) {
    if (values[key]?.length && values[key][0] instanceof File) {
      formData.append(key, values[key][0]);
    } else if(typeof values[key] === 'object' && !(values[key] instanceof File)) {
      formData.append(key, JSON.stringify(values[key]));
    }else if (values[key]) {
      formData.append(key, values[key]);
    }
  }
  if (isEdit.value){
    tournamentStore.updateTournament(tournamentId.value, formData)
        .then((response) => {
          if(response){
            tournamentStore.loadTournaments();
            tournamentStore.dialog = false;
            resetForm();
            useGlobalStore().showSuccessNotification({message: 'Torneo actualizado correctamente'});
          }
        })
        .catch((error) => {
          console.error(error)
        });
  }else {
    tournamentStore.storeTournament(formData)
        .then((response) => {
          if(response){
            tournamentStore.loadTournaments();
            tournamentStore.dialog = false;
            resetForm();
            useGlobalStore().showSuccessNotification({message: 'Torneo creado correctamente'});
          }

        })
        .catch((error) => {
          console.error(error)
        });
  }
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
            ref="dragDropImageRef"
            :image="imageForm"
            @image-dropped="saveImage"
            @remove-image="removeImage"
        />
        <span class="text-error text-caption " :class="fields.image.fieldPropsValue['error-messages'][0] ? 'ml-2' : ''">{{fields.image.fieldPropsValue['error-messages'][0] ?? '' }}</span>
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
        <v-autocomplete
            v-model="fields.location.fieldValue"
            @update:modelValue="handleSelectLocation"
            :items="locationsFind"
            no-data-text="No hay resultados"
            outlined
            return-object
            hide-selected
            clear-on-select
            clearable
            no-filter
            v-bind="fields.location.fieldPropsValue"
            @update:search="searchHandler($event)"
        >
          <template v-slot:item="{ props, item }">
            <v-list-item
                v-bind="props"
                two-line
                :title="item.value.structured_formatting.main_text"
                :subtitle="item.value.structured_formatting.secondary_text"
            ></v-list-item>
          </template>
          <template v-slot:selection="{ item }">
            <v-list-item>
              <v-list-item-title v-text="item.value.structured_formatting.main_text"></v-list-item-title>
            </v-list-item>
          </template>
        </v-autocomplete>
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
            readonly
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
            readonly
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
        <Calendar ref="calendarRef" @selected-dates="setDates" />
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
          <v-btn variant="outlined" block color="secondary" density="compact" size="large">Cancelar</v-btn>
      </v-col>
      <v-col cols="6" >
          <v-btn variant="elevated" block color="primary"  density="compact" size="large" @click="submitHandler">{{textButton}}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
