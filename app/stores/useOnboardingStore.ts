import type { OnboardingState } from '~/models/User';

const defaultState = {
  steps: [] as OnboardingState['steps'],
  next: null,
  all_done: false,
  allowed_paths: ['/'],
};

export const useOnboardingStore = defineStore(
  'onboarding',
  () => {
    const state = ref<OnboardingState>(defaultState);
    const lastFetched = ref(0);
    const loadedOnce = ref(false);
    const stale = ref(false);
    let inflight: Promise<void> | null = null;

    const clear = () => {
      state.value = defaultState;
      lastFetched.value = 0;
      loadedOnce.value = false;
      stale.value = false;
    };
    const invalidate = () => {
      stale.value = true;
    };
    // Preferimos /me para tener user + onboarding actualizados
    const load = async (force = false) => {
      // Si ya finalizó y no forzamos ni está stale, no vuelvas a pedir
      if (loadedOnce.value && state.value.all_done && !force && !stale.value) return;

      const now = Date.now();
      // TTL solo si NO está all_done; si está all_done, ya retornaríamos arriba
      if (!force && !stale.value && !state.value.all_done && now - lastFetched.value < 3000) return;

      // No pedir si no hay usuario o no está operacional
      const user = useSanctumUser<any>();
      if (!user.value || !user.value.is_operational) {
        clear();
        return;
      }

      // Usa tu wrapper de UseSanctumClient (no $fetch directo)
      const client = useSanctumClient();
      const data = await client('/api/v1/admin/onboarding/steps');
      state.value = data as OnboardingState;

      loadedOnce.value = true;
      stale.value = false;
      lastFetched.value = now;
    };
    const loadSafe = async (force = false) => {
      if (inflight) return inflight;
      inflight = (async () => {
        try {
          await load(force);
        } catch {
        } finally {
          inflight = null;
        }
      })();
      return inflight;
    };

    const refresh = async () => {
      await loadSafe(true);
    };

    const canAccessPath = (path: string) => {
      if (state.value.all_done) return true;
      // Permite index siempre (respaldado por backend)
      if (path === '/') return true;
      // Permitir por prefijo (para subrutas)
      return (state.value.allowed_paths || ['/']).some((p: string) => path === p || path.startsWith(p + '/'));
    };

    const isDisabled = (path: string) => !canAccessPath(path);

    const doneStepsCound = computed(() => {
      return `${state.value.steps.filter((s) => s?.done)?.length}/${state.value.steps.length}`;
    });
    const $reset = () => {
      state.value = {
        steps: [] as OnboardingState['steps'],
        next: null,
        all_done: false,
        allowed_paths: ['/'],
      };
      lastFetched.value = 0;
    };

    return { state, load, refresh, canAccessPath, isDisabled, doneStepsCound, $reset, loadSafe, invalidate };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.sessionStorage(),
      pick: ['state', 'lastFetched'],
    },
  }
);
