/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: Server Action for submitting a comment on a blog post.
 *               Gated by Cloudflare Turnstile (bot check) and held for owner
 *               approval before it appears publicly, see approvePendingComment
 *               in ../../write/actions.ts and getPendingComments in ../db.ts.
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-17
 * =============================================================================
 */

"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { addComment, getPost } from "../db";
import { notifyNewComment } from "../notify";
import { verifyTurnstileToken } from "../turnstile";
import { ROUTES } from "@/components/SiteRoutes";

const LOCAL_HOSTNAME_PATTERN = /^(localhost|127\.0\.0\.1)/;

async function buildAbsoluteUrl(path: string): Promise<string> {
  const headersList = await headers();
  const host = headersList.get("host");
  if (!host) return path;
  const protocol = LOCAL_HOSTNAME_PATTERN.test(host) ? "http" : "https";
  return `${protocol}://${host}${path}`;
}

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

  const turnstileToken = String(formData.get("cf-turnstile-response") ?? "");
  const headersList = await headers();
  const remoteIp = headersList.get("cf-connecting-ip");
  const humanVerified = await verifyTurnstileToken(turnstileToken, remoteIp);
  if (!humanVerified) {
    return {
      error: "Verification failed, please try the challenge again.",
      success: false,
    };
  }

  await addComment(postId, authorName, body);
  revalidatePath(`${ROUTES.entries}/${postId}`);

  try {
    const post = await getPost(postId);
    const postUrl = await buildAbsoluteUrl(`${ROUTES.entries}/${postId}`);
    const writeUrl = await buildAbsoluteUrl(ROUTES.write);
    await notifyNewComment({
      postTitle: post?.title ?? postId,
      postUrl,
      authorName,
      body: `${body}\n\nAwaiting your approval, read the entry at ${postUrl} or review and approve/reject at ${writeUrl}.`,
    });
  } catch (error) {
    // A failed notification must never block or roll back the comment
    // itself, the comment already succeeded above.
    console.error("Failed to send comment notification email", error);
  }

  return { error: null, success: true };
}
