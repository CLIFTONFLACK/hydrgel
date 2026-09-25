/**
 * Content for the three audience pages (/new/consumer, /new/corporate, /new/humanitarian)
 * and the home page that routes to them.
 *
 * CLAIMS DISCIPLINE — read before editing copy here.
 * The only contaminant performance HYDRGEL has evidence for is bacteria: the
 * October 2020 lab reports behind `EFFICACY` in `investor.ts`. Heavy metals,
 * viruses and protozoa are claimed in older material but untested, so they
 * appear only as development targets, "subject to testing". Do not name
 * diseases, and do not describe the water as meeting WHO or UNHCR standards.
 *
 * Brand imagery on the corporate and consumer pages is concept work from the consumer
 * strategy deck. None of those brands is a partner, so every page that shows
 * them carries `CONCEPT_NOTICE`.
 */

import { Sparkles, ScrollText, FlaskConical, type LucideIcon } from 'lucide-react'

export const CONCEPT_NOTICE =
  'Concept visuals, created to show how HYDRGEL pouches can carry a partner’s brand. Brands shown are trademarks of their owners. No partnership, sponsorship or endorsement is implied.'

export interface Pillar {
  id: 'unique' | 'patent' | 'diversity'
  Icon: LucideIcon
  eyebrow: string
  title: string
  body: string
  points: string[]
}

/** The three reasons HYDRGEL is different. Shown on home and every focus page. */
export const PILLARS: Pillar[] = [
  {
    id: 'unique',
    Icon: Sparkles,
    eyebrow: 'Uniqueness',
    title: 'Nothing to pump, plug in or replace',
    body: 'The purification happens inside the pouch. A cryogel, a sponge-like hydrogel formed at freezing temperatures, treats the water while it sits. There is no hand pump, no battery and no cartridge to swap.',
    points: ['Fill, wait 3 minutes, drink', 'No power needed', 'Lightweight and reusable'],
  },
  {
    id: 'patent',
    Icon: ScrollText,
    eyebrow: 'Patent',
    title: 'Protected by a granted US patent',
    body: 'US 10,939,677 B2, granted in March 2021, covers the cryogel materials, the way they are made and their use for disinfection. HYDRGEL holds an exclusive worldwide licence to commercialise it.',
    points: ['Granted, not pending', 'Materials, method and use', 'Exclusive worldwide licence'],
  },
  {
    id: 'diversity',
    Icon: FlaskConical,
    eyebrow: 'Purification diversity',
    title: 'One platform, many formulations',
    body: 'The cryogel’s structure can be tuned, so the formulation inside the pouch can be adapted to the water it will meet, region by region and mission by mission.',
    points: [
      'Proven: bacteria, including E. coli, reduced to <1 cfu in lab tests',
      'In development: formulations for other local contaminants, subject to testing',
      'Same pouch, different medium inside',
    ],
  },
]

export const HOW_IT_WORKS = [
  { step: '1', title: 'Fill', body: 'Fill the pouch from a tap, stream or container. A stretch-fit connector fits most taps.' },
  { step: '2', title: 'Treat', body: 'Wait 3 minutes while the hydrogel sachet treats the water inside the pouch.' },
  { step: '3', title: 'Drink', body: 'Drink straight from the spout. Refill and use the pouch again.' },
]

export interface Focus {
  to: '/new/consumer' | '/new/corporate' | '/new/humanitarian'
  label: string
  title: string
  body: string
  image: string
  alt: string
}

/** The three doors on the home page. */
export const FOCUSES: Focus[] = [
  {
    to: '/new/consumer',
    label: 'Consumer',
    title: 'Clean water wherever you travel',
    body: 'A pouch for travellers, hikers and home emergency kits. Refill from the tap and drink in 3 minutes.',
    image: '/images/focus/consumer-hero.webp',
    alt: 'Travellers in an airport carrying and drinking from HYDRGEL pouches',
  },
  {
    to: '/new/corporate',
    label: 'Corporate',
    title: 'Your brand on clean water',
    body: 'Co-branded and custom-shaped pouches for events, airlines, field teams and staff travel.',
    image: '/images/focus/corporate-expo.webp',
    alt: 'Concept: branded HYDRGEL pouches handed out at a technology expo stand',
  },
  {
    to: '/new/humanitarian',
    label: 'Humanitarian',
    title: 'Water at the point of need',
    body: 'Pouches and the HYDRLAB mobile facility for disaster relief, conflict zones and off-grid teams.',
    image: '/images/boy.jpg',
    alt: 'Child holding a HYDRGEL water pouch',
  },
]

export interface ImageCard {
  src: string
  label: string
  alt: string
}

export const REGIONAL_EDITIONS: ImageCard[] = [
  { src: '/images/focus/region-europe.webp', label: 'Europe', alt: 'Concept HYDRGEL pouch in a Europe edition design' },
  { src: '/images/focus/region-north-america.webp', label: 'North America', alt: 'Concept HYDRGEL pouch in a North America edition design' },
  { src: '/images/focus/region-south-america.webp', label: 'South America', alt: 'Concept HYDRGEL pouch in a South America edition design' },
  { src: '/images/focus/region-asia.webp', label: 'Asia', alt: 'Concept HYDRGEL pouch in an Asia edition design' },
  { src: '/images/focus/region-africa.webp', label: 'Africa', alt: 'Concept HYDRGEL pouch in an Africa edition design' },
  { src: '/images/focus/region-australia.webp', label: 'Australia', alt: 'Concept HYDRGEL pouch in an Australia edition design' },
]

export const CO_BRANDED: ImageCard[] = [
  { src: '/images/focus/pack-intel.webp', label: 'Technology', alt: 'Concept co-branded pouch in Intel colours' },
  { src: '/images/focus/pack-gsk.webp', label: 'Pharma and travel health', alt: 'Concept co-branded pouch in GSK colours' },
  { src: '/images/focus/pack-nescafe.webp', label: 'Food and beverage', alt: 'Concept co-branded pouch in Nescafé colours' },
]

export const CUSTOM_SHAPES: ImageCard[] = [
  { src: '/images/focus/shape-nike.webp', label: 'Sportswear', alt: 'Concept pouch shaped as a sportswear logo' },
  { src: '/images/focus/shape-mercedes.webp', label: 'Automotive', alt: 'Concept pouch shaped as an automotive badge' },
  { src: '/images/focus/shape-dominos.webp', label: 'Quick-service food', alt: 'Concept pouch shaped as a food brand tile' },
]

export const AIRLINES: ImageCard[] = [
  { src: '/images/focus/pack-ba.webp', label: 'Full-service carrier', alt: 'Concept airline-livery pouch in British Airways colours' },
  { src: '/images/focus/pack-etihad.webp', label: 'Gulf carrier', alt: 'Concept airline-livery pouch in Etihad colours' },
  { src: '/images/focus/pack-easyjet.webp', label: 'Low-cost carrier', alt: 'Concept airline-livery pouch in easyJet colours' },
]
