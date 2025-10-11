import type { VuetifyOptions } from 'vuetify';
export const staticPrimaryColor = '#8C57FF';
const theme: VuetifyOptions['theme'] = {
  defaultTheme: 'light',
  themes: {
    light: {
      dark: false,
      colors: {
        primary: staticPrimaryColor,
        'on-primary': '#FFFFFF',
        'primary-darken-1': '#7E4EE6',
        secondary: '#8A8D93',
        'secondary-darken-1': '#7C7F84',
        'on-secondary': '#fff',
        success: '#56CA00',
        'success-darken-1': '#4DB600',
        'on-success': '#FFFFFF',
        info: '#16B1FF',
        'info-darken-1': '#149FE6',
        'on-info': '#fff',
        warning: '#FFB400',
        'warning-darken-1': '#E6A200',
        'on-warning': '#fff',
        error: '#FF4C51',
        'error-darken-1': '#E64449',
        'on-error': '#fff',
        background: '#f4f5fa',
        'on-background': '#2E263D',
        // background: '#F9FAFB',
        // 'on-background': '#475467',
        surface: '#FFFFFF',
        // 'on-surface': '#424242',
        'on-surface': '#2E263D',
        'grey-50': '#FAFAFA',
        'grey-100': '#F5F5F5',
        'grey-200': '#EEEEEE',
        'grey-300': '#E0E0E0',
        'grey-400': '#BDBDBD',
        'grey-500': '#9E9E9E',
        'grey-600': '#757575',
        'grey-700': '#616161',
        'grey-800': '#424242',
        'grey-900': '#212121',
        'perfect-scrollbar-thumb': '#dbdade',
        'skin-bordered-background': '#fff',
        'skin-bordered-surface': '#fff',
        'expansion-panel-text-custom-bg': '#fafafa',
        'track-bg': '#F0F2F8',
        'chat-bg': '#F7F6FA',
      },
      variables: {
        // 'border-color': '#D0D5DD',
        // 'medium-emphasis-opacity': 0.68,

        // Shadows
        'overlay-opacity': 'rgba(var(--v-theme-on-surface), 0.46)',
        'shadow-key-umbra-opacity': 'rgba(var(--v-theme-on-surface), 0.08)',
        'shadow-key-penumbra-opacity': 'rgba(var(--v-theme-on-surface), 0.12)',
        'shadow-key-ambient-opacity': 'rgba(var(--v-theme-on-surface), 0.04)',

        'code-color': '#d400ff',
        'overlay-scrim-background': '#2E263D',
        'tooltip-background': '#1A0E33',
        'overlay-scrim-opacity': 0.5,
        'hover-opacity': 0.04,
        'focus-opacity': 0.1,
        'selected-opacity': 0.08,
        'activated-opacity': 0.16,
        'pressed-opacity': 0.14,
        'dragged-opacity': 0.1,
        'disabled-opacity': 0.4,
        'border-color': '#2E263D',
        'border-opacity': 0.12,
        'table-header-color': '#F6F7FB',
        'high-emphasis-opacity': 0.9,
        'medium-emphasis-opacity': 0.7,

        // 👉 shadows
        'shadow-key-umbra-color': '#2E263D',
        'shadow-xs-opacity': '0.16',
        'shadow-sm-opacity': '0.18',
        'shadow-md-opacity': '0.20',
        'shadow-lg-opacity': '0.22',
        'shadow-xl-opacity': '0.24',
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: '#00C853', // Verde Futzo
        'on-primary': '#FFFFFF',
        'primary-darken-1': '#009B41',

        secondary: '#8A8D93',
        'secondary-darken-1': '#7C7F84',
        'on-secondary': '#FFFFFF',

        success: '#56CA00',
        'success-darken-1': '#4DB600',
        'on-success': '#FFFFFF',

        info: '#16B1FF',
        'info-darken-1': '#149FE6',
        'on-info': '#FFFFFF',

        warning: '#FFB400',
        'warning-darken-1': '#E6A200',
        'on-warning': '#FFFFFF',

        error: '#FF4C51',
        'error-darken-1': '#E64449',
        'on-error': '#FFFFFF',

        background: '#0F0F0F', // Fondo principal oscuro
        'on-background': '#F4F5FA', // Texto principal claro

        surface: '#1B1B1D', // Capa superficial (tarjetas, modales)
        'on-surface': '#E0E0E0',

        'grey-50': '#121212',
        'grey-100': '#1E1E1E',
        'grey-200': '#2A2A2A',
        'grey-300': '#3A3A3A',
        'grey-400': '#4A4A4A',
        'grey-500': '#6E6E6E',
        'grey-600': '#8A8D93',
        'grey-700': '#BDBDBD',
        'grey-800': '#D0D5DD',
        'grey-900': '#F4F5FA',

        'perfect-scrollbar-thumb': '#323232',
        'skin-bordered-background': '#1B1B1D',
        'skin-bordered-surface': '#1B1B1D',
        'expansion-panel-text-custom-bg': '#1E1E1E',
        'track-bg': '#141414',
        'chat-bg': '#161616',
      },

      variables: {
        // Transparencias y sombras adaptadas al fondo oscuro
        'overlay-opacity': 'rgba(255,255,255,0.08)',
        'shadow-key-umbra-opacity': 'rgba(0,0,0,0.24)',
        'shadow-key-penumbra-opacity': 'rgba(0,0,0,0.18)',
        'shadow-key-ambient-opacity': 'rgba(0,0,0,0.12)',

        'code-color': '#00FF90',
        'overlay-scrim-background': '#0F0F0F',
        'tooltip-background': '#1E1E1E',

        'overlay-scrim-opacity': 0.6,
        'hover-opacity': 0.08,
        'focus-opacity': 0.12,
        'selected-opacity': 0.1,
        'activated-opacity': 0.14,
        'pressed-opacity': 0.18,
        'dragged-opacity': 0.1,
        'disabled-opacity': 0.4,

        'border-color': '#2A2A2A',
        'border-opacity': 0.16,

        'table-header-color': '#161616',
        'high-emphasis-opacity': 0.95,
        'medium-emphasis-opacity': 0.75,

        'shadow-key-umbra-color': '#000000',
        'shadow-xs-opacity': '0.24',
        'shadow-sm-opacity': '0.26',
        'shadow-md-opacity': '0.28',
        'shadow-lg-opacity': '0.3',
        'shadow-xl-opacity': '0.32',
      },
    },
  },
};

export default theme;
