/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: Shared Hero component, used at the top of each page's content
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-17
 * =============================================================================
 */

import type { ReactNode } from "react";

interface HeroProps {
  eyebrow: string;
  heading: string;
  lede?: string;
  children?: ReactNode;
}

export default function Hero({ eyebrow, heading, lede, children }: HeroProps) {
  return (
    <section className="mb-14">
      <span className="mb-3 block text-xs font-semibold uppercase tracking-wide text-emerald-700">
        {eyebrow}
      </span>
      <h1 className="mb-5 font-serif text-3xl font-semibold leading-tight text-stone-800 sm:text-4xl">
        {heading}
      </h1>
      {lede && <p className="mb-6 max-w-xl text-lg text-stone-700">{lede}</p>}
      {children}
    </section>
  );
}
