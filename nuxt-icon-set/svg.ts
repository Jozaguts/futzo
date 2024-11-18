import { aliases, nuxtIcon } from "./common";

const defaultSet = "svgNuxtIcon";
const svgNuxtIcon = nuxtIcon(false);

const icons = {
  defaultSet,
  aliases,
  sets: { svgNuxtIcon },
} satisfies import("vuetify").IconOptions;

export { icons };
