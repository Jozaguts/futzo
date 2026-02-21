<script setup lang="ts">
import {
  duplicateCredentialDesign,
  getCredentialsDesigns,
  restoreCredentialDesign,
  updateCredentialDesign,
  uploadCredentialDesignLogo,
} from '~/http/api/credentials'
import type { CredentialDesign, CredentialsDesignsResponse } from '~/types/credentials'
import CredentialsPaywallAlert from '~/components/pages/credentials/CredentialsPaywallAlert.vue'
import { useCredentialsErrors } from '~/composables/credentials/useCredentialsErrors'

const { toast } = useToast()
const { parseError } = useCredentialsErrors()

const loading = ref(false)
const saving = ref(false)
const errorMessage = ref<string | null>(null)
const paywallCheckoutUrl = ref<string | null>(null)
const designs = ref<CredentialsDesignsResponse | null>(null)

const editDialog = reactive({
  open: false,
  id: 0,
  name: '',
  primary_color: '#2d5bff',
  secondary_color: '#1f2937',
})

const officialDesigns = computed(() => designs.value?.official ?? [])
const seasonalDesigns = computed(() => designs.value?.seasonal ?? [])

const openEdit = (design: CredentialDesign) => {
  editDialog.open = true
  editDialog.id = design.id
  editDialog.name = design.name
  editDialog.primary_color = design.style_config?.primary_color || '#2d5bff'
  editDialog.secondary_color = design.style_config?.secondary_color || '#1f2937'
}

const loadDesigns = async () => {
  loading.value = true
  errorMessage.value = null
  paywallCheckoutUrl.value = null
  try {
    designs.value = await getCredentialsDesigns()
  } catch (error: any) {
    const parsed = parseError(error)
    errorMessage.value = parsed.message
    if (parsed.status === 402) {
      paywallCheckoutUrl.value = parsed.checkoutUrl
    }
  } finally {
    loading.value = false
  }
}

const runAction = async (handler: () => Promise<unknown>, successMessage: string) => {
  saving.value = true
  try {
    await handler()
    toast({ type: 'success', msg: successMessage })
    await loadDesigns()
  } catch (error: any) {
    const parsed = parseError(error)
    if (parsed.status === 402) {
      paywallCheckoutUrl.value = parsed.checkoutUrl
    }
  } finally {
    saving.value = false
  }
}

const saveEdition = async () => {
  await runAction(
    () =>
      updateCredentialDesign(editDialog.id, {
        name: editDialog.name,
        style_config: {
          primary_color: editDialog.primary_color,
          secondary_color: editDialog.secondary_color,
        },
      }),
    'Diseño actualizado'
  )
  editDialog.open = false
}

const duplicate = async (design: CredentialDesign) => {
  await runAction(() => duplicateCredentialDesign(design.id), 'Diseño duplicado')
}

const restore = async (design: CredentialDesign) => {
  await runAction(() => restoreCredentialDesign(design.id), 'Diseño restaurado')
}

const uploadLogo = async (design: CredentialDesign, event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  const supported = ['image/jpeg', 'image/png', 'image/webp']
  if (!supported.includes(file.type)) {
    toast({ type: 'warning', msg: 'Archivo inválido', description: 'Solo JPG, PNG o WEBP.' })
    input.value = ''
    return
  }

  if (file.size > 3 * 1024 * 1024) {
    toast({ type: 'warning', msg: 'Archivo demasiado grande', description: 'Máximo 3MB.' })
    input.value = ''
    return
  }

  await runAction(() => uploadCredentialDesignLogo(design.id, file), 'Logo actualizado')
  input.value = ''
}

onMounted(() => {
  void loadDesigns()
})
</script>

<template>
  <div class="credentials-designs" data-testid="credentials-designs-page">
    <CredentialsPaywallAlert :checkout-url="paywallCheckoutUrl" />

    <div v-if="loading">
      <v-skeleton-loader type="card, card" />
    </div>

    <div v-else-if="errorMessage">
      <v-alert type="error" variant="tonal">{{ errorMessage }}</v-alert>
      <v-btn class="mt-3" variant="outlined" color="primary" @click="loadDesigns">Reintentar</v-btn>
    </div>

    <template v-else>
      <section class="panel">
        <div class="panel__header">
          <h2 class="panel__title">Diseños oficiales</h2>
        </div>
        <div class="panel__body credentials-designs__grid">
          <article v-for="design in officialDesigns" :key="design.id" class="credentials-design-card">
            <header>
              <h3>{{ design.name }}</h3>
              <v-chip size="x-small" :color="design.locked_by_plan ? 'warning' : 'success'" variant="tonal">
                {{ design.locked_by_plan ? 'Bloqueado' : 'Activo' }}
              </v-chip>
            </header>

            <p>{{ design.slug }}</p>

            <div class="credentials-design-card__actions">
              <v-btn size="small" variant="text" :disabled="design.locked_by_plan" @click="openEdit(design)">Editar</v-btn>
              <v-btn size="small" variant="text" :disabled="design.locked_by_plan" @click="duplicate(design)">Duplicar</v-btn>
              <v-btn size="small" variant="text" :disabled="design.locked_by_plan" @click="restore(design)">Restablecer</v-btn>
              <label class="credentials-design-card__upload" :class="{ 'credentials-design-card__upload--disabled': design.locked_by_plan }">
                Subir logo
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  :disabled="design.locked_by_plan"
                  @change="uploadLogo(design, $event)"
                />
              </label>
            </div>
          </article>
        </div>
      </section>

      <section class="panel">
        <div class="panel__header">
          <h2 class="panel__title">Diseños seasonal FIFA</h2>
        </div>
        <div class="panel__body credentials-designs__grid">
          <article v-for="design in seasonalDesigns" :key="design.id" class="credentials-design-card">
            <header>
              <h3>{{ design.name }}</h3>
              <v-chip size="x-small" :color="design.locked_by_plan ? 'warning' : 'success'" variant="tonal">
                {{ design.locked_by_plan ? 'Bloqueado por plan' : 'Disponible' }}
              </v-chip>
            </header>
            <p>{{ design.season_label || 'Temporada' }}</p>

            <div class="credentials-design-card__actions">
              <v-btn size="small" variant="text" :disabled="design.locked_by_plan" @click="openEdit(design)">Editar</v-btn>
              <v-btn size="small" variant="text" :disabled="design.locked_by_plan" @click="duplicate(design)">Duplicar</v-btn>
              <v-btn size="small" variant="text" :disabled="design.locked_by_plan" @click="restore(design)">Restablecer</v-btn>
              <label class="credentials-design-card__upload" :class="{ 'credentials-design-card__upload--disabled': design.locked_by_plan }">
                Subir logo
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  :disabled="design.locked_by_plan"
                  @change="uploadLogo(design, $event)"
                />
              </label>
            </div>
          </article>
          <div v-if="!seasonalDesigns.length" class="credentials-designs__empty">No hay diseños seasonal disponibles.</div>
        </div>
      </section>
    </template>

    <v-dialog v-model="editDialog.open" max-width="520">
      <v-card>
        <v-card-title>Editar diseño</v-card-title>
        <v-card-text>
          <v-text-field v-model="editDialog.name" label="Nombre" variant="outlined" density="compact" />
          <v-text-field v-model="editDialog.primary_color" label="Color primario" variant="outlined" density="compact" />
          <v-text-field
            v-model="editDialog.secondary_color"
            label="Color secundario"
            variant="outlined"
            density="compact"
          />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="editDialog.open = false">Cancelar</v-btn>
          <v-btn color="primary" :loading="saving" @click="saveEdition">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.credentials-designs {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.credentials-designs__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.credentials-design-card {
  border: 1px solid #eaecf0;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #fff;
}

.credentials-design-card header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.credentials-design-card h3 {
  margin: 0;
  font-size: 15px;
  color: #101828;
}

.credentials-design-card p {
  margin: 0;
  color: #667085;
  font-size: 13px;
}

.credentials-design-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.credentials-design-card__upload {
  position: relative;
  display: inline-flex;
  align-items: center;
  border: 1px solid #eaecf0;
  border-radius: 10px;
  padding: 6px 10px;
  font-size: 12px;
  color: #344054;
  cursor: pointer;
}

.credentials-design-card__upload input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.credentials-design-card__upload--disabled {
  opacity: 0.6;
  pointer-events: none;
}

.credentials-designs__empty {
  border: 1px dashed #d0d5dd;
  border-radius: 12px;
  padding: 16px;
  color: #667085;
}

@media (width > 960px) {
  .credentials-designs__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
