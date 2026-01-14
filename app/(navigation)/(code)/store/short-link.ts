import { atom } from "jotai";
import { generateShortId } from "@/lib/short-id";

/** Preview short ID - generated client-side, not yet persisted */
const previewShortIdAtom = atom<string | null>(null);

/** Initialize or get the preview short ID */
export const shortIdAtom = atom(
  (get) => get(previewShortIdAtom),
  (get, set) => {
    const existing = get(previewShortIdAtom);
    if (existing) return existing;
    const newId = generateShortId();
    set(previewShortIdAtom, newId);
    return newId;
  },
);

/** Computed short link URL based on current origin */
export const shortLinkUrlAtom = atom((get) => {
  const id = get(previewShortIdAtom);
  if (!id) return null;
  if (typeof window === `undefined`) return null;
  return `${window.location.origin}/code/${id}`;
});
