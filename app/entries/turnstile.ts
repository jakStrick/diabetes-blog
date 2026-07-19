/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: Cloudflare Turnstile bot verification for the public comment
 *               form. Single place any Turnstile call goes through, mirrors
 *               the rule in db.ts that all D1 access goes through one file.
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-19
 * =============================================================================
 */

import { getCloudflareContext } from "@opennextjs/cloudflare";

const TURNSTILE_VERIFY_ENDPOINT =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

interface TurnstileVerifyResponse {
  success: boolean;
}

export async function getTurnstileSiteKey(): Promise<string> {
  const { env } = await getCloudflareContext({ async: true });
  return env.TURNSTILE_SITE_KEY;
}

export async function verifyTurnstileToken(
  token: string,
  remoteIp: string | null,
): Promise<boolean> {
  if (!token) return false;

  const { env } = await getCloudflareContext({ async: true });

  const body = new URLSearchParams({
    secret: env.TURNSTILE_SECRET_KEY,
    response: token,
  });
  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  const response = await fetch(TURNSTILE_VERIFY_ENDPOINT, {
    method: "POST",
    body,
  });

  if (!response.ok) return false;

  const result = (await response.json()) as TurnstileVerifyResponse;
  return result.success === true;
}
