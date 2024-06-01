import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'
import theme from './config/vuetify/theme'
import defaults from './config/vuetify/defaults'
export default defineVuetifyConfiguration({
    /* vuetify options */
    theme,
    defaults,
    icons: {
        defaultSet: 'mdi',
        sets: ['mdi'],
    }

})