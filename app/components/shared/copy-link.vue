<script lang="ts" setup>
  const props = defineProps({
    item: {
      type: Object,
      required: true,
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
  <v-btn density="compact" icon @click="setCopied" variant="text">
    <Icon size="24" v-if="!copied" name="ic:baseline-attach-file" />
    <Icon size="24" v-if="copied" name="bi:clipboard-check" />
  </v-btn>
</template>
