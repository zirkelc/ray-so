import { useAtom, useSetAtom } from "jotai";
import React from "react";
import { showQrCodeAtom } from "../store/image";
import { shortIdAtom } from "../store/short-link";
import ControlContainer from "./ControlContainer";
import { Switch } from "@/components/switch";
import { useAutoSaveSnippet } from "../hooks/useAutoSaveSnippet";

const QrCodeControl: React.FC = () => {
  const [showQrCode, setShowQrCode] = useAtom(showQrCodeAtom);
  const initShortId = useSetAtom(shortIdAtom);

  /** Auto-save snippet whenever code/settings change */
  useAutoSaveSnippet();

  const handleToggle = (checked: boolean) => {
    if (checked) {
      /** Initialize short ID when enabling QR code */
      initShortId();
    }
    setShowQrCode(checked);
  };

  return (
    <ControlContainer title="QR Code">
      <Switch checked={showQrCode} onCheckedChange={handleToggle} />
    </ControlContainer>
  );
};

export default QrCodeControl;
