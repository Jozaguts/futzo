import type { OnboardingState } from '~/models/user';

export const getOnboardingState = async () => {
  const client = useSanctumClient();
  return await client<Promise<OnboardingState>>('/api/v1/admin/onboarding/steps');
};
