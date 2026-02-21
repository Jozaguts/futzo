import type {
  CredentialArtifactVariant,
  CredentialBatchCreatePayload,
  CredentialBatchCreateResponse,
  CredentialDesign,
  CredentialSettings,
  CredentialSettingsResource,
  CredentialValidationResponse,
  CredentialsBatch,
  CredentialsDashboardResponse,
  CredentialsDesignsResponse,
  CredentialsGeneratorCatalogsResponse,
  CredentialsHistoryQuery,
  CredentialHistoryCollection,
  CredentialHistoryDetail,
} from '~/types/credentials'

const CREDENTIALS_BASE_PATH = '/api/v1/admin/credentials'

type MaybeWrapped<T> = T | { data?: T }

const unwrapData = <T>(payload: MaybeWrapped<T>): T => {
  if (payload && typeof payload === 'object' && 'data' in payload) {
    const data = (payload as { data?: T }).data
    if (data !== undefined) {
      return data
    }
  }
  return payload as T
}

export const getCredentialsDashboard = async () => {
  const client = useSanctumClient()
  return await client<CredentialsDashboardResponse>(`${CREDENTIALS_BASE_PATH}/dashboard`)
}

export const getCredentialsGeneratorCatalogs = async (query: Record<string, unknown> = {}) => {
  const client = useSanctumClient()
  return await client<CredentialsGeneratorCatalogsResponse>(`${CREDENTIALS_BASE_PATH}/generator/catalogs`, {
    query,
  })
}

export const createCredentialsBatch = async (payload: CredentialBatchCreatePayload) => {
  const client = useSanctumClient()
  return await client<CredentialBatchCreateResponse>(`${CREDENTIALS_BASE_PATH}/batches`, {
    method: 'POST',
    body: payload,
  })
}

export const getCredentialsBatch = async (batchId: number | string) => {
  const client = useSanctumClient()
  return await client<CredentialsBatch>(`${CREDENTIALS_BASE_PATH}/batches/${batchId}`)
}

export const downloadCredentialsBatchArtifact = async (
  batchId: number | string,
  variant?: CredentialArtifactVariant | string
) => {
  const client = useSanctumClient()
  return await client<Blob>(`${CREDENTIALS_BASE_PATH}/batches/${batchId}/artifact`, {
    method: 'GET',
    query: variant ? { variant } : undefined,
    responseType: 'blob' as 'json',
  })
}

export const getCredentialsDesigns = async () => {
  const client = useSanctumClient()
  return await client<CredentialsDesignsResponse>(`${CREDENTIALS_BASE_PATH}/designs`)
}

export const createCredentialDesign = async (payload: Partial<CredentialDesign>) => {
  const client = useSanctumClient()
  return await client<CredentialDesign>(`${CREDENTIALS_BASE_PATH}/designs`, {
    method: 'POST',
    body: payload,
  })
}

export const updateCredentialDesign = async (designId: number, payload: Partial<CredentialDesign>) => {
  const client = useSanctumClient()
  return await client<CredentialDesign>(`${CREDENTIALS_BASE_PATH}/designs/${designId}`, {
    method: 'PATCH',
    body: payload,
  })
}

export const duplicateCredentialDesign = async (designId: number) => {
  const client = useSanctumClient()
  return await client<CredentialDesign>(`${CREDENTIALS_BASE_PATH}/designs/${designId}/duplicate`, {
    method: 'POST',
  })
}

export const restoreCredentialDesign = async (designId: number) => {
  const client = useSanctumClient()
  return await client<CredentialDesign>(`${CREDENTIALS_BASE_PATH}/designs/${designId}/restore`, {
    method: 'POST',
  })
}

export const uploadCredentialDesignLogo = async (designId: number, logo: File) => {
  const client = useSanctumClient()
  const formData = new FormData()
  formData.append('logo', logo)

  return await client<CredentialDesign>(`${CREDENTIALS_BASE_PATH}/designs/${designId}/logo`, {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
    },
  })
}

export const getCredentialSettings = async () => {
  const client = useSanctumClient()
  return await client<CredentialSettingsResource>(`${CREDENTIALS_BASE_PATH}/settings`)
}

export const updateCredentialSettings = async (payload: CredentialSettings) => {
  const client = useSanctumClient()
  return await client<CredentialSettingsResource>(`${CREDENTIALS_BASE_PATH}/settings`, {
    method: 'PUT',
    body: payload,
  })
}

export const getCredentialTournamentSettings = async (tournamentId: number) => {
  const client = useSanctumClient()
  return await client<CredentialSettingsResource>(`${CREDENTIALS_BASE_PATH}/settings/tournaments/${tournamentId}`)
}

export const updateCredentialTournamentSettings = async (tournamentId: number, payload: CredentialSettings) => {
  const client = useSanctumClient()
  return await client<CredentialSettingsResource>(`${CREDENTIALS_BASE_PATH}/settings/tournaments/${tournamentId}`, {
    method: 'PUT',
    body: payload,
  })
}

export const validateCredential = async (inputCode: string) => {
  const client = useSanctumClient()
  return await client<CredentialValidationResponse>(`${CREDENTIALS_BASE_PATH}/validation`, {
    method: 'POST',
    body: { input_code: inputCode },
  })
}

export const getCredentialHistory = async (query: CredentialsHistoryQuery = {}) => {
  const client = useSanctumClient()
  return await client<CredentialHistoryCollection>(`${CREDENTIALS_BASE_PATH}/history`, {
    query,
  })
}

export const getCredentialHistoryDetail = async (credentialId: number) => {
  const client = useSanctumClient()
  const response = await client<MaybeWrapped<CredentialHistoryDetail>>(`${CREDENTIALS_BASE_PATH}/history/${credentialId}`)
  return unwrapData(response)
}

export const reprintCredentialFromHistory = async (credentialId: number) => {
  const client = useSanctumClient()
  return await client<CredentialBatchCreateResponse>(`${CREDENTIALS_BASE_PATH}/history/${credentialId}/reprint`, {
    method: 'POST',
  })
}

export const invalidateCredentialFromHistory = async (credentialId: number, reason: string) => {
  const client = useSanctumClient()
  return await client<{ message: string; data: CredentialHistoryDetail }>(
    `${CREDENTIALS_BASE_PATH}/history/${credentialId}/invalidate`,
    {
      method: 'POST',
      body: { reason },
    }
  )
}

export const toBatchProgress = (batch: CredentialsBatch): CredentialsBatch => {
  if (!batch.available_artifact_variants && batch.artifacts) {
    batch.available_artifact_variants = Object.keys(batch.artifacts) as CredentialArtifactVariant[]
  }

  if (!batch.artifacts && batch.artifact_disk && batch.artifact_path) {
    batch.artifacts = {
      pdf: {
        disk: batch.artifact_disk,
        path: batch.artifact_path,
      },
    }
    batch.available_artifact_variants = ['pdf']
  }

  return batch
}
