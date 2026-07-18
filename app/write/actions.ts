/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: Server Actions for the /write page, login/logout for the
 *               shared passphrase session, and publishing a new entry.
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-18
 * =============================================================================
 */

"use server";

import { redirect } from "next/navigation";
import { ROUTES } from "@/components/SiteRoutes";
import { createPost } from "../entries/db";
import {
  checkPassphrase,
  clearSessionCookie,
  isAuthenticated,
  setSessionCookie,
} from "./auth";

const MIN_MOOD_RATING = 1;
const MAX_MOOD_RATING = 10;
const MAX_TITLE_LENGTH = 120;
const MAX_MOOD_LABEL_LENGTH = 40;
const MAX_EXCERPT_LENGTH = 240;
const MAX_BODY_LENGTH = 20000;

export interface LoginFormState {
  error: string | null;
}

export async function login(
  _prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const passphrase = String(formData.get("passphrase") ?? "");

  if (!(await checkPassphrase(passphrase))) {
    return { error: "Incorrect passphrase." };
  }

  await setSessionCookie();
  redirect(ROUTES.write);
}

export async function logout(): Promise<void> {
  await clearSessionCookie();
  redirect(ROUTES.write);
}

export interface EntryFormState {
  error: string | null;
}

export async function publishEntry(
  _prevState: EntryFormState,
  formData: FormData,
): Promise<EntryFormState> {
  if (!(await isAuthenticated())) {
    return { error: "Your session expired, log in again." };
  }

  const title = String(formData.get("title") ?? "").trim();
  const moodLabel = String(formData.get("moodLabel") ?? "").trim();
  const moodRating = Number(formData.get("moodRating"));
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const bodyRaw = String(formData.get("body") ?? "").trim();

  if (!title || !moodLabel || !excerpt || !bodyRaw) {
    return { error: "Title, mood, excerpt, and body are all required." };
  }
  if (title.length > MAX_TITLE_LENGTH) {
    return { error: "Title is too long." };
  }
  if (moodLabel.length > MAX_MOOD_LABEL_LENGTH) {
    return { error: "Mood label is too long." };
  }
  if (excerpt.length > MAX_EXCERPT_LENGTH) {
    return { error: "Excerpt is too long." };
  }
  if (bodyRaw.length > MAX_BODY_LENGTH) {
    return { error: "Entry body is too long." };
  }
  if (
    !Number.isInteger(moodRating) ||
    moodRating < MIN_MOOD_RATING ||
    moodRating > MAX_MOOD_RATING
  ) {
    return {
      error: `Mood rating must be between ${MIN_MOOD_RATING} and ${MAX_MOOD_RATING}.`,
    };
  }

  const body = bodyRaw
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const post = await createPost({ title, moodLabel, moodRating, excerpt, body });

  redirect(`${ROUTES.entries}/${post.id}`);
}
