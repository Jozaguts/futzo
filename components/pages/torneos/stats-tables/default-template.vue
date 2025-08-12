<script lang="ts" setup>
  const { type } = defineProps<{ type: String }>()
</script>
<template>
  <section>
    <header class="mx-6">
      <div class="d-flex justify-space-between px-2">
        <p class="text-body-2 text-medium-emphasis">Jugador</p>
        <p class="text-body-2 text-medium-emphasis">{{ type }}</p>
      </div>
      <v-divider />
    </header>
    <main>
      <v-container>
        <v-row>
          <v-col>
            <div class="d-flex align-center mx-6">
              <span class="mr-4 text-subtitle-2">1</span>
              <v-avatar image="https://placehold.co/50x50" density="compact" size="50" class="mr-2" />
              <div class="d-flex flex-column ml-2">
                <p class="text-subtitle-2">Jugador name</p>
                <div class="d-flex">
                  <v-avatar image="https://placehold.co/50x50" density="compact" size="20" class="mr-2" />
                  <span class="text-caption text-medium-emphasis">team name</span>
                </div>
              </div>
              <span class="text-subtitle-2 ml-auto mx-2">1</span>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </main>
  </section>
</template>
