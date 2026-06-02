import { generateQR } from "./qr.js";
import { showToast } from "./utils.js";
import { initializeClipboard } from "./clipboard.js";

const overlay = document.getElementById("shareOverlay");
const qrContainer = document.getElementById("qrContainer");
const closeBtn = document.getElementById("closeSharePopup");
const copyBtn = document.getElementById("copyBtn");
const shareBtn = document.getElementById("shareBtn");
const downloadBtn = document.getElementById("downloadBtn");

let currentLink = "";

function openPopup(link) {
  currentLink = link;
  copyBtn.setAttribute("data-clipboard-text", link);
  overlay.classList.remove("hidden");
  requestAnimationFrame(() => overlay.classList.add("active"));
  generateQR(qrContainer, link);
}

function closePopup() {
  overlay.classList.remove("active");
  setTimeout(() => overlay.classList.add("hidden"), 300);
}

const initializeShare = () => {
  document.querySelectorAll(".share-trigger").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openPopup(btn.getAttribute("data-link"));
    });
  });

  closeBtn.addEventListener("click", closePopup);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closePopup();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      closePopup();
    }
  });

  initializeClipboard(copyBtn);

  shareBtn.addEventListener("click", async () => {
    if (!navigator.share) {
      showToast("Sharing not supported on this device", true);
      return;
    }
    try {
      await navigator.share({
        title: "Check this out!",
        text: "I wanted to share this link with you",
        url: currentLink,
      });
    } catch (err) {
      if (err.name !== "AbortError") showToast("Share failed", true);
    }
  });

  downloadBtn.addEventListener("click", () => {
    const canvas = qrContainer.querySelector("canvas");
    const img = qrContainer.querySelector("img");
    const source = canvas?.toDataURL("image/png") || img?.src;

    if (!source) {
      showToast("QR code not ready", true);
      return;
    }

    const link = document.createElement("a");
    link.href = source;
    link.download = `qr-code-${Date.now()}.png`;
    link.click();
    showToast("QR code downloaded!");
  });
};

export { initializeShare };
