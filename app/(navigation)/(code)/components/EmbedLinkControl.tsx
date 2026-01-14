import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React from "react";
import { codeAtom, selectedLanguageAtom } from "../store/code";
import { shortIdAtom } from "../store/short-link";
import { wrapInComment } from "../util/comment-syntax";
import { LANGUAGES } from "../util/languages";
import { Button } from "@/components/button";
import LinkIcon from "../assets/icons/link-16.svg";
import { useAutoSaveSnippet } from "../hooks/useAutoSaveSnippet";

const EmbedLinkControl: React.FC = () => {
  const [code, setCode] = useAtom(codeAtom);
  const selectedLanguage = useAtomValue(selectedLanguageAtom);
  const [shortId, initShortId] = useAtom(shortIdAtom);

  /** Auto-save snippet whenever code/settings change */
  useAutoSaveSnippet();

  const handleInsertLink = () => {
    /** Initialize short ID if not already set */
    let id = shortId;
    if (!id) {
      id = initShortId();
    }

    /** Build the short link URL */
    const url = `${window.location.origin}/${id}`;

    /** Get the language key for comment syntax */
    const languageKey = Object.keys(LANGUAGES).find((key) => LANGUAGES[key] === selectedLanguage) || null;

    /** Wrap URL in appropriate comment syntax */
    const comment = wrapInComment(url, languageKey);

    /** Insert at the beginning of the code */
    const newCode = `${comment}\n${code}`;
    setCode(newCode);
  };

  return (
    <Button variant="secondary" onClick={handleInsertLink} className="gap-1.5">
      <LinkIcon className="w-4 h-4" />
      <span className="hidden md:inline">Embed Link</span>
    </Button>
  );
};

export default EmbedLinkControl;
