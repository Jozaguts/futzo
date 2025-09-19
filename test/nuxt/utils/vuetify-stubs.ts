import { defineComponent, h } from 'vue';

export const ensureVuetifyApp = () => {
  if (!document.body.hasAttribute('data-app')) {
    document.body.setAttribute('data-app', 'true');
  }
  if (!(globalThis as any).ResizeObserver) {
    (globalThis as any).ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as any;
  }
};

export const iconStub = defineComponent({
  name: 'StubIcon',
  props: {
    name: { type: String, default: '' },
  },
  setup(props, { slots }) {
    return () => h('i', { class: 'icon', 'data-icon': props.name }, slots.default ? slots.default() : undefined);
  },
});

const passthrough = (className: string, tag = 'div') =>
  defineComponent({
    name: `Stub${className}`,
    inheritAttrs: false,
    setup(_, { slots, attrs }) {
      return () =>
        h(
          tag,
          {
            ...attrs,
            class: [className, attrs.class].filter(Boolean),
          },
          slots.default ? slots.default() : undefined
        );
    },
  });

export const vuetifyStubs = {
  'v-app': passthrough('v-app'),
  'v-container': passthrough('v-container'),
  'v-row': passthrough('v-row'),
  'v-col': passthrough('v-col'),
  'v-alert': passthrough('v-alert'),
  'v-card': passthrough('v-card'),
  'v-card-title': passthrough('v-card-title'),
  'v-card-subtitle': passthrough('v-card-subtitle'),
  'v-card-text': passthrough('v-card-text'),
  'v-switch': passthrough('v-switch', 'button'),
  'v-chip-group': passthrough('v-chip-group'),
  'v-chip': passthrough('v-chip', 'button'),
  'v-stepper': passthrough('v-stepper'),
  'v-stepper-header': passthrough('v-stepper-header'),
  'v-stepper-item': passthrough('v-stepper-item'),
  'v-stepper-window': passthrough('v-stepper-window'),
  'v-stepper-window-item': passthrough('v-stepper-window-item'),
  'v-btn': defineComponent({
    name: 'StubVBtn',
    props: {
      disabled: { type: Boolean, default: false },
    },
    emits: ['click'],
    setup(props, { slots, emit, attrs }) {
      return () =>
        h(
          'button',
          {
            type: 'button',
            class: ['v-btn', attrs.class].filter(Boolean),
            disabled: props.disabled,
            onClick: (event: MouseEvent) => emit('click', event),
          },
          [slots.default ? slots.default() : undefined]
        );
    },
  }),
};
