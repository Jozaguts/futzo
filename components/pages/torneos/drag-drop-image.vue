<script setup lang="ts">
import type {ImageForm} from "~/models/tournament";
const state = reactive({
  dragging: false,
  dropped: false,
  interval: null as number,
  value: 10,
  bufferValue: 20,
})
const border = computed(() => {

  if (image.value.hasError) return '';
  return (!state.dragging && !state.dropped) ? 'primary thin'  : 'primary sm opacity-100';
})
const emits = defineEmits(['removeImage','imageDropped'])
const MAX_SIZE = 2.0;

const props = defineProps<{ image: ImageForm }>()
const image = ref(props.image)
const formatImageName = computed(() => {
  return image.value.name.replace(/[-_]/g, ' ')
      .charAt(0).toUpperCase() + image.value.name.slice(1)
      .replace(/[-_]/g, ' ')
      .substring(0, 20) + (image.value.name.length > 20 ? '...' : '')
})
const validateSize  = () =>{
  const imageSize = image.value.size / (1024 * 1024);
  if (imageSize > MAX_SIZE) {
    image.value.errors = {
      name: imageSize.toFixed(2) + 'MB',
      description: 'La imagen es muy pesada, prueba con otra.',
      action: 'reintentar'
    }
    image.value.hasError = true;
  }

}

const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  state.dragging = false;
  const files = e.dataTransfer.files;
  if (files.length) {
    startBuffer();
    state.dropped = true;
    image.value.file = files[0];
    image.value.name = files[0].name;
    image.value.size = files[0].size;

    emits('imageDropped', files[0])
  }
}
const startBuffer =  () => {
  const updateValue = (val) => Math.min(val + Math.random() * 10, 100);
  state.interval = setInterval(() => {
    if (image.value.hasError){
      clearInterval(state.interval)
      return;
    }
    state.value = updateValue(state.value);
    state.bufferValue = updateValue(state.bufferValue);
  }, 100)

}
const removeImage = () =>{
  image.value.file = null;
  image.value.name = '';
  image.value.size = 0;
  image.value.hasError = false;
  image.value.errors = {
    name: '',
    description: '',
    action: ''
  }
  state.dragging = false;
  state.dropped = false;
  state.value = 10;
  state.bufferValue = 20;
  emits('removeImage')
}
watch(() => state.value, (newValue) => {
  if (newValue >= 100) {
    clearInterval(state.interval)
  }
})
watch(() => image.value.size, () => {
  validateSize()
})
onBeforeMount(() => {
  clearInterval(state.interval)
})
</script>
<template>
  <div class="d-flex" :class="image.hasError ? ' border-error border-md border-opacity-100  rounded rounded-lg' : ''">
    <v-avatar :color="!state.dropped ? 'background' : 'surface' " size="64" class="mr-2">
      <nuxt-icon v-if="!state.dropped" name="image-plus" filled class="image-plus"></nuxt-icon>
      <nuxt-icon v-if="state.dropped" name="file-type-img" filled class="file-type-img"></nuxt-icon>
    </v-avatar>
    <v-sheet
        :border="border"
        width="100%"
        class="d-flex flex-column align-center rounded-lg pa-2"
        @dragover.prevent
        @drop.prevent="handleDrop"
        @dragenter="state.dragging = true"
        @drop="state.dragging = false"
    >
      <div class="d-flex justify-center align-center flex-column" v-if="!state.dropped">
        <div>
          <v-btn variant="text" color="primary" class="text-body-1 px-1" >Haz clic para añadir</v-btn>
          <span class="text-body-1">o arrastra aquí</span>
        </div>
        <p class="text-caption">SVG, PNG o JPG (max. 1080x1080px)</p>
      </div>
      <div v-else class="d-flex justify-space-between align-start h-100 w-100 flex-column">
        <div class="d-flex justify-space-between w-100 align-center">
          <p class="text-body-1 ">{{image.hasError ? image.errors?.name : formatImageName}}</p>
          <v-btn
              :icon="true"
              size="default"
              slim
              flat
              density="compact"
              color="background"
              @click="removeImage"
          >

            <nuxt-icon v-if="!image.hasError" filled name="trash" class="trash"></nuxt-icon>
            <nuxt-icon v-else filled  name="trash-error" class="trash-error" ></nuxt-icon>
          </v-btn>
        </div>
        <div  v-if="!image.hasError"  class="d-flex w-100 justify-center align-center">
          <v-progress-linear
              v-model="state.value"
              :buffer-value="state.bufferValue"
              color="primary"
              rounded
              max="100"
          />
          <span class="ml-2 text-caption"> {{state.value.toFixed(0)}}%</span>
        </div>
        <div  v-else  class="w-100">
            <p class="text-caption ">{{image.errors?.description}}</p>
            <v-btn  @click="removeImage" density="compact" class="pa-0 text-capitalize" variant="text">{{image.errors?.action}}</v-btn>
        </div>
      </div>

    </v-sheet>
  </div>
</template>