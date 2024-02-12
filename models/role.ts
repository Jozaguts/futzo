import {Permission} from "~/models/permission"

 interface Role {
    id: number;
    name: string;
    permissions: Permission[];
}
export {Role}