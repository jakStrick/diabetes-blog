<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Single Source of Truth (The Daily Count)

Every fact about this site, a piece of copy, a style value, a dimension, a
route path, a link label, must exist in exactly one place in the codebase.
Everywhere else that needs it imports or references that one place, it never
retypes it. This directive governs everything else in this file, the more
specific rules below (page shells, hero images, watermark/blurb) are each an
application of it, and it applies equally to any new page, component, or
data file added later, not just what's already here.

Concrete rules:

- Before hardcoding a value, a string, a class name, a path, a number, in a
  page or component, check whether it already exists elsewhere (another
  page's `data.ts`, `Nav.tsx`, `Footer.tsx`, `PageHero.tsx`,
  `HeroImages.ts`, `SiteRoutes.ts`, `globals.css`). If it does, import it,
  don't retype it.
- If a value or piece of config is needed by two or more places, an internal
  route path, hero sizing, hero image dimensions, nav/footer links, site
  metadata, mood badge colors, and so on, it belongs in one shared file that
  the rest of the site imports, never copy-pasted into each page. Internal
  route paths specifically come from `ROUTES` in
  `@/components/SiteRoutes.ts`, never a hardcoded `href="/..."` string.
- If you notice the same value already exists in two or more places, that is
  drift waiting to happen, consolidate it into one and have the others
  reference it. Don't paper over it by adding a third copy.
- Prefer extending an existing single-source file or constant
  (`SiteRoutes.ts`, `HeroImages.ts`, `PageHero.tsx`'s `ImageDimensions`, a
  page's `data.ts`) over introducing a second, parallel place that describes
  the same kind of thing.
- This does not mean over-abstracting content that is genuinely one-off. A
  page's own copy (`PAGE_HEADING`, `PAGE_INTRO`, etc.) still lives in that
  page's own `data.ts`, since nothing else on the site needs it. The rule is
  about anything reused, referenced, or duplicated in more than one place,
  not about eliminating page-specific content.

# Page Layout Conventions (The Daily Count)

This site has two distinct page shapes. Every page must be built as one of
these two, never a one-off structure. `app/history/page.tsx` is the reference
implementation of the "content page" shape; treat it as the template to copy
when building or fixing any other content page.

## 1. Content pages (History, Entries, About, and any future standalone page)

These are pages that exist to present a body of written content under one
heading, not the landing page. Each one lives in its own `app/[page]/`
directory and is split into up to three sibling files:

```
app/[page]/
  page.tsx   <- component only
  data.ts    <- PAGE_EYEBROW, PAGE_HEADING, PAGE_INTRO, PAGE_FOOTER_NOTE,
                PAGE_WATERMARK, PAGE_BLURB (see section 3), and any
                page-specific content arrays
  type.ts    <- interfaces for anything in data.ts beyond plain string
                constants; omit this file if data.ts only exports strings
```

`page.tsx` must render this exact shell, in this order:

1. Root element: `<div className="min-h-screen bg-stone-50 text-stone-800">`
2. `<PageHero label="..." watermark={PAGE_WATERMARK} blurb={PAGE_BLURB} />`
   from `@/components/PageHero`, immediately inside the root div, before
   `<main>`. Pass `image={...}` from `@/components/HeroImages` only once a
   real photo exists for that page, otherwise omit `image` and let PageHero
   render its placeholder. Never pass `alt`, dimensions, or any other hero
   styling from the page itself, see section 3.
3. `<main id="main-content" className="mx-auto max-w-3xl px-6 py-11">`
   containing, in order:
   - eyebrow: `<span className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{PAGE_EYEBROW}</span>`
   - heading: `<h1 className="mt-2 mb-5 font-serif text-3xl font-semibold leading-tight text-stone-800 sm:text-4xl">{PAGE_HEADING}</h1>`
   - intro: `<p className="mb-5 text-lg text-stone-700">{PAGE_INTRO}</p>`
   - optional table of contents `<nav>`, only when the page has multiple
     `id`-anchored sections to jump to (see history's `TOC_ITEMS`)
   - the page's actual content, built by mapping over a typed array from
     `data.ts` (see history's `HISTORY_SECTIONS`), not hardcoded JSX,
     once that content exists
4. `<footer className="border-t border-stone-200 py-7 text-center text-sm text-stone-500">{PAGE_FOOTER_NOTE}</footer>`,
   sibling to `<main>`, inside the root div

Do not use the `Hero` component (`@/components/Hero`) on content pages, it is
reserved for the landing page. Do not wrap content pages in `max-w-3xl` at
the root, that constraint belongs on `<main>` only, so `PageHero` can render
full width above it.

## 2. Landing page (Home, `app/page.tsx`)

The home page is intentionally different, it is a marketing/landing layout,
not a content page, and does not need to follow the shell above. It keeps its
own pattern: `<PageHero>` full width, then a `max-w-3xl` wrapper containing
the text `Hero` component (`@/components/Hero`, eyebrow/heading/lede) and
whatever landing sections it needs (pillars, entry previews, newsletter
signup). Its data stays in `app/data.ts`, including `HERO_WATERMARK` and
`HERO_BLURB` (same purpose as `PAGE_WATERMARK`/`PAGE_BLURB` on content pages,
just named for a hero rather than a page, see section 3).

## 3. Hero images

Every page's hero banner comes from `@/components/PageHero`, which always
renders full width at `h-[25vh]` (`min-h-[220px]`). That sizing lives in
`PageHero.tsx` alone, never override it with a className or style prop from
a page.

Real photos are registered as named `HeroImage` entries (`src`, `alt`) in
the shared `IMGS` object in `@/components/HeroImages.ts`, never as inline
string literals, and never as a bare path. A page passes the whole entry as
`image={IMGS.someHero}` and nothing else, PageHero reads `alt` off that
object. Do not add an `alt` prop to `<PageHero>` and do not pass width or
height from a page.

Every hero photo must be exactly `ImageDimensions.width` x
`ImageDimensions.height` (currently 1408x752), the single constant exported
from `@/components/PageHero.tsx`. `PageHero` applies those dimensions to
every real photo it renders, since it uses explicit width/height rather than
`fill`. This is the one place hero sizing can be changed, if the standard
size ever needs to change, update `ImageDimensions` there, don't add
width/height back onto individual `IMGS` entries. Before adding a new hero
photo, resize/crop it to match `ImageDimensions` (or the same ~1.87:1 aspect
ratio) and confirm the actual file, e.g. with `sharp(file).metadata()`, not
just the filename, since a mismatched photo will stretch or crop oddly.

A page with no real photo yet renders `<PageHero label="..." />` with no
`image` prop at all, which shows the built-in placeholder using `label` for
both the display text and the generated `aria-label`. Do not fabricate a
stand-in photo to fill the slot, and do not add an `alt` prop to a
placeholder call either.

## 4. Hero watermark and blurb

Every `<PageHero>` call, on every page including placeholders, is required
to pass `watermark` and `blurb`, there is no page that skips these two:

- `watermark`: one short, all caps word (or occasionally two) that
  `PageHero` stamps across the middle of the hero as a translucent banner,
  e.g. `DIABETES` for Home, `RESEARCH` for Diabetes Explained, `JOURNAL` for
  Entries, `ABOUT` for About. Pick a single word that names the page's
  subject, not a slogan or sentence, the banner is sized for one short word.
- `blurb`: one short sentence describing what the page contains, rendered by
  `PageHero` in a small chip in the upper right corner of the hero. Keep it
  under roughly 90 characters, it renders in a fixed-width corner box and
  will wrap or overflow if too long.

Both values are content, not styling, so they belong in that page's
`data.ts` (content pages: `PAGE_WATERMARK` / `PAGE_BLURB`, Home:
`HERO_WATERMARK` / `HERO_BLURB`) next to that page's other `PAGE_*`/`HERO_*`
constants, never written inline in `page.tsx`, and never passed as anything
other than those two named props on `<PageHero>`. The watermark ribbon and
blurb chip are rendered and positioned entirely inside `PageHero.tsx`, do
not add competing overlay elements to a page's own JSX.

# Backend: Cloudflare D1 (The Daily Count)

This site is deployed to Cloudflare Workers via `@opennextjs/cloudflare`, and
has a real Cloudflare D1 database (`diabetes-blog-db`, binding `DB`, see
`wrangler.jsonc`) backing blog posts and comments. This is the only backend
in the project, don't introduce a second database, ORM, or storage layer for
new features, extend the D1 schema instead (`migrations/`).

## Data access: db.ts is the only way in

`app/entries/db.ts` is the single place that talks to D1. Every server
component, page, and Server Action that needs a post or a comment calls a
function from `db.ts` (`getPosts`, `getPost`, `getComments`, `getCommentCounts`,
`addComment`, `createPost`), none of them run `env.DB.prepare(...)` directly.
If a new backend-driven feature is added under `app/entries/` or elsewhere,
add its query functions to `db.ts` (or a sibling `db.ts` for a new feature
area) rather than inlining SQL in a page or action. `getCloudflareContext({
async: true })` (from `@opennextjs/cloudflare`) is how `db.ts` reaches the
`DB` binding, pages and components never call it themselves.

Blog post content (`POSTS` used to live in `app/entries/data.ts`) now lives
entirely in D1, seeded by `migrations/0001_init.sql`. `app/entries/data.ts`
only holds this page's static copy and `MOOD_BADGE_STYLES` now, not post
content, don't add a parallel static posts array anywhere, that would
recreate the exact duplication the Single Source of Truth section above
warns against, D1 is the one source of truth for posts and comments.

Dates: `posts.published_at` and any future date column must be stored as an
ISO date string (`YYYY-MM-DD`), never a pre-formatted display string like
"Oct 14, 2026". A prior version of this schema stored dates as display
strings and `ORDER BY date DESC` sorted them wrong (lexicographic, not
chronological). Format for display in the app layer (`formatPublishedDate`,
`formatCommentDate` in `db.ts`), don't store a second, pre-formatted copy of
the same date.

## Writes: Server Actions, not API routes

Mutations (e.g. posting a comment) are React Server Actions
(`"use server"`), colocated with the route that needs them (see
`app/entries/[slug]/actions.ts` and `CommentForm.tsx`), not hand-rolled
`app/api/.../route.ts` REST endpoints. Reads happen directly in server
components by calling `db.ts`, there's no internal fetch/API layer for
reads either. Keep this pattern for future backend features: Server Action
for a write, direct `db.ts` call in the server component for a read, unless
a real external client (not this site's own pages) needs the data, which
would justify an actual Route Handler.

## Known gap: no moderation

The comment form has no authentication, spam protection, or moderation
queue (`app/entries/[slug]/actions.ts` says so at the top of the file too).
Anyone can post a comment as anyone. This was a deliberate, explicit
tradeoff to ship comments now rather than blocking on a moderation design,
not an oversight, but it means this is not launch-ready for a public
audience as-is. Don't quietly build around this gap (e.g. hiding the form)
without flagging it, and don't add a "fix" to it without a specific
decision from David on the moderation approach first.

## Local dev and migrations

- Local D1 state lives in `.wrangler/` (gitignored), it's a local SQLite
  file, separate from the real remote database.
- Schema and seed changes go in a new `migrations/NNNN_description.sql`
  file, never edit an already-applied migration file. Apply locally with
  `npx wrangler d1 execute diabetes-blog-db --local --file=migrations/NNNN_....sql`.
  Applying to the real remote database (`--remote` instead of `--local`) is
  a deliberate deploy-adjacent step, don't run it without being asked.
- `next dev` works against local D1 because `initOpenNextCloudflareForDev()`
  is called in `next.config.ts`, don't remove that call.

## Build: webpack, not Turbopack

`package.json`'s `build` script is `next build --webpack`, not plain
`next build` (Turbopack, Next 16's default). This isn't a style choice:
building this app with Turbopack and then running it through
`opennextjs-cloudflare build` produces a worker that 500s on every route
with `ChunkLoadError: Failed to load chunk server/chunks/ssr/...` on
Cloudflare's Workers runtime (confirmed via `wrangler dev` against the
built worker), while the same code built with webpack works correctly.
Don't switch `build` back to Turbopack without first confirming
`@opennextjs/cloudflare` has fixed Turbopack support (check
https://opennext.js.org/cloudflare/troubleshooting) and re-verifying with
`wrangler dev`, not just `next dev`, since `next dev` alone won't catch this
class of bug.

## Verifying a backend change actually works

`next dev` (plain Node, via `initOpenNextCloudflareForDev()`'s local proxy)
is enough for fast iteration, but it is not the same runtime as production.
Before considering a D1-backed change done, also run it through the real
Workers runtime: `npm run preview` (`opennextjs-cloudflare build` then
`wrangler dev`/`opennextjs-cloudflare preview`), and drive the actual user
flow (not just an HTTP status check) with a browser, since some failures
(like the Turbopack chunk error above) only show up under the real Workers
runtime, not `next dev`.

**Do not run `next build` / `opennextjs-cloudflare build` in this project
directory while David's own `next dev` is running.** Both processes read
and write the same `.next/` directory, and a production build stomping on
a live dev server's `.next/` state has already broken his running server
once (it went completely unresponsive and needed a manual restart). If a
production-runtime check via `wrangler dev` is genuinely needed, ask first
or run it in an isolated worktree/copy of the repo, not the live directory.
For routine verification, prefer testing against whatever dev server is
already running (confirm with a quick `curl`/port check first) over
starting a fresh build.

## Owner authoring: /write

`/write` is where new journal entries get published, gated by a single
shared passphrase (`env.WRITE_PASSPHRASE`, a Cloudflare secret, local value
in `.dev.vars`, never committed, see `.gitignore`). It is a one-author blog,
not a multi-user CMS, don't build out real accounts/roles for it unless
asked. Not linked from `Nav`/`Footer`, `ROUTES.write` exists for internal
use (redirects, etc.) but `NAV_LABELS` deliberately excludes it.

- `app/write/auth.ts`: session logic. The cookie stores a SHA-256 hash of
  the passphrase, never the passphrase itself. `isAuthenticated()` is the
  one check to gate any future owner-only page or Server Action, call it at
  the top of both the page (for the redirect/UI decision) and the action
  (actions are directly callable, page-level gating alone isn't enough).
- `app/write/actions.ts`: `login`, `logout`, `publishEntry` Server Actions.
  `publishEntry` re-checks `isAuthenticated()` itself, don't remove that
  check just because the page already gates the form.
- The mood rating is a real `<input type="range">` (1-10) with a client-side
  live numeric readout (`EntryForm.tsx`), not a text field asking for a
  number, that's what David expects when he says "mood slider" going
  forward for any similar rating input.
- New posts get their `id` (slug) auto-generated from the title
  (`slugify()` in `db.ts`) with a numeric suffix on collision, the author
  never types a slug by hand.
- Local dev needs `.dev.vars` (`WRITE_PASSPHRASE=...`) to exist *before* the
  dev server starts, `initOpenNextCloudflareForDev()` only reads it at
  server boot. If it's added/changed after the server is already running, a
  no-op edit to `next.config.ts` (e.g. a comment) triggers Next's own
  "detected change, restarting" behavior and reloads it, that's safe (it's
  Next restarting itself, not a competing process), unlike running a
  production build against a live dev server, see above.

## Entry card discoverability

Blog post previews (on `/entries` and Home's "Recent entries") use the
shared `app/entries/EntryCard.tsx`, not inline card markup per page. It
always ends with an explicit "Read the full entry & N comments →" /
"Read the full entry & leave a comment →" line (via `getCommentCounts()`),
not just a bare card with no call to action, that was a real usability gap:
without it, a whole clickable card reads as a static summary, not something
you click through to actually read the post and see or leave comments.
Keep that explicit affordance on any new entry preview surface, don't
regress to a silent `<Link>`-wrapped card.
