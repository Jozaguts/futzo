<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {countries} from 'countries-list'

const selectedCountry = ref()
const close = ref(false)
const country = ref(
    Object.entries(countries).map(([key, value]) => {
        return {
            phone: `${value.phone}`,
            name: value.name,
            value: key
        }
    })
)
const searchCountry = (value: string) => {
    country.value = Object.entries(countries).map(([key, value]) => {
        return {
            phone: `${value.phone}`,
            name: value.name,
            value: key
        }
    }).filter((item) => {
        return item.name.toLowerCase().includes(value.toLowerCase())
    })
}
const resetCountries = () => {
    country.value = Object.entries(countries).map(([key, value]) => {
        return {
            phone: `${value.phone}`,
            name: value.name,
            value: key
        }
    })
}
const selectHandler = (item: { value: string, phone: string }) => {
    resetCountries()
    selectedCountry.value = `${item.value} +${item.phone}`
    close.value = false
    emits('update-area-code', `+${item.phone}`)
}
const emits = defineEmits(['update-area-code'])
onMounted(() => {
    selectedCountry.value = 'MX +52'
})
</script>
<template>
    <div class="d-flex justify-space-around">
        <v-menu min-width="200px" :close-on-content-click="false" v-model="close">
            <template v-slot:activator="{ props }">
                <v-btn
                    variant="text"
                    tile
                    flat
                    slim
                    color="primary"
                    v-bind="props"
                    append-icon="mdi-chevron-down"
                    class="text-caption"
                >
                    {{ selectedCountry }}
                </v-btn>
            </template>
            <v-list min-width="240px" density="compact" slim>
                <v-list-item density="compact">
                    <v-text-field
                        density="compact"
                        variant="outlined"
                        placeholder="Buscar país"
                        class="rounded-lg border-sm"
                        @keydown="searchCountry($event.target.value)"
                    >
                        <template #append-inner>
                            <Icon name="hugeicons:search-02"></Icon>
                        </template>
                    </v-text-field>
                </v-list-item>
                <v-list-item
                    density="compact"
                    v-for="(item, index) in country.slice(0, 4)"
                    :key="index"
                    :value="index"
                    @click="selectHandler(item)"
                >
                    <v-list-item-title>
                        <div class="d-flex align-center justify-space-between">
                            <span class="d-inline-block text-truncate text-caption"
                                  style="max-width: 150px;">{{ item.name }}</span>
                            <span class="text-caption">+{{ item.phone }}</span>
                        </div>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>
