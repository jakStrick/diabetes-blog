/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: Landing Page, Data
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-17
 * =============================================================================
 */

export interface Pillar {
  id: string;
  label: string;
  title: string;
  body: string;
}

export const HERO_EYEBROW = "A personal record, kept in public";

export const HERO_HEADING =
  "What it actually feels like, on the days it counts.";

export const HERO_LEDE =
  "An honest, day to day account of living with diabetes. The funny days, the flat and boring days, and the days that are genuinely hard, written down without cleaning any of it up.";

export const HERO_WATERMARK = "DIABETES";

export const HERO_BLURB =
  "A personal, day by day account of living with diabetes.";

export const PILLARS: Pillar[] = [
  {
    id: "honest",
    label: "No forced positivity",
    title: "The full emotional range, not just the manageable parts",
    body: "Most diabetes content online is either clinical or relentlessly upbeat. This is neither. Some entries are funny, some are angry, some are just tired, and some are heavier than that. All of it gets written down.",
  },
  {
    id: "rated",
    label: "A number for the day",
    title: "Every entry starts with a simple 1 to 10 rating",
    body: "Before anything else, each entry is tagged with how the day actually felt, from steady and at peace with it, to genuinely underwater. It's a quick way to find entries that match where you're at right now.",
  },
  {
    id: "shared",
    label: "Comments, not platitudes",
    title: "A place for other people to say what they're carrying too",
    body: "Comments are open. Not for advice or fixing, just for people working through the same thing to recognize themselves in it and say so.",
  },
];

export const NEWSLETTER_HEADING = "Get entries in your inbox";

export const NEWSLETTER_BODY =
  "A short email whenever a new entry goes up. No schedule, no spam, just the writing.";
