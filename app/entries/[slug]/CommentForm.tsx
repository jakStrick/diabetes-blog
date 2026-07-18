/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: Comment submission form for a single blog post, calls the
 *               submitComment Server Action bound to this post's id.
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-17
 * =============================================================================
 */

"use client";

import { useActionState } from "react";
import { submitComment, type CommentFormState } from "./actions";

const INITIAL_STATE: CommentFormState = { error: null, success: false };

interface CommentFormProps {
  postId: string;
}

export default function CommentForm({ postId }: CommentFormProps) {
  const [state, formAction, isPending] = useActionState(
    submitComment.bind(null, postId),
    INITIAL_STATE,
  );

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <div>
        <label
          htmlFor="authorName"
          className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stone-500"
        >
          Name
        </label>
        <input
          id="authorName"
          name="authorName"
          type="text"
          required
          maxLength={80}
          className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm text-stone-800 focus-visible:border-stone-500 focus-visible:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="body"
          className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stone-500"
        >
          Comment
        </label>
        <textarea
          id="body"
          name="body"
          required
          rows={4}
          maxLength={2000}
          className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm text-stone-800 focus-visible:border-stone-500 focus-visible:outline-none"
        />
      </div>

      {state.error && (
        <p role="alert" className="text-sm font-semibold text-red-700">
          {state.error}
        </p>
      )}
      {state.success && (
        <p role="status" className="text-sm font-semibold text-emerald-700">
          Comment posted.
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="self-start rounded-md bg-stone-800 px-4 py-2 text-sm font-semibold text-stone-50 hover:bg-stone-700 focus-visible:bg-stone-700 disabled:opacity-60"
      >
        {isPending ? "Posting..." : "Post comment"}
      </button>
    </form>
  );
}
