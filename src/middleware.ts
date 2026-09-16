import { NextResponse, type NextRequest } from "next/server";

/**
 * Beta passcode gate (brand-foundations.md → Beta Access).
 *
 * This is a friction gate for a private beta, not an auth system: one
 * link + one shared passcode Tom hands testers. It sits in front of the
 * whole site; play itself stays fully anonymous once inside (master
 * brief §26 — LOCKED, no account needed to play).
 *
 * If KNOWSTALGIA_PASSCODE isn't set, the gate is a no-op — so local dev
 * and preview builds without the env var configured aren't locked out
 * by accident.
 */

const COOKIE_NAME = "knowstalgia_gate";
const GATE_PATH = "/gate";

export function middleware(request: NextRequest) {
  const passcode = process.env.KNOWSTALGIA_PASSCODE;

  // No passcode configured for this environment — gate disabled.
  if (!passcode) return NextResponse.next();

  const { pathname } = request.nextUrl;

  // Always allow the gate page itself and its submit action.
  if (pathname === GATE_PATH) return NextResponse.next();

  const cookie = request.cookies.get(COOKIE_NAME)?.value;
  if (cookie === passcode) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = GATE_PATH;
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match everything except:
     * - Next internals (_next/static, _next/image)
     * - favicon and common static assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
