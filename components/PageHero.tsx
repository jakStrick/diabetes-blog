/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: Shared full-width page hero banner (image or placeholder),
 *               imported and used at the top of every page's content.
 *               Renders a text watermark across the image and a short blurb
 *               chip in the upper right corner, both driven by page data.
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-17
 * =============================================================================
 */

import Image from "next/image";

/**
 * The single required intrinsic size for every hero photo. Prep each photo
 * to this size (or the same ~1.87:1 aspect ratio) before adding it to
 * public/images and registering it in HeroImages.ts, so this is the only
 * place that ever needs to change if the standard hero size changes.
 */
export const ImageDimensions = {
  width: 1408,
  height: 752,
};

export interface HeroImage {
  src: string;
  alt: string;
}

interface PageHeroProps {
  label: string;
  watermark: string;
  blurb: string;
  image?: HeroImage;
}

export default function PageHero({
  label,
  watermark,
  blurb,
  image,
}: PageHeroProps) {
  return (
    <section
      aria-label={image ? image.alt : `${label} hero banner`}
      className="relative h-[35vh] min-h-55 w-full overflow-hidden bg-stone-200"
    >
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          width={ImageDimensions.width}
          height={ImageDimensions.height}
          sizes="100vw"
          preload
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="h-full w-full border-b-2 border-dashed border-stone-400 bg-gradient-to-br from-stone-200 via-stone-100 to-emerald-100">
          <span className="m-4 block text-xs font-semibold uppercase tracking-wide text-stone-500 sm:m-6">
            Image placeholder: {label}
          </span>
        </div>
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center bg-stone-900/50 py-2 sm:py-3"
      >
        <span className="select-none whitespace-nowrap px-4 text-lg font-bold uppercase tracking-[0.35em] text-stone-50 sm:text-2xl">
          {watermark}
        </span>
      </div>

      <div className="absolute top-4 right-4 max-w-[12rem] rounded-md bg-stone-900/70 px-3 py-2 text-right backdrop-blur-sm sm:top-6 sm:right-6 sm:max-w-xs">
        <p className="text-xs leading-snug text-stone-50 sm:text-sm">{blurb}</p>
      </div>
    </section>
  );
}
