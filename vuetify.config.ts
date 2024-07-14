import { defineVuetifyConfiguration } from "vuetify-nuxt-module/custom-configuration";
import theme from "./config/vuetify/theme";
import defaults from "./config/vuetify/defaults";

export default defineVuetifyConfiguration({
  aliases: {
    VDefaultCard: "VCard",
  },
  theme,
  defaults,
  icons: {
    defaultSet: "mdi",
    sets: ["mdi"],
  },
});
