
export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('render:html', (html, { event }) => {
        // This will be an object representation of the html template.
        // const loaderColor  = window.localStorage('futzo-initial-loader-bg') ?? '#FFFFFF'
        // const primaryColor = window.localStorage('futzo-initial-loader-color') ?? '#9155FD'
        html.bodyPrepend.push(`<div id="loading-bg">
            <div class="loading-logo">
                <img src="/logo.png" height="80" alt="Logo" />
                <h1 class="text-center">Futzo</h1>  
            </div>
            <div class="loading">
                <div class="effect-1 effects"></div>
                <div class="effect-2 effects"></div>
                <div class="effect-3 effects"></div>
            </div>
        </div>`)
        html.head.push(`
        <script async>
        window.addEventListener('load', function () {
            document.querySelector('#loading-bg').classList.add('d-none')
        })
        </script>`);
    })
})