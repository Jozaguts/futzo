export type AuthForm = {
  remember?: boolean | null | undefined;
  name?: string | null | undefined;
  inputType?: string | null | undefined;
  isSignUp: boolean | null;
  password: string;
  username: string;
};

export interface User {
  id: number;
  name: string;
  last_name: string;
  email: string;
  league: League;
  has_league: boolean;
  roles: string[];
  verified: boolean;
  phone: string;
  image: string;
  onboarding: OnboardingState;
  is_operational: boolean;
  subscribed: boolean;
  plan: {
    billing_period: string;
    product: { sku: string; name: string; description: string };
  };
}
export type OnboardingStep = {
  id: string;
  title: string;
  description: string;
  done: boolean;
  link: string;
  blocking: boolean;
};
export type OnboardingState = {
  steps: OnboardingStep[];
  next: string | null;
  all_done: boolean;
  allowed_paths: string[];
};

export interface UpdateUserForm {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface UpdateUserPasswordForm {
  id: number;
  password: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface League {
  banner: string;
  created_at: string;
  creation_date: string;
  deleted_at: string | null;
  description: string;
  football_type_id: number;
  id: number;
  location: {} | null;
  logo: string;
  name: string;
  status: string;
  updated_at: string;
}

export type ResetPasswordState = {
  step: ResetPasswordSteps;
  username: string;
  areaCode: string;
  isPhone: boolean;
  isFetching: boolean;
  code: string;
  token: string;
};
export type ResetPasswordSteps = 'reset-password' | 'verify-code' | 'confirm-password' | 'email-sent';
