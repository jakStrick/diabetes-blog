/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: About Page (placeholder, bio not yet written)
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-17
 * =============================================================================
 */

import type { Metadata } from "next";
import { IMGS } from "@/components/HeroImages";
import PageHero from "@/components/PageHero";
import {
  PAGE_EYEBROW,
  PAGE_HEADING,
  PAGE_INTRO,
  PAGE_FOOTER_NOTE,
  PAGE_WATERMARK,
  PAGE_BLURB,
} from "./data";

export const metadata: Metadata = {
  title: "About | The Daily Count",
  description: "Who writes The Daily Count, and why, coming soon.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <PageHero
        image={IMGS.chem1Hero}
        label="About"
        watermark={PAGE_WATERMARK}
        blurb={PAGE_BLURB}
      />

      <main id="main-content" className="mx-auto max-w-3xl px-6 py-11">
        <span className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
          {PAGE_EYEBROW}
        </span>
        <h1 className="mt-2 mb-5 font-serif text-3xl font-semibold leading-tight text-stone-800 sm:text-4xl">
          {PAGE_HEADING}
        </h1>
        <p className="mb-5 text-lg text-stone-700">{PAGE_INTRO}</p>
      </main>

      <footer className="border-t border-stone-200 py-7 text-center text-sm text-stone-500">
        {PAGE_FOOTER_NOTE}
      </footer>
    </div>
  );
}
