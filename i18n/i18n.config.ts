export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'es',
  defaultLocale: 'es',
  messages: {
    es: {
      forms: {
        required: 'Campo es requerido',
        email: 'Correo electrónico inválido',
        password: 'La contraseña debe tener al menos 6 caracteres',
        password_confirmation: 'Las contraseñas no coinciden',
        number: 'Número inválido',
        zeroIsValid: 'Campo es requerido, cero es un valor válido',
        location_required: 'Debe seleccionar al menos una ubicación',
      },
      tournament_min: 'El nombre del torneo debe tener al menos 6 caracteres',
      league_min: 'El nombre de la liga debe tener al menos 6 caracteres',
      fields: {
        email: 'Correo electrónico',
        name: 'Nombre',
        number: 'Número',
      },
      $vuetify: {
        badge: 'Insignia',
        open: 'Abrir',
        close: 'Cerrar',
        datePicker: {
          title: 'Seleccione día',
          header: 'Introduzca día',
          cancel: 'Cancelar',
          ok: 'Aceptar',
          input: {
            placeholder: 'Introduzca día',
          },
        },
        input: {
          clear: 'Limpiar',
          prependAction: 'Prepend action',
          appendAction: 'Aplicar',
          otp: 'OTP',
        },
        noDataText: 'No hay datos disponibles',
        pagination: {
          ariaLabel: {
            root: 'Paginacion',
            next: 'Pagina siguiente',
            previous: 'Pagina anterior',
            currentPage: 'Pagina actual',
            page: 'Pagina',
          },
        },
        infiniteScroll: {
          empty: 'No hay mas registros',
          loadMode: 'Cargando...',
        },
        stepper: {
          prev: 'Anterior',
          next: 'Siguiente',
        },
        fileUpload: {
          title: 'Subir archivo',
          divider: 'o',
          browse: 'Buscar',
        },
      },
    },
  },
}));
