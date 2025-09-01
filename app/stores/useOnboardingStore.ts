import { getOnboardingState } from '~/http/api/onboarding';
import type { OnboardingState } from '~/models/user';

export const useOnboardingStore = defineStore('onboarding', () => {
  const state = ref<OnboardingState>({
    steps: [],
    next: '/ubicaciones',
    all_done: false,
    allowed_paths: ['/'],
  });
  const load = async () => {
    state.value = await getOnboardingState();
  };
  const refresh = async () => {
    await load();
  };
  return {
    state,
    load,
    refresh,
  };
});
