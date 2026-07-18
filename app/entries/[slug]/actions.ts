/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: Server Action for submitting a comment on a blog post.
 *
 *  NOTE: there is no auth, spam protection, or moderation queue here yet,
 *  this is an open, unmoderated public form. Anyone can post as anyone.
 *  Treat this as a functional first pass, not launch-ready for a public
 *  audience, moderation is a deliberate follow-up, not an oversight.
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-17
 * =============================================================================
 */

"use server";

import { revalidatePath } from "next/cache";
import { addComment } from "../db";
import { ROUTES } from "@/components/SiteRoutes";

export interface CommentFormState {
  error: string | null;
  success: boolean;
}

const MAX_NAME_LENGTH = 80;
const MAX_COMMENT_LENGTH = 2000;

export async function submitComment(
  postId: string,
  _prevState: CommentFormState,
  formData: FormData,
): Promise<CommentFormState> {
  const authorName = String(formData.get("authorName") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  if (!authorName || !body) {
    return { error: "Name and comment are both required.", success: false };
  }

  if (authorName.length > MAX_NAME_LENGTH) {
    return { error: "Name is too long.", success: false };
  }

  if (body.length > MAX_COMMENT_LENGTH) {
    return {
      error: `Comment is too long (${MAX_COMMENT_LENGTH} characters max).`,
      success: false,
    };
  }

  await addComment(postId, authorName, body);
  revalidatePath(`${ROUTES.entries}/${postId}`);

  return { error: null, success: true };
}
