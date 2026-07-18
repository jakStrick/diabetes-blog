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
  }
}

export {};
