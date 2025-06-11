const i18n_config = () => ({
  legacy: false,
  locale: "es",
  defaultLocale: "es",
  messages: {
    es: {
      forms: {
        required: "Campo es requerido",
        email: "Correo electr\xF3nico inv\xE1lido",
        password: "La contrase\xF1a debe tener al menos 6 caracteres",
        password_confirmation: "Las contrase\xF1as no coinciden",
        number: "N\xFAmero inv\xE1lido",
        zeroIsValid: "Campo es requerido, cero es un valor v\xE1lido",
        location_required: "Debe seleccionar al menos una ubicaci\xF3n"
      },
      tournament_min: "El nombre del torneo debe tener al menos 6 caracteres",
      league_min: "El nombre de la liga debe tener al menos 6 caracteres",
      fields: {
        email: "Correo electr\xF3nico",
        name: "Nombre",
        number: "N\xFAmero"
      },
      $vuetify: {
        open: "Abrir",
        close: "Cerrar",
        datePicker: {
          title: "Seleccione d\xEDa",
          header: "Introduzca d\xEDa",
          cancel: "Cancelar",
          ok: "Aceptar",
          input: {
            placeholder: "Introduzca d\xEDa"
          }
        },
        input: {
          clear: "Limpiar",
          prependAction: "Prepend action",
          appendAction: "Aplicar",
          otp: "OTP"
        },
        noDataText: "No hay datos disponibles",
        pagination: {
          ariaLabel: {
            root: "Paginacion",
            next: "Pagina siguiente",
            previous: "Pagina anterior",
            currentPage: "Pagina actual",
            page: "Pagina"
          }
        },
        infiniteScroll: {
          empty: "No hay mas registros",
          loadMode: "Cargando..."
        },
        stepper: {
          prev: "Anterior",
          next: "Siguiente"
        },
        fileUpload: {
          title: "Subir archivo",
          divider: "o",
          browse: "Buscar"
        }
      }
    }
  }
});

export { i18n_config as default };
//# sourceMappingURL=i18n.config-D1HQ5L9K.mjs.map
