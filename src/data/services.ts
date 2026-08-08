/**
 * Services offered, as supplied by the owner.
 *
 * Descriptions describe the work only — no response-time, pricing, warranty or
 * availability claims, none of which have been provided.
 */

export type ServiceCategory = 'emergency' | 'residential' | 'commercial' | 'automotive';

export interface Service {
  /** Key into src/components/Icon.astro */
  icon: string;
  name: string;
  description: string;
  category: ServiceCategory;
  /**
   * Leads the services grid, on a gold-edged card. These are the four that stay
   * in front of the fold on a phone, so they are the ones a visitor sees first.
   */
  featured?: boolean;
}

export const services: Service[] = [
  {
    icon: 'lock-open',
    name: 'Emergency Lockouts',
    description:
      "Locked out of your home, business or vehicle? Get back inside without damage to your door, lock or ignition.",
    category: 'emergency',
    featured: true,
  },
  {
    icon: 'car-key',
    name: 'Automotive Key Programming',
    description:
      'Transponder keys and remote head keys cut and programmed to your vehicle, including replacements for lost keys.',
    category: 'automotive',
    featured: true,
  },
  {
    icon: 'rekey',
    name: 'Rekeying Locks',
    description:
      'Keep your existing hardware and change who has access — ideal after a move, a break-up or a lost key.',
    category: 'residential',
    featured: true,
  },
  {
    icon: 'key-cut',
    name: 'Key Duplication',
    description:
      'Spare keys cut for house, office, padlock and mailbox locks so a lost key never leaves you stranded.',
    category: 'residential',
  },
  {
    icon: 'lock-install',
    name: 'Lock Installation',
    description:
      'New locks fitted on doors of all types — entry doors, interior doors, patio doors, gates and storefronts.',
    category: 'residential',
  },
  {
    icon: 'wrench',
    name: 'Lock Repair',
    description:
      'Sticking, loose, seized or misaligned locks diagnosed and repaired instead of needlessly replaced.',
    category: 'residential',
  },
  {
    icon: 'broken-key',
    name: 'Broken Key Extraction',
    description:
      'Snapped a key in the lock or ignition? The broken piece is extracted and a working replacement cut.',
    category: 'emergency',
    featured: true,
  },
  {
    icon: 'master-key',
    name: 'Master Key Systems',
    description:
      'One key for the manager, individual keys for everyone else — designed and keyed for offices and rentals.',
    category: 'commercial',
  },
  {
    icon: 'shield-lock',
    name: 'High-Security Locks',
    description:
      'Pick- and drill-resistant cylinders with restricted keyways, for front doors and commercial entrances.',
    category: 'commercial',
  },
  {
    icon: 'smart-lock',
    name: 'Smart Locks',
    description:
      'Keypad, Bluetooth and Wi-Fi smart locks supplied, installed and set up on your phone.',
    category: 'residential',
  },
  {
    icon: 'safe',
    name: 'Safe Opening & Repair',
    description:
      'Home and office safes opened when the combination is lost, plus lock and hinge repairs.',
    category: 'commercial',
  },
  {
    icon: 'access-control',
    name: 'Access Control Systems',
    description:
      'Electronic entry for offices, warehouses and multi-unit buildings, so access can be granted or revoked at will.',
    category: 'commercial',
  },
  {
    icon: 'key-fob',
    name: 'Key Fobs',
    description:
      'Replacement and spare fobs for vehicles, gates and building entry — supplied and programmed.',
    category: 'automotive',
  },
  {
    icon: 'rfid',
    name: 'RFID Cards',
    description:
      'Proximity cards and tags issued, encoded and added to your existing reader system.',
    category: 'commercial',
  },
  {
    icon: 'deadbolt',
    name: 'Deadbolt Installation',
    description:
      'Grade-rated deadbolts fitted and aligned, including new bores on doors that never had one.',
    category: 'residential',
  },
  {
    icon: 'ignition',
    name: 'Ignition Repair or Replacement',
    description:
      'Worn or jammed ignition cylinders that will not turn repaired or replaced, and keyed to your existing key.',
    category: 'automotive',
  },
  {
    icon: 'keyless',
    name: 'Keyless Entry Systems',
    description:
      'Code, card and fob entry for homes and businesses — no more keys to copy, lose or collect.',
    category: 'commercial',
  },
  {
    icon: 'mailbox',
    name: 'Mailbox Locks',
    description:
      'Cluster-box and individual mailbox locks replaced or rekeyed, with new keys cut on the spot.',
    category: 'residential',
  },
  {
    icon: 'garage',
    name: 'Garage Door Locks',
    description:
      'Side-door, T-handle and roll-up garage locks installed, rekeyed and repaired.',
    category: 'residential',
  },
  {
    icon: 'key-machine',
    name: 'Key Cutting',
    description:
      'Standard, dimple, tubular and high-security keys cut precisely from a key or from the lock itself.',
    category: 'residential',
  },
];

export const categoryLabels: Record<ServiceCategory, string> = {
  emergency: 'Emergency',
  residential: 'Residential',
  commercial: 'Commercial',
  automotive: 'Automotive',
};

/** Feeds the "Service Needed" dropdown on the lead form. */
export const serviceOptions: string[] = [
  ...services.map((s) => s.name),
  'Something else',
];
