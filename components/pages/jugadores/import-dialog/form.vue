<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useDropZone } from "@vueuse/core";

const dropZoneRef = ref<HTMLDivElement>();
const refInputFile = ref<HTMLInputElement>();
const file = defineModel<File>("file");

function onDrop(files: File[] | null) {
  console.log({ files });
}

onMounted(() => {
  const { isOverDropZone } = useDropZone(dropZoneRef, {
    onDrop,
    multiple: true,
    preventDefaultForUnhandled: false,
  });
});
</script>

<template>
  <v-card-text ref="dropZoneRef" @dragover.prevent @drop.prevent>
    <div class="import-form-container">
      <div class="icon-container">
        <Icon name="futzo-icon:upload" size="24" />
      </div>
      <div class="cta-container">
        <button class="btn" @click="() => refInputFile?.click()">
          Clic para subir archivo
        </button>
        <span> o arrastra y suelta</span>
        <p class="conditions">XLS o XLSX (tamaño máximo 8MB)</p>
        <v-file-input
          v-model="file"
          ref="refInputFile"
          hide-input
          hide-details
          class="d-none"
        ></v-file-input>
      </div>
    </div>
  </v-card-text>
</template>
<style scoped lang="sass">
.import-form-container
    border-radius: 12px
    border-width: 1px
    border-color: #e4e7ec
    border-style: solid
    padding: 16px 24px
    gap: 12px
    color: #FFFFFF
    min-height: 126px
    display: flex
    align-items: center
    flex-direction: column

    > .icon-container
        width: 40px
        height: 40px
        border-radius: 8px
        border-width: 1px
        border-style: solid
        background: #FFFFFF
        border-color: #E4E7EC
        box-shadow: 0 1px 2px 0 rgba(16, 24, 40, .5)
        display: flex
        justify-content: center
        align-items: center

    > .cta-container
        color: #475467
        text-align: center
        font-weight: 400
        font-size: 14px
        line-height: 20px

        > .btn
            font-size: 14px
            line-height: 20px
            font-weight: 600
            color: #6400E6

        > .conditions
            font-size: 12px
            line-height: 18px
</style>
