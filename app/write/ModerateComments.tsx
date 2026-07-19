/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: Owner-only queue of comments awaiting approval on /write,
 *               each with Approve/Reject actions. Nothing here appears
 *               publicly until approved, see getComments in ../entries/db.ts.
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-19
 * =============================================================================
 */

"use client";

import { approvePendingComment, rejectPendingComment } from "./actions";
import {
  PENDING_COMMENTS_EMPTY_TEXT,
  REJECT_COMMENT_CONFIRM_TEXT,
} from "./data";

export interface PendingCommentRow {
  id: number;
  postId: string;
  postTitle: string;
  authorName: string;
  body: string;
  displayDate: string;
}

interface ModerateCommentsProps {
  comments: PendingCommentRow[];
}

export default function ModerateComments({ comments }: ModerateCommentsProps) {
  if (comments.length === 0) {
    return <p className="text-sm text-stone-500">{PENDING_COMMENTS_EMPTY_TEXT}</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {comments.map((comment) => (
        <li
          key={comment.id}
          className="rounded-md border border-stone-200 bg-white px-4 py-3"
        >
          <div className="mb-2 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-stone-800">
                {comment.authorName}
                <span className="font-normal text-stone-500">
                  {" "}
                  on &ldquo;{comment.postTitle}&rdquo;
                </span>
              </p>
              <p className="text-xs text-stone-500">{comment.displayDate}</p>
            </div>
          </div>

          <p className="mb-3 text-sm whitespace-pre-wrap text-stone-700">
            {comment.body}
          </p>

          <div className="flex items-center gap-4">
            <form action={approvePendingComment}>
              <input type="hidden" name="commentId" value={comment.id} />
              <input type="hidden" name="postId" value={comment.postId} />
              <button
                type="submit"
                className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 focus-visible:text-emerald-800"
              >
                Approve
              </button>
            </form>
            <form
              action={rejectPendingComment}
              onSubmit={(event) => {
                if (!window.confirm(REJECT_COMMENT_CONFIRM_TEXT)) {
                  event.preventDefault();
                }
              }}
            >
              <input type="hidden" name="commentId" value={comment.id} />
              <button
                type="submit"
                className="text-sm font-semibold text-red-700 hover:text-red-800 focus-visible:text-red-800"
              >
                Reject
              </button>
            </form>
          </div>
        </li>
      ))}
    </ul>
  );
}
