<script lang="ts" setup>
  import InitialsAvatar from '~/components/shared/InitialsAvatar.vue'

  const { image, user } = storeToRefs(useAuthStore())
  const imageRef = ref(null)
  const loading = ref(false)
  const eventHandler = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file) {
      loading.value = true
      useAuthStore()
        .updateImage(file)
        .finally(() => {
          loading.value = false
        })
    }
  }
  const showInput = () => {
    const input = imageRef.value.$el.querySelector('input')
    input.click()
  }
</script>
<template>
  <div v-if="loading" class="d-flex align-center justify-center fill-height">
    <v-progress-circular color="grey-lighten-2" indeterminate></v-progress-circular>
  </div>
  <div v-else class="position-relative">
    <InitialsAvatar size="64" :image="image" :name="user?.name" />
    <v-btn
      class="image-plus-avatar__btn"
      icon="true"
      width="28"
      height="28"
      @click="showInput"
    >
      <Icon class="image-plus-avatar" name="lucide:plus" size="16"></Icon>
    </v-btn>
    <v-file-input class="d-none" ref="imageRef" @change="eventHandler"></v-file-input>
  </div>
</template>
