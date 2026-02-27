<script lang="ts" setup>
  const { active, completed, label, addDivider } = defineProps({
    active: {
      type: Boolean,
      default: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    addDivider: {
      type: Boolean,
      default: true,
    },
  })
  const color = computed(() => (active ? '#9155FD' : '#E0E0E0'))
</script>
<template>
  <div class="step-dot-container">
    <div class="d-flex flex-column align-center text-center">
      <svg
        v-if="active && !completed"
        class="step-dot"
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0.333984" width="24" height="24" rx="12" fill="#9155FD" />
        <circle cx="12.334" cy="12" r="4" fill="white" />
      </svg>
      <svg
        v-else-if="completed"
        class="step-dot"
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0.333984" width="24" height="24" rx="12" fill="#9155FD" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M17.096 7.39016L9.93602 14.3002L8.03602 12.2702C7.68602 11.9402 7.13602 11.9202 6.73602 12.2002C6.34602 12.4902 6.23602 13.0002 6.47602 13.4102L8.72602 17.0702C8.94602 17.4102 9.32601 17.6202 9.75601 17.6202C10.166 17.6202 10.556 17.4102 10.776 17.0702C11.136 16.6002 18.006 8.41016 18.006 8.41016C18.906 7.49016 17.816 6.68016 17.096 7.38016V7.39016Z"
          fill="white"
        />
      </svg>
      <svg
        v-else
        class="step-dot"
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0.333984" width="24" height="24" rx="12" fill="#E0E0E0" />
        <circle cx="12.334" cy="12" r="4" fill="white" />
      </svg>
      <small class="dot-label d-none d-md-inline d-lg-inline" :class="active ? 'active' : ''">{{ label }}</small>
    </div>
  </div>
  <v-divider v-if="addDivider" />
</template>
<style>
  .step-dot-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  svg.step-dot {
    width: 2rem;
    height: 2rem;
    border: 2px solid v-bind(color);
    padding: 1px;
    border-radius: 100%;
    position: relative;
  }

  .dot-label {
    position: absolute;
    bottom: -1.5rem;
    width: 200px;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    color: var(--futzo-on-surface);
    display: block;
  }

  .dot-label.active {
    color: #9155fd;
  }
</style>
