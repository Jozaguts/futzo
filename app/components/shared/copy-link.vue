<script lang="ts" setup>
  defineOptions({ inheritAttrs: false })
  const props = defineProps({
    item: {
      type: Object,
      required: true,
    },
    text: {
      type: String,
      required: false,
      default: 'Enlace',
    },
    iconOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
  })
  const copied = ref(false)
  const copyText = async (text: string) => {
    if (navigator.clipboard) {
      return navigator.clipboard.writeText(text)
    } else {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
  }

  const setCopied = async () => {
    await copyText(props.item.register_link)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
</script>
<template>
  <v-btn v-if="iconOnly" icon variant="text" v-bind="$attrs" @click="setCopied" :aria-label="text">
    <Icon :name="copied ? 'mdi-check' : 'mdi-link'" size="20" />
  </v-btn>
  <v-list-item v-else density="compact" v-bind="$attrs" @click="setCopied">
    <template #prepend> <Icon name="mdi-link" size="24"></Icon></template>
    <v-list-item-title class="pl-1" style="min-width: 130px">
      {{ text }}
      <transition-slide
        :duration="600"
        :offset="[-16, 16]"
        :delay="200"
        :easing="{
          enter: 'cubic-bezier(0.6, 0, 0.4, 2)',
          leave: 'ease-out',
        }"
      >
        <span v-show="copied" class="text-caption text-primary font-weight-bold"
          >Copiado <Icon size="12" name="mdi-check"
        /></span>
      </transition-slide>
    </v-list-item-title>
  </v-list-item>
</template>
