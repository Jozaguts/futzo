<template>
  <div>
<!--    <v-snackbar :color="alert.color"-->
<!--                :model-value="alert.isActive">{{alert.message}}</v-snackbar>-->
  </div>
</template>
<script setup>
import {useGlobalStore} from "~/store";
import {storeToRefs} from "pinia";
const {alert} = storeToRefs(useGlobalStore());

</script>