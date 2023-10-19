
<script lang="ts">
import logo from '@/assets/logo.svg?raw'
import {useGlobalStore} from "~/store";
import PerfectScrollbar from 'vue3-perfect-scrollbar'

import { syncRefs } from '@vueuse/core'
const isVerticalNavScrolled = ref(false)
const handleNavScroll = (evt: Event) => {
  isVerticalNavScrolled.value = (evt.target as HTMLElement).scrollTop > 0
}

import VerticalNav from "~/components/VerticalNav.vue";
import { useDisplay } from 'vuetify'
import { h } from 'vue'
export default defineComponent({
  setup(props, {slots}){
    const isOverlayNavActive = ref(false)
    const isLayoutOverlayVisible = ref(false)
    const toggleIsOverlayNavActive = useToggle(isOverlayNavActive)

    const route = useRoute()
    const { mdAndDown } = useDisplay()
    syncRefs(isOverlayNavActive, isLayoutOverlayVisible)

    return () => {
      // 👉 Vertical nav
      const verticalNav = h(
          VerticalNav,
          { isOverlayNavActive: isOverlayNavActive.value, toggleIsOverlayNavActive },
          {
            'nav-header': () => slots['vertical-nav-header']?.(),
            'before-nav-items': () => slots['before-vertical-nav-items']?.(),
            'default': () => slots['vertical-nav-content']?.(),
            'after-nav-items': () => slots['after-vertical-nav-items']?.(),
          },
      )

      // 👉 Navbar
      const navbar = h(
          'header',
          { class: ['layout-navbar navbar-blur'] },
          [
            h(
                'div',
                { class: 'navbar-content-container' },
                slots.navbar?.({
                  toggleVerticalOverlayNavActive: toggleIsOverlayNavActive,
                }),
            ),
          ],
      )

      const main = h(
          'main',
          { class: 'layout-page-content' },
          h('div', { class: 'page-content-container' }, slots.default?.()),
      )

      // 👉 Footer
      const footer = h(
          'footer',
          { class: 'layout-footer' },
          [
            h(
                'div',
                { class: 'footer-content-container' },
                slots.footer?.(),
            ),
          ],
      )

      // 👉 Overlay
      const layoutOverlay = h(
          'div',
          {
            class: ['layout-overlay', { visible: isLayoutOverlayVisible.value }],
            onClick: () => { isLayoutOverlayVisible.value = !isLayoutOverlayVisible.value },
          },
      )

      return h(
          'div',
          {
            class: [
              'layout-wrapper layout-nav-type-vertical layout-navbar-static layout-footer-static layout-content-width-fluid',
              mdAndDown.value && 'layout-overlay-nav',
              route.meta.layoutWrapperClasses,
            ],
          },
          [
            verticalNav,
            h(
                'div',
                { class: 'layout-content-wrapper' },
                [
                  navbar,
                  main,
                  footer,
                ],
            ),
            layoutOverlay,
          ],
      )
    }
  }
})
</script>
<style scoped lang="scss">
@use "@/assets/scss/variables" as variables;
@use "@/assets/scss/mixins";
.layout-vertical-nav {
  position: fixed;
  z-index: variables.$layout-vertical-nav-z-index;
  display: flex;
  flex-direction: column;
  block-size: 100%;
  inline-size: variables.$layout-vertical-nav-width;
  inset-block-start: 0;
  inset-inline-start: 0;
  transition: transform 0.25s ease-in-out, inline-size 0.25s ease-in-out, box-shadow 0.25s ease-in-out;
  will-change: transform, inline-size;

  .nav-header {
    display: flex;
    align-items: center;

    .header-action {
      cursor: pointer;
    }
  }

  .app-title-wrapper {
    margin-inline-end: auto;
  }

  .nav-items {
    block-size: 100%;

    // ℹ️ We no loner needs this overflow styles as perfect scrollbar applies it
    // overflow-x: hidden;

    // // ℹ️ We used `overflow-y` instead of `overflow` to mitigate overflow x. Revert back if any issue found.
    // overflow-y: auto;
  }

  .nav-item-title {
    overflow: hidden;
    margin-inline-end: auto;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  // 👉 Collapsed
  .layout-vertical-nav-collapsed & {
    &:not(.hovered) {
      inline-size: variables.$layout-vertical-nav-collapsed-width;
    }
  }

  // 👉 Overlay nav
  &.overlay-nav {
    &:not(.visible) {
      transform: translateX(-#{variables.$layout-vertical-nav-width});

      @include mixins.rtl {
        transform: translateX(variables.$layout-vertical-nav-width);
      }
    }
  }
  .nav-link, .nav-section-title{
    list-style-type: none;
  }
  .nav-link a {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}

.layout-wrapper.layout-nav-type-vertical {
  // TODO(v2): Check why we need height in vertical nav & min-height in horizontal nav
  block-size: 100%;

  .layout-content-wrapper {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-block-size: calc(var(--vh, 1vh) * 100);
    transition: padding-inline-start 0.2s ease-in-out;
    will-change: padding-inline-start;
  }

  .layout-navbar {
    z-index: variables.$layout-vertical-nav-layout-navbar-z-index;

    .navbar-content-container {
      block-size: variables.$layout-vertical-nav-navbar-height;
    }

    @at-root {
      .layout-wrapper.layout-nav-type-vertical {
        .layout-navbar {
          @if variables.$layout-vertical-nav-navbar-is-contained {
            @include mixins.boxed-content;
          } @else {
            .navbar-content-container {
              @include mixins.boxed-content;
            }
          }
        }
      }
    }
  }

  &.layout-navbar-sticky .layout-navbar {
    @extend %layout-navbar-sticky;
  }

  &.layout-navbar-hidden .layout-navbar {
    @extend %layout-navbar-hidden;
  }

  // 👉 Footer
  .layout-footer {
    @include mixins.boxed-content;
  }

  // 👉 Layout overlay
  .layout-overlay {
    position: fixed;
    z-index: variables.$layout-overlay-z-index;
    background-color: rgb(0 0 0 / 60%);
    cursor: pointer;
    inset: 0;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease-in-out;
    will-change: transform;

    &.visible {
      opacity: 1;
      pointer-events: auto;
    }
  }

  &:not(.layout-overlay-nav) .layout-content-wrapper {
    padding-inline-start: variables.$layout-vertical-nav-width;
  }

  // Adjust right column pl when vertical nav is collapsed
  &.layout-vertical-nav-collapsed .layout-content-wrapper {
    padding-inline-start: variables.$layout-vertical-nav-collapsed-width;
  }

  // 👉 Content height fixed
  &.layout-content-height-fixed {
    .layout-content-wrapper {
      max-block-size: calc(var(--vh) * 100);
    }

    .layout-page-content {
      display: flex;
      overflow: hidden;

      .page-content-container {
        inline-size: 100%;

        > :first-child {
          max-block-size: 100%;
          overflow-y: auto;
        }
      }
    }
  }
}
</style>



