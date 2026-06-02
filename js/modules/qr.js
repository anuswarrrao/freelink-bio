let qrCode = null;

function generateQR(qrContainer, link) {
  if (qrCode) {
    qrCode.clear();
    qrCode = null;
  }

  qrContainer.innerHTML = "";
  qrContainer.setAttribute("aria-busy", "true");

  qrCode = new QRCode(qrContainer, {
    text: link,
    width: 180,
    height: 180,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  qrContainer.removeAttribute("aria-busy");
}

export { generateQR };
