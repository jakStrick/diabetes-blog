/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: Entries Page, Shared Types
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-17
 * =============================================================================
 */

export interface BlogPost {
  id: string;
  publishedAt: string;
  moodLabel: string;
  moodRating: number;
  title: string;
  excerpt: string;
  body: string[];
}

export interface Comment {
  id: number;
  postId: string;
  authorName: string;
  body: string;
  createdAt: string;
}

/**
 * A comment awaiting owner approval, includes the parent post's title so
 * the moderation queue on /write can show context without a second fetch.
 */
export interface PendingComment extends Comment {
  postTitle: string;
}
