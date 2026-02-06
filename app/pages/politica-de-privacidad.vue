<script lang="ts" setup>
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
      <v-empty-state headline="Aviso de Privacidad" title="Última actualización: 01-Ene-2025">
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
                Futzo (en adelante, el “Responsable”), con domicilio en Calle mirador número exterior 164 entre calle
                El cielo y calle amplicion 16 de septiembre colonia llanitos localidad ixtapa municipio Puerto
                vallarta entidad federativa jalisco, informa que con fundamento en los artículos 15 y 16 de la Ley
                Federal de Protección de Datos Personales en Posesión de Particulares, es responsable del tratamiento
                de los datos personales que recaba de usted (en adelante, el “Titular”), de su uso y protección.
              </p>
              <p class="text-body-1">
                Nuestro Aviso de Privacidad ha sido concebido para ayudarle a comprender cómo recopilamos y usamos la
                información de carácter personal (“Información Personal”) que usted nos proporciona y para ayudarle a
                tomar decisiones informadas cuando usa nuestro sitio web y nuestros servicios.
              </p>
              <div class="term-container">
                <h3 class="text-subtitle-1">Recopilación de información</h3>
                <p class="text-body-1">
                  Cuando usted visita nuestro Sitio Web, podemos recopilar información sobre su visita desde su
                  ordenador. Esa información nos ayuda a determinar cómo ha llegado a nuestro Sitio Web, la fecha en
                  la que ha visitado nuestro Sitio Web y los motores de búsqueda que pueden haberle llevado a nuestro
                  Sitio Web. Recopilamos esta información para mejorar y ampliar de forma continua de nuestra
                  funcionalidad.
                </p>
                <p class="text-body-1">
                  La información que nos proporcione se clasifica en dos tipos generales (información proporcionada
                  por el usuario e información sobre el uso del Sitio Web), ambos descritos de forma más detallada a
                  continuación.
                </p>
                <h3 class="text-subtitle-1">Información Personal que usted decide proporcionarnos</h3>
                <p class="text-body-1">
                  Con el fin de hacer que sus visitas al Sitio Web le resulten lo más agradables posible, podemos
                  solicitarle Información Personal. La Información Personal incluye, por ejemplo, su nombre, teléfono
                  y correo electrónico, datos que podemos pedirle al registrarse en Futzo. Más adelante se proporciona
                  una descripción de algunos de los métodos mediante los cuales usted nos puede proporcionar
                  información, así como más detalles sobre cómo podemos utilizar esa Información Personal.
                </p>
                <h3 class="text-subtitle-1">Cómo utilizamos su información</h3>
                <p class="text-body-1">
                  La finalidad del tratamiento de los datos proporcionados al Responsable será de evaluación,
                  análisis, uso, manejo, aprovechamiento, transferencia precavida, disposición adecuada, divulgación
                  responsable, almacenamiento por cualquier medio así como cualquier acción de acceso.
                </p>
                <p class="text-body-1">
                  En relación con la recopilación y tratamiento de dicha información el Responsable se compromete y
                  obliga a observar y cumplir con los principios de licitud, consentimiento, información, calidad,
                  finalidad, lealtad, proporcionalidad y responsabilidad. Esto es, todos los Datos que le solicitamos
                  son recabados de manera lícita, con el consentimiento de Usted, recopilando única y exclusivamente
                  los datos pertinentes, correctos, actualizados y necesarios para prestarle un servicio de calidad.
                </p>
                <p class="text-body-1">
                  La base de datos del Responsable, donde constan los Datos solamente puede ser operada por el
                  personal del Responsable, cuyas funciones se encuentran reguladas por las políticas internas de la
                  misma. Asimismo, el Responsable tiene implementadas medidas de seguridad que permiten proteger los
                  datos personales del Titular contra cualquier daño, pérdida, alteración, destrucción o uso, acceso o
                  tratamiento no autorizado.
                </p>
                <p class="text-body-1">
                  De igual forma, le informamos que utilizamos la información personal que Usted nos proporciona, sólo
                  para brindarle los productos y servicios que nos solicita, así como, para informarle de nuestros
                  nuevos productos y dar a conocer nuestras promociones. En general, compartimos su información
                  únicamente con nuestras empresas filiales o subsidiarias.
                </p>
                <p class="text-body-1">
                  Mecanismos y procedimientos para que, en su caso, el titular pueda revocar su consentimiento al
                  tratamiento de sus datos personales
                </p>
                <p class="text-body-1">
                  Le recordamos que, en materia de Protección de Datos Personales en Posesión de Particulares, Usted
                  podrá ejercer los siguientes derechos (“Derechos Arco”):
                </p>
                <ul class="term-list">
                  <li class="term-list-item">
                    Acceso: Podrá solicitar el acceso a sus datos personales, mediante el procedimiento descrito más
                    adelante.
                  </li>
                  <li class="term-list-item">
                    Rectificación: Usted podrá solicitarnos que cualquiera de sus Datos sea corregido, en caso de que
                    tengamos registrado alguno erróneamente o exista algún cambio en los mismos.
                  </li>
                  <li class="term-list-item">
                    Cancelación: Podrá pedir que cancelemos o demos de baja sus Datos siempre y cuando exista una
                    causa que justifique dicha acción.
                  </li>
                  <li class="term-list-item">Oposición: Oponerse al tratamiento de sus Datos.</li>
                </ul>
                <p class="text-body-1">
                  De conformidad con lo dispuesto en el artículo 29 de la Ley Federal de Protección de Datos
                  Personales en Posesión de Particulares, los derechos anteriormente citados los puede hacer valer
                  personalmente o a través de su representante legal, mediante el siguiente procedimiento:
                </p>
                <p class="text-body-1">
                  Deberá presentar una carta debidamente llenada, la cual deberá ser presentada por duplicado en el
                  domicilio precisado en este aviso de privacidad, en un horario de 10:00 am a 2:30 pm. y deberá
                  adjuntar los siguientes documentos y datos:
                </p>
                <p class="text-body-1">
                  Copia de la identificación oficial del Titular (p.e. Credencial de Elector, Pasaporte o Cédula
                  Profesional). En caso de que sea el representante legal el que haga ejercicio de sus derechos,
                  deberá adjuntar además un documento con el que acredite tal carácter, así como copia de su
                  identificación oficial.
                </p>
                <p class="text-body-1">
                  Una descripción precisa de sus Datos y lo que desea se haga con dichos datos, como acceder,
                  rectificar, cancelar u oponerse, según sea el caso. En el caso de rectificación, deberá adjuntar los
                  documentos que sustenten la rectificación.
                </p>
                <p class="text-body-1">
                  Podrá adjuntar cualquier otro dato o documento que facilite la ubicación de los datos a tratar, como
                  copia del folio del Titular.
                </p>
                <p class="text-body-1">
                  Por último, deberá de contener firma autógrafa del titular o representante legal del mismo.
                </p>
                <p class="text-body-1">
                  Una vez agotado el procedimiento descrito con anterioridad, el Responsable comunicará al Titular, en
                  un plazo no mayor a 20 (veinte) días naturales, contados a partir de la fecha en que sea presentada
                  la solicitud, la respuesta y tratamiento que se ha dado a su petición. Lo anterior, para el efecto
                  de que, si resulta procedente su petición, se ejecute la misma en un plazo de 15 (quince) días
                  naturales siguientes a la fecha en que se comunique la respuesta. Tratándose de solicitudes de
                  acceso a datos personales, procederá la entrega previa acreditación de la identidad del solicitante
                  o del representante legal, según sea el caso.
                </p>
                <p class="text-body-1">
                  En los casos de los Titulares que tengan su domicilio fuera de la circunscripción del domicilio
                  señalado en el presente aviso, se podrá presentar por correo certificado, tomando como fecha de
                  presentación el día en que llegue al domicilio señalado en el presente documento.
                </p>
                <h3 class="text-subtitle-1">Registro, Autenticación y Verificación</h3>
                <p class="text-body-1">
                  Futzo utiliza servicios de terceros para facilitar el proceso de registro, autenticación y
                  verificación de usuarios. A continuación, se describen los detalles del tratamiento de datos
                  relacionados con estos servicios:
                </p>
                <p class="text-body-1">Google y Facebook</p>
                <ul class="term-list">
                  <li class="term-list-item">
                    Datos Recabados: Nombre, correo electrónico, foto de perfil y cualquier otra información que el
                    Titular autorice explícitamente a compartir a través de las APIs de Google y Facebook.
                  </li>
                  <li class="term-list-item">
                    Finalidad: Permitir el registro e inicio de sesión de forma rápida y segura
                  </li>
                </ul>
                <p class="text-body-1">Referencias a Políticas Externas:</p>
                <ul class="term-list">
                  <li class="term-list-item">
                    <a href="https://policies.google.com/privacy">Política de Privacidad de Google</a>
                  </li>
                  <li class="term-list-item">
                    <a href="https://www.facebook.com/policy.php">Política de Privacidad de Facebook</a>
                  </li>
                </ul>
                <p class="text-body-1">Verificación por WhatsApp OTP</p>
                <p class="text-body-1">Datos Utilizados: Número de teléfono móvil.</p>
                <p class="text-body-1">
                  Finalidad: Validar la identidad del usuario mediante un código de verificación enviado a través de
                  WhatsApp.
                </p>
                <p class="text-body-1">
                  Proveedores Externos: El servicio de envío de mensajes OTP es operado por terceros autorizados,
                  quienes cumplen con estrictas medidas de seguridad y confidencialidad.
                </p>
                <h3 class="text-subtitle-1">Limitaciones y Seguridad</h3>
                <p class="text-body-1">
                  Los datos compartidos con Google, Facebook o WhatsApp se utilizan exclusivamente para los fines
                  especificados. Futzo no almacena ni utiliza información más allá de la autorizada por el Titular.
                </p>
                <h3 class="text-subtitle-1">Cuestionarios y encuestas</h3>
                <p class="text-body-1">
                  Ocasionalmente podemos solicitar a los visitantes de nuestro Sitio Web que rellenen cuestionarios y
                  encuestas de opinión en línea sobre sus actividades, sus actitudes y sus intereses. Esas encuestas
                  nos ayudan a ofrecerle un mejor servicio y a mejorar la utilidad de Futzo. Al solicitarle que
                  participe en estas encuestas, podemos pedirle que nos proporcione su nombre y su dirección de correo
                  electrónico.
                </p>
                <h3 class="text-subtitle-1">Cookies / Información sobre el uso del Sitio Web</h3>
                <p class="text-body-1">
                  Al visitar Futzo, podemos usar cookies en nuestro Sitio Web o en relación con él para conservar
                  información sobre usted. Una cookie es un documento de texto diminuto que a menudo incluye un
                  identificador único anónimo e información adicional necesaria para poder utilizar la funcionalidad
                  prevista del sitio.
                </p>
                <p class="text-body-1">
                  Al visitar nuestro Sitio Web, éste enviará una cookie de sesión a su navegador si las preferencias
                  del navegador lo permiten. No obstante, (para proteger su privacidad) su navegador solo permite a
                  nuestro Sitio Web acceder a las cookies que éste le ha enviado, y no a las enviadas por otros sitios
                  web. Excepto si se especifica lo contrario en la presente, todas nuestras cookies son necesarias
                  para la prestación de nuestros servicios.
                </p>
                <p class="text-body-1">
                  La mayoría de los navegadores web se pueden configurar para que reciba un aviso cuando se le envía
                  una cookie y para que pueda rechazarla. Puede solicitar información sobre cómo desactivar las
                  cookies de su navegador y eliminar todas las cookies almacenadas actualmente en su ordenador.
                </p>
                <p class="text-body-1">
                  En algunos casos, rechazar una cookie puede significar que no pueda utilizar una función o
                  determinadas prestaciones de nuestro Sitio Web. Asimismo, puede afectar negativamente a la
                  visualización y al funcionamiento del Sitio Web o a determinadas partes o prestaciones del mismo.
                </p>
                <h3 class="text-subtitle-1">GIFs transparentes</h3>
                <p class="text-body-1">
                  Cuando usted nos visita, también podemos usar “GIF transparentes” (también llamados “balizas web” o
                  “etiquetas de píxeles”) o tecnologías similares en nuestro Sitio Web y/o en nuestras comunicaciones
                  con usted. Por regla general, un GIF transparente es una imagen transparente del tamaño de un píxel
                  ubicada en una página web, en un e-mail o en otro tipo de mensaje que nos ayuda a verificar que una
                  persona ha visualizado o recibido una página web o un mensaje. Los GIF transparentes nos permiten
                  saber si ha visualizado una página web antes de visitar nuestro Sitio Web y pueden permitirnos
                  relacionar esa información con otra información, incluidos sus datos personales. Utilizamos la
                  información proporcionada por los GIF transparentes para generar informes más precisos, mejorar la
                  eficacia de nuestras campañas de marketing y mejorar para nuestros usuarios.
                </p>
                <h3 class="text-subtitle-1">Datos de direcciones IP y series de clics</h3>
                <p class="text-body-1">
                  Cuando nos visita, nuestros servidores recopilan automáticamente datos sobre su dirección IP. Cuando
                  usted solicita páginas de nuestro Sitio Web, nuestros servidores pueden registrar su dirección IP y,
                  a veces, su nombre de dominio. Asimismo, nuestros servidores pueden registrar la página remitente
                  que le haya enviado hasta nosotros (por ejemplo, otro sitio web o un motor de búsqueda); las páginas
                  que visite en este Sitio Web; el sitio web que visite después de éste; otra información sobre el
                  tipo de navegador web, de ordenador, de plataforma, de software relacionado y de ajustes que
                  utilice; los términos de búsqueda que haya introducido en este Sitio Web o en un sitio web
                  remitente; y otra actividad y otros datos sobre el uso del sitio web que nuestros servidores web
                  hayan registrado. Utilizamos esta información para la administración interna de nuestros sistemas,
                  para diagnosticar problemas con nuestros servidores y para administrar nuestro Sitio Web. Dicha
                  información también se puede utilizar para recabar información demográfica general, como el país de
                  origen y el proveedor de servicios de Internet. No se utiliza la Información Personal (incluidas
                  direcciones IP) para facilitar el contacto con usuarios que no han proporcionado sus datos de
                  contacto. Su dirección IP se puede utilizar para identificar la serie de clics que le ha llevado a
                  nuestro Sitio Web. Sin embargo, la Información Personal no se comparte con ninguna empresa de
                  marketing externa.
                </p>
                <h3 class="text-subtitle-1">Derechos de participación y no participación</h3>
                <p class="text-body-1">
                  Usted tiene derecho a “participar” y/o “no participar” en los diferentes usos que hacemos de su
                  Información Personal. Por ejemplo, quizá pueda elegir si desea recibir correspondencia de nosotros
                  y/o de otros proveedores de servicios. Su Información Personal no se compartirá con otros
                  proveedores de servicios a menos que usted lo autorice. Podrá optar por no recibir los correos
                  electrónicos promocionales de Futzo haciendo clic en el enlace de “no recibir” o “darse de baja”
                  incluido en los correos electrónicos que reciba.
                </p>
                <p class="text-body-1">
                  Tenga en cuenta que, aunque opte por no recibir correspondencia promocional de nosotros, podremos
                  ponernos en contacto con usted respecto a su relación, sus actividades, sus transacciones y sus
                  comunicaciones con nosotros.
                </p>
                <h3 class="text-subtitle-1">
                  Usar, difundir y compartir Información Personal Proveedores de servicios
                </h3>
                <p class="text-body-1">
                  Podemos recurrir a terceros para que nos ayuden a operar y mantener nuestro Sitio Web y a
                  proporcionar nuestros productos y servicios. También podemos compartir su información con nuestros
                  proveedores de servicios y otros terceros (“Partes Afiliadas”) que proporcionen productos o
                  servicios para este Sitio Web o a través de él o a nuestra empresa (como empresas de hospedaje de
                  sitios web o bases de datos, empresas de hospedaje de listas de direcciones, proveedores de
                  comunicaciones, proveedores de servicios de correo electrónico, empresas de análisis, empresas de
                  distribución, empresas de suministros, empresas de procesamiento de tarjetas de crédito y otros
                  proveedores de servicios similares que usen esa información en nuestro nombre).
                </p>
                <p class="text-body-1">
                  Por contrato, se impide a los proveedores de servicios externos utilizar o difundir la información
                  salvo que sea necesario para la prestación de servicios en nuestro nombre o para el cumplimiento de
                  requisitos legales.
                </p>
                <h3 class="text-subtitle-1">Estadísticas agregadas</h3>
                <p class="text-body-1">
                  Podemos difundir estadísticas agregadas de carácter no personal referidas al comportamiento de los
                  usuarios para medir el interés por, y el uso de, nuestro Sitio Web, así como e-mails a terceros en
                  forma de datos agregados, como patrones generales o informes demográficos que no describan ni
                  identifiquen a usuarios individuales. La información relacionada con las estadísticas agregadas será
                  recopilada mediante el uso de cookies de terceros y otros dispositivos de seguimiento externos.
                </p>
                <h3 class="text-subtitle-1">Difusiones exigidas por la Ley</h3>
                <p class="text-body-1">
                  Podemos difundir su Información Personal si así lo exigen la ley o una orden judicial o si lo
                  consideramos necesario (a) para cumplir con la Ley, una orden judicial o un decreto o para cumplir
                  procesos legales en los que nos veamos involucrados nosotros o nuestras Partes Afiliadas; (b) para
                  proteger y defender nuestros derechos y nuestra propiedad, el Sitio Web, a los usuarios del Sitio
                  Web y/o a nuestras Partes Afiliadas; o (c) para actuar según exijan las circunstancias con el fin de
                  proteger la seguridad de los usuarios de nuestro Sitio Web, la nuestra o la de terceros.
                </p>
                <h3 class="text-subtitle-1">Sitios web de terceros</h3>
                <p class="text-body-1">
                  Desde este Sitio Web quizá pueda visitar o enlazar con otros sitios web, incluidos otros sitios web
                  operados por nosotros o por terceros no afiliados. Esos sitios web pueden recopilar Información
                  Personal sobre usted y (dado que el presente Aviso de Privacidad no cubre las prácticas de esos
                  otros sitios web en relación con la información) debería leer las políticas/ avisos de privacidad de
                  esos otros sitios web para averiguar cómo tratan su Información Personal.
                </p>
                <h3 class="text-subtitle-1">Privacidad de los menores</h3>
                <p class="text-body-1">
                  Este Sitio Web no está dirigido a menores de trece años. No recopilamos intencionadamente
                  Información Personal de menores de trece años en nuestro Sitio Web. Si averiguamos que hemos
                  recibido inadvertidamente Información Personal de un visitante menor de trece años en nuestro Sitio
                  Web, eliminaremos la información de nuestros registros.
                </p>
                <h3 class="text-subtitle-1">Seguridad</h3>
                <p class="text-body-1">
                  Utilizamos las medidas de seguridad físicas, de gestión y técnicas estándar en el sector y
                  razonables desde el punto de vista comercial para proteger la integridad y la seguridad de su
                  Información Personal. También empleamos cifrado de Capa de sockets seguros (SSL) al transmitir
                  información confidencial. Si bien nos esforzamos por proteger la seguridad e integridad de la
                  Información Personal sensible proporcionada a este Sitio Web, dada la naturaleza inherente de
                  Internet como vehículo de comunicación global abierto, no podemos garantizar la seguridad de la
                  información durante su transmisión a través de Internet ni durante su almacenamiento en nuestros
                  sistemas o a nuestro cuidado de otro modo, frente a intrusiones de terceros, como por ejemplo
                  hackers.
                </p>
                <p class="text-body-1">
                  Si se pone en contacto con nosotros por correo electrónico o una función de “Datos de contacto” o
                  similar del Sitio Web, debe tener presente que su transmisión quizá no sea segura. Un tercero no
                  afiliado podría ver la información que envía por estos métodos mientras se encuentra en tránsito. No
                  asumimos responsabilidad alguna por la difusión de su información derivada de errores o acciones no
                  autorizadas de terceros durante la transmisión ni después de la misma.
                </p>
                <p class="text-body-1">
                  En el improbable caso de que creamos que la seguridad de su Información Personal en nuestra posesión
                  o bajo nuestro control se haya visto comprometida, procederemos a informarle al respecto. Si la
                  notificación es procedente, lo haremos a la mayor brevedad posible en las circunstancias
                  correspondientes, y (siempre que tengamos su dirección de correo electrónico) vía e-mail. Usted nos
                  autoriza a utilizar el correo electrónico como medio de notificación.
                </p>
                <h3 class="text-subtitle-1">Actualizaciones de nuestro Aviso de Privacidad</h3>
                <p class="text-body-1">
                  El presente Aviso de Privacidad puede sufrir cambios o actualizaciones eventualmente para reflejar
                  cambios en la ley, en nuestras prácticas de recopilación y uso de datos, las funciones de los
                  Servicios o los avances en la tecnología. Usted debe revisar el Aviso de Privacidad con regularidad
                  para saber si cambió desde la última vez que la consultó. Para ello, puede corroborar la “fecha de
                  vigencia” al comienzo del documento. Si continúa utilizando los Servicios, confirma que ha leído y
                  comprendido la última versión de la Política de privacidad. Si realizamos cambios importantes en la
                  Política, le avisaremos a través de un aviso emergente en la página, o por otros medios, para
                  ofrecerle la oportunidad de revisar los cambios antes de que entren en vigencia, según los
                  requisitos legales pertinentes.
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
