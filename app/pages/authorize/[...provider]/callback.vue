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
    const route = useRoute()
    const provider = route?.params?.provider[0]
    console.log(provider)
    console.log(route.query?.code)
    console.log(route.query)
    console.log(route.params)
    console.log(route)
    if (provider === 'google' || provider === 'facebook') {
      const client = useSanctumClient()

      client(`/auth/${provider}/callback`, {
        credentials: 'include',
        params: { code: route.query.code },
      })
        .then(() => {
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
        })
        .catch((error) => console.error(error))
    } else {
      console.error('provider not found')
    }
  })
</script>
