// src/lib/middleware/rate-limit.ts
import { createClient } from "@/utils/supabase/server"; // or your Supabase util

const DAILY_LIMIT = 10;

export async function enforceIpRateLimit(ip: string) {
  const supabase = await createClient();
  const today = new Date().toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from("chat_rate_limits")
    .select("*")
    .eq("ip_address", ip)
    .eq("date", today)
    .single();

  if (error && error.code !== "PGRST116") {
    throw new Error("Rate limit check failed.");
  }

  if (data && data.usage_count >= DAILY_LIMIT) {
    throw new Error("Daily chat limit reached. Please upgrade your plan.");
  }

  const updateOrInsert = data
    ? supabase
        .from("chat_rate_limits")
        .update({ usage_count: data.usage_count + 1 })
        .eq("id", data.id)
    : supabase
        .from("chat_rate_limits")
        .insert({ ip_address: ip, usage_count: 1, date: today });

  await updateOrInsert;
}
