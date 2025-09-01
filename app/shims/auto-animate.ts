// Local shim for @formkit/auto-animate to expose a named export in older versions
// that only provide a default export. This avoids ESM named import errors.

// Import the library's ESM entry directly to avoid alias recursion
import autoAnimateDefault from '@formkit/auto-animate/dist/index.mjs';

export const autoAnimate = autoAnimateDefault;
export default autoAnimateDefault;

