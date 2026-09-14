export function initializePwa() {
  if (!("serviceWorker" in navigator)) return;

  const register = () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      /* Registration can fail on file:// or restricted hosts */
    });
  };

  if (document.readyState === "complete") {
    register();
  } else {
    window.addEventListener("load", register, { once: true });
  }
}
