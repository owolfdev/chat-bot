// app/api/chat/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { handleChatRequest } from "@/lib/handle-chat-requests";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await handleChatRequest(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in chat API route:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
