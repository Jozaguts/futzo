<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Roles y permisos" >
        <VCardItem >
         <VCardTitle>
          <InputSearchComponent @onSearch="filterModel" />
         </VCardTitle>
         <div class="d-flex">
           <VSpacer />
           <VCardSubtitle>
             <VBtn class="mt-2">
               +
             </VBtn>
           </VCardSubtitle>
         </div>
        </VCardItem>
        <VTable hover="true">
          <thead>
          <tr>
            <th class="text-uppercase text-center">
              Nombre
            </th>
            <th class="text-uppercase text-center">
              Acciones
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="role in roles" :key="role.id">
            <td class="text-center text-capitalize" >{{role.name}}</td>
            <td class="text-center d-lg-block d-md-block d-flex py-2">
              <VBtn
                  class="mx-2 my-lg-0"
                  color="primary"
                  @click="toggleDialog(role)"
                  :size=" mobile ? 'small' : 'default'"
              >Editar
              </VBtn>
              <VBtn   class="my-auto my-lg-0"
                      color="error"
                      :size=" mobile ? 'small' : 'default'"
              >Eliminar
              </VBtn>
            </td>
          </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
    <Modal :title="formData.name " :width="800" ref="dialog" :persistent="true">
      <template #content>
        <VForm :min-height="440">
          <VRow>
            <VCol cols="12">
              <VAutocomplete
                  label="Permisos"
                  :items="permissions"
                  item-title="name"
                  return-object
                  multiple
                  v-model="formData.permissions"
              ></VAutocomplete>
            </VCol>
            <VCol cols="12">
              <VRow>
                <VCol cols="12" md="6" lg="6" v-for="({name,id}) in formData.permissions" :key="name">
                  <VList density="compact">
                    <VListItem>
                      <VListItemTitle>
                        <template #default>
                          <span class="text-capitalize">{{name}}</span> <VIcon @click="removePermission(id)" size="x-small" color='red' icon="mdi-close"></VIcon>
                        </template>
                      </VListItemTitle>
                    </VListItem>
                  </VList>
                </VCol>
              </VRow>
            </VCol>
          </VRow>
        </VForm>
      </template>
      <template #actions>
        <VCol cols="12" >
         <div class="d-flex justify-end">
           <VBtn :block="mobile" color="secondary" @click="closeDialog">Cancelar</VBtn>
           <VBtn :block="mobile" @click="updatePermissions">Actualizar</VBtn>
         </div>
        </VCol>
      </template>
    </Modal>
  </VRow>
</template>
<script setup lang="ts">
import InputSearchComponent from "~/components/shared/InputSearchComponent.vue";
import Modal from '~/components/shared/Modal.vue'
import {useAdminStore} from "~/store";
import {storeToRefs} from "pinia";
import {useDisplay} from "vuetify";
import {Role, Permission} from "~/interfaces";
await useAdminStore().getRolesAndPermissions()
const {mobile} = useDisplay()
const adminStore = storeToRefs(useAdminStore())
const {roles,permissions} = adminStore
const dialog = ref(null)
const formData = ref({} as Role)
const toggleDialog = (role: Role) => {
  formData.value.permissions = [...role.permissions]
  formData.value.id = role.id
  dialog.value.toggle()
}
const closeDialog = () => {
  formData.value.permissions = []
  dialog.value.toggle()
}
const filterModel = async (value) => {
  if (value === '') {
    await getRolesFromAdminStore();
  } else {
    filterRolesByName(value);
  }
}

const getRolesFromAdminStore = async () => {
  await useAdminStore().getRolesAndPermissions();
}

const filterRolesByName = (value) => {
  roles.value = roles.value.filter(role => role.name.toLowerCase().includes(value.toLowerCase()));
}
const removePermission = (permissionId: number) => {
  formData.value.permissions = formData.value.permissions.filter(permission => permission.id !== permissionId)
}
const updatePermissions = async () => {
  await useAdminStore().updateRole(formData.value)
  await getRolesFromAdminStore();
  dialog.value.toggle()
}
</script>