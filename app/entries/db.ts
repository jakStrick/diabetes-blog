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
import type { BlogPost, Comment, PendingComment } from "./type";

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
  approved: number;
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

// Public-facing: only comments the owner has approved from /write.
export async function getComments(postId: string): Promise<Comment[]> {
  const db = await getDb();
  const { results } = await db
    .prepare(
      "SELECT * FROM comments WHERE post_id = ? AND approved = 1 ORDER BY created_at ASC",
    )
    .bind(postId)
    .all<CommentRow>();
  return results.map(toComment);
}

// Public-facing counts, mirrors getComments' approved-only filter so the
// number shown on entry cards matches what a visitor can actually see.
export async function getCommentCounts(): Promise<Record<string, number>> {
  const db = await getDb();
  const { results } = await db
    .prepare(
      "SELECT post_id, COUNT(*) as count FROM comments WHERE approved = 1 GROUP BY post_id",
    )
    .all<{ post_id: string; count: number }>();

  const counts: Record<string, number> = {};
  for (const row of results) {
    counts[row.post_id] = row.count;
  }
  return counts;
}

export async function getPendingComments(): Promise<PendingComment[]> {
  const db = await getDb();
  const { results } = await db
    .prepare(
      `SELECT c.*, p.title AS post_title FROM comments c
       JOIN posts p ON p.id = c.post_id
       WHERE c.approved = 0
       ORDER BY c.created_at ASC`,
    )
    .all<CommentRow & { post_title: string }>();
  return results.map((row) => ({ ...toComment(row), postTitle: row.post_title }));
}

/**
 * New comments start unapproved (approved defaults to 0), see
 * migrations/0002_comment_moderation.sql, and only appear publicly once
 * approveComment is called from the /write moderation queue.
 */
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

export async function approveComment(id: number): Promise<void> {
  const db = await getDb();
  await db.prepare("UPDATE comments SET approved = 1 WHERE id = ?").bind(id).run();
}

export async function rejectComment(id: number): Promise<void> {
  const db = await getDb();
  await db.prepare("DELETE FROM comments WHERE id = ?").bind(id).run();
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

/**
 * Comments have no ON DELETE CASCADE (see migrations/0001_init.sql), so
 * both statements run as one atomic batch rather than two separate calls.
 */
export async function deletePost(id: string): Promise<void> {
  const db = await getDb();
  await db.batch([
    db.prepare("DELETE FROM comments WHERE post_id = ?").bind(id),
    db.prepare("DELETE FROM posts WHERE id = ?").bind(id),
  ]);
}
