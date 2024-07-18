export interface User {
  id: number;
  name: string;
  email: string;
  league: {} | string;
  roles: string[];
  verified: boolean;
  phone: string;
}
export interface UpdateUserForm {
  id: number;
  name: string;
  email: string;
  phone: string;
}
