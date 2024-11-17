<script setup lang="ts">
const authProviders = [
  {
    icon: "futzo-icon:google",
    color: "#E7E3FC",
    colorInDark: "#db4437",
    provider: "google",
  },
  {
    icon: "futzo-icon:facebook",
    color: "#E7E3FC",
    colorInDark: "#4267b2",
    provider: "facebook",
  },
];
const PROVIDERS = ["facebook", "google"];
const launchProvider = async (provider: string) => {
  if (PROVIDERS.includes(provider)) {
    try {
      const client = useSanctumClient();
      const data = await client(`auth/${provider}/redirect`);

      let url = data.url;

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.log(error);
    }
  }
};
</script>
<template>
  <VBtn
    v-for="link in authProviders"
    :key="link.icon"
    variant="outlined"
    class="mx-3"
    density="compact"
    size="x-large"
    :color="link.color"
    @click="launchProvider(link.provider)"
  >
    <Icon :name="link.icon"></Icon>
  </VBtn>
</template>
