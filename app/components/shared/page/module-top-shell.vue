<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
    subtitle?: string
    eyebrow?: string
    topShellTestId?: string
    introTestId?: string
    controlsTestId?: string
    showControls?: boolean
  }>(),
  {
    subtitle: '',
    eyebrow: 'Gestión de torneos',
    topShellTestId: 'module-page-top-shell',
    introTestId: 'module-page-intro',
    controlsTestId: 'module-page-controls',
    showControls: true,
  }
)
</script>

<template>
  <section class="module-top-shell futzo-rounded" :data-testid="props.topShellTestId">
    <header class="module-top-shell__intro" :data-testid="props.introTestId">
      <div class="module-top-shell__header">
        <div class="module-top-shell__title-wrapper">
          <p class="module-top-shell__eyebrow">{{ props.eyebrow }}</p>
          <h1 class="module-top-shell__title">{{ props.title }}</h1>
          <p v-if="props.subtitle" class="module-top-shell__subtitle">{{ props.subtitle }}</p>
        </div>
        <slot name="header-actions" />
      </div>
    </header>

    <template v-if="props.showControls">
      <div class="module-top-shell__divider" aria-hidden="true" />

      <section class="module-top-shell__controls" :data-testid="props.controlsTestId">
        <slot name="controls" />
      </section>
    </template>
  </section>
</template>
