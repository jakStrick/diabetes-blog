/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: Shared registry of page hero banner images, imported by any
 *               page that renders the PageHero component. Each entry carries
 *               its own alt text; every photo shares the one intrinsic size
 *               defined by ImageDimensions in PageHero.tsx, so pages never
 *               need to specify or restyle the hero themselves.
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-17
 * =============================================================================
 */

import type { HeroImage } from "./PageHero";

export const IMGS: Record<string, HeroImage> = {
  homeHero: {
    src: "/images/HomeHeroLancet224.webp",
    alt: "A stack of medical journals including The Lancet",
  },
  labHero: {
    src: "/images/HeroLab.webp",
    alt: "A team of three researchers in white lab coats working at lab benches, with monitors behind them showing insulin signaling pathways and diabetes cure research",
  },
  journalHero: {
    src: "/images/HeroJournalEntry.webp",
    alt: "A sepia-toned close-up of a hand writing a dated journal entry with a quill pen beside an inkwell",
  },
  chem1Hero: {
    src: "/images/HeroChem1.webp",
    alt: "An abstract illustration of glowing molecular structures, chemical diagrams, and data charts",
  },
  chem2Hero: {
    src: "/images/HeroChem2.webp",
    alt: "An abstract illustration of molecular chemistry connecting two glowing pancreas icons",
  },
} as const;
