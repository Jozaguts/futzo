import {createVuetify} from "vuetify";
import defaults from  '@/config/vuetify/defaults'
import { icons } from '@/config/vuetify/icons'
import { VBtn } from 'vuetify/components/VBtn'
import theme from '@/config/vuetify/theme'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    aliases: {
      IconBtn: VBtn,
    },
    icons,
    theme,
    defaults,
    components:{
      ...components
    },
    directives:{
      ...directives
    }
  })
  nuxtApp.vueApp.use(vuetify)
})
