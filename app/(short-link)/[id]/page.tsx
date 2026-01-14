import { redirect, notFound } from "next/navigation";
import { kvGet } from "@/lib/cloudflare-kv";
import type { CodeSnippet } from "@/types/snippet";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ShortLinkPage({ params }: Props) {
  const { id } = await params;

  const snippet = await kvGet<CodeSnippet>(`snippet:${id}`);

  if (!snippet) {
    notFound();
  }

  /** Build hash params from snippet data */
  const hashParams = new URLSearchParams();
  hashParams.set(`code`, snippet.code);
  if (snippet.language) hashParams.set(`language`, snippet.language);
  hashParams.set(`theme`, snippet.theme);
  hashParams.set(`darkMode`, String(snippet.darkMode));
  hashParams.set(`padding`, String(snippet.padding));
  hashParams.set(`background`, String(snippet.background));
  if (snippet.lineNumbers !== undefined) {
    hashParams.set(`lineNumbers`, String(snippet.lineNumbers));
  }
  if (snippet.title) hashParams.set(`title`, snippet.title);
  if (snippet.highlightedLines?.length) {
    hashParams.set(`highlightedLines`, snippet.highlightedLines.join(`,`));
  }
  hashParams.set(`font`, snippet.font);
  if (snippet.width !== null) {
    hashParams.set(`width`, String(snippet.width));
  }

  redirect(`/#${hashParams.toString()}`);
}
