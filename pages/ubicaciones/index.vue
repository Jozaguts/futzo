<script lang="ts" setup>
import AppBar from "~/components/layout/AppBar.vue";
import NoLocations from "~/components/pages/ubicaciones/NoLocations.vue";
import DialogLocation from "~/components/pages/ubicaciones/dialog/index.vue";
import LocationCardContainer from "~/components/pages/ubicaciones/LocationCardContainer.vue";
import ConfirmDialog from "~/components/shared/confirm-dialog.vue";
import {useLocationStore} from "~/store";

const {isEdition, locationDialog, locationToDelete} = storeToRefs(useLocationStore())

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
const showStoreLocationDialog = () => {
  isEdition.value = false
  locationDialog.value = true
}
const isLoading = ref(false)
const deleteLocationHandler = () => {
  isLoading.value = true
  useLocationStore().deleteLocation()
      .finally(() => {
        isLoading.value = false
      })
}
</script>

<template>
  <PageLayout>
    <template #app-bar>
      <AppBar>
        <template #buttons>
          <div class="d-flex">
            <SearchInput placeholder="Busca una ubicación…" :min-width="320" class="mr-2" @searching="(e)=> console.log(e)"/>
            <PrimaryBtn
                :disabled="false"
                text="Crear ubicación"
                icon="futzo-icon:plus"
                variant="tonal"
                class="mr-8"
                @click="showStoreLocationDialog"
            ></PrimaryBtn>
          </div>
        </template>
      </AppBar>
    </template>
    <template #default>
      <NoLocations/>
      <DialogLocation/>
      <LocationCardContainer/>
      <ConfirmDialog
          v-model:model="locationToDelete.show"
          v-model:loading="isLoading"
          title="¿Estás seguro que quieres eliminar esta ubicación?"
          @action-confirmed="deleteLocationHandler"
      />
    </template>
  </PageLayout>
</template>
