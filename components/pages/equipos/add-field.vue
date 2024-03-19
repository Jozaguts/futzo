<script lang="ts" setup>
import {storeToRefs} from "pinia";
import {useTeamStore} from "~/store/useTeamStore";

const days = ref<object[]>([
    {
        name: 'Lunes',
        value: 1
    },
    {
        name: 'Martes',
        value: 2
    },
    {
        name: 'Miercoles',
        value: 3
    },
    {
        name: 'Jueves',
        value: 4
    },
    {
        name: 'Viernes',
        value: 5
    },
    {
        name: 'Sabado',
        value: 6
    },
    {
        name: 'Domingo',
        value: 7
    }
]);
const showError = ref(false);
const dialog = ref(false);
const hours = computed(() => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
        hours.push(i < 10 ? `0${i}:00` : `${i}:00`);
        hours.push(i < 10 ? `0${i}:30` : `${i}:30`);
    }
    return hours;
});
const {locations,locationModel,availableDays} = storeToRefs(useTeamStore())
const {searchLocation,storeField} = useTeamStore()
const saveDate = (day) => {
  if (!day.open || !day.close) {
    day.error = true;
    showError.value = true;
    return;
  }else {
    day.error = false;
    day.saved = true;
    showError.value = false;
  }

};
const removeDate = (day) => {
  day.saved = false;
  day.open = '';
  day.close = '';
};
const handleStoreLocation = () => {
  storeField()
      .then(async () => {
        dialog.value = false;
      })
}
</script>
<template>
  <v-dialog v-model="dialog" max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-chip  v-bind="activatorProps" class="float-right mt-2" prepend-icon="mdi-plus" border link >Agregar campo</v-chip>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card
          prepend-icon="mdi-soccer-field"
          title="Agregar cancha de juego"
      >
        <v-card-text>
          <v-form>
           <v-container>
             <v-row>
               <v-col>
                 <p class="text-body-2 text-medium-emphasis">
                   El campo de juego <span class=" text-high-emphasis"> no</span> esta relacionado con un equipo en especifico, es un lugar donde se llevarán a cabo los partidos
                 </p>
               </v-col>
             </v-row>
             <v-row >
               <v-col cols="12">
                 <v-text-field
                     v-model="locationModel.name"
                     label="Nombre"
                     outlined
                     dense
                     required
                 ></v-text-field>
               </v-col>
               <v-col cols="12">
                 <v-autocomplete
                     label="Dirección"
                     v-model="locationModel.address"
                     :items="locations"
                     item-title="name"
                     item-value="address"
                     outlined
                     @update:search="searchLocation($event)"
                 >
                    <template v-slot:item="{ props, item }">
                      <v-list-item
                          v-bind="props"
                          :title="item.raw.title"
                          :subtitle="item.raw.address"
                      ></v-list-item>
                    </template>
                   <template v-slot:selection="{ item }">
                      <v-list-item
                          two-line
                      >
                          <v-list-item-title v-text="item.raw.title"></v-list-item-title>
                          <v-list-item-subtitle v-text="item.raw.address"></v-list-item-subtitle>
                      </v-list-item>
                   </template>

                 </v-autocomplete>
               </v-col>
               <v-col cols="12">
                 Disponibilidad
               </v-col>
               <v-col v-auto-animate  cols="12">
               <v-alert v-if="showError" type="error">Debe seleccionar una hora de apertura y cierre</v-alert>
               </v-col>
              <v-col cols="12">
                <div class="days_container">
                  <div class="day_container" v-for="day in availableDays" :key="day" v-auto-animate>
                    <p class="day_name">{{day.name}}</p>
                    <v-select class="open_select" v-model="day.open" label="Apertura" :items="hours" />
                    <v-select  class="close_select" v-model="day.close" label="Cierre" :items="hours" />
                    <v-btn class="add_btn" size="small" icon="mdi-plus" variant="tonal" rounded="10" @click="saveDate(day)"></v-btn>
                    <v-btn @click="removeDate(day)" class="clear_btn" size="small" v-if="day.saved" icon="mdi-close" variant="tonal" rounded="10" color="secondary"></v-btn>
                  </div>
                </div>
              </v-col>
             </v-row>
             <v-row>
               <v-col class="">
                 <v-btn
                     block
                     text="Guardar"
                     @click="handleStoreLocation"
                 ></v-btn>
               </v-col>
             </v-row>
           </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>
<style>
  .days_container{
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
  }
  .day_container{
    margin: 1rem 0;
    display: grid;
    grid-template-columns: 75px 1fr 1fr 45px 45px;
    grid-template-rows: auto;
    align-items: center;
    gap: 1rem;
  }
  @media (max-width: 600px) {
    .days_container {
      padding: 0;
    }
    .day_container {
      display: flex;
      flex-wrap: wrap;
    }
    .day_name {
     flex: 0 0 100%;
    }
    .open_select, .close_select {
      flex: 0 0 55%;
    }
    .add_btn, .clear_btn {
      flex: 0 0 auto
    }
    .open_select {
      order: 1;
    }
    .add_btn {
      order: 2;
    }
    .close_select {
      order: 4;
    }
    .clear_btn {
      order: 3;
    }

  }


</style>