<script setup lang="ts">
  import type { DragAndDrop } from '~/interfaces'
  import { MAX_SIZE } from '~/utils/constants'

  const image = defineModel<File | null>({ default: null })
  const state = reactive<DragAndDrop>({
    dragging: false,
    dropped: false,
    interval: 1,
    value: 10,
    bufferValue: 20,
    image: {
      file: image.value,
      name: '',
      size: 0,
      hasError: false,
      errors: {
        name: null,
        description: null,
        action: null,
      },
    },
  })
  const inputRef = ref<HTMLElement>()
  const border = computed(() => {
    if (state.image.hasError) return ''
    return `primary ${state.dragging || state.dropped ? 'sm opacity-100' : 'thin'}`
  })

  const imageName = computed(() => {
    const formattedName = state.image.name.replace(/[-_]/g, ' ')
    const capitalized = formattedName.charAt(0).toUpperCase() + formattedName.slice(1)
    return capitalized.length > 20 ? `${capitalized.substring(0, 20)}...` : capitalized
  })
  const validateSize = () => {
    const imageSizeMB = Number((state.image.size / (1024 * 1024)).toFixed(2))
    if (imageSizeMB > MAX_SIZE) {
      state.image.errors = {
        name: `${imageSizeMB}MB`,
        description: 'La imagen es muy pesada, prueba con otra.',
        action: 'reintentar',
      }
      state.image.hasError = true
    }
  }

  const eventHandler = (e: DragEvent | Event) => {
    e.preventDefault()
    state.dragging = false
    let files = [] as File[]
    if (e.type === 'drop') {
      const event = e as DragEvent
      files = event?.dataTransfer?.files as unknown as File[]
    } else if (e.type === 'change') {
      files = (e.target as HTMLInputElement).files as unknown as File[]
    }
    if (files.length) {
      startBuffer()
      state.dropped = true
      image.value = files[0]
      state.image.name = files[0].name
      state.image.size = files[0].size
    }
  }
  const startBuffer = () => {
    const updateValue = (val: number) => Math.min(val + Math.random() * 10, 100)
    state.interval = setInterval(() => {
      if (state.image.hasError) {
        clearInterval(state.interval)
        return
      }
      state.value = updateValue(state.value)
      state.bufferValue = updateValue(state.bufferValue)
    }, 100) as unknown as number
  }
  const removeImage = () => {
    state.image.name = ''
    state.image.size = 0
    state.image.hasError = false
    state.image.errors = {
      name: '',
      description: '',
      action: '',
    }
    state.dragging = false
    state.dropped = false
    state.value = 10
    state.bufferValue = 20
    image.value = null
  }
  const loadImage = () => {
    state.value = 100
    state.bufferValue = 100
    state.dropped = true
    state.image.name = 'imagen.jpg'
  }
  watch(
    () => state.value,
    (newValue) => {
      if (newValue >= 100) {
        clearInterval(state.interval)
      }
    }
  )
  watch(
    () => state.image.size,
    () => {
      validateSize()
    }
  )
  onBeforeMount(() => {
    clearInterval(state.interval)
  })
  const showInput = () => {
    const input = inputRef.value?.$el?.querySelector('input')
    input.click()
  }
  defineExpose({
    loadImage,
  })
</script>
<template>
  <div
    class="d-flex"
    :class="state.image.hasError ? ' border-error border-md border-opacity-100  rounded rounded-lg' : ''"
  >
    <v-avatar :color="!state.dropped ? 'background' : 'surface'" size="64" class="mr-2">
      <Icon v-if="!state.dropped" name="futzo-icon:image-plus" class="image-plus"></Icon>
      <Icon v-if="state.dropped" name="futzo-icon:file-type-img" class="file-type-img"></Icon>
    </v-avatar>
    <v-sheet
      :border="border"
      width="100%"
      class="d-flex flex-column align-center rounded-lg pa-2"
      @dragover.prevent
      @drop.prevent="eventHandler"
      @dragenter="state.dragging = true"
      @drop="state.dragging = false"
    >
      <div class="d-flex justify-center align-center flex-column" v-if="!state.dropped">
        <div>
          <v-file-input :hidden="true" class="d-none" ref="inputRef" @change="eventHandler"></v-file-input>
          <v-btn variant="text" color="primary" class="text-body-1 px-1" @click="showInput"
            >Haz clic para añadir
          </v-btn>
          <span class="text-body-1">o arrastra aquí</span>
        </div>
        <p class="text-caption">SVG, PNG o JPG (max. 1080x1080px)</p>
      </div>
      <div v-else class="d-flex justify-space-between align-start h-100 w-100 flex-column">
        <div class="d-flex justify-space-between w-100 align-center">
          <p class="text-body-1">
            {{ state.image.hasError ? state.image.errors?.name : imageName }}
          </p>
          <v-btn :icon="true" size="default" slim flat density="compact" color="background" @click="removeImage">
            <Icon v-if="!state.image.hasError" name="futzo-icon:trash" class="trash"></Icon>
            <Icon v-else name="futzo-icon:trash-error" class="trash-error"></Icon>
          </v-btn>
        </div>
        <div v-if="!state.image.hasError" class="d-flex w-100 justify-center align-center">
          <v-progress-linear
            v-model="state.value"
            :buffer-value="state.bufferValue"
            color="primary"
            rounded
            max="100"
          />
          <span class="ml-2 text-caption"> {{ state.value.toFixed(0) }}%</span>
        </div>
        <div v-else class="w-100">
          <p class="text-caption">{{ state.image.errors?.description }}</p>
          <v-btn @click="removeImage" density="compact" class="pa-0 text-capitalize" variant="text">
            {{ state.image.errors?.action }}
          </v-btn>
        </div>
      </div>
    </v-sheet>
  </div>
</template>
