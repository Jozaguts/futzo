<script lang="ts" setup>
  interface Props {
    text?: string
    href?: string
  }
  const props = withDefaults(defineProps<Props>(), {
    text: 'Upgrade to Pro',
    href: '#',
  })
</script>
<template>
  <v-btn class="buy-now-button" :href="props.href" rel="noopener noreferrer">
    {{ props.text }}
  </v-btn>
</template>
<style scoped>
  @keyframes gradient-animation {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
  .buy-now-button {
    display: inline-flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    border: 0;
    border-radius: 6px;
    margin: 0;
    animation: gradient-animation 12s linear infinite;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: linear-gradient(-45deg, #8c57ff, #2e263d, #338aff, #3cf0c5);
    background-size: 600%;
    color: #ffffffe6;
    cursor: pointer;
    font-size: 0.9375rem;
    font-weight: 500;
    letter-spacing: 0.43px;
    line-height: 1.2;
    min-inline-size: 50px;
    outline: 0;
    padding-block: 0.625rem;
    padding-inline: 1.25rem;
    text-decoration: none;
    text-transform: none;
    vertical-align: middle;
  }
  .buy-now-button {
    position: fixed;
    z-index: 999;
    inset-block-end: 5%;
    inset-inline-end: 79px;
  }
</style>
