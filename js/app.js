import { initializeTheme } from "./modules/theme.js";
import { initializeShare } from "./modules/share.js";
import { initializeAnalytics } from "./modules/analytics.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
  initializeShare();
  initializeAnalytics();
});
