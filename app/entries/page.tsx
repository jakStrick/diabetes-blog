/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: Blog Entries Listing Page, reads posts from D1 (see db.ts)
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-17
 * =============================================================================
 */

import type { Metadata } from "next";
import { IMGS } from "@/components/HeroImages";
import PageHero from "@/components/PageHero";
import { getCommentCounts, getPosts } from "./db";
import {
  PAGE_EYEBROW,
  PAGE_HEADING,
  PAGE_INTRO,
  PAGE_FOOTER_NOTE,
  PAGE_WATERMARK,
  PAGE_BLURB,
} from "./data";
import EntryCard from "./EntryCard";

export const metadata: Metadata = {
  title: "Entries | The Daily Count",
  description: "Day to day journal entries about living with diabetes.",
};

export default async function EntriesPage() {
  const [posts, commentCounts] = await Promise.all([
    getPosts(),
    getCommentCounts(),
  ]);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <PageHero
        image={IMGS.journalHero}
        label="Blog Entries"
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
        <p className="mb-9 text-lg text-stone-700">{PAGE_INTRO}</p>

        {posts.length === 0 ? (
          <p className="text-sm text-stone-600">
            No entries have been published yet, check back soon.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <EntryCard
                key={post.id}
                post={post}
                commentCount={commentCounts[post.id] ?? 0}
                headingLevel={2}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-stone-200 py-7 text-center text-sm text-stone-500">
        {PAGE_FOOTER_NOTE}
      </footer>
    </div>
  );
}
