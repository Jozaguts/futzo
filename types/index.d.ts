// types/index.ts
export {};

declare global {
  interface Window {
    FB: any;
    statusChangeCallback: (any: any) => any;
    window: {
      maps: any;
    };
  }
}
