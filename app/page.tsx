/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: Landing Page
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-17
 * =============================================================================
 */

import Link from "next/link";
import Hero from "@/components/Hero";
import PageHero from "@/components/PageHero";
import { IMGS } from "@/components/HeroImages";
import { ROUTES } from "@/components/SiteRoutes";
import { getCommentCounts, getPosts } from "./entries/db";
import EntryCard from "./entries/EntryCard";
import {
  HERO_EYEBROW,
  HERO_HEADING,
  HERO_LEDE,
  HERO_WATERMARK,
  HERO_BLURB,
  PILLARS,
  NEWSLETTER_HEADING,
  NEWSLETTER_BODY,
} from "./data";

const RECENT_ENTRIES_COUNT = 3;

export default async function LandingPage() {
  const [posts, commentCounts] = await Promise.all([
    getPosts(),
    getCommentCounts(),
  ]);
  const recentPosts = posts.slice(0, RECENT_ENTRIES_COUNT);

  return (
    <main>
      <PageHero
        image={IMGS.homeHero}
        label="Home"
        watermark={HERO_WATERMARK}
        blurb={HERO_BLURB}
      />

      <div className="mx-auto max-w-3xl px-6 py-14">
        <Hero eyebrow={HERO_EYEBROW} heading={HERO_HEADING} lede={HERO_LEDE}>
          <Link
            href={ROUTES.entries}
            className="rounded-md bg-stone-800 px-4 py-2 text-sm font-semibold text-stone-50 hover:bg-stone-700 focus-visible:bg-stone-700"
          >
            Read the journal
          </Link>
        </Hero>

        <section className="mb-16" aria-labelledby="pillars-heading">
          <h2 id="pillars-heading" className="sr-only">
            What makes this different
          </h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="rounded-lg border border-stone-200 bg-white p-6"
              >
                <span className="mb-3 block text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  {pillar.label}
                </span>
                <h3 className="mb-2 font-serif text-lg font-semibold text-stone-800">
                  {pillar.title}
                </h3>
                <p className="text-sm text-stone-600">{pillar.body}</p>
              </div>
            ))}
          </div>
        </section>

        {recentPosts.length > 0 && (
          <section className="mb-16" aria-labelledby="recent-heading">
            <div className="mb-6 flex items-baseline justify-between">
              <h2
                id="recent-heading"
                className="font-serif text-2xl font-semibold text-stone-800"
              >
                Recent entries
              </h2>
              <Link
                href={ROUTES.entries}
                className="text-sm font-semibold text-stone-600 hover:text-stone-800 focus-visible:text-stone-800"
              >
                View all
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {recentPosts.map((post) => (
                <EntryCard
                  key={post.id}
                  post={post}
                  commentCount={commentCounts[post.id] ?? 0}
                />
              ))}
            </div>
          </section>
        )}

        <section className="rounded-lg border border-stone-200 bg-white p-8 text-center">
          <h2 className="mb-2 font-serif text-2xl font-semibold text-stone-800">
            {NEWSLETTER_HEADING}
          </h2>
          <p className="mb-5 text-sm text-stone-600">{NEWSLETTER_BODY}</p>
          <form className="mx-auto flex max-w-sm gap-2">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@example.com"
              className="flex-1 rounded-md border border-stone-300 px-4 py-2 text-sm text-stone-800 focus-visible:border-stone-500 focus-visible:outline-none"
            />
            <button
              type="submit"
              className="rounded-md bg-stone-800 px-5 py-2 text-sm font-semibold text-stone-50 hover:bg-stone-700 focus-visible:bg-stone-700"
            >
              Subscribe
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
