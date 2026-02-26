import { beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { flushPromises } from '@vue/test-utils'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import { ensureVuetifyApp } from '../../utils/vuetify-stubs'
import TicketList from '~/components/shared/TicketList.vue'

const fetchTicketsMock = vi.hoisted(() => vi.fn())
const responseTicketMock = vi.hoisted(() => vi.fn())
const toastMock = vi.hoisted(() => vi.fn())
const userRef = vi.hoisted(() => ({ value: { opened_tickets_count: 1 }, __v_isRef: true } as any))

vi.mock('~/http/api/support', () => ({
  fetchTickets: fetchTicketsMock,
  responseTicket: responseTicketMock,
}))

mockNuxtImport('useAuthStore', () => () => ({ user: userRef }))
mockNuxtImport('useToast', () => () => ({ toast: toastMock }))

const passthrough = (tag = 'div') =>
  defineComponent({
    inheritAttrs: false,
    setup(_, { slots, attrs }) {
      return () => h(tag, attrs, slots.default ? slots.default() : undefined)
    },
  })

const VTextareaStub = defineComponent({
  name: 'StubVTextarea',
  inheritAttrs: false,
  props: {
    rows: { type: [String, Number], default: 0 },
    disabled: { type: Boolean, default: false },
    modelValue: { type: String, default: '' },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    return () =>
      h('textarea', {
        ...attrs,
        rows: String(props.rows),
        disabled: props.disabled,
        value: props.modelValue,
        onInput: (event: Event) => emit('update:modelValue', (event.target as HTMLTextAreaElement).value),
      })
  },
})

const PrimaryBtnStub = defineComponent({
  name: 'PrimaryBtn',
  props: {
    text: { type: String, required: true },
    disabled: { type: Boolean, default: false },
  },
  emits: ['click'],
  template: '<button type="button" :disabled="disabled" v-bind="$attrs" @click="$emit(\'click\')">{{ text }}</button>',
})

const ticketFactory = (status: string) => ({
  data: [
    {
      id: 'TKT-1234567',
      user_id: 1,
      league_id: 1,
      tournament_id: 1,
      contact_method: 'email',
      contact_value: 'admin@futzo.io',
      subject: 'support',
      category: 'support',
      status,
      priority: 'medium',
      last_message_at: null,
      closed_at: null,
      meta: null,
      created_at: '2026-02-26 10:00',
      updated_at: '2026-02-26 10:00',
      deleted_at: null,
      messages_count: 2,
      public_messages: [
        {
          id: 1,
          ticket_id: 'TKT-1234567',
          author_type: 'user',
          author_user_id: 1,
          body: 'Tengo un problema con mi calendario.',
          attachments: null,
          is_internal: false,
          read_at: null,
          created_at: '2026-02-26 10:02',
          updated_at: '2026-02-26 10:02',
        },
      ],
    },
  ],
})

describe('TicketList', () => {
  beforeEach(() => {
    ensureVuetifyApp()
    fetchTicketsMock.mockReset()
    responseTicketMock.mockReset()
    toastMock.mockReset()
    userRef.value = { opened_tickets_count: 1 }
  })

  it('keeps the send action visible and uses reduced textarea height', async () => {
    fetchTicketsMock.mockResolvedValue(ticketFactory('answered'))

    const wrapper = await mountSuspended(TicketList, {
      global: {
        directives: {
          autoAnimate: () => {},
        },
        stubs: {
          'v-empty-state': passthrough(),
          'v-card': passthrough(),
          'v-card-item': passthrough(),
          'v-card-title': passthrough(),
          'v-card-subtitle': passthrough(),
          'v-card-text': passthrough(),
          'v-card-actions': passthrough(),
          'v-timeline': passthrough(),
          'v-timeline-item': passthrough(),
          'v-textarea': VTextareaStub,
          Icon: passthrough('i'),
          PrimaryBtn: PrimaryBtnStub,
        },
      },
    })

    await flushPromises()

    expect(fetchTicketsMock).toHaveBeenCalledTimes(1)
    expect(wrapper.find('[data-testid="support-ticket-card"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="support-ticket-timeline"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="support-ticket-actions"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="support-ticket-send-btn"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="support-ticket-textarea"]').attributes('rows')).toBe('6')
  })

  it('disables composer controls when ticket is pending', async () => {
    fetchTicketsMock.mockResolvedValue(ticketFactory('pending'))

    const wrapper = await mountSuspended(TicketList, {
      global: {
        directives: {
          autoAnimate: () => {},
        },
        stubs: {
          'v-empty-state': passthrough(),
          'v-card': passthrough(),
          'v-card-item': passthrough(),
          'v-card-title': passthrough(),
          'v-card-subtitle': passthrough(),
          'v-card-text': passthrough(),
          'v-card-actions': passthrough(),
          'v-timeline': passthrough(),
          'v-timeline-item': passthrough(),
          'v-textarea': VTextareaStub,
          Icon: passthrough('i'),
          PrimaryBtn: PrimaryBtnStub,
        },
      },
    })

    await flushPromises()

    expect(wrapper.find('[data-testid="support-ticket-textarea"]').attributes('disabled')).toBeDefined()
    expect(wrapper.find('[data-testid="support-ticket-send-btn"]').attributes('disabled')).toBeDefined()
    expect(wrapper.text()).toContain('Esperando respuesta del equipo de soporte')
  })
})
