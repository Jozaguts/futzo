export const useCredentialsAccess = () => {
  const {
    canManageCredentials,
    canValidateCredentials,
    canConfigureCredentials,
  } = useRoleAccess()

  const visibleTabs = computed(() => {
    const tabs: Array<{ key: string; label: string; path: string }> = []

    if (canManageCredentials.value) {
      tabs.push(
        { key: 'resumen', label: 'Resumen', path: '/credenciales' },
        { key: 'generar', label: 'Generar', path: '/credenciales/generar' },
        { key: 'disenos', label: 'Diseños', path: '/credenciales/disenos' },
        { key: 'historial', label: 'Historial', path: '/credenciales/historial' }
      )
    }

    if (canValidateCredentials.value) {
      tabs.push({ key: 'validacion', label: 'Validación', path: '/credenciales/validacion' })
    }

    return tabs
  })

  return {
    canManageCredentials,
    canValidateCredentials,
    canConfigureCredentials,
    visibleTabs,
  }
}
