/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: Owner-only list of existing entries on the /write page, each
 *               with a delete action gated by a confirm prompt.
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-18
 * =============================================================================
 */

"use client";

import { deleteEntry } from "./actions";
import { DELETE_CONFIRM_TEXT, MANAGE_ENTRIES_EMPTY_TEXT } from "./data";

export interface ManageEntriesRow {
  id: string;
  title: string;
  displayDate: string;
}

interface ManageEntriesProps {
  posts: ManageEntriesRow[];
}

export default function ManageEntries({ posts }: ManageEntriesProps) {
  if (posts.length === 0) {
    return <p className="text-sm text-stone-500">{MANAGE_ENTRIES_EMPTY_TEXT}</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {posts.map((post) => (
        <li
          key={post.id}
          className="flex items-center justify-between gap-4 rounded-md border border-stone-200 bg-white px-4 py-3"
        >
          <div>
            <p className="text-sm font-semibold text-stone-800">{post.title}</p>
            <p className="text-xs text-stone-500">{post.displayDate}</p>
          </div>
          <form
            action={deleteEntry}
            onSubmit={(event) => {
              if (!window.confirm(DELETE_CONFIRM_TEXT)) {
                event.preventDefault();
              }
            }}
          >
            <input type="hidden" name="postId" value={post.id} />
            <button
              type="submit"
              className="text-sm font-semibold text-red-700 hover:text-red-800 focus-visible:text-red-800"
            >
              Delete
            </button>
          </form>
        </li>
      ))}
    </ul>
  );
}
