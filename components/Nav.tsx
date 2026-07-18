/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: Site Nav, shared across every page via the root layout
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-17
 * =============================================================================
 */

import Image from "next/image";
import Link from "next/link";
import { ROUTES, NAV_LABELS } from "./SiteRoutes";

const IMGS = {
  logo: "/images/logo-icon.webp",
};

export default function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
        <Link
          href={ROUTES.home}
          aria-label="The Daily Count, home"
          className="flex items-center gap-2"
        >
          <Image
            src={IMGS.logo}
            alt=""
            width={36}
            height={36}
            className="h-16 w-16"
            preload
          />
          <span className="font-serif text-lg font-semibold text-stone-800">
            The Sugar Blog
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 text-sm text-stone-500 sm:flex"
        >
          <Link
            href={ROUTES.home}
            className="hover:text-stone-800 focus-visible:text-stone-800"
          >
            {NAV_LABELS.home}
          </Link>

          <Link
            href={ROUTES.history}
            className="hover:text-stone-800 focus-visible:text-stone-800"
          >
            {NAV_LABELS.history}
          </Link>
          <Link
            href={ROUTES.entries}
            className="hover:text-stone-800 focus-visible:text-stone-800"
          >
            {NAV_LABELS.entries}
          </Link>

          <Link
            href={ROUTES.about}
            className="hover:text-stone-800 focus-visible:text-stone-800"
          >
            {NAV_LABELS.about}
          </Link>
        </nav>
      </div>
    </header>
  );
}
