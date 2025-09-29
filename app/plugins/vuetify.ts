// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css';
import theme from '~/../config/vuetify/theme';
import defaults from '~/../config/vuetify/defaults';
import { VMaskInput } from 'vuetify/labs/VMaskInput';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as directives from 'vuetify/directives';

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components: {
      VMaskInput,
    },
    directives,
    ssr: true,
    theme,
    defaults,
  });
  app.vueApp.use(vuetify);
});
