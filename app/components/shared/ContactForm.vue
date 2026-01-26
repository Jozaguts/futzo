<script setup lang="ts">
  import { object, number, string } from 'yup'
  import { useForm } from 'vee-validate'
  import { ref } from 'vue'
  import type { SupportTicketForm } from '~/models/User'
  import { createTicket } from '~/http/api/support'
  import { useToast } from '#imports'
  const emits = defineEmits<{
    (e: 'submitted'): void
  }>()
  const { defineField, handleSubmit, meta } = useForm<SupportTicketForm>({
    validationSchema: toTypedSchema(
      object({
        subject: string().required('Campo requerido'),
        message: string().min(10, 'El mensaje debe tener al menos 10 caracteres').required('Campo requerido'),
        tournament_id: number().nullable(),
      })
    ),
    initialValues: {
      tournament_id: null,
      subject: 'support',
      message: '',
    },
  })
  const { leagueTournaments } = storeToRefs(useLeaguesStore())
  const { user } = storeToRefs(useAuthStore())
  const [tournament_id, tournament_id_props] = defineField('tournament_id', vuetifyConfig)
  const [subject, subject_props] = defineField('subject', vuetifyConfig)
  const [message, message_props] = defineField('message', vuetifyConfig)
  const loading = ref(false)
  const submit = handleSubmit(async (values) => {
    try {
      loading.value = true
      await createTicket(values)
      useToast().toast({
        msg: '¡Mensaje enviado!',
        description: 'Nos pondremos en contacto contigo lo antes posible.',
        type: 'success',
      })
      emits('submitted')
    } catch (e) {
    } finally {
      loading.value = false
    }
  })

  onMounted(async () => {
    if (leagueTournaments.value.length === 0 && !!user.value?.league) {
      await useLeaguesStore().getLeagueTournaments(user.value.league.id)
    }
    if (leagueTournaments.value.length > 0) {
      tournament_id.value = leagueTournaments.value[0]?.id as number
    }
  })
</script>

<template>
  <v-sheet min-height="100%" max-height="400px" min-width="100%" max-width="350px" class="px-2">
    <div>
      <span class="subheading">Asunto: </span>
      <v-chip-group density="compact" v-model="subject" v-bind="subject_props">
        <v-chip variant="outlined" color="primary" density="compact" value="bug">Bug</v-chip>
        <v-chip variant="outlined" color="primary" density="compact" value="feature">Mejora</v-chip>
        <v-chip variant="outlined" color="primary" density="compact" value="support">Soporte</v-chip>
      </v-chip-group>
    </div>
    <v-select
      label="torneo (opcional)"
      clearable
      :items="leagueTournaments"
      no-data-text="No cuentas con torneos"
      v-model="tournament_id"
      density="compact"
      class="my-4"
      item-title="name"
      item-value="id"
      v-bind="tournament_id_props"
    ></v-select>
    <v-textarea
      class="text-area"
      v-model="message"
      v-bind="message_props"
      placeholder="Cuéntanos qué pasó Si puedes, agrega el nombre de tu liga o torneo."
      style="min-height: 100%; max-height: 210px"
    ></v-textarea>
    <small class="text-wrap"
      >Respondemos al correo o número con el que te registraste. Si usaste teléfono, revisa WhatsApp.</small
    >
    <PrimaryBtn
      text="Enviar Mensaje"
      icon="mdi:send"
      block
      class="pa-4 my-2"
      icon-position="right"
      @click="submit"
      :loading="loading"
      :disabled="!meta.valid || loading"
    ></PrimaryBtn>
  </v-sheet>
</template>

<style scoped></style>
