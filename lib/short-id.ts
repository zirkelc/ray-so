import { customAlphabet } from "nanoid";

/** Alphanumeric alphabet without ambiguous characters (0, O, l, 1) */
const alphabet = `23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz`;

/** Generate 5-character short ID (~380 million combinations) */
export const generateShortId = customAlphabet(alphabet, 5);
