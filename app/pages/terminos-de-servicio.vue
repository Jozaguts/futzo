<script setup lang="ts">
  definePageMeta({
    layout: 'blank',
    bodyAttrs: {
      class: 'd-none',
    },
    sanctum: {
      excluded: true,
    },
  })
</script>
<template>
  <PageLayout styles="main pa-0">
    <template #default>
      <v-empty-state headline="Términos de servicio" title="Última actualización: 01-Ene-2025">
        <template #media>
          <Icon
              @click="$router.push({ name: 'index' })"
              class="cursor-pointer"
              name="futzo-icon:futzo-horizontal"
              size="100"
          ></Icon>
        </template>
        <v-container>
          <v-row>
            <v-col cols="12">
              <p class="text-body-1">
                Bienvenido a Futzo, un sistema de gestión diseñado para facilitar la administración de ligas
                deportivas y sus respectivas actividades. Al utilizar la plataforma Futzo (en adelante, “el
                Servicio”), usted acepta cumplir con los términos descritos en este documento. Si no está de acuerdo
                con estos términos, debe abstenerse de utilizar el Servicio.
              </p>

              <div class="term-container">
                <h3 class="text-subtitle-1">Cumplimiento Legal</h3>
                <p class="text-body-1">
                  Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)
                </p>
                <p class="text-body-1">
                  Futzo cumple con la LFPDPPP, otorgando a los usuarios derechos ARCO (Acceso, Rectificación,
                  Cancelación y Oposición) sobre sus datos personales.
                </p>
                <p class="text-body-1">Reglamento General de Protección de Datos (GDPR)</p>
                <p class="text-body-1">
                  Si los usuarios residen en la Unión Europea, Futzo garantiza los derechos previstos en el GDPR,
                  incluyendo:
                </p>
                <ul class="term-list">
                  <li class="term-list-item">
                    Derecho al Olvido: Solicitar la eliminación de su información personal.
                  </li>
                  <li class="term-list-item">
                    Portabilidad de Datos: Transferir sus datos a otro proveedor si lo desean.
                  </li>
                </ul>
                <p class="text-body-1">Consentimiento para el Tratamiento de Datos</p>
                <p class="text-body-1">
                  Al registrarse, los usuarios otorgan su consentimiento explícito para el manejo de su información
                  personal conforme a nuestra Política de Privacidad.
                </p>
                <p class="text-body-1">
                  Su privacidad es importante para nosotros. Consulte nuestra
                  <a
                      href="javascript:void(0)"
                      @click="$router.push({ name: 'politica-de-privacidad' })"
                      class="font-weight-medium text-secondary"
                  >Política de Privacidad</a
                  >
                  para comprender cómo recopilamos, utilizamos y protegemos sus datos personales.
                </p>
              </div>
              <div class="term-container">
                <h3 class="text-subtitle-1">Responsabilidad y Limitación</h3>
                <p class="text-body-1">Exclusión de Garantías</p>
                <p class="text-body-1">
                  Futzo se proporciona "tal cual" y "según disponibilidad". Futzo no garantiza:
                </p>
                <ul class="term-list">
                  <li class="term-list-item">La disponibilidad continua del servicio.</li>
                  <li class="term-list-item">La ausencia de errores en la plataforma.</li>
                  <li class="term-list-item">
                    Que la plataforma satisfaga las expectativas particulares de los usuarios.
                  </li>
                </ul>
                <p class="text-body-1">Limitación de Responsabilidad</p>
                <p class="text-body-1">Futzo no será responsable por:</p>
                <ul class="term-list">
                  <li class="term-list-item">Daños indirectos, incidentales o consecuentes.</li>
                  <li class="term-list-item">Pérdidas financieras derivadas del uso del servicio.</li>
                  <li class="term-list-item">
                    Contenido generado por los usuarios que infrinja derechos de terceros.
                  </li>
                </ul>
                <p class="text-body-1">Indemnización</p>
                <p class="text-body-1">
                  Los usuarios acuerdan indemnizar y liberar de responsabilidad a Futzo por cualquier reclamación,
                  daño o pérdida causada por:
                </p>
                <ul class="term-list">
                  <li class="term-list-item">Uso indebido del servicio.</li>
                  <li class="term-list-item">Incumplimiento de estos términos por parte del usuario.</li>
                </ul>
              </div>
              <div class="term-container">
                <h3 class="text-subtitle-1">Propiedad Intelectual</h3>
                <p class="text-body-1">Derechos de Autor y Marcas Registradas</p>
                <p class="text-body-1">
                  Todos los derechos sobre el diseño, código fuente, logotipos y otros elementos de Futzo son
                  propiedad exclusiva de Futzo.io.
                </p>
                <p class="text-body-1">Contenido Generado por Usuarios</p>
                <p class="text-body-1">
                  Los usuarios conservan la propiedad de los datos ingresados en la plataforma. Sin embargo, otorgan a
                  Futzo una licencia no exclusiva para utilizar dichos datos en la operación del servicio.
                </p>
                <p class="text-body-1">Protección del Sistema: Queda prohibido:</p>
                <ul class="term-list">
                  <li class="term-list-item">
                    Intentar descompilar, realizar ingeniería inversa o copiar partes del software.
                  </li>
                  <li class="term-list-item">Utilizar elementos de la marca Futzo sin autorización.</li>
                </ul>
              </div>
              <div class="term-container">
                <h3 class="text-subtitle-1">Conducta del Usuario</h3>
                <p class="text-body-1">Restricciones Generales:</p>
                <ul class="term-list">
                  <li class="term-list-item">Publicar contenido ofensivo, discriminatorio o ilegal.</li>
                  <li class="term-list-item">Usar scripts automatizados, bots o herramientas similares.</li>
                  <li class="term-list-item">Compartir información personal de terceros sin consentimiento.</li>
                </ul>
                <p class="text-body-1">Uso Ético:</p>
                <p class="text-body-1">
                  Los usuarios se comprometen a actuar de buena fe y a no realizar actividades que perjudiquen la
                  reputación de Futzo.
                </p>
              </div>
              <div class="term-container">
                <h3 class="text-subtitle-1">Pagos y Tarifas</h3>
                <p class="text-body-1">Métodos de Pago y Facturación:</p>
                <p class="text-body-1">
                  Los usuarios pueden realizar pagos a través de los métodos habilitados, incluyendo tarjetas de
                  crédito/débito y transferencias bancarias.
                </p>
                <p class="text-body-1">Política de Reembolsos:</p>
                <p class="text-body-1">
                  Los reembolsos estarán sujetos a evaluación, y solo se otorgarán en casos excepcionales, como:
                </p>
                <ul class="term-list">
                  <li class="term-list-item">Errores en el sistema de facturación.</li>
                  <li class="term-list-item">Cancelaciones antes de iniciar el servicio contratado.</li>
                </ul>
                <p class="text-body-1">Impuestos:</p>
                <p class="text-body-1">
                  El usuario es responsable de pagar los impuestos aplicables según las leyes locales.
                </p>
              </div>
              <div class="term-container">
                <h3 class="text-subtitle-1">Flexibilidad y Actualización</h3>
                <p class="text-body-1">Modificaciones a los Términos:</p>
                <p class="text-body-1">
                  Futzo puede modificar estos términos en cualquier momento para reflejar cambios legales,
                  regulatorios o de mercado. Los usuarios serán notificados con al menos 15 días de antelación.
                </p>
                <p class="text-body-1">Aceptación de Cambios:</p>
                <p class="text-body-1">
                  El uso continuado del servicio tras la notificación de cambios implica la aceptación de los nuevos
                  términos.
                </p>
              </div>
              <div class="term-container">
                <h3 class="text-subtitle-1">Seguridad y Protección de Datos</h3>
                <p class="text-body-1">Medidas de Seguridad:</p>
                <p class="text-body-1">Futzo implementa protocolos de seguridad, como:</p>
                <ul class="term-list">
                  <li class="term-list-item">Cifrado de datos sensibles.</li>
                  <li class="term-list-item">Autenticación de dos factores.</li>
                  <li class="term-list-item">Auditorías periódicas del sistema.</li>
                </ul>
                <p class="text-body-1">Notificación de Brechas de Seguridad:</p>
                <p class="text-body-1">
                  En caso de una brecha de seguridad, Futzo notificará a los usuarios afectados dentro de las 72 horas
                  siguientes, conforme a las regulaciones aplicables.
                </p>
              </div>
              <div class="term-container">
                <h3 class="text-subtitle-1">Jurisdicción y Ley Aplicable</h3>
                <p class="text-body-1">
                  Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier controversia será
                  resuelta ante los tribunales competentes de la Ciudad de México.
                </p>
              </div>
              <div class="term-container">
                <h3 class="text-subtitle-1">Uso de Servicios de Registro y Verificación</h3>
                <p class="text-body-1">
                  Futzo integra servicios de terceros como Google, Facebook y WhatsApp para el registro, autenticación
                  y verificación de usuarios. Al utilizar estos servicios, el Usuario acepta las siguientes
                  condiciones:
                </p>
                <p class="text-body-1">Registro y Autenticación con Google y Facebook:</p>
                <ul class="term-list">
                  <li class="term-list-item">
                    El Usuario debe autorizar a Futzo para acceder a los datos mínimos requeridos para completar el
                    proceso de registro (nombre, correo electrónico, etc.).
                  </li>
                  <li class="term-list-item">
                    Futzo no será responsable por problemas relacionados con las cuentas de Google o Facebook (por
                    ejemplo, pérdida de acceso a estas cuentas).
                  </li>
                </ul>
                <p class="text-body-1">Verificación mediante WhatsApp OTP:</p>
                <ul class="term-list">
                  <li class="term-list-item">
                    El Usuario debe proporcionar un número telefónico válido para completar el proceso de
                    verificación.
                  </li>
                  <li class="term-list-item">
                    Es responsabilidad del Usuario proteger el código de verificación y no compartirlo con terceros.
                  </li>
                  <li class="term-list-item">
                    El incumplimiento de esta regla puede resultar en la suspensión de la cuenta.
                  </li>
                </ul>
                <p class="text-body-1">Responsabilidad del Usuario:</p>
                <ul class="term-list">
                  <li class="term-list-item">
                    El Usuario debe garantizar que la información proporcionada durante el registro sea verídica y
                    actualizada.
                  </li>
                  <li class="term-list-item">
                    Futzo no será responsable por el uso indebido de los servicios de terceros, como la transmisión
                    incorrecta de códigos OTP o problemas técnicos ajenos a la plataforma.
                  </li>
                </ul>
                <p class="text-body-1">Políticas de Terceros:</p>
                <p class="text-body-1">
                  Al utilizar Google, Facebook o WhatsApp como parte del proceso, el Usuario está sujeto a las
                  políticas de privacidad de estas plataformas, además de las políticas de Futzo.
                </p>
              </div>
              <div class="term-container">
                <h3 class="text-subtitle-1">Contacto</h3>
                <p class="text-body-1">
                  Para consultas relacionadas con los Términos y Condiciones, por favor, contáctanos a través de:
                </p>
                <p class="text-body-1">
                  Correo electrónico:
                  <a class="font-weight-medium text-secondary" href="mailto:soporte@futzo.io">soporte@futzo.io</a>
                </p>
              </div>
              <div class="term-container">
                <h3 class="text-subtitle-1">Definiciones</h3>
                <ul class="term-list">
                  <li class="term-list-item">
                    Usuario: Persona que accede al Servicio, ya sea como administrador de liga, equipo, jugador,
                    árbitro o cualquier otro rol.
                  </li>
                  <li class="term-list-item">
                    Liga: Conjunto organizado de equipos y torneos registrados en la plataforma.
                  </li>
                  <li class="term-list-item">
                    Torneo: Competencia dentro de una liga, administrada a través del Servicio.
                  </li>
                  <li class="term-list-item">
                    Contenido: Datos ingresados por los usuarios, incluyendo información de equipos, jugadores y
                    partidos.
                  </li>
                  <li class="term-list-item">
                    Administrador: Usuario con permisos para gestionar la liga y sus actividades.
                  </li>
                  <li class="term-list-item">
                    Jugador: Usuario registrado en la plataforma como miembro de un equipo.
                  </li>
                  <li class="term-list-item">Equipo: Grupo de jugadores registrados en la plataforma.</li>
                  <li class="term-list-item">
                    Partido: Encuentro entre dos equipos, programado y registrado en la plataforma.
                  </li>
                  <li class="term-list-item">Servicio: Plataforma Futzo y sus funcionalidades.</li>
                </ul>
              </div>
              <div class="term-container">
                <h3 class="text-subtitle-1">Uso del Servicio</h3>
                <p class="text-body-1">Acceso y Registro</p>
                <p class="term-list-item">
                  Los usuarios deben proporcionar información precisa y completa al registrarse. El incumplimiento
                  puede resultar en la suspensión de la cuenta.
                </p>
                <p class="text-body-1">Roles y Permisos</p>
                <p class="term-list-item">
                  Cada usuario tendrá permisos específicos según su rol asignado (por ejemplo, administrador de liga,
                  jugador).
                </p>
                <p class="text-body-1">Restricciones</p>
                <p class="text-body-1">Queda prohibido:</p>
                <ul class="term-list">
                  <li class="term-list-item">Utilizar la plataforma para actividades ilícitas o fraudulentas.</li>
                  <li class="term-list-item">
                    Intentar acceder, alterar o destruir datos de otros usuarios sin autorización.
                  </li>
                  <li class="term-list-item">Publicar contenido ofensivo, discriminatorio o inapropiado.</li>
                  <li class="term-list-item">Compartir credenciales de acceso con terceros.</li>
                  <li class="term-list-item">Utilizar la plataforma para enviar spam o correos no deseados.</li>
                  <li class="term-list-item">Violación de derechos de autor o propiedad intelectual.</li>
                  <li class="term-list-item">
                    Realizar ingeniería inversa, descompilación o desensamblaje del Servicio.
                  </li>
                  <li class="term-list-item">
                    Utilizar bots, scripts o cualquier otro método automatizado para acceder al Servicio.
                  </li>
                  <li class="term-list-item">
                    Utilizar la plataforma para actividades que puedan afectar su rendimiento o estabilidad.
                  </li>
                  <li class="term-list-item">
                    Compartir información personal de otros usuarios sin su consentimiento.
                  </li>
                </ul>
                <p class="text-body-1">Actualizaciones y Mantenimiento</p>
                <p class="text-body-1">
                  Futzo se reserva el derecho de realizar actualizaciones y mantenimiento en el Servicio sin previo
                  aviso. Los usuarios serán notificados de cualquier interrupción programada.
                </p>
                <p class="text-body-1">Suspensión y Cancelación</p>
                <p class="text-body-1">
                  Futzo se reserva el derecho de suspender o cancelar cuentas que infrinjan los términos de uso. Los
                  usuarios pueden solicitar la eliminación de su cuenta en cualquier momento.
                </p>
                <p class="text-body-1">Responsabilidad del Usuario</p>
                <p class="text-body-1">
                  Los usuarios son responsables de mantener la confidencialidad de sus credenciales de acceso y de
                  cualquier actividad realizada en su cuenta
                </p>
                <p class="text-body-1">Soporte Técnico</p>
                <p class="text-body-1">
                  Futzo proporcionará soporte técnico a los usuarios para resolver problemas relacionados con el
                  Servicio.
                </p>
                <p class="text-body-1">Comunicación</p>
                <p class="text-body-1">
                  Los usuarios aceptan recibir comunicaciones de Futzo, incluyendo correos electrónicos,
                  notificaciones y mensajes en la plataforma.
                </p>
                <p class="text-body-1">Modificaciones</p>
                <p class="text-body-1">
                  Futzo se reserva el derecho de modificar estos términos en cualquier momento. Los usuarios serán
                  notificados de los cambios y deberán aceptarlos para continuar utilizando el Servicio.
                </p>
              </div>
              <div class="term-container">
                <h3 class="text-subtitle-1">Contenido Generado por el Usuario</h3>
                <p class="text-body-1">
                  Los usuarios son responsables del contenido que ingresen en la plataforma. Futzo no asume
                  responsabilidad por errores o inexactitudes en los datos proporcionados por los usuarios.
                </p>
                <p class="text-body-1">Propiedad del Contenido</p>
                <p class="text-body-1">
                  Los usuarios conservan la propiedad de los datos ingresados en la plataforma. Futzo no reclama
                  derechos de propiedad sobre el contenido generado por los usuarios
                </p>
                <p class="text-body-1">Licencia de Uso</p>
                <p class="text-body-1">
                  Al ingresar contenido en la plataforma, los usuarios otorgan a Futzo una licencia no exclusiva para
                  utilizar, modificar y distribuir dicho contenido en el Servicio.
                </p>
                <p class="text-body-1">Eliminación de Contenido</p>
                <p class="text-body-1">
                  Futzo se reserva el derecho de eliminar contenido que infrinja los términos de uso o que sea
                  considerado inapropiado.
                </p>
                <p class="text-body-1">Respaldo de Datos</p>
                <p class="text-body-1">
                  Los usuarios son responsables de realizar copias de seguridad de su contenido en caso de pérdida o
                  eliminación accidental.
                </p>
                <p class="text-body-1">Publicidad y Promoción</p>
                <p class="text-body-1">
                  Futzo se reserva el derecho de utilizar el contenido generado por los usuarios con fines
                  publicitarios y promocionales.
                </p>
                <p class="text-body-1">Protección de Datos</p>
                <p class="text-body-1">
                  Futzo implementará medidas de seguridad para proteger la privacidad y confidencialidad de los datos
                  de los usuarios.
                </p>
                <p class="text-body-1">Acceso a Datos</p>
                <p class="text-body-1">
                  Los usuarios pueden acceder, modificar o eliminar su contenido en cualquier momento a través de la
                  plataforma.
                </p>
                <p class="text-body-1">Retención de Datos</p>
                <p class="text-body-1">
                  Futzo retendrá los datos de los usuarios durante el tiempo necesario para cumplir con sus
                  obligaciones legales y contractuales.
                </p>
              </div>

              <div class="term-container">
                <h3 class="text-subtitle-1">Propiedad Intelectual</h3>
                <p class="text-body-1">
                  Todos los derechos relacionados con el diseño, código fuente, funcionalidad y marca de Futzo
                  pertenecen exclusivamente a futzo.io. Se prohíbe la reproducción, distribución o modificación del
                  Servicio sin autorización previa.
                </p>
                <p class="text-body-1">Marcas Registradas</p>
                <p class="text-body-1">
                  Futzo es una marca registrada de futzo.io. Se prohíbe el uso no autorizado de la marca en cualquier
                  contexto.
                </p>
                <p class="text-body-1">Derechos de Autor</p>
                <p class="text-body-1">
                  Todos los contenidos publicados en la plataforma están protegidos por derechos de autor. Se prohíbe
                  la reproducción o distribución sin autorización.
                </p>
                <p class="text-body-1">Licencia de Uso</p>
                <p class="text-body-1">
                  Los usuarios reciben una licencia limitada para utilizar el Servicio de acuerdo con los términos
                  establecidos en este documento.
                </p>
                <p class="text-body-1">Contenido de Terceros</p>
                <p class="text-body-1">
                  Futzo puede incluir contenido de terceros en la plataforma, sujeto a los términos y condiciones de
                  uso de los proveedores.
                </p>
                <p class="text-body-1">Notificación de Infracción</p>
                <p class="text-body-1">
                  Si un usuario considera que su propiedad intelectual ha sido infringida en la plataforma, debe
                  notificar a Futzo para tomar las medidas correspondientes.
                </p>
                <p class="text-body-1">Protección de Datos</p>
                <p class="text-body-1">
                  Futzo implementará medidas de seguridad para proteger la privacidad y confidencialidad de los datos
                  de los usuarios.
                </p>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-empty-state>
    </template>
  </PageLayout>

</template>
<style lang="scss" scoped>
  .term-container {
    margin-top: 8px;
  }

  .term-list {
    list-style-type: disc;
    padding-left: 20px;
  }

  .term-list-item {
    margin-bottom: 10px;
  }

  .text-h6.term-sub-title {
    margin: 16px;
  }

  p.text-body-1 {
    margin-top: 8px;
  }

  h3.text-subtitle-1 {
    margin-top: 16px;
  }
</style>
