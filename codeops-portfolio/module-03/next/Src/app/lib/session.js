import { cookies } from "next/headers";
import { getSessionByToken } from "./session-store";

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  return getSessionByToken(token);
}