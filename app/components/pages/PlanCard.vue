<script setup lang="ts">
  import CardCTA from '~/components/pages/CardCTA.vue'
  import type { PlanCard as PlanCardProps } from '~/types'

  const { isAnnuallyPrice } = useProductPrices()

  const {
    title,
    img_path,
    symbol,
    price, // mensual
    iso_code,
    annually_price, // mensual prorrateado cuando es anual
    annual_saving, // ahorro total anual (en la moneda)
    cta = 'Empieza gratis 7 días',
    url,
    features = [],
    // Nuevos opcionales (no rompen compatibilidad):
    featured = false,
    badge = '',
  } = defineProps<
    PlanCardProps & {
      featured?: boolean
      badge?: string
    }
  >()
</script>

<template>
  <article
    class="single-price-plan text-center p-5 wow fadeInLeft"
    :class="[{ 'plan--featured': featured }]"
    data-aos-duration="2s"
    data-wow-delay="0.4s"
    aria-label="Tarjeta de plan"
  >
    <!-- Destacado -->
    <div v-if="featured || badge" class="plan-badge" aria-hidden="true">
      <span v-if="badge">{{ badge }}</span>
      <span v-else>Más elegido</span>
    </div>

    <!-- Plan Thumb -->
    <div class="plan-thumb mb-2">
      <img width="240" height="207" :src="img_path" alt="Logotipo del plan" loading="lazy" />
    </div>

    <!-- Plan Title -->
    <header class="plan-title my-2 my-sm-3">
      <h3 class="card-title text-uppercase">{{ title }}</h3>
    </header>

    <!-- Plan Price -->
    <div class="plan-price" role="text">
      <p :class="{ 'text-muted': isAnnuallyPrice }" class="m-0">
        <span
          class="price-text"
          :style="{ 'text-decoration': isAnnuallyPrice ? 'line-through' : 'none' }"
          aria-label="Precio mensual"
        >
          {{ symbol }}{{ price }}{{ iso_code }}/mes
        </span>
      </p>
    </div>

    <!-- Detalle de precio (anual vs mensual) -->
    <div class="plan-price details py-2 px-1 mt-2" v-auto-animate>
      <p class="promo m-0">
        <template v-if="isAnnuallyPrice">
          <strong aria-label="Precio mensual prorrateado en anual">
            {{ symbol }}{{ annually_price }}{{ iso_code }}/mes
          </strong>
          <span class="badge badge-pill text-white ml-1" style="background-color: #9155fd"> Facturado anual </span>
          <br />
          <span class="d-inline-block mt-1" style="font-size: 14px">
            💸 Ahorra
            <span style="font-weight: bolder"> {{ symbol }}{{ annual_saving }}{{ iso_code }}/año </span>
          </span>
        </template>

        <template v-else>
          <!-- Mensual sin promos de primer mes -->
          <span class="price-details" style="font-size: 14px"> Plan mensual estándar </span>
        </template>
      </p>
    </div>

    <!-- Plan Features -->
    <div class="plan-description mt-3">
      <ul class="plan-features" aria-label="Características del plan">
        <li v-for="feat in features" :key="feat" class="border-top py-3">✅ {{ feat }}</li>
      </ul>
    </div>

    <!-- CTA -->
    <CardCTA :cta="cta" :url="url" />

    <!-- Nota de confianza -->
  </article>
</template>

<style scoped>
  li {
    list-style-type: none;
  }
  .single-price-plan {
    position: relative;
    border: 1px solid #eee;
    border-radius: 12px;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }
  .single-price-plan:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.06);
  }

  .plan--featured {
    border-color: #9155fd;
    box-shadow: 0 12px 28px rgba(145, 85, 253, 0.15);
  }

  .plan-badge {
    position: absolute;
    top: 14px;
    right: 14px;
    background: #9155fd;
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    padding: 6px 10px;
    border-radius: 999px;
  }

  .plan-price.details {
    border-top: 1px solid #9155fd;
    border-bottom: 1px solid #9155fd;
    padding: 0.5rem 1rem;
    background: transparent;
  }
  .plan-price.details p {
    font-weight: bold;
    font-size: 14px;
  }
  .plan-price.details span {
    font-weight: bold;
    font-size: 12px;
  }
  .price-details {
    font-size: 14px;
  }
  .price-text {
    font-size: 2em;
    font-weight: 600;
    line-height: 1.2;
  }

  .card-title {
    font-size: 20px;
    letter-spacing: 3px;
    opacity: 0.9;
    line-height: 1.2;
    font-weight: 700;
    color: #222;
    margin-bottom: 0;
    text-transform: uppercase;
  }
</style>
