<template>
  <div>
    <h1>please wait login in ...</h1>
  </div>
</template>
<script setup lang="ts">

definePageMeta({
  layout: "blank",
  sanctum: {
    excluded: true,
  },
});

onMounted(() => {
  const provider = useRoute().params.provider[0];
  if (provider === "google" || provider === "facebook") {
    const client = useSanctumClient();
    client(`/auth/${provider}/callback`, {
      credentials: "include",
      params: {code: useRoute().query.code},
    })
        .then(() => {
          const {refreshIdentity, isAuthenticated} = useSanctumAuth();
          refreshIdentity()
              .catch((error) => console.error(error))
              .then(() => {
                if (isAuthenticated.value) {
                  console.log("user authenticated");
                  useRouter().push("/");
                } else {
                  console.log("user not authenticated");
                }
              });
        })
        .catch((error) => console.error(error));
  } else {
    console.error("provider not found");
  }
});
</script>
