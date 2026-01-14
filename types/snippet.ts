export interface CodeSnippet {
  /** Base64-encoded code */
  code: string;
  /** Language key from LANGUAGES object */
  language: string | null;
  /** Theme ID from THEMES object */
  theme: string;
  /** Dark mode enabled */
  darkMode: boolean;
  /** Padding value: 16 | 32 | 64 | 128 */
  padding: number;
  /** Show background */
  background: boolean;
  /** Show line numbers (optional - theme may override) */
  lineNumbers?: boolean;
  /** File title */
  title: string;
  /** Highlighted line numbers */
  highlightedLines: number[];
  /** Font key */
  font: string;
  /** Window width (null = auto) */
  width: number | null;
  /** Creation timestamp */
  createdAt: number;
}
