import { _ as __nuxt_component_0 } from './index-DkcY5wU8.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { V as VContainer } from './VContainer-C0Se5csP.mjs';
import { V as VRow, a as VCol } from './VRow-CwLG7ojV.mjs';
import { V as VEmptyState } from './VEmptyState-BP9R9rJP.mjs';
import { _ as _export_sfc } from './server.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'node:module';
import 'ipx';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import './VBtn-_od1f1mx.mjs';
import 'pinia';
import 'vue-router';
import 'perfect-scrollbar';
import 'deep-pick-omit';
import 'dayjs';
import 'dayjs/plugin/customParseFormat.js';
import 'dayjs/locale/es.js';
import 'awesome-phonenumber';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "terminos-de-servicio",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(ssrRenderComponent(VContainer, mergeProps({ class: "mb-8" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VEmptyState, {
                          headline: "T\xE9rminos de servicio",
                          title: "\xDAltima actualizaci\xF3n: 01-Ene-2025"
                        }, {
                          media: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_Icon, {
                                onClick: ($event) => _ctx.$router.push({ name: "index" }),
                                class: "cursor-pointer",
                                name: "futzo-icon:futzo-horizontal",
                                size: "100"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_Icon, {
                                  onClick: ($event) => _ctx.$router.push({ name: "index" }),
                                  class: "cursor-pointer",
                                  name: "futzo-icon:futzo-horizontal",
                                  size: "100"
                                }, null, 8, ["onClick"])
                              ];
                            }
                          }),
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VContainer, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VRow, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VCol, { cols: "12" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<p class="text-body-1" data-v-ce250240${_scopeId7}> Bienvenido a Futzo, un sistema de gesti\xF3n dise\xF1ado para facilitar la administraci\xF3n de ligas deportivas y sus respectivas actividades. Al utilizar la plataforma Futzo (en adelante, \u201Cel Servicio\u201D), usted acepta cumplir con los t\xE9rminos descritos en este documento. Si no est\xE1 de acuerdo con estos t\xE9rminos, debe abstenerse de utilizar el Servicio. </p><div class="term-container" data-v-ce250240${_scopeId7}><h3 class="text-subtitle-1" data-v-ce250240${_scopeId7}>Cumplimiento Legal</h3><p class="text-body-1" data-v-ce250240${_scopeId7}> Ley Federal de Protecci\xF3n de Datos Personales en Posesi\xF3n de los Particulares (LFPDPPP) </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Futzo cumple con la LFPDPPP, otorgando a los usuarios derechos ARCO (Acceso, Rectificaci\xF3n, Cancelaci\xF3n y Oposici\xF3n) sobre sus datos personales. </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Reglamento General de Protecci\xF3n de Datos (GDPR) </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Si los usuarios residen en la Uni\xF3n Europea, Futzo garantiza los derechos previstos en el GDPR, incluyendo: </p><ul class="term-list" data-v-ce250240${_scopeId7}><li class="term-list-item" data-v-ce250240${_scopeId7}> Derecho al Olvido: Solicitar la eliminaci\xF3n de su informaci\xF3n personal. </li><li class="term-list-item" data-v-ce250240${_scopeId7}> Portabilidad de Datos: Transferir sus datos a otro proveedor si lo desean. </li></ul><p class="text-body-1" data-v-ce250240${_scopeId7}> Consentimiento para el Tratamiento de Datos </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Al registrarse, los usuarios otorgan su consentimiento expl\xEDcito para el manejo de su informaci\xF3n personal conforme a nuestra Pol\xEDtica de Privacidad. </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Su privacidad es importante para nosotros. Consulte nuestra <a href="javascript:void(0)" class="font-weight-medium text-secondary" data-v-ce250240${_scopeId7}>Pol\xEDtica de Privacidad</a> para comprender c\xF3mo recopilamos, utilizamos y protegemos sus datos personales. </p></div><div class="term-container" data-v-ce250240${_scopeId7}><h3 class="text-subtitle-1" data-v-ce250240${_scopeId7}> Responsabilidad y Limitaci\xF3n </h3><p class="text-body-1" data-v-ce250240${_scopeId7}> Exclusi\xF3n de Garant\xEDas </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Futzo se proporciona &quot;tal cual&quot; y &quot;seg\xFAn disponibilidad&quot;. Futzo no garantiza: </p><ul class="term-list" data-v-ce250240${_scopeId7}><li class="term-list-item" data-v-ce250240${_scopeId7}> La disponibilidad continua del servicio. </li><li class="term-list-item" data-v-ce250240${_scopeId7}> La ausencia de errores en la plataforma. </li><li class="term-list-item" data-v-ce250240${_scopeId7}> Que la plataforma satisfaga las expectativas particulares de los usuarios. </li></ul><p class="text-body-1" data-v-ce250240${_scopeId7}> Limitaci\xF3n de Responsabilidad </p><p class="text-body-1" data-v-ce250240${_scopeId7}>Futzo no ser\xE1 responsable por:</p><ul class="term-list" data-v-ce250240${_scopeId7}><li class="term-list-item" data-v-ce250240${_scopeId7}> Da\xF1os indirectos, incidentales o consecuentes. </li><li class="term-list-item" data-v-ce250240${_scopeId7}> P\xE9rdidas financieras derivadas del uso del servicio. </li><li class="term-list-item" data-v-ce250240${_scopeId7}> Contenido generado por los usuarios que infrinja derechos de terceros. </li></ul><p class="text-body-1" data-v-ce250240${_scopeId7}>Indemnizaci\xF3n</p><p class="text-body-1" data-v-ce250240${_scopeId7}> Los usuarios acuerdan indemnizar y liberar de responsabilidad a Futzo por cualquier reclamaci\xF3n, da\xF1o o p\xE9rdida causada por: </p><ul class="term-list" data-v-ce250240${_scopeId7}><li class="term-list-item" data-v-ce250240${_scopeId7}>Uso indebido del servicio.</li><li class="term-list-item" data-v-ce250240${_scopeId7}> Incumplimiento de estos t\xE9rminos por parte del usuario. </li></ul></div><div class="term-container" data-v-ce250240${_scopeId7}><h3 class="text-subtitle-1" data-v-ce250240${_scopeId7}>Propiedad Intelectual</h3><p class="text-body-1" data-v-ce250240${_scopeId7}> Derechos de Autor y Marcas Registradas </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Todos los derechos sobre el dise\xF1o, c\xF3digo fuente, logotipos y otros elementos de Futzo son propiedad exclusiva de Futzo.io. </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Contenido Generado por Usuarios </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Los usuarios conservan la propiedad de los datos ingresados en la plataforma. Sin embargo, otorgan a Futzo una licencia no exclusiva para utilizar dichos datos en la operaci\xF3n del servicio. </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Protecci\xF3n del Sistema: Queda prohibido: </p><ul class="term-list" data-v-ce250240${_scopeId7}><li class="term-list-item" data-v-ce250240${_scopeId7}> Intentar descompilar, realizar ingenier\xEDa inversa o copiar partes del software. </li><li class="term-list-item" data-v-ce250240${_scopeId7}> Utilizar elementos de la marca Futzo sin autorizaci\xF3n. </li></ul></div><div class="term-container" data-v-ce250240${_scopeId7}><h3 class="text-subtitle-1" data-v-ce250240${_scopeId7}>Conducta del Usuario</h3><p class="text-body-1" data-v-ce250240${_scopeId7}> Restricciones Generales: </p><ul class="term-list" data-v-ce250240${_scopeId7}><li class="term-list-item" data-v-ce250240${_scopeId7}> Publicar contenido ofensivo, discriminatorio o ilegal. </li><li class="term-list-item" data-v-ce250240${_scopeId7}> Usar scripts automatizados, bots o herramientas similares. </li><li class="term-list-item" data-v-ce250240${_scopeId7}> Compartir informaci\xF3n personal de terceros sin consentimiento. </li></ul><p class="text-body-1" data-v-ce250240${_scopeId7}> Uso \xC9tico:</p><p class="text-body-1" data-v-ce250240${_scopeId7}> Los usuarios se comprometen a actuar de buena fe y a no realizar actividades que perjudiquen la reputaci\xF3n de Futzo. </p></div><div class="term-container" data-v-ce250240${_scopeId7}><h3 class="text-subtitle-1" data-v-ce250240${_scopeId7}>Pagos y Tarifas</h3><p class="text-body-1" data-v-ce250240${_scopeId7}> M\xE9todos de Pago y Facturaci\xF3n: </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Los usuarios pueden realizar pagos a trav\xE9s de los m\xE9todos habilitados, incluyendo tarjetas de cr\xE9dito/d\xE9bito y transferencias bancarias. </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Pol\xEDtica de Reembolsos: </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Los reembolsos estar\xE1n sujetos a evaluaci\xF3n, y solo se otorgar\xE1n en casos excepcionales, como: </p><ul class="term-list" data-v-ce250240${_scopeId7}><li class="term-list-item" data-v-ce250240${_scopeId7}> Errores en el sistema de facturaci\xF3n. </li><li class="term-list-item" data-v-ce250240${_scopeId7}> Cancelaciones antes de iniciar el servicio contratado. </li></ul><p class="text-body-1" data-v-ce250240${_scopeId7}> Impuestos:</p><p class="text-body-1" data-v-ce250240${_scopeId7}> El usuario es responsable de pagar los impuestos aplicables seg\xFAn las leyes locales. </p></div><div class="term-container" data-v-ce250240${_scopeId7}><h3 class="text-subtitle-1" data-v-ce250240${_scopeId7}> Flexibilidad y Actualizaci\xF3n </h3><p class="text-body-1" data-v-ce250240${_scopeId7}> Modificaciones a los T\xE9rminos: </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Futzo puede modificar estos t\xE9rminos en cualquier momento para reflejar cambios legales, regulatorios o de mercado. Los usuarios ser\xE1n notificados con al menos 15 d\xEDas de antelaci\xF3n. </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Aceptaci\xF3n de Cambios: </p><p class="text-body-1" data-v-ce250240${_scopeId7}> El uso continuado del servicio tras la notificaci\xF3n de cambios implica la aceptaci\xF3n de los nuevos t\xE9rminos. </p></div><div class="term-container" data-v-ce250240${_scopeId7}><h3 class="text-subtitle-1" data-v-ce250240${_scopeId7}> Seguridad y Protecci\xF3n de Datos </h3><p class="text-body-1" data-v-ce250240${_scopeId7}> Medidas de Seguridad: </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Futzo implementa protocolos de seguridad, como: </p><ul class="term-list" data-v-ce250240${_scopeId7}><li class="term-list-item" data-v-ce250240${_scopeId7}>Cifrado de datos sensibles.</li><li class="term-list-item" data-v-ce250240${_scopeId7}>Autenticaci\xF3n de dos factores.</li><li class="term-list-item" data-v-ce250240${_scopeId7}> Auditor\xEDas peri\xF3dicas del sistema. </li></ul><p class="text-body-1" data-v-ce250240${_scopeId7}> Notificaci\xF3n de Brechas de Seguridad: </p><p class="text-body-1" data-v-ce250240${_scopeId7}> En caso de una brecha de seguridad, Futzo notificar\xE1 a los usuarios afectados dentro de las 72 horas siguientes, conforme a las regulaciones aplicables. </p></div><div class="term-container" data-v-ce250240${_scopeId7}><h3 class="text-subtitle-1" data-v-ce250240${_scopeId7}> Jurisdicci\xF3n y Ley Aplicable </h3><p class="text-body-1" data-v-ce250240${_scopeId7}> Estos t\xE9rminos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier controversia ser\xE1 resuelta ante los tribunales competentes de la Ciudad de M\xE9xico. </p></div><div class="term-container" data-v-ce250240${_scopeId7}><h3 class="text-subtitle-1" data-v-ce250240${_scopeId7}> Uso de Servicios de Registro y Verificaci\xF3n </h3><p class="text-body-1" data-v-ce250240${_scopeId7}> Futzo integra servicios de terceros como Google, Facebook y WhatsApp para el registro, autenticaci\xF3n y verificaci\xF3n de usuarios. Al utilizar estos servicios, el Usuario acepta las siguientes condiciones: </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Registro y Autenticaci\xF3n con Google y Facebook: </p><ul class="term-list" data-v-ce250240${_scopeId7}><li class="term-list-item" data-v-ce250240${_scopeId7}>El Usuario debe autorizar a Futzo para acceder a los datos m\xEDnimos requeridos para completar el proceso de registro (nombre, correo electr\xF3nico, etc.). </li><li class="term-list-item" data-v-ce250240${_scopeId7}>Futzo no ser\xE1 responsable por problemas relacionados con las cuentas de Google o Facebook (por ejemplo, p\xE9rdida de acceso a estas cuentas). </li></ul><p class="text-body-1" data-v-ce250240${_scopeId7}> Verificaci\xF3n mediante WhatsApp OTP: </p><ul class="term-list" data-v-ce250240${_scopeId7}><li class="term-list-item" data-v-ce250240${_scopeId7}>El Usuario debe proporcionar un n\xFAmero telef\xF3nico v\xE1lido para completar el proceso de verificaci\xF3n.</li><li class="term-list-item" data-v-ce250240${_scopeId7}>Es responsabilidad del Usuario proteger el c\xF3digo de verificaci\xF3n y no compartirlo con terceros.</li><li class="term-list-item" data-v-ce250240${_scopeId7}>El incumplimiento de esta regla puede resultar en la suspensi\xF3n de la cuenta.</li></ul><p class="text-body-1" data-v-ce250240${_scopeId7}> Responsabilidad del Usuario: </p><ul class="term-list" data-v-ce250240${_scopeId7}><li class="term-list-item" data-v-ce250240${_scopeId7}>El Usuario debe garantizar que la informaci\xF3n proporcionada durante el registro sea ver\xEDdica y actualizada.</li><li class="term-list-item" data-v-ce250240${_scopeId7}>Futzo no ser\xE1 responsable por el uso indebido de los servicios de terceros, como la transmisi\xF3n incorrecta de c\xF3digos OTP o problemas t\xE9cnicos ajenos a la plataforma. </li></ul><p class="text-body-1" data-v-ce250240${_scopeId7}> Pol\xEDticas de Terceros: </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Al utilizar Google, Facebook o WhatsApp como parte del proceso, el Usuario est\xE1 sujeto a las pol\xEDticas de privacidad de estas plataformas, adem\xE1s de las pol\xEDticas de Futzo. </p></div><div class="term-container" data-v-ce250240${_scopeId7}><h3 class="text-subtitle-1" data-v-ce250240${_scopeId7}>Contacto</h3><p class="text-body-1" data-v-ce250240${_scopeId7}> Para consultas relacionadas con los T\xE9rminos y Condiciones, por favor, cont\xE1ctanos a trav\xE9s de: </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Correo electr\xF3nico: <a class="font-weight-medium text-secondary" href="mailto:soporte@futzo.io" data-v-ce250240${_scopeId7}>soporte@futzo.io</a></p></div><div class="term-container" data-v-ce250240${_scopeId7}><h3 class="text-subtitle-1" data-v-ce250240${_scopeId7}>Definiciones</h3><ul class="term-list" data-v-ce250240${_scopeId7}><li class="term-list-item" data-v-ce250240${_scopeId7}> Usuario: Persona que accede al Servicio, ya sea como administrador de liga, equipo, jugador, \xE1rbitro o cualquier otro rol. </li><li class="term-list-item" data-v-ce250240${_scopeId7}> Liga: Conjunto organizado de equipos y torneos registrados en la plataforma. </li><li class="term-list-item" data-v-ce250240${_scopeId7}> Torneo: Competencia dentro de una liga, administrada a trav\xE9s del Servicio. </li><li class="term-list-item" data-v-ce250240${_scopeId7}> Contenido: Datos ingresados por los usuarios, incluyendo informaci\xF3n de equipos, jugadores y partidos. </li><li class="term-list-item" data-v-ce250240${_scopeId7}> Administrador: Usuario con permisos para gestionar la liga y sus actividades. </li><li class="term-list-item" data-v-ce250240${_scopeId7}> Jugador: Usuario registrado en la plataforma como miembro de un equipo. </li><li class="term-list-item" data-v-ce250240${_scopeId7}> Equipo: Grupo de jugadores registrados en la plataforma. </li><li class="term-list-item" data-v-ce250240${_scopeId7}> Partido: Encuentro entre dos equipos, programado y registrado en la plataforma. </li><li class="term-list-item" data-v-ce250240${_scopeId7}> Servicio: Plataforma Futzo y sus funcionalidades. </li></ul></div><div class="term-container" data-v-ce250240${_scopeId7}><h3 class="text-subtitle-1" data-v-ce250240${_scopeId7}>Uso del Servicio</h3><p class="text-body-1" data-v-ce250240${_scopeId7}> Acceso y Registro</p><p class="term-list-item" data-v-ce250240${_scopeId7}> Los usuarios deben proporcionar informaci\xF3n precisa y completa al registrarse. El incumplimiento puede resultar en la suspensi\xF3n de la cuenta. </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Roles y Permisos</p><p class="term-list-item" data-v-ce250240${_scopeId7}> Cada usuario tendr\xE1 permisos espec\xEDficos seg\xFAn su rol asignado (por ejemplo, administrador de liga, jugador). </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Restricciones</p><p class="text-body-1" data-v-ce250240${_scopeId7}>Queda prohibido:</p><ul class="term-list" data-v-ce250240${_scopeId7}><li class="term-list-item" data-v-ce250240${_scopeId7}> Utilizar la plataforma para actividades il\xEDcitas o fraudulentas. </li><li class="term-list-item" data-v-ce250240${_scopeId7}> Intentar acceder, alterar o destruir datos de otros usuarios sin autorizaci\xF3n. </li><li class="term-list-item" data-v-ce250240${_scopeId7}> Publicar contenido ofensivo, discriminatorio o inapropiado. </li><li class="term-list-item" data-v-ce250240${_scopeId7}> Compartir credenciales de acceso con terceros. </li><li class="term-list-item" data-v-ce250240${_scopeId7}> Utilizar la plataforma para enviar spam o correos no deseados. </li><li class="term-list-item" data-v-ce250240${_scopeId7}> Violaci\xF3n de derechos de autor o propiedad intelectual. </li><li class="term-list-item" data-v-ce250240${_scopeId7}> Realizar ingenier\xEDa inversa, descompilaci\xF3n o desensamblaje del Servicio. </li><li class="term-list-item" data-v-ce250240${_scopeId7}> Utilizar bots, scripts o cualquier otro m\xE9todo automatizado para acceder al Servicio. </li><li class="term-list-item" data-v-ce250240${_scopeId7}> Utilizar la plataforma para actividades que puedan afectar su rendimiento o estabilidad. </li><li class="term-list-item" data-v-ce250240${_scopeId7}> Compartir informaci\xF3n personal de otros usuarios sin su consentimiento. </li></ul><p class="text-body-1" data-v-ce250240${_scopeId7}> Actualizaciones y Mantenimiento </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Futzo se reserva el derecho de realizar actualizaciones y mantenimiento en el Servicio sin previo aviso. Los usuarios ser\xE1n notificados de cualquier interrupci\xF3n programada. </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Suspensi\xF3n y Cancelaci\xF3n </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Futzo se reserva el derecho de suspender o cancelar cuentas que infrinjan los t\xE9rminos de uso. Los usuarios pueden solicitar la eliminaci\xF3n de su cuenta en cualquier momento. </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Responsabilidad del Usuario </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Los usuarios son responsables de mantener la confidencialidad de sus credenciales de acceso y de cualquier actividad realizada en su cuenta </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Soporte T\xE9cnico</p><p class="text-body-1" data-v-ce250240${_scopeId7}> Futzo proporcionar\xE1 soporte t\xE9cnico a los usuarios para resolver problemas relacionados con el Servicio. </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Comunicaci\xF3n</p><p class="text-body-1" data-v-ce250240${_scopeId7}> Los usuarios aceptan recibir comunicaciones de Futzo, incluyendo correos electr\xF3nicos, notificaciones y mensajes en la plataforma. </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Modificaciones</p><p class="text-body-1" data-v-ce250240${_scopeId7}> Futzo se reserva el derecho de modificar estos t\xE9rminos en cualquier momento. Los usuarios ser\xE1n notificados de los cambios y deber\xE1n aceptarlos para continuar utilizando el Servicio. </p></div><div class="term-container" data-v-ce250240${_scopeId7}><h3 class="text-subtitle-1" data-v-ce250240${_scopeId7}> Contenido Generado por el Usuario </h3><p class="text-body-1" data-v-ce250240${_scopeId7}> Los usuarios son responsables del contenido que ingresen en la plataforma. Futzo no asume responsabilidad por errores o inexactitudes en los datos proporcionados por los usuarios. </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Propiedad del Contenido </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Los usuarios conservan la propiedad de los datos ingresados en la plataforma. Futzo no reclama derechos de propiedad sobre el contenido generado por los usuarios </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Licencia de Uso</p><p class="text-body-1" data-v-ce250240${_scopeId7}> Al ingresar contenido en la plataforma, los usuarios otorgan a Futzo una licencia no exclusiva para utilizar, modificar y distribuir dicho contenido en el Servicio. </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Eliminaci\xF3n de Contenido </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Futzo se reserva el derecho de eliminar contenido que infrinja los t\xE9rminos de uso o que sea considerado inapropiado. </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Respaldo de Datos</p><p class="text-body-1" data-v-ce250240${_scopeId7}> Los usuarios son responsables de realizar copias de seguridad de su contenido en caso de p\xE9rdida o eliminaci\xF3n accidental. </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Publicidad y Promoci\xF3n </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Futzo se reserva el derecho de utilizar el contenido generado por los usuarios con fines publicitarios y promocionales. </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Protecci\xF3n de Datos </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Futzo implementar\xE1 medidas de seguridad para proteger la privacidad y confidencialidad de los datos de los usuarios. </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Acceso a Datos</p><p class="text-body-1" data-v-ce250240${_scopeId7}> Los usuarios pueden acceder, modificar o eliminar su contenido en cualquier momento a trav\xE9s de la plataforma. </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Retenci\xF3n de Datos</p><p class="text-body-1" data-v-ce250240${_scopeId7}> Futzo retendr\xE1 los datos de los usuarios durante el tiempo necesario para cumplir con sus obligaciones legales y contractuales. </p></div><div class="term-container" data-v-ce250240${_scopeId7}><h3 class="text-subtitle-1" data-v-ce250240${_scopeId7}>Propiedad Intelectual</h3><p class="text-body-1" data-v-ce250240${_scopeId7}> Todos los derechos relacionados con el dise\xF1o, c\xF3digo fuente, funcionalidad y marca de Futzo pertenecen exclusivamente a futzo.io. Se proh\xEDbe la reproducci\xF3n, distribuci\xF3n o modificaci\xF3n del Servicio sin autorizaci\xF3n previa. </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Marcas Registradas</p><p class="text-body-1" data-v-ce250240${_scopeId7}> Futzo es una marca registrada de futzo.io. Se proh\xEDbe el uso no autorizado de la marca en cualquier contexto. </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Derechos de Autor</p><p class="text-body-1" data-v-ce250240${_scopeId7}> Todos los contenidos publicados en la plataforma est\xE1n protegidos por derechos de autor. Se proh\xEDbe la reproducci\xF3n o distribuci\xF3n sin autorizaci\xF3n. </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Licencia de Uso</p><p class="text-body-1" data-v-ce250240${_scopeId7}> Los usuarios reciben una licencia limitada para utilizar el Servicio de acuerdo con los t\xE9rminos establecidos en este documento. </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Contenido de Terceros </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Futzo puede incluir contenido de terceros en la plataforma, sujeto a los t\xE9rminos y condiciones de uso de los proveedores. </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Notificaci\xF3n de Infracci\xF3n </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Si un usuario considera que su propiedad intelectual ha sido infringida en la plataforma, debe notificar a Futzo para tomar las medidas correspondientes. </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Protecci\xF3n de Datos </p><p class="text-body-1" data-v-ce250240${_scopeId7}> Futzo implementar\xE1 medidas de seguridad para proteger la privacidad y confidencialidad de los datos de los usuarios. </p></div>`);
                                              } else {
                                                return [
                                                  createVNode("p", { class: "text-body-1" }, " Bienvenido a Futzo, un sistema de gesti\xF3n dise\xF1ado para facilitar la administraci\xF3n de ligas deportivas y sus respectivas actividades. Al utilizar la plataforma Futzo (en adelante, \u201Cel Servicio\u201D), usted acepta cumplir con los t\xE9rminos descritos en este documento. Si no est\xE1 de acuerdo con estos t\xE9rminos, debe abstenerse de utilizar el Servicio. "),
                                                  createVNode("div", { class: "term-container" }, [
                                                    createVNode("h3", { class: "text-subtitle-1" }, "Cumplimiento Legal"),
                                                    createVNode("p", { class: "text-body-1" }, " Ley Federal de Protecci\xF3n de Datos Personales en Posesi\xF3n de los Particulares (LFPDPPP) "),
                                                    createVNode("p", { class: "text-body-1" }, " Futzo cumple con la LFPDPPP, otorgando a los usuarios derechos ARCO (Acceso, Rectificaci\xF3n, Cancelaci\xF3n y Oposici\xF3n) sobre sus datos personales. "),
                                                    createVNode("p", { class: "text-body-1" }, " Reglamento General de Protecci\xF3n de Datos (GDPR) "),
                                                    createVNode("p", { class: "text-body-1" }, " Si los usuarios residen en la Uni\xF3n Europea, Futzo garantiza los derechos previstos en el GDPR, incluyendo: "),
                                                    createVNode("ul", { class: "term-list" }, [
                                                      createVNode("li", { class: "term-list-item" }, " Derecho al Olvido: Solicitar la eliminaci\xF3n de su informaci\xF3n personal. "),
                                                      createVNode("li", { class: "term-list-item" }, " Portabilidad de Datos: Transferir sus datos a otro proveedor si lo desean. ")
                                                    ]),
                                                    createVNode("p", { class: "text-body-1" }, " Consentimiento para el Tratamiento de Datos "),
                                                    createVNode("p", { class: "text-body-1" }, " Al registrarse, los usuarios otorgan su consentimiento expl\xEDcito para el manejo de su informaci\xF3n personal conforme a nuestra Pol\xEDtica de Privacidad. "),
                                                    createVNode("p", { class: "text-body-1" }, [
                                                      createTextVNode(" Su privacidad es importante para nosotros. Consulte nuestra "),
                                                      createVNode("a", {
                                                        href: "javascript:void(0)",
                                                        onClick: ($event) => _ctx.$router.push({ name: "politica-de-privacidad" }),
                                                        class: "font-weight-medium text-secondary"
                                                      }, "Pol\xEDtica de Privacidad", 8, ["onClick"]),
                                                      createTextVNode(" para comprender c\xF3mo recopilamos, utilizamos y protegemos sus datos personales. ")
                                                    ])
                                                  ]),
                                                  createVNode("div", { class: "term-container" }, [
                                                    createVNode("h3", { class: "text-subtitle-1" }, " Responsabilidad y Limitaci\xF3n "),
                                                    createVNode("p", { class: "text-body-1" }, " Exclusi\xF3n de Garant\xEDas "),
                                                    createVNode("p", { class: "text-body-1" }, ' Futzo se proporciona "tal cual" y "seg\xFAn disponibilidad". Futzo no garantiza: '),
                                                    createVNode("ul", { class: "term-list" }, [
                                                      createVNode("li", { class: "term-list-item" }, " La disponibilidad continua del servicio. "),
                                                      createVNode("li", { class: "term-list-item" }, " La ausencia de errores en la plataforma. "),
                                                      createVNode("li", { class: "term-list-item" }, " Que la plataforma satisfaga las expectativas particulares de los usuarios. ")
                                                    ]),
                                                    createVNode("p", { class: "text-body-1" }, " Limitaci\xF3n de Responsabilidad "),
                                                    createVNode("p", { class: "text-body-1" }, "Futzo no ser\xE1 responsable por:"),
                                                    createVNode("ul", { class: "term-list" }, [
                                                      createVNode("li", { class: "term-list-item" }, " Da\xF1os indirectos, incidentales o consecuentes. "),
                                                      createVNode("li", { class: "term-list-item" }, " P\xE9rdidas financieras derivadas del uso del servicio. "),
                                                      createVNode("li", { class: "term-list-item" }, " Contenido generado por los usuarios que infrinja derechos de terceros. ")
                                                    ]),
                                                    createVNode("p", { class: "text-body-1" }, "Indemnizaci\xF3n"),
                                                    createVNode("p", { class: "text-body-1" }, " Los usuarios acuerdan indemnizar y liberar de responsabilidad a Futzo por cualquier reclamaci\xF3n, da\xF1o o p\xE9rdida causada por: "),
                                                    createVNode("ul", { class: "term-list" }, [
                                                      createVNode("li", { class: "term-list-item" }, "Uso indebido del servicio."),
                                                      createVNode("li", { class: "term-list-item" }, " Incumplimiento de estos t\xE9rminos por parte del usuario. ")
                                                    ])
                                                  ]),
                                                  createVNode("div", { class: "term-container" }, [
                                                    createVNode("h3", { class: "text-subtitle-1" }, "Propiedad Intelectual"),
                                                    createVNode("p", { class: "text-body-1" }, " Derechos de Autor y Marcas Registradas "),
                                                    createVNode("p", { class: "text-body-1" }, " Todos los derechos sobre el dise\xF1o, c\xF3digo fuente, logotipos y otros elementos de Futzo son propiedad exclusiva de Futzo.io. "),
                                                    createVNode("p", { class: "text-body-1" }, " Contenido Generado por Usuarios "),
                                                    createVNode("p", { class: "text-body-1" }, " Los usuarios conservan la propiedad de los datos ingresados en la plataforma. Sin embargo, otorgan a Futzo una licencia no exclusiva para utilizar dichos datos en la operaci\xF3n del servicio. "),
                                                    createVNode("p", { class: "text-body-1" }, " Protecci\xF3n del Sistema: Queda prohibido: "),
                                                    createVNode("ul", { class: "term-list" }, [
                                                      createVNode("li", { class: "term-list-item" }, " Intentar descompilar, realizar ingenier\xEDa inversa o copiar partes del software. "),
                                                      createVNode("li", { class: "term-list-item" }, " Utilizar elementos de la marca Futzo sin autorizaci\xF3n. ")
                                                    ])
                                                  ]),
                                                  createVNode("div", { class: "term-container" }, [
                                                    createVNode("h3", { class: "text-subtitle-1" }, "Conducta del Usuario"),
                                                    createVNode("p", { class: "text-body-1" }, " Restricciones Generales: "),
                                                    createVNode("ul", { class: "term-list" }, [
                                                      createVNode("li", { class: "term-list-item" }, " Publicar contenido ofensivo, discriminatorio o ilegal. "),
                                                      createVNode("li", { class: "term-list-item" }, " Usar scripts automatizados, bots o herramientas similares. "),
                                                      createVNode("li", { class: "term-list-item" }, " Compartir informaci\xF3n personal de terceros sin consentimiento. ")
                                                    ]),
                                                    createVNode("p", { class: "text-body-1" }, " Uso \xC9tico:"),
                                                    createVNode("p", { class: "text-body-1" }, " Los usuarios se comprometen a actuar de buena fe y a no realizar actividades que perjudiquen la reputaci\xF3n de Futzo. ")
                                                  ]),
                                                  createVNode("div", { class: "term-container" }, [
                                                    createVNode("h3", { class: "text-subtitle-1" }, "Pagos y Tarifas"),
                                                    createVNode("p", { class: "text-body-1" }, " M\xE9todos de Pago y Facturaci\xF3n: "),
                                                    createVNode("p", { class: "text-body-1" }, " Los usuarios pueden realizar pagos a trav\xE9s de los m\xE9todos habilitados, incluyendo tarjetas de cr\xE9dito/d\xE9bito y transferencias bancarias. "),
                                                    createVNode("p", { class: "text-body-1" }, " Pol\xEDtica de Reembolsos: "),
                                                    createVNode("p", { class: "text-body-1" }, " Los reembolsos estar\xE1n sujetos a evaluaci\xF3n, y solo se otorgar\xE1n en casos excepcionales, como: "),
                                                    createVNode("ul", { class: "term-list" }, [
                                                      createVNode("li", { class: "term-list-item" }, " Errores en el sistema de facturaci\xF3n. "),
                                                      createVNode("li", { class: "term-list-item" }, " Cancelaciones antes de iniciar el servicio contratado. ")
                                                    ]),
                                                    createVNode("p", { class: "text-body-1" }, " Impuestos:"),
                                                    createVNode("p", { class: "text-body-1" }, " El usuario es responsable de pagar los impuestos aplicables seg\xFAn las leyes locales. ")
                                                  ]),
                                                  createVNode("div", { class: "term-container" }, [
                                                    createVNode("h3", { class: "text-subtitle-1" }, " Flexibilidad y Actualizaci\xF3n "),
                                                    createVNode("p", { class: "text-body-1" }, " Modificaciones a los T\xE9rminos: "),
                                                    createVNode("p", { class: "text-body-1" }, " Futzo puede modificar estos t\xE9rminos en cualquier momento para reflejar cambios legales, regulatorios o de mercado. Los usuarios ser\xE1n notificados con al menos 15 d\xEDas de antelaci\xF3n. "),
                                                    createVNode("p", { class: "text-body-1" }, " Aceptaci\xF3n de Cambios: "),
                                                    createVNode("p", { class: "text-body-1" }, " El uso continuado del servicio tras la notificaci\xF3n de cambios implica la aceptaci\xF3n de los nuevos t\xE9rminos. ")
                                                  ]),
                                                  createVNode("div", { class: "term-container" }, [
                                                    createVNode("h3", { class: "text-subtitle-1" }, " Seguridad y Protecci\xF3n de Datos "),
                                                    createVNode("p", { class: "text-body-1" }, " Medidas de Seguridad: "),
                                                    createVNode("p", { class: "text-body-1" }, " Futzo implementa protocolos de seguridad, como: "),
                                                    createVNode("ul", { class: "term-list" }, [
                                                      createVNode("li", { class: "term-list-item" }, "Cifrado de datos sensibles."),
                                                      createVNode("li", { class: "term-list-item" }, "Autenticaci\xF3n de dos factores."),
                                                      createVNode("li", { class: "term-list-item" }, " Auditor\xEDas peri\xF3dicas del sistema. ")
                                                    ]),
                                                    createVNode("p", { class: "text-body-1" }, " Notificaci\xF3n de Brechas de Seguridad: "),
                                                    createVNode("p", { class: "text-body-1" }, " En caso de una brecha de seguridad, Futzo notificar\xE1 a los usuarios afectados dentro de las 72 horas siguientes, conforme a las regulaciones aplicables. ")
                                                  ]),
                                                  createVNode("div", { class: "term-container" }, [
                                                    createVNode("h3", { class: "text-subtitle-1" }, " Jurisdicci\xF3n y Ley Aplicable "),
                                                    createVNode("p", { class: "text-body-1" }, " Estos t\xE9rminos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier controversia ser\xE1 resuelta ante los tribunales competentes de la Ciudad de M\xE9xico. ")
                                                  ]),
                                                  createVNode("div", { class: "term-container" }, [
                                                    createVNode("h3", { class: "text-subtitle-1" }, " Uso de Servicios de Registro y Verificaci\xF3n "),
                                                    createVNode("p", { class: "text-body-1" }, " Futzo integra servicios de terceros como Google, Facebook y WhatsApp para el registro, autenticaci\xF3n y verificaci\xF3n de usuarios. Al utilizar estos servicios, el Usuario acepta las siguientes condiciones: "),
                                                    createVNode("p", { class: "text-body-1" }, " Registro y Autenticaci\xF3n con Google y Facebook: "),
                                                    createVNode("ul", { class: "term-list" }, [
                                                      createVNode("li", { class: "term-list-item" }, "El Usuario debe autorizar a Futzo para acceder a los datos m\xEDnimos requeridos para completar el proceso de registro (nombre, correo electr\xF3nico, etc.). "),
                                                      createVNode("li", { class: "term-list-item" }, "Futzo no ser\xE1 responsable por problemas relacionados con las cuentas de Google o Facebook (por ejemplo, p\xE9rdida de acceso a estas cuentas). ")
                                                    ]),
                                                    createVNode("p", { class: "text-body-1" }, " Verificaci\xF3n mediante WhatsApp OTP: "),
                                                    createVNode("ul", { class: "term-list" }, [
                                                      createVNode("li", { class: "term-list-item" }, "El Usuario debe proporcionar un n\xFAmero telef\xF3nico v\xE1lido para completar el proceso de verificaci\xF3n."),
                                                      createVNode("li", { class: "term-list-item" }, "Es responsabilidad del Usuario proteger el c\xF3digo de verificaci\xF3n y no compartirlo con terceros."),
                                                      createVNode("li", { class: "term-list-item" }, "El incumplimiento de esta regla puede resultar en la suspensi\xF3n de la cuenta.")
                                                    ]),
                                                    createVNode("p", { class: "text-body-1" }, " Responsabilidad del Usuario: "),
                                                    createVNode("ul", { class: "term-list" }, [
                                                      createVNode("li", { class: "term-list-item" }, "El Usuario debe garantizar que la informaci\xF3n proporcionada durante el registro sea ver\xEDdica y actualizada."),
                                                      createVNode("li", { class: "term-list-item" }, "Futzo no ser\xE1 responsable por el uso indebido de los servicios de terceros, como la transmisi\xF3n incorrecta de c\xF3digos OTP o problemas t\xE9cnicos ajenos a la plataforma. ")
                                                    ]),
                                                    createVNode("p", { class: "text-body-1" }, " Pol\xEDticas de Terceros: "),
                                                    createVNode("p", { class: "text-body-1" }, " Al utilizar Google, Facebook o WhatsApp como parte del proceso, el Usuario est\xE1 sujeto a las pol\xEDticas de privacidad de estas plataformas, adem\xE1s de las pol\xEDticas de Futzo. ")
                                                  ]),
                                                  createVNode("div", { class: "term-container" }, [
                                                    createVNode("h3", { class: "text-subtitle-1" }, "Contacto"),
                                                    createVNode("p", { class: "text-body-1" }, " Para consultas relacionadas con los T\xE9rminos y Condiciones, por favor, cont\xE1ctanos a trav\xE9s de: "),
                                                    createVNode("p", { class: "text-body-1" }, [
                                                      createTextVNode(" Correo electr\xF3nico: "),
                                                      createVNode("a", {
                                                        class: "font-weight-medium text-secondary",
                                                        href: "mailto:soporte@futzo.io"
                                                      }, "soporte@futzo.io")
                                                    ])
                                                  ]),
                                                  createVNode("div", { class: "term-container" }, [
                                                    createVNode("h3", { class: "text-subtitle-1" }, "Definiciones"),
                                                    createVNode("ul", { class: "term-list" }, [
                                                      createVNode("li", { class: "term-list-item" }, " Usuario: Persona que accede al Servicio, ya sea como administrador de liga, equipo, jugador, \xE1rbitro o cualquier otro rol. "),
                                                      createVNode("li", { class: "term-list-item" }, " Liga: Conjunto organizado de equipos y torneos registrados en la plataforma. "),
                                                      createVNode("li", { class: "term-list-item" }, " Torneo: Competencia dentro de una liga, administrada a trav\xE9s del Servicio. "),
                                                      createVNode("li", { class: "term-list-item" }, " Contenido: Datos ingresados por los usuarios, incluyendo informaci\xF3n de equipos, jugadores y partidos. "),
                                                      createVNode("li", { class: "term-list-item" }, " Administrador: Usuario con permisos para gestionar la liga y sus actividades. "),
                                                      createVNode("li", { class: "term-list-item" }, " Jugador: Usuario registrado en la plataforma como miembro de un equipo. "),
                                                      createVNode("li", { class: "term-list-item" }, " Equipo: Grupo de jugadores registrados en la plataforma. "),
                                                      createVNode("li", { class: "term-list-item" }, " Partido: Encuentro entre dos equipos, programado y registrado en la plataforma. "),
                                                      createVNode("li", { class: "term-list-item" }, " Servicio: Plataforma Futzo y sus funcionalidades. ")
                                                    ])
                                                  ]),
                                                  createVNode("div", { class: "term-container" }, [
                                                    createVNode("h3", { class: "text-subtitle-1" }, "Uso del Servicio"),
                                                    createVNode("p", { class: "text-body-1" }, " Acceso y Registro"),
                                                    createVNode("p", { class: "term-list-item" }, " Los usuarios deben proporcionar informaci\xF3n precisa y completa al registrarse. El incumplimiento puede resultar en la suspensi\xF3n de la cuenta. "),
                                                    createVNode("p", { class: "text-body-1" }, " Roles y Permisos"),
                                                    createVNode("p", { class: "term-list-item" }, " Cada usuario tendr\xE1 permisos espec\xEDficos seg\xFAn su rol asignado (por ejemplo, administrador de liga, jugador). "),
                                                    createVNode("p", { class: "text-body-1" }, " Restricciones"),
                                                    createVNode("p", { class: "text-body-1" }, "Queda prohibido:"),
                                                    createVNode("ul", { class: "term-list" }, [
                                                      createVNode("li", { class: "term-list-item" }, " Utilizar la plataforma para actividades il\xEDcitas o fraudulentas. "),
                                                      createVNode("li", { class: "term-list-item" }, " Intentar acceder, alterar o destruir datos de otros usuarios sin autorizaci\xF3n. "),
                                                      createVNode("li", { class: "term-list-item" }, " Publicar contenido ofensivo, discriminatorio o inapropiado. "),
                                                      createVNode("li", { class: "term-list-item" }, " Compartir credenciales de acceso con terceros. "),
                                                      createVNode("li", { class: "term-list-item" }, " Utilizar la plataforma para enviar spam o correos no deseados. "),
                                                      createVNode("li", { class: "term-list-item" }, " Violaci\xF3n de derechos de autor o propiedad intelectual. "),
                                                      createVNode("li", { class: "term-list-item" }, " Realizar ingenier\xEDa inversa, descompilaci\xF3n o desensamblaje del Servicio. "),
                                                      createVNode("li", { class: "term-list-item" }, " Utilizar bots, scripts o cualquier otro m\xE9todo automatizado para acceder al Servicio. "),
                                                      createVNode("li", { class: "term-list-item" }, " Utilizar la plataforma para actividades que puedan afectar su rendimiento o estabilidad. "),
                                                      createVNode("li", { class: "term-list-item" }, " Compartir informaci\xF3n personal de otros usuarios sin su consentimiento. ")
                                                    ]),
                                                    createVNode("p", { class: "text-body-1" }, " Actualizaciones y Mantenimiento "),
                                                    createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de realizar actualizaciones y mantenimiento en el Servicio sin previo aviso. Los usuarios ser\xE1n notificados de cualquier interrupci\xF3n programada. "),
                                                    createVNode("p", { class: "text-body-1" }, " Suspensi\xF3n y Cancelaci\xF3n "),
                                                    createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de suspender o cancelar cuentas que infrinjan los t\xE9rminos de uso. Los usuarios pueden solicitar la eliminaci\xF3n de su cuenta en cualquier momento. "),
                                                    createVNode("p", { class: "text-body-1" }, " Responsabilidad del Usuario "),
                                                    createVNode("p", { class: "text-body-1" }, " Los usuarios son responsables de mantener la confidencialidad de sus credenciales de acceso y de cualquier actividad realizada en su cuenta "),
                                                    createVNode("p", { class: "text-body-1" }, " Soporte T\xE9cnico"),
                                                    createVNode("p", { class: "text-body-1" }, " Futzo proporcionar\xE1 soporte t\xE9cnico a los usuarios para resolver problemas relacionados con el Servicio. "),
                                                    createVNode("p", { class: "text-body-1" }, " Comunicaci\xF3n"),
                                                    createVNode("p", { class: "text-body-1" }, " Los usuarios aceptan recibir comunicaciones de Futzo, incluyendo correos electr\xF3nicos, notificaciones y mensajes en la plataforma. "),
                                                    createVNode("p", { class: "text-body-1" }, " Modificaciones"),
                                                    createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de modificar estos t\xE9rminos en cualquier momento. Los usuarios ser\xE1n notificados de los cambios y deber\xE1n aceptarlos para continuar utilizando el Servicio. ")
                                                  ]),
                                                  createVNode("div", { class: "term-container" }, [
                                                    createVNode("h3", { class: "text-subtitle-1" }, " Contenido Generado por el Usuario "),
                                                    createVNode("p", { class: "text-body-1" }, " Los usuarios son responsables del contenido que ingresen en la plataforma. Futzo no asume responsabilidad por errores o inexactitudes en los datos proporcionados por los usuarios. "),
                                                    createVNode("p", { class: "text-body-1" }, " Propiedad del Contenido "),
                                                    createVNode("p", { class: "text-body-1" }, " Los usuarios conservan la propiedad de los datos ingresados en la plataforma. Futzo no reclama derechos de propiedad sobre el contenido generado por los usuarios "),
                                                    createVNode("p", { class: "text-body-1" }, " Licencia de Uso"),
                                                    createVNode("p", { class: "text-body-1" }, " Al ingresar contenido en la plataforma, los usuarios otorgan a Futzo una licencia no exclusiva para utilizar, modificar y distribuir dicho contenido en el Servicio. "),
                                                    createVNode("p", { class: "text-body-1" }, " Eliminaci\xF3n de Contenido "),
                                                    createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de eliminar contenido que infrinja los t\xE9rminos de uso o que sea considerado inapropiado. "),
                                                    createVNode("p", { class: "text-body-1" }, " Respaldo de Datos"),
                                                    createVNode("p", { class: "text-body-1" }, " Los usuarios son responsables de realizar copias de seguridad de su contenido en caso de p\xE9rdida o eliminaci\xF3n accidental. "),
                                                    createVNode("p", { class: "text-body-1" }, " Publicidad y Promoci\xF3n "),
                                                    createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de utilizar el contenido generado por los usuarios con fines publicitarios y promocionales. "),
                                                    createVNode("p", { class: "text-body-1" }, " Protecci\xF3n de Datos "),
                                                    createVNode("p", { class: "text-body-1" }, " Futzo implementar\xE1 medidas de seguridad para proteger la privacidad y confidencialidad de los datos de los usuarios. "),
                                                    createVNode("p", { class: "text-body-1" }, " Acceso a Datos"),
                                                    createVNode("p", { class: "text-body-1" }, " Los usuarios pueden acceder, modificar o eliminar su contenido en cualquier momento a trav\xE9s de la plataforma. "),
                                                    createVNode("p", { class: "text-body-1" }, " Retenci\xF3n de Datos"),
                                                    createVNode("p", { class: "text-body-1" }, " Futzo retendr\xE1 los datos de los usuarios durante el tiempo necesario para cumplir con sus obligaciones legales y contractuales. ")
                                                  ]),
                                                  createVNode("div", { class: "term-container" }, [
                                                    createVNode("h3", { class: "text-subtitle-1" }, "Propiedad Intelectual"),
                                                    createVNode("p", { class: "text-body-1" }, " Todos los derechos relacionados con el dise\xF1o, c\xF3digo fuente, funcionalidad y marca de Futzo pertenecen exclusivamente a futzo.io. Se proh\xEDbe la reproducci\xF3n, distribuci\xF3n o modificaci\xF3n del Servicio sin autorizaci\xF3n previa. "),
                                                    createVNode("p", { class: "text-body-1" }, " Marcas Registradas"),
                                                    createVNode("p", { class: "text-body-1" }, " Futzo es una marca registrada de futzo.io. Se proh\xEDbe el uso no autorizado de la marca en cualquier contexto. "),
                                                    createVNode("p", { class: "text-body-1" }, " Derechos de Autor"),
                                                    createVNode("p", { class: "text-body-1" }, " Todos los contenidos publicados en la plataforma est\xE1n protegidos por derechos de autor. Se proh\xEDbe la reproducci\xF3n o distribuci\xF3n sin autorizaci\xF3n. "),
                                                    createVNode("p", { class: "text-body-1" }, " Licencia de Uso"),
                                                    createVNode("p", { class: "text-body-1" }, " Los usuarios reciben una licencia limitada para utilizar el Servicio de acuerdo con los t\xE9rminos establecidos en este documento. "),
                                                    createVNode("p", { class: "text-body-1" }, " Contenido de Terceros "),
                                                    createVNode("p", { class: "text-body-1" }, " Futzo puede incluir contenido de terceros en la plataforma, sujeto a los t\xE9rminos y condiciones de uso de los proveedores. "),
                                                    createVNode("p", { class: "text-body-1" }, " Notificaci\xF3n de Infracci\xF3n "),
                                                    createVNode("p", { class: "text-body-1" }, " Si un usuario considera que su propiedad intelectual ha sido infringida en la plataforma, debe notificar a Futzo para tomar las medidas correspondientes. "),
                                                    createVNode("p", { class: "text-body-1" }, " Protecci\xF3n de Datos "),
                                                    createVNode("p", { class: "text-body-1" }, " Futzo implementar\xE1 medidas de seguridad para proteger la privacidad y confidencialidad de los datos de los usuarios. ")
                                                  ])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VCol, { cols: "12" }, {
                                              default: withCtx(() => [
                                                createVNode("p", { class: "text-body-1" }, " Bienvenido a Futzo, un sistema de gesti\xF3n dise\xF1ado para facilitar la administraci\xF3n de ligas deportivas y sus respectivas actividades. Al utilizar la plataforma Futzo (en adelante, \u201Cel Servicio\u201D), usted acepta cumplir con los t\xE9rminos descritos en este documento. Si no est\xE1 de acuerdo con estos t\xE9rminos, debe abstenerse de utilizar el Servicio. "),
                                                createVNode("div", { class: "term-container" }, [
                                                  createVNode("h3", { class: "text-subtitle-1" }, "Cumplimiento Legal"),
                                                  createVNode("p", { class: "text-body-1" }, " Ley Federal de Protecci\xF3n de Datos Personales en Posesi\xF3n de los Particulares (LFPDPPP) "),
                                                  createVNode("p", { class: "text-body-1" }, " Futzo cumple con la LFPDPPP, otorgando a los usuarios derechos ARCO (Acceso, Rectificaci\xF3n, Cancelaci\xF3n y Oposici\xF3n) sobre sus datos personales. "),
                                                  createVNode("p", { class: "text-body-1" }, " Reglamento General de Protecci\xF3n de Datos (GDPR) "),
                                                  createVNode("p", { class: "text-body-1" }, " Si los usuarios residen en la Uni\xF3n Europea, Futzo garantiza los derechos previstos en el GDPR, incluyendo: "),
                                                  createVNode("ul", { class: "term-list" }, [
                                                    createVNode("li", { class: "term-list-item" }, " Derecho al Olvido: Solicitar la eliminaci\xF3n de su informaci\xF3n personal. "),
                                                    createVNode("li", { class: "term-list-item" }, " Portabilidad de Datos: Transferir sus datos a otro proveedor si lo desean. ")
                                                  ]),
                                                  createVNode("p", { class: "text-body-1" }, " Consentimiento para el Tratamiento de Datos "),
                                                  createVNode("p", { class: "text-body-1" }, " Al registrarse, los usuarios otorgan su consentimiento expl\xEDcito para el manejo de su informaci\xF3n personal conforme a nuestra Pol\xEDtica de Privacidad. "),
                                                  createVNode("p", { class: "text-body-1" }, [
                                                    createTextVNode(" Su privacidad es importante para nosotros. Consulte nuestra "),
                                                    createVNode("a", {
                                                      href: "javascript:void(0)",
                                                      onClick: ($event) => _ctx.$router.push({ name: "politica-de-privacidad" }),
                                                      class: "font-weight-medium text-secondary"
                                                    }, "Pol\xEDtica de Privacidad", 8, ["onClick"]),
                                                    createTextVNode(" para comprender c\xF3mo recopilamos, utilizamos y protegemos sus datos personales. ")
                                                  ])
                                                ]),
                                                createVNode("div", { class: "term-container" }, [
                                                  createVNode("h3", { class: "text-subtitle-1" }, " Responsabilidad y Limitaci\xF3n "),
                                                  createVNode("p", { class: "text-body-1" }, " Exclusi\xF3n de Garant\xEDas "),
                                                  createVNode("p", { class: "text-body-1" }, ' Futzo se proporciona "tal cual" y "seg\xFAn disponibilidad". Futzo no garantiza: '),
                                                  createVNode("ul", { class: "term-list" }, [
                                                    createVNode("li", { class: "term-list-item" }, " La disponibilidad continua del servicio. "),
                                                    createVNode("li", { class: "term-list-item" }, " La ausencia de errores en la plataforma. "),
                                                    createVNode("li", { class: "term-list-item" }, " Que la plataforma satisfaga las expectativas particulares de los usuarios. ")
                                                  ]),
                                                  createVNode("p", { class: "text-body-1" }, " Limitaci\xF3n de Responsabilidad "),
                                                  createVNode("p", { class: "text-body-1" }, "Futzo no ser\xE1 responsable por:"),
                                                  createVNode("ul", { class: "term-list" }, [
                                                    createVNode("li", { class: "term-list-item" }, " Da\xF1os indirectos, incidentales o consecuentes. "),
                                                    createVNode("li", { class: "term-list-item" }, " P\xE9rdidas financieras derivadas del uso del servicio. "),
                                                    createVNode("li", { class: "term-list-item" }, " Contenido generado por los usuarios que infrinja derechos de terceros. ")
                                                  ]),
                                                  createVNode("p", { class: "text-body-1" }, "Indemnizaci\xF3n"),
                                                  createVNode("p", { class: "text-body-1" }, " Los usuarios acuerdan indemnizar y liberar de responsabilidad a Futzo por cualquier reclamaci\xF3n, da\xF1o o p\xE9rdida causada por: "),
                                                  createVNode("ul", { class: "term-list" }, [
                                                    createVNode("li", { class: "term-list-item" }, "Uso indebido del servicio."),
                                                    createVNode("li", { class: "term-list-item" }, " Incumplimiento de estos t\xE9rminos por parte del usuario. ")
                                                  ])
                                                ]),
                                                createVNode("div", { class: "term-container" }, [
                                                  createVNode("h3", { class: "text-subtitle-1" }, "Propiedad Intelectual"),
                                                  createVNode("p", { class: "text-body-1" }, " Derechos de Autor y Marcas Registradas "),
                                                  createVNode("p", { class: "text-body-1" }, " Todos los derechos sobre el dise\xF1o, c\xF3digo fuente, logotipos y otros elementos de Futzo son propiedad exclusiva de Futzo.io. "),
                                                  createVNode("p", { class: "text-body-1" }, " Contenido Generado por Usuarios "),
                                                  createVNode("p", { class: "text-body-1" }, " Los usuarios conservan la propiedad de los datos ingresados en la plataforma. Sin embargo, otorgan a Futzo una licencia no exclusiva para utilizar dichos datos en la operaci\xF3n del servicio. "),
                                                  createVNode("p", { class: "text-body-1" }, " Protecci\xF3n del Sistema: Queda prohibido: "),
                                                  createVNode("ul", { class: "term-list" }, [
                                                    createVNode("li", { class: "term-list-item" }, " Intentar descompilar, realizar ingenier\xEDa inversa o copiar partes del software. "),
                                                    createVNode("li", { class: "term-list-item" }, " Utilizar elementos de la marca Futzo sin autorizaci\xF3n. ")
                                                  ])
                                                ]),
                                                createVNode("div", { class: "term-container" }, [
                                                  createVNode("h3", { class: "text-subtitle-1" }, "Conducta del Usuario"),
                                                  createVNode("p", { class: "text-body-1" }, " Restricciones Generales: "),
                                                  createVNode("ul", { class: "term-list" }, [
                                                    createVNode("li", { class: "term-list-item" }, " Publicar contenido ofensivo, discriminatorio o ilegal. "),
                                                    createVNode("li", { class: "term-list-item" }, " Usar scripts automatizados, bots o herramientas similares. "),
                                                    createVNode("li", { class: "term-list-item" }, " Compartir informaci\xF3n personal de terceros sin consentimiento. ")
                                                  ]),
                                                  createVNode("p", { class: "text-body-1" }, " Uso \xC9tico:"),
                                                  createVNode("p", { class: "text-body-1" }, " Los usuarios se comprometen a actuar de buena fe y a no realizar actividades que perjudiquen la reputaci\xF3n de Futzo. ")
                                                ]),
                                                createVNode("div", { class: "term-container" }, [
                                                  createVNode("h3", { class: "text-subtitle-1" }, "Pagos y Tarifas"),
                                                  createVNode("p", { class: "text-body-1" }, " M\xE9todos de Pago y Facturaci\xF3n: "),
                                                  createVNode("p", { class: "text-body-1" }, " Los usuarios pueden realizar pagos a trav\xE9s de los m\xE9todos habilitados, incluyendo tarjetas de cr\xE9dito/d\xE9bito y transferencias bancarias. "),
                                                  createVNode("p", { class: "text-body-1" }, " Pol\xEDtica de Reembolsos: "),
                                                  createVNode("p", { class: "text-body-1" }, " Los reembolsos estar\xE1n sujetos a evaluaci\xF3n, y solo se otorgar\xE1n en casos excepcionales, como: "),
                                                  createVNode("ul", { class: "term-list" }, [
                                                    createVNode("li", { class: "term-list-item" }, " Errores en el sistema de facturaci\xF3n. "),
                                                    createVNode("li", { class: "term-list-item" }, " Cancelaciones antes de iniciar el servicio contratado. ")
                                                  ]),
                                                  createVNode("p", { class: "text-body-1" }, " Impuestos:"),
                                                  createVNode("p", { class: "text-body-1" }, " El usuario es responsable de pagar los impuestos aplicables seg\xFAn las leyes locales. ")
                                                ]),
                                                createVNode("div", { class: "term-container" }, [
                                                  createVNode("h3", { class: "text-subtitle-1" }, " Flexibilidad y Actualizaci\xF3n "),
                                                  createVNode("p", { class: "text-body-1" }, " Modificaciones a los T\xE9rminos: "),
                                                  createVNode("p", { class: "text-body-1" }, " Futzo puede modificar estos t\xE9rminos en cualquier momento para reflejar cambios legales, regulatorios o de mercado. Los usuarios ser\xE1n notificados con al menos 15 d\xEDas de antelaci\xF3n. "),
                                                  createVNode("p", { class: "text-body-1" }, " Aceptaci\xF3n de Cambios: "),
                                                  createVNode("p", { class: "text-body-1" }, " El uso continuado del servicio tras la notificaci\xF3n de cambios implica la aceptaci\xF3n de los nuevos t\xE9rminos. ")
                                                ]),
                                                createVNode("div", { class: "term-container" }, [
                                                  createVNode("h3", { class: "text-subtitle-1" }, " Seguridad y Protecci\xF3n de Datos "),
                                                  createVNode("p", { class: "text-body-1" }, " Medidas de Seguridad: "),
                                                  createVNode("p", { class: "text-body-1" }, " Futzo implementa protocolos de seguridad, como: "),
                                                  createVNode("ul", { class: "term-list" }, [
                                                    createVNode("li", { class: "term-list-item" }, "Cifrado de datos sensibles."),
                                                    createVNode("li", { class: "term-list-item" }, "Autenticaci\xF3n de dos factores."),
                                                    createVNode("li", { class: "term-list-item" }, " Auditor\xEDas peri\xF3dicas del sistema. ")
                                                  ]),
                                                  createVNode("p", { class: "text-body-1" }, " Notificaci\xF3n de Brechas de Seguridad: "),
                                                  createVNode("p", { class: "text-body-1" }, " En caso de una brecha de seguridad, Futzo notificar\xE1 a los usuarios afectados dentro de las 72 horas siguientes, conforme a las regulaciones aplicables. ")
                                                ]),
                                                createVNode("div", { class: "term-container" }, [
                                                  createVNode("h3", { class: "text-subtitle-1" }, " Jurisdicci\xF3n y Ley Aplicable "),
                                                  createVNode("p", { class: "text-body-1" }, " Estos t\xE9rminos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier controversia ser\xE1 resuelta ante los tribunales competentes de la Ciudad de M\xE9xico. ")
                                                ]),
                                                createVNode("div", { class: "term-container" }, [
                                                  createVNode("h3", { class: "text-subtitle-1" }, " Uso de Servicios de Registro y Verificaci\xF3n "),
                                                  createVNode("p", { class: "text-body-1" }, " Futzo integra servicios de terceros como Google, Facebook y WhatsApp para el registro, autenticaci\xF3n y verificaci\xF3n de usuarios. Al utilizar estos servicios, el Usuario acepta las siguientes condiciones: "),
                                                  createVNode("p", { class: "text-body-1" }, " Registro y Autenticaci\xF3n con Google y Facebook: "),
                                                  createVNode("ul", { class: "term-list" }, [
                                                    createVNode("li", { class: "term-list-item" }, "El Usuario debe autorizar a Futzo para acceder a los datos m\xEDnimos requeridos para completar el proceso de registro (nombre, correo electr\xF3nico, etc.). "),
                                                    createVNode("li", { class: "term-list-item" }, "Futzo no ser\xE1 responsable por problemas relacionados con las cuentas de Google o Facebook (por ejemplo, p\xE9rdida de acceso a estas cuentas). ")
                                                  ]),
                                                  createVNode("p", { class: "text-body-1" }, " Verificaci\xF3n mediante WhatsApp OTP: "),
                                                  createVNode("ul", { class: "term-list" }, [
                                                    createVNode("li", { class: "term-list-item" }, "El Usuario debe proporcionar un n\xFAmero telef\xF3nico v\xE1lido para completar el proceso de verificaci\xF3n."),
                                                    createVNode("li", { class: "term-list-item" }, "Es responsabilidad del Usuario proteger el c\xF3digo de verificaci\xF3n y no compartirlo con terceros."),
                                                    createVNode("li", { class: "term-list-item" }, "El incumplimiento de esta regla puede resultar en la suspensi\xF3n de la cuenta.")
                                                  ]),
                                                  createVNode("p", { class: "text-body-1" }, " Responsabilidad del Usuario: "),
                                                  createVNode("ul", { class: "term-list" }, [
                                                    createVNode("li", { class: "term-list-item" }, "El Usuario debe garantizar que la informaci\xF3n proporcionada durante el registro sea ver\xEDdica y actualizada."),
                                                    createVNode("li", { class: "term-list-item" }, "Futzo no ser\xE1 responsable por el uso indebido de los servicios de terceros, como la transmisi\xF3n incorrecta de c\xF3digos OTP o problemas t\xE9cnicos ajenos a la plataforma. ")
                                                  ]),
                                                  createVNode("p", { class: "text-body-1" }, " Pol\xEDticas de Terceros: "),
                                                  createVNode("p", { class: "text-body-1" }, " Al utilizar Google, Facebook o WhatsApp como parte del proceso, el Usuario est\xE1 sujeto a las pol\xEDticas de privacidad de estas plataformas, adem\xE1s de las pol\xEDticas de Futzo. ")
                                                ]),
                                                createVNode("div", { class: "term-container" }, [
                                                  createVNode("h3", { class: "text-subtitle-1" }, "Contacto"),
                                                  createVNode("p", { class: "text-body-1" }, " Para consultas relacionadas con los T\xE9rminos y Condiciones, por favor, cont\xE1ctanos a trav\xE9s de: "),
                                                  createVNode("p", { class: "text-body-1" }, [
                                                    createTextVNode(" Correo electr\xF3nico: "),
                                                    createVNode("a", {
                                                      class: "font-weight-medium text-secondary",
                                                      href: "mailto:soporte@futzo.io"
                                                    }, "soporte@futzo.io")
                                                  ])
                                                ]),
                                                createVNode("div", { class: "term-container" }, [
                                                  createVNode("h3", { class: "text-subtitle-1" }, "Definiciones"),
                                                  createVNode("ul", { class: "term-list" }, [
                                                    createVNode("li", { class: "term-list-item" }, " Usuario: Persona que accede al Servicio, ya sea como administrador de liga, equipo, jugador, \xE1rbitro o cualquier otro rol. "),
                                                    createVNode("li", { class: "term-list-item" }, " Liga: Conjunto organizado de equipos y torneos registrados en la plataforma. "),
                                                    createVNode("li", { class: "term-list-item" }, " Torneo: Competencia dentro de una liga, administrada a trav\xE9s del Servicio. "),
                                                    createVNode("li", { class: "term-list-item" }, " Contenido: Datos ingresados por los usuarios, incluyendo informaci\xF3n de equipos, jugadores y partidos. "),
                                                    createVNode("li", { class: "term-list-item" }, " Administrador: Usuario con permisos para gestionar la liga y sus actividades. "),
                                                    createVNode("li", { class: "term-list-item" }, " Jugador: Usuario registrado en la plataforma como miembro de un equipo. "),
                                                    createVNode("li", { class: "term-list-item" }, " Equipo: Grupo de jugadores registrados en la plataforma. "),
                                                    createVNode("li", { class: "term-list-item" }, " Partido: Encuentro entre dos equipos, programado y registrado en la plataforma. "),
                                                    createVNode("li", { class: "term-list-item" }, " Servicio: Plataforma Futzo y sus funcionalidades. ")
                                                  ])
                                                ]),
                                                createVNode("div", { class: "term-container" }, [
                                                  createVNode("h3", { class: "text-subtitle-1" }, "Uso del Servicio"),
                                                  createVNode("p", { class: "text-body-1" }, " Acceso y Registro"),
                                                  createVNode("p", { class: "term-list-item" }, " Los usuarios deben proporcionar informaci\xF3n precisa y completa al registrarse. El incumplimiento puede resultar en la suspensi\xF3n de la cuenta. "),
                                                  createVNode("p", { class: "text-body-1" }, " Roles y Permisos"),
                                                  createVNode("p", { class: "term-list-item" }, " Cada usuario tendr\xE1 permisos espec\xEDficos seg\xFAn su rol asignado (por ejemplo, administrador de liga, jugador). "),
                                                  createVNode("p", { class: "text-body-1" }, " Restricciones"),
                                                  createVNode("p", { class: "text-body-1" }, "Queda prohibido:"),
                                                  createVNode("ul", { class: "term-list" }, [
                                                    createVNode("li", { class: "term-list-item" }, " Utilizar la plataforma para actividades il\xEDcitas o fraudulentas. "),
                                                    createVNode("li", { class: "term-list-item" }, " Intentar acceder, alterar o destruir datos de otros usuarios sin autorizaci\xF3n. "),
                                                    createVNode("li", { class: "term-list-item" }, " Publicar contenido ofensivo, discriminatorio o inapropiado. "),
                                                    createVNode("li", { class: "term-list-item" }, " Compartir credenciales de acceso con terceros. "),
                                                    createVNode("li", { class: "term-list-item" }, " Utilizar la plataforma para enviar spam o correos no deseados. "),
                                                    createVNode("li", { class: "term-list-item" }, " Violaci\xF3n de derechos de autor o propiedad intelectual. "),
                                                    createVNode("li", { class: "term-list-item" }, " Realizar ingenier\xEDa inversa, descompilaci\xF3n o desensamblaje del Servicio. "),
                                                    createVNode("li", { class: "term-list-item" }, " Utilizar bots, scripts o cualquier otro m\xE9todo automatizado para acceder al Servicio. "),
                                                    createVNode("li", { class: "term-list-item" }, " Utilizar la plataforma para actividades que puedan afectar su rendimiento o estabilidad. "),
                                                    createVNode("li", { class: "term-list-item" }, " Compartir informaci\xF3n personal de otros usuarios sin su consentimiento. ")
                                                  ]),
                                                  createVNode("p", { class: "text-body-1" }, " Actualizaciones y Mantenimiento "),
                                                  createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de realizar actualizaciones y mantenimiento en el Servicio sin previo aviso. Los usuarios ser\xE1n notificados de cualquier interrupci\xF3n programada. "),
                                                  createVNode("p", { class: "text-body-1" }, " Suspensi\xF3n y Cancelaci\xF3n "),
                                                  createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de suspender o cancelar cuentas que infrinjan los t\xE9rminos de uso. Los usuarios pueden solicitar la eliminaci\xF3n de su cuenta en cualquier momento. "),
                                                  createVNode("p", { class: "text-body-1" }, " Responsabilidad del Usuario "),
                                                  createVNode("p", { class: "text-body-1" }, " Los usuarios son responsables de mantener la confidencialidad de sus credenciales de acceso y de cualquier actividad realizada en su cuenta "),
                                                  createVNode("p", { class: "text-body-1" }, " Soporte T\xE9cnico"),
                                                  createVNode("p", { class: "text-body-1" }, " Futzo proporcionar\xE1 soporte t\xE9cnico a los usuarios para resolver problemas relacionados con el Servicio. "),
                                                  createVNode("p", { class: "text-body-1" }, " Comunicaci\xF3n"),
                                                  createVNode("p", { class: "text-body-1" }, " Los usuarios aceptan recibir comunicaciones de Futzo, incluyendo correos electr\xF3nicos, notificaciones y mensajes en la plataforma. "),
                                                  createVNode("p", { class: "text-body-1" }, " Modificaciones"),
                                                  createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de modificar estos t\xE9rminos en cualquier momento. Los usuarios ser\xE1n notificados de los cambios y deber\xE1n aceptarlos para continuar utilizando el Servicio. ")
                                                ]),
                                                createVNode("div", { class: "term-container" }, [
                                                  createVNode("h3", { class: "text-subtitle-1" }, " Contenido Generado por el Usuario "),
                                                  createVNode("p", { class: "text-body-1" }, " Los usuarios son responsables del contenido que ingresen en la plataforma. Futzo no asume responsabilidad por errores o inexactitudes en los datos proporcionados por los usuarios. "),
                                                  createVNode("p", { class: "text-body-1" }, " Propiedad del Contenido "),
                                                  createVNode("p", { class: "text-body-1" }, " Los usuarios conservan la propiedad de los datos ingresados en la plataforma. Futzo no reclama derechos de propiedad sobre el contenido generado por los usuarios "),
                                                  createVNode("p", { class: "text-body-1" }, " Licencia de Uso"),
                                                  createVNode("p", { class: "text-body-1" }, " Al ingresar contenido en la plataforma, los usuarios otorgan a Futzo una licencia no exclusiva para utilizar, modificar y distribuir dicho contenido en el Servicio. "),
                                                  createVNode("p", { class: "text-body-1" }, " Eliminaci\xF3n de Contenido "),
                                                  createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de eliminar contenido que infrinja los t\xE9rminos de uso o que sea considerado inapropiado. "),
                                                  createVNode("p", { class: "text-body-1" }, " Respaldo de Datos"),
                                                  createVNode("p", { class: "text-body-1" }, " Los usuarios son responsables de realizar copias de seguridad de su contenido en caso de p\xE9rdida o eliminaci\xF3n accidental. "),
                                                  createVNode("p", { class: "text-body-1" }, " Publicidad y Promoci\xF3n "),
                                                  createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de utilizar el contenido generado por los usuarios con fines publicitarios y promocionales. "),
                                                  createVNode("p", { class: "text-body-1" }, " Protecci\xF3n de Datos "),
                                                  createVNode("p", { class: "text-body-1" }, " Futzo implementar\xE1 medidas de seguridad para proteger la privacidad y confidencialidad de los datos de los usuarios. "),
                                                  createVNode("p", { class: "text-body-1" }, " Acceso a Datos"),
                                                  createVNode("p", { class: "text-body-1" }, " Los usuarios pueden acceder, modificar o eliminar su contenido en cualquier momento a trav\xE9s de la plataforma. "),
                                                  createVNode("p", { class: "text-body-1" }, " Retenci\xF3n de Datos"),
                                                  createVNode("p", { class: "text-body-1" }, " Futzo retendr\xE1 los datos de los usuarios durante el tiempo necesario para cumplir con sus obligaciones legales y contractuales. ")
                                                ]),
                                                createVNode("div", { class: "term-container" }, [
                                                  createVNode("h3", { class: "text-subtitle-1" }, "Propiedad Intelectual"),
                                                  createVNode("p", { class: "text-body-1" }, " Todos los derechos relacionados con el dise\xF1o, c\xF3digo fuente, funcionalidad y marca de Futzo pertenecen exclusivamente a futzo.io. Se proh\xEDbe la reproducci\xF3n, distribuci\xF3n o modificaci\xF3n del Servicio sin autorizaci\xF3n previa. "),
                                                  createVNode("p", { class: "text-body-1" }, " Marcas Registradas"),
                                                  createVNode("p", { class: "text-body-1" }, " Futzo es una marca registrada de futzo.io. Se proh\xEDbe el uso no autorizado de la marca en cualquier contexto. "),
                                                  createVNode("p", { class: "text-body-1" }, " Derechos de Autor"),
                                                  createVNode("p", { class: "text-body-1" }, " Todos los contenidos publicados en la plataforma est\xE1n protegidos por derechos de autor. Se proh\xEDbe la reproducci\xF3n o distribuci\xF3n sin autorizaci\xF3n. "),
                                                  createVNode("p", { class: "text-body-1" }, " Licencia de Uso"),
                                                  createVNode("p", { class: "text-body-1" }, " Los usuarios reciben una licencia limitada para utilizar el Servicio de acuerdo con los t\xE9rminos establecidos en este documento. "),
                                                  createVNode("p", { class: "text-body-1" }, " Contenido de Terceros "),
                                                  createVNode("p", { class: "text-body-1" }, " Futzo puede incluir contenido de terceros en la plataforma, sujeto a los t\xE9rminos y condiciones de uso de los proveedores. "),
                                                  createVNode("p", { class: "text-body-1" }, " Notificaci\xF3n de Infracci\xF3n "),
                                                  createVNode("p", { class: "text-body-1" }, " Si un usuario considera que su propiedad intelectual ha sido infringida en la plataforma, debe notificar a Futzo para tomar las medidas correspondientes. "),
                                                  createVNode("p", { class: "text-body-1" }, " Protecci\xF3n de Datos "),
                                                  createVNode("p", { class: "text-body-1" }, " Futzo implementar\xE1 medidas de seguridad para proteger la privacidad y confidencialidad de los datos de los usuarios. ")
                                                ])
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VRow, null, {
                                        default: withCtx(() => [
                                          createVNode(VCol, { cols: "12" }, {
                                            default: withCtx(() => [
                                              createVNode("p", { class: "text-body-1" }, " Bienvenido a Futzo, un sistema de gesti\xF3n dise\xF1ado para facilitar la administraci\xF3n de ligas deportivas y sus respectivas actividades. Al utilizar la plataforma Futzo (en adelante, \u201Cel Servicio\u201D), usted acepta cumplir con los t\xE9rminos descritos en este documento. Si no est\xE1 de acuerdo con estos t\xE9rminos, debe abstenerse de utilizar el Servicio. "),
                                              createVNode("div", { class: "term-container" }, [
                                                createVNode("h3", { class: "text-subtitle-1" }, "Cumplimiento Legal"),
                                                createVNode("p", { class: "text-body-1" }, " Ley Federal de Protecci\xF3n de Datos Personales en Posesi\xF3n de los Particulares (LFPDPPP) "),
                                                createVNode("p", { class: "text-body-1" }, " Futzo cumple con la LFPDPPP, otorgando a los usuarios derechos ARCO (Acceso, Rectificaci\xF3n, Cancelaci\xF3n y Oposici\xF3n) sobre sus datos personales. "),
                                                createVNode("p", { class: "text-body-1" }, " Reglamento General de Protecci\xF3n de Datos (GDPR) "),
                                                createVNode("p", { class: "text-body-1" }, " Si los usuarios residen en la Uni\xF3n Europea, Futzo garantiza los derechos previstos en el GDPR, incluyendo: "),
                                                createVNode("ul", { class: "term-list" }, [
                                                  createVNode("li", { class: "term-list-item" }, " Derecho al Olvido: Solicitar la eliminaci\xF3n de su informaci\xF3n personal. "),
                                                  createVNode("li", { class: "term-list-item" }, " Portabilidad de Datos: Transferir sus datos a otro proveedor si lo desean. ")
                                                ]),
                                                createVNode("p", { class: "text-body-1" }, " Consentimiento para el Tratamiento de Datos "),
                                                createVNode("p", { class: "text-body-1" }, " Al registrarse, los usuarios otorgan su consentimiento expl\xEDcito para el manejo de su informaci\xF3n personal conforme a nuestra Pol\xEDtica de Privacidad. "),
                                                createVNode("p", { class: "text-body-1" }, [
                                                  createTextVNode(" Su privacidad es importante para nosotros. Consulte nuestra "),
                                                  createVNode("a", {
                                                    href: "javascript:void(0)",
                                                    onClick: ($event) => _ctx.$router.push({ name: "politica-de-privacidad" }),
                                                    class: "font-weight-medium text-secondary"
                                                  }, "Pol\xEDtica de Privacidad", 8, ["onClick"]),
                                                  createTextVNode(" para comprender c\xF3mo recopilamos, utilizamos y protegemos sus datos personales. ")
                                                ])
                                              ]),
                                              createVNode("div", { class: "term-container" }, [
                                                createVNode("h3", { class: "text-subtitle-1" }, " Responsabilidad y Limitaci\xF3n "),
                                                createVNode("p", { class: "text-body-1" }, " Exclusi\xF3n de Garant\xEDas "),
                                                createVNode("p", { class: "text-body-1" }, ' Futzo se proporciona "tal cual" y "seg\xFAn disponibilidad". Futzo no garantiza: '),
                                                createVNode("ul", { class: "term-list" }, [
                                                  createVNode("li", { class: "term-list-item" }, " La disponibilidad continua del servicio. "),
                                                  createVNode("li", { class: "term-list-item" }, " La ausencia de errores en la plataforma. "),
                                                  createVNode("li", { class: "term-list-item" }, " Que la plataforma satisfaga las expectativas particulares de los usuarios. ")
                                                ]),
                                                createVNode("p", { class: "text-body-1" }, " Limitaci\xF3n de Responsabilidad "),
                                                createVNode("p", { class: "text-body-1" }, "Futzo no ser\xE1 responsable por:"),
                                                createVNode("ul", { class: "term-list" }, [
                                                  createVNode("li", { class: "term-list-item" }, " Da\xF1os indirectos, incidentales o consecuentes. "),
                                                  createVNode("li", { class: "term-list-item" }, " P\xE9rdidas financieras derivadas del uso del servicio. "),
                                                  createVNode("li", { class: "term-list-item" }, " Contenido generado por los usuarios que infrinja derechos de terceros. ")
                                                ]),
                                                createVNode("p", { class: "text-body-1" }, "Indemnizaci\xF3n"),
                                                createVNode("p", { class: "text-body-1" }, " Los usuarios acuerdan indemnizar y liberar de responsabilidad a Futzo por cualquier reclamaci\xF3n, da\xF1o o p\xE9rdida causada por: "),
                                                createVNode("ul", { class: "term-list" }, [
                                                  createVNode("li", { class: "term-list-item" }, "Uso indebido del servicio."),
                                                  createVNode("li", { class: "term-list-item" }, " Incumplimiento de estos t\xE9rminos por parte del usuario. ")
                                                ])
                                              ]),
                                              createVNode("div", { class: "term-container" }, [
                                                createVNode("h3", { class: "text-subtitle-1" }, "Propiedad Intelectual"),
                                                createVNode("p", { class: "text-body-1" }, " Derechos de Autor y Marcas Registradas "),
                                                createVNode("p", { class: "text-body-1" }, " Todos los derechos sobre el dise\xF1o, c\xF3digo fuente, logotipos y otros elementos de Futzo son propiedad exclusiva de Futzo.io. "),
                                                createVNode("p", { class: "text-body-1" }, " Contenido Generado por Usuarios "),
                                                createVNode("p", { class: "text-body-1" }, " Los usuarios conservan la propiedad de los datos ingresados en la plataforma. Sin embargo, otorgan a Futzo una licencia no exclusiva para utilizar dichos datos en la operaci\xF3n del servicio. "),
                                                createVNode("p", { class: "text-body-1" }, " Protecci\xF3n del Sistema: Queda prohibido: "),
                                                createVNode("ul", { class: "term-list" }, [
                                                  createVNode("li", { class: "term-list-item" }, " Intentar descompilar, realizar ingenier\xEDa inversa o copiar partes del software. "),
                                                  createVNode("li", { class: "term-list-item" }, " Utilizar elementos de la marca Futzo sin autorizaci\xF3n. ")
                                                ])
                                              ]),
                                              createVNode("div", { class: "term-container" }, [
                                                createVNode("h3", { class: "text-subtitle-1" }, "Conducta del Usuario"),
                                                createVNode("p", { class: "text-body-1" }, " Restricciones Generales: "),
                                                createVNode("ul", { class: "term-list" }, [
                                                  createVNode("li", { class: "term-list-item" }, " Publicar contenido ofensivo, discriminatorio o ilegal. "),
                                                  createVNode("li", { class: "term-list-item" }, " Usar scripts automatizados, bots o herramientas similares. "),
                                                  createVNode("li", { class: "term-list-item" }, " Compartir informaci\xF3n personal de terceros sin consentimiento. ")
                                                ]),
                                                createVNode("p", { class: "text-body-1" }, " Uso \xC9tico:"),
                                                createVNode("p", { class: "text-body-1" }, " Los usuarios se comprometen a actuar de buena fe y a no realizar actividades que perjudiquen la reputaci\xF3n de Futzo. ")
                                              ]),
                                              createVNode("div", { class: "term-container" }, [
                                                createVNode("h3", { class: "text-subtitle-1" }, "Pagos y Tarifas"),
                                                createVNode("p", { class: "text-body-1" }, " M\xE9todos de Pago y Facturaci\xF3n: "),
                                                createVNode("p", { class: "text-body-1" }, " Los usuarios pueden realizar pagos a trav\xE9s de los m\xE9todos habilitados, incluyendo tarjetas de cr\xE9dito/d\xE9bito y transferencias bancarias. "),
                                                createVNode("p", { class: "text-body-1" }, " Pol\xEDtica de Reembolsos: "),
                                                createVNode("p", { class: "text-body-1" }, " Los reembolsos estar\xE1n sujetos a evaluaci\xF3n, y solo se otorgar\xE1n en casos excepcionales, como: "),
                                                createVNode("ul", { class: "term-list" }, [
                                                  createVNode("li", { class: "term-list-item" }, " Errores en el sistema de facturaci\xF3n. "),
                                                  createVNode("li", { class: "term-list-item" }, " Cancelaciones antes de iniciar el servicio contratado. ")
                                                ]),
                                                createVNode("p", { class: "text-body-1" }, " Impuestos:"),
                                                createVNode("p", { class: "text-body-1" }, " El usuario es responsable de pagar los impuestos aplicables seg\xFAn las leyes locales. ")
                                              ]),
                                              createVNode("div", { class: "term-container" }, [
                                                createVNode("h3", { class: "text-subtitle-1" }, " Flexibilidad y Actualizaci\xF3n "),
                                                createVNode("p", { class: "text-body-1" }, " Modificaciones a los T\xE9rminos: "),
                                                createVNode("p", { class: "text-body-1" }, " Futzo puede modificar estos t\xE9rminos en cualquier momento para reflejar cambios legales, regulatorios o de mercado. Los usuarios ser\xE1n notificados con al menos 15 d\xEDas de antelaci\xF3n. "),
                                                createVNode("p", { class: "text-body-1" }, " Aceptaci\xF3n de Cambios: "),
                                                createVNode("p", { class: "text-body-1" }, " El uso continuado del servicio tras la notificaci\xF3n de cambios implica la aceptaci\xF3n de los nuevos t\xE9rminos. ")
                                              ]),
                                              createVNode("div", { class: "term-container" }, [
                                                createVNode("h3", { class: "text-subtitle-1" }, " Seguridad y Protecci\xF3n de Datos "),
                                                createVNode("p", { class: "text-body-1" }, " Medidas de Seguridad: "),
                                                createVNode("p", { class: "text-body-1" }, " Futzo implementa protocolos de seguridad, como: "),
                                                createVNode("ul", { class: "term-list" }, [
                                                  createVNode("li", { class: "term-list-item" }, "Cifrado de datos sensibles."),
                                                  createVNode("li", { class: "term-list-item" }, "Autenticaci\xF3n de dos factores."),
                                                  createVNode("li", { class: "term-list-item" }, " Auditor\xEDas peri\xF3dicas del sistema. ")
                                                ]),
                                                createVNode("p", { class: "text-body-1" }, " Notificaci\xF3n de Brechas de Seguridad: "),
                                                createVNode("p", { class: "text-body-1" }, " En caso de una brecha de seguridad, Futzo notificar\xE1 a los usuarios afectados dentro de las 72 horas siguientes, conforme a las regulaciones aplicables. ")
                                              ]),
                                              createVNode("div", { class: "term-container" }, [
                                                createVNode("h3", { class: "text-subtitle-1" }, " Jurisdicci\xF3n y Ley Aplicable "),
                                                createVNode("p", { class: "text-body-1" }, " Estos t\xE9rminos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier controversia ser\xE1 resuelta ante los tribunales competentes de la Ciudad de M\xE9xico. ")
                                              ]),
                                              createVNode("div", { class: "term-container" }, [
                                                createVNode("h3", { class: "text-subtitle-1" }, " Uso de Servicios de Registro y Verificaci\xF3n "),
                                                createVNode("p", { class: "text-body-1" }, " Futzo integra servicios de terceros como Google, Facebook y WhatsApp para el registro, autenticaci\xF3n y verificaci\xF3n de usuarios. Al utilizar estos servicios, el Usuario acepta las siguientes condiciones: "),
                                                createVNode("p", { class: "text-body-1" }, " Registro y Autenticaci\xF3n con Google y Facebook: "),
                                                createVNode("ul", { class: "term-list" }, [
                                                  createVNode("li", { class: "term-list-item" }, "El Usuario debe autorizar a Futzo para acceder a los datos m\xEDnimos requeridos para completar el proceso de registro (nombre, correo electr\xF3nico, etc.). "),
                                                  createVNode("li", { class: "term-list-item" }, "Futzo no ser\xE1 responsable por problemas relacionados con las cuentas de Google o Facebook (por ejemplo, p\xE9rdida de acceso a estas cuentas). ")
                                                ]),
                                                createVNode("p", { class: "text-body-1" }, " Verificaci\xF3n mediante WhatsApp OTP: "),
                                                createVNode("ul", { class: "term-list" }, [
                                                  createVNode("li", { class: "term-list-item" }, "El Usuario debe proporcionar un n\xFAmero telef\xF3nico v\xE1lido para completar el proceso de verificaci\xF3n."),
                                                  createVNode("li", { class: "term-list-item" }, "Es responsabilidad del Usuario proteger el c\xF3digo de verificaci\xF3n y no compartirlo con terceros."),
                                                  createVNode("li", { class: "term-list-item" }, "El incumplimiento de esta regla puede resultar en la suspensi\xF3n de la cuenta.")
                                                ]),
                                                createVNode("p", { class: "text-body-1" }, " Responsabilidad del Usuario: "),
                                                createVNode("ul", { class: "term-list" }, [
                                                  createVNode("li", { class: "term-list-item" }, "El Usuario debe garantizar que la informaci\xF3n proporcionada durante el registro sea ver\xEDdica y actualizada."),
                                                  createVNode("li", { class: "term-list-item" }, "Futzo no ser\xE1 responsable por el uso indebido de los servicios de terceros, como la transmisi\xF3n incorrecta de c\xF3digos OTP o problemas t\xE9cnicos ajenos a la plataforma. ")
                                                ]),
                                                createVNode("p", { class: "text-body-1" }, " Pol\xEDticas de Terceros: "),
                                                createVNode("p", { class: "text-body-1" }, " Al utilizar Google, Facebook o WhatsApp como parte del proceso, el Usuario est\xE1 sujeto a las pol\xEDticas de privacidad de estas plataformas, adem\xE1s de las pol\xEDticas de Futzo. ")
                                              ]),
                                              createVNode("div", { class: "term-container" }, [
                                                createVNode("h3", { class: "text-subtitle-1" }, "Contacto"),
                                                createVNode("p", { class: "text-body-1" }, " Para consultas relacionadas con los T\xE9rminos y Condiciones, por favor, cont\xE1ctanos a trav\xE9s de: "),
                                                createVNode("p", { class: "text-body-1" }, [
                                                  createTextVNode(" Correo electr\xF3nico: "),
                                                  createVNode("a", {
                                                    class: "font-weight-medium text-secondary",
                                                    href: "mailto:soporte@futzo.io"
                                                  }, "soporte@futzo.io")
                                                ])
                                              ]),
                                              createVNode("div", { class: "term-container" }, [
                                                createVNode("h3", { class: "text-subtitle-1" }, "Definiciones"),
                                                createVNode("ul", { class: "term-list" }, [
                                                  createVNode("li", { class: "term-list-item" }, " Usuario: Persona que accede al Servicio, ya sea como administrador de liga, equipo, jugador, \xE1rbitro o cualquier otro rol. "),
                                                  createVNode("li", { class: "term-list-item" }, " Liga: Conjunto organizado de equipos y torneos registrados en la plataforma. "),
                                                  createVNode("li", { class: "term-list-item" }, " Torneo: Competencia dentro de una liga, administrada a trav\xE9s del Servicio. "),
                                                  createVNode("li", { class: "term-list-item" }, " Contenido: Datos ingresados por los usuarios, incluyendo informaci\xF3n de equipos, jugadores y partidos. "),
                                                  createVNode("li", { class: "term-list-item" }, " Administrador: Usuario con permisos para gestionar la liga y sus actividades. "),
                                                  createVNode("li", { class: "term-list-item" }, " Jugador: Usuario registrado en la plataforma como miembro de un equipo. "),
                                                  createVNode("li", { class: "term-list-item" }, " Equipo: Grupo de jugadores registrados en la plataforma. "),
                                                  createVNode("li", { class: "term-list-item" }, " Partido: Encuentro entre dos equipos, programado y registrado en la plataforma. "),
                                                  createVNode("li", { class: "term-list-item" }, " Servicio: Plataforma Futzo y sus funcionalidades. ")
                                                ])
                                              ]),
                                              createVNode("div", { class: "term-container" }, [
                                                createVNode("h3", { class: "text-subtitle-1" }, "Uso del Servicio"),
                                                createVNode("p", { class: "text-body-1" }, " Acceso y Registro"),
                                                createVNode("p", { class: "term-list-item" }, " Los usuarios deben proporcionar informaci\xF3n precisa y completa al registrarse. El incumplimiento puede resultar en la suspensi\xF3n de la cuenta. "),
                                                createVNode("p", { class: "text-body-1" }, " Roles y Permisos"),
                                                createVNode("p", { class: "term-list-item" }, " Cada usuario tendr\xE1 permisos espec\xEDficos seg\xFAn su rol asignado (por ejemplo, administrador de liga, jugador). "),
                                                createVNode("p", { class: "text-body-1" }, " Restricciones"),
                                                createVNode("p", { class: "text-body-1" }, "Queda prohibido:"),
                                                createVNode("ul", { class: "term-list" }, [
                                                  createVNode("li", { class: "term-list-item" }, " Utilizar la plataforma para actividades il\xEDcitas o fraudulentas. "),
                                                  createVNode("li", { class: "term-list-item" }, " Intentar acceder, alterar o destruir datos de otros usuarios sin autorizaci\xF3n. "),
                                                  createVNode("li", { class: "term-list-item" }, " Publicar contenido ofensivo, discriminatorio o inapropiado. "),
                                                  createVNode("li", { class: "term-list-item" }, " Compartir credenciales de acceso con terceros. "),
                                                  createVNode("li", { class: "term-list-item" }, " Utilizar la plataforma para enviar spam o correos no deseados. "),
                                                  createVNode("li", { class: "term-list-item" }, " Violaci\xF3n de derechos de autor o propiedad intelectual. "),
                                                  createVNode("li", { class: "term-list-item" }, " Realizar ingenier\xEDa inversa, descompilaci\xF3n o desensamblaje del Servicio. "),
                                                  createVNode("li", { class: "term-list-item" }, " Utilizar bots, scripts o cualquier otro m\xE9todo automatizado para acceder al Servicio. "),
                                                  createVNode("li", { class: "term-list-item" }, " Utilizar la plataforma para actividades que puedan afectar su rendimiento o estabilidad. "),
                                                  createVNode("li", { class: "term-list-item" }, " Compartir informaci\xF3n personal de otros usuarios sin su consentimiento. ")
                                                ]),
                                                createVNode("p", { class: "text-body-1" }, " Actualizaciones y Mantenimiento "),
                                                createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de realizar actualizaciones y mantenimiento en el Servicio sin previo aviso. Los usuarios ser\xE1n notificados de cualquier interrupci\xF3n programada. "),
                                                createVNode("p", { class: "text-body-1" }, " Suspensi\xF3n y Cancelaci\xF3n "),
                                                createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de suspender o cancelar cuentas que infrinjan los t\xE9rminos de uso. Los usuarios pueden solicitar la eliminaci\xF3n de su cuenta en cualquier momento. "),
                                                createVNode("p", { class: "text-body-1" }, " Responsabilidad del Usuario "),
                                                createVNode("p", { class: "text-body-1" }, " Los usuarios son responsables de mantener la confidencialidad de sus credenciales de acceso y de cualquier actividad realizada en su cuenta "),
                                                createVNode("p", { class: "text-body-1" }, " Soporte T\xE9cnico"),
                                                createVNode("p", { class: "text-body-1" }, " Futzo proporcionar\xE1 soporte t\xE9cnico a los usuarios para resolver problemas relacionados con el Servicio. "),
                                                createVNode("p", { class: "text-body-1" }, " Comunicaci\xF3n"),
                                                createVNode("p", { class: "text-body-1" }, " Los usuarios aceptan recibir comunicaciones de Futzo, incluyendo correos electr\xF3nicos, notificaciones y mensajes en la plataforma. "),
                                                createVNode("p", { class: "text-body-1" }, " Modificaciones"),
                                                createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de modificar estos t\xE9rminos en cualquier momento. Los usuarios ser\xE1n notificados de los cambios y deber\xE1n aceptarlos para continuar utilizando el Servicio. ")
                                              ]),
                                              createVNode("div", { class: "term-container" }, [
                                                createVNode("h3", { class: "text-subtitle-1" }, " Contenido Generado por el Usuario "),
                                                createVNode("p", { class: "text-body-1" }, " Los usuarios son responsables del contenido que ingresen en la plataforma. Futzo no asume responsabilidad por errores o inexactitudes en los datos proporcionados por los usuarios. "),
                                                createVNode("p", { class: "text-body-1" }, " Propiedad del Contenido "),
                                                createVNode("p", { class: "text-body-1" }, " Los usuarios conservan la propiedad de los datos ingresados en la plataforma. Futzo no reclama derechos de propiedad sobre el contenido generado por los usuarios "),
                                                createVNode("p", { class: "text-body-1" }, " Licencia de Uso"),
                                                createVNode("p", { class: "text-body-1" }, " Al ingresar contenido en la plataforma, los usuarios otorgan a Futzo una licencia no exclusiva para utilizar, modificar y distribuir dicho contenido en el Servicio. "),
                                                createVNode("p", { class: "text-body-1" }, " Eliminaci\xF3n de Contenido "),
                                                createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de eliminar contenido que infrinja los t\xE9rminos de uso o que sea considerado inapropiado. "),
                                                createVNode("p", { class: "text-body-1" }, " Respaldo de Datos"),
                                                createVNode("p", { class: "text-body-1" }, " Los usuarios son responsables de realizar copias de seguridad de su contenido en caso de p\xE9rdida o eliminaci\xF3n accidental. "),
                                                createVNode("p", { class: "text-body-1" }, " Publicidad y Promoci\xF3n "),
                                                createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de utilizar el contenido generado por los usuarios con fines publicitarios y promocionales. "),
                                                createVNode("p", { class: "text-body-1" }, " Protecci\xF3n de Datos "),
                                                createVNode("p", { class: "text-body-1" }, " Futzo implementar\xE1 medidas de seguridad para proteger la privacidad y confidencialidad de los datos de los usuarios. "),
                                                createVNode("p", { class: "text-body-1" }, " Acceso a Datos"),
                                                createVNode("p", { class: "text-body-1" }, " Los usuarios pueden acceder, modificar o eliminar su contenido en cualquier momento a trav\xE9s de la plataforma. "),
                                                createVNode("p", { class: "text-body-1" }, " Retenci\xF3n de Datos"),
                                                createVNode("p", { class: "text-body-1" }, " Futzo retendr\xE1 los datos de los usuarios durante el tiempo necesario para cumplir con sus obligaciones legales y contractuales. ")
                                              ]),
                                              createVNode("div", { class: "term-container" }, [
                                                createVNode("h3", { class: "text-subtitle-1" }, "Propiedad Intelectual"),
                                                createVNode("p", { class: "text-body-1" }, " Todos los derechos relacionados con el dise\xF1o, c\xF3digo fuente, funcionalidad y marca de Futzo pertenecen exclusivamente a futzo.io. Se proh\xEDbe la reproducci\xF3n, distribuci\xF3n o modificaci\xF3n del Servicio sin autorizaci\xF3n previa. "),
                                                createVNode("p", { class: "text-body-1" }, " Marcas Registradas"),
                                                createVNode("p", { class: "text-body-1" }, " Futzo es una marca registrada de futzo.io. Se proh\xEDbe el uso no autorizado de la marca en cualquier contexto. "),
                                                createVNode("p", { class: "text-body-1" }, " Derechos de Autor"),
                                                createVNode("p", { class: "text-body-1" }, " Todos los contenidos publicados en la plataforma est\xE1n protegidos por derechos de autor. Se proh\xEDbe la reproducci\xF3n o distribuci\xF3n sin autorizaci\xF3n. "),
                                                createVNode("p", { class: "text-body-1" }, " Licencia de Uso"),
                                                createVNode("p", { class: "text-body-1" }, " Los usuarios reciben una licencia limitada para utilizar el Servicio de acuerdo con los t\xE9rminos establecidos en este documento. "),
                                                createVNode("p", { class: "text-body-1" }, " Contenido de Terceros "),
                                                createVNode("p", { class: "text-body-1" }, " Futzo puede incluir contenido de terceros en la plataforma, sujeto a los t\xE9rminos y condiciones de uso de los proveedores. "),
                                                createVNode("p", { class: "text-body-1" }, " Notificaci\xF3n de Infracci\xF3n "),
                                                createVNode("p", { class: "text-body-1" }, " Si un usuario considera que su propiedad intelectual ha sido infringida en la plataforma, debe notificar a Futzo para tomar las medidas correspondientes. "),
                                                createVNode("p", { class: "text-body-1" }, " Protecci\xF3n de Datos "),
                                                createVNode("p", { class: "text-body-1" }, " Futzo implementar\xE1 medidas de seguridad para proteger la privacidad y confidencialidad de los datos de los usuarios. ")
                                              ])
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VContainer, null, {
                                  default: withCtx(() => [
                                    createVNode(VRow, null, {
                                      default: withCtx(() => [
                                        createVNode(VCol, { cols: "12" }, {
                                          default: withCtx(() => [
                                            createVNode("p", { class: "text-body-1" }, " Bienvenido a Futzo, un sistema de gesti\xF3n dise\xF1ado para facilitar la administraci\xF3n de ligas deportivas y sus respectivas actividades. Al utilizar la plataforma Futzo (en adelante, \u201Cel Servicio\u201D), usted acepta cumplir con los t\xE9rminos descritos en este documento. Si no est\xE1 de acuerdo con estos t\xE9rminos, debe abstenerse de utilizar el Servicio. "),
                                            createVNode("div", { class: "term-container" }, [
                                              createVNode("h3", { class: "text-subtitle-1" }, "Cumplimiento Legal"),
                                              createVNode("p", { class: "text-body-1" }, " Ley Federal de Protecci\xF3n de Datos Personales en Posesi\xF3n de los Particulares (LFPDPPP) "),
                                              createVNode("p", { class: "text-body-1" }, " Futzo cumple con la LFPDPPP, otorgando a los usuarios derechos ARCO (Acceso, Rectificaci\xF3n, Cancelaci\xF3n y Oposici\xF3n) sobre sus datos personales. "),
                                              createVNode("p", { class: "text-body-1" }, " Reglamento General de Protecci\xF3n de Datos (GDPR) "),
                                              createVNode("p", { class: "text-body-1" }, " Si los usuarios residen en la Uni\xF3n Europea, Futzo garantiza los derechos previstos en el GDPR, incluyendo: "),
                                              createVNode("ul", { class: "term-list" }, [
                                                createVNode("li", { class: "term-list-item" }, " Derecho al Olvido: Solicitar la eliminaci\xF3n de su informaci\xF3n personal. "),
                                                createVNode("li", { class: "term-list-item" }, " Portabilidad de Datos: Transferir sus datos a otro proveedor si lo desean. ")
                                              ]),
                                              createVNode("p", { class: "text-body-1" }, " Consentimiento para el Tratamiento de Datos "),
                                              createVNode("p", { class: "text-body-1" }, " Al registrarse, los usuarios otorgan su consentimiento expl\xEDcito para el manejo de su informaci\xF3n personal conforme a nuestra Pol\xEDtica de Privacidad. "),
                                              createVNode("p", { class: "text-body-1" }, [
                                                createTextVNode(" Su privacidad es importante para nosotros. Consulte nuestra "),
                                                createVNode("a", {
                                                  href: "javascript:void(0)",
                                                  onClick: ($event) => _ctx.$router.push({ name: "politica-de-privacidad" }),
                                                  class: "font-weight-medium text-secondary"
                                                }, "Pol\xEDtica de Privacidad", 8, ["onClick"]),
                                                createTextVNode(" para comprender c\xF3mo recopilamos, utilizamos y protegemos sus datos personales. ")
                                              ])
                                            ]),
                                            createVNode("div", { class: "term-container" }, [
                                              createVNode("h3", { class: "text-subtitle-1" }, " Responsabilidad y Limitaci\xF3n "),
                                              createVNode("p", { class: "text-body-1" }, " Exclusi\xF3n de Garant\xEDas "),
                                              createVNode("p", { class: "text-body-1" }, ' Futzo se proporciona "tal cual" y "seg\xFAn disponibilidad". Futzo no garantiza: '),
                                              createVNode("ul", { class: "term-list" }, [
                                                createVNode("li", { class: "term-list-item" }, " La disponibilidad continua del servicio. "),
                                                createVNode("li", { class: "term-list-item" }, " La ausencia de errores en la plataforma. "),
                                                createVNode("li", { class: "term-list-item" }, " Que la plataforma satisfaga las expectativas particulares de los usuarios. ")
                                              ]),
                                              createVNode("p", { class: "text-body-1" }, " Limitaci\xF3n de Responsabilidad "),
                                              createVNode("p", { class: "text-body-1" }, "Futzo no ser\xE1 responsable por:"),
                                              createVNode("ul", { class: "term-list" }, [
                                                createVNode("li", { class: "term-list-item" }, " Da\xF1os indirectos, incidentales o consecuentes. "),
                                                createVNode("li", { class: "term-list-item" }, " P\xE9rdidas financieras derivadas del uso del servicio. "),
                                                createVNode("li", { class: "term-list-item" }, " Contenido generado por los usuarios que infrinja derechos de terceros. ")
                                              ]),
                                              createVNode("p", { class: "text-body-1" }, "Indemnizaci\xF3n"),
                                              createVNode("p", { class: "text-body-1" }, " Los usuarios acuerdan indemnizar y liberar de responsabilidad a Futzo por cualquier reclamaci\xF3n, da\xF1o o p\xE9rdida causada por: "),
                                              createVNode("ul", { class: "term-list" }, [
                                                createVNode("li", { class: "term-list-item" }, "Uso indebido del servicio."),
                                                createVNode("li", { class: "term-list-item" }, " Incumplimiento de estos t\xE9rminos por parte del usuario. ")
                                              ])
                                            ]),
                                            createVNode("div", { class: "term-container" }, [
                                              createVNode("h3", { class: "text-subtitle-1" }, "Propiedad Intelectual"),
                                              createVNode("p", { class: "text-body-1" }, " Derechos de Autor y Marcas Registradas "),
                                              createVNode("p", { class: "text-body-1" }, " Todos los derechos sobre el dise\xF1o, c\xF3digo fuente, logotipos y otros elementos de Futzo son propiedad exclusiva de Futzo.io. "),
                                              createVNode("p", { class: "text-body-1" }, " Contenido Generado por Usuarios "),
                                              createVNode("p", { class: "text-body-1" }, " Los usuarios conservan la propiedad de los datos ingresados en la plataforma. Sin embargo, otorgan a Futzo una licencia no exclusiva para utilizar dichos datos en la operaci\xF3n del servicio. "),
                                              createVNode("p", { class: "text-body-1" }, " Protecci\xF3n del Sistema: Queda prohibido: "),
                                              createVNode("ul", { class: "term-list" }, [
                                                createVNode("li", { class: "term-list-item" }, " Intentar descompilar, realizar ingenier\xEDa inversa o copiar partes del software. "),
                                                createVNode("li", { class: "term-list-item" }, " Utilizar elementos de la marca Futzo sin autorizaci\xF3n. ")
                                              ])
                                            ]),
                                            createVNode("div", { class: "term-container" }, [
                                              createVNode("h3", { class: "text-subtitle-1" }, "Conducta del Usuario"),
                                              createVNode("p", { class: "text-body-1" }, " Restricciones Generales: "),
                                              createVNode("ul", { class: "term-list" }, [
                                                createVNode("li", { class: "term-list-item" }, " Publicar contenido ofensivo, discriminatorio o ilegal. "),
                                                createVNode("li", { class: "term-list-item" }, " Usar scripts automatizados, bots o herramientas similares. "),
                                                createVNode("li", { class: "term-list-item" }, " Compartir informaci\xF3n personal de terceros sin consentimiento. ")
                                              ]),
                                              createVNode("p", { class: "text-body-1" }, " Uso \xC9tico:"),
                                              createVNode("p", { class: "text-body-1" }, " Los usuarios se comprometen a actuar de buena fe y a no realizar actividades que perjudiquen la reputaci\xF3n de Futzo. ")
                                            ]),
                                            createVNode("div", { class: "term-container" }, [
                                              createVNode("h3", { class: "text-subtitle-1" }, "Pagos y Tarifas"),
                                              createVNode("p", { class: "text-body-1" }, " M\xE9todos de Pago y Facturaci\xF3n: "),
                                              createVNode("p", { class: "text-body-1" }, " Los usuarios pueden realizar pagos a trav\xE9s de los m\xE9todos habilitados, incluyendo tarjetas de cr\xE9dito/d\xE9bito y transferencias bancarias. "),
                                              createVNode("p", { class: "text-body-1" }, " Pol\xEDtica de Reembolsos: "),
                                              createVNode("p", { class: "text-body-1" }, " Los reembolsos estar\xE1n sujetos a evaluaci\xF3n, y solo se otorgar\xE1n en casos excepcionales, como: "),
                                              createVNode("ul", { class: "term-list" }, [
                                                createVNode("li", { class: "term-list-item" }, " Errores en el sistema de facturaci\xF3n. "),
                                                createVNode("li", { class: "term-list-item" }, " Cancelaciones antes de iniciar el servicio contratado. ")
                                              ]),
                                              createVNode("p", { class: "text-body-1" }, " Impuestos:"),
                                              createVNode("p", { class: "text-body-1" }, " El usuario es responsable de pagar los impuestos aplicables seg\xFAn las leyes locales. ")
                                            ]),
                                            createVNode("div", { class: "term-container" }, [
                                              createVNode("h3", { class: "text-subtitle-1" }, " Flexibilidad y Actualizaci\xF3n "),
                                              createVNode("p", { class: "text-body-1" }, " Modificaciones a los T\xE9rminos: "),
                                              createVNode("p", { class: "text-body-1" }, " Futzo puede modificar estos t\xE9rminos en cualquier momento para reflejar cambios legales, regulatorios o de mercado. Los usuarios ser\xE1n notificados con al menos 15 d\xEDas de antelaci\xF3n. "),
                                              createVNode("p", { class: "text-body-1" }, " Aceptaci\xF3n de Cambios: "),
                                              createVNode("p", { class: "text-body-1" }, " El uso continuado del servicio tras la notificaci\xF3n de cambios implica la aceptaci\xF3n de los nuevos t\xE9rminos. ")
                                            ]),
                                            createVNode("div", { class: "term-container" }, [
                                              createVNode("h3", { class: "text-subtitle-1" }, " Seguridad y Protecci\xF3n de Datos "),
                                              createVNode("p", { class: "text-body-1" }, " Medidas de Seguridad: "),
                                              createVNode("p", { class: "text-body-1" }, " Futzo implementa protocolos de seguridad, como: "),
                                              createVNode("ul", { class: "term-list" }, [
                                                createVNode("li", { class: "term-list-item" }, "Cifrado de datos sensibles."),
                                                createVNode("li", { class: "term-list-item" }, "Autenticaci\xF3n de dos factores."),
                                                createVNode("li", { class: "term-list-item" }, " Auditor\xEDas peri\xF3dicas del sistema. ")
                                              ]),
                                              createVNode("p", { class: "text-body-1" }, " Notificaci\xF3n de Brechas de Seguridad: "),
                                              createVNode("p", { class: "text-body-1" }, " En caso de una brecha de seguridad, Futzo notificar\xE1 a los usuarios afectados dentro de las 72 horas siguientes, conforme a las regulaciones aplicables. ")
                                            ]),
                                            createVNode("div", { class: "term-container" }, [
                                              createVNode("h3", { class: "text-subtitle-1" }, " Jurisdicci\xF3n y Ley Aplicable "),
                                              createVNode("p", { class: "text-body-1" }, " Estos t\xE9rminos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier controversia ser\xE1 resuelta ante los tribunales competentes de la Ciudad de M\xE9xico. ")
                                            ]),
                                            createVNode("div", { class: "term-container" }, [
                                              createVNode("h3", { class: "text-subtitle-1" }, " Uso de Servicios de Registro y Verificaci\xF3n "),
                                              createVNode("p", { class: "text-body-1" }, " Futzo integra servicios de terceros como Google, Facebook y WhatsApp para el registro, autenticaci\xF3n y verificaci\xF3n de usuarios. Al utilizar estos servicios, el Usuario acepta las siguientes condiciones: "),
                                              createVNode("p", { class: "text-body-1" }, " Registro y Autenticaci\xF3n con Google y Facebook: "),
                                              createVNode("ul", { class: "term-list" }, [
                                                createVNode("li", { class: "term-list-item" }, "El Usuario debe autorizar a Futzo para acceder a los datos m\xEDnimos requeridos para completar el proceso de registro (nombre, correo electr\xF3nico, etc.). "),
                                                createVNode("li", { class: "term-list-item" }, "Futzo no ser\xE1 responsable por problemas relacionados con las cuentas de Google o Facebook (por ejemplo, p\xE9rdida de acceso a estas cuentas). ")
                                              ]),
                                              createVNode("p", { class: "text-body-1" }, " Verificaci\xF3n mediante WhatsApp OTP: "),
                                              createVNode("ul", { class: "term-list" }, [
                                                createVNode("li", { class: "term-list-item" }, "El Usuario debe proporcionar un n\xFAmero telef\xF3nico v\xE1lido para completar el proceso de verificaci\xF3n."),
                                                createVNode("li", { class: "term-list-item" }, "Es responsabilidad del Usuario proteger el c\xF3digo de verificaci\xF3n y no compartirlo con terceros."),
                                                createVNode("li", { class: "term-list-item" }, "El incumplimiento de esta regla puede resultar en la suspensi\xF3n de la cuenta.")
                                              ]),
                                              createVNode("p", { class: "text-body-1" }, " Responsabilidad del Usuario: "),
                                              createVNode("ul", { class: "term-list" }, [
                                                createVNode("li", { class: "term-list-item" }, "El Usuario debe garantizar que la informaci\xF3n proporcionada durante el registro sea ver\xEDdica y actualizada."),
                                                createVNode("li", { class: "term-list-item" }, "Futzo no ser\xE1 responsable por el uso indebido de los servicios de terceros, como la transmisi\xF3n incorrecta de c\xF3digos OTP o problemas t\xE9cnicos ajenos a la plataforma. ")
                                              ]),
                                              createVNode("p", { class: "text-body-1" }, " Pol\xEDticas de Terceros: "),
                                              createVNode("p", { class: "text-body-1" }, " Al utilizar Google, Facebook o WhatsApp como parte del proceso, el Usuario est\xE1 sujeto a las pol\xEDticas de privacidad de estas plataformas, adem\xE1s de las pol\xEDticas de Futzo. ")
                                            ]),
                                            createVNode("div", { class: "term-container" }, [
                                              createVNode("h3", { class: "text-subtitle-1" }, "Contacto"),
                                              createVNode("p", { class: "text-body-1" }, " Para consultas relacionadas con los T\xE9rminos y Condiciones, por favor, cont\xE1ctanos a trav\xE9s de: "),
                                              createVNode("p", { class: "text-body-1" }, [
                                                createTextVNode(" Correo electr\xF3nico: "),
                                                createVNode("a", {
                                                  class: "font-weight-medium text-secondary",
                                                  href: "mailto:soporte@futzo.io"
                                                }, "soporte@futzo.io")
                                              ])
                                            ]),
                                            createVNode("div", { class: "term-container" }, [
                                              createVNode("h3", { class: "text-subtitle-1" }, "Definiciones"),
                                              createVNode("ul", { class: "term-list" }, [
                                                createVNode("li", { class: "term-list-item" }, " Usuario: Persona que accede al Servicio, ya sea como administrador de liga, equipo, jugador, \xE1rbitro o cualquier otro rol. "),
                                                createVNode("li", { class: "term-list-item" }, " Liga: Conjunto organizado de equipos y torneos registrados en la plataforma. "),
                                                createVNode("li", { class: "term-list-item" }, " Torneo: Competencia dentro de una liga, administrada a trav\xE9s del Servicio. "),
                                                createVNode("li", { class: "term-list-item" }, " Contenido: Datos ingresados por los usuarios, incluyendo informaci\xF3n de equipos, jugadores y partidos. "),
                                                createVNode("li", { class: "term-list-item" }, " Administrador: Usuario con permisos para gestionar la liga y sus actividades. "),
                                                createVNode("li", { class: "term-list-item" }, " Jugador: Usuario registrado en la plataforma como miembro de un equipo. "),
                                                createVNode("li", { class: "term-list-item" }, " Equipo: Grupo de jugadores registrados en la plataforma. "),
                                                createVNode("li", { class: "term-list-item" }, " Partido: Encuentro entre dos equipos, programado y registrado en la plataforma. "),
                                                createVNode("li", { class: "term-list-item" }, " Servicio: Plataforma Futzo y sus funcionalidades. ")
                                              ])
                                            ]),
                                            createVNode("div", { class: "term-container" }, [
                                              createVNode("h3", { class: "text-subtitle-1" }, "Uso del Servicio"),
                                              createVNode("p", { class: "text-body-1" }, " Acceso y Registro"),
                                              createVNode("p", { class: "term-list-item" }, " Los usuarios deben proporcionar informaci\xF3n precisa y completa al registrarse. El incumplimiento puede resultar en la suspensi\xF3n de la cuenta. "),
                                              createVNode("p", { class: "text-body-1" }, " Roles y Permisos"),
                                              createVNode("p", { class: "term-list-item" }, " Cada usuario tendr\xE1 permisos espec\xEDficos seg\xFAn su rol asignado (por ejemplo, administrador de liga, jugador). "),
                                              createVNode("p", { class: "text-body-1" }, " Restricciones"),
                                              createVNode("p", { class: "text-body-1" }, "Queda prohibido:"),
                                              createVNode("ul", { class: "term-list" }, [
                                                createVNode("li", { class: "term-list-item" }, " Utilizar la plataforma para actividades il\xEDcitas o fraudulentas. "),
                                                createVNode("li", { class: "term-list-item" }, " Intentar acceder, alterar o destruir datos de otros usuarios sin autorizaci\xF3n. "),
                                                createVNode("li", { class: "term-list-item" }, " Publicar contenido ofensivo, discriminatorio o inapropiado. "),
                                                createVNode("li", { class: "term-list-item" }, " Compartir credenciales de acceso con terceros. "),
                                                createVNode("li", { class: "term-list-item" }, " Utilizar la plataforma para enviar spam o correos no deseados. "),
                                                createVNode("li", { class: "term-list-item" }, " Violaci\xF3n de derechos de autor o propiedad intelectual. "),
                                                createVNode("li", { class: "term-list-item" }, " Realizar ingenier\xEDa inversa, descompilaci\xF3n o desensamblaje del Servicio. "),
                                                createVNode("li", { class: "term-list-item" }, " Utilizar bots, scripts o cualquier otro m\xE9todo automatizado para acceder al Servicio. "),
                                                createVNode("li", { class: "term-list-item" }, " Utilizar la plataforma para actividades que puedan afectar su rendimiento o estabilidad. "),
                                                createVNode("li", { class: "term-list-item" }, " Compartir informaci\xF3n personal de otros usuarios sin su consentimiento. ")
                                              ]),
                                              createVNode("p", { class: "text-body-1" }, " Actualizaciones y Mantenimiento "),
                                              createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de realizar actualizaciones y mantenimiento en el Servicio sin previo aviso. Los usuarios ser\xE1n notificados de cualquier interrupci\xF3n programada. "),
                                              createVNode("p", { class: "text-body-1" }, " Suspensi\xF3n y Cancelaci\xF3n "),
                                              createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de suspender o cancelar cuentas que infrinjan los t\xE9rminos de uso. Los usuarios pueden solicitar la eliminaci\xF3n de su cuenta en cualquier momento. "),
                                              createVNode("p", { class: "text-body-1" }, " Responsabilidad del Usuario "),
                                              createVNode("p", { class: "text-body-1" }, " Los usuarios son responsables de mantener la confidencialidad de sus credenciales de acceso y de cualquier actividad realizada en su cuenta "),
                                              createVNode("p", { class: "text-body-1" }, " Soporte T\xE9cnico"),
                                              createVNode("p", { class: "text-body-1" }, " Futzo proporcionar\xE1 soporte t\xE9cnico a los usuarios para resolver problemas relacionados con el Servicio. "),
                                              createVNode("p", { class: "text-body-1" }, " Comunicaci\xF3n"),
                                              createVNode("p", { class: "text-body-1" }, " Los usuarios aceptan recibir comunicaciones de Futzo, incluyendo correos electr\xF3nicos, notificaciones y mensajes en la plataforma. "),
                                              createVNode("p", { class: "text-body-1" }, " Modificaciones"),
                                              createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de modificar estos t\xE9rminos en cualquier momento. Los usuarios ser\xE1n notificados de los cambios y deber\xE1n aceptarlos para continuar utilizando el Servicio. ")
                                            ]),
                                            createVNode("div", { class: "term-container" }, [
                                              createVNode("h3", { class: "text-subtitle-1" }, " Contenido Generado por el Usuario "),
                                              createVNode("p", { class: "text-body-1" }, " Los usuarios son responsables del contenido que ingresen en la plataforma. Futzo no asume responsabilidad por errores o inexactitudes en los datos proporcionados por los usuarios. "),
                                              createVNode("p", { class: "text-body-1" }, " Propiedad del Contenido "),
                                              createVNode("p", { class: "text-body-1" }, " Los usuarios conservan la propiedad de los datos ingresados en la plataforma. Futzo no reclama derechos de propiedad sobre el contenido generado por los usuarios "),
                                              createVNode("p", { class: "text-body-1" }, " Licencia de Uso"),
                                              createVNode("p", { class: "text-body-1" }, " Al ingresar contenido en la plataforma, los usuarios otorgan a Futzo una licencia no exclusiva para utilizar, modificar y distribuir dicho contenido en el Servicio. "),
                                              createVNode("p", { class: "text-body-1" }, " Eliminaci\xF3n de Contenido "),
                                              createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de eliminar contenido que infrinja los t\xE9rminos de uso o que sea considerado inapropiado. "),
                                              createVNode("p", { class: "text-body-1" }, " Respaldo de Datos"),
                                              createVNode("p", { class: "text-body-1" }, " Los usuarios son responsables de realizar copias de seguridad de su contenido en caso de p\xE9rdida o eliminaci\xF3n accidental. "),
                                              createVNode("p", { class: "text-body-1" }, " Publicidad y Promoci\xF3n "),
                                              createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de utilizar el contenido generado por los usuarios con fines publicitarios y promocionales. "),
                                              createVNode("p", { class: "text-body-1" }, " Protecci\xF3n de Datos "),
                                              createVNode("p", { class: "text-body-1" }, " Futzo implementar\xE1 medidas de seguridad para proteger la privacidad y confidencialidad de los datos de los usuarios. "),
                                              createVNode("p", { class: "text-body-1" }, " Acceso a Datos"),
                                              createVNode("p", { class: "text-body-1" }, " Los usuarios pueden acceder, modificar o eliminar su contenido en cualquier momento a trav\xE9s de la plataforma. "),
                                              createVNode("p", { class: "text-body-1" }, " Retenci\xF3n de Datos"),
                                              createVNode("p", { class: "text-body-1" }, " Futzo retendr\xE1 los datos de los usuarios durante el tiempo necesario para cumplir con sus obligaciones legales y contractuales. ")
                                            ]),
                                            createVNode("div", { class: "term-container" }, [
                                              createVNode("h3", { class: "text-subtitle-1" }, "Propiedad Intelectual"),
                                              createVNode("p", { class: "text-body-1" }, " Todos los derechos relacionados con el dise\xF1o, c\xF3digo fuente, funcionalidad y marca de Futzo pertenecen exclusivamente a futzo.io. Se proh\xEDbe la reproducci\xF3n, distribuci\xF3n o modificaci\xF3n del Servicio sin autorizaci\xF3n previa. "),
                                              createVNode("p", { class: "text-body-1" }, " Marcas Registradas"),
                                              createVNode("p", { class: "text-body-1" }, " Futzo es una marca registrada de futzo.io. Se proh\xEDbe el uso no autorizado de la marca en cualquier contexto. "),
                                              createVNode("p", { class: "text-body-1" }, " Derechos de Autor"),
                                              createVNode("p", { class: "text-body-1" }, " Todos los contenidos publicados en la plataforma est\xE1n protegidos por derechos de autor. Se proh\xEDbe la reproducci\xF3n o distribuci\xF3n sin autorizaci\xF3n. "),
                                              createVNode("p", { class: "text-body-1" }, " Licencia de Uso"),
                                              createVNode("p", { class: "text-body-1" }, " Los usuarios reciben una licencia limitada para utilizar el Servicio de acuerdo con los t\xE9rminos establecidos en este documento. "),
                                              createVNode("p", { class: "text-body-1" }, " Contenido de Terceros "),
                                              createVNode("p", { class: "text-body-1" }, " Futzo puede incluir contenido de terceros en la plataforma, sujeto a los t\xE9rminos y condiciones de uso de los proveedores. "),
                                              createVNode("p", { class: "text-body-1" }, " Notificaci\xF3n de Infracci\xF3n "),
                                              createVNode("p", { class: "text-body-1" }, " Si un usuario considera que su propiedad intelectual ha sido infringida en la plataforma, debe notificar a Futzo para tomar las medidas correspondientes. "),
                                              createVNode("p", { class: "text-body-1" }, " Protecci\xF3n de Datos "),
                                              createVNode("p", { class: "text-body-1" }, " Futzo implementar\xE1 medidas de seguridad para proteger la privacidad y confidencialidad de los datos de los usuarios. ")
                                            ])
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VEmptyState, {
                            headline: "T\xE9rminos de servicio",
                            title: "\xDAltima actualizaci\xF3n: 01-Ene-2025"
                          }, {
                            media: withCtx(() => [
                              createVNode(_component_Icon, {
                                onClick: ($event) => _ctx.$router.push({ name: "index" }),
                                class: "cursor-pointer",
                                name: "futzo-icon:futzo-horizontal",
                                size: "100"
                              }, null, 8, ["onClick"])
                            ]),
                            default: withCtx(() => [
                              createVNode(VContainer, null, {
                                default: withCtx(() => [
                                  createVNode(VRow, null, {
                                    default: withCtx(() => [
                                      createVNode(VCol, { cols: "12" }, {
                                        default: withCtx(() => [
                                          createVNode("p", { class: "text-body-1" }, " Bienvenido a Futzo, un sistema de gesti\xF3n dise\xF1ado para facilitar la administraci\xF3n de ligas deportivas y sus respectivas actividades. Al utilizar la plataforma Futzo (en adelante, \u201Cel Servicio\u201D), usted acepta cumplir con los t\xE9rminos descritos en este documento. Si no est\xE1 de acuerdo con estos t\xE9rminos, debe abstenerse de utilizar el Servicio. "),
                                          createVNode("div", { class: "term-container" }, [
                                            createVNode("h3", { class: "text-subtitle-1" }, "Cumplimiento Legal"),
                                            createVNode("p", { class: "text-body-1" }, " Ley Federal de Protecci\xF3n de Datos Personales en Posesi\xF3n de los Particulares (LFPDPPP) "),
                                            createVNode("p", { class: "text-body-1" }, " Futzo cumple con la LFPDPPP, otorgando a los usuarios derechos ARCO (Acceso, Rectificaci\xF3n, Cancelaci\xF3n y Oposici\xF3n) sobre sus datos personales. "),
                                            createVNode("p", { class: "text-body-1" }, " Reglamento General de Protecci\xF3n de Datos (GDPR) "),
                                            createVNode("p", { class: "text-body-1" }, " Si los usuarios residen en la Uni\xF3n Europea, Futzo garantiza los derechos previstos en el GDPR, incluyendo: "),
                                            createVNode("ul", { class: "term-list" }, [
                                              createVNode("li", { class: "term-list-item" }, " Derecho al Olvido: Solicitar la eliminaci\xF3n de su informaci\xF3n personal. "),
                                              createVNode("li", { class: "term-list-item" }, " Portabilidad de Datos: Transferir sus datos a otro proveedor si lo desean. ")
                                            ]),
                                            createVNode("p", { class: "text-body-1" }, " Consentimiento para el Tratamiento de Datos "),
                                            createVNode("p", { class: "text-body-1" }, " Al registrarse, los usuarios otorgan su consentimiento expl\xEDcito para el manejo de su informaci\xF3n personal conforme a nuestra Pol\xEDtica de Privacidad. "),
                                            createVNode("p", { class: "text-body-1" }, [
                                              createTextVNode(" Su privacidad es importante para nosotros. Consulte nuestra "),
                                              createVNode("a", {
                                                href: "javascript:void(0)",
                                                onClick: ($event) => _ctx.$router.push({ name: "politica-de-privacidad" }),
                                                class: "font-weight-medium text-secondary"
                                              }, "Pol\xEDtica de Privacidad", 8, ["onClick"]),
                                              createTextVNode(" para comprender c\xF3mo recopilamos, utilizamos y protegemos sus datos personales. ")
                                            ])
                                          ]),
                                          createVNode("div", { class: "term-container" }, [
                                            createVNode("h3", { class: "text-subtitle-1" }, " Responsabilidad y Limitaci\xF3n "),
                                            createVNode("p", { class: "text-body-1" }, " Exclusi\xF3n de Garant\xEDas "),
                                            createVNode("p", { class: "text-body-1" }, ' Futzo se proporciona "tal cual" y "seg\xFAn disponibilidad". Futzo no garantiza: '),
                                            createVNode("ul", { class: "term-list" }, [
                                              createVNode("li", { class: "term-list-item" }, " La disponibilidad continua del servicio. "),
                                              createVNode("li", { class: "term-list-item" }, " La ausencia de errores en la plataforma. "),
                                              createVNode("li", { class: "term-list-item" }, " Que la plataforma satisfaga las expectativas particulares de los usuarios. ")
                                            ]),
                                            createVNode("p", { class: "text-body-1" }, " Limitaci\xF3n de Responsabilidad "),
                                            createVNode("p", { class: "text-body-1" }, "Futzo no ser\xE1 responsable por:"),
                                            createVNode("ul", { class: "term-list" }, [
                                              createVNode("li", { class: "term-list-item" }, " Da\xF1os indirectos, incidentales o consecuentes. "),
                                              createVNode("li", { class: "term-list-item" }, " P\xE9rdidas financieras derivadas del uso del servicio. "),
                                              createVNode("li", { class: "term-list-item" }, " Contenido generado por los usuarios que infrinja derechos de terceros. ")
                                            ]),
                                            createVNode("p", { class: "text-body-1" }, "Indemnizaci\xF3n"),
                                            createVNode("p", { class: "text-body-1" }, " Los usuarios acuerdan indemnizar y liberar de responsabilidad a Futzo por cualquier reclamaci\xF3n, da\xF1o o p\xE9rdida causada por: "),
                                            createVNode("ul", { class: "term-list" }, [
                                              createVNode("li", { class: "term-list-item" }, "Uso indebido del servicio."),
                                              createVNode("li", { class: "term-list-item" }, " Incumplimiento de estos t\xE9rminos por parte del usuario. ")
                                            ])
                                          ]),
                                          createVNode("div", { class: "term-container" }, [
                                            createVNode("h3", { class: "text-subtitle-1" }, "Propiedad Intelectual"),
                                            createVNode("p", { class: "text-body-1" }, " Derechos de Autor y Marcas Registradas "),
                                            createVNode("p", { class: "text-body-1" }, " Todos los derechos sobre el dise\xF1o, c\xF3digo fuente, logotipos y otros elementos de Futzo son propiedad exclusiva de Futzo.io. "),
                                            createVNode("p", { class: "text-body-1" }, " Contenido Generado por Usuarios "),
                                            createVNode("p", { class: "text-body-1" }, " Los usuarios conservan la propiedad de los datos ingresados en la plataforma. Sin embargo, otorgan a Futzo una licencia no exclusiva para utilizar dichos datos en la operaci\xF3n del servicio. "),
                                            createVNode("p", { class: "text-body-1" }, " Protecci\xF3n del Sistema: Queda prohibido: "),
                                            createVNode("ul", { class: "term-list" }, [
                                              createVNode("li", { class: "term-list-item" }, " Intentar descompilar, realizar ingenier\xEDa inversa o copiar partes del software. "),
                                              createVNode("li", { class: "term-list-item" }, " Utilizar elementos de la marca Futzo sin autorizaci\xF3n. ")
                                            ])
                                          ]),
                                          createVNode("div", { class: "term-container" }, [
                                            createVNode("h3", { class: "text-subtitle-1" }, "Conducta del Usuario"),
                                            createVNode("p", { class: "text-body-1" }, " Restricciones Generales: "),
                                            createVNode("ul", { class: "term-list" }, [
                                              createVNode("li", { class: "term-list-item" }, " Publicar contenido ofensivo, discriminatorio o ilegal. "),
                                              createVNode("li", { class: "term-list-item" }, " Usar scripts automatizados, bots o herramientas similares. "),
                                              createVNode("li", { class: "term-list-item" }, " Compartir informaci\xF3n personal de terceros sin consentimiento. ")
                                            ]),
                                            createVNode("p", { class: "text-body-1" }, " Uso \xC9tico:"),
                                            createVNode("p", { class: "text-body-1" }, " Los usuarios se comprometen a actuar de buena fe y a no realizar actividades que perjudiquen la reputaci\xF3n de Futzo. ")
                                          ]),
                                          createVNode("div", { class: "term-container" }, [
                                            createVNode("h3", { class: "text-subtitle-1" }, "Pagos y Tarifas"),
                                            createVNode("p", { class: "text-body-1" }, " M\xE9todos de Pago y Facturaci\xF3n: "),
                                            createVNode("p", { class: "text-body-1" }, " Los usuarios pueden realizar pagos a trav\xE9s de los m\xE9todos habilitados, incluyendo tarjetas de cr\xE9dito/d\xE9bito y transferencias bancarias. "),
                                            createVNode("p", { class: "text-body-1" }, " Pol\xEDtica de Reembolsos: "),
                                            createVNode("p", { class: "text-body-1" }, " Los reembolsos estar\xE1n sujetos a evaluaci\xF3n, y solo se otorgar\xE1n en casos excepcionales, como: "),
                                            createVNode("ul", { class: "term-list" }, [
                                              createVNode("li", { class: "term-list-item" }, " Errores en el sistema de facturaci\xF3n. "),
                                              createVNode("li", { class: "term-list-item" }, " Cancelaciones antes de iniciar el servicio contratado. ")
                                            ]),
                                            createVNode("p", { class: "text-body-1" }, " Impuestos:"),
                                            createVNode("p", { class: "text-body-1" }, " El usuario es responsable de pagar los impuestos aplicables seg\xFAn las leyes locales. ")
                                          ]),
                                          createVNode("div", { class: "term-container" }, [
                                            createVNode("h3", { class: "text-subtitle-1" }, " Flexibilidad y Actualizaci\xF3n "),
                                            createVNode("p", { class: "text-body-1" }, " Modificaciones a los T\xE9rminos: "),
                                            createVNode("p", { class: "text-body-1" }, " Futzo puede modificar estos t\xE9rminos en cualquier momento para reflejar cambios legales, regulatorios o de mercado. Los usuarios ser\xE1n notificados con al menos 15 d\xEDas de antelaci\xF3n. "),
                                            createVNode("p", { class: "text-body-1" }, " Aceptaci\xF3n de Cambios: "),
                                            createVNode("p", { class: "text-body-1" }, " El uso continuado del servicio tras la notificaci\xF3n de cambios implica la aceptaci\xF3n de los nuevos t\xE9rminos. ")
                                          ]),
                                          createVNode("div", { class: "term-container" }, [
                                            createVNode("h3", { class: "text-subtitle-1" }, " Seguridad y Protecci\xF3n de Datos "),
                                            createVNode("p", { class: "text-body-1" }, " Medidas de Seguridad: "),
                                            createVNode("p", { class: "text-body-1" }, " Futzo implementa protocolos de seguridad, como: "),
                                            createVNode("ul", { class: "term-list" }, [
                                              createVNode("li", { class: "term-list-item" }, "Cifrado de datos sensibles."),
                                              createVNode("li", { class: "term-list-item" }, "Autenticaci\xF3n de dos factores."),
                                              createVNode("li", { class: "term-list-item" }, " Auditor\xEDas peri\xF3dicas del sistema. ")
                                            ]),
                                            createVNode("p", { class: "text-body-1" }, " Notificaci\xF3n de Brechas de Seguridad: "),
                                            createVNode("p", { class: "text-body-1" }, " En caso de una brecha de seguridad, Futzo notificar\xE1 a los usuarios afectados dentro de las 72 horas siguientes, conforme a las regulaciones aplicables. ")
                                          ]),
                                          createVNode("div", { class: "term-container" }, [
                                            createVNode("h3", { class: "text-subtitle-1" }, " Jurisdicci\xF3n y Ley Aplicable "),
                                            createVNode("p", { class: "text-body-1" }, " Estos t\xE9rminos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier controversia ser\xE1 resuelta ante los tribunales competentes de la Ciudad de M\xE9xico. ")
                                          ]),
                                          createVNode("div", { class: "term-container" }, [
                                            createVNode("h3", { class: "text-subtitle-1" }, " Uso de Servicios de Registro y Verificaci\xF3n "),
                                            createVNode("p", { class: "text-body-1" }, " Futzo integra servicios de terceros como Google, Facebook y WhatsApp para el registro, autenticaci\xF3n y verificaci\xF3n de usuarios. Al utilizar estos servicios, el Usuario acepta las siguientes condiciones: "),
                                            createVNode("p", { class: "text-body-1" }, " Registro y Autenticaci\xF3n con Google y Facebook: "),
                                            createVNode("ul", { class: "term-list" }, [
                                              createVNode("li", { class: "term-list-item" }, "El Usuario debe autorizar a Futzo para acceder a los datos m\xEDnimos requeridos para completar el proceso de registro (nombre, correo electr\xF3nico, etc.). "),
                                              createVNode("li", { class: "term-list-item" }, "Futzo no ser\xE1 responsable por problemas relacionados con las cuentas de Google o Facebook (por ejemplo, p\xE9rdida de acceso a estas cuentas). ")
                                            ]),
                                            createVNode("p", { class: "text-body-1" }, " Verificaci\xF3n mediante WhatsApp OTP: "),
                                            createVNode("ul", { class: "term-list" }, [
                                              createVNode("li", { class: "term-list-item" }, "El Usuario debe proporcionar un n\xFAmero telef\xF3nico v\xE1lido para completar el proceso de verificaci\xF3n."),
                                              createVNode("li", { class: "term-list-item" }, "Es responsabilidad del Usuario proteger el c\xF3digo de verificaci\xF3n y no compartirlo con terceros."),
                                              createVNode("li", { class: "term-list-item" }, "El incumplimiento de esta regla puede resultar en la suspensi\xF3n de la cuenta.")
                                            ]),
                                            createVNode("p", { class: "text-body-1" }, " Responsabilidad del Usuario: "),
                                            createVNode("ul", { class: "term-list" }, [
                                              createVNode("li", { class: "term-list-item" }, "El Usuario debe garantizar que la informaci\xF3n proporcionada durante el registro sea ver\xEDdica y actualizada."),
                                              createVNode("li", { class: "term-list-item" }, "Futzo no ser\xE1 responsable por el uso indebido de los servicios de terceros, como la transmisi\xF3n incorrecta de c\xF3digos OTP o problemas t\xE9cnicos ajenos a la plataforma. ")
                                            ]),
                                            createVNode("p", { class: "text-body-1" }, " Pol\xEDticas de Terceros: "),
                                            createVNode("p", { class: "text-body-1" }, " Al utilizar Google, Facebook o WhatsApp como parte del proceso, el Usuario est\xE1 sujeto a las pol\xEDticas de privacidad de estas plataformas, adem\xE1s de las pol\xEDticas de Futzo. ")
                                          ]),
                                          createVNode("div", { class: "term-container" }, [
                                            createVNode("h3", { class: "text-subtitle-1" }, "Contacto"),
                                            createVNode("p", { class: "text-body-1" }, " Para consultas relacionadas con los T\xE9rminos y Condiciones, por favor, cont\xE1ctanos a trav\xE9s de: "),
                                            createVNode("p", { class: "text-body-1" }, [
                                              createTextVNode(" Correo electr\xF3nico: "),
                                              createVNode("a", {
                                                class: "font-weight-medium text-secondary",
                                                href: "mailto:soporte@futzo.io"
                                              }, "soporte@futzo.io")
                                            ])
                                          ]),
                                          createVNode("div", { class: "term-container" }, [
                                            createVNode("h3", { class: "text-subtitle-1" }, "Definiciones"),
                                            createVNode("ul", { class: "term-list" }, [
                                              createVNode("li", { class: "term-list-item" }, " Usuario: Persona que accede al Servicio, ya sea como administrador de liga, equipo, jugador, \xE1rbitro o cualquier otro rol. "),
                                              createVNode("li", { class: "term-list-item" }, " Liga: Conjunto organizado de equipos y torneos registrados en la plataforma. "),
                                              createVNode("li", { class: "term-list-item" }, " Torneo: Competencia dentro de una liga, administrada a trav\xE9s del Servicio. "),
                                              createVNode("li", { class: "term-list-item" }, " Contenido: Datos ingresados por los usuarios, incluyendo informaci\xF3n de equipos, jugadores y partidos. "),
                                              createVNode("li", { class: "term-list-item" }, " Administrador: Usuario con permisos para gestionar la liga y sus actividades. "),
                                              createVNode("li", { class: "term-list-item" }, " Jugador: Usuario registrado en la plataforma como miembro de un equipo. "),
                                              createVNode("li", { class: "term-list-item" }, " Equipo: Grupo de jugadores registrados en la plataforma. "),
                                              createVNode("li", { class: "term-list-item" }, " Partido: Encuentro entre dos equipos, programado y registrado en la plataforma. "),
                                              createVNode("li", { class: "term-list-item" }, " Servicio: Plataforma Futzo y sus funcionalidades. ")
                                            ])
                                          ]),
                                          createVNode("div", { class: "term-container" }, [
                                            createVNode("h3", { class: "text-subtitle-1" }, "Uso del Servicio"),
                                            createVNode("p", { class: "text-body-1" }, " Acceso y Registro"),
                                            createVNode("p", { class: "term-list-item" }, " Los usuarios deben proporcionar informaci\xF3n precisa y completa al registrarse. El incumplimiento puede resultar en la suspensi\xF3n de la cuenta. "),
                                            createVNode("p", { class: "text-body-1" }, " Roles y Permisos"),
                                            createVNode("p", { class: "term-list-item" }, " Cada usuario tendr\xE1 permisos espec\xEDficos seg\xFAn su rol asignado (por ejemplo, administrador de liga, jugador). "),
                                            createVNode("p", { class: "text-body-1" }, " Restricciones"),
                                            createVNode("p", { class: "text-body-1" }, "Queda prohibido:"),
                                            createVNode("ul", { class: "term-list" }, [
                                              createVNode("li", { class: "term-list-item" }, " Utilizar la plataforma para actividades il\xEDcitas o fraudulentas. "),
                                              createVNode("li", { class: "term-list-item" }, " Intentar acceder, alterar o destruir datos de otros usuarios sin autorizaci\xF3n. "),
                                              createVNode("li", { class: "term-list-item" }, " Publicar contenido ofensivo, discriminatorio o inapropiado. "),
                                              createVNode("li", { class: "term-list-item" }, " Compartir credenciales de acceso con terceros. "),
                                              createVNode("li", { class: "term-list-item" }, " Utilizar la plataforma para enviar spam o correos no deseados. "),
                                              createVNode("li", { class: "term-list-item" }, " Violaci\xF3n de derechos de autor o propiedad intelectual. "),
                                              createVNode("li", { class: "term-list-item" }, " Realizar ingenier\xEDa inversa, descompilaci\xF3n o desensamblaje del Servicio. "),
                                              createVNode("li", { class: "term-list-item" }, " Utilizar bots, scripts o cualquier otro m\xE9todo automatizado para acceder al Servicio. "),
                                              createVNode("li", { class: "term-list-item" }, " Utilizar la plataforma para actividades que puedan afectar su rendimiento o estabilidad. "),
                                              createVNode("li", { class: "term-list-item" }, " Compartir informaci\xF3n personal de otros usuarios sin su consentimiento. ")
                                            ]),
                                            createVNode("p", { class: "text-body-1" }, " Actualizaciones y Mantenimiento "),
                                            createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de realizar actualizaciones y mantenimiento en el Servicio sin previo aviso. Los usuarios ser\xE1n notificados de cualquier interrupci\xF3n programada. "),
                                            createVNode("p", { class: "text-body-1" }, " Suspensi\xF3n y Cancelaci\xF3n "),
                                            createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de suspender o cancelar cuentas que infrinjan los t\xE9rminos de uso. Los usuarios pueden solicitar la eliminaci\xF3n de su cuenta en cualquier momento. "),
                                            createVNode("p", { class: "text-body-1" }, " Responsabilidad del Usuario "),
                                            createVNode("p", { class: "text-body-1" }, " Los usuarios son responsables de mantener la confidencialidad de sus credenciales de acceso y de cualquier actividad realizada en su cuenta "),
                                            createVNode("p", { class: "text-body-1" }, " Soporte T\xE9cnico"),
                                            createVNode("p", { class: "text-body-1" }, " Futzo proporcionar\xE1 soporte t\xE9cnico a los usuarios para resolver problemas relacionados con el Servicio. "),
                                            createVNode("p", { class: "text-body-1" }, " Comunicaci\xF3n"),
                                            createVNode("p", { class: "text-body-1" }, " Los usuarios aceptan recibir comunicaciones de Futzo, incluyendo correos electr\xF3nicos, notificaciones y mensajes en la plataforma. "),
                                            createVNode("p", { class: "text-body-1" }, " Modificaciones"),
                                            createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de modificar estos t\xE9rminos en cualquier momento. Los usuarios ser\xE1n notificados de los cambios y deber\xE1n aceptarlos para continuar utilizando el Servicio. ")
                                          ]),
                                          createVNode("div", { class: "term-container" }, [
                                            createVNode("h3", { class: "text-subtitle-1" }, " Contenido Generado por el Usuario "),
                                            createVNode("p", { class: "text-body-1" }, " Los usuarios son responsables del contenido que ingresen en la plataforma. Futzo no asume responsabilidad por errores o inexactitudes en los datos proporcionados por los usuarios. "),
                                            createVNode("p", { class: "text-body-1" }, " Propiedad del Contenido "),
                                            createVNode("p", { class: "text-body-1" }, " Los usuarios conservan la propiedad de los datos ingresados en la plataforma. Futzo no reclama derechos de propiedad sobre el contenido generado por los usuarios "),
                                            createVNode("p", { class: "text-body-1" }, " Licencia de Uso"),
                                            createVNode("p", { class: "text-body-1" }, " Al ingresar contenido en la plataforma, los usuarios otorgan a Futzo una licencia no exclusiva para utilizar, modificar y distribuir dicho contenido en el Servicio. "),
                                            createVNode("p", { class: "text-body-1" }, " Eliminaci\xF3n de Contenido "),
                                            createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de eliminar contenido que infrinja los t\xE9rminos de uso o que sea considerado inapropiado. "),
                                            createVNode("p", { class: "text-body-1" }, " Respaldo de Datos"),
                                            createVNode("p", { class: "text-body-1" }, " Los usuarios son responsables de realizar copias de seguridad de su contenido en caso de p\xE9rdida o eliminaci\xF3n accidental. "),
                                            createVNode("p", { class: "text-body-1" }, " Publicidad y Promoci\xF3n "),
                                            createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de utilizar el contenido generado por los usuarios con fines publicitarios y promocionales. "),
                                            createVNode("p", { class: "text-body-1" }, " Protecci\xF3n de Datos "),
                                            createVNode("p", { class: "text-body-1" }, " Futzo implementar\xE1 medidas de seguridad para proteger la privacidad y confidencialidad de los datos de los usuarios. "),
                                            createVNode("p", { class: "text-body-1" }, " Acceso a Datos"),
                                            createVNode("p", { class: "text-body-1" }, " Los usuarios pueden acceder, modificar o eliminar su contenido en cualquier momento a trav\xE9s de la plataforma. "),
                                            createVNode("p", { class: "text-body-1" }, " Retenci\xF3n de Datos"),
                                            createVNode("p", { class: "text-body-1" }, " Futzo retendr\xE1 los datos de los usuarios durante el tiempo necesario para cumplir con sus obligaciones legales y contractuales. ")
                                          ]),
                                          createVNode("div", { class: "term-container" }, [
                                            createVNode("h3", { class: "text-subtitle-1" }, "Propiedad Intelectual"),
                                            createVNode("p", { class: "text-body-1" }, " Todos los derechos relacionados con el dise\xF1o, c\xF3digo fuente, funcionalidad y marca de Futzo pertenecen exclusivamente a futzo.io. Se proh\xEDbe la reproducci\xF3n, distribuci\xF3n o modificaci\xF3n del Servicio sin autorizaci\xF3n previa. "),
                                            createVNode("p", { class: "text-body-1" }, " Marcas Registradas"),
                                            createVNode("p", { class: "text-body-1" }, " Futzo es una marca registrada de futzo.io. Se proh\xEDbe el uso no autorizado de la marca en cualquier contexto. "),
                                            createVNode("p", { class: "text-body-1" }, " Derechos de Autor"),
                                            createVNode("p", { class: "text-body-1" }, " Todos los contenidos publicados en la plataforma est\xE1n protegidos por derechos de autor. Se proh\xEDbe la reproducci\xF3n o distribuci\xF3n sin autorizaci\xF3n. "),
                                            createVNode("p", { class: "text-body-1" }, " Licencia de Uso"),
                                            createVNode("p", { class: "text-body-1" }, " Los usuarios reciben una licencia limitada para utilizar el Servicio de acuerdo con los t\xE9rminos establecidos en este documento. "),
                                            createVNode("p", { class: "text-body-1" }, " Contenido de Terceros "),
                                            createVNode("p", { class: "text-body-1" }, " Futzo puede incluir contenido de terceros en la plataforma, sujeto a los t\xE9rminos y condiciones de uso de los proveedores. "),
                                            createVNode("p", { class: "text-body-1" }, " Notificaci\xF3n de Infracci\xF3n "),
                                            createVNode("p", { class: "text-body-1" }, " Si un usuario considera que su propiedad intelectual ha sido infringida en la plataforma, debe notificar a Futzo para tomar las medidas correspondientes. "),
                                            createVNode("p", { class: "text-body-1" }, " Protecci\xF3n de Datos "),
                                            createVNode("p", { class: "text-body-1" }, " Futzo implementar\xE1 medidas de seguridad para proteger la privacidad y confidencialidad de los datos de los usuarios. ")
                                          ])
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, { cols: "12" }, {
                      default: withCtx(() => [
                        createVNode(VEmptyState, {
                          headline: "T\xE9rminos de servicio",
                          title: "\xDAltima actualizaci\xF3n: 01-Ene-2025"
                        }, {
                          media: withCtx(() => [
                            createVNode(_component_Icon, {
                              onClick: ($event) => _ctx.$router.push({ name: "index" }),
                              class: "cursor-pointer",
                              name: "futzo-icon:futzo-horizontal",
                              size: "100"
                            }, null, 8, ["onClick"])
                          ]),
                          default: withCtx(() => [
                            createVNode(VContainer, null, {
                              default: withCtx(() => [
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, { cols: "12" }, {
                                      default: withCtx(() => [
                                        createVNode("p", { class: "text-body-1" }, " Bienvenido a Futzo, un sistema de gesti\xF3n dise\xF1ado para facilitar la administraci\xF3n de ligas deportivas y sus respectivas actividades. Al utilizar la plataforma Futzo (en adelante, \u201Cel Servicio\u201D), usted acepta cumplir con los t\xE9rminos descritos en este documento. Si no est\xE1 de acuerdo con estos t\xE9rminos, debe abstenerse de utilizar el Servicio. "),
                                        createVNode("div", { class: "term-container" }, [
                                          createVNode("h3", { class: "text-subtitle-1" }, "Cumplimiento Legal"),
                                          createVNode("p", { class: "text-body-1" }, " Ley Federal de Protecci\xF3n de Datos Personales en Posesi\xF3n de los Particulares (LFPDPPP) "),
                                          createVNode("p", { class: "text-body-1" }, " Futzo cumple con la LFPDPPP, otorgando a los usuarios derechos ARCO (Acceso, Rectificaci\xF3n, Cancelaci\xF3n y Oposici\xF3n) sobre sus datos personales. "),
                                          createVNode("p", { class: "text-body-1" }, " Reglamento General de Protecci\xF3n de Datos (GDPR) "),
                                          createVNode("p", { class: "text-body-1" }, " Si los usuarios residen en la Uni\xF3n Europea, Futzo garantiza los derechos previstos en el GDPR, incluyendo: "),
                                          createVNode("ul", { class: "term-list" }, [
                                            createVNode("li", { class: "term-list-item" }, " Derecho al Olvido: Solicitar la eliminaci\xF3n de su informaci\xF3n personal. "),
                                            createVNode("li", { class: "term-list-item" }, " Portabilidad de Datos: Transferir sus datos a otro proveedor si lo desean. ")
                                          ]),
                                          createVNode("p", { class: "text-body-1" }, " Consentimiento para el Tratamiento de Datos "),
                                          createVNode("p", { class: "text-body-1" }, " Al registrarse, los usuarios otorgan su consentimiento expl\xEDcito para el manejo de su informaci\xF3n personal conforme a nuestra Pol\xEDtica de Privacidad. "),
                                          createVNode("p", { class: "text-body-1" }, [
                                            createTextVNode(" Su privacidad es importante para nosotros. Consulte nuestra "),
                                            createVNode("a", {
                                              href: "javascript:void(0)",
                                              onClick: ($event) => _ctx.$router.push({ name: "politica-de-privacidad" }),
                                              class: "font-weight-medium text-secondary"
                                            }, "Pol\xEDtica de Privacidad", 8, ["onClick"]),
                                            createTextVNode(" para comprender c\xF3mo recopilamos, utilizamos y protegemos sus datos personales. ")
                                          ])
                                        ]),
                                        createVNode("div", { class: "term-container" }, [
                                          createVNode("h3", { class: "text-subtitle-1" }, " Responsabilidad y Limitaci\xF3n "),
                                          createVNode("p", { class: "text-body-1" }, " Exclusi\xF3n de Garant\xEDas "),
                                          createVNode("p", { class: "text-body-1" }, ' Futzo se proporciona "tal cual" y "seg\xFAn disponibilidad". Futzo no garantiza: '),
                                          createVNode("ul", { class: "term-list" }, [
                                            createVNode("li", { class: "term-list-item" }, " La disponibilidad continua del servicio. "),
                                            createVNode("li", { class: "term-list-item" }, " La ausencia de errores en la plataforma. "),
                                            createVNode("li", { class: "term-list-item" }, " Que la plataforma satisfaga las expectativas particulares de los usuarios. ")
                                          ]),
                                          createVNode("p", { class: "text-body-1" }, " Limitaci\xF3n de Responsabilidad "),
                                          createVNode("p", { class: "text-body-1" }, "Futzo no ser\xE1 responsable por:"),
                                          createVNode("ul", { class: "term-list" }, [
                                            createVNode("li", { class: "term-list-item" }, " Da\xF1os indirectos, incidentales o consecuentes. "),
                                            createVNode("li", { class: "term-list-item" }, " P\xE9rdidas financieras derivadas del uso del servicio. "),
                                            createVNode("li", { class: "term-list-item" }, " Contenido generado por los usuarios que infrinja derechos de terceros. ")
                                          ]),
                                          createVNode("p", { class: "text-body-1" }, "Indemnizaci\xF3n"),
                                          createVNode("p", { class: "text-body-1" }, " Los usuarios acuerdan indemnizar y liberar de responsabilidad a Futzo por cualquier reclamaci\xF3n, da\xF1o o p\xE9rdida causada por: "),
                                          createVNode("ul", { class: "term-list" }, [
                                            createVNode("li", { class: "term-list-item" }, "Uso indebido del servicio."),
                                            createVNode("li", { class: "term-list-item" }, " Incumplimiento de estos t\xE9rminos por parte del usuario. ")
                                          ])
                                        ]),
                                        createVNode("div", { class: "term-container" }, [
                                          createVNode("h3", { class: "text-subtitle-1" }, "Propiedad Intelectual"),
                                          createVNode("p", { class: "text-body-1" }, " Derechos de Autor y Marcas Registradas "),
                                          createVNode("p", { class: "text-body-1" }, " Todos los derechos sobre el dise\xF1o, c\xF3digo fuente, logotipos y otros elementos de Futzo son propiedad exclusiva de Futzo.io. "),
                                          createVNode("p", { class: "text-body-1" }, " Contenido Generado por Usuarios "),
                                          createVNode("p", { class: "text-body-1" }, " Los usuarios conservan la propiedad de los datos ingresados en la plataforma. Sin embargo, otorgan a Futzo una licencia no exclusiva para utilizar dichos datos en la operaci\xF3n del servicio. "),
                                          createVNode("p", { class: "text-body-1" }, " Protecci\xF3n del Sistema: Queda prohibido: "),
                                          createVNode("ul", { class: "term-list" }, [
                                            createVNode("li", { class: "term-list-item" }, " Intentar descompilar, realizar ingenier\xEDa inversa o copiar partes del software. "),
                                            createVNode("li", { class: "term-list-item" }, " Utilizar elementos de la marca Futzo sin autorizaci\xF3n. ")
                                          ])
                                        ]),
                                        createVNode("div", { class: "term-container" }, [
                                          createVNode("h3", { class: "text-subtitle-1" }, "Conducta del Usuario"),
                                          createVNode("p", { class: "text-body-1" }, " Restricciones Generales: "),
                                          createVNode("ul", { class: "term-list" }, [
                                            createVNode("li", { class: "term-list-item" }, " Publicar contenido ofensivo, discriminatorio o ilegal. "),
                                            createVNode("li", { class: "term-list-item" }, " Usar scripts automatizados, bots o herramientas similares. "),
                                            createVNode("li", { class: "term-list-item" }, " Compartir informaci\xF3n personal de terceros sin consentimiento. ")
                                          ]),
                                          createVNode("p", { class: "text-body-1" }, " Uso \xC9tico:"),
                                          createVNode("p", { class: "text-body-1" }, " Los usuarios se comprometen a actuar de buena fe y a no realizar actividades que perjudiquen la reputaci\xF3n de Futzo. ")
                                        ]),
                                        createVNode("div", { class: "term-container" }, [
                                          createVNode("h3", { class: "text-subtitle-1" }, "Pagos y Tarifas"),
                                          createVNode("p", { class: "text-body-1" }, " M\xE9todos de Pago y Facturaci\xF3n: "),
                                          createVNode("p", { class: "text-body-1" }, " Los usuarios pueden realizar pagos a trav\xE9s de los m\xE9todos habilitados, incluyendo tarjetas de cr\xE9dito/d\xE9bito y transferencias bancarias. "),
                                          createVNode("p", { class: "text-body-1" }, " Pol\xEDtica de Reembolsos: "),
                                          createVNode("p", { class: "text-body-1" }, " Los reembolsos estar\xE1n sujetos a evaluaci\xF3n, y solo se otorgar\xE1n en casos excepcionales, como: "),
                                          createVNode("ul", { class: "term-list" }, [
                                            createVNode("li", { class: "term-list-item" }, " Errores en el sistema de facturaci\xF3n. "),
                                            createVNode("li", { class: "term-list-item" }, " Cancelaciones antes de iniciar el servicio contratado. ")
                                          ]),
                                          createVNode("p", { class: "text-body-1" }, " Impuestos:"),
                                          createVNode("p", { class: "text-body-1" }, " El usuario es responsable de pagar los impuestos aplicables seg\xFAn las leyes locales. ")
                                        ]),
                                        createVNode("div", { class: "term-container" }, [
                                          createVNode("h3", { class: "text-subtitle-1" }, " Flexibilidad y Actualizaci\xF3n "),
                                          createVNode("p", { class: "text-body-1" }, " Modificaciones a los T\xE9rminos: "),
                                          createVNode("p", { class: "text-body-1" }, " Futzo puede modificar estos t\xE9rminos en cualquier momento para reflejar cambios legales, regulatorios o de mercado. Los usuarios ser\xE1n notificados con al menos 15 d\xEDas de antelaci\xF3n. "),
                                          createVNode("p", { class: "text-body-1" }, " Aceptaci\xF3n de Cambios: "),
                                          createVNode("p", { class: "text-body-1" }, " El uso continuado del servicio tras la notificaci\xF3n de cambios implica la aceptaci\xF3n de los nuevos t\xE9rminos. ")
                                        ]),
                                        createVNode("div", { class: "term-container" }, [
                                          createVNode("h3", { class: "text-subtitle-1" }, " Seguridad y Protecci\xF3n de Datos "),
                                          createVNode("p", { class: "text-body-1" }, " Medidas de Seguridad: "),
                                          createVNode("p", { class: "text-body-1" }, " Futzo implementa protocolos de seguridad, como: "),
                                          createVNode("ul", { class: "term-list" }, [
                                            createVNode("li", { class: "term-list-item" }, "Cifrado de datos sensibles."),
                                            createVNode("li", { class: "term-list-item" }, "Autenticaci\xF3n de dos factores."),
                                            createVNode("li", { class: "term-list-item" }, " Auditor\xEDas peri\xF3dicas del sistema. ")
                                          ]),
                                          createVNode("p", { class: "text-body-1" }, " Notificaci\xF3n de Brechas de Seguridad: "),
                                          createVNode("p", { class: "text-body-1" }, " En caso de una brecha de seguridad, Futzo notificar\xE1 a los usuarios afectados dentro de las 72 horas siguientes, conforme a las regulaciones aplicables. ")
                                        ]),
                                        createVNode("div", { class: "term-container" }, [
                                          createVNode("h3", { class: "text-subtitle-1" }, " Jurisdicci\xF3n y Ley Aplicable "),
                                          createVNode("p", { class: "text-body-1" }, " Estos t\xE9rminos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier controversia ser\xE1 resuelta ante los tribunales competentes de la Ciudad de M\xE9xico. ")
                                        ]),
                                        createVNode("div", { class: "term-container" }, [
                                          createVNode("h3", { class: "text-subtitle-1" }, " Uso de Servicios de Registro y Verificaci\xF3n "),
                                          createVNode("p", { class: "text-body-1" }, " Futzo integra servicios de terceros como Google, Facebook y WhatsApp para el registro, autenticaci\xF3n y verificaci\xF3n de usuarios. Al utilizar estos servicios, el Usuario acepta las siguientes condiciones: "),
                                          createVNode("p", { class: "text-body-1" }, " Registro y Autenticaci\xF3n con Google y Facebook: "),
                                          createVNode("ul", { class: "term-list" }, [
                                            createVNode("li", { class: "term-list-item" }, "El Usuario debe autorizar a Futzo para acceder a los datos m\xEDnimos requeridos para completar el proceso de registro (nombre, correo electr\xF3nico, etc.). "),
                                            createVNode("li", { class: "term-list-item" }, "Futzo no ser\xE1 responsable por problemas relacionados con las cuentas de Google o Facebook (por ejemplo, p\xE9rdida de acceso a estas cuentas). ")
                                          ]),
                                          createVNode("p", { class: "text-body-1" }, " Verificaci\xF3n mediante WhatsApp OTP: "),
                                          createVNode("ul", { class: "term-list" }, [
                                            createVNode("li", { class: "term-list-item" }, "El Usuario debe proporcionar un n\xFAmero telef\xF3nico v\xE1lido para completar el proceso de verificaci\xF3n."),
                                            createVNode("li", { class: "term-list-item" }, "Es responsabilidad del Usuario proteger el c\xF3digo de verificaci\xF3n y no compartirlo con terceros."),
                                            createVNode("li", { class: "term-list-item" }, "El incumplimiento de esta regla puede resultar en la suspensi\xF3n de la cuenta.")
                                          ]),
                                          createVNode("p", { class: "text-body-1" }, " Responsabilidad del Usuario: "),
                                          createVNode("ul", { class: "term-list" }, [
                                            createVNode("li", { class: "term-list-item" }, "El Usuario debe garantizar que la informaci\xF3n proporcionada durante el registro sea ver\xEDdica y actualizada."),
                                            createVNode("li", { class: "term-list-item" }, "Futzo no ser\xE1 responsable por el uso indebido de los servicios de terceros, como la transmisi\xF3n incorrecta de c\xF3digos OTP o problemas t\xE9cnicos ajenos a la plataforma. ")
                                          ]),
                                          createVNode("p", { class: "text-body-1" }, " Pol\xEDticas de Terceros: "),
                                          createVNode("p", { class: "text-body-1" }, " Al utilizar Google, Facebook o WhatsApp como parte del proceso, el Usuario est\xE1 sujeto a las pol\xEDticas de privacidad de estas plataformas, adem\xE1s de las pol\xEDticas de Futzo. ")
                                        ]),
                                        createVNode("div", { class: "term-container" }, [
                                          createVNode("h3", { class: "text-subtitle-1" }, "Contacto"),
                                          createVNode("p", { class: "text-body-1" }, " Para consultas relacionadas con los T\xE9rminos y Condiciones, por favor, cont\xE1ctanos a trav\xE9s de: "),
                                          createVNode("p", { class: "text-body-1" }, [
                                            createTextVNode(" Correo electr\xF3nico: "),
                                            createVNode("a", {
                                              class: "font-weight-medium text-secondary",
                                              href: "mailto:soporte@futzo.io"
                                            }, "soporte@futzo.io")
                                          ])
                                        ]),
                                        createVNode("div", { class: "term-container" }, [
                                          createVNode("h3", { class: "text-subtitle-1" }, "Definiciones"),
                                          createVNode("ul", { class: "term-list" }, [
                                            createVNode("li", { class: "term-list-item" }, " Usuario: Persona que accede al Servicio, ya sea como administrador de liga, equipo, jugador, \xE1rbitro o cualquier otro rol. "),
                                            createVNode("li", { class: "term-list-item" }, " Liga: Conjunto organizado de equipos y torneos registrados en la plataforma. "),
                                            createVNode("li", { class: "term-list-item" }, " Torneo: Competencia dentro de una liga, administrada a trav\xE9s del Servicio. "),
                                            createVNode("li", { class: "term-list-item" }, " Contenido: Datos ingresados por los usuarios, incluyendo informaci\xF3n de equipos, jugadores y partidos. "),
                                            createVNode("li", { class: "term-list-item" }, " Administrador: Usuario con permisos para gestionar la liga y sus actividades. "),
                                            createVNode("li", { class: "term-list-item" }, " Jugador: Usuario registrado en la plataforma como miembro de un equipo. "),
                                            createVNode("li", { class: "term-list-item" }, " Equipo: Grupo de jugadores registrados en la plataforma. "),
                                            createVNode("li", { class: "term-list-item" }, " Partido: Encuentro entre dos equipos, programado y registrado en la plataforma. "),
                                            createVNode("li", { class: "term-list-item" }, " Servicio: Plataforma Futzo y sus funcionalidades. ")
                                          ])
                                        ]),
                                        createVNode("div", { class: "term-container" }, [
                                          createVNode("h3", { class: "text-subtitle-1" }, "Uso del Servicio"),
                                          createVNode("p", { class: "text-body-1" }, " Acceso y Registro"),
                                          createVNode("p", { class: "term-list-item" }, " Los usuarios deben proporcionar informaci\xF3n precisa y completa al registrarse. El incumplimiento puede resultar en la suspensi\xF3n de la cuenta. "),
                                          createVNode("p", { class: "text-body-1" }, " Roles y Permisos"),
                                          createVNode("p", { class: "term-list-item" }, " Cada usuario tendr\xE1 permisos espec\xEDficos seg\xFAn su rol asignado (por ejemplo, administrador de liga, jugador). "),
                                          createVNode("p", { class: "text-body-1" }, " Restricciones"),
                                          createVNode("p", { class: "text-body-1" }, "Queda prohibido:"),
                                          createVNode("ul", { class: "term-list" }, [
                                            createVNode("li", { class: "term-list-item" }, " Utilizar la plataforma para actividades il\xEDcitas o fraudulentas. "),
                                            createVNode("li", { class: "term-list-item" }, " Intentar acceder, alterar o destruir datos de otros usuarios sin autorizaci\xF3n. "),
                                            createVNode("li", { class: "term-list-item" }, " Publicar contenido ofensivo, discriminatorio o inapropiado. "),
                                            createVNode("li", { class: "term-list-item" }, " Compartir credenciales de acceso con terceros. "),
                                            createVNode("li", { class: "term-list-item" }, " Utilizar la plataforma para enviar spam o correos no deseados. "),
                                            createVNode("li", { class: "term-list-item" }, " Violaci\xF3n de derechos de autor o propiedad intelectual. "),
                                            createVNode("li", { class: "term-list-item" }, " Realizar ingenier\xEDa inversa, descompilaci\xF3n o desensamblaje del Servicio. "),
                                            createVNode("li", { class: "term-list-item" }, " Utilizar bots, scripts o cualquier otro m\xE9todo automatizado para acceder al Servicio. "),
                                            createVNode("li", { class: "term-list-item" }, " Utilizar la plataforma para actividades que puedan afectar su rendimiento o estabilidad. "),
                                            createVNode("li", { class: "term-list-item" }, " Compartir informaci\xF3n personal de otros usuarios sin su consentimiento. ")
                                          ]),
                                          createVNode("p", { class: "text-body-1" }, " Actualizaciones y Mantenimiento "),
                                          createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de realizar actualizaciones y mantenimiento en el Servicio sin previo aviso. Los usuarios ser\xE1n notificados de cualquier interrupci\xF3n programada. "),
                                          createVNode("p", { class: "text-body-1" }, " Suspensi\xF3n y Cancelaci\xF3n "),
                                          createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de suspender o cancelar cuentas que infrinjan los t\xE9rminos de uso. Los usuarios pueden solicitar la eliminaci\xF3n de su cuenta en cualquier momento. "),
                                          createVNode("p", { class: "text-body-1" }, " Responsabilidad del Usuario "),
                                          createVNode("p", { class: "text-body-1" }, " Los usuarios son responsables de mantener la confidencialidad de sus credenciales de acceso y de cualquier actividad realizada en su cuenta "),
                                          createVNode("p", { class: "text-body-1" }, " Soporte T\xE9cnico"),
                                          createVNode("p", { class: "text-body-1" }, " Futzo proporcionar\xE1 soporte t\xE9cnico a los usuarios para resolver problemas relacionados con el Servicio. "),
                                          createVNode("p", { class: "text-body-1" }, " Comunicaci\xF3n"),
                                          createVNode("p", { class: "text-body-1" }, " Los usuarios aceptan recibir comunicaciones de Futzo, incluyendo correos electr\xF3nicos, notificaciones y mensajes en la plataforma. "),
                                          createVNode("p", { class: "text-body-1" }, " Modificaciones"),
                                          createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de modificar estos t\xE9rminos en cualquier momento. Los usuarios ser\xE1n notificados de los cambios y deber\xE1n aceptarlos para continuar utilizando el Servicio. ")
                                        ]),
                                        createVNode("div", { class: "term-container" }, [
                                          createVNode("h3", { class: "text-subtitle-1" }, " Contenido Generado por el Usuario "),
                                          createVNode("p", { class: "text-body-1" }, " Los usuarios son responsables del contenido que ingresen en la plataforma. Futzo no asume responsabilidad por errores o inexactitudes en los datos proporcionados por los usuarios. "),
                                          createVNode("p", { class: "text-body-1" }, " Propiedad del Contenido "),
                                          createVNode("p", { class: "text-body-1" }, " Los usuarios conservan la propiedad de los datos ingresados en la plataforma. Futzo no reclama derechos de propiedad sobre el contenido generado por los usuarios "),
                                          createVNode("p", { class: "text-body-1" }, " Licencia de Uso"),
                                          createVNode("p", { class: "text-body-1" }, " Al ingresar contenido en la plataforma, los usuarios otorgan a Futzo una licencia no exclusiva para utilizar, modificar y distribuir dicho contenido en el Servicio. "),
                                          createVNode("p", { class: "text-body-1" }, " Eliminaci\xF3n de Contenido "),
                                          createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de eliminar contenido que infrinja los t\xE9rminos de uso o que sea considerado inapropiado. "),
                                          createVNode("p", { class: "text-body-1" }, " Respaldo de Datos"),
                                          createVNode("p", { class: "text-body-1" }, " Los usuarios son responsables de realizar copias de seguridad de su contenido en caso de p\xE9rdida o eliminaci\xF3n accidental. "),
                                          createVNode("p", { class: "text-body-1" }, " Publicidad y Promoci\xF3n "),
                                          createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de utilizar el contenido generado por los usuarios con fines publicitarios y promocionales. "),
                                          createVNode("p", { class: "text-body-1" }, " Protecci\xF3n de Datos "),
                                          createVNode("p", { class: "text-body-1" }, " Futzo implementar\xE1 medidas de seguridad para proteger la privacidad y confidencialidad de los datos de los usuarios. "),
                                          createVNode("p", { class: "text-body-1" }, " Acceso a Datos"),
                                          createVNode("p", { class: "text-body-1" }, " Los usuarios pueden acceder, modificar o eliminar su contenido en cualquier momento a trav\xE9s de la plataforma. "),
                                          createVNode("p", { class: "text-body-1" }, " Retenci\xF3n de Datos"),
                                          createVNode("p", { class: "text-body-1" }, " Futzo retendr\xE1 los datos de los usuarios durante el tiempo necesario para cumplir con sus obligaciones legales y contractuales. ")
                                        ]),
                                        createVNode("div", { class: "term-container" }, [
                                          createVNode("h3", { class: "text-subtitle-1" }, "Propiedad Intelectual"),
                                          createVNode("p", { class: "text-body-1" }, " Todos los derechos relacionados con el dise\xF1o, c\xF3digo fuente, funcionalidad y marca de Futzo pertenecen exclusivamente a futzo.io. Se proh\xEDbe la reproducci\xF3n, distribuci\xF3n o modificaci\xF3n del Servicio sin autorizaci\xF3n previa. "),
                                          createVNode("p", { class: "text-body-1" }, " Marcas Registradas"),
                                          createVNode("p", { class: "text-body-1" }, " Futzo es una marca registrada de futzo.io. Se proh\xEDbe el uso no autorizado de la marca en cualquier contexto. "),
                                          createVNode("p", { class: "text-body-1" }, " Derechos de Autor"),
                                          createVNode("p", { class: "text-body-1" }, " Todos los contenidos publicados en la plataforma est\xE1n protegidos por derechos de autor. Se proh\xEDbe la reproducci\xF3n o distribuci\xF3n sin autorizaci\xF3n. "),
                                          createVNode("p", { class: "text-body-1" }, " Licencia de Uso"),
                                          createVNode("p", { class: "text-body-1" }, " Los usuarios reciben una licencia limitada para utilizar el Servicio de acuerdo con los t\xE9rminos establecidos en este documento. "),
                                          createVNode("p", { class: "text-body-1" }, " Contenido de Terceros "),
                                          createVNode("p", { class: "text-body-1" }, " Futzo puede incluir contenido de terceros en la plataforma, sujeto a los t\xE9rminos y condiciones de uso de los proveedores. "),
                                          createVNode("p", { class: "text-body-1" }, " Notificaci\xF3n de Infracci\xF3n "),
                                          createVNode("p", { class: "text-body-1" }, " Si un usuario considera que su propiedad intelectual ha sido infringida en la plataforma, debe notificar a Futzo para tomar las medidas correspondientes. "),
                                          createVNode("p", { class: "text-body-1" }, " Protecci\xF3n de Datos "),
                                          createVNode("p", { class: "text-body-1" }, " Futzo implementar\xE1 medidas de seguridad para proteger la privacidad y confidencialidad de los datos de los usuarios. ")
                                        ])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(VEmptyState, {
                        headline: "T\xE9rminos de servicio",
                        title: "\xDAltima actualizaci\xF3n: 01-Ene-2025"
                      }, {
                        media: withCtx(() => [
                          createVNode(_component_Icon, {
                            onClick: ($event) => _ctx.$router.push({ name: "index" }),
                            class: "cursor-pointer",
                            name: "futzo-icon:futzo-horizontal",
                            size: "100"
                          }, null, 8, ["onClick"])
                        ]),
                        default: withCtx(() => [
                          createVNode(VContainer, null, {
                            default: withCtx(() => [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, { cols: "12" }, {
                                    default: withCtx(() => [
                                      createVNode("p", { class: "text-body-1" }, " Bienvenido a Futzo, un sistema de gesti\xF3n dise\xF1ado para facilitar la administraci\xF3n de ligas deportivas y sus respectivas actividades. Al utilizar la plataforma Futzo (en adelante, \u201Cel Servicio\u201D), usted acepta cumplir con los t\xE9rminos descritos en este documento. Si no est\xE1 de acuerdo con estos t\xE9rminos, debe abstenerse de utilizar el Servicio. "),
                                      createVNode("div", { class: "term-container" }, [
                                        createVNode("h3", { class: "text-subtitle-1" }, "Cumplimiento Legal"),
                                        createVNode("p", { class: "text-body-1" }, " Ley Federal de Protecci\xF3n de Datos Personales en Posesi\xF3n de los Particulares (LFPDPPP) "),
                                        createVNode("p", { class: "text-body-1" }, " Futzo cumple con la LFPDPPP, otorgando a los usuarios derechos ARCO (Acceso, Rectificaci\xF3n, Cancelaci\xF3n y Oposici\xF3n) sobre sus datos personales. "),
                                        createVNode("p", { class: "text-body-1" }, " Reglamento General de Protecci\xF3n de Datos (GDPR) "),
                                        createVNode("p", { class: "text-body-1" }, " Si los usuarios residen en la Uni\xF3n Europea, Futzo garantiza los derechos previstos en el GDPR, incluyendo: "),
                                        createVNode("ul", { class: "term-list" }, [
                                          createVNode("li", { class: "term-list-item" }, " Derecho al Olvido: Solicitar la eliminaci\xF3n de su informaci\xF3n personal. "),
                                          createVNode("li", { class: "term-list-item" }, " Portabilidad de Datos: Transferir sus datos a otro proveedor si lo desean. ")
                                        ]),
                                        createVNode("p", { class: "text-body-1" }, " Consentimiento para el Tratamiento de Datos "),
                                        createVNode("p", { class: "text-body-1" }, " Al registrarse, los usuarios otorgan su consentimiento expl\xEDcito para el manejo de su informaci\xF3n personal conforme a nuestra Pol\xEDtica de Privacidad. "),
                                        createVNode("p", { class: "text-body-1" }, [
                                          createTextVNode(" Su privacidad es importante para nosotros. Consulte nuestra "),
                                          createVNode("a", {
                                            href: "javascript:void(0)",
                                            onClick: ($event) => _ctx.$router.push({ name: "politica-de-privacidad" }),
                                            class: "font-weight-medium text-secondary"
                                          }, "Pol\xEDtica de Privacidad", 8, ["onClick"]),
                                          createTextVNode(" para comprender c\xF3mo recopilamos, utilizamos y protegemos sus datos personales. ")
                                        ])
                                      ]),
                                      createVNode("div", { class: "term-container" }, [
                                        createVNode("h3", { class: "text-subtitle-1" }, " Responsabilidad y Limitaci\xF3n "),
                                        createVNode("p", { class: "text-body-1" }, " Exclusi\xF3n de Garant\xEDas "),
                                        createVNode("p", { class: "text-body-1" }, ' Futzo se proporciona "tal cual" y "seg\xFAn disponibilidad". Futzo no garantiza: '),
                                        createVNode("ul", { class: "term-list" }, [
                                          createVNode("li", { class: "term-list-item" }, " La disponibilidad continua del servicio. "),
                                          createVNode("li", { class: "term-list-item" }, " La ausencia de errores en la plataforma. "),
                                          createVNode("li", { class: "term-list-item" }, " Que la plataforma satisfaga las expectativas particulares de los usuarios. ")
                                        ]),
                                        createVNode("p", { class: "text-body-1" }, " Limitaci\xF3n de Responsabilidad "),
                                        createVNode("p", { class: "text-body-1" }, "Futzo no ser\xE1 responsable por:"),
                                        createVNode("ul", { class: "term-list" }, [
                                          createVNode("li", { class: "term-list-item" }, " Da\xF1os indirectos, incidentales o consecuentes. "),
                                          createVNode("li", { class: "term-list-item" }, " P\xE9rdidas financieras derivadas del uso del servicio. "),
                                          createVNode("li", { class: "term-list-item" }, " Contenido generado por los usuarios que infrinja derechos de terceros. ")
                                        ]),
                                        createVNode("p", { class: "text-body-1" }, "Indemnizaci\xF3n"),
                                        createVNode("p", { class: "text-body-1" }, " Los usuarios acuerdan indemnizar y liberar de responsabilidad a Futzo por cualquier reclamaci\xF3n, da\xF1o o p\xE9rdida causada por: "),
                                        createVNode("ul", { class: "term-list" }, [
                                          createVNode("li", { class: "term-list-item" }, "Uso indebido del servicio."),
                                          createVNode("li", { class: "term-list-item" }, " Incumplimiento de estos t\xE9rminos por parte del usuario. ")
                                        ])
                                      ]),
                                      createVNode("div", { class: "term-container" }, [
                                        createVNode("h3", { class: "text-subtitle-1" }, "Propiedad Intelectual"),
                                        createVNode("p", { class: "text-body-1" }, " Derechos de Autor y Marcas Registradas "),
                                        createVNode("p", { class: "text-body-1" }, " Todos los derechos sobre el dise\xF1o, c\xF3digo fuente, logotipos y otros elementos de Futzo son propiedad exclusiva de Futzo.io. "),
                                        createVNode("p", { class: "text-body-1" }, " Contenido Generado por Usuarios "),
                                        createVNode("p", { class: "text-body-1" }, " Los usuarios conservan la propiedad de los datos ingresados en la plataforma. Sin embargo, otorgan a Futzo una licencia no exclusiva para utilizar dichos datos en la operaci\xF3n del servicio. "),
                                        createVNode("p", { class: "text-body-1" }, " Protecci\xF3n del Sistema: Queda prohibido: "),
                                        createVNode("ul", { class: "term-list" }, [
                                          createVNode("li", { class: "term-list-item" }, " Intentar descompilar, realizar ingenier\xEDa inversa o copiar partes del software. "),
                                          createVNode("li", { class: "term-list-item" }, " Utilizar elementos de la marca Futzo sin autorizaci\xF3n. ")
                                        ])
                                      ]),
                                      createVNode("div", { class: "term-container" }, [
                                        createVNode("h3", { class: "text-subtitle-1" }, "Conducta del Usuario"),
                                        createVNode("p", { class: "text-body-1" }, " Restricciones Generales: "),
                                        createVNode("ul", { class: "term-list" }, [
                                          createVNode("li", { class: "term-list-item" }, " Publicar contenido ofensivo, discriminatorio o ilegal. "),
                                          createVNode("li", { class: "term-list-item" }, " Usar scripts automatizados, bots o herramientas similares. "),
                                          createVNode("li", { class: "term-list-item" }, " Compartir informaci\xF3n personal de terceros sin consentimiento. ")
                                        ]),
                                        createVNode("p", { class: "text-body-1" }, " Uso \xC9tico:"),
                                        createVNode("p", { class: "text-body-1" }, " Los usuarios se comprometen a actuar de buena fe y a no realizar actividades que perjudiquen la reputaci\xF3n de Futzo. ")
                                      ]),
                                      createVNode("div", { class: "term-container" }, [
                                        createVNode("h3", { class: "text-subtitle-1" }, "Pagos y Tarifas"),
                                        createVNode("p", { class: "text-body-1" }, " M\xE9todos de Pago y Facturaci\xF3n: "),
                                        createVNode("p", { class: "text-body-1" }, " Los usuarios pueden realizar pagos a trav\xE9s de los m\xE9todos habilitados, incluyendo tarjetas de cr\xE9dito/d\xE9bito y transferencias bancarias. "),
                                        createVNode("p", { class: "text-body-1" }, " Pol\xEDtica de Reembolsos: "),
                                        createVNode("p", { class: "text-body-1" }, " Los reembolsos estar\xE1n sujetos a evaluaci\xF3n, y solo se otorgar\xE1n en casos excepcionales, como: "),
                                        createVNode("ul", { class: "term-list" }, [
                                          createVNode("li", { class: "term-list-item" }, " Errores en el sistema de facturaci\xF3n. "),
                                          createVNode("li", { class: "term-list-item" }, " Cancelaciones antes de iniciar el servicio contratado. ")
                                        ]),
                                        createVNode("p", { class: "text-body-1" }, " Impuestos:"),
                                        createVNode("p", { class: "text-body-1" }, " El usuario es responsable de pagar los impuestos aplicables seg\xFAn las leyes locales. ")
                                      ]),
                                      createVNode("div", { class: "term-container" }, [
                                        createVNode("h3", { class: "text-subtitle-1" }, " Flexibilidad y Actualizaci\xF3n "),
                                        createVNode("p", { class: "text-body-1" }, " Modificaciones a los T\xE9rminos: "),
                                        createVNode("p", { class: "text-body-1" }, " Futzo puede modificar estos t\xE9rminos en cualquier momento para reflejar cambios legales, regulatorios o de mercado. Los usuarios ser\xE1n notificados con al menos 15 d\xEDas de antelaci\xF3n. "),
                                        createVNode("p", { class: "text-body-1" }, " Aceptaci\xF3n de Cambios: "),
                                        createVNode("p", { class: "text-body-1" }, " El uso continuado del servicio tras la notificaci\xF3n de cambios implica la aceptaci\xF3n de los nuevos t\xE9rminos. ")
                                      ]),
                                      createVNode("div", { class: "term-container" }, [
                                        createVNode("h3", { class: "text-subtitle-1" }, " Seguridad y Protecci\xF3n de Datos "),
                                        createVNode("p", { class: "text-body-1" }, " Medidas de Seguridad: "),
                                        createVNode("p", { class: "text-body-1" }, " Futzo implementa protocolos de seguridad, como: "),
                                        createVNode("ul", { class: "term-list" }, [
                                          createVNode("li", { class: "term-list-item" }, "Cifrado de datos sensibles."),
                                          createVNode("li", { class: "term-list-item" }, "Autenticaci\xF3n de dos factores."),
                                          createVNode("li", { class: "term-list-item" }, " Auditor\xEDas peri\xF3dicas del sistema. ")
                                        ]),
                                        createVNode("p", { class: "text-body-1" }, " Notificaci\xF3n de Brechas de Seguridad: "),
                                        createVNode("p", { class: "text-body-1" }, " En caso de una brecha de seguridad, Futzo notificar\xE1 a los usuarios afectados dentro de las 72 horas siguientes, conforme a las regulaciones aplicables. ")
                                      ]),
                                      createVNode("div", { class: "term-container" }, [
                                        createVNode("h3", { class: "text-subtitle-1" }, " Jurisdicci\xF3n y Ley Aplicable "),
                                        createVNode("p", { class: "text-body-1" }, " Estos t\xE9rminos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier controversia ser\xE1 resuelta ante los tribunales competentes de la Ciudad de M\xE9xico. ")
                                      ]),
                                      createVNode("div", { class: "term-container" }, [
                                        createVNode("h3", { class: "text-subtitle-1" }, " Uso de Servicios de Registro y Verificaci\xF3n "),
                                        createVNode("p", { class: "text-body-1" }, " Futzo integra servicios de terceros como Google, Facebook y WhatsApp para el registro, autenticaci\xF3n y verificaci\xF3n de usuarios. Al utilizar estos servicios, el Usuario acepta las siguientes condiciones: "),
                                        createVNode("p", { class: "text-body-1" }, " Registro y Autenticaci\xF3n con Google y Facebook: "),
                                        createVNode("ul", { class: "term-list" }, [
                                          createVNode("li", { class: "term-list-item" }, "El Usuario debe autorizar a Futzo para acceder a los datos m\xEDnimos requeridos para completar el proceso de registro (nombre, correo electr\xF3nico, etc.). "),
                                          createVNode("li", { class: "term-list-item" }, "Futzo no ser\xE1 responsable por problemas relacionados con las cuentas de Google o Facebook (por ejemplo, p\xE9rdida de acceso a estas cuentas). ")
                                        ]),
                                        createVNode("p", { class: "text-body-1" }, " Verificaci\xF3n mediante WhatsApp OTP: "),
                                        createVNode("ul", { class: "term-list" }, [
                                          createVNode("li", { class: "term-list-item" }, "El Usuario debe proporcionar un n\xFAmero telef\xF3nico v\xE1lido para completar el proceso de verificaci\xF3n."),
                                          createVNode("li", { class: "term-list-item" }, "Es responsabilidad del Usuario proteger el c\xF3digo de verificaci\xF3n y no compartirlo con terceros."),
                                          createVNode("li", { class: "term-list-item" }, "El incumplimiento de esta regla puede resultar en la suspensi\xF3n de la cuenta.")
                                        ]),
                                        createVNode("p", { class: "text-body-1" }, " Responsabilidad del Usuario: "),
                                        createVNode("ul", { class: "term-list" }, [
                                          createVNode("li", { class: "term-list-item" }, "El Usuario debe garantizar que la informaci\xF3n proporcionada durante el registro sea ver\xEDdica y actualizada."),
                                          createVNode("li", { class: "term-list-item" }, "Futzo no ser\xE1 responsable por el uso indebido de los servicios de terceros, como la transmisi\xF3n incorrecta de c\xF3digos OTP o problemas t\xE9cnicos ajenos a la plataforma. ")
                                        ]),
                                        createVNode("p", { class: "text-body-1" }, " Pol\xEDticas de Terceros: "),
                                        createVNode("p", { class: "text-body-1" }, " Al utilizar Google, Facebook o WhatsApp como parte del proceso, el Usuario est\xE1 sujeto a las pol\xEDticas de privacidad de estas plataformas, adem\xE1s de las pol\xEDticas de Futzo. ")
                                      ]),
                                      createVNode("div", { class: "term-container" }, [
                                        createVNode("h3", { class: "text-subtitle-1" }, "Contacto"),
                                        createVNode("p", { class: "text-body-1" }, " Para consultas relacionadas con los T\xE9rminos y Condiciones, por favor, cont\xE1ctanos a trav\xE9s de: "),
                                        createVNode("p", { class: "text-body-1" }, [
                                          createTextVNode(" Correo electr\xF3nico: "),
                                          createVNode("a", {
                                            class: "font-weight-medium text-secondary",
                                            href: "mailto:soporte@futzo.io"
                                          }, "soporte@futzo.io")
                                        ])
                                      ]),
                                      createVNode("div", { class: "term-container" }, [
                                        createVNode("h3", { class: "text-subtitle-1" }, "Definiciones"),
                                        createVNode("ul", { class: "term-list" }, [
                                          createVNode("li", { class: "term-list-item" }, " Usuario: Persona que accede al Servicio, ya sea como administrador de liga, equipo, jugador, \xE1rbitro o cualquier otro rol. "),
                                          createVNode("li", { class: "term-list-item" }, " Liga: Conjunto organizado de equipos y torneos registrados en la plataforma. "),
                                          createVNode("li", { class: "term-list-item" }, " Torneo: Competencia dentro de una liga, administrada a trav\xE9s del Servicio. "),
                                          createVNode("li", { class: "term-list-item" }, " Contenido: Datos ingresados por los usuarios, incluyendo informaci\xF3n de equipos, jugadores y partidos. "),
                                          createVNode("li", { class: "term-list-item" }, " Administrador: Usuario con permisos para gestionar la liga y sus actividades. "),
                                          createVNode("li", { class: "term-list-item" }, " Jugador: Usuario registrado en la plataforma como miembro de un equipo. "),
                                          createVNode("li", { class: "term-list-item" }, " Equipo: Grupo de jugadores registrados en la plataforma. "),
                                          createVNode("li", { class: "term-list-item" }, " Partido: Encuentro entre dos equipos, programado y registrado en la plataforma. "),
                                          createVNode("li", { class: "term-list-item" }, " Servicio: Plataforma Futzo y sus funcionalidades. ")
                                        ])
                                      ]),
                                      createVNode("div", { class: "term-container" }, [
                                        createVNode("h3", { class: "text-subtitle-1" }, "Uso del Servicio"),
                                        createVNode("p", { class: "text-body-1" }, " Acceso y Registro"),
                                        createVNode("p", { class: "term-list-item" }, " Los usuarios deben proporcionar informaci\xF3n precisa y completa al registrarse. El incumplimiento puede resultar en la suspensi\xF3n de la cuenta. "),
                                        createVNode("p", { class: "text-body-1" }, " Roles y Permisos"),
                                        createVNode("p", { class: "term-list-item" }, " Cada usuario tendr\xE1 permisos espec\xEDficos seg\xFAn su rol asignado (por ejemplo, administrador de liga, jugador). "),
                                        createVNode("p", { class: "text-body-1" }, " Restricciones"),
                                        createVNode("p", { class: "text-body-1" }, "Queda prohibido:"),
                                        createVNode("ul", { class: "term-list" }, [
                                          createVNode("li", { class: "term-list-item" }, " Utilizar la plataforma para actividades il\xEDcitas o fraudulentas. "),
                                          createVNode("li", { class: "term-list-item" }, " Intentar acceder, alterar o destruir datos de otros usuarios sin autorizaci\xF3n. "),
                                          createVNode("li", { class: "term-list-item" }, " Publicar contenido ofensivo, discriminatorio o inapropiado. "),
                                          createVNode("li", { class: "term-list-item" }, " Compartir credenciales de acceso con terceros. "),
                                          createVNode("li", { class: "term-list-item" }, " Utilizar la plataforma para enviar spam o correos no deseados. "),
                                          createVNode("li", { class: "term-list-item" }, " Violaci\xF3n de derechos de autor o propiedad intelectual. "),
                                          createVNode("li", { class: "term-list-item" }, " Realizar ingenier\xEDa inversa, descompilaci\xF3n o desensamblaje del Servicio. "),
                                          createVNode("li", { class: "term-list-item" }, " Utilizar bots, scripts o cualquier otro m\xE9todo automatizado para acceder al Servicio. "),
                                          createVNode("li", { class: "term-list-item" }, " Utilizar la plataforma para actividades que puedan afectar su rendimiento o estabilidad. "),
                                          createVNode("li", { class: "term-list-item" }, " Compartir informaci\xF3n personal de otros usuarios sin su consentimiento. ")
                                        ]),
                                        createVNode("p", { class: "text-body-1" }, " Actualizaciones y Mantenimiento "),
                                        createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de realizar actualizaciones y mantenimiento en el Servicio sin previo aviso. Los usuarios ser\xE1n notificados de cualquier interrupci\xF3n programada. "),
                                        createVNode("p", { class: "text-body-1" }, " Suspensi\xF3n y Cancelaci\xF3n "),
                                        createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de suspender o cancelar cuentas que infrinjan los t\xE9rminos de uso. Los usuarios pueden solicitar la eliminaci\xF3n de su cuenta en cualquier momento. "),
                                        createVNode("p", { class: "text-body-1" }, " Responsabilidad del Usuario "),
                                        createVNode("p", { class: "text-body-1" }, " Los usuarios son responsables de mantener la confidencialidad de sus credenciales de acceso y de cualquier actividad realizada en su cuenta "),
                                        createVNode("p", { class: "text-body-1" }, " Soporte T\xE9cnico"),
                                        createVNode("p", { class: "text-body-1" }, " Futzo proporcionar\xE1 soporte t\xE9cnico a los usuarios para resolver problemas relacionados con el Servicio. "),
                                        createVNode("p", { class: "text-body-1" }, " Comunicaci\xF3n"),
                                        createVNode("p", { class: "text-body-1" }, " Los usuarios aceptan recibir comunicaciones de Futzo, incluyendo correos electr\xF3nicos, notificaciones y mensajes en la plataforma. "),
                                        createVNode("p", { class: "text-body-1" }, " Modificaciones"),
                                        createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de modificar estos t\xE9rminos en cualquier momento. Los usuarios ser\xE1n notificados de los cambios y deber\xE1n aceptarlos para continuar utilizando el Servicio. ")
                                      ]),
                                      createVNode("div", { class: "term-container" }, [
                                        createVNode("h3", { class: "text-subtitle-1" }, " Contenido Generado por el Usuario "),
                                        createVNode("p", { class: "text-body-1" }, " Los usuarios son responsables del contenido que ingresen en la plataforma. Futzo no asume responsabilidad por errores o inexactitudes en los datos proporcionados por los usuarios. "),
                                        createVNode("p", { class: "text-body-1" }, " Propiedad del Contenido "),
                                        createVNode("p", { class: "text-body-1" }, " Los usuarios conservan la propiedad de los datos ingresados en la plataforma. Futzo no reclama derechos de propiedad sobre el contenido generado por los usuarios "),
                                        createVNode("p", { class: "text-body-1" }, " Licencia de Uso"),
                                        createVNode("p", { class: "text-body-1" }, " Al ingresar contenido en la plataforma, los usuarios otorgan a Futzo una licencia no exclusiva para utilizar, modificar y distribuir dicho contenido en el Servicio. "),
                                        createVNode("p", { class: "text-body-1" }, " Eliminaci\xF3n de Contenido "),
                                        createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de eliminar contenido que infrinja los t\xE9rminos de uso o que sea considerado inapropiado. "),
                                        createVNode("p", { class: "text-body-1" }, " Respaldo de Datos"),
                                        createVNode("p", { class: "text-body-1" }, " Los usuarios son responsables de realizar copias de seguridad de su contenido en caso de p\xE9rdida o eliminaci\xF3n accidental. "),
                                        createVNode("p", { class: "text-body-1" }, " Publicidad y Promoci\xF3n "),
                                        createVNode("p", { class: "text-body-1" }, " Futzo se reserva el derecho de utilizar el contenido generado por los usuarios con fines publicitarios y promocionales. "),
                                        createVNode("p", { class: "text-body-1" }, " Protecci\xF3n de Datos "),
                                        createVNode("p", { class: "text-body-1" }, " Futzo implementar\xE1 medidas de seguridad para proteger la privacidad y confidencialidad de los datos de los usuarios. "),
                                        createVNode("p", { class: "text-body-1" }, " Acceso a Datos"),
                                        createVNode("p", { class: "text-body-1" }, " Los usuarios pueden acceder, modificar o eliminar su contenido en cualquier momento a trav\xE9s de la plataforma. "),
                                        createVNode("p", { class: "text-body-1" }, " Retenci\xF3n de Datos"),
                                        createVNode("p", { class: "text-body-1" }, " Futzo retendr\xE1 los datos de los usuarios durante el tiempo necesario para cumplir con sus obligaciones legales y contractuales. ")
                                      ]),
                                      createVNode("div", { class: "term-container" }, [
                                        createVNode("h3", { class: "text-subtitle-1" }, "Propiedad Intelectual"),
                                        createVNode("p", { class: "text-body-1" }, " Todos los derechos relacionados con el dise\xF1o, c\xF3digo fuente, funcionalidad y marca de Futzo pertenecen exclusivamente a futzo.io. Se proh\xEDbe la reproducci\xF3n, distribuci\xF3n o modificaci\xF3n del Servicio sin autorizaci\xF3n previa. "),
                                        createVNode("p", { class: "text-body-1" }, " Marcas Registradas"),
                                        createVNode("p", { class: "text-body-1" }, " Futzo es una marca registrada de futzo.io. Se proh\xEDbe el uso no autorizado de la marca en cualquier contexto. "),
                                        createVNode("p", { class: "text-body-1" }, " Derechos de Autor"),
                                        createVNode("p", { class: "text-body-1" }, " Todos los contenidos publicados en la plataforma est\xE1n protegidos por derechos de autor. Se proh\xEDbe la reproducci\xF3n o distribuci\xF3n sin autorizaci\xF3n. "),
                                        createVNode("p", { class: "text-body-1" }, " Licencia de Uso"),
                                        createVNode("p", { class: "text-body-1" }, " Los usuarios reciben una licencia limitada para utilizar el Servicio de acuerdo con los t\xE9rminos establecidos en este documento. "),
                                        createVNode("p", { class: "text-body-1" }, " Contenido de Terceros "),
                                        createVNode("p", { class: "text-body-1" }, " Futzo puede incluir contenido de terceros en la plataforma, sujeto a los t\xE9rminos y condiciones de uso de los proveedores. "),
                                        createVNode("p", { class: "text-body-1" }, " Notificaci\xF3n de Infracci\xF3n "),
                                        createVNode("p", { class: "text-body-1" }, " Si un usuario considera que su propiedad intelectual ha sido infringida en la plataforma, debe notificar a Futzo para tomar las medidas correspondientes. "),
                                        createVNode("p", { class: "text-body-1" }, " Protecci\xF3n de Datos "),
                                        createVNode("p", { class: "text-body-1" }, " Futzo implementar\xE1 medidas de seguridad para proteger la privacidad y confidencialidad de los datos de los usuarios. ")
                                      ])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/terminos-de-servicio.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const terminosDeServicio = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ce250240"]]);

export { terminosDeServicio as default };
//# sourceMappingURL=terminos-de-servicio-D9uPY9kN.mjs.map
