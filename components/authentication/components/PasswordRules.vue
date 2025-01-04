<script setup lang="ts">
const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    modelValue: {
        type: String || undefined,
        required: true,
    },
})
const rules = computed(() => {
    return [
        {
            text: 'Al menos 8 caracteres',
            icon: props.modelValue?.length > 7 ? 'futzo-icon:check-icon' : 'futzo-icon:check-icon-secondary'
        },
        {
            text: 'Debe contener un carácter especial',
            icon: specialCharacters.test(props.modelValue) ? 'futzo-icon:check-icon' : 'futzo-icon:check-icon-secondary'
        }
    ]
})
</script>
<template>
    <div class="d-flex flex-column mt-2">
        <div class="d-flex flex-column mb-4" v-if="show">
            <div class="rule-container" v-for="rule in rules">
                <Icon :name="rule.icon" class="text-primary" size="20"/>
                <span class="rule-text">
                    {{ rule.text }}
               </span>
            </div>
        </div>
    </div>
</template>
