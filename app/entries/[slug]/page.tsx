/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: Individual Blog Post Page, reads the post and its comments
 *               from D1 (see db.ts), and renders the comment form.
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-17
 * =============================================================================
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IMGS } from "@/components/HeroImages";
import PageHero from "@/components/PageHero";
import { ROUTES } from "@/components/SiteRoutes";
import {
  formatCommentDate,
  formatPublishedDate,
  getComments,
  getPost,
  getPosts,
} from "../db";
import { PAGE_WATERMARK, PAGE_BLURB, MOOD_BADGE_STYLES } from "../data";
import CommentForm from "./CommentForm";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.id }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Entry not found | The Daily Count" };
  }

  return {
    title: `${post.title} | The Daily Count`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const comments = await getComments(post.id);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <PageHero
        image={IMGS.journalHero}
        label="Blog Entries"
        watermark={PAGE_WATERMARK}
        blurb={PAGE_BLURB}
      />

      <main id="main-content" className="mx-auto max-w-3xl px-6 py-11">
        <Link
          href={ROUTES.entries}
          className="mb-6 inline-block text-sm font-semibold text-stone-600 hover:text-stone-800 focus-visible:text-stone-800"
        >
          Back to entries
        </Link>

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

        <h1 className="mb-2 font-serif text-3xl font-semibold leading-tight text-stone-800 sm:text-4xl">
          {post.title}
        </h1>
        <p className="mb-8 text-xs font-semibold text-stone-500">
          Rated {post.moodRating}/10 that day
        </p>

        {post.body.map((paragraph, index) => (
          <p key={index} className="mb-4 text-base text-stone-700 last:mb-0">
            {paragraph}
          </p>
        ))}

        <section aria-labelledby="comments-heading" className="mt-16">
          <h2
            id="comments-heading"
            className="mb-5 font-serif text-2xl font-semibold text-stone-800"
          >
            Comments{comments.length > 0 ? ` (${comments.length})` : ""}
          </h2>

          <p className="mb-6 text-sm text-stone-600">
            Not for advice or fixing, just for people working through the
            same thing to recognize themselves in it and say so.
          </p>

          <div className="mb-8 flex flex-col gap-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="rounded-lg border border-stone-200 bg-white p-5"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-stone-800">
                    {comment.authorName}
                  </span>
                  <span className="text-xs text-stone-500">
                    {formatCommentDate(comment.createdAt)}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap text-stone-700">
                  {comment.body}
                </p>
              </div>
            ))}
          </div>

          <CommentForm postId={post.id} />
        </section>
      </main>

      <footer className="border-t border-stone-200 py-7 text-center text-sm text-stone-500">
        <Link
          href={ROUTES.entries}
          className="hover:text-stone-800 focus-visible:text-stone-800"
        >
          Back to all entries
        </Link>
      </footer>
    </div>
  );
}
