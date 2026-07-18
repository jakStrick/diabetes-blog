/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: Entries Page, D1 Data Access. Single place every server
 *               component or Server Action goes through to read or write
 *               posts and comments, no page queries D1 directly.
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-17
 * =============================================================================
 */

import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { BlogPost, Comment } from "./type";

interface PostRow {
  id: string;
  published_at: string;
  mood_label: string;
  mood_rating: number;
  title: string;
  excerpt: string;
  body: string;
}

interface CommentRow {
  id: number;
  post_id: string;
  author_name: string;
  body: string;
  created_at: string;
}

function toBlogPost(row: PostRow): BlogPost {
  return {
    id: row.id,
    publishedAt: row.published_at,
    moodLabel: row.mood_label,
    moodRating: row.mood_rating,
    title: row.title,
    excerpt: row.excerpt,
    body: JSON.parse(row.body) as string[],
  };
}

function toComment(row: CommentRow): Comment {
  return {
    id: row.id,
    postId: row.post_id,
    authorName: row.author_name,
    body: row.body,
    createdAt: row.created_at,
  };
}

async function getDb() {
  const { env } = await getCloudflareContext({ async: true });
  return env.DB;
}

export function formatPublishedDate(publishedAt: string): string {
  return new Date(`${publishedAt}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * SQLite's datetime('now') returns "YYYY-MM-DD HH:MM:SS" in UTC with a
 * space instead of a "T", swap it so Date can parse it as UTC.
 */
export function formatCommentDate(createdAt: string): string {
  return new Date(`${createdAt.replace(" ", "T")}Z`).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

export async function getPosts(): Promise<BlogPost[]> {
  const db = await getDb();
  const { results } = await db
    .prepare("SELECT * FROM posts ORDER BY published_at DESC")
    .all<PostRow>();
  return results.map(toBlogPost);
}

export async function getPost(id: string): Promise<BlogPost | null> {
  const db = await getDb();
  const row = await db
    .prepare("SELECT * FROM posts WHERE id = ?")
    .bind(id)
    .first<PostRow>();
  return row ? toBlogPost(row) : null;
}

export async function getComments(postId: string): Promise<Comment[]> {
  const db = await getDb();
  const { results } = await db
    .prepare("SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC")
    .bind(postId)
    .all<CommentRow>();
  return results.map(toComment);
}

export async function getCommentCounts(): Promise<Record<string, number>> {
  const db = await getDb();
  const { results } = await db
    .prepare("SELECT post_id, COUNT(*) as count FROM comments GROUP BY post_id")
    .all<{ post_id: string; count: number }>();

  const counts: Record<string, number> = {};
  for (const row of results) {
    counts[row.post_id] = row.count;
  }
  return counts;
}

export async function addComment(
  postId: string,
  authorName: string,
  body: string,
): Promise<void> {
  const db = await getDb();
  await db
    .prepare(
      "INSERT INTO comments (post_id, author_name, body) VALUES (?, ?, ?)",
    )
    .bind(postId, authorName, body)
    .run();
}

function slugify(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/['‘’]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "entry"
  );
}

export interface NewPost {
  title: string;
  moodLabel: string;
  moodRating: number;
  excerpt: string;
  body: string[];
}

export async function createPost(input: NewPost): Promise<BlogPost> {
  const baseSlug = slugify(input.title);
  let slug = baseSlug;
  let suffix = 2;
  while (await getPost(slug)) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  const publishedAt = new Date().toISOString().slice(0, 10);

  const db = await getDb();
  await db
    .prepare(
      "INSERT INTO posts (id, published_at, mood_label, mood_rating, title, excerpt, body) VALUES (?, ?, ?, ?, ?, ?, ?)",
    )
    .bind(
      slug,
      publishedAt,
      input.moodLabel,
      input.moodRating,
      input.title,
      input.excerpt,
      JSON.stringify(input.body),
    )
    .run();

  return {
    id: slug,
    publishedAt,
    moodLabel: input.moodLabel,
    moodRating: input.moodRating,
    title: input.title,
    excerpt: input.excerpt,
    body: input.body,
  };
}
