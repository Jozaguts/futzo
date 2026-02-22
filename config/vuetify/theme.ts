import type {VuetifyOptions} from 'vuetify';

export const staticPrimaryColor = '#9155FD'        // purple-500 — color de marca
export const staticPrimaryDarkenColor = '#673CB4'  // purple-700

const theme: VuetifyOptions['theme'] = {
  defaultTheme: 'light',
  themes: {

    // ═══════════════════════════════════════════════════════════════════════════
    //  LIGHT THEME
    //  Jerarquía: background(gris muy suave) < surface(blanco) < surface-variant(dark brand)
    // ═══════════════════════════════════════════════════════════════════════════
    light: {
      dark: false,
      colors: {
        // ── Brand ──────────────────────────────────────────────────────────────
        'primary':              '#9155FD',  // purple-500
        'on-primary':           '#FFFFFF',
        'primary-darken-1':     '#673CB4',  // purple-700 — hover/pressed

        'secondary':            '#8A8D93',
        'secondary-darken-1':   '#7C7F84',
        'on-secondary':         '#FFFFFF',

        // ── Semánticos ─────────────────────────────────────────────────────────
        'success':              '#3DAB6F',  // verde esmeralda sobrio (no neón)
        'success-darken-1':     '#2E8A57',
        'on-success':           '#FFFFFF',

        'info':                 '#3B82B8',  // azul índigo suave (toque violáceo de marca)
        'info-darken-1':        '#2D6A9A',
        'on-info':              '#FFFFFF',

        'warning':              '#D97706',  // ámbar cálido (no amarillo flúor)
        'warning-darken-1':     '#B86004',
        'on-warning':           '#FFFFFF',

        'error':                '#C0392B',  // rojo carmesí sobrio (no coral neón)
        'error-darken-1':       '#A52D20',
        'on-error':             '#FFFFFF',

        // ── Jerarquía de superficies (light) ───────────────────────────────────
        //
        //  background    → lienzo base de la app, ligeramente gris
        //                  Uso: body, main layout wrapper, página vacía
        //
        //  surface       → componentes elevados sobre el background
        //                  Uso: v-card, v-dialog, v-data-table, v-sheet
        //                  Es BLANCO para máximo contraste vs background gris
        //
        //  surface-variant → zona de navegación global, diferente del surface
        //                  Uso: v-app-bar, v-navigation-drawer, v-toolbar
        //                  En light = oscuro (brand dark), crea contraste visual
        //                  fuerte que indica "zona de navegación global"
        //
        //  on-surface-variant → texto/iconos SOBRE surface-variant
        //                  Como surface-variant es oscuro (#28243D),
        //                  el contenido debe ser claro (#DDCAFE)
        //
        //  surface-bright → elementos flotantes por encima del surface
        //                  Uso: v-menu, v-tooltip, popovers, chips hover
        //
        //  surface-light  → fondo de hover, filas seleccionadas, chips sutiles
        //                  Uso: estados interactivos sobre surface
        //
        'background':           '#F4F5FA',  // gris muy suave — lienzo base
        'on-background':        '#2E263D',  // texto principal sobre background

        'surface':              '#FFFFFF',  // blanco — cards, panels, tablas
        'on-surface':           '#2E263D',  // texto sobre surface (mismo hue que bg)

        'surface-bright':       '#FFFFFF',  // igual que surface en light
        'surface-light':        '#F4EEFF',  // purple-50 — hover/selección sutil

        'surface-variant':      '#28243D',  // dark brand — navbar, sidebar
        'on-surface-variant':   '#DDCAFE',  // purple-100 — texto sobre nav oscura

        // ── Escala de grises ────────────────────────────────────────────────────
        'grey-50':              '#FAFAFA',
        'grey-100':             '#F5F5F5',
        'grey-200':             '#EEEEEE',
        'grey-300':             '#E0E0E0',
        'grey-400':             '#BDBDBD',
        'grey-500':             '#9E9E9E',
        'grey-600':             '#757575',
        'grey-700':             '#616161',
        'grey-800':             '#424242',
        'grey-900':             '#212121',

        // ── Tokens custom (compatibilidad con template existente) ───────────────
        'perfect-scrollbar-thumb':        '#DBDADE',
        'skin-bordered-background':       '#FFFFFF',
        'skin-bordered-surface':          '#FFFFFF',
        'expansion-panel-text-custom-bg': '#FAFAFA',
        'track-bg':                       '#F0F2F8',
        'chat-bg':                        '#F7F6FA',
      },

      variables: {
        // Transparencias de interacción
        'hover-opacity':            0.04,
        'focus-opacity':            0.10,
        'selected-opacity':         0.08,
        'activated-opacity':        0.16,
        'pressed-opacity':          0.14,
        'dragged-opacity':          0.10,
        'disabled-opacity':         0.40,

        // Bordes — usan on-surface como base
        'border-color':             '#2E263D',
        'border-opacity':           0.10,   // más sutil que el default 0.12

        // Énfasis de texto
        'high-emphasis-opacity':    0.90,
        'medium-emphasis-opacity':  0.70,

        // Overlays y tooltips
        'overlay-scrim-background': '#2E263D',
        'overlay-scrim-opacity':    0.50,
        'tooltip-background':       '#1A0E33',

        // Tabla
        'table-header-color':       '#F6F7FB',

        // Sombras — usan el dark brand como color base
        'shadow-key-umbra-color':   '#2E263D',
        'shadow-xs-opacity':        '0.14',
        'shadow-sm-opacity':        '0.16',
        'shadow-md-opacity':        '0.18',
        'shadow-lg-opacity':        '0.20',
        'shadow-xl-opacity':        '0.22',

        // Código
        'code-color':               '#7E4EE6',
      },
    },


    // ═══════════════════════════════════════════════════════════════════════════
    //  DARK THEME
    //
    //  REGLA CLAVE: a mayor elevación = más claro
    //  Esto crea la ilusión de profundidad sin necesitar sombras fuertes.
    //
    //  Jerarquía de profundidad (oscuro → claro):
    //  #1E1A2E  →  #28243D  →  #312D4B  →  #3D3762  →  #4A4465
    //  (más     →    bg     →  surface  →  surface  →  surface
    //  profundo)              (cards)    (bright)    (hover)
    //
    //  surface-variant (#1E1A2E) es MÁS OSCURO que background (#28243D)
    //  porque navbar/sidebar son zonas persistentes que deben "retroceder"
    //  visualmente, dejando que el contenido principal (cards) sea el foco.
    // ═══════════════════════════════════════════════════════════════════════════
    dark: {
      dark: true,
      colors: {
        // ── Brand ──────────────────────────────────────────────────────────────
        'primary':              '#9155FD',  // mismo primary — suficiente contraste en dark
        'on-primary':           '#FFFFFF',
        'primary-darken-1':     '#B58DFE',  // purple-300 — más claro para dark mode

        'secondary':            '#8A8D93',
        'secondary-darken-1':   '#A1A4A9',
        'on-secondary':         '#FFFFFF',

        // ── Semánticos dark (mismos hues, mayor luminosidad para contraste) ─────
        'success':              '#5DBF87',  // verde esmeralda clareado
        'success-darken-1':     '#3DAB6F',
        'on-success':           '#FFFFFF',

        'info':                 '#6AAFD6',  // azul índigo clareado
        'info-darken-1':        '#3B82B8',
        'on-info':              '#FFFFFF',

        'warning':              '#F59E42',  // ámbar clareado
        'warning-darken-1':     '#D97706',
        'on-warning':           '#1A1028',  // oscuro sobre warning claro

        'error':                '#E05A52',  // carmesí clareado
        'error-darken-1':       '#C0392B',
        'on-error':             '#FFFFFF',

        // ── Jerarquía de superficies (dark) ────────────────────────────────────
        //
        //  IMPORTANTE: En dark mode la jerarquía se INVIERTE respecto a light.
        //  Los componentes más "elevados" (encima del usuario) son MÁS CLAROS.
        //
        //  surface-variant (#1E1A2E) → MÁS OSCURO que background
        //    Razón: sidebar/navbar son zonas de soporte, deben "hundirse"
        //    visualmente para que el contenido principal destaque.
        //    Esta diferencia crea el contraste que ves en la imagen:
        //    sidebar oscura vs área de contenido más clara.
        //
        //  background (#28243D)     → tono medio, lienzo base
        //
        //  surface (#312D4B)        → MÁS CLARO que background
        //    Razón: cards y paneles "flotan" sobre el background.
        //    La diferencia de tono comunica elevación sin necesitar sombras.
        //
        //  surface-bright (#3D3762) → aún más claro, para overlays flotantes
        //    Uso: v-menu, dropdowns, tooltips, modales
        //
        //  surface-light (#3D3762)  → hover/selección sobre surface
        //
        'background':           '#28243D',  // dark base de marca — lienzo principal
        'on-background':        '#E7E3FC',  // purple-50 suave — texto sobre bg

        'surface':              '#312D4B',  // más claro que bg — cards y paneles
        'on-surface':           '#E7E3FC',  // texto sobre surface

        'surface-bright':       '#3D3762',  // más claro aún — modales/overlays
        'surface-light':        '#3D3762',  // hover states sobre surface

        'surface-variant':      '#1E1A2E',  // MÁS OSCURO que bg — sidebar/navbar
        'on-surface-variant':   '#B58DFE',  // purple-300 — texto sobre nav oscura

        // ── Grises dark (con tinte púrpura de marca, NO grises puros) ──────────
        //  Usar grises con tinte crea cohesión con la paleta de marca.
        //  Grises puros (#121212, #1E1E1E) hacen el dark theme genérico.
        'grey-50':              '#1E1A2E',  // = surface-variant
        'grey-100':             '#28243D',  // = background
        'grey-200':             '#312D4B',  // = surface
        'grey-300':             '#3D3762',  // = surface-bright
        'grey-400':             '#4A4465',
        'grey-500':             '#6B6584',
        'grey-600':             '#8A8D93',
        'grey-700':             '#B1B3B7',
        'grey-800':             '#DBDCDE',
        'grey-900':             '#F4F5FA',

        // ── Tokens custom (dark) ────────────────────────────────────────────────
        'perfect-scrollbar-thumb':        '#3D3762',
        'skin-bordered-background':       '#312D4B',
        'skin-bordered-surface':          '#312D4B',
        'expansion-panel-text-custom-bg': '#28243D',
        'track-bg':                       '#1E1A2E',
        'chat-bg':                        '#231F38',
      },

      variables: {
        // Interacción — levemente más notables en dark para mayor feedback visual
        'hover-opacity':            0.08,
        'focus-opacity':            0.12,
        'selected-opacity':         0.10,
        'activated-opacity':        0.16,
        'pressed-opacity':          0.18,
        'dragged-opacity':          0.10,
        'disabled-opacity':         0.40,

        // Bordes — usan primary como color base en dark para coherencia de marca
        'border-color':             '#9155FD',
        'border-opacity':           0.12,

        // Énfasis de texto — ligeramente mayor en dark para compensar el contraste
        'high-emphasis-opacity':    0.95,
        'medium-emphasis-opacity':  0.75,

        // Overlays y tooltips
        'overlay-scrim-background': '#1E1A2E',
        'overlay-scrim-opacity':    0.60,
        'tooltip-background':       '#1E1A2E',

        // Tabla
        'table-header-color':       '#231F38',

        // Sombras — en dark deben ser más notables (fondos ya son oscuros)
        'shadow-key-umbra-color':   '#1E1A2E',
        'shadow-xs-opacity':        '0.22',
        'shadow-sm-opacity':        '0.24',
        'shadow-md-opacity':        '0.26',
        'shadow-lg-opacity':        '0.28',
        'shadow-xl-opacity':        '0.30',

        // Código
        'code-color':               '#B58DFE',
      },
    },
  }
};

export default theme;
