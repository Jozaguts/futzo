import { mountSuspended } from '@nuxt/test-utils/runtime';
import { it, expect, describe, vi } from 'vitest';
import { ref, nextTick } from 'vue';
import NavigationDrawer from '../../../app/components/layout/navigation-drawer.vue';
import { createVuetify } from 'vuetify';
import * as vuetifyComponents from 'vuetify/components';
import * as vuetifyDirectives from 'vuetify/directives';

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
  });

  it('renders disabled items according to onboarding store', async () => {
    // Mock onboarding store to disable Equipos and Jugadores
    vi.doMock('~/stores/useOnboardingStore', () => ({
      useOnboardingStore: () => ({
        state: ref({ steps: [], next: null, all_done: false, allowed_paths: ['/'] }),
        isDisabled: (path: string) => path === '/equipos' || path === '/jugadores',
        loadSafe: vi.fn(),
        $reset: vi.fn(),
      }),
    }));

    // Provide an operational user
    vi.doMock('~/stores/useAuthStore', () => ({
      useAuthStore: () => ({ user: ref({ is_operational: true, name: 'Tester', email: 't@example.com' }) }),
    }));

    const wrapper = await mountSuspended(
      {
        components: { NavigationDrawer },
        template: '<v-app><NavigationDrawer /></v-app>',
      },
      {
        global: {
          components: { VApp: (vuetifyComponents as any).VApp },
        },
      }
    );

    await nextTick();

    const items = wrapper.findAll('.v-list-item');
    // Expect at least the 5 main links
    expect(items.length).toBeGreaterThanOrEqual(5);

    const findItem = (label: string) => items.find((i) => i.text().includes(label));
    const equipos = findItem('Equipos');
    const jugadores = findItem('Jugadores');

    expect(equipos).toBeTruthy();
    expect(jugadores).toBeTruthy();

    // Vuetify applies disabled class/aria when disabled
    expect(equipos!.classes()).toContain('v-list-item--disabled');
    expect(jugadores!.classes()).toContain('v-list-item--disabled');
  });
});
