<script setup lang="ts">
import {getAvatarInitials, resolveAvatarFallbackColor, sanitizeAvatarImage} from '~/utils/avatar'

const props = withDefaults(
  defineProps<{
    name?: string | null
    image?: string | null
    initials?: string | null
    maxInitials?: number
    fallbackColor?: string | null
  }>(),
  {
    name: '',
    image: '',
    initials: '',
    maxInitials: 2,
    fallbackColor: '',
  }
)

const attrs = useAttrs()

const resolvedImage = computed(() => sanitizeAvatarImage(props.image))
const hasImageError = ref(false)

watch(
  () => resolvedImage.value,
  () => {
    hasImageError.value = false
  }
)

const shouldRenderImage = computed(() => Boolean(resolvedImage.value) && !hasImageError.value)

const resolvedInitials = computed(() => {
  const explicit = String(props.initials ?? '').trim()
  if (explicit) {
    return explicit.slice(0, Math.max(1, props.maxInitials)).toUpperCase()
  }
  return getAvatarInitials(props.name, props.maxInitials)
})

const avatarStyle = computed(() => {
  return {
    backgroundColor: resolveAvatarFallbackColor(props.fallbackColor),
    color: '#ffffff',
  }
})

const avatarSize = computed(() => {
  const raw = attrs.size
  if (typeof raw === 'number') {
    return raw
  }
  const parsed = Number.parseInt(String(raw ?? ''), 10)
  return Number.isFinite(parsed) ? parsed : 40
})

const initialsStyle = computed(() => ({
  fontSize: `${Math.max(10, Math.round(avatarSize.value * 0.36))}px`,
}))
</script>

<template>
  <v-avatar v-bind="attrs" :style="avatarStyle" class="initials-avatar">
    <v-img v-if="shouldRenderImage" :src="resolvedImage" cover class="initials-avatar__image" @error="hasImageError = true" />
    <span v-else class="initials-avatar__text" :style="initialsStyle">
      {{ resolvedInitials }}
    </span>
  </v-avatar>
</template>

<style scoped>
.initials-avatar__text {
  line-height: 1;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
</style>
