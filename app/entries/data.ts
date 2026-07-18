/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: Entries Page, Data. Blog posts and comments now live in the
 *               D1 database (see db.ts, migrations/0001_init.sql), this file
 *               only holds this page's static copy and shared presentation
 *               config, not post content.
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-17
 * =============================================================================
 */

export const PAGE_EYEBROW = "The journal";

export const PAGE_HEADING = "Entries";

export const PAGE_INTRO =
  "Day to day entries about living with diabetes, the numbers, the routines, the funny days and the genuinely hard ones. Each one is rated 1 to 10 for how the day actually felt.";

export const PAGE_WATERMARK = "JOURNAL";

export const PAGE_BLURB =
  "Daily journal entries, rated for how the day actually felt.";

export const PAGE_FOOTER_NOTE = "New entries are added as they're written.";

export const MOOD_BADGE_STYLES: Record<string, string> = {
  "low, and low": "bg-red-50 text-red-700",
  "dark humor": "bg-amber-50 text-amber-700",
  "actually okay": "bg-emerald-50 text-emerald-700",
};
