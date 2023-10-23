<template>
 <AuthForm />
</template>
<script setup lang="ts">
import  AuthForm from "@/components/authentication/AuthForm.vue";
definePageMeta({
  layout: "blank",
  middleware: ['guest']
});
</script>
