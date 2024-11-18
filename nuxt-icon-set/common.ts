import type { IconAliases, IconSet } from "vuetify";
import { Icon } from "#components";

export const aliases = <IconAliases>{
  email: "i-mdi:calendar",
  collapse: "i-mdi:chevron-up",
  complete: "i-mdi:check",
  cancel: "i-mdi:close-circle",
  close: "i-mdi:close",
  delete: "i-mdi:close-circle",
  // delete (e.g. v-chip close)
  clear: "i-mdi:close-circle",
  success: "i-mdi:check-circle",
  info: "i-mdi:information",
  warning: "i-mdi:alert-circle",
  error: "i-mdi:close-circle",
  prev: "i-mdi:chevron-left",
  next: "i-mdi:chevron-right",
  checkboxOn: "i-mdi:checkbox-marked",
  checkboxOff: "i-mdi:checkbox-blank-outline",
  checkboxIndeterminate: "i-mdi:minus-box",
  delimiter: "i-mdi:circle",
  // for carousel
  sortAsc: "i-mdi:arrow-up",
  sortDesc: "i-mdi:arrow-down",
  expand: "i-mdi:chevron-down",
  menu: "i-mdi:menu",
  subgroup: "i-mdi:menu-down",
  dropdown: "i-mdi:menu-down",
  radioOn: "i-mdi:radiobox-marked",
  radioOff: "i-mdi:radiobox-blank",
  edit: "i-mdi:pencil",
  ratingEmpty: "i-mdi:star-outline",
  ratingFull: "i-mdi:star",
  ratingHalf: "i-mdi:star-half-full",
  loading: "i-mdi:cached",
  first: "i-mdi:page-first",
  last: "i-mdi:page-last",
  unfold: "i-mdi:unfold-more-horizontal",
  file: "i-mdi:paperclip",
  plus: "i-mdi:plus",
  minus: "i-mdi:minus",
  calendar: "i-mdi:calendar",
  test: "svgNuxtIcon:ball",
};

export function nuxtIcon(css: boolean): IconSet {
  const component = Icon;
  const mode = css ? "css" : "svg";
  return {
    // @ts-expect-error Parameter props implicitly has an any type.
    component: (props) => {
      // eslint-disable-next-line no-console
      const { icon, tag, ...rest } = props;
      return h(tag, rest, [
        h(component, {
          mode,
          name: aliases[icon as string] ?? icon,
          ...rest,
        }),
      ]);
    },
  } satisfies IconSet;
}
