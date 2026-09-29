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
 * NO THIRD-PARTY BRANDS. The site shows no other company's name, logo, livery
 * or trade dress, on a pouch or in a scene. The earlier concept renders did,
 * and were removed: a disclaimer does not cure putting someone else's mark on
 * our product. Partner concepts are drawn unbranded (`ConceptPouch`) until a
 * partner gives written permission to be shown.
 *
 * The pouch is still in development, so product imagery is concept work and
 * every section that shows it carries `CONCEPT_NOTICE`.
 */

import { Sparkles, ScrollText, FlaskConical, type LucideIcon } from 'lucide-react'

export const CONCEPT_NOTICE =
  'Concept visuals. The pouch is in development, and the designs shown illustrate what is planned rather than a product on sale.'

/** Shown with imagery that depicts the pouch in use in the field. */
export const ILLUSTRATIVE_NOTICE =
  'Illustrative image. The pouch is in its pilot phase and has not yet been deployed in the field.'

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
  { step: '1', title: 'Fill', body: 'Fill the pouch from a tap or container. A stretch-fit connector fits most taps.' },
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
    image: '/images/focus/consumer-lineup.webp',
    alt: 'Concept: six HYDRGEL pouches, each printed across the whole face in a different colour',
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

export type PouchShape = 'pouch' | 'round' | 'shield' | 'hexagon'

export interface ConceptCard {
  label: string
  shape: PouchShape
  /** Face colour, and the darker shade used for the band and the shading. */
  face: string
  shade: string
  alt: string
}

/** Unbranded colourways. The partner's identity is a placeholder, never a real mark. */
export const CO_BRANDED: ConceptCard[] = [
  { label: 'Technology', shape: 'pouch', face: '#1d4ed8', shade: '#1e3a8a', alt: 'Concept pouch printed across the whole face in deep blue, with a placeholder where a partner logo would sit' },
  { label: 'Pharma and travel health', shape: 'pouch', face: '#0f766e', shade: '#134e4a', alt: 'Concept pouch printed across the whole face in teal, with a placeholder where a partner logo would sit' },
  { label: 'Food and beverage', shape: 'pouch', face: '#b45309', shade: '#78350f', alt: 'Concept pouch printed across the whole face in amber, with a placeholder where a partner logo would sit' },
]

export const CUSTOM_SHAPES: ConceptCard[] = [
  { label: 'Round', shape: 'round', face: '#334155', shade: '#0f172a', alt: 'Concept pouch cut to a round outline' },
  { label: 'Shield', shape: 'shield', face: '#be123c', shade: '#881337', alt: 'Concept pouch cut to a shield outline' },
  { label: 'Hexagon', shape: 'hexagon', face: '#6d28d9', shade: '#4c1d95', alt: 'Concept pouch cut to a hexagon outline' },
]

export const TRAVEL_FORMATS = [
  { title: 'Amenity kit', body: 'A pouch in the carrier’s colours, handed out on board in place of a plastic bottle.' },
  { title: 'In-flight shop', body: 'A product passengers buy on board and keep using at the other end of the journey.' },
  { title: 'Duty-free line', body: 'A travel-retail range on the shelf in departures, with an edition for each destination.' },
]

/** What an investor can check, in one row under the home hero. */
export const PROOF_POINTS = [
  { value: 'US 10,939,677 B2', label: 'Patent granted, March 2021' },
  { value: 'Exclusive', label: 'Worldwide licence, signed November 2024' },
  { value: '<1 cfu', label: 'Bacteria after treatment, in lab tests' },
  { value: '4 sectors', label: 'Pilot partners with intent expressed' },
  { value: '$0.20 / litre', label: 'Modelled cost, against $1.50 bottled' },
]
