<script lang="ts" setup>
import AppBar from "~/components/layout/AppBar.vue";
import "vue3-perfect-scrollbar/style.css";
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

// Propiedades del componente
defineProps<{
  locations: Location[];
}>();

// Función para capitalizar
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
      monday: { start: "08:00", end: "20:00" },
      tuesday: { start: "10:00", end: "18:00" },
      wednesday: null,
      thursday: null,
      friday: { start: "08:00", end: "20:00" },
      saturday: { start: "09:00", end: "14:00" },
      sunday: null,
    },
    tags: [
      { id: 1, name: "Lun." },
      { id: 2, name: "Mar." },
      { id: 2, name: "Mie." },
      { id: 3, name: "Jue." },
      { id: 3, name: "Vie." },
      { id: 3, name: "Sab." },
      { id: 3, name: "Dom." },
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
          <PrimaryBtn
            text="Crear locacion"
            icon="futzo-icon:plus"
            variant="tonal"
            class="mr-8"
          ></PrimaryBtn>
        </template>
      </AppBar>
    </template>
    <template #default>
      <v-container fluid>
        <v-row>
          <v-col cols="12" lg="4" md="4">
            <v-card class="futzo-rounded">
              <v-card-item>
                <v-card-title class="text-h6"> Estadio Central</v-card-title>
                <v-card-subtitle>
                  <span class="text-caption grey--text">
                    Av. Principal #123, Ciudad Central
                  </span>
                </v-card-subtitle>
              </v-card-item>
              <v-card-text>
                <v-expansion-panels>
                  <v-expansion-panel :height="30" class="futzo-rounded">
                    <v-expansion-panel-title v-slot="{ expanded }">
                      <v-row no-gutters>
                        <v-col class="d-flex justify-start" cols="4">
                          <v-switch density="compact" label="Lunes" />
                        </v-col>
                        <v-col
                          class="d-flex justify-start align-center text-grey"
                          cols="8"
                        >
                          <v-fade-transition leave-absolute>
                            <span
                              v-if="expanded"
                              key="0"
                              class="d-flex align-center"
                            >
                              Enter a name for the trip
                            </span>
                            <span v-else key="1"> 10:00 AM - 19:00 PM</span>
                          </v-fade-transition>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-title>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </PageLayout>
</template>
