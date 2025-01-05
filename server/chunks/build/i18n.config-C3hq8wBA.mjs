const i18n_config = () => ({
  legacy: false,
  locale: "es",
  defaultLocale: "es",
  messages: {
    es: {
      forms: {
        required: "Campo es requerido"
      },
      tournament_min: "El nombre del torneo debe tener al menos 6 caracteres",
      league_min: "El nombre de la liga debe tener al menos 6 caracteres",
      fields: {
        email: "Correo electr\xF3nico",
        name: "Nombre"
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
          empty: "No hay mas registros"
        }
      }
    }
  }
});

export { i18n_config as default };
//# sourceMappingURL=i18n.config-C3hq8wBA.mjs.map
