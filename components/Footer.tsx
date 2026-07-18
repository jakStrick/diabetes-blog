/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: Site Footer, shared across every page via the root layout
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-17
 * =============================================================================
 */

import Link from "next/link";
import { ROUTES } from "./SiteRoutes";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-3xl px-6 py-8">
        <p className="text-center text-sm text-stone-600">
          This is one person&apos;s real, unfiltered experience, not medical advice. If you&apos;re
          in crisis, 988 is available to call or text, 24/7.
        </p>

        <nav aria-label="Footer" className="mt-5 flex justify-center gap-6 text-sm text-stone-500">
          <Link href={ROUTES.entries} className="hover:text-stone-800 focus-visible:text-stone-800">
            Entries
          </Link>
          <Link href={ROUTES.history} className="hover:text-stone-800 focus-visible:text-stone-800">
            History of diabetes
          </Link>
          <Link href={ROUTES.about} className="hover:text-stone-800 focus-visible:text-stone-800">
            About
          </Link>
        </nav>

        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-stone-200 pt-5 text-xs text-stone-500 sm:flex-row">
          <p>Copyright {currentYear} the daily count.</p>
          <p className="text-xs text-stone-500">
            Website by{" "}
            <a
              href="https://www.dcsswebdev.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-800 transition-colors"
            >
              DCSS Web Development LLC
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}