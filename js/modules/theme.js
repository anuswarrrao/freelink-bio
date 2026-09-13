const toggleButton = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

const applyTheme = (isLightMode) => {
  document.body.classList.toggle("light-mode", isLightMode);
  themeIcon.src = isLightMode
    ? "assets/images/icon/sun.svg"
    : "assets/images/icon/moon.svg";
  toggleButton.setAttribute("aria-pressed", String(isLightMode));
  if (themeColorMeta) {
    themeColorMeta.content = isLightMode ? "#eef2f7" : "#000000";
  }
};

const toggleTheme = () => {
  const isLightMode = !document.body.classList.contains("light-mode");
  localStorage.setItem("theme", isLightMode ? "light" : "dark");
  applyTheme(isLightMode);
};

const initializeTheme = () => {
  applyTheme(localStorage.getItem("theme") === "light");
  toggleButton.addEventListener("click", toggleTheme);
};

export { initializeTheme };
