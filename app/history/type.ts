/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: History Page, Shared Types
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-17
 * =============================================================================
 */

export interface HistorySection {
  id: string;
  when: string | null;
  title: string;
  paragraphs: string[];
  callout: string | null;
}

export interface TocItem {
  id: string;
  label: string;
}
