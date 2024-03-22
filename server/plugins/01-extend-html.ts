
export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('render:html', (html, { event }) => {
        html.head.push(`
        <style id="loader-styles">
        root {
            --initial-loader-bg: #9155FD;
            --initial-loader-color: #9155FD;
        }
        body {
          margin: 0;
        }
        html {
          /*overflow-x: hidden;*/
          /*overflow-y: hidden;*/
        }
        #loading-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        @keyframes scaleAndFade {
            0% {
                transform: scale(.9);
                opacity: 0;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
        .animated-element {
          animation: scaleAndFade 1s ease-in-out;
        }
        .d-none {
            display: none;
        }
        </style>
        `)
        html.bodyPrepend.push(`
            <div id="loading-bg">
            <div class="loading-logo animated-element">
                <img src="/futzo/logos/circular/logo-22.png" height="180" alt="Logo" />
            </div>
            </div>`)
        html.head.push(`
        <script async>
        window.addEventListener('load', function () {
            
            document.querySelector('#loading-bg').classList.add('d-none')
            document.querySelector('#loader-styles').remove()
        })
        </script>`);
    })
})