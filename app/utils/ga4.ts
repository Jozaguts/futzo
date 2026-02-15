import {useGtag} from '#imports';

type Ga4Params = Record<string, string | number | boolean | null | undefined>;

/**
 * Fire GA4 events safely (no-op on server or if gtag isn't available).
 * Keep payloads free of PII.
 */
export const ga4Event = (name: string, params: Ga4Params = {}) => {
  if (import.meta.server) return;
  try {
    const { gtag } = useGtag();
    if (typeof gtag !== 'function') return;
    gtag('event', name, params);
  } catch {
    // ignore analytics failures
  }
};

