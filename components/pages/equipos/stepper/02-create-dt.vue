<script setup lang="ts">
import { storeToRefs } from "pinia";
import DragDropImage from "~/components/pages/torneos/drag-drop-image.vue";
import type { ImageForm } from "~/models/tournament";
import { useTeamStore } from "~/store/useTeamStore";
import useSchemas from "~/composables/useSchemas";
import { VPhoneInput } from "v-phone-input";

const dragDropImageRef = ref(null);
const imageForm = ref<ImageForm>({
  file: null,
  name: "",
  size: 0,
});

const teamStore = useTeamStore();
const { teamStoreRequest } = storeToRefs(teamStore);

const { handleSubmit, resetForm, fields, validate, setValues } =
  useSchemas("create-coach");

const saveImage = (file: File) => {
  imageForm.value.file = file;
  imageForm.value.name = file.name;
  imageForm.value.size = file.size;
  fields.image.fieldValue = file;
};
const removeImage = () => {
  imageForm.value.file = null;
  imageForm.value.name = "";
  imageForm.value.size = 0;
  fields.image.fieldValue = null;
};
onMounted(() => {
  if (teamStoreRequest.value?.coach) {
    setValues({ ...teamStoreRequest.value.coach });
    if (teamStoreRequest.value.coach.image) {
      dragDropImageRef.value.loadImage();
    }
  }
});
defineExpose({
  validate,
  handleSubmit,
});
</script>
<template>
  <v-container class="container" style="min-height: 480px">
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Nombre del DT* </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-text-field
          placeholder="p.ej. Luis Veloz"
          outlined
          v-model="fields.name.fieldValue"
          v-bind="fields.name.fieldPropsValue"
          density="compact"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Imagen del usuario* </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <DragDropImage
          ref="dragDropImageRef"
          :image="imageForm"
          @image-dropped="saveImage"
          @remove-image="removeImage"
        />
        <span
          class="text-error text-caption"
          :class="
            fields.image.fieldPropsValue['error-messages'][0] ? 'ml-2' : ''
          "
          >{{ fields.image.fieldPropsValue["error-messages"][0] ?? "" }}</span
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Correo electrónico* </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-text-field
          placeholder="p.ej. luis@futzo.io "
          outlined
          v-model="fields.email.fieldValue"
          v-bind="fields.email.fieldPropsValue"
          density="compact"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Teléfono </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <client-only>
          <VPhoneInput
            variant="plain"
            :singleLine="true"
            v-model="fields.phone.fieldValue"
            class="phone-input"
            display-format="international"
            example="52 1 55 1234 5678"
            validate-on="blur lazy"
            :invalidMessage="
              ({ label, example }) => {
                return `${label} debe ser un numero valido (${example}).`;
              }
            "
          >
          </VPhoneInput>
          <small class="text-error">{{
            fields.phone.fieldPropsValue["error-messages"][0]
          }}</small>
        </client-only>
      </v-col>
    </v-row>
  </v-container>
</template>
