<script lang="ts" setup>
const errorMessage = defineModel("errors");
const props = defineProps({
    username: String,
    areaCode: String,
});
const urlVerification = computed(() => {
    const isPhone = /^\d/.test(props.username as string);
    const type = isPhone ? "phone" : "email";
    const identifier = isPhone ? `${props.areaCode}${props.username}` : props.username;
    return `/verificar?${type}=${identifier}`;
});
const showVerifyButton = computed(() => {
    return errorMessage.value === "Su dirección de correo electrónico no está verificada." || errorMessage.value === "Su número de teléfono no está verificado.";
});
</script>
<template>
    <v-col
        class="d-flex align-content-center justify-start py-0"
        v-auto-animate="{ duration: 100 }"
    >
        <small class="text-red pl-2 font-weight-bold"
               v-if="errorMessage">
            * {{ errorMessage }}
            <span v-if="showVerifyButton">
        <a
            class="text-primary"
            href="javascript:void(0)"
            @click="() => $router.push(urlVerification)"
        >Verificar</a
        >
      </span>
        </small>
    </v-col>
</template>
