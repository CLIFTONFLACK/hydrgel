/**
 * The three enquiry routes on /contact.
 *
 * The audiences barely overlap — a relief agency, an investor and a
 * manufacturing partner each need a different first conversation and reach a
 * different person. Each route therefore carries its own recipient, subject
 * and set of fields, so the first reply can already be a useful one instead of
 * a request for basic details.
 */

export interface ContactField {
  name: string
  label: string
  placeholder?: string
  required?: boolean
  type?: 'text' | 'email' | 'tel' | 'textarea'
  autoComplete?: string
}

export interface ContactRoute {
  id: string
  title: string
  who: string
  body: string
  formIntro: string
  email: string
  subject: string
  cta: string
  primary: boolean
  accent: string
  fields: ContactField[]
}

/** Asked on every route, in the order people expect to give them. */
const IDENTITY: ContactField[] = [
  {
    name: 'name',
    label: 'Your name',
    required: true,
    autoComplete: 'name',
    placeholder: 'Jane Okafor',
  },
  {
    name: 'organisation',
    label: 'Organisation',
    required: true,
    autoComplete: 'organization',
    placeholder: 'Organisation or fund',
  },
  {
    name: 'email',
    label: 'Email',
    required: true,
    type: 'email',
    autoComplete: 'email',
    placeholder: 'you@organisation.org',
  },
]

export const CONTACT_ROUTES: ContactRoute[] = [
  {
    id: 'deploy',
    title: 'Deploy HYDRGEL',
    who: 'Humanitarian relief, defence, mining, rural development',
    body: 'Tell us where you operate and what you need. We will come back with what is realistic on the current timeline, including pilot availability.',
    formIntro:
      'The more you can tell us about the operating environment, the more useful the first reply will be.',
    email: 'info@hydrgel.com',
    subject: 'HYDRGEL deployment enquiry',
    cta: 'Enquire about deployment',
    primary: true,
    accent: 'from-blue-500 to-green-500',
    fields: [
      ...IDENTITY,
      {
        name: 'region',
        label: 'Country or region of operation',
        required: true,
        placeholder: 'Where the water is needed',
      },
      {
        name: 'scale',
        label: 'Approximate number of people',
        placeholder: 'e.g. 500 households, a 200-person camp',
      },
      {
        name: 'timeline',
        label: 'Timeline',
        placeholder: 'When you would need this',
      },
      {
        name: 'message',
        label: 'What you need',
        required: true,
        type: 'textarea',
        placeholder:
          'What the water situation is, what you have tried, and what would count as success.',
      },
    ],
  },
  {
    id: 'investment',
    title: 'Investment',
    who: 'Investors and funds',
    body: 'Request the company presentation. It covers the technology, the patent position, the pilot programme and the current round.',
    formIntro:
      'We share the full company presentation on request. Tell us who you are and we will send it across.',
    email: 'clifton@hydrgel.com',
    subject: 'HYDRGEL investor deck request',
    cta: 'Request the deck',
    primary: false,
    accent: 'from-blue-500 to-blue-700',
    fields: [
      ...IDENTITY,
      {
        name: 'role',
        label: 'Your role',
        required: true,
        placeholder: 'Partner, analyst, angel, family office',
      },
      {
        name: 'message',
        label: 'Anything we should know',
        type: 'textarea',
        placeholder:
          'Ticket size, stage focus, or particular questions about the technology or round.',
      },
    ],
  },
  {
    id: 'technical',
    title: 'Technical & partnerships',
    who: 'Research, manufacturing, distribution',
    body: 'Questions on the cryogel platform, formulation, testing, manufacturing or distribution partnerships.',
    formIntro:
      'This reaches our CTO directly. Technical detail is welcome — it saves a round trip.',
    email: 'ruzbeh@hydrgel.com',
    subject: 'HYDRGEL technical enquiry',
    cta: 'Contact the CTO',
    primary: false,
    accent: 'from-green-500 to-teal-600',
    fields: [
      ...IDENTITY,
      {
        name: 'area',
        label: 'Area of interest',
        required: true,
        placeholder: 'Formulation, testing, manufacturing, distribution',
      },
      {
        name: 'message',
        label: 'What you would like to discuss',
        required: true,
        type: 'textarea',
        placeholder: 'The technical question or partnership you have in mind.',
      },
    ],
  },
]
