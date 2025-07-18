import { Permission } from '~/models/permission';

export type Role = {
  id: number;
  name: string;
  permissions: Permission[];
};
