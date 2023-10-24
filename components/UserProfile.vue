<script setup lang="ts">
import avatar1 from '~/assets/images/avatars/avatar-1.png';
import {useAuthStore} from "~/store";
const authSore  = useAuthStore()
onMounted(() => {
  authSore.getUser()
})
</script>

<template>
  <VBadge
      dot
      location="bottom right"
      offset-x="3"
      offset-y="3"
      color="success"
      bordered
  >
    <VAvatar
        class="cursor-pointer"
        color="primary"
        variant="tonal"
    >
      <VImg :src="avatar1" />

      <!-- SECTION Menu -->
      <VMenu
          activator="parent"
          width="230"
          location="bottom end"
          offset="14px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                    dot
                    location="bottom right"
                    offset-x="3"
                    offset-y="3"
                    color="success"
                >
                  <VAvatar
                      color="primary"
                      variant="tonal"
                  >
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{authSore.auth.user.name}}
            </VListItemTitle>
            <VListItemSubtitle>{{authSore?.roles}}</VListItemSubtitle>
          </VListItem>
          <VDivider class="my-2" />

          <!-- 👉 Profile -->
          <VListItem link>
            <template #prepend>
              <VIcon
                  class="me-2"
                  icon="mdi-account-outline"
                  size="22"
              />
            </template>

            <VListItemTitle>Profile</VListItemTitle>
          </VListItem>

          <!-- 👉 Settings -->
          <VListItem link>
            <template #prepend>
              <VIcon
                  class="me-2"
                  icon="mdi-cog-outline"
                  size="22"
              />
            </template>

            <VListItemTitle>Settings</VListItemTitle>
          </VListItem>

          <!-- 👉 Pricing -->
          <VListItem link>
            <template #prepend>
              <VIcon
                  class="me-2"
                  icon="mdi-currency-usd"
                  size="22"
              />
            </template>

            <VListItemTitle>Pricing</VListItemTitle>
          </VListItem>

          <!-- 👉 FAQ -->
          <VListItem link>
            <template #prepend>
              <VIcon
                  class="me-2"
                  icon="mdi-help-circle-outline"
                  size="22"
              />
            </template>

            <VListItemTitle>FAQ</VListItemTitle>
          </VListItem>

          <!-- Divider -->
          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem @click="authSore.logout()">
            <template #prepend>
              <VIcon
                  class="me-2"
                  icon="mdi-logout"
                  size="22"
              />
            </template>

            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
