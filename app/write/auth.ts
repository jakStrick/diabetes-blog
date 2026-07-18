/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: Passphrase session for the /write page. Single shared
 *               passphrase (env.WRITE_PASSPHRASE, a Cloudflare secret, never
 *               committed), not a multi-user account system, this is a
 *               one-author blog. The session cookie holds a SHA-256 hash of
 *               the passphrase, never the passphrase itself.
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-18
 * =============================================================================
 */

import { cookies } from "next/headers";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const SESSION_COOKIE = "dc_write_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function checkPassphrase(passphrase: string): Promise<boolean> {
  const { env } = await getCloudflareContext({ async: true });
  if (!passphrase) return false;
  return timingSafeEqual(passphrase, env.WRITE_PASSPHRASE);
}

export async function isAuthenticated(): Promise<boolean> {
  const { env } = await getCloudflareContext({ async: true });
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  const expected = await sha256Hex(env.WRITE_PASSPHRASE);
  return timingSafeEqual(token, expected);
}

export async function setSessionCookie(): Promise<void> {
  const { env } = await getCloudflareContext({ async: true });
  const token = await sha256Hex(env.WRITE_PASSPHRASE);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
