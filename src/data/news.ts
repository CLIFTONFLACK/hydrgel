/**
 * HYDRGEL news index.
 *
 * Every entry below is a real, externally verifiable event or publication.
 * `date` is the occurrence date of the event, or the publication date of the
 * linked primary source where the two differ. Summaries are written for this
 * site — no source text is reproduced. `source` always points at the primary
 * publisher (UN agency, regulator, journal, national water authority) rather
 * than at secondary coverage, wherever one exists.
 *
 * Selection is editorial: items were chosen for relevance to point-of-need
 * purification, emergency response and water-technology investment.
 */

export type Category =
  | 'Crisis'
  | 'Humanitarian'
  | 'Technology'
  | 'Policy'
  | 'Climate'
  | 'Research'
  | 'Industry'
  | 'HYDRGEL'

export interface NewsItem {
  /**
   * Stable unique key, `YYYY-MM-DD-short-slug`. Used to look up the long-form
   * story in `stories.ts` and as the React list key. Dates alone are not safe
   * for this — two significant water events can fall on the same day.
   */
  id: string
  /** ISO 8601, YYYY-MM-DD. */
  date: string
  title: string
  summary: string
  category: Category
  region: string
  source: string
  url: string
}

export const CATEGORIES: Category[] = [
  'Crisis',
  'Humanitarian',
  'Technology',
  'Policy',
  'Climate',
  'Research',
  'Industry',
  'HYDRGEL',
]

/** Tailwind classes per category, used for the card accent and filter chips. */
export const CATEGORY_STYLES: Record<Category, { chip: string; tile: string }> = {
  Crisis: { chip: 'bg-red-100 text-red-700', tile: 'from-red-400 to-red-600' },
  Humanitarian: { chip: 'bg-orange-100 text-orange-700', tile: 'from-orange-400 to-orange-600' },
  Technology: { chip: 'bg-blue-100 text-blue-700', tile: 'from-blue-400 to-blue-600' },
  Policy: { chip: 'bg-purple-100 text-purple-700', tile: 'from-purple-400 to-purple-600' },
  Climate: { chip: 'bg-amber-100 text-amber-700', tile: 'from-amber-400 to-amber-600' },
  Research: { chip: 'bg-teal-100 text-teal-700', tile: 'from-teal-400 to-teal-600' },
  Industry: { chip: 'bg-slate-100 text-slate-700', tile: 'from-slate-400 to-slate-600' },
  HYDRGEL: { chip: 'bg-green-100 text-green-700', tile: 'from-green-400 to-green-600' },
}

export const NEWS: NewsItem[] = [
  // ---------------------------------------------------------------- 2024 ---
  {
    id: '2024-09-05-el-ni-o-drought-pushes',
    date: '2024-09-05',
    title: 'El Niño drought pushes six Southern African states into emergency',
    summary:
      'Botswana, Lesotho, Malawi, Namibia, Zambia and Zimbabwe all declared national disasters as an El Niño-driven drought cut rainfall to the lowest levels in four decades. More than 30 million people were affected, with collapsing water supply infrastructure feeding cholera and other waterborne disease outbreaks across the region.',
    category: 'Crisis',
    region: 'Southern Africa',
    source: 'UN OCHA',
    url: 'https://www.unocha.org/publications/report/mozambique/southern-africa-el-nino-regional-humanitarian-overview-september-2024',
  },
  {
    id: '2024-10-01-hurricane-helene-leaves-asheville-without',
    date: '2024-10-01',
    title: 'Hurricane Helene leaves Asheville without drinkable water for weeks',
    summary:
      'Helene washed out the transmission lines feeding Asheville from the North Fork reservoir, which supplies roughly 80 percent of the city. Turbidity rendered the reservoir unusable and residents went without potable tap water for close to two months — a stark illustration of how quickly a modern municipal system can fail.',
    category: 'Crisis',
    region: 'United States',
    source: 'Blue Ridge Public Radio',
    url: 'https://www.bpr.org/2024-10-01/water-supplies-are-dwindling-in-asheville-after-helenes-devastation',
  },
  {
    id: '2024-10-08-us-epa-finalises-rule-requiring',
    date: '2024-10-08',
    title: 'US EPA finalises rule requiring lead pipe replacement within ten years',
    summary:
      'The Lead and Copper Rule Improvements oblige drinking water systems across the United States to identify and replace lead service lines within a decade, tighten testing requirements and lower the action threshold for lead exposure. It is the most significant US drinking water regulation in a generation.',
    category: 'Policy',
    region: 'United States',
    source: 'US EPA',
    url: 'https://www.epa.gov/newsreleases/biden-harris-administration-issues-final-rule-requiring-replacement-lead-pipes-within',
  },
  {
    id: '2024-10-19-global-oral-cholera-vaccine-stockpile',
    date: '2024-10-19',
    title: 'Global oral cholera vaccine stockpile runs empty',
    summary:
      'WHO confirmed the emergency stockpile of oral cholera vaccine had been fully drawn down, with no doses available for allocation. Requests reached 61 million doses against a fraction of that in supply, forcing single-dose campaigns and shifting the burden of outbreak control onto water and sanitation measures.',
    category: 'Humanitarian',
    region: 'Global',
    source: 'Health Policy Watch',
    url: 'https://healthpolicy-watch.news/global-stockpile-is-empty-but-cholera-vaccines-are-being-shipped/',
  },
  {
    id: '2024-10-29-valencia-flash-floods-kill-237',
    date: '2024-10-29',
    title: 'Valencia flash floods kill 237 after a year of rain falls in eight hours',
    summary:
      'Chiva recorded close to 500 mm of rain in eight hours, turning streets into rivers across the Valencia region. The disaster killed 237 people and caused roughly €10.7 billion in damage, and became a reference case in Europe for how fast potable supply and sanitation collapse under extreme rainfall.',
    category: 'Crisis',
    region: 'Spain',
    source: 'NASA Earth Observatory',
    url: 'https://earthobservatory.nasa.gov/images/153533/valencia-floods',
  },
  {
    id: '2024-11-21-cop29-launches-baku-declaration-water',
    date: '2024-11-21',
    title: 'COP29 launches the Baku Declaration on Water for Climate Action',
    summary:
      'Governments and institutions endorsed a declaration tying water explicitly to climate mitigation and adaptation policy, calling for basin-level cooperation and for water measures to be written into national climate plans. Endorsements passed fifty national governments within weeks of launch.',
    category: 'Policy',
    region: 'Global',
    source: 'COP29 Presidency',
    url: 'https://cop29.az/en/pages/cop29-declaration-on-water-for-climate-action',
  },
  {
    id: '2024-11-30-hydrgel-signs-exclusive-worldwide-licence',
    date: '2024-11-30',
    title: 'HYDRGEL signs exclusive worldwide licence with NTUitive',
    summary:
      'HYDRGEL secured an exclusive worldwide licence from NTUitive, the innovation and enterprise company of Nanyang Technological University, covering the cryogel purification platform protected by US patent 10,939,677 B2. The agreement gives HYDRGEL global commercial rights to the underlying materials science.',
    category: 'HYDRGEL',
    region: 'Singapore',
    source: 'NTUitive',
    url: 'https://www.ntuitive.sg/',
  },
  {
    id: '2024-12-10-cholera-deaths-climb-half-outbreaks',
    date: '2024-12-10',
    title: 'Cholera deaths climb by half as outbreaks outpace response',
    summary:
      'WHO reporting showed cholera cases up around 5 percent year on year while deaths rose by roughly 50 percent, exceeding 6,000. The pattern pointed to late detection and degraded water and sanitation infrastructure in conflict-affected states rather than to any change in the pathogen itself.',
    category: 'Humanitarian',
    region: 'Global',
    source: 'World Health Organization',
    url: 'https://www.who.int/emergencies/disease-outbreak-news/item/2025-DON579',
  },

  // ---------------------------------------------------------------- 2025 ---
  {
    id: '2025-01-10-los-angeles-wildfires-trigger-first-ever',
    date: '2025-01-10',
    title: 'Los Angeles wildfires trigger first-ever "do not drink" notices',
    summary:
      'As fires swept Palisades and Altadena, utilities warned residents not to drink or boil tap water. Heat had partially melted plastic pipework and meters, releasing benzene and other contaminants into the distribution network. Pasadena issued a do-not-drink notice for the first time in more than a century of operation.',
    category: 'Crisis',
    region: 'United States',
    source: 'NPR',
    url: 'https://www.npr.org/sections/shots-health-news/2025/01/11/nx-s1-5254227/la-fires-palisades-water-advisories',
  },
  {
    id: '2025-02-11-water-technology-funding-hits-record',
    date: '2025-02-11',
    title: 'Water technology funding hits a record — and stays a rounding error',
    summary:
      'Global water tech investment reached roughly $1.12 billion across 2024, up about 29 percent year on year. The same analyses put water at just one to two percent of total climate tech funding, a striking mismatch against the scale of the problem it addresses.',
    category: 'Industry',
    region: 'Global',
    source: 'Net Zero Insights',
    url: 'https://netzeroinsights.com/resources/water-tech-startups-to-watch/',
  },
  {
    id: '2025-03-10-unicef-nine-ten-people-gaza',
    date: '2025-03-10',
    title: 'UNICEF: nine in ten people in Gaza cannot access safe drinking water',
    summary:
      'Power and fuel restrictions took desalination capacity offline across Gaza, leaving roughly half of families below the humanitarian minimum of six litres per person per day. UNICEF reported around 1.8 million people requiring water, sanitation and hygiene assistance, over half of them children.',
    category: 'Humanitarian',
    region: 'Gaza',
    source: 'UN News',
    url: 'https://news.un.org/en/story/2025/03/1160961',
  },
  {
    id: '2025-03-20-g-nter-bl-schl-awarded',
    date: '2025-03-20',
    title: 'Günter Blöschl awarded the 2025 Stockholm Water Prize',
    summary:
      'The Austrian hydrologist was recognised for reshaping flood risk science, in particular for demonstrating how flood behaviour shifts under a changing climate and how that evidence should feed into water resource management and early warning design.',
    category: 'Research',
    region: 'Global',
    source: 'SIWI',
    url: 'https://siwi.org/news/hydrologist-gunter-bloschl-receives-stockholm-water-prize-2025',
  },
  {
    id: '2025-03-21-un-world-water-development-report',
    date: '2025-03-21',
    title: 'UN World Water Development Report 2025 focuses on mountains and glaciers',
    summary:
      'The annual UN flagship report examined the world\'s "water towers", warning that glacier and snowpack loss is destabilising supply for billions downstream. It reiterated that progress against every SDG 6 target is off track, some severely.',
    category: 'Research',
    region: 'Global',
    source: 'UN-Water',
    url: 'https://www.unwater.org/publications/un-world-water-development-report-2025',
  },
  {
    id: '2025-03-22-world-water-day-2025-marks',
    date: '2025-03-22',
    title: 'World Water Day 2025 marks glacier preservation',
    summary:
      'The UN observance centred on glacial meltwater as a foundation of drinking water, agriculture, industry and hydropower, and on what accelerating glacier retreat means for communities whose dry-season supply depends on it.',
    category: 'Climate',
    region: 'Global',
    source: 'UN-Water',
    url: 'https://www.unwater.org/our-work/world-water-day',
  },
  {
    id: '2025-03-28-myanmar-earthquake-cuts-water-sanitation',
    date: '2025-03-28',
    title: 'Myanmar earthquake cuts water and sanitation for millions',
    summary:
      'A major earthquake sequence struck central Myanmar, killing more than 3,600 people and damaging water and sanitation infrastructure across Mandalay and Sagaing. Displacement into informal sites without treated supply drove immediate waterborne disease risk.',
    category: 'Crisis',
    region: 'Myanmar',
    source: 'UN OCHA',
    url: 'https://www.unocha.org/myanmar',
  },
  {
    id: '2025-04-10-who-prequalifies-simplified-oral-cholera',
    date: '2025-04-10',
    title: 'WHO prequalifies a simplified oral cholera vaccine',
    summary:
      'A streamlined vaccine formulation cleared WHO prequalification, projected to lift annual supply from around 45 million doses toward roughly 90 million by 2026. Even at that level, supply trails demand — leaving safe water provision as the first line of outbreak control.',
    category: 'Humanitarian',
    region: 'Global',
    source: 'World Health Organization',
    url: 'https://www.who.int/emergencies/disease-outbreak-news/item/2025-DON579',
  },
  {
    id: '2025-05-09-california-clears-all-wildfire-hit-water',
    date: '2025-05-09',
    title: 'California clears all wildfire-hit water systems to resume safe supply',
    summary:
      'Four months after the January fires, the State Water Resources Control Board confirmed all nine affected public water systems had been cleared, with the last do-not-drink advisory lifted in Altadena. The recovery required extensive flushing, pipe replacement and contaminant testing.',
    category: 'Crisis',
    region: 'United States',
    source: 'California State Water Resources Control Board',
    url: 'https://www.waterboards.ca.gov/losangeles/water_issues/programs/2025_post_fire/index.html',
  },
  {
    id: '2025-05-14-us-epa-moves-extend-pfas',
    date: '2025-05-14',
    title: 'US EPA moves to extend PFAS compliance deadline to 2031',
    summary:
      'EPA announced it would retain the 4 parts-per-trillion limits for PFOA and PFOS while pushing the compliance deadline from 2029 to 2031, and signalled it would revisit the standards set for several other PFAS compounds — injecting fresh uncertainty into utility treatment investment plans.',
    category: 'Policy',
    region: 'United States',
    source: 'US EPA',
    url: 'https://www.epa.gov/sdwa/proposed-pfoa-and-pfos-compliance-extension-rule',
  },
  {
    id: '2025-05-20-hydrogel-device-pulls-drinking-water',
    date: '2025-05-20',
    title: 'Hydrogel device pulls drinking water from air at 11 percent humidity',
    summary:
      'An international team optimised a cross-linked polyacrylamide hydrogel loaded with lithium chloride, extracting water from air far drier than previous devices could handle and reaching up to two litres per day. Field testing ran in the Atacama, among the driest inhabited places on Earth.',
    category: 'Technology',
    region: 'Global',
    source: 'Tech Xplore',
    url: 'https://techxplore.com/news/2025-05-atmospheric-harvesting-optimization-hygroscopic-hydrogel.html',
  },
  {
    id: '2025-06-22-cholera-response-constrained-persistent-vaccine',
    date: '2025-06-22',
    title: 'Cholera response constrained by a persistent vaccine shortfall',
    summary:
      'Mid-2025 reporting showed the oral cholera vaccine stockpile still below its five-million-dose emergency threshold despite production gains. With vaccine rationed to single-dose reactive campaigns, safe water provision remained the primary tool available to responders.',
    category: 'Humanitarian',
    region: 'Global',
    source: 'World Health Organization',
    url: 'https://www.who.int/emergencies/disease-outbreak-news/item/2025-DON579',
  },
  {
    id: '2025-06-30-veolia-takes-full-ownership-water',
    date: '2025-06-30',
    title: 'Veolia takes full ownership of Water Technologies and Solutions',
    summary:
      'Veolia bought out CDPQ\'s 30 percent stake for $1.75 billion, consolidating control of a business generating close to €5 billion in annual revenue. The deal underlined how much strategic value incumbents now place on treatment technology rather than on operating concessions alone.',
    category: 'Industry',
    region: 'Global',
    source: 'Veolia',
    url: 'https://www.veolia.com/en/our-media/press-releases/veolia-acquires-cdpqs-30-stake-water-technologies-and-solutions-achieving',
  },
  {
    id: '2025-07-03-sudan-cholera-emergency-spreads-water',
    date: '2025-07-03',
    title: 'Sudan cholera emergency spreads as water treatment collapses',
    summary:
      'Destruction of treatment plants during the conflict forced communities onto contaminated sources, driving one of the largest cholera outbreaks of the decade. Access constraints and damaged WASH infrastructure left the response chronically behind the caseload.',
    category: 'Humanitarian',
    region: 'Sudan',
    source: 'UN OCHA',
    url: 'https://www.unocha.org/publications/report/sudan/sudan-cholera-operational-update-3-july-2025',
  },
  {
    id: '2025-07-04-texas-hill-country-flash-floods',
    date: '2025-07-04',
    title: 'Texas Hill Country flash floods kill 139',
    summary:
      'A mesoscale convective vortex carrying deep tropical moisture stalled over the Guadalupe basin. The river rose roughly 26 feet in 45 minutes, overwhelming camps and communities overnight. Damage was estimated at $1.1 billion, and 117 of the deaths occurred in Kerr County alone.',
    category: 'Crisis',
    region: 'United States',
    source: 'Texas Division of Emergency Management',
    url: 'https://tdem.texas.gov/disasters/july-flooding-25-0026',
  },
  {
    id: '2025-08-26-who-unicef-one-four-people',
    date: '2025-08-26',
    title: 'WHO and UNICEF: one in four people still lack safely managed drinking water',
    summary:
      'The Joint Monitoring Programme update put 2.1 billion people without safely managed drinking water, including 106 million drinking untreated surface water. A further 3.4 billion lack safely managed sanitation. Gains since 2015 are real but far short of the 2030 trajectory.',
    category: 'Research',
    region: 'Global',
    source: 'World Health Organization',
    url: 'https://www.who.int/news/item/26-08-2025-1-in-4-people-globally-still-lack-access-to-safe-drinking-water---who--unicef',
  },
  {
    id: '2025-08-27-world-water-week-convenes-stockholm',
    date: '2025-08-27',
    title: 'World Water Week convenes in Stockholm on water and change',
    summary:
      'The sector\'s principal annual gathering brought together utilities, financiers, researchers and humanitarian agencies. Point-of-use treatment and decentralised supply featured heavily, reflecting how often centralised systems failed during the preceding year of disasters.',
    category: 'Industry',
    region: 'Global',
    source: 'SIWI',
    url: 'https://siwi.org/about-world-water-week',
  },
  {
    id: '2025-09-13-cholera-fatalities-rise-sharply-against',
    date: '2025-09-13',
    title: 'Cholera fatalities rise sharply against a depleted vaccine supply',
    summary:
      'Reporting through 2025 showed cholera deaths climbing steeply year on year, concentrated in states where conflict or disaster had degraded water treatment. The pattern reinforced that outbreak control ultimately depends on water quality at the point of consumption.',
    category: 'Humanitarian',
    region: 'Global',
    source: 'World Health Organization',
    url: 'https://www.who.int/emergencies/disease-outbreak-news/item/2025-DON579',
  },
  {
    id: '2025-09-24-solar-desalination-prototype-produces-fresh',
    date: '2025-09-24',
    title: 'Solar desalination prototype produces fresh water without grid power',
    summary:
      'A UNIST team combined a perovskite-based photothermal material with a structural design that resists salt fouling, producing around 3.4 kg of fresh water per hour using sunlight alone. Salt accumulation has historically been the limiting factor in solar still durability.',
    category: 'Technology',
    region: 'South Korea',
    source: 'Tech Xplore',
    url: 'https://techxplore.com/news/2025-09-solar-desalination-technology-sunlight-fresh.html',
  },
  {
    id: '2025-10-10-iranian-reservoirs-fall-record-lows',
    date: '2025-10-10',
    title: 'Iranian reservoirs fall to record lows after six years of drought',
    summary:
      'Key reservoirs supplying Tehran dropped to between 5 and 10 percent of capacity, with 19 dams running dry nationally. The 2025 water year delivered the lowest precipitation since records began in a country where arid and semi-arid terrain covers 85 percent of the land area.',
    category: 'Crisis',
    region: 'Iran',
    source: 'CSIS',
    url: 'https://www.csis.org/analysis/satellite-imagery-shows-tehrans-accelerating-water-crisis',
  },
  {
    id: '2025-10-13-sudan-passes-120-000-cholera',
    date: '2025-10-13',
    title: 'Sudan passes 120,000 cholera cases with fatality rate near three percent',
    summary:
      'Sudan\'s health ministry reported 120,496 cases and 3,368 deaths. The case fatality rate of 2.8 percent ran close to three times the emergency threshold, a signal of how far treatment access had degraded alongside the water system itself.',
    category: 'Humanitarian',
    region: 'Sudan',
    source: 'World Health Organization',
    url: 'https://www.who.int/emergencies/disease-outbreak-news/item/2025-DON579',
  },
  {
    id: '2025-11-22-iran-water-shortages-spread-across',
    date: '2025-11-22',
    title: 'Iran water shortages spread across major cities',
    summary:
      'Outages lasting up to three consecutive days were reported in several Iranian cities as storage continued to fall. Water reserves behind the Karaj dam had collapsed almost entirely against their level a year earlier, moving the crisis from agricultural to urban supply.',
    category: 'Crisis',
    region: 'Iran',
    source: 'Iran International',
    url: 'https://www.iranintl.com/en/202511227008',
  },
  {
    id: '2025-12-01-tehran-confronts-day-zero-officials',
    date: '2025-12-01',
    title: 'Tehran confronts "Day Zero" as officials float evacuation',
    summary:
      'Iran\'s president warned that the capital might have to be evacuated if consumption patterns held, after cautioning months earlier that reservoirs could empty by autumn. The Amir Kabir dam, commissioned in 1960, sat at its lowest level in six decades of operation.',
    category: 'Crisis',
    region: 'Iran',
    source: 'CNN',
    url: 'https://www.cnn.com/2025/12/01/climate/iran-water-crisis-evacuate-tehran',
  },
  {
    id: '2025-12-08-un-warns-new-era-water',
    date: '2025-12-08',
    title: 'UN warns of a new era of water scarcity as demand accelerates',
    summary:
      'UN assessment pointed to more than half the world\'s large lakes losing water since the early 1990s, over 30 percent of glacier mass gone in some regions since 1970, and roughly 410 million hectares of natural wetland destroyed over five decades.',
    category: 'Policy',
    region: 'Global',
    source: 'UN News',
    url: 'https://news.un.org/en/story/2025/12/1166582',
  },
  {
    id: '2025-12-26-singapores-pub-opens-feasibility-study',
    date: '2025-12-26',
    title: 'Singapore\'s PUB opens feasibility study for a new desalination plant',
    summary:
      'PUB tendered a ten-month study covering design options and economic viability for an additional plant, including a dual-mode configuration able to switch between seawater and freshwater treatment as conditions require — the approach already proven at Marina East.',
    category: 'Industry',
    region: 'Singapore',
    source: 'PUB, Singapore\'s National Water Agency',
    url: 'https://www.pub.gov.sg/Resources/News-Room/PressReleases/2025/12/PUB-to-carry-out-feasibility-study-for-new-desalination-plant',
  },

  // ---------------------------------------------------------------- 2026 ---
  {
    id: '2026-01-26-dakar-hosts-high-level-preparations-2026',
    date: '2026-01-26',
    title: 'Dakar hosts high-level preparations for the 2026 UN Water Conference',
    summary:
      'Ministers and agencies met in Senegal to review SDG 6 progress and gaps ahead of the Abu Dhabi conference, and to shape the acceleration agenda. Senegal and the United Arab Emirates co-host the main event.',
    category: 'Policy',
    region: 'Global',
    source: 'The Water Diplomat',
    url: 'https://www.waterdiplomat.org/story/2025/12/high-level-preparatory-meeting-2026-un-water-conference',
  },
  {
    id: '2026-02-19-attribution-study-revisits-valencia-flood',
    date: '2026-02-19',
    title: 'Attribution study revisits the Valencia flood in a fossil-fuel-free counterfactual',
    summary:
      'Researchers modelled how the October 2024 Valencia disaster would have unfolded in a world without fossil fuel warming, sharpening the evidentiary link between emissions and the extreme rainfall events that now routinely take municipal water systems offline.',
    category: 'Climate',
    region: 'Spain',
    source: 'Euronews',
    url: 'https://www.euronews.com/2026/02/19/valencias-deadly-flood-still-haunts-spain-would-it-have-happened-in-a-fossil-fuel-free-wor',
  },
  {
    id: '2026-03-05-xylem-completes-divestment-international-metering',
    date: '2026-03-05',
    title: 'Xylem completes divestment of its international metering business',
    summary:
      'AURELIUS acquired Xylem\'s international water and heat metering operations, closing in the first quarter. The move continued a broader repositioning among large incumbents toward treatment and digital water services and away from hardware commodity lines.',
    category: 'Industry',
    region: 'Global',
    source: 'Smart Water Magazine',
    url: 'https://smartwatermagazine.com/news/smart-water-magazine/aurelius-acquire-xylems-international-water-and-heat-metering-business',
  },
  {
    id: '2026-03-19-un-world-water-development-report',
    date: '2026-03-19',
    title: 'UN World Water Development Report 2026: Water for All People',
    summary:
      'Launched simultaneously in New York and Paris, the report frames safe and affordable water as a human right and a precondition for gender equality. It records 2.1 billion people still without safely managed drinking water and an estimated 250 million hours spent daily collecting it.',
    category: 'Research',
    region: 'Global',
    source: 'UNESCO',
    url: 'https://www.unesco.org/en/articles/united-nations-world-water-development-report-2026',
  },
  {
    id: '2026-03-22-world-water-day-2026-takes',
    date: '2026-03-22',
    title: 'World Water Day 2026 takes on water and gender',
    summary:
      'The observance ran under the slogan "Where water flows, equality grows", examining how water and sanitation access shapes health, education and economic participation for women and girls — and how far the collection burden still falls on them.',
    category: 'Policy',
    region: 'Global',
    source: 'UN-Water',
    url: 'https://www.unwater.org/our-work/world-water-day',
  },
  {
    id: '2026-03-24-kaveh-madani-named-2026-stockholm',
    date: '2026-03-24',
    title: 'Kaveh Madani named 2026 Stockholm Water Prize laureate',
    summary:
      'The director of UNU-INWEH was recognised for advancing water governance and for reframing how water crises are diagnosed and managed — work that has consistently argued mismanagement, not only scarcity, drives most water emergencies.',
    category: 'Research',
    region: 'Global',
    source: 'SIWI',
    url: 'https://siwi.org/prizes/',
  },
  {
    id: '2026-04-14-managed-aquifer-recharge-mapped-global',
    date: '2026-04-14',
    title: 'Managed aquifer recharge mapped as a global scarcity buffer',
    summary:
      'A Nature Water study assessed where deliberately recharging aquifers could offset scarcity, finding meaningful potential in regions where irrigation-driven groundwater overexploitation is accelerating and threatening both water and food security.',
    category: 'Research',
    region: 'Global',
    source: 'Nature Water',
    url: 'https://www.nature.com/articles/s44221-026-00672-3',
  },
  {
    id: '2026-05-15-machine-learning-maps-put-180',
    date: '2026-05-15',
    title: 'Machine learning maps put 180–220 million at risk from manganese in groundwater',
    summary:
      'Global hazard modelling identified populations exposed to naturally occurring manganese contamination in groundwater at a scale not previously quantified, strengthening the case for treatment that adapts to local contaminant profiles rather than assuming a single threat.',
    category: 'Research',
    region: 'Global',
    source: 'Nature Water',
    url: 'https://www.nature.com/natwater/articles?year=2026',
  },
  {
    id: '2026-05-29-coastal-groundwater-decline-threatens-supply',
    date: '2026-05-29',
    title: 'Coastal groundwater decline threatens supply for half the world\'s drinking water',
    summary:
      'Analysis of global monitoring sites found more than 10 percent showing significant long-term depletion, leaving them exposed to saltwater intrusion. Some coastal sites recorded falls exceeding 50 centimetres a year between 1990 and 2024.',
    category: 'Research',
    region: 'Global',
    source: 'EurekAlert / Nature Water',
    url: 'https://www.eurekalert.org/news-releases/1124102',
  },
  {
    id: '2026-05-30-solar-desalination-device-produces-fresh',
    date: '2026-05-30',
    title: 'Solar desalination device produces fresh water without brine waste',
    summary:
      'A University of Rochester team used laser-etched superwicking black metal to desalinate seawater while capturing salts and minerals as solids rather than discharging concentrated brine — addressing the disposal problem that constrains conventional desalination siting.',
    category: 'Technology',
    region: 'United States',
    source: 'ScienceDaily',
    url: 'https://www.sciencedaily.com/releases/2026/05/260530053418.htm',
  },
  {
    id: '2026-06-01-thin-snowpack-shrinking-glaciers-raise',
    date: '2026-06-01',
    title: 'Thin snowpack and shrinking glaciers raise Alpine drought alarm',
    summary:
      'Low winter snow reserves and a dry spring left Alpine catchments short of the natural storage that normally releases meltwater through summer, putting downstream supply across several European basins on a precarious footing before the season began.',
    category: 'Climate',
    region: 'Europe',
    source: 'The Ski Guru',
    url: 'https://www.the-ski-guru.com/2026/06/01/alps-drought-2026-water-reserves/',
  },
  {
    id: '2026-06-04-dushanbe-conference-presses-transboundary-water',
    date: '2026-06-04',
    title: 'Dushanbe conference presses transboundary water cooperation',
    summary:
      'The fourth Dushanbe Water Conference advanced the water action agenda ahead of Abu Dhabi, with particular focus on shared basins and glacier-fed systems where upstream change propagates directly into downstream drinking water security.',
    category: 'Policy',
    region: 'Central Asia',
    source: 'UAE Ministry of Foreign Affairs',
    url: 'https://www.mofa.gov.ae/en/MediaHub/News/2026/6/4/UAE-Global-Water-Dialogue',
  },
  {
    id: '2026-06-23-un-launches-disclosure-initiative-ai',
    date: '2026-06-23',
    title: 'UN launches disclosure initiative on AI data centre water use',
    summary:
      'The Secretary-General opened a global effort to make data centre water consumption transparent, after disclosures showed steep year-on-year growth and reporting found around two-thirds of US facilities built since 2022 sited in high water-stress areas.',
    category: 'Policy',
    region: 'Global',
    source: 'Axis Intelligence',
    url: 'https://axis-intelligence.com/ai-data-center-water-usage-statistics/',
  },
  {
    id: '2026-06-26-uae-steps-up-water-diplomacy',
    date: '2026-06-26',
    title: 'UAE steps up water diplomacy ahead of the Abu Dhabi conference',
    summary:
      'With the UN 2026 Water Conference scheduled for Abu Dhabi in December, the host advanced a diplomatic programme aimed at building consensus on scarcity, governance and financing before delegations convene.',
    category: 'Policy',
    region: 'Middle East',
    source: 'UAE Ministry of Foreign Affairs',
    url: 'https://www.mofa.gov.ae/en/missions/beirut/media-hub/embassy-news/26-6-2026-1',
  },
  {
    id: '2026-07-16-texas-hill-country-floods-again',
    date: '2026-07-16',
    title: 'Texas Hill Country floods again, a year after the Guadalupe disaster',
    summary:
      'The same catchments that flooded catastrophically in July 2025 were hit again, testing warning systems and emergency water provision that had been rebuilt in the interim and renewing scrutiny of floodplain development across the region.',
    category: 'Crisis',
    region: 'United States',
    source: 'Forbes',
    url: 'https://www.forbes.com/sites/marshallshepherd/2026/07/16/the-texas-hill-country-is-flooding-again---and-its-bad/',
  },
  {
    id: '2026-07-23-attribution-study-finds-climate-change',
    date: '2026-07-23',
    title: 'Attribution study finds climate change deepening European drought',
    summary:
      'World Weather Attribution concluded the highly evaporative conditions across Europe in April–June 2026 were made vastly more likely by warming. The driver was less a rainfall deficit than a warmer atmosphere pulling moisture out of soils.',
    category: 'Climate',
    region: 'Europe',
    source: 'World Weather Attribution',
    url: 'https://www.worldweatherattribution.org/increasingly-hot-europe-faces-more-severe-droughts-and-growing-challenges-for-water-and-land-management/',
  },
  {
    id: '2026-07-24-european-drought-forces-irrigation-curbs',
    date: '2026-07-24',
    title: 'European drought forces irrigation curbs and island emergencies',
    summary:
      'France warned of its smallest maize crop in half a century, Romania restricted irrigation abstraction, the Netherlands declared a water shortage and seven Greek islands declared drought emergencies. Danube levels fell to record seasonal lows.',
    category: 'Crisis',
    region: 'Europe',
    source: 'Phys.org',
    url: 'https://phys.org/news/2026-07-climate-europe-drought-severe.html',
  },
]

/** Newest first. */
export const NEWS_SORTED = [...NEWS].sort((a, b) => b.date.localeCompare(a.date))

export const YEARS = [...new Set(NEWS.map((n) => n.date.slice(0, 4)))].sort().reverse()
