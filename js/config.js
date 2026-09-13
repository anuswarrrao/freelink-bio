/**
 * Privacy-friendly analytics config.
 * Set provider to "plausible" or "umami" and fill the fields to enable.
 * Leave provider as null to only track locally in sessionStorage (no third party).
 */
export const ANALYTICS = {
  provider: null, // "plausible" | "umami" | null
  plausibleDomain: "anuswarrrao.sbs",
  umamiSrc: "https://cloud.umami.is/script.js",
  umamiWebsiteId: "",
};
