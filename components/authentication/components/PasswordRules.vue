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
const modelValue = defineModel<string>('modelValue', {
    type: String,
    default: '',
})
const atLestIcon = computed(() => {
    return modelValue.value.length > 7 ? 'futzo-icon:check-icon' : 'futzo-icon:check-icon-secondary'
})
const specialCharacterIcon = computed(() => {
    return specialCharacters.test(modelValue.value as string) ? 'futzo-icon:check-icon' : 'futzo-icon:check-icon-secondary'
})
const rules = computed(() => {
    return [
        {
            text: 'Al menos 8 caracteres',
            icon: atLestIcon.value
        },
        {
            text: 'Debe contener un carácter especial',
            icon: specialCharacterIcon.value
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
