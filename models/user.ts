export interface User {
  id: number;
  name: string;
  email: string;
  league: {} | string;
  roles: string[];
  verified: boolean;
  phone: string;
}
