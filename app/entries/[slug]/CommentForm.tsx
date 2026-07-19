/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: Comment submission form for a single blog post, calls the
 *               submitComment Server Action bound to this post's id. Gated
 *               by a Cloudflare Turnstile widget, verified server-side in
 *               the action, and the comment is held for owner approval
 *               before it appears publicly (see ../db.ts getPendingComments).
 *
 *               Turnstile is rendered explicitly (turnstile.render(), script
 *               loaded with ?render=explicit) rather than via its implicit
 *               "cf-turnstile" class auto-scan. The auto-scan only runs once
 *               when the script itself first loads, so on a client-side
 *               Next.js navigation to a post the widget never appeared,
 *               a full page reload was the only thing that re-triggered it.
 *               Explicit rendering re-renders on every mount instead.
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-17
 * =============================================================================
 */

"use client";

import { useActionState, useEffect, useRef } from "react";
import Script from "next/script";
import { submitComment, type CommentFormState } from "./actions";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: { sitekey: string },
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

const INITIAL_STATE: CommentFormState = { error: null, success: false };
const TURNSTILE_READY_POLL_MS = 100;

interface CommentFormProps {
  postId: string;
  turnstileSiteKey: string;
}

export default function CommentForm({
  postId,
  turnstileSiteKey,
}: CommentFormProps) {
  const [state, formAction, isPending] = useActionState(
    submitComment.bind(null, postId),
    INITIAL_STATE,
  );
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let pollId: ReturnType<typeof setInterval> | undefined;

    function renderWidget() {
      if (cancelled || widgetIdRef.current) return;
      const container = turnstileContainerRef.current;
      if (!container || !window.turnstile) return;
      widgetIdRef.current = window.turnstile.render(container, {
        sitekey: turnstileSiteKey,
      });
    }

    if (window.turnstile) {
      renderWidget();
    } else {
      pollId = setInterval(() => {
        if (window.turnstile) {
          clearInterval(pollId);
          renderWidget();
        }
      }, TURNSTILE_READY_POLL_MS);
    }

    return () => {
      cancelled = true;
      if (pollId) clearInterval(pollId);
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
    };
  }, [turnstileSiteKey]);

  useEffect(() => {
    if (state.success && widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, [state.success]);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
      />
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

      <div ref={turnstileContainerRef} />

      {state.error && (
        <p role="alert" className="text-sm font-semibold text-red-700">
          {state.error}
        </p>
      )}
      {state.success && (
        <p role="status" className="text-sm font-semibold text-emerald-700">
          Thanks, your comment is awaiting approval and will appear once
          reviewed.
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
