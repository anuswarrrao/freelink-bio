import { showToast, fallbackCopyTextToClipboard } from "./utils.js";

const initializeClipboard = (copyBtn) => {
  copyBtn.addEventListener("click", async () => {
    const text = copyBtn.getAttribute("data-clipboard-text");
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        fallbackCopyTextToClipboard(text);
      }
      showToast("Link copied to clipboard!");
    } catch {
      fallbackCopyTextToClipboard(text);
      showToast("Link copied to clipboard!");
    }
  });
};

export { initializeClipboard };
