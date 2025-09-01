import type { OnboardingState, User } from '~/models/user';

export const useOnboardingStore = defineStore(
  'onboarding',
  () => {
    const state = ref<OnboardingState>({
      steps: [],
      next: null,
      all_done: false,
      allowed_paths: ['/'],
    });
    const lastFetched = ref(0);

    // Preferimos /me para tener user + onboarding actualizados
    const load = async (force = false) => {
      const now = Date.now();
      if (!force && now - lastFetched.value < 3000) return; // TTL 3s simple
      const { refreshIdentity } = useSanctumAuth();
      await refreshIdentity();
      const user = useSanctumUser<User>();
      if (user.value?.onboarding) {
        state.value = user.value.onboarding;
        lastFetched.value = now;
      }
    };

    const refresh = async () => load(true);

    const canAccessPath = (path: string) => {
      if (state.value.all_done) return true;
      // Permite index siempre (respaldado por backend)
      if (path === '/') return true;
      // Permitir por prefijo (para subrutas)
      return (state.value.allowed_paths || ['/']).some((p) => path === p || path.startsWith(p + '/'));
    };

    const isDisabled = (path: string) => !canAccessPath(path);

    return { state, load, refresh, canAccessPath, isDisabled };
  },
  {
    // Persiste solo en sessionStorage y se invalida al cerrar pestaña
    persist: {
      storage: sessionStorage,
      pick: ['state', 'lastFetched'],
    },
  }
);
