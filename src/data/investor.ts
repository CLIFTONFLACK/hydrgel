/**
 * Investor-page content, drawn from HYDRGEL's own company presentation
 * (v13.1, January 2026), the October 2025 executive summary and the
 * November 2025 company summary.
 *
 * DELIBERATELY EXCLUDED: everything from the ACRA business profile's
 * officer and shareholder tables — names, residential addresses, NRIC and
 * passport numbers, and shareholdings. That is personal data and must not
 * appear on a public page. Only company-level registry facts are used.
 *
 * Also excluded per instruction: the current raise amount, grant status and
 * use-of-funds. Those live in the deck, released on request.
 *
 * Team biographies live in `data/team.ts` and render on /team.
 */

export interface EfficacyRow {
  test: string
  before: string
  after: string
}

/** NTU test reports, October 2020. Validated against WHO and UNHCR standards. */
export const EFFICACY: EfficacyRow[] = [
  { test: 'Total Coliform', before: '100 cfu/100 mL', after: '<1 cfu/100 mL' },
  { test: 'E. coli', before: '6.7 × 10⁵ cfu/mL', after: '<1 cfu/100 mL' },
  { test: 'S. aureus', before: '2.3 × 10⁵ cfu/mL', after: '<1 cfu/mL' },
]

export interface Milestone {
  date: string
  title: string
  body: string
  done: boolean
}

export const MILESTONES: Milestone[] = [
  {
    date: 'March 2021',
    title: 'Core patent granted',
    body: 'US 10,939,677 B2 approved, covering the cryogel materials, their preparation method and their application for disinfection.',
    done: true,
  },
  {
    date: 'June 2024',
    title: 'HYDRGEL PTE. LTD. incorporated',
    body: 'Company incorporated in Singapore out of a venture-build between the Singapore Deep-Tech Alliance and Nanyang Technological University.',
    done: true,
  },
  {
    date: 'November 2024',
    title: 'Exclusive worldwide licence',
    body: 'Exclusive worldwide licence signed with NTUitive, NTU\'s innovation and enterprise company, granting global commercial rights.',
    done: true,
  },
  {
    date: '2026',
    title: 'Pilot programme',
    body: 'Final design and ergonomic prototyping, in-field validation with pilot partners, and conversion of pilot partners into paying customers.',
    done: false,
  },
  {
    date: 'Next',
    title: 'HYDRLAB and global scaling',
    body: 'Phase two brings the container-based mobile analysis and production facility to disaster response, followed by scaled manufacturing.',
    done: false,
  },
]

export interface Partner {
  sector: string
  geography: string
  body: string
}

/**
 * Partners are described by sector and geography only. These organisations
 * have expressed intent to pilot; none has approved public attribution.
 */
export const PARTNERS: Partner[] = [
  {
    sector: 'Rural & agricultural infrastructure',
    geography: 'India',
    body: 'A private water distribution infrastructure company serving rural and agricultural communities through an extensive channel partner network.',
  },
  {
    sector: 'Defence',
    geography: 'Singapore',
    body: 'National defence forces operating across multiple theatres, including special units deployed off-grid for days at a time.',
  },
  {
    sector: 'Commercial mining',
    geography: 'Panama / Papua New Guinea',
    body: 'Gold mining operations currently dependent on packaged and bottled water because surrounding lakes and rivers are contaminated.',
  },
  {
    sector: 'Humanitarian relief',
    geography: 'Israel / Global',
    body: 'An internationally established first-responder organisation running disaster relief missions worldwide.',
  },
]

/** Registry facts only — sourced from the public ACRA company record. */
export const CORPORATE = [
  { label: 'Registered name', value: 'HYDRGEL PTE. LTD.' },
  { label: 'UEN', value: '202424887Z' },
  { label: 'Incorporated', value: '20 June 2024' },
  { label: 'Jurisdiction', value: 'Singapore' },
  { label: 'Company type', value: 'Private company limited by shares' },
  { label: 'Primary activity', value: 'Collection, purification and distribution of water' },
]
