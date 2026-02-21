import { mountSuspended } from '@nuxt/test-utils/runtime';
import { it, expect, describe } from 'vitest';
import NavigationDrawer from '../../../app/components/layout/navigation-drawer.vue';
import * as vuetifyComponents from 'vuetify/components';

// Vuetify components like VNavigationDrawer require being inside <v-app>
// Minimal ResizeObserver polyfill for tests (happy-dom doesn't include it)
if (!(globalThis as any).ResizeObserver) {
  (globalThis as any).ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as any;
}

describe('NavigationDrawer', () => {
  it('should render the navigation drawer inside VApp', async () => {
    const wrapper = await mountSuspended(
      {
        components: { NavigationDrawer },
        template: '<v-app><NavigationDrawer /></v-app>',
      },
      {
        global: {
          // Use Nuxt-installed Vuetify plugin; only register VApp locally for template
          components: { VApp: (vuetifyComponents as any).VApp },
        },
      }
    );

    // Basic sanity check: component mounts and renders the drawer root
    expect(wrapper.html()).toContain('v-navigation-drawer');
    expect(wrapper.text()).toContain('Credenciales');
  });

  // onboarding-based disabled state removed
});
