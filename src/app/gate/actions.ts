"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "knowstalgia_gate";

export async function submitPasscode(formData: FormData) {
  const entered = String(formData.get("passcode") ?? "").trim();
  const destination = String(formData.get("from") ?? "/");
  const passcode = process.env.KNOWSTALGIA_PASSCODE;

  if (!passcode || entered !== passcode) {
    redirect(`/gate?error=1&from=${encodeURIComponent(destination)}`);
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, passcode, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  redirect(destination || "/");
}
