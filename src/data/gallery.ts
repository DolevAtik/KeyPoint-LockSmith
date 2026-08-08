/**
 * Before / after job photos.
 *
 * Drop image files into src/assets/gallery/, import them here, and add an entry.
 * The Gallery section is omitted from the page while this array is empty.
 *
 * Prefer matching framing for each pair (same angle / distance) so the slider
 * reads clearly. Keep captions factual — job type only unless the owner
 * confirms a location.
 */

import type { ImageMetadata } from 'astro';

import entryBefore from '../assets/gallery/entry-before.png';
import entryAfter from '../assets/gallery/entry-after.png';
import stormBefore from '../assets/gallery/storm-before.png';
import stormAfter from '../assets/gallery/storm-after.png';
import doubleDoorsBefore from '../assets/gallery/double-doors-before.png';
import doubleDoorsAfter from '../assets/gallery/double-doors-after.png';
import smartLockBefore from '../assets/gallery/smart-lock-before.png';
import smartLockAfter from '../assets/gallery/smart-lock-after.png';

export type GalleryJob = {
  /** Stable id used as a DOM key. */
  id: string;
  /** Short job label shown under the comparison. */
  caption: string;
  before: ImageMetadata;
  after: ImageMetadata;
  /** Optional alt overrides; defaults derive from the caption. */
  beforeAlt?: string;
  afterAlt?: string;
};

export const gallery: GalleryJob[] = [
  {
    id: 'entry-handle-set',
    caption: 'Entry handle & deadbolt replacement',
    before: entryBefore,
    after: entryAfter,
    beforeAlt: 'Worn brass entry handle with missing lock cylinder',
    afterAlt: 'New polished brass Kwikset entry handle and deadbolt',
  },
  {
    id: 'double-doors-hardware',
    caption: 'Double-door hardware installation',
    before: doubleDoorsBefore,
    after: doubleDoorsAfter,
    beforeAlt: 'Grey double doors with open bore hole and incomplete hardware',
    afterAlt: 'Grey double doors with new polished brass handles and deadbolts',
  },
  {
    id: 'smart-lock-install',
    caption: 'Smart lock & handle installation',
    before: smartLockBefore,
    after: smartLockAfter,
    beforeAlt: 'Wooden entry door prepared with sanded bore holes for new hardware',
    afterAlt: 'Wooden entry door with new matte black Defiant smart lock and handle',
  },
  {
    id: 'storm-door-handle',
    caption: 'Storm door handle replacement',
    before: stormBefore,
    after: stormAfter,
    beforeAlt: 'Weathered black Larson storm door handle',
    afterAlt: 'New matte black Wright storm door handle',
  },
];
