/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: New entry authoring form for the /write page, including the
 *               1-10 mood slider with a live numeric readout.
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-18
 * =============================================================================
 */

"use client";

import { useActionState, useState } from "react";
import { publishEntry, type EntryFormState } from "./actions";

const INITIAL_STATE: EntryFormState = { error: null };
const DEFAULT_MOOD_RATING = 5;

export default function EntryForm() {
  const [state, formAction, isPending] = useActionState(
    publishEntry,
    INITIAL_STATE,
  );
  const [moodRating, setMoodRating] = useState(DEFAULT_MOOD_RATING);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div>
        <label
          htmlFor="title"
          className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stone-500"
        >
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          maxLength={120}
          className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm text-stone-800 focus-visible:border-stone-500 focus-visible:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="moodRating"
          className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stone-500"
        >
          Mood: {moodRating}/10
        </label>
        <input
          id="moodRating"
          name="moodRating"
          type="range"
          min={1}
          max={10}
          step={1}
          value={moodRating}
          onChange={(event) => setMoodRating(Number(event.target.value))}
          className="w-full accent-emerald-700"
        />
        <div className="mt-1 flex justify-between text-xs text-stone-500">
          <span>1, underwater</span>
          <span>10, steady</span>
        </div>
      </div>

      <div>
        <label
          htmlFor="moodLabel"
          className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stone-500"
        >
          Mood in a few words
        </label>
        <input
          id="moodLabel"
          name="moodLabel"
          type="text"
          required
          maxLength={40}
          placeholder="e.g. dark humor, actually okay, low and low"
          className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm text-stone-800 focus-visible:border-stone-500 focus-visible:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="excerpt"
          className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stone-500"
        >
          Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          required
          rows={2}
          maxLength={240}
          placeholder="One or two sentences shown on the entries list"
          className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm text-stone-800 focus-visible:border-stone-500 focus-visible:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="body"
          className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stone-500"
        >
          Entry
        </label>
        <textarea
          id="body"
          name="body"
          required
          rows={14}
          maxLength={20000}
          placeholder="Write the entry. Leave a blank line between paragraphs."
          className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm text-stone-800 focus-visible:border-stone-500 focus-visible:outline-none"
        />
      </div>

      {state.error && (
        <p role="alert" className="text-sm font-semibold text-red-700">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="self-start rounded-md bg-stone-800 px-5 py-2 text-sm font-semibold text-stone-50 hover:bg-stone-700 focus-visible:bg-stone-700 disabled:opacity-60"
      >
        {isPending ? "Publishing..." : "Publish entry"}
      </button>
    </form>
  );
}
