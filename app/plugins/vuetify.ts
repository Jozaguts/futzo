// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css';
import theme from '~/../config/vuetify/theme';
import defaults from '~/../config/vuetify/defaults';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    theme,
    defaults,
  });
  app.vueApp.use(vuetify);
});
