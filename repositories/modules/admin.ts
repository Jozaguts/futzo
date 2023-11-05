import HttpFactory from "~/repositories/factory";
import {Role} from "~/interfaces";
export class AdminModule extends HttpFactory {
   async getRolesAndPermissions(): Promise<Role[]> {
        return await this.call<Promise<Role[]>>('GET','/admin/roles');
   }
   async updateRole(role: Role): Promise<Role[]> {
       return await this.call<Promise<Role[]>>('POST',`/admin/roles/${role.id}`,{ permissions: role.permissions, _method: 'PUT' })
   }
}
