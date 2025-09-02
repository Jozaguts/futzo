import { defineNitroPlugin } from 'nitropack/runtime';

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html, { event }) => {
    // remove query string from url to avoid showing loader on email verification page
    const url = event.node.req.originalUrl.split('?')[0];
    if (url === '/verificar') return;

    // 1) Estilos críticos PRIMERO
    html.head.unshift(`
      <style id="loader-styles">
        :root {
          --initial-loader-bg: #ffffff;
          --initial-loader-color: #9155FD;
        }
        html, body { margin: 0; height: 100%; }
        html.loader-skip #loading-bg { display: none !important; }
        #loading-bg {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          z-index: 2147483647;
          display: grid;
          place-items: center;
          background: var(--initial-loader-bg);
        }
        @keyframes scaleAndFade {
          0% { transform: scale(.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animated-element { animation: scaleAndFade 0.8s ease-in-out; }
        .d-none { opacity: 0; pointer-events: none; transition: opacity .2s; }
      </style>
    `);

    // 2) Marcup del loader PRIMERO en body
    html.bodyPrepend.unshift(`
      <div id="loading-bg">
        <div class="loading-logo animated-element">
          <img src="/futzo/logos/circular/logo-22.png" height="180" alt="Logo" />
        </div>
      </div>
    `);

    // 3) El ocultado se maneja en plugin cliente; sin script inline aquí
  });
});
