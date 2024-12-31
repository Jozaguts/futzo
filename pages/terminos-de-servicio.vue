<script lang="ts" setup>
definePageMeta({
    layout: "blank",
    bodyAttrs: {
        class: "d-none",
    },
    sanctum: {
        excluded: true,
    },
});
</script>

<template>
    <v-container fluid class="fill-height py-0">
        <v-row class="fill-height">
            <v-col cols="2">
                <v-navigation-drawer>
                    <v-list-item title="Futzo" subtitle="Terminos de servicio"></v-list-item>
                    <v-divider></v-divider>
                    <v-list-item link title="List Item 1"></v-list-item>
                    <v-list-item link title="List Item 2"></v-list-item>
                    <v-list-item link title="List Item 3"></v-list-item>
                </v-navigation-drawer>
            </v-col>
            <v-col cols="10" class="d-flex justify-center align-center">
                <v-container>
                    <v-row>
                        <v-col cols="12">Última actualización: 01-Ene-2025</v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <h1>Terminos de servicio</h1>
                            <div class="term-container">
                                <span class="text-h6">
                                1. Introducción
                           </span>
                                <p class="text-body-1">
                                    Bienvenido a Futzo, un sistema de gestión diseñado para facilitar la administración
                                    de
                                    ligas
                                    deportivas y sus respectivas actividades. Al utilizar la plataforma Futzo (en
                                    adelante,
                                    “el
                                    Servicio”), usted acepta cumplir con los términos descritos en este documento. Si no
                                    está de
                                    acuerdo con estos términos, debe abstenerse de utilizar el Servicio.
                                </p>
                            </div>
                            <div class="term-container">
                                <span class="text-h6">
                                2. Definiciones
                            </span>
                                <ul class="term-list">
                                    <li class="term-list-item">
                                        Usuario: Persona que accede al Servicio, ya sea como administrador de liga,
                                        equipo,
                                        jugador,
                                    </li>
                                    <li class="term-list-item">
                                        árbitro o cualquier otro rol.
                                    </li>
                                    <li class="term-list-item">
                                        Liga: Conjunto organizado de equipos y torneos registrados en la plataforma.
                                    </li>
                                    <li class="term-list-item">
                                        Torneo: Competencia dentro de una liga, administrada a través del Servicio.
                                    </li>
                                    <li class="term-list-item">
                                        Contenido: Datos ingresados por los usuarios, incluyendo información de equipos,
                                        jugadores y
                                        partidos.
                                    </li>
                                    <li class="term-list-item">
                                        Administrador: Usuario con permisos para gestionar la liga y sus actividades.
                                    </li>
                                    <li class="term-list-item">
                                        Jugador: Usuario registrado en la plataforma como miembro de un equipo.
                                    </li>
                                    <li class="term-list-item">
                                        Equipo: Grupo de jugadores registrados en la plataforma.
                                    </li>
                                    <li class="term-list-item">
                                        Partido: Encuentro entre dos equipos, programado y registrado en la plataforma.
                                    </li>
                                    <li class="term-list-item">
                                        Servicio: Plataforma Futzo y sus funcionalidades.
                                    </li>
                                </ul>
                            </div>
                            <div class="term-container">
                                <span class="text-h6">3. Uso del Servicio</span>
                                <p class="term-list-item">
                                    3.1. Acceso y Registro: Los usuarios deben proporcionar información precisa y
                                    completa al
                                    registrarse. El incumplimiento puede resultar en la suspensión de la cuenta.
                                </p>
                                <p class="term-list-item">
                                    3.2. Roles y Permisos: Cada usuario tendrá permisos específicos según su rol
                                    asignado
                                    (por
                                    ejemplo, administrador de liga, jugador).
                                </p>
                                <p class="text-body-1">
                                    3.3. Restricciones: Queda prohibido:
                                </p>
                                <ul class="term-list">
                                    <li class="term-list-item">
                                        Utilizar la plataforma para actividades ilícitas o fraudulentas.
                                    </li>
                                    <li class="term-list-item">
                                        Intentar acceder, alterar o destruir datos de otros usuarios sin autorización.
                                    </li>
                                    <li class="term-list-item">
                                        Publicar contenido ofensivo, discriminatorio o inapropiado.
                                    </li>
                                    <li class="term-list-item">
                                        Compartir credenciales de acceso con terceros.
                                    </li>
                                    <li class="term-list-item">
                                        Utilizar la plataforma para enviar spam o correos no deseados.
                                    </li>
                                    <li class="term-list-item">
                                        Violación de derechos de autor o propiedad intelectual.
                                    </li>
                                    <li class="term-list-item">
                                        Realizar ingeniería inversa, descompilación o desensamblaje del Servicio.
                                    </li>
                                    <li class="term-list-item">
                                        Utilizar bots, scripts o cualquier otro método automatizado para acceder al
                                        Servicio.
                                    </li>
                                    <li class="term-list-item">
                                        Utilizar la plataforma para actividades que puedan afectar su rendimiento o
                                        estabilidad.
                                    </li>
                                    <li class="term-list-item">
                                        Compartir información personal de otros usuarios sin su consentimiento.
                                    </li>
                                </ul>
                                <p class="text-body-1">
                                    3.4. Actualizaciones y Mantenimiento: Futzo se reserva el derecho de realizar
                                    actualizaciones
                                    y
                                    mantenimiento en el Servicio sin previo aviso. Los usuarios serán notificados de
                                    cualquier
                                    interrupción programada.
                                </p>
                                <p class="text-body-1">
                                    3.5. Suspensión y Cancelación: Futzo se reserva el derecho de suspender o cancelar
                                    cuentas
                                    que
                                    infrinjan los términos de uso. Los usuarios pueden solicitar la eliminación de su
                                    cuenta en
                                    cualquier momento.
                                </p>
                                <p class="text-body-1">
                                    3.6. Responsabilidad del Usuario: Los usuarios son responsables de mantener la
                                    confidencialidad de sus credenciales de acceso y de cualquier actividad realizada en
                                    su
                                    cuenta.
                                </p>
                                <p class="text-body-1">
                                    3.7. Soporte Técnico: Futzo proporcionará soporte técnico a los usuarios para
                                    resolver
                                    problemas relacionados con el Servicio.
                                </p>
                                <p class="text-body-1">
                                    3.8. Comunicación: Los usuarios aceptan recibir comunicaciones de Futzo, incluyendo
                                    correos
                                    electrónicos, notificaciones y mensajes en la plataforma.
                                </p>
                                <p class="text-body-1">
                                    3.9. Modificaciones: Futzo se reserva el derecho de modificar estos términos en
                                    cualquier
                                    momento. Los usuarios serán notificados de los cambios y deberán aceptarlos para
                                    continuar
                                    utilizando el Servicio.
                                </p>
                            </div>
                            <div class="term-container">
                                <span class="text-h6">
                                4. Contenido Generado por el Usuario
                            </span>
                                <p class="text-body-1">
                                    Los usuarios son responsables del contenido que ingresen en la plataforma. Futzo no
                                    asume
                                    responsabilidad por errores o inexactitudes en los datos proporcionados por los
                                    usuarios.
                                </p>
                                <p class="text-body-1">
                                    4.1. Propiedad del Contenido: Los usuarios conservan la propiedad de los datos
                                    ingresados
                                    en
                                    la plataforma. Futzo no reclama derechos de propiedad sobre el contenido generado
                                    por los
                                    usuarios.
                                </p>
                                <p class="text-body-1">
                                    4.2. Licencia de Uso: Al ingresar contenido en la plataforma, los usuarios otorgan
                                    a
                                    Futzo una
                                    licencia no exclusiva para utilizar, modificar y distribuir dicho contenido en el
                                    Servicio.
                                </p>
                                <p class="text-body-1">
                                    4.3. Eliminación de Contenido: Futzo se reserva el derecho de eliminar contenido
                                    que
                                    infrinja los términos de uso o que sea considerado inapropiado.
                                </p>
                                <p class="text-body-1">
                                    4.4. Respaldo de Datos: Los usuarios son responsables de realizar copias de
                                    seguridad
                                    de
                                    su contenido en caso de pérdida o eliminación accidental.
                                </p>
                                <p class="text-body-1">
                                    4.5. Publicidad y Promoción: Futzo se reserva el derecho de utilizar el contenido
                                    generado por los usuarios con fines publicitarios y promocionales.
                                </p>
                                <p class="text-body-1">
                                    4.6. Protección de Datos: Futzo implementará medidas de seguridad para proteger la
                                    privacidad y confidencialidad de los datos de los usuarios.
                                </p>
                                <p class="text-body-1">
                                    4.7. Acceso a Datos: Los usuarios pueden acceder, modificar o eliminar su
                                    contenido
                                    en
                                    cualquier momento a través de la plataforma.
                                </p>
                                <p class="text-body-1">
                                    4.8. Retención de Datos: Futzo retendrá los datos de los usuarios durante el
                                    tiempo
                                    necesario para cumplir con sus obligaciones legales y contractuales.
                                </p>
                            </div>
                            <div class="term-container">
                                <span class="text-h6">
                                5. Pagos y Tarifas
                            </span>
                                <p class="text-body-1">
                                    Cualquier pago realizado a través del Servicio está sujeto a las políticas
                                    específicas
                                    de la
                                    plataforma. No se aceptan devoluciones, excepto en los casos definidos en nuestra
                                    Política de
                                    Reembolsos.
                                </p>
                                <p class="text-body-1">
                                    5.1. Métodos de Pago: Los usuarios pueden realizar pagos a través de tarjetas de
                                    crédito,
                                    débito, transferencias bancarias u otros métodos aceptados por la plataforma.
                                </p>
                                <p class="text-body-1">
                                    5.2. Facturación: Los usuarios recibirán facturas por los servicios contratados a
                                    través
                                    de la
                                    plataforma. Las facturas deben ser pagadas en la fecha de vencimiento indicada.
                                </p>
                                <p class="text-body-1">
                                    5.3. Renovación Automática: Algunos servicios pueden estar sujetos a renovación
                                    automática, a menos que el usuario cancele la suscripción antes de la fecha de
                                    vencimiento.
                                </p>
                                <p class="text-body-1">
                                    5.4. Cancelación de Servicios: Los usuarios pueden cancelar los servicios en
                                    cualquier
                                    momento a través de la plataforma. No se realizarán reembolsos por servicios
                                    cancelados.
                                </p>
                                <p class="text-body-1">
                                    5.5. Impuestos: Los usuarios son responsables de pagar los impuestos aplicables a
                                    los
                                    servicios contratados a través de la plataforma.
                                </p>
                            </div>
                            <div class="term-container">
                            <span class="text-h6">
                              6. Propiedad Intelectual
                                </span>
                                <p class="text-body-1">
                                    Todos los derechos relacionados con el diseño, código fuente, funcionalidad y marca
                                    de
                                    Futzo pertenecen exclusivamente a futzo.io Se prohíbe la reproducción, distribución
                                    o
                                    modificación del Servicio sin autorización previa.
                                </p>
                                <p class="text-body-1">
                                    6.1. Marcas Registradas: Futzo es una marca registrada de futzo.io. Se prohíbe el
                                    uso
                                    no autorizado de la marca en cualquier contexto.
                                </p>
                                <p class="text-body-1">
                                    6.2. Derechos de Autor: Todos los contenidos publicados en la plataforma están
                                    protegidos por derechos de autor. Se prohíbe la reproducción o distribución sin
                                    autorización.
                                </p>
                                <p class="text-body-1">
                                    6.3. Licencia de Uso: Los usuarios reciben una licencia limitada para utilizar el
                                    Servicio de acuerdo con los términos establecidos en este documento.
                                </p>
                                <p>
                                    6.4. Contenido de Terceros: Futzo puede incluir contenido de terceros en la
                                    plataforma, sujeto a los términos y condiciones de uso de los proveedores.
                                </p>
                                <p class="text-body-1">
                                    6.5. Notificación de Infracción: Si un usuario considera que su propiedad
                                    intelectual
                                    ha sido infringida en la plataforma, debe notificar a Futzo para tomar las medidas
                                    correspondientes.
                                </p>
                                <p>
                                    6.6. Protección de Datos: Futzo implementará medidas de seguridad para proteger la
                                    privacidad y confidencialidad de los datos de los usuarios.
                                </p>

                            </div>
                            <div class="term-container">
                            <span class="text-h6">
                                7. Limitación de Responsabilidad
                            </span>
                                <p class="text-body-1">
                                    Futzo no será responsable por:
                                </p>
                                <ul class="term-list">
                                    <li class="term-list-item">
                                        Pérdida de datos ocasionada por errores del usuario o problemas técnicos.
                                    </li>
                                    <li class="term-list-item">
                                        Interrupciones del servicio causadas por eventos fuera de nuestro control.
                                    </li>
                                    <li class="term-list-item">
                                        Daños indirectos, incidentales o consecuentes derivados del uso del Servicio.
                                    </li>
                                    <li class="term-list-item">
                                        Contenido generado por los usuarios que infrinja derechos de terceros.
                                    </li>
                                    <li class="term-list-item">
                                        Pérdidas financieras o daños a la reputación causados por el uso del Servicio.
                                    </li>
                                    <li class="term-list-item">
                                        Errores u omisiones en la información proporcionada en la plataforma.
                                    </li>
                                    <li class="term-list-item">
                                        Daños causados por virus, malware u otros elementos perjudiciales en la
                                        plataforma.
                                    </li>
                                </ul>
                            </div>
                            <div class="term-container">
                            <span class="text-h6">
                                8. Modificaciones a los Términos
                            </span>
                                <p class="text-body-1">
                                    Nos reservamos el derecho de modificar estos Términos en cualquier momento. Los
                                    cambios
                                    se
                                    notificarán a través de la plataforma con al menos 15 días de antelación.
                                </p>
                                <p class="text-body-1">
                                    8.1. Aceptación de los Términos: Los usuarios deberán aceptar los nuevos términos
                                    para
                                    continuar utilizando el Servicio. El uso continuado de la plataforma se considerará
                                    como
                                    aceptación de los cambios.
                                </p>
                                <p class="text-body-1">
                                    8.2. Notificación de Cambios: Futzo se compromete a informar a los usuarios de
                                    cualquier
                                    modificación en los términos a través de la plataforma y otros medios de
                                    comunicación
                                    disponibles.
                                </p>
                                <p>
                                    8.3. Consultas: Para consultas relacionadas con estos términos, por favor
                                    contáctenos
                                    a
                                    través de: Correo electrónico: <a
                                    href="mailto:soporte@futzo.io">soporte@futzo.io></a>
                                </p>
                                <p>
                                    8.4. Legislación Aplicable: Estos términos se rigen por las leyes de la República
                                    de
                                    Mexico.
                                </p>

                            </div>
                            <div class="term-container">
                            <span class="text-h6">
                                9. Contacto
                            </span>
                                <p class="text-body-1">
                                    Para consultas relacionadas con estos términos, por favor contáctenos a través de:
                                </p>
                                <p class="text-body-1">
                                    Correo electrónico:
                                    <a href="mailto:soporte@futzo.io">
                                        soporte@futzo.io</a>
                                </p>
                            </div>
                        </v-col>

                    </v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>
<style lang="scss">
.term-container {
    padding: 20px;
}

.term-list {
    list-style-type: disc;
    padding-left: 20px;
}

.term-list-item {
    margin-bottom: 10px;
}
</style>
