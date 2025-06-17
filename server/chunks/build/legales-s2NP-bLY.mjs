import { withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc, V as VCard, e as VCardTitle, F as VCardText } from './server.mjs';
import { V as VContainer } from './VContainer-C0Se5csP.mjs';
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
import 'pinia';
import 'vue-router';
import '@iconify/vue';
import 'perfect-scrollbar';
import 'deep-pick-omit';
import 'dayjs';
import 'dayjs/plugin/customParseFormat.js';
import 'dayjs/locale/es.js';
import 'awesome-phonenumber';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(ssrRenderComponent(VContainer, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VCard, { class: "pa-4" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VCardTitle, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<h1${_scopeId3}>Pol\xEDtica de privacidad y uso de datos</h1>`);
                  } else {
                    return [
                      createVNode("h1", null, "Pol\xEDtica de privacidad y uso de datos")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VCardText, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<h2${_scopeId3}>Recopilaci\xF3n de informaci\xF3n personal</h2><p${_scopeId3}>Recopilamos informaci\xF3n personal como nombre, direcci\xF3n de correo electr\xF3nico, direcci\xF3n f\xEDsica y detalles de pago cuando los usuarios se registran en nuestro sitio web y servicios.</p><h2${_scopeId3}>Uso de la informaci\xF3n personal</h2><p${_scopeId3}>La informaci\xF3n personal recopilada se utiliza para proporcionar a los usuarios los servicios solicitados, procesar pagos y enviar actualizaciones sobre nuestro sitio web y servicios.</p><h2${_scopeId3}>Recopilaci\xF3n de informaci\xF3n no personal</h2><p${_scopeId3}>Recopilamos informaci\xF3n no personal como la direcci\xF3n IP, la ubicaci\xF3n geogr\xE1fica, el tipo de navegador y el sistema operativo utilizado por los usuarios, con fines de an\xE1lisis y mejora de nuestro sitio web y servicios.</p><h2${_scopeId3}>Uso de cookies</h2><p${_scopeId3}>Utilizamos cookies para mejorar la experiencia del usuario en nuestro sitio web y servicios, y para recopilar informaci\xF3n no personal para fines estad\xEDsticos y de an\xE1lisis.</p><h2${_scopeId3}>Uso de terceros</h2><p${_scopeId3}>Utilizamos servicios de terceros como Facebook y Google para proporcionar a nuestros usuarios la opci\xF3n de registrarse e iniciar sesi\xF3n a trav\xE9s de sus plataformas. Al hacerlo, estos servicios de terceros recopilan y utilizan informaci\xF3n de acuerdo con sus propias pol\xEDticas de privacidad y t\xE9rminos de servicio.</p><h2${_scopeId3}>Seguridad de la informaci\xF3n</h2><p${_scopeId3}>Hemos implementado medidas de seguridad razonables para proteger la informaci\xF3n personal y no personal recopilada a trav\xE9s de nuestro sitio web y servicios.</p><h2${_scopeId3}>Divulgaci\xF3n de la informaci\xF3n</h2><p${_scopeId3}>No vendemos, alquilamos ni divulgamos informaci\xF3n personal de nuestros usuarios a terceros, excepto en las circunstancias limitadas descritas en nuestra pol\xEDtica de privacidad y uso de datos.</p><h2${_scopeId3}>Cambios en la pol\xEDtica de privacidad</h2><p${_scopeId3}>Nos reservamos el derecho de modificar esta pol\xEDtica de privacidad y uso de datos en cualquier momento y sin previo aviso.</p><h2${_scopeId3}>Contacto</h2><p${_scopeId3}>Si tiene alguna pregunta o inquietud sobre nuestra pol\xEDtica de privacidad y uso de datos, no dude en ponerse en contacto con nosotros a trav\xE9s de la direcci\xF3n de correo electr\xF3nico proporcionada en nuestro sitio web.</p>`);
                  } else {
                    return [
                      createVNode("h2", null, "Recopilaci\xF3n de informaci\xF3n personal"),
                      createVNode("p", null, "Recopilamos informaci\xF3n personal como nombre, direcci\xF3n de correo electr\xF3nico, direcci\xF3n f\xEDsica y detalles de pago cuando los usuarios se registran en nuestro sitio web y servicios."),
                      createVNode("h2", null, "Uso de la informaci\xF3n personal"),
                      createVNode("p", null, "La informaci\xF3n personal recopilada se utiliza para proporcionar a los usuarios los servicios solicitados, procesar pagos y enviar actualizaciones sobre nuestro sitio web y servicios."),
                      createVNode("h2", null, "Recopilaci\xF3n de informaci\xF3n no personal"),
                      createVNode("p", null, "Recopilamos informaci\xF3n no personal como la direcci\xF3n IP, la ubicaci\xF3n geogr\xE1fica, el tipo de navegador y el sistema operativo utilizado por los usuarios, con fines de an\xE1lisis y mejora de nuestro sitio web y servicios."),
                      createVNode("h2", null, "Uso de cookies"),
                      createVNode("p", null, "Utilizamos cookies para mejorar la experiencia del usuario en nuestro sitio web y servicios, y para recopilar informaci\xF3n no personal para fines estad\xEDsticos y de an\xE1lisis."),
                      createVNode("h2", null, "Uso de terceros"),
                      createVNode("p", null, "Utilizamos servicios de terceros como Facebook y Google para proporcionar a nuestros usuarios la opci\xF3n de registrarse e iniciar sesi\xF3n a trav\xE9s de sus plataformas. Al hacerlo, estos servicios de terceros recopilan y utilizan informaci\xF3n de acuerdo con sus propias pol\xEDticas de privacidad y t\xE9rminos de servicio."),
                      createVNode("h2", null, "Seguridad de la informaci\xF3n"),
                      createVNode("p", null, "Hemos implementado medidas de seguridad razonables para proteger la informaci\xF3n personal y no personal recopilada a trav\xE9s de nuestro sitio web y servicios."),
                      createVNode("h2", null, "Divulgaci\xF3n de la informaci\xF3n"),
                      createVNode("p", null, "No vendemos, alquilamos ni divulgamos informaci\xF3n personal de nuestros usuarios a terceros, excepto en las circunstancias limitadas descritas en nuestra pol\xEDtica de privacidad y uso de datos."),
                      createVNode("h2", null, "Cambios en la pol\xEDtica de privacidad"),
                      createVNode("p", null, "Nos reservamos el derecho de modificar esta pol\xEDtica de privacidad y uso de datos en cualquier momento y sin previo aviso."),
                      createVNode("h2", null, "Contacto"),
                      createVNode("p", null, "Si tiene alguna pregunta o inquietud sobre nuestra pol\xEDtica de privacidad y uso de datos, no dude en ponerse en contacto con nosotros a trav\xE9s de la direcci\xF3n de correo electr\xF3nico proporcionada en nuestro sitio web.")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VCardTitle, null, {
                  default: withCtx(() => [
                    createVNode("h1", null, "Pol\xEDtica de privacidad y uso de datos")
                  ]),
                  _: 1
                }),
                createVNode(VCardText, null, {
                  default: withCtx(() => [
                    createVNode("h2", null, "Recopilaci\xF3n de informaci\xF3n personal"),
                    createVNode("p", null, "Recopilamos informaci\xF3n personal como nombre, direcci\xF3n de correo electr\xF3nico, direcci\xF3n f\xEDsica y detalles de pago cuando los usuarios se registran en nuestro sitio web y servicios."),
                    createVNode("h2", null, "Uso de la informaci\xF3n personal"),
                    createVNode("p", null, "La informaci\xF3n personal recopilada se utiliza para proporcionar a los usuarios los servicios solicitados, procesar pagos y enviar actualizaciones sobre nuestro sitio web y servicios."),
                    createVNode("h2", null, "Recopilaci\xF3n de informaci\xF3n no personal"),
                    createVNode("p", null, "Recopilamos informaci\xF3n no personal como la direcci\xF3n IP, la ubicaci\xF3n geogr\xE1fica, el tipo de navegador y el sistema operativo utilizado por los usuarios, con fines de an\xE1lisis y mejora de nuestro sitio web y servicios."),
                    createVNode("h2", null, "Uso de cookies"),
                    createVNode("p", null, "Utilizamos cookies para mejorar la experiencia del usuario en nuestro sitio web y servicios, y para recopilar informaci\xF3n no personal para fines estad\xEDsticos y de an\xE1lisis."),
                    createVNode("h2", null, "Uso de terceros"),
                    createVNode("p", null, "Utilizamos servicios de terceros como Facebook y Google para proporcionar a nuestros usuarios la opci\xF3n de registrarse e iniciar sesi\xF3n a trav\xE9s de sus plataformas. Al hacerlo, estos servicios de terceros recopilan y utilizan informaci\xF3n de acuerdo con sus propias pol\xEDticas de privacidad y t\xE9rminos de servicio."),
                    createVNode("h2", null, "Seguridad de la informaci\xF3n"),
                    createVNode("p", null, "Hemos implementado medidas de seguridad razonables para proteger la informaci\xF3n personal y no personal recopilada a trav\xE9s de nuestro sitio web y servicios."),
                    createVNode("h2", null, "Divulgaci\xF3n de la informaci\xF3n"),
                    createVNode("p", null, "No vendemos, alquilamos ni divulgamos informaci\xF3n personal de nuestros usuarios a terceros, excepto en las circunstancias limitadas descritas en nuestra pol\xEDtica de privacidad y uso de datos."),
                    createVNode("h2", null, "Cambios en la pol\xEDtica de privacidad"),
                    createVNode("p", null, "Nos reservamos el derecho de modificar esta pol\xEDtica de privacidad y uso de datos en cualquier momento y sin previo aviso."),
                    createVNode("h2", null, "Contacto"),
                    createVNode("p", null, "Si tiene alguna pregunta o inquietud sobre nuestra pol\xEDtica de privacidad y uso de datos, no dude en ponerse en contacto con nosotros a trav\xE9s de la direcci\xF3n de correo electr\xF3nico proporcionada en nuestro sitio web.")
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
          createVNode(VCard, { class: "pa-4" }, {
            default: withCtx(() => [
              createVNode(VCardTitle, null, {
                default: withCtx(() => [
                  createVNode("h1", null, "Pol\xEDtica de privacidad y uso de datos")
                ]),
                _: 1
              }),
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  createVNode("h2", null, "Recopilaci\xF3n de informaci\xF3n personal"),
                  createVNode("p", null, "Recopilamos informaci\xF3n personal como nombre, direcci\xF3n de correo electr\xF3nico, direcci\xF3n f\xEDsica y detalles de pago cuando los usuarios se registran en nuestro sitio web y servicios."),
                  createVNode("h2", null, "Uso de la informaci\xF3n personal"),
                  createVNode("p", null, "La informaci\xF3n personal recopilada se utiliza para proporcionar a los usuarios los servicios solicitados, procesar pagos y enviar actualizaciones sobre nuestro sitio web y servicios."),
                  createVNode("h2", null, "Recopilaci\xF3n de informaci\xF3n no personal"),
                  createVNode("p", null, "Recopilamos informaci\xF3n no personal como la direcci\xF3n IP, la ubicaci\xF3n geogr\xE1fica, el tipo de navegador y el sistema operativo utilizado por los usuarios, con fines de an\xE1lisis y mejora de nuestro sitio web y servicios."),
                  createVNode("h2", null, "Uso de cookies"),
                  createVNode("p", null, "Utilizamos cookies para mejorar la experiencia del usuario en nuestro sitio web y servicios, y para recopilar informaci\xF3n no personal para fines estad\xEDsticos y de an\xE1lisis."),
                  createVNode("h2", null, "Uso de terceros"),
                  createVNode("p", null, "Utilizamos servicios de terceros como Facebook y Google para proporcionar a nuestros usuarios la opci\xF3n de registrarse e iniciar sesi\xF3n a trav\xE9s de sus plataformas. Al hacerlo, estos servicios de terceros recopilan y utilizan informaci\xF3n de acuerdo con sus propias pol\xEDticas de privacidad y t\xE9rminos de servicio."),
                  createVNode("h2", null, "Seguridad de la informaci\xF3n"),
                  createVNode("p", null, "Hemos implementado medidas de seguridad razonables para proteger la informaci\xF3n personal y no personal recopilada a trav\xE9s de nuestro sitio web y servicios."),
                  createVNode("h2", null, "Divulgaci\xF3n de la informaci\xF3n"),
                  createVNode("p", null, "No vendemos, alquilamos ni divulgamos informaci\xF3n personal de nuestros usuarios a terceros, excepto en las circunstancias limitadas descritas en nuestra pol\xEDtica de privacidad y uso de datos."),
                  createVNode("h2", null, "Cambios en la pol\xEDtica de privacidad"),
                  createVNode("p", null, "Nos reservamos el derecho de modificar esta pol\xEDtica de privacidad y uso de datos en cualquier momento y sin previo aviso."),
                  createVNode("h2", null, "Contacto"),
                  createVNode("p", null, "Si tiene alguna pregunta o inquietud sobre nuestra pol\xEDtica de privacidad y uso de datos, no dude en ponerse en contacto con nosotros a trav\xE9s de la direcci\xF3n de correo electr\xF3nico proporcionada en nuestro sitio web.")
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
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/legales.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const legales = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { legales as default };
//# sourceMappingURL=legales-s2NP-bLY.mjs.map
