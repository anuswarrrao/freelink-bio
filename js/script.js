/* =============== LIGHT MODE =============== */
const toggleButton = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

document.addEventListener("DOMContentLoaded", () => {
  const isLightMode = localStorage.getItem("theme") === "light";
  document.body.classList.toggle("light-mode", isLightMode);
  themeIcon.src = isLightMode
    ? "assets/images/icon/sun.svg"
    : "assets/images/icon/moon.svg";
  themeIcon.alt = isLightMode ? "Sun icon" : "Moon icon";
});

toggleButton.addEventListener("click", () => {
  const isLightMode = document.body.classList.toggle("light-mode");
  localStorage.setItem("theme", isLightMode ? "light" : "dark");
  themeIcon.src = isLightMode
    ? "assets/images/icon/sun.svg"
    : "assets/images/icon/moon.svg";
  themeIcon.alt = isLightMode ? "Sun icon" : "Moon icon";
});

/* =============== SHARE MODE =============== */
const overlay = document.getElementById("shareOverlay");
const popup = document.getElementById("sharePopup");
const qrContainer = document.getElementById("qrContainer");
const closeBtn = document.getElementById("closeSharePopup");
const copyBtn = document.getElementById("copyBtn");
const shareBtn = document.getElementById("shareBtn");
const downloadBtn = document.getElementById("downloadBtn");
const successToast = document.getElementById("successToast");

let currentLink = "";
let qrCode = null;

// Open popup handler
function handleShareClick(e) {
  e.preventDefault();
  currentLink = this.getAttribute("data-link");

  overlay.classList.remove("hidden");
  setTimeout(() => overlay.classList.add("active"), 10);

  generateQR();
}

// Attach event listeners
document.querySelectorAll(".share-trigger").forEach((btn) => {
  btn.removeEventListener("click", handleShareClick);
  btn.addEventListener("click", handleShareClick);
});

function generateQR() {
  // Clear previous QR code
  if (qrCode) {
    qrCode.clear();
    qrCode = null;
  }

  qrContainer.innerHTML =
    '<div style="color: rgba(0, 0, 0, 0.4);" class="loading">Generating QR Code...</div>';

  setTimeout(() => {
    qrContainer.innerHTML = "";
    qrContainer.classList.remove("loading");

    qrCode = new QRCode(qrContainer, {
      text: currentLink,
      width: 180,
      height: 180,
      colorDark: "rgba(0, 0, 0, 0.9)",
      colorLight: "rgba(255, 255, 255, 0.9)",
      correctLevel: QRCode.CorrectLevel.H,
    });
  }, 500);
}

function closePopup() {
  overlay.classList.remove("active");
  setTimeout(() => {
    overlay.classList.add("hidden");
    qrContainer.classList.add("loading");
  }, 300);
}

closeBtn.onclick = closePopup;

overlay.onclick = (e) => {
  if (e.target === overlay) closePopup();
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay.classList.contains("active")) {
    closePopup();
  }
});

copyBtn.onclick = async () => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(currentLink);
    } else {
      fallbackCopyTextToClipboard(currentLink);
    }

    showToast("Link copied to clipboard!");
    copyBtn.style.transform = "scale(0.95)";
    setTimeout(() => {
      copyBtn.style.transform = "";
    }, 150);
  } catch (err) {
    showToast("Failed to copy link", true);
  }
};

// Optional fallback for clipboard API
function fallbackCopyTextToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    document.execCommand("copy");
  } catch (err) {
    console.error("Fallback copy failed", err);
  }
  document.body.removeChild(textarea);
}

shareBtn.onclick = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Check this out!",
        text: "I wanted to share this link with you",
        url: currentLink,
      });
    } catch (err) {
      if (err.name !== "AbortError") {
        showToast("Share failed", true);
      }
    }
  } else {
    showToast("Sharing not supported on this device", true);
  }
};

downloadBtn.onclick = () => {
  const canvas = qrContainer.querySelector("canvas");
  const img = qrContainer.querySelector("img");

  if (canvas) {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `qr-code-${Date.now()}.png`;
    link.click();
    showToast("QR code downloaded!");
  } else if (img) {
    const link = document.createElement("a");
    link.href = img.src;
    link.download = `qr-code-${Date.now()}.png`;
    link.click();
    showToast("QR code downloaded!");
  } else {
    showToast("QR code not ready", true);
  }
};

// Show toast
function showToast(message, isError = false) {
  Toastify({
    text: `${isError ? "⚠️" : "✅"} ${message}`,
    duration: 3000,
    gravity: "bottom", 
    position: "right", 
    backgroundColor: isError
      ? "linear-gradient(135deg, #ef4444, #dc2626)"
      : "linear-gradient(135deg, #10b981, #059669)",
    stopOnFocus: true,
    close: true
  }).showToast();
}