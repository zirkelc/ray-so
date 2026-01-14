import { useCallback, useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { shortIdAtom } from "../store/short-link";

/** Debounce delay in milliseconds */
const DEBOUNCE_MS = 1_000;

/** Helper to gather snippet data from URL hash */
function getSnippetFromHash() {
  const hashParams = new URLSearchParams(window.location.hash.slice(1));
  return {
    code: hashParams.get(`code`) || ``,
    language: hashParams.get(`language`) || null,
    theme: hashParams.get(`theme`) || `candy`,
    darkMode: hashParams.get(`darkMode`) !== `false`,
    padding: parseInt(hashParams.get(`padding`) || `64`, 10),
    background: hashParams.get(`background`) !== `false`,
    lineNumbers: hashParams.get(`lineNumbers`) === `true` ? true : undefined,
    title: hashParams.get(`title`) || ``,
    highlightedLines:
      hashParams
        .get(`highlightedLines`)
        ?.split(`,`)
        .map(Number)
        .filter(Boolean) || [],
    font: hashParams.get(`font`) || `jetbrains-mono`,
    width: hashParams.get(`width`) ? parseInt(hashParams.get(`width`)!, 10) : null,
  };
}

/** Persist snippet to KV */
async function persistSnippet(id: string): Promise<boolean> {
  try {
    const snippet = getSnippetFromHash();
    if (!snippet.code) {
      return false;
    }
    const response = await fetch(`/api/snippets/short`, {
      method: `POST`,
      headers: { "Content-Type": `application/json` },
      body: JSON.stringify({ ...snippet, id }),
    });
    return response.ok;
  } catch (error) {
    console.error(`Failed to persist snippet:`, error);
    return false;
  }
}

/**
 * Hook that returns a function to save the snippet to KV.
 * Call this when the user clicks the embed link button.
 */
export function useSaveSnippet() {
  const shortId = useAtomValue(shortIdAtom);

  const saveSnippet = useCallback(
    async (id?: string) => {
      const snippetId = id || shortId;
      if (!snippetId) return false;
      return persistSnippet(snippetId);
    },
    [shortId],
  );

  return saveSnippet;
}

/**
 * Hook that auto-saves the snippet to KV whenever the URL hash changes.
 * Only starts saving after a short ID has been assigned (i.e., embed link was clicked).
 * Uses debouncing to avoid excessive API calls.
 */
export function useAutoSaveSnippet() {
  const shortId = useAtomValue(shortIdAtom);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastHashRef = useRef<string | null>(null);

  useEffect(() => {
    /** Only auto-save if a short ID exists (embed link was clicked at least once) */
    if (!shortId) return;

    const handleHashChange = () => {
      const currentHash = window.location.hash;

      /** Skip if hash hasn't changed */
      if (currentHash === lastHashRef.current) return;
      lastHashRef.current = currentHash;

      /** Clear any pending debounce */
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      /** Debounce the persist call */
      debounceRef.current = setTimeout(() => {
        persistSnippet(shortId);
      }, DEBOUNCE_MS);
    };

    /** Listen for hash changes */
    window.addEventListener(`hashchange`, handleHashChange);

    /** Also trigger on initial mount when shortId becomes available */
    handleHashChange();

    return () => {
      window.removeEventListener(`hashchange`, handleHashChange);
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [shortId]);
}
