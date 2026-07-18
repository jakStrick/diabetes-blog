/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: History of Diabetes Page
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-17
 * =============================================================================
 */

import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { IMGS } from "@/components/HeroImages";
import {
  PAGE_EYEBROW,
  PAGE_HEADING,
  PAGE_INTRO,
  PAGE_FOOTER_NOTE,
  PAGE_WATERMARK,
  PAGE_BLURB,
  TOC_ITEMS,
  HISTORY_SECTIONS,
} from "./data";

export const metadata: Metadata = {
  title: "The history of diabetes | The Daily Count",
  description:
    "How diabetes works in the body, and how insulin, home monitoring, and modern treatment were discovered, explained in plain language.",
};

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <PageHero
        image={IMGS.labHero}
        label="Diabetes Explained"
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

        <nav
          aria-label="Table of contents"
          className="mb-11 rounded-lg border border-stone-200 bg-white px-6 py-5"
        >
          <span className="mb-3 block text-xs font-semibold uppercase tracking-wide text-stone-500">
            On this page
          </span>
          <ol className="list-decimal space-y-1.5 pl-4 text-sm">
            {TOC_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-stone-800 underline-offset-2 hover:underline focus-visible:underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {HISTORY_SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="mb-12 scroll-mt-24"
          >
            {section.when && (
              <span className="mb-1.5 block font-serif text-sm font-semibold text-emerald-700">
                {section.when}
              </span>
            )}
            <h2 className="mb-4 font-serif text-2xl font-semibold leading-snug text-stone-800">
              {section.title}
            </h2>
            {section.paragraphs.map((paragraph: string, index: number) => (
              <p
                key={index}
                className="mb-4 text-base text-stone-700 last:mb-0"
              >
                {paragraph}
              </p>
            ))}
            {section.callout && (
              <div className="mt-4 rounded-r-lg border-l-4 border-emerald-700 bg-white px-5 py-4 text-sm text-stone-700">
                {section.callout}
              </div>
            )}
          </section>
        ))}
      </main>

      <footer className="border-t border-stone-200 py-7 text-center text-sm text-stone-500">
        {PAGE_FOOTER_NOTE}
      </footer>
    </div>
  );
}
