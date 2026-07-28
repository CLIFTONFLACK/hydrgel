/**
 * Team content, drawn from HYDRGEL's own company presentation (v13.1).
 *
 * `photo` is intentionally unset. Drop real portraits into
 * `public/images/team/` and set the path here; until then the Avatar
 * component renders initials. No likeness is generated for a real person.
 *
 * `profileUrl` is likewise unset — add verified links only.
 */

export interface Person {
  name: string
  role: string
  /** Institution or company the person is primarily identified with. */
  affiliation?: string
  bullets: string[]
  photo?: string
  profileUrl?: string
}

export const FOUNDERS: Person[] = [
  {
    name: 'Clifton Flack',
    role: 'Co-Founder & CEO',
    affiliation: 'HYDRGEL PTE. LTD.',
    bullets: [
      'Founder and CEO of CiiTECH (UK/Israel), raising $3m and growing the business past £10M+ revenue in consumer wellness brands.',
      'COO of SLA Pharma, driving commercialisation of clinically proven gastrointestinal treatments.',
      'Co-founder of iCAN and CannaTech (Israel), raising $4.5m to build global innovation platforms in nutrition.',
      'Led global digital strategy at McCann across multi-million dollar accounts, managing teams of 18+ across Europe, Israel and APAC.',
      'Founded SUBS Co-working (Israel), establishing an entrepreneurial hub and community platform.',
    ],
  },
  {
    name: 'Ruzbeh Masani',
    role: 'Co-Founder & CTO',
    affiliation: 'HYDRGEL PTE. LTD.',
    bullets: [
      'Led development of novel process technologies at Nestlé, securing patent WO/2018/189275 and delivering US$13M/year in savings.',
      'Managed US$2M annual R&D budgets with stakeholders across Europe, the Middle East and Latin America.',
      'Launched operations at a US$136M greenfield Nestlé factory, training 450 operators and cutting downtime by 40%.',
      'Founded and built the R&D division at a water systems manufacturer, delivering 2,000+ SKUs behind US$30M annual revenue.',
      'Implemented Lean Six Sigma (DMAIC) across R&D and operations.',
    ],
  },
]

export const INVENTORS: Person[] = [
  {
    name: 'Professor Hu Xiao',
    role: 'Inventor',
    affiliation: 'Nanyang Technological University',
    bullets: [
      'Professor at the NTU School of Science and Engineering.',
      'Director of the Nanyang Environment and Water Research Institute (NEWRI).',
      'Environmental Chemistry and Materials Centre (ECMC).',
    ],
  },
  {
    name: 'Dr. Liang Yen Nan',
    role: 'Inventor',
    affiliation: 'Nanyang Technological University',
    bullets: [
      'Senior Research Fellow at NEWRI, ECMC.',
      'Ph.D. in Materials Science from Nanyang Technological University.',
      '11 years of experience in materials technology and R&D.',
    ],
  },
]

/**
 * Institutions HYDRGEL is formally connected to. Rendered as typeset
 * wordmarks, not logo images — these are third-party trademarks and we do not
 * hold approved logo assets for them.
 */
export const INSTITUTIONS = [
  {
    name: 'Nanyang Technological University',
    short: 'NTU Singapore',
    relationship: 'Origin of the cryogel science and the licensed patent',
    url: 'https://www.ntu.edu.sg/',
  },
  {
    name: 'NTUitive',
    short: 'NTUitive',
    relationship: 'Exclusive worldwide licensor, signed November 2024',
    url: 'https://www.ntuitive.sg/',
  },
  {
    name: 'Nanyang Environment & Water Research Institute',
    short: 'NEWRI',
    relationship: 'Research institute behind the materials work',
    url: 'https://www.ntu.edu.sg/newri',
  },
  {
    name: 'Singapore Deep-Tech Alliance',
    short: 'SDTA',
    relationship: 'Venture builder that formed the company',
    url: 'https://www.sdta.vc/',
  },
]
