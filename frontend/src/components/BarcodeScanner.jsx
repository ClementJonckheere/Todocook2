// src/components/BarcodeScanner.jsx
import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef } from "react";
import api from "../api";

function BarcodeScanner({ onScanSuccess }) {
  const scannerRef = useRef(null);
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    if (!scannerRef.current) return;

    const html5QrCode = new Html5Qrcode(scannerRef.current.id);
    html5QrCodeRef.current = html5QrCode;

    html5QrCode
      .start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: 250,
        },
        async (decodedText) => {
          console.log("✅ Code scanné :", decodedText);
          html5QrCode.stop();
          onScanSuccess(decodedText);
        },
        (error) => {
          console.warn("Erreur de scan", error);
        }
      )
      .catch((err) => {
        console.error("Erreur de démarrage du scanner", err);
      });

    return () => {
      html5QrCodeRef.current?.stop().catch(() => {});
    };
  }, []);

  return (
    <div>
      <div id="scanner" ref={scannerRef} style={{ width: "100%" }}></div>
    </div>
  );
}

export default BarcodeScanner;
