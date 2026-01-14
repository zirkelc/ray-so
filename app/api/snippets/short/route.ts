import { NextRequest, NextResponse } from "next/server";
import { generateShortId } from "@/lib/short-id";
import { kvGet, kvPut } from "@/lib/cloudflare-kv";
import type { CodeSnippet } from "@/types/snippet";

export const runtime = `edge`;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<CodeSnippet> & { id?: string };

    /** Validate required fields */
    if (!body.code) {
      return NextResponse.json({ error: `Missing code - please enter some code first` }, { status: 400 });
    }
    if (!body.theme) {
      return NextResponse.json({ error: `Missing theme` }, { status: 400 });
    }

    /** Use provided ID or generate unique ID with collision check */
    let id: string;
    if (body.id) {
      id = body.id;
    } else {
      let attempts = 0;
      do {
        id = generateShortId();
        const existing = await kvGet(`snippet:${id}`);
        if (!existing) break;
        attempts++;
      } while (attempts < 3);

      if (attempts >= 3) {
        return NextResponse.json({ error: `Failed to generate unique ID` }, { status: 500 });
      }
    }

    /** Store snippet */
    const snippet: CodeSnippet = {
      code: body.code,
      language: body.language ?? null,
      theme: body.theme,
      darkMode: body.darkMode ?? true,
      padding: body.padding ?? 64,
      background: body.background ?? true,
      lineNumbers: body.lineNumbers,
      title: body.title ?? ``,
      highlightedLines: body.highlightedLines ?? [],
      font: body.font ?? `jetbrains-mono`,
      width: body.width ?? null,
      createdAt: Date.now(),
    };

    await kvPut(`snippet:${id}`, snippet);

    /** Build URL based on request origin */
    const origin = req.headers.get(`origin`) || `https://ray.so`;
    const url = `${origin}/${id}`;

    return NextResponse.json({ id, url });
  } catch (error) {
    console.error(`Error creating snippet:`, error);
    return NextResponse.json({ error: `Internal server error` }, { status: 500 });
  }
}
