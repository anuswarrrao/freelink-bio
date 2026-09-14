const initializeAos = () => {
  if (typeof window.AOS === "undefined") return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  window.AOS.init({
    duration: 700,
    easing: "ease-out-cubic",
    once: true,
    offset: 48,
    delay: 0,
    disable: prefersReducedMotion,
  });
};

export { initializeAos };
