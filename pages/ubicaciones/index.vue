<script lang="ts" setup>
import AppBar from "~/components/layout/AppBar.vue";
import NoLocations from "~/components/pages/ubicaciones/NoLocations.vue";
import DialogLocation from "~/components/pages/ubicaciones/dialog/index.vue";

// Define los tipos para las propiedades
type Schedule = {
  start: string;
  end: string;
};

type Availability = {
  monday?: Schedule | null;
  tuesday?: Schedule | null;
  wednesday?: Schedule | null;
  thursday?: Schedule | null;
  friday?: Schedule | null;
  saturday?: Schedule | null;
  sunday?: Schedule | null;
};

type Tag = {
  id: number;
  name: string;
};

type Address = {
  street: string;
  city: string;
};

type Location = {
  id: number;
  name: string;
  address: Address;
  availability: Availability;
  tags: Tag[];
};

const capitalize = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
const locations: Location[] = [
  {
    id: 1,
    name: "Estadio Central",
    address: {
      street: "Av. Principal #123",
      city: "Ciudad Central",
    },
    availability: {
      monday: {start: "08:00", end: "20:00"},
      tuesday: {start: "10:00", end: "18:00"},
      wednesday: null,
      thursday: null,
      friday: {start: "08:00", end: "20:00"},
      saturday: {start: "09:00", end: "14:00"},
      sunday: null,
    },
    tags: [
      {id: 1, name: "Lun."},
      {id: 2, name: "Mar."},
      {id: 2, name: "Mie."},
      {id: 3, name: "Jue."},
      {id: 3, name: "Vie."},
      {id: 3, name: "Sab."},
      {id: 3, name: "Dom."},
      // { id: 1, name: "Césped Natural" },
      // { id: 2, name: "Estadio Cubierto" },
      // { id: 3, name: "Capacidad: 10,000" },
    ],
  },
];
</script>

<template>
  <PageLayout>
    <template #app-bar>
      <AppBar>
        <template #buttons>
          <div class="d-flex">
            <SearchInput placeholder="Busca una ubicación…" :min-width="320" class="mr-2" @searching="(e)=> console.log(e)"/>
            <PrimaryBtn
                text="Crear ubicación"
                icon="futzo-icon:plus"
                variant="tonal"
                class="mr-8"
            ></PrimaryBtn>
          </div>
        </template>
      </AppBar>
    </template>
    <template #default>
      <NoLocations/>
      <DialogLocation/>
    </template>
  </PageLayout>
</template>
