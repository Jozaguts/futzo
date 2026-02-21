<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    ctaLabel?: string
    ctaTo?: string
  }>(),
  {
    title: 'Acceso restringido',
    description: 'No cuentas con permisos para acceder a este contenido.',
    ctaLabel: 'Ir al dashboard',
    ctaTo: '/dashboard',
  }
)
</script>

<template>
  <section class="forbidden-state" data-testid="inline-forbidden-state">
    <div class="forbidden-state__icon">
      <Icon name="lucide:shield-alert" size="22" />
    </div>
    <h2 class="forbidden-state__title">{{ title }}</h2>
    <p class="forbidden-state__description">{{ description }}</p>
    <v-btn color="primary" :to="ctaTo">{{ ctaLabel }}</v-btn>
  </section>
</template>

<style scoped>
.forbidden-state {
  border: 1px solid #eaecf0;
  border-radius: 16px;
  background: #fff;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
}

.forbidden-state__icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #fef3f2;
  color: #d92d20;
  display: flex;
  align-items: center;
  justify-content: center;
}

.forbidden-state__title {
  margin: 0;
  font-size: 18px;
  color: #101828;
}

.forbidden-state__description {
  margin: 0;
  color: #667085;
  max-width: 420px;
}
</style>
