import { initializeTheme } from "./modules/theme.js";
import { initializeShare } from "./modules/share.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
  initializeShare();
});
