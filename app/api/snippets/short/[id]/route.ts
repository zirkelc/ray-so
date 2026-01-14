import { NextRequest, NextResponse } from "next/server";
import { kvGet } from "@/lib/cloudflare-kv";
import type { CodeSnippet } from "@/types/snippet";

export const runtime = `edge`;

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const snippet = await kvGet<CodeSnippet>(`snippet:${id}`);

  if (!snippet) {
    return NextResponse.json({ error: `Snippet not found` }, { status: 404 });
  }

  return NextResponse.json(snippet);
}
