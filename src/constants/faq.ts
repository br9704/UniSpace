/**
 * FAQ copy.
 *
 * Rewritten 2026-08-14. The previous answers described Google Maps popularity
 * data as a live source ("we use Google's typical busyness patterns"), which
 * was not true: Google's public Places API does not expose busyness at all, and
 * the weekly curves in this app are our own modelled estimates. Telling users
 * their data came from Google was borrowing credibility we had not earned, and
 * it contradicted PRD § 13.4, which requires the UI to distinguish clearly
 * between Google data and our own.
 *
 * Anything asserted here must be true of the shipped app. If a claim and the
 * code disagree, one of them is a bug.
 */
export interface FaqEntry {
  question: string
  answer: string
}

export const FAQ: FaqEntry[] = [
  {
    question: 'How does UniSpace know how busy a building is?',
    answer:
      'Three ways, in order of confidence. If enough people using UniSpace are inside a building, ' +
      'we count them and show live occupancy. If students have submitted crowd reports recently, ' +
      'we use those. Otherwise we fall back to a modelled estimate of how busy that building ' +
      'usually is at this time of week. Every reading is labelled with which one you are seeing.',
  },
  {
    question: 'Is my location data private?',
    answer:
      'Your GPS coordinates never leave your device. UniSpace works out which building zone you ' +
      'are in on the phone itself, then sends only that zone ID — never a coordinate. The ' +
      'anonymous session ID used to avoid double-counting you rotates every 30 minutes and is ' +
      'never written to any database.',
  },
  {
    question: 'How accurate is the occupancy data?',
    answer:
      'It depends entirely on the source, which is why we always show it. Live crowdsourced data ' +
      'is the most accurate. Estimates are directional only — they describe a typical week, not ' +
      'today, and cannot know about a cancelled lecture or an exam period. Building capacities are ' +
      'approximate too, which is why percentages are shown with a "~".',
  },
  {
    question: 'What does "estimated" mean?',
    answer:
      'That nobody is currently reporting from that building, so we are showing our model of how ' +
      'busy it usually is at this hour on this day. It is an informed guess, not a measurement. ' +
      'Contrary to what earlier versions of this app said, it does not come from Google — Google ' +
      'does not publish building busyness through any public API.',
  },
  {
    question: 'What is Google used for, then?',
    answer:
      'Opening hours, and nothing else. No personal data is sent to Google, and no data flows ' +
      'from UniSpace to them.',
  },
  {
    question: 'Can I use UniSpace without sharing my location?',
    answer:
      'Yes. You can browse the map, see occupancy and get recommendations without granting GPS. ' +
      'You just will not see walking times, and you will not be contributing to the live count.',
  },
]
