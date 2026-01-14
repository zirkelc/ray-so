import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { showQrCodeAtom } from "../store/image";
import { darkModeAtom } from "../store/themes";
import { shortLinkUrlAtom } from "../store/short-link";
import styles from "./QrCodeOverlay.module.css";

const QrCodeOverlay: React.FC = () => {
  const showQrCode = useAtomValue(showQrCodeAtom);
  const darkMode = useAtomValue(darkModeAtom);
  const shortLinkUrl = useAtomValue(shortLinkUrlAtom);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!showQrCode || !shortLinkUrl) {
      setQrDataUrl(null);
      return;
    }

    QRCode.toDataURL(shortLinkUrl, {
      width: 64,
      margin: 1,
      color: {
        dark: darkMode ? `#ffffff` : `#000000`,
        light: `#00000000`,
      },
    }).then(setQrDataUrl);
  }, [showQrCode, shortLinkUrl, darkMode]);

  if (!showQrCode || !qrDataUrl) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <img src={qrDataUrl} alt="QR Code" />
    </div>
  );
};

export default QrCodeOverlay;
