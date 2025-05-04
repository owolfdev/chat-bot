import { enforceIpRateLimit } from "@/lib/middleware/rate-limit";

type ChatRequest = { message: string; ip?: string };
type ChatResponse = { response: string };

export async function handleChatRequest(
  input: ChatRequest
): Promise<ChatResponse> {
  if (!input.message || typeof input.message !== "string") {
    throw new Error("Invalid input: message required");
  }

  if (input.ip) {
    await enforceIpRateLimit(input.ip);
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input.message }],
    }),
  });

  if (!res.ok) throw new Error("OpenAI error");
  const data = await res.json();
  return { response: data.choices?.[0]?.message?.content || "No response" };
}
