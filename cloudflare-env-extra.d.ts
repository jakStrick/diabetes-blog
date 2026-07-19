/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: Type augmentation for secrets that live in .dev.vars locally
 *               and as `wrangler secret put` values in production, not in
 *               wrangler.jsonc, so `wrangler types` doesn't generate them.
 *               Merges into the same global CloudflareEnv interface as the
 *               generated cloudflare-env.d.ts.
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-18
 * =============================================================================
 */

declare global {
  interface CloudflareEnv {
    WRITE_PASSPHRASE: string;
    RESEND_API_KEY: string;
    RESEND_FROM_EMAIL: string;
    RESEND_TO_EMAIL: string;
    TURNSTILE_SITE_KEY: string;
    TURNSTILE_SECRET_KEY: string;
  }
}

export {};
