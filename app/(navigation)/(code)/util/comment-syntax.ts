/** Comment syntax patterns for different languages */
const COMMENT_SYNTAX: Record<string, { prefix: string; suffix?: string }> = {
  /** C-style single-line comments */
  javascript: { prefix: `// ` },
  typescript: { prefix: `// ` },
  tsx: { prefix: `// ` },
  jsx: { prefix: `// ` },
  java: { prefix: `// ` },
  cpp: { prefix: `// ` },
  csharp: { prefix: `// ` },
  go: { prefix: `// ` },
  rust: { prefix: `// ` },
  swift: { prefix: `// ` },
  kotlin: { prefix: `// ` },
  scala: { prefix: `// ` },
  dart: { prefix: `// ` },
  php: { prefix: `// ` },
  css: { prefix: `/* `, suffix: ` */` },
  scss: { prefix: `// ` },
  sass: { prefix: `// ` },
  less: { prefix: `// ` },
  c: { prefix: `// ` },
  objective_c: { prefix: `// ` },
  groovy: { prefix: `// ` },
  solidity: { prefix: `// ` },
  zig: { prefix: `// ` },
  odin: { prefix: `// ` },
  v: { prefix: `// ` },
  glsl: { prefix: `// ` },
  wgsl: { prefix: `// ` },

  /** Hash comments */
  shell: { prefix: `# ` },
  bash: { prefix: `# ` },
  python: { prefix: `# ` },
  ruby: { prefix: `# ` },
  perl: { prefix: `# ` },
  r: { prefix: `# ` },
  yaml: { prefix: `# ` },
  toml: { prefix: `# ` },
  dockerfile: { prefix: `# ` },
  makefile: { prefix: `# ` },
  cmake: { prefix: `# ` },
  nginx: { prefix: `# ` },
  powershell: { prefix: `# ` },
  elixir: { prefix: `# ` },
  crystal: { prefix: `# ` },
  julia: { prefix: `# ` },
  nim: { prefix: `# ` },
  hcl: { prefix: `# ` },
  terraform: { prefix: `# ` },

  /** Double dash comments */
  sql: { prefix: `-- ` },
  lua: { prefix: `-- ` },
  haskell: { prefix: `-- ` },
  elm: { prefix: `-- ` },
  ada: { prefix: `-- ` },
  vhdl: { prefix: `-- ` },

  /** Semicolon comments */
  clojure: { prefix: `; ` },
  lisp: { prefix: `; ` },
  scheme: { prefix: `; ` },
  racket: { prefix: `; ` },
  asm: { prefix: `; ` },

  /** Percent comments */
  latex: { prefix: `% ` },
  matlab: { prefix: `% ` },
  erlang: { prefix: `% ` },
  prolog: { prefix: `% ` },

  /** HTML-style comments */
  html: { prefix: `<!-- `, suffix: ` -->` },
  xml: { prefix: `<!-- `, suffix: ` -->` },
  svg: { prefix: `<!-- `, suffix: ` -->` },
  vue: { prefix: `<!-- `, suffix: ` -->` },
  astro: { prefix: `<!-- `, suffix: ` -->` },

  /** Other special syntax */
  graphql: { prefix: `# ` },
  cypher: { prefix: `// ` },
  prisma: { prefix: `// ` },
  gleam: { prefix: `// ` },
  rescript: { prefix: `// ` },
  reason: { prefix: `// ` },
  fsharp: { prefix: `// ` },
  ocaml: { prefix: `(* `, suffix: ` *)` },
  sml: { prefix: `(* `, suffix: ` *)` },
  pascal: { prefix: `// ` },
  fortran: { prefix: `! ` },
  cobol: { prefix: `* ` },
  apex: { prefix: `// ` },
  vb: { prefix: `' ` },
  basic: { prefix: `' ` },
};

/** Default fallback for unknown languages */
const DEFAULT_COMMENT = { prefix: `// ` };

/**
 * Get comment syntax for a language
 * @param languageKey - The language key (e.g., 'javascript', 'python')
 * @returns Object with prefix and optional suffix
 */
export function getCommentSyntax(languageKey: string | null): { prefix: string; suffix?: string } {
  if (!languageKey) return DEFAULT_COMMENT;
  return COMMENT_SYNTAX[languageKey.toLowerCase()] || DEFAULT_COMMENT;
}

/**
 * Wrap a URL in a comment for the given language
 * @param url - The URL to embed
 * @param languageKey - The language key
 * @returns The commented URL string
 */
export function wrapInComment(url: string, languageKey: string | null): string {
  const { prefix, suffix } = getCommentSyntax(languageKey);
  return `${prefix}${url}${suffix || ``}`;
}
