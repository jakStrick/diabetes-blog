/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: Owner-only entry authoring page, gated by a shared
 *               passphrase session (see auth.ts). Not linked from Nav or
 *               Footer, see AGENTS.md's "Backend: Cloudflare D1" section.
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-18
 * =============================================================================
 */

import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import {
  getPosts,
  formatPublishedDate,
  getPendingComments,
  formatCommentDate,
} from "../entries/db";
import { isAuthenticated } from "./auth";
import { logout } from "./actions";
import {
  PAGE_EYEBROW,
  PAGE_HEADING,
  PAGE_INTRO,
  PAGE_WATERMARK,
  PAGE_BLURB,
  MANAGE_ENTRIES_HEADING,
  PENDING_COMMENTS_HEADING,
} from "./data";
import LoginForm from "./LoginForm";
import EntryForm from "./EntryForm";
import ManageEntries from "./ManageEntries";
import ModerateComments from "./ModerateComments";

export const metadata: Metadata = {
  title: "Write | The Daily Count",
  robots: { index: false, follow: false },
};

export default async function WritePage() {
  const authed = await isAuthenticated();
  const posts = authed
    ? (await getPosts()).map((post) => ({
        id: post.id,
        title: post.title,
        displayDate: formatPublishedDate(post.publishedAt),
      }))
    : [];
  const pendingComments = authed
    ? (await getPendingComments()).map((comment) => ({
        id: comment.id,
        postId: comment.postId,
        postTitle: comment.postTitle,
        authorName: comment.authorName,
        body: comment.body,
        displayDate: formatCommentDate(comment.createdAt),
      }))
    : [];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <PageHero
        label="Write"
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

        {authed ? (
          <>
            <form action={logout} className="mb-8">
              <button
                type="submit"
                className="text-sm font-semibold text-stone-600 hover:text-stone-800 focus-visible:text-stone-800"
              >
                Log out
              </button>
            </form>
            <EntryForm />

            <h2 className="mt-11 mb-4 font-serif text-xl font-semibold text-stone-800">
              {MANAGE_ENTRIES_HEADING}
            </h2>
            <ManageEntries posts={posts} />

            <h2 className="mt-11 mb-4 font-serif text-xl font-semibold text-stone-800">
              {PENDING_COMMENTS_HEADING}
            </h2>
            <ModerateComments comments={pendingComments} />
          </>
        ) : (
          <LoginForm />
        )}
      </main>
    </div>
  );
}
