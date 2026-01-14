import React from "react";

import styles from "./Controls.module.css";
import BackgroundControl from "./BackgroundControl";
import DarkModeControl from "./DarkModeControl";
import LanguageControl from "./LanguageControl";
import PaddingControl from "./PaddingControl";
import ThemeControl from "./ThemeControl";
import LineNumberControl from "./LineNumberControl";
import QrCodeControl from "./QrCodeControl";

const Controls: React.FC = () => {
  return (
    <div className={styles.controls}>
      <ThemeControl />
      <BackgroundControl />
      <DarkModeControl />
      <LineNumberControl />
      <PaddingControl />
      <LanguageControl />
      <QrCodeControl />
    </div>
  );
};

export default Controls;
