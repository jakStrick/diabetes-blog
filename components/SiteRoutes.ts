/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: Single source of truth for every internal route path on the
 *               site. Nav, Footer, and any page linking to another page
 *               import ROUTES rather than retyping a path string.
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-17
 * =============================================================================
 */

export const ROUTES = {
  home: "/",
  history: "/history",
  entries: "/entries",
  about: "/about",
  // Not linked in Nav/Footer, owner-only entry authoring, gated by
  // app/write/auth.ts. See NAV_LABELS below for why it's excluded there.
  write: "/write",
} as const;

/**
 * Display labels for the public Nav/Footer only, deliberately omits
 * ROUTES.write since that page is never linked from site navigation.
 */
export const NAV_LABELS: Record<
  Exclude<keyof typeof ROUTES, "write">,
  string
> = {
  home: "Home",
  history: "Diabetes Explained",
  entries: "Blog Entries",
  about: "About",
};
