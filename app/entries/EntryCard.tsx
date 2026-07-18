/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: Shared blog post preview card, used by both the entries
 *               listing page and the Home page's "Recent entries" section.
 *               Ends in an explicit "Read the full entry" call to action so
 *               it's obvious the whole card is a link to the post and its
 *               comments, not just a static summary.
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-18
 * =============================================================================
 */

import Link from "next/link";
import { ROUTES } from "@/components/SiteRoutes";
import { MOOD_BADGE_STYLES } from "./data";
import { formatPublishedDate } from "./db";
import type { BlogPost } from "./type";

interface EntryCardProps {
  post: BlogPost;
  commentCount: number;
  headingLevel?: 2 | 3;
}

export default function EntryCard({
  post,
  commentCount,
  headingLevel = 3,
}: EntryCardProps) {
  const Heading = `h${headingLevel}` as "h2" | "h3";

  return (
    <Link
      href={`${ROUTES.entries}/${post.id}`}
      className="block rounded-lg border border-stone-200 bg-white p-6 transition-colors hover:border-emerald-600 focus-visible:border-emerald-600"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold text-stone-500">
          {formatPublishedDate(post.publishedAt)}
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            MOOD_BADGE_STYLES[post.moodLabel] ?? "bg-stone-100 text-stone-700"
          }`}
        >
          {post.moodLabel}
        </span>
      </div>
      <Heading className="mb-2 font-serif text-xl font-semibold text-stone-800">
        {post.title}
      </Heading>
      <p className="mb-3 text-sm text-stone-600">{post.excerpt}</p>
      <div className="flex items-center justify-between border-t border-stone-100 pt-3">
        <span className="text-xs font-semibold text-stone-500">
          Rated {post.moodRating}/10 that day
        </span>
        <span className="text-xs font-semibold text-emerald-700">
          Read the full entry
          {commentCount > 0
            ? ` & ${commentCount} comment${commentCount === 1 ? "" : "s"}`
            : " & leave a comment"}{" "}
          →
        </span>
      </div>
    </Link>
  );
}
