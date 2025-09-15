<script setup lang="ts">
  import { Icon } from '#components'

  type VErrorProps = {
    'error-messages': string[]
  }
  import type { DragAndDrop } from '~/interfaces'
  import { INIT_IMAGE_STATE, MAX_SIZE } from '~/utils/constants'
  const image = defineModel<string | File | HTMLImageElemen>({ default: null })
  const state = ref<DragAndDrop>({ ...INIT_IMAGE_STATE })
  const inputRef = ref<HTMLElement>()
  const border = computed(() => {
    if (state.value.image.hasError) return ''
    return `primary ${state.value.dragging || state.value.dropped ? 'sm opacity-100' : 'thin'}`
  })
  const { errorMessages = { 'error-messages': [] } } = defineProps<{ errorMessages: VErrorProps }>()

  const imageName = computed(() => {
    const formattedName = state.value.image.name.replace(/[-_]/g, ' ')
    const capitalized = formattedName.charAt(0).toUpperCase() + formattedName.slice(1)
    return capitalized.length > 20 ? `${capitalized.substring(0, 20)}...` : capitalized
  })
  const validateSize = () => {
    const imageSizeMB = Number((state.value.image.size / (1024 * 1024)).toFixed(2))
    if (imageSizeMB > MAX_SIZE) {
      state.value.image.errors = {
        name: `${imageSizeMB}MB`,
        description: 'La imagen es muy pesada, prueba con otra.',
        action: 'reintentar',
      }
      state.value.image.hasError = true
    }
  }

  const eventHandler = (e: DragEvent | Event) => {
    e.preventDefault()
    state.value.dragging = false
    let files = [] as File[]
    if (e.type === 'drop') {
      const event = e as DragEvent
      files = event?.dataTransfer?.files as unknown as File[]
    } else if (e.type === 'change') {
      files = (e.target as HTMLInputElement).files as unknown as File[]
    }
    if (files.length) {
      startBuffer()
      state.value.dropped = true
      image.value = files[0]
      state.value.image.name = files[0].name
      state.value.image.size = files[0].size
    }
  }
  const startBuffer = () => {
    const updateValue = (val: number) => Math.min(val + Math.random() * 10, 100)
    state.value.interval = setInterval(() => {
      if (state.value.image.hasError) {
        clearInterval(state.value.interval)
        return
      }
      state.value.value = updateValue(state.value.value)
      state.value.bufferValue = updateValue(state.value.bufferValue)
    }, 100) as unknown as number
  }
  const removeImage = () => {
    state.value.image.name = ''
    state.value.image.size = 0
    state.value.image.hasError = false
    state.value.image.errors = {
      name: '',
      description: '',
      action: '',
    }
    state.value.dragging = false
    state.value.dropped = false
    state.value.value = 10
    state.value.bufferValue = 20
    image.value = null
  }
  const loadImage = () => {
    state.value.value = 100
    state.value.bufferValue = 100
    state.value.dropped = true
    state.value.image.name = 'imagen.jpg'
  }
  watch(
    () => state.value.value,
    (newValue) => {
      if (newValue >= 100) {
        clearInterval(state.value.interval)
      }
    }
  )
  watch(
    () => state.value.image.size,
    () => {
      validateSize()
    }
  )
  watchEffect(() => {
    if (errorMessages['error-messages'].length) {
      state.value.image.hasError = true
      state.value.image.errors = {
        name: 'Error',
        action: 'Limpiar',
        description: errorMessages['error-messages'][0] as string,
      }
    } else {
      state.value.image.hasError = false
    }
  })
  onBeforeMount(() => {
    clearInterval(state.value.interval)
  })
  const showInput = () => {
    const input = inputRef.value?.$el?.querySelector('input')
    input.click()
  }
  defineExpose({
    loadImage,
  })
  const hasError = computed(() => {
    return state.value.image.hasError
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
          <v-btn
            size="default"
            slim
            flat
            :icon="
              () =>
                h(Icon, {
                  name: !state.image.hasError ? 'futzo-icon:trash' : 'futzo-icon:trash-error',
                  size: 32,
                  mode: 'svg',
                })
            "
            width="40"
            height="40"
            rounded="lg"
            density="compact"
            color="background"
            @click="removeImage"
          />
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
