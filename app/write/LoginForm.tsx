/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: Passphrase login form for the /write page.
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-18
 * =============================================================================
 */

"use client";

import { useActionState } from "react";
import { login, type LoginFormState } from "./actions";

const INITIAL_STATE: LoginFormState = { error: null };

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, INITIAL_STATE);

  return (
    <form
      action={formAction}
      className="mx-auto flex max-w-sm flex-col gap-3"
    >
      <div>
        <label
          htmlFor="passphrase"
          className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stone-500"
        >
          Passphrase
        </label>
        <input
          id="passphrase"
          name="passphrase"
          type="password"
          required
          autoFocus
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
        className="rounded-md bg-stone-800 px-4 py-2 text-sm font-semibold text-stone-50 hover:bg-stone-700 focus-visible:bg-stone-700 disabled:opacity-60"
      >
        {isPending ? "Checking..." : "Enter"}
      </button>
    </form>
  );
}
