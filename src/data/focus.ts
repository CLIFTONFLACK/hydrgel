/**
 * Content for the three audience pages (/consumer, /corporate, /humanitarian)
 * and the home page that routes to them.
 *
 * CLAIMS DISCIPLINE — read before editing copy here.
 * The only contaminant performance HYDRGEL has evidence for is bacteria: the
 * October 2020 lab reports behind `EFFICACY` in `investor.ts`. Heavy metals,
 * viruses and protozoa are claimed in older material but untested, so they
 * appear only as development targets, "subject to testing". Do not name
 * diseases, and do not describe the water as meeting WHO or UNHCR standards.
 *
 * NO THIRD-PARTY BRANDS. Partner imagery on the corporate page shows a
 * "YOUR BRAND" or "YOUR AIRLINE" placeholder, never a real company's name,
 * logo, livery or trade dress. The first set of renders did carry real brands
 * and was replaced on 2026-10-04. Do not add a real brand without the owner's
 * written permission; a disclaimer is not a substitute.
 *
 * The pouch is still in development, so all product imagery is concept work
 * and carries `CONCEPT_NOTICE`.
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
  /** Plain statement of the point, used by the compact strip on the market pages. */
  title: string
  /** The point as a slogan, for the animated section on the home page. */
  slogan: string
  /** One supporting line under the slogan. Keep the claims rule: bacteria is the only proven result. */
  line: string
}

/** The three reasons HYDRGEL is different. Shown on home and every focus page. */
export const PILLARS: Pillar[] = [
  {
    id: 'unique',
    Icon: Sparkles,
    eyebrow: 'Uniqueness',
    title: 'Nothing to pump, plug in or replace',
    slogan: 'Fill. Wait. Drink.',
    line: 'No pump, no power, no cartridge.',
  },
  {
    id: 'patent',
    Icon: ScrollText,
    eyebrow: 'Patent',
    title: 'Protected by a granted US patent',
    slogan: 'Patented. Exclusively ours.',
    line: 'A granted US patent and a worldwide licence.',
  },
  {
    id: 'diversity',
    Icon: FlaskConical,
    eyebrow: 'Purification diversity',
    title: 'One platform, many formulations',
    slogan: 'One pouch. Tuned to the water.',
    line: 'Proven on bacteria. More formulations in development.',
  },
]

export const HOW_IT_WORKS = [
  { step: '1', title: 'Fill', body: 'Fill the pouch from a tap or container. A stretch-fit connector fits most taps.' },
  { step: '2', title: 'Treat', body: 'Wait 3 minutes while the hydrogel sachet treats the water inside the pouch.' },
  { step: '3', title: 'Drink', body: 'Drink straight from the spout. Refill and use the pouch again.' },
]

export interface Focus {
  to: '/consumer' | '/corporate' | '/humanitarian'
  label: string
  title: string
  body: string
  image: string
  alt: string
}

/** The three doors on the home page. */
export const FOCUSES: Focus[] = [
  {
    to: '/consumer',
    label: 'Consumer',
    title: 'Clean water wherever you travel',
    body: 'A pouch for travellers, hikers and home emergency kits. Refill from the tap and drink in 3 minutes.',
    image: '/images/focus/consumer-hero.webp',
    alt: 'Travellers in an airport carrying and drinking from HYDRGEL pouches',
  },
  {
    to: '/corporate',
    label: 'Corporate',
    title: 'Your brand on clean water',
    body: 'Co-branded and custom-shaped pouches for events, airlines, field teams and staff travel.',
    image: '/images/focus/corporate-expo.webp',
    alt: 'Concept: pouches printed with a placeholder brand handed out at a technology expo stand',
  },
  {
    to: '/humanitarian',
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
  { src: '/images/focus/pack-technology.webp', label: 'Technology', alt: 'Concept blue pouch printed with the placeholder "Your brand"' },
  { src: '/images/focus/pack-pharma.webp', label: 'Pharma and travel health', alt: 'Concept orange pouch printed with the placeholder "Your brand"' },
  { src: '/images/focus/pack-food.webp', label: 'Food and beverage', alt: 'Concept red pouch with a coffee-bean pattern, printed with the placeholder "Your brand"' },
]

export const CUSTOM_SHAPES: ImageCard[] = [
  { src: '/images/focus/shape-trainer.webp', label: 'Sportswear', alt: 'Concept black pouch cut to the outline of a running shoe' },
  { src: '/images/focus/shape-car.webp', label: 'Automotive', alt: 'Concept silver pouch with the outline of a car' },
  { src: '/images/focus/shape-pizza.webp', label: 'Quick-service food', alt: 'Concept pouch cut to the shape of a pizza slice' },
]

export const AIRLINES: ImageCard[] = [
  { src: '/images/focus/pack-airline-navy.webp', label: 'Full-service carrier', alt: 'Concept white and navy pouch printed with the placeholder "Your airline"' },
  { src: '/images/focus/pack-airline-sand.webp', label: 'Premium carrier', alt: 'Concept sand and gold pouch printed with the placeholder "Your airline"' },
  { src: '/images/focus/pack-airline-teal.webp', label: 'Low-cost carrier', alt: 'Concept teal pouch printed with the placeholder "Your airline"' },
]

/** What an investor can check, in one row under the home hero. */
export const PROOF_POINTS = [
  { value: 'US 10,939,677 B2', label: 'Patent granted, March 2021' },
  { value: 'Exclusive', label: 'Worldwide licence, signed November 2024' },
  { value: '<1 cfu', label: 'Bacteria after treatment, in lab tests' },
  { value: '4 sectors', label: 'Pilot partners with intent expressed' },
  { value: '$0.20 / litre', label: 'Modelled cost, against $1.50 bottled' },
]
