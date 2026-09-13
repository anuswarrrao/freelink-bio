import { ANALYTICS } from "../config.js";

const SESSION_KEY = "link-clicks";

const loadProvider = () => {
  if (ANALYTICS.provider === "plausible" && ANALYTICS.plausibleDomain) {
    const script = document.createElement("script");
    script.defer = true;
    script.dataset.domain = ANALYTICS.plausibleDomain;
    script.src = "https://plausible.io/js/script.js";
    document.head.appendChild(script);
    return;
  }

  if (
    ANALYTICS.provider === "umami" &&
    ANALYTICS.umamiSrc &&
    ANALYTICS.umamiWebsiteId
  ) {
    const script = document.createElement("script");
    script.defer = true;
    script.src = ANALYTICS.umamiSrc;
    script.dataset.websiteId = ANALYTICS.umamiWebsiteId;
    document.head.appendChild(script);
  }
};

const getLocalCounts = () => {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "{}");
  } catch {
    return {};
  }
};

const saveLocalCount = (label) => {
  const counts = getLocalCounts();
  counts[label] = (counts[label] || 0) + 1;
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(counts));
};

const trackEvent = (name, props = {}) => {
  saveLocalCount(name);

  if (typeof window.plausible === "function") {
    window.plausible(name, { props });
    return;
  }

  if (typeof window.umami?.track === "function") {
    window.umami.track(name, props);
  }
};

const initializeAnalytics = () => {
  loadProvider();

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-track]");
    if (!target) return;

    const label = target.getAttribute("data-track");
    if (!label) return;

    trackEvent("Link Click", {
      label,
      href: target.getAttribute("href") || target.dataset.link || "",
    });
  });
};

export { initializeAnalytics, trackEvent };
