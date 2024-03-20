
export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('render:html', (html, { event }) => {
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
        })
        </script>`);
    })
})