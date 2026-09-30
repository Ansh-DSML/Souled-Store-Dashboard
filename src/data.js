// All figures in this file are illustrative case-study data for the TSS DropDesk
// demo. They are built from public D2C benchmarks and TSS's own published figures
// where available, and should be replaced with real GA4, Meta, Google and CRM
// data before this dashboard drives a live decision.

export const H = 3600000
export const MIN = 60000
export const D = 86400000

// Pipeline opportunities shown on the Command Center kanban board.
// agoMs = how long ago this card entered its current stage, measured from page load.
export const OPPORTUNITIES = [
  { id: 'OPP-023', title: 'Stray-dog viral clip meme tee', col: 'signal', track: 'fast', agoMs: 42 * MIN, slaMs: 2 * H, pod: 'Social Listening', next: 'Auto-triage running', done: false, image: 'OPP-023.jpg' },
  { id: 'OPP-026', title: 'Fan-requested Bleach collab poll', col: 'signal', track: 'fast', agoMs: 12 * MIN, slaMs: 2 * H, pod: 'Community', next: 'Validating against search volume and waitlist', done: false, image: 'OPP-026.jpg' },
  { id: 'OPP-022', title: 'Shonen crossover hoodie', col: 'triage', track: 'rights', agoMs: 2 * D + 10 * H, slaMs: 3 * D, pod: 'Licensing', next: 'Awaiting licensor legal response, day 3 of 3, SLA due today', done: false, image: 'OPP-022.jpg' },
  { id: 'OPP-024', title: 'Caped-hero redesign tee', col: 'decision', track: 'rights', agoMs: 3 * D + 2 * H, slaMs: 3 * D + 2 * H, pod: 'Licensing + Merch', next: 'Decision: HOLD, licensor minimum guarantee exceeds projected 90-day sell-through', done: true, image: 'OPP-024.jpg' },
  { id: 'OPP-025', title: 'Retro cricket jersey colorway', col: 'production', track: 'fast', agoMs: 8 * H + 30 * MIN, slaMs: 11.5 * H, pod: 'Studio Ops', next: 'Print run at partner facility, ETA 3h to live', done: false, image: 'OPP-025.jpg' },
  { id: 'OPP-021', title: 'Retro varsity jacket', col: 'live', track: 'fast', agoMs: 14 * H + 32 * MIN, slaMs: 24 * H, pod: 'Growth Pod', next: 'Monitoring, verdict due at T+24:00', done: false, hero: true, image: 'OPP-021.jpg' },
  { id: 'OPP-019', title: 'Post-match bucket hat', col: 'review', track: 'fast', agoMs: 9 * D, slaMs: 11.5 * H, pod: 'Growth Pod', next: 'Result: 118% sell-through, reorder shipped', done: true, image: 'OPP-019.jpg' },
  { id: 'OPP-018', title: 'City capsule launch, Patiala', col: 'review', track: 'fast', agoMs: 12 * D, slaMs: 11.5 * H, pod: 'Retail + Growth', next: 'Result: store-locator outage caught mid-flight, fixed in 40 min, 76% sell-through', done: true, image: 'OPP-018.jpg' },
]

export const PIPELINE_COLUMNS = [
  { id: 'signal', label: 'Signal detected' },
  { id: 'triage', label: 'Rights & feasibility triage' },
  { id: 'decision', label: 'Go / No-Go decision' },
  { id: 'production', label: 'Design & production' },
  { id: 'live', label: 'Live' },
  { id: 'review', label: 'Post-launch review' },
]

// Speed Benchmark: old sequential process vs the fast-track process, in their own units.
export const OLD_PROCESS_STAGES = [
  { name: 'Ideation & brief', v: 2 },
  { name: 'Design', v: 3 },
  { name: 'Sampling & vendor QA', v: 3 },
  { name: 'Legal / licensing review', v: 2 },
  { name: 'Bulk production', v: 5 },
  { name: 'Photography & content', v: 2 },
  { name: 'Catalog & feed setup, manual', v: 2 },
  { name: 'Media planning & launch QA', v: 2 },
]

export const FAST_TRACK_STAGES = [
  { name: 'Rights / feasibility triage', v: 0.5 },
  { name: 'Go / No-Go decision', v: 0.5 },
  { name: 'Design + limited-run production', v: 6 },
  { name: 'Catalog & tracking auto-provision', v: 1 },
  { name: 'AI-assisted creative + review', v: 2 },
  { name: 'Final QA gate', v: 1 },
  { name: 'Staged go-live', v: 0.5 },
]

export const COMPRESSION_ROWS = [
  { stage: 'Rights / feasibility triage', change: '2 days to 30 min', how: 'Standing pre-clearance ruleset for original, non-IP designs. Automated trademark and franchise-conflict scan with human sign-off only on flags.' },
  { stage: 'Design & production', change: '7 days to 6 hrs', how: 'On-demand, limited-run manufacturing partner network with pre-approved print specs, instead of a full bulk-production cycle.' },
  { stage: 'Catalog & tracking', change: '2 days to 1 hr', how: 'New SKUs inherit a pre-built GA4, Meta CAPI and feed template automatically. Nothing is wired by hand.' },
  { stage: 'Creative', change: '2 days to 2 hrs', how: 'AI-drafted ad copy and variant concepts, with human brand review before anything ships.' },
  { stage: 'Legal / licensing, rights-gated path', change: 'Unchanged', how: 'Franchise approvals are a third-party dependency and are not compressed. Those opportunities stay on their own track.' },
]

// 24-Hour War Room: OPP-021, followed hour by hour once it goes live at T+11:30.
export const WAR_ROOM = {
  agoMs: 14 * H + 32 * MIN,
  verdictWindowMs: 24 * H,
  timeline: [
    ['T+0:00', 'Signal detected. Social listening flags a mention spike.'],
    ['T+0:30', 'Rights and IP scan clears. No franchise conflict, routed to fast track.'],
    ['T+1:00', 'Go decision logged by cross-functional huddle.'],
    ['T+7:00', 'Design finalized, limited run of 1,500 in production.'],
    ['T+8:00', 'Catalog and tracking auto-provisioned across web, app, Meta, Google.'],
    ['T+10:00', 'Creative variants drafted and reviewed.'],
    ['T+11:00', 'Final QA gate passed. Price, offer and deep-link checks clean.'],
    ['T+11:30', 'Staged go-live: app, then web, then paid channels.'],
    ['T+24:00', '24-hour verdict due.'],
  ],
  kpis: {
    sellThroughPct: 83.3,
    unitsSold: 1250,
    unitsTotal: 1500,
    revenueLabel: '₹18.7L',
    aov: 1499,
    contributionMarginPct: 33.0,
    newCustomerSharePct: 61,
    hookRatePct: 34,
    frequency: 1.8,
  },
  hourlyOrders: [40, 205, 175, 140, 118, 95, 82, 128, 105, 75, 50, 37],
  hourlyLabels: ['h0', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9', 'h10', 'h11'],
  channelSplit: [
    { label: 'App', v: 470, sub: '37.6% of orders' },
    { label: 'Meta', v: 400, sub: '32.0% of orders' },
    { label: 'Google', v: 210, sub: '16.8% of orders' },
    { label: 'Organic / Influencer', v: 110, sub: '8.8% of orders' },
    { label: 'Store', v: 60, sub: '4.8% of orders' },
  ],
  funnel: [
    { name: 'Impressions', v: 2410000 },
    { name: 'Clicks', v: 61000 },
    { name: 'Product views', v: 47500 },
    { name: 'Add to cart', v: 8200 },
    { name: 'Purchases', v: 1250 },
  ],
  verdict: {
    tag: 'SCALE',
    reasons: [
      'Sell-through pace projects a full sellout by roughly T+16:40, well inside the 24-hour window.',
      'Hook rate, 34%, is above the 30% go threshold. Frequency, 1.8, is well clear of the 3.0 fatigue line.',
      'Contribution margin, 33%, clears the 28% floor set for fast-track approval.',
      'New customer share, 61%, confirms this is incremental reach, not existing demand pulled forward.',
      'Complaint rate, 0.4%, is well under the 2% rollback threshold.',
    ],
    action: 'Reorder 2,000 units from the same production partner, a 4-day lead time, extend paid support to Google Shopping, and brief the next fandom-adjacent original design off the same creator moment.',
  },
}

// Cohort & Retention: does the trend buyer come back, tracked against a baseline
// group of new customers acquired the same week through normal channels.
export const RETENTION_DAYS = ['Day 0', 'Day 7', 'Day 14', 'Day 30', 'Day 60', 'Day 90']
export const RETENTION_TREND_COHORT = [0, 6, 11, 22, 31, 37]
export const RETENTION_BASELINE = [0, 4, 9, 18, 27, 33]

export const COHORT_TABLE = [
  { metric: 'New-customer CAC', trend: '₹410', baseline: '₹540', delta: '-24%', good: true },
  { metric: '30-day repeat rate', trend: '22%', baseline: '18%', delta: '+4 pts', good: true },
  { metric: '60-day repeat rate', trend: '31%', baseline: '27%', delta: '+4 pts', good: true },
  { metric: '90-day repeat rate', trend: '37%', baseline: '33%', delta: '+4 pts', good: true },
  { metric: 'Membership attach, 30d', trend: '14%', baseline: '9%', delta: '+5 pts', good: true },
  { metric: 'LTV : CAC, 90d projected', trend: '3.4 : 1', baseline: '2.9 : 1', delta: '+0.5', good: true },
  { metric: 'Contribution margin / order', trend: '₹494', baseline: '₹410', delta: '+₹84', good: true },
]

// Catalog & Governance
export const OFFER_LEDGER = [
  { surface: 'Website (PDP)', price: '₹1,999', verified: 'T+11:15', status: 'match' },
  { surface: 'App', price: '₹1,999, member ₹1,599', verified: 'T+11:15', status: 'match' },
  { surface: 'Meta catalog', price: '₹1,999', verified: 'T+11:20', status: 'match' },
  { surface: 'Google Merchant Center', price: '₹1,999', verified: 'T+11:20', status: 'match' },
  { surface: 'Membership, annual, site-wide', price: '₹199 canonical', verified: 'T+11:15', status: 'flagged', note: 'Legacy ₹99 URL still resolving, ticketed' },
]

export const FEED_HEALTH = [
  { feed: 'Meta Commerce Manager', gtin: '100%', sync: 'Auto, 15 min', disapprovals: '0', warn: false },
  { feed: 'Google Merchant Center', gtin: '100%', sync: 'Auto, 15 min', disapprovals: '0', warn: false },
  { feed: 'OPP-025, in production', gtin: '92%', sync: 'Pending SKU codes', disapprovals: '2 blocking', warn: true },
]

export const DEEPLINK_QA = [
  { path: 'Meta ad to App', dest: 'Exact PDP', status: 'pass' },
  { path: 'Email to App', dest: 'Exact PDP', status: 'pass' },
  { path: 'Instagram bio to Web', dest: 'Collection page', status: 'pass' },
  { path: 'Store locator, Patiala capsule', dest: 'Google Maps listing', status: 'warn', note: 'Failed at launch, fixed in 40 min, retested pass' },
]

export const GOVERNANCE_ALERTS = [
  { level: 'warn', time: 'T+2d', text: 'Store locator returned an offline status while the Patiala local ads were live. Caught by the hourly link check, fixed in 40 minutes.' },
  { level: 'warn', time: 'Ongoing', text: 'Legacy 12-month membership URL still serves ₹99 instead of the canonical ₹199. Ticketed, and that path is paused in paid media until resolved.' },
  { level: 'good', time: 'T+11:18', text: 'OPP-021 feed push verified across both catalogs, zero disapprovals.' },
  { level: 'good', time: 'T+8:40', text: 'OPP-025 GA4 and CAPI events auto-attached to the new SKU, deduplication key verified.' },
]

// AI Copilot
export const ANOMALIES = [
  { level: 'warn', time: '14:02', text: 'GA4 purchase count trailing CAPI purchases by 6% on OPP-021. Possible browser-side signal loss, flagged for review.' },
  { level: 'warn', time: '12:40', text: 'Ad set "OPP-021 / Prospecting B" frequency crossed 3.1. Recommending creative rotation.' },
  { level: 'crit', time: '09:15', text: 'OPP-025 feed push blocked: 2 SKUs missing GTIN. Routed to Merch Ops.' },
  { level: 'good', time: '07:50', text: 'Sentiment scan on OPP-021 comments: swing toward sizing questions after size S sold out early.' },
]

export const CREATIVE_LOG = [
  { variant: 'A', hook: 'UGC style: "Off the pitch, into your wardrobe."', status: 'Approved, live', kind: 'good', hookRate: 38 },
  { variant: 'B', hook: 'Urgency: "The jacket everyone’s asking about. Limited run."', status: 'Approved, live', kind: 'good', hookRate: 34 },
  { variant: 'C', hook: 'Utility: "Vintage varsity, reworked for game day."', status: 'Edited by brand team', kind: 'neutral', hookRate: 24 },
  { variant: 'D', hook: 'Educational: fabric and GSM callout', status: 'Held for hour-6 rotation', kind: 'warning', hookRate: 17 },
]

export const SENTIMENT = [
  { label: 'Sizing questions', v: 46 },
  { label: 'Restock requests', v: 28 },
  { label: 'Price comments', v: 14 },
  { label: 'Delivery questions', v: 8 },
  { label: 'Complaints', v: 4 },
]

export const THRESHOLDS = [
  { signal: 'Sell-through pace, hour 3 vs stock', kill: '<20%', hold: '20–50%', scale: '>50%', actual: '83%' },
  { signal: 'Hook rate', kill: '<20%', hold: '20–30%', scale: '>30%', actual: '34%' },
  { signal: 'Frequency, fatigue', kill: '>4.0', hold: '3.0–4.0', scale: '<3.0', actual: '1.8' },
  { signal: 'Contribution margin', kill: '<15%', hold: '15–28%', scale: '>28%', actual: '33%' },
  { signal: 'Complaint rate', kill: '>5%', hold: '2–5%', scale: '<2%', actual: '0.4%' },
]

export const TICKER_ITEMS = [
  '3 opportunities in triage',
  { bold: 'SLA at risk', text: ': OPP-022 licensor review due today' },
  'OPP-021 live, 83.3% sell-through',
  { bold: 'Alert', text: ': legacy membership URL still serving ₹99, ticketed' },
  'OPP-025 in production, ETA 3h to live',
  '1 launch inside the 24-hour verdict window',
]
