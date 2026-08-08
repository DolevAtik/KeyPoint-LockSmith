/**
 * Service areas.
 *
 * One entry per city — never per ZIP code — with real city-centre coordinates
 * (WGS84) so the Leaflet map places every marker where the city actually is.
 * The ZIP codes supplied by the owner are listed on each city's card and in the
 * marker popup.
 *
 * Grouping note: the owner's original list separated "Los Angeles Area",
 * "San Fernando Valley" and "Burbank". Those have been consolidated into the
 * three regions below so each group is geographically coherent and reads well
 * in the grid; every city and ZIP from the original list is still present.
 * Encino's two entries (91316 and 91436) were merged into one marker, since
 * the brief asks for a single marker per city.
 */

export interface ServiceArea {
  city: string;
  zips: string[];
  lat: number;
  lng: number;
}

export interface AreaRegion {
  region: string;
  /** Short line used under the region heading in the area grid. */
  blurb: string;
  cities: ServiceArea[];
}

export const areaRegions: AreaRegion[] = [
  {
    region: 'Ventura County',
    blurb: 'From the coast through the Santa Clara River valley.',
    cities: [
      { city: 'Ventura', zips: ['93001', '93003', '93004'], lat: 34.2805, lng: -119.2945 },
      { city: 'Oxnard', zips: ['93030', '93033', '93035', '93036'], lat: 34.1975, lng: -119.1771 },
      { city: 'Port Hueneme', zips: ['93041'], lat: 34.1478, lng: -119.1951 },
      { city: 'Camarillo', zips: ['93010', '93012'], lat: 34.2164, lng: -119.0376 },
      { city: 'Santa Paula', zips: ['93060'], lat: 34.3542, lng: -119.0593 },
      { city: 'Moorpark', zips: ['93021'], lat: 34.2856, lng: -118.882 },
      { city: 'Simi Valley', zips: ['93063', '93065'], lat: 34.2694, lng: -118.7815 },
    ],
  },
  {
    region: 'Conejo Valley & Calabasas',
    blurb: 'Along the 101 corridor between Ventura County and the West Valley.',
    cities: [
      { city: 'Thousand Oaks', zips: ['91360', '91361', '91362'], lat: 34.1706, lng: -118.8376 },
      { city: 'Westlake Village', zips: ['91361', '91362'], lat: 34.1459, lng: -118.8059 },
      { city: 'Agoura Hills', zips: ['91301'], lat: 34.1533, lng: -118.7615 },
      { city: 'Calabasas', zips: ['91302'], lat: 34.1378, lng: -118.6606 },
    ],
  },
  {
    region: 'San Fernando Valley, Santa Clarita & Burbank',
    blurb: 'Across the Valley floor and the surrounding foothill communities.',
    cities: [
      { city: 'Woodland Hills', zips: ['91364', '91367'], lat: 34.1683, lng: -118.6059 },
      { city: 'West Hills', zips: ['91307'], lat: 34.2019, lng: -118.6454 },
      { city: 'Canoga Park', zips: ['91303', '91304'], lat: 34.2011, lng: -118.5978 },
      { city: 'Chatsworth', zips: ['91311'], lat: 34.2572, lng: -118.6009 },
      { city: 'Porter Ranch', zips: ['91326'], lat: 34.2783, lng: -118.5548 },
      { city: 'Granada Hills', zips: ['91344'], lat: 34.2792, lng: -118.5048 },
      { city: 'Northridge', zips: ['91324', '91325'], lat: 34.2381, lng: -118.5301 },
      { city: 'Reseda', zips: ['91335'], lat: 34.2011, lng: -118.5362 },
      { city: 'Tarzana', zips: ['91356'], lat: 34.1731, lng: -118.5534 },
      { city: 'Encino', zips: ['91316', '91436'], lat: 34.1595, lng: -118.5012 },
      { city: 'Sherman Oaks', zips: ['91423'], lat: 34.1512, lng: -118.4492 },
      { city: 'Van Nuys', zips: ['91401', '91402', '91403', '91405', '91406', '91411'], lat: 34.1866, lng: -118.4487 },
      { city: 'Mission Hills', zips: ['91343', '91345'], lat: 34.2653, lng: -118.467 },
      { city: 'San Fernando', zips: ['91340'], lat: 34.2819, lng: -118.439 },
      { city: 'Pacoima', zips: ['91331'], lat: 34.2728, lng: -118.417 },
      { city: 'Sun Valley', zips: ['91352'], lat: 34.2172, lng: -118.3712 },
      { city: 'Burbank', zips: ['91504', '91505', '91506'], lat: 34.1808, lng: -118.309 },
      { city: 'Santa Clarita', zips: ['91354', '91355', '91357'], lat: 34.3917, lng: -118.5426 },
    ],
  },
];

/** Flat list — used by the map, the JSON-LD areaServed array and the footer. */
export const allAreas: ServiceArea[] = areaRegions.flatMap((r) => r.cities);

export const areaCount = allAreas.length;

/** Deduplicated ZIP list, for the footer's plain-text coverage line. */
export const allZips: string[] = [...new Set(allAreas.flatMap((a) => a.zips))].sort();
