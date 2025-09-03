import type { OnboardingState } from '~/models/User';

export const getOnboardingState = async () => {
  const client = useSanctumClient();
  return await client<OnboardingState>('/api/v1/admin/onboarding/steps');
};
