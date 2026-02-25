<script setup lang="ts">
import {computed, ref, watch} from 'vue'

type TestimonialItem = {
  quote: string
  author: string
  role: string
  city?: string
  avatarUrl?: string
  avatarAlt?: string
}

const props = withDefaults(
  defineProps<{
    items: TestimonialItem[]
    title?: string
    subtitle?: string
  }>(),
  {
    title: 'Lo que dicen organizadores que ya usan Futzo',
    subtitle: '',
  }
)

const active = ref(0)
const totalItems = computed(() => props.items.length)
const hasItems = computed(() => totalItems.value > 0)
const currentItem = computed(() => props.items[active.value] ?? null)

watch(
  () => props.items.length,
  (length) => {
    if (length === 0) {
      active.value = 0
      return
    }
    if (active.value >= length) active.value = 0
  }
)

const prev = () => {
  if (!hasItems.value) return
  active.value = active.value === 0 ? totalItems.value - 1 : active.value - 1
}

const next = () => {
  if (!hasItems.value) return
  active.value = active.value === totalItems.value - 1 ? 0 : active.value + 1
}

const getInitials = (author: string) => {
  const initials = author
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')

  return initials || '?'
}

const resolveAvatarAlt = (item: TestimonialItem) => item.avatarAlt || `Avatar de ${item.author}`
</script>

<template>
  <section class="testimonials-section" data-testid="testimonials-section">
    <v-container class="testimonials-section__container">
      <v-divider class="testimonials-section__divider" />

      <header class="testimonials-section__header">
        <h2>{{ title }}</h2>
        <p v-if="subtitle">{{ subtitle }}</p>
      </header>

      <div v-if="hasItems" class="testimonials-slider">
        <v-btn
          class="testimonials-slider__nav testimonials-slider__nav--prev"
          icon
          variant="outlined"
          rounded="pill"
          aria-label="Testimonio anterior"
          data-testid="testimonials-prev"
          @click="prev"
        >
          <Icon name="mdi-chevron-left" size="22" />
        </v-btn>

        <v-window
          v-model="active"
          class="testimonials-slider__window"
          :touch="true"
          transition="fade-transition"
          reverse-transition="fade-transition"
        >
          <v-window-item v-for="(item, index) in items" :key="`${item.author}-${index}`" :value="index">
            <blockquote class="testimonials-slider__quote" data-testid="testimonials-quote">
              {{ item.quote }}
            </blockquote>
          </v-window-item>
        </v-window>

        <v-btn
          class="testimonials-slider__nav testimonials-slider__nav--next"
          icon
          variant="outlined"
          rounded="pill"
          aria-label="Siguiente testimonio"
          data-testid="testimonials-next"
          @click="next"
        >
          <Icon name="mdi-chevron-right" size="22" />
        </v-btn>
      </div>

      <p v-else class="testimonials-section__empty">
        Aún no hay testimonios disponibles.
      </p>

      <div v-if="currentItem" class="testimonials-author">
        <v-avatar class="testimonials-author__avatar" size="64">
          <v-img v-if="currentItem.avatarUrl" :src="currentItem.avatarUrl" :alt="resolveAvatarAlt(currentItem)" cover />
          <span v-else class="testimonials-author__initials">{{ getInitials(currentItem.author) }}</span>
        </v-avatar>

        <div>
          <p class="testimonials-author__name" data-testid="testimonials-author-name">{{ currentItem.author }}</p>
          <p class="testimonials-author__role">
            {{ currentItem.role }}
            <span v-if="currentItem.city"> · {{ currentItem.city }}</span>
          </p>
        </div>
      </div>

      <v-divider class="testimonials-section__divider" />
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.testimonials-section__container {
  max-width: 1200px;
  padding-top: 40px;
  padding-bottom: 40px;
}

.testimonials-section__divider {
  border-color: #e6edf8;
}

.testimonials-section__header {
  max-width: 820px;
  text-align: left;
  padding: 24px 0;
}

.testimonials-section__header h2 {
  margin: 0;
  font-size: 2rem;
  line-height: 1.2;
  color: #17314f;
}

.testimonials-section__header p {
  margin: 16px auto 0;
  max-width: 720px;
  color: #5f7894;
  font-size: 1.1rem;
  line-height: 1.55;
}

.testimonials-slider {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-areas:
    'quote quote'
    'prev next';
  align-items: center;
  gap: 20px 14px;
  margin-top: 8px;
  justify-content: center;
}

.testimonials-slider__window {
  grid-area: quote;
  width: 100%;
  max-width: 760px;
  justify-self: center;
}

.testimonials-slider__quote {
  margin: 0;
  text-align: center;
  color: #5f7894;
  font-size: 1.08rem;
  line-height: 1.65;
  min-height: 122px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
}

.testimonials-slider__nav {
  width: 48px;
  height: 48px;
  min-width: 48px;
  border: 1px solid #cfdbef;
  color: #89a0bd;
}

.testimonials-slider__nav--prev {
  grid-area: prev;
  justify-self: end;
}

.testimonials-slider__nav--next {
  grid-area: next;
  justify-self: start;
}

.testimonials-slider__nav:focus-visible {
  outline: 2px solid #2257f6;
  outline-offset: 2px;
}

.testimonials-author {
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  text-align: left;
}

.testimonials-author__avatar {
  border: 2px solid #ffffff;
  box-shadow: 0 4px 16px rgba(16, 24, 40, 0.12);
}

.testimonials-author__initials {
  width: 100%;
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, #d2e4ff 0%, #7fa9ff 100%);
  color: #16395f;
  font-weight: 700;
}

.testimonials-author__name {
  margin: 0;
  font-size: 1.9rem;
  line-height: 1.25;
  color: #17314f;
  font-weight: 700;
}

.testimonials-author__role {
  margin: 2px 0 0;
  color: #5f7894;
  font-size: 1.02rem;
}

.testimonials-section__empty {
  margin: 0;
  text-align: center;
  color: #667085;
}

@media (min-width: 960px) {
  .testimonials-section__container {
    padding-top: 80px;
    padding-bottom: 80px;
  }

  .testimonials-slider {
    grid-template-columns: 52px minmax(0, 760px) 52px;
    grid-template-areas: 'prev quote next';
    gap: 24px;
  }

  .testimonials-slider__quote {
    min-height: 132px;
    font-size: 1.1rem;
    padding: 0;
  }

  .testimonials-slider__nav--prev,
  .testimonials-slider__nav--next {
    justify-self: center;
  }
}
</style>
