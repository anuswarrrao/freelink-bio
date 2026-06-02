function showToast(message, isError = false) {
  Toastify({
    text: `${isError ? "⚠️" : "✅"} ${message}`,
    duration: 3000,
    gravity: "bottom",
    position: "center",
    backgroundColor: isError
      ? "rgba(239, 68, 68, 0.95)"
      : "rgba(17, 17, 17, 0.95)",
    stopOnFocus: true,
    close: true,
    className: "custom-toast",
    style: {
      borderRadius: "12px",
      padding: "16px 24px",
      fontSize: "0.95rem",
      fontWeight: "600",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      border: isError
        ? "1px solid rgba(239, 68, 68, 0.3)"
        : "1px solid rgba(255, 255, 255, 0.2)",
    },
  }).showToast();
}

function fallbackCopyTextToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.cssText = "position:fixed;top:-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
  } catch (err) {
    console.error("Fallback copy failed", err);
  }
  document.body.removeChild(textarea);
}

export { showToast, fallbackCopyTextToClipboard };
