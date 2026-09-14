const THEME_KEY = "theme";

const getPreferredTheme = () => {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
};

const applyTheme = (isLightMode) => {
  const toggleButton = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');

  document.documentElement.classList.toggle("light-mode", isLightMode);
  document.body.classList.toggle("light-mode", isLightMode);

  if (themeIcon) {
    themeIcon.src = isLightMode
      ? "assets/images/icon/sun.svg?v=2"
      : "assets/images/icon/moon.svg?v=2";
  }

  if (toggleButton) {
    toggleButton.setAttribute("aria-pressed", String(isLightMode));
    toggleButton.setAttribute(
      "aria-label",
      isLightMode ? "Switch to dark mode" : "Switch to light mode"
    );
  }

  if (themeColorMeta) {
    themeColorMeta.content = isLightMode ? "#eef2f7" : "#000000";
  }
};

const toggleTheme = () => {
  const isLightMode = !document.documentElement.classList.contains("light-mode");
  localStorage.setItem(THEME_KEY, isLightMode ? "light" : "dark");
  applyTheme(isLightMode);
};

const initializeTheme = () => {
  applyTheme(getPreferredTheme() === "light");

  const toggleButton = document.getElementById("theme-toggle");
  if (toggleButton) {
    toggleButton.addEventListener("click", toggleTheme);
  }

  const media = window.matchMedia("(prefers-color-scheme: light)");
  media.addEventListener("change", (event) => {
    if (localStorage.getItem(THEME_KEY)) return;
    applyTheme(event.matches);
  });
};

export { initializeTheme, getPreferredTheme, applyTheme };
