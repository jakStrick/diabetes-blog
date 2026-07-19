/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: Email notification via Resend when a reader leaves a comment.
 *               Single place any Resend call goes through, mirrors the rule
 *               in db.ts that all D1 access goes through one file. Callers
 *               decide whether a failed send should block anything, this
 *               file just throws on a non-2xx response, see submitComment in
 *               [slug]/actions.ts for the best-effort call site.
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-18
 * =============================================================================
 */

import { getCloudflareContext } from "@opennextjs/cloudflare";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export interface CommentNotification {
  postTitle: string;
  postUrl: string;
  authorName: string;
  body: string;
}

export async function notifyNewComment(
  input: CommentNotification,
): Promise<void> {
  const { env } = await getCloudflareContext({ async: true });

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.RESEND_FROM_EMAIL,
      to: env.RESEND_TO_EMAIL,
      subject: `New comment on "${input.postTitle}"`,
      text: `${input.authorName} commented on "${input.postTitle}":\n\n${input.body}\n\n${input.postUrl}`,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend request failed (${response.status}): ${errorText}`);
  }
}
