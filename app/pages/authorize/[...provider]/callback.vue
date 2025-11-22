<template>
  <div>
    <h1>please wait login in ...</h1>
  </div>
</template>
<script setup lang="ts">
  definePageMeta({
    layout: 'blank',
    sanctum: {
      excluded: true,
    },
  })

  onMounted(() => {
    try {
      const { refreshIdentity, isAuthenticated } = useSanctumAuth()
      refreshIdentity()
        .catch((error) => console.error(error))
        .then(() => {
          if (isAuthenticated.value) {
            console.log('user authenticated')
            useRouter().push('/')
          } else {
            console.log('user not authenticated')
          }
        })
    } catch (error) {
      console.log(error)
    }
  })
</script>
