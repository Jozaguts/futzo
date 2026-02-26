<script setup lang="ts">
import {object, string} from 'yup'
import {fetchTickets, responseTicket} from '~/http/api/support'
import type {ResponseTicket, Tickets} from '~/models/Support'

const { user } = storeToRefs(useAuthStore())
  const { toast } = useToast()
  const tickets = ref<Tickets>({} as Tickets)
  const loading = ref(false)
  const { defineField, handleSubmit } = useForm<ResponseTicket>({
    validationSchema: toTypedSchema(
      object({
        ticket_id: string().required('Campo requerido'),
        response_message: string().min(10, 'El mensaje debe tener al menos 10 caracteres').required('Campo requerido'),
      })
    ),
  })
  const [ticket_id, ticket_id_props] = defineField('ticket_id', vuetifyConfig)
  const [response_message, response_message_props] = defineField('response_message', vuetifyConfig)

  const isResponseDisabled = (status: string) => status === 'open' || status === 'pending'

  const notifyRequestError = () => {
    toast({
      type: 'error',
      msg: 'No se pudo procesar tu mensaje',
      description: 'Intenta nuevamente en unos segundos.',
    })
  }

  const init = async () => {
    try {
      tickets.value = await fetchTickets()
    } catch {
      tickets.value = { data: [] }
      notifyRequestError()
    }
  }

  const responseTicketHandler = handleSubmit(async (values) => {
    loading.value = true
    try {
      await responseTicket(values)
      toast({
        type: 'success',
        msg: 'Respuesta enviada',
        description: 'Tu respuesta ha sido enviada correctamente',
      })
      await init()
      ticket_id.value = ''
    } catch {
      notifyRequestError()
    } finally {
      loading.value = false
    }
  })

  onMounted(async () => {
    await init()
    if (tickets.value.data.length === 0) {
      toast({
        type: 'info',
        msg: 'No tienes tickets abiertos',
        description: 'No tienes tickets abiertos, por favor crea uno para comunicarte con el equipo de soporte',
      })
      user.value.opened_tickets_count = 0
    } else {
      ticket_id.value = tickets.value.data[0]?.id as string
    }
  })
</script>

<template>
  <div v-if="loading || !tickets.data?.length" class="text-center my-4">
    <v-empty-state
      size="120"
      headline="Todo en orden"
      title="No tienes tickets abiertos"
      text="Si necesitas ayuda, crea un ticket y te respondemos lo antes posible."
      image="/futzo/logos/circular/logo-22.png"
    ></v-empty-state>
  </div>
  <v-card
    v-else
    v-for="ticket in tickets.data"
    :key="ticket.id"
    min-height="600px"
    max-height="600px"
    min-width="100%"
    max-width="400px"
    class="mb-4 flex-column d-flex ticket-list__card"
    data-testid="support-ticket-card"
  >
    <v-card-item>
      <v-card-title
        ><div class="d-flex">
          Ticket #{{ ticket.id.substring(1, 8) }} <v-spacer />
          <span class="text-info text-caption">{{ ticket.subject }}</span>
        </div>
      </v-card-title>
      <v-card-subtitle> Creado {{ ticket.created_at }} </v-card-subtitle>
      <div class="d-flex align-center">
        <Icon :name="`mdi-${ticket.contact_method === 'email' ? 'email-outline' : 'phone-outline'}`" size="20"></Icon>
        <p class="text-body-1 mx-2">{{ ticket.contact_value }}</p>
        <span class="mx-2">|</span>
        <Icon name="mdi-message-outline" size="20" class="mx-2"></Icon>
        <p class="text-body-1 mx-2">{{ ticket.messages_count }}</p>
      </div>
    </v-card-item>
    <v-card-text class="ticket-list__content">
      <v-timeline side="end" class="ticket-list__timeline" data-testid="support-ticket-timeline" v-auto-animate>
        <v-timeline-item
          v-for="message in ticket.public_messages"
          :key="message.id"
          :dot-color="message.author_type === 'user' ? 'primary' : 'grey-lighten-1'"
          :icon="`mdi-${message.author_type === 'user' ? 'account' : 'robot'}`"
          size="small"
        >
          <v-card variant="outlined" class="futzo-rounded">
            <v-card-title :class="`text-${message.author_type === 'user' ? 'primary' : 'green-lighten-1'}`">
              <div class="d-flex justify-space-between">
                <p class="text-body-1">{{ message.author_type === 'user' ? 'Tu' : 'Futzo' }}</p>
                <div class="d-flex align-center justify-content-center text-secondary">
                  <Icon name="mdi-clock-outline" size="16" />
                  <p class="text-caption ml-2">
                    {{ message.created_at }}
                  </p>
                </div>
              </div>
            </v-card-title>
            <v-card-text>
              {{ message.body }}
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
      <div class="d-flex align-center my-2" v-if="ticket.status !== 'answered'">
        <span class="pulse pulsate-fwd bg-green-lighten-2 mx-2"></span>
        <span>Esperando respuesta del equipo de soporte</span>
      </div>
    </v-card-text>
    <v-card-actions class="ticket-list__actions" data-testid="support-ticket-actions">
      <div class="d-flex flex-column w-100 ticket-list__composer">
        <v-textarea
          variant="outlined"
          class="ticket-list__textarea"
          data-testid="support-ticket-textarea"
          v-bind="response_message_props"
          v-model="response_message"
          density="compact"
          hide-details="auto"
          placeholder="Cuéntanos qué pasó Si puedes, agrega el nombre de tu liga o torneo."
          rows="6"
          :disabled="isResponseDisabled(ticket.status)"
        >
        </v-textarea>
        <PrimaryBtn
          block
          data-testid="support-ticket-send-btn"
          text="Enviar mensaje"
          icon="mdi-send"
          iconPosition="right"
          :disabled="isResponseDisabled(ticket.status)"
          v-bind="ticket_id_props"
          @click="responseTicketHandler"
        />
      </div>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
  .ticket-list__card {
    min-height: 500px;
    height: min(600px, calc(100dvh - 180px));
    max-height: 600px;
    max-width: 400px;
  }

  .ticket-list__content {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
    padding-bottom: 0;
  }

  .ticket-list__timeline {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding-right: 8px;
  }

  .ticket-list__actions {
    position: sticky;
    bottom: 0;
    z-index: 1;
    background: rgb(var(--v-theme-surface));
    border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  }

  .ticket-list__composer {
    gap: 12px;
  }

  .ticket-list__textarea :deep(textarea) {
    min-height: 132px;
  }

  @media (max-height: 760px) {
    .ticket-list__card {
      min-height: 460px;
      height: min(560px, calc(100dvh - 140px));
    }
  }

  .pulse {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .pulsate-fwd {
    -webkit-animation: pulsate-fwd 0.5s ease-in-out infinite both;
    animation: pulsate-fwd 0.5s ease-in-out infinite both;
  }
  /* ----------------------------------------------
 * Generated by Animista on 2026-1-26 1:5:2
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info.
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

  /**
   * ----------------------------------------
   * animation pulsate-fwd
   * ----------------------------------------
   */
  @-webkit-keyframes pulsate-fwd {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    50% {
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
  @keyframes pulsate-fwd {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    50% {
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
</style>
