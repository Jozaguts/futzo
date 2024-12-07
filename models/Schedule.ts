export type DatePickerAttributes = {
  position: "left" | "right";
  locale: "es" | "en";
  "min-date": Date;
  teleport: boolean;
  "hide-input-icon": boolean;
  "enable-time-picker": boolean;
  "month-name-format": string;
  ref: Ref;
  placeholder: string;
  ui: {
    input: string;
    menu: string;
    calendarCell: string;
  };
  "multi-calendars"?: { solo?: boolean };
  "v-model"?: Ref<Date> | Ref<[Date, Date]>;
  range?: boolean;
};

export interface Schedule {}

export type DatePosition = 1 | 2;
