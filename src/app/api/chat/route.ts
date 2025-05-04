import { type NextRequest, NextResponse } from "next/server";
import { handleChatRequest } from "@/lib/handle-chat-requests";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Extract IP address from headers (x-forwarded-for is standard)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    const result = await handleChatRequest({ ...body, ip });

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("Error in chat API route:", error);

    const message = error instanceof Error ? error.message : "Server error";
    const status = message.includes("limit") ? 429 : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
