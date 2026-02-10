# Switcher de idioma

## Opcion A: usar rutas localizadas (recomendado)

```ts
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const availableLocales = computed(() =>
  locales.value.filter((l) => l.code !== locale.value)
)
```

```vue
<NuxtLink
  v-for="loc in availableLocales"
  :key="loc.code"
  :to="switchLocalePath(loc.code)"
>
  {{ loc.name || loc.code }}
</NuxtLink>
```

## Opcion B: forzar locale (cuando se usa cookie)

```ts
const { locales, setLocale } = useI18n()
```

```vue
<button
  v-for="loc in locales"
  :key="loc.code"
  type="button"
  @click="setLocale(loc.code)"
>
  {{ loc.name || loc.code }}
</button>
```

## Nota para este proyecto
- El dropdown de idioma vive en `app/components/site/SiteHeader.vue`.
- Reemplazar botones estaticos por `NuxtLink` o `setLocale`.
- Evitar `href="#"` y usar `button` o `NuxtLink`.
