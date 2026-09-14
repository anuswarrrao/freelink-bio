import { initializeTheme } from "./modules/theme.js";
import { initializeShare } from "./modules/share.js";
import { initializeAnalytics } from "./modules/analytics.js";
import { initializeAos } from "./modules/aos.js";
import { initializePwa } from "./modules/pwa.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
  initializeShare();
  initializeAnalytics();
  initializeAos();
  initializePwa();
});
