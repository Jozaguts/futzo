export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (err, vm, info) => {
    // Manejo personalizado de errores
    console.error('Error capturado:', err);
    console.error('Componente:', vm);
    console.error('Info adicional:', info);
    // Aquí puedes agregar lógica adicional, como enviar errores a un servicio de monitoreo
  };

  nuxtApp.hook('app:error', (error) => {
    // Manejo de errores a nivel de aplicación
    console.error('Error en la aplicación:', error);
    // Aquí puedes agregar lógica adicional, como enviar errores a un servicio de monitoreo
  });
});
