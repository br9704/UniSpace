/**
 * Descriptive copy for each building — what is inside it, roughly where, and
 * what is worth knowing before you walk there.
 *
 * ── On what this is, and is not ─────────────────────────────────────────────
 *
 * This file used to open by claiming it was "researched from university
 * website, library pages, architecture databases". No source was recorded for
 * any single line, and the content carried a great deal of precision that
 * nothing here can support: "500+ study seats", "2,800+ power outlets",
 * "25,851 sqm", "Seven 42-person rooms or 300 exam seats". Those numbers read
 * as facts and were indistinguishable from facts on screen.
 *
 * They are gone. So are the superlatives — "best-value meals on campus", "one
 * of the most atmospheric study spots", "best city views" — which are opinions
 * that were being rendered in the same voice as the occupancy data.
 *
 * What remains is deliberately qualitative: which faculty a building houses,
 * what kind of spaces are in it, and orientation help. If a number matters
 * enough to show a user, it belongs in the database with a source column beside
 * it, the way `hours_source` and the accessibility flags now work — not in a
 * string constant nobody can check.
 *
 * Two standing rules for anything added here:
 *   · **No accessibility claims.** PRD § 13.4 treats wrong accessibility data
 *     as harmful rather than merely inaccurate, and `AccessibilityPanel` is the
 *     one place that may speak to it, because it is the one place wired to the
 *     verified columns and able to render "not checked".
 *   · **No opening hours.** Hours have a provenance model (migration 021) and
 *     five of eighteen buildings have a published source. A card-access window
 *     mentioned in passing here would bypass all of that.
 */
export interface BuildingMeta {
  description: string
  address: string
  tips: string[]
  /** Walking times are rough estimates, so they are written with a `~`. */
  nearbyFood: string[]
  capacityNote: string
  photos?: string[]
}

export const BUILDING_META: Record<string, BuildingMeta> = {
  'baillieu-library': {
    description: 'Main campus library, home to the arts, humanities and social sciences collections plus the Rare Books collection.',
    address: '11 Professors Walk, Parkville',
    tips: ['Ground floor has open study space, bookable computers and study booths.', 'Graduate study room on Level 1 with power at the desks.'],
    nearbyFood: ['Professors Walk Cafe (beside entrance)', 'ST. ALi at Arts & Cultural Building'],
    capacityNote: 'Study space across several public levels',
  },
  'erc-library': {
    description: 'Home to physical sciences, maths, engineering and East Asian collections. Refurbished with quiet pods and collaborative study areas.',
    address: 'Monash Road, Parkville',
    tips: ['After-hours study zone in the lower levels, accessible with a student card.', 'Graduate lounge on Level 3 — swipe access for postgrads.'],
    nearbyFood: ['Student Pavilion food court (adjacent)', 'Campus Canteen at 201 Grattan St'],
    capacityNote: 'Carrels, pods and collaborative areas across several levels',
  },
  'arts-west': {
    description: 'Home to the Faculty of Arts, with teaching spaces, a digital studio, and a gallery showing university cultural collections.',
    address: 'Professors Walk, Parkville',
    tips: ['Breakout spaces on every level with device charging between classes.', 'Object-Based Learning labs draw on the university cultural collections.'],
    nearbyFood: ['Professors Walk Cafe (adjacent)', 'University Cafe on Lygon St (~2 min)'],
    capacityNote: 'Lecture theatre plus specialist teaching rooms',
  },
  'engineering-1': {
    description: 'Home to the Melbourne School of Engineering. Lecture theatres, laboratories and tutorial rooms.',
    address: 'Grattan Street, Parkville',
    tips: ['ERC Library next door is usually quieter for study.', 'Ground-floor common areas have power outlets and fill up later than the libraries.'],
    nearbyFood: ['PappaRich at Doug McDonell (~2 min)', 'Campus Canteen at 201 Grattan St'],
    capacityNote: 'Lecture theatres and tutorial rooms',
  },
  'ict-building': {
    description: 'Home to the School of Computing and Information Systems. Computing labs, teaching spaces, and the CIS Heritage Collection on the upper levels.',
    address: 'Porters Lane, Parkville',
    tips: ['PappaRich on the ground floor.', 'Upper levels are quieter, with the heritage computing displays.'],
    nearbyFood: ['PappaRich (ground floor)', 'Gong Cha at Student Pavilion'],
    capacityNote: 'Computer labs and tutorial rooms across many levels',
  },
  'law-school': {
    description: 'Home to Melbourne Law School. A high-rise building with a multi-level law library, a moot courtroom and the Woodward Conference Centre.',
    address: '185 Pelham Street, Parkville',
    tips: ['The law library spans several mid-building levels and has power throughout.', 'One study level needs a swipe card, and is quieter for it.'],
    nearbyFood: ['Amicus Espresso (ground floor)', 'Lygon Street restaurants (~3 min)'],
    capacityNote: 'Multi-level law library, lecture theatres, moot courtroom',
  },
  'fbe-building': {
    description: 'Home to the Faculty of Business & Economics. Houses the Giblin Eunson Library, which has bookable project rooms.',
    address: '111 Barry Street, Parkville',
    tips: ['Giblin Eunson Library has bookable project rooms — reserve ahead in exam periods.', 'FBE computing spaces open automatically based on enrolment.'],
    nearbyFood: ['Cafe in Giblin Eunson Library', 'The Spot cafes next door'],
    capacityNote: 'Bookable project rooms and a computing lab',
  },
  'the-spot': {
    description: 'Teaching and research centre for Business & Economics, with student lounges spread over several levels.',
    address: '198 Berkeley Street, Parkville',
    tips: ['Student lounges on several levels — the higher ones are usually quieter.', 'Built to a Green Star environmental rating.'],
    nearbyFood: ['Haymarket Place Cafe on Berkeley St', 'Lygon Street dining (~3 min)'],
    capacityNote: 'Student lounges across several levels',
  },
  'melbourne-school-of-design': {
    description: 'Home to Architecture, Building and Planning, in the Glyn Davis Building. Design studios, the Brian Lewis Atrium and the ABP Library.',
    address: 'Masson Road, Parkville',
    tips: ['The Brian Lewis Atrium on Level 1 suits informal study and group work.', 'The Japanese Room and Design Gallery are worth a look between classes.'],
    nearbyFood: ['Standing Room (ground floor — specialty coffee)', 'Professors Walk Cafe'],
    capacityNote: 'Lecture theatres, design studios, Brian Lewis Atrium',
  },
  'kwong-lee-dow': {
    description: 'Home to the Graduate School of Education. Flexible learning spaces that reconfigure between exam halls and classrooms.',
    address: '234 Queensberry Street, Parkville',
    tips: ['Level 1 has couches and study nooks around the perimeter.', 'Movable furniture and variable lighting, designed for focused study.'],
    nearbyFood: ['Cafe Commercio on Leicester St', 'Queensberry Street cafes (~2 min)'],
    capacityNote: 'Reconfigurable teaching rooms and exam space',
  },
  'old-arts': {
    description: 'Heritage-listed Tudor-Gothic building with the clock tower. Home to Faculty of Arts departments and tutorial rooms.',
    address: 'Professors Walk, Parkville',
    tips: ['Next to the Old Quadrangle and South Lawn.', 'Mostly tutorial rooms and offices — little open study space.'],
    nearbyFood: ['Professors Walk Cafe (~1 min)', 'ST. ALi at Arts & Cultural Building (~2 min)'],
    capacityNote: 'Tutorial rooms and offices — limited open study',
  },
  'redmond-barry': {
    description: 'Home to Psychological Sciences and Biosciences. Houses the Rivett Theatre for lectures.',
    address: 'Tin Alley, Parkville',
    // No accessibility tip here. It previously claimed wheelchair access "via
    // northern or eastern entrances" with no source, directly above an
    // accessibility panel that renders [?] for this building. See the header.
    tips: ['Rivett Theatre is on the lower levels — arrive early for a good seat.'],
    nearbyFood: ['Standing Room at Glyn Davis Building', 'Professors Walk Cafe (~2 min)'],
    capacityNote: 'Lecture theatre, computer labs, departmental floors',
  },
  'john-medley': {
    description: 'Twin-tower building housing social science departments and PhD study space. The towers are connected by walkways on the middle levels.',
    address: 'Kernot Road, Parkville',
    tips: ['The East Tower has a dedicated PhD study space on Level 1.', 'Linkway meeting rooms sit between the towers on the upper levels.'],
    nearbyFood: ['Cafe Commercio on Leicester St', 'Grattan Street food outlets (~2 min)'],
    capacityNote: 'Study spaces and meeting rooms across both towers',
  },
  'chemistry-building': {
    description: 'Home to the School of Chemistry. Heritage Gothic building containing the Masson Theatre.',
    address: 'Masson Road, Parkville',
    tips: ['Masson Theatre is the main lecture space.', 'Room numbering is confusing — check your timetable carefully.'],
    nearbyFood: ['Standing Room at Glyn Davis Building (~2 min)', 'Professors Walk Cafe (~3 min)'],
    capacityNote: 'Masson Theatre, teaching labs, research labs',
  },
  'peter-hall': {
    description: 'Home to the School of Mathematics and Statistics. Named after the statistician Peter Hall.',
    address: 'Monash Road, Parkville',
    tips: ['Upper levels are quieter — mainly research staff and PhD students.', 'Tutorial rooms have whiteboards, which helps for group study.'],
    nearbyFood: ['Campus Canteen at 201 Grattan St (~2 min)', 'Student Pavilion food court (~3 min)'],
    capacityNote: 'Tutorial rooms, computer labs, offices',
  },
  'alan-gilbert': {
    description: 'Teaching building for medicine and health science students, with flexible rooms and floor-to-ceiling windows.',
    address: '100 Grattan Street, Parkville',
    tips: ['The Student Study Space (G26) has USB and power at most seats.', 'Bookable meeting rooms on Level 2.'],
    nearbyFood: ['Gilbert at Grattan (ground floor cafe)', 'Haymarket Place Cafe (~1 min)'],
    capacityNote: 'Study space, flexible seminar rooms, meeting rooms',
  },
  'student-pavilion': {
    description: 'Purpose-built student hub with a food court, study spaces, a recreation library and a game room. Part of the New Student Precinct.',
    address: '11 Monash Road, Parkville',
    tips: ['The upper level has city views and a bookable student kitchen.', 'The recreation library holds fiction, graphic novels and a game room.'],
    nearbyFood: ["Ho Ho's Xpress, Moonfishh, Gong Cha (inside)", 'Journeys Cafe (ASRC social enterprise)'],
    capacityNote: 'Several levels of dining, study and event space',
  },
  'david-caro': {
    description: 'Home to the School of Physics. Contains the Hercus and Laby lecture theatres and research labs.',
    address: 'Tin Alley / Swanston Street, Parkville',
    tips: ['Common areas near the theatres are useful between lectures.', 'Physics South Block next door has additional tutorial rooms.'],
    nearbyFood: ['Standing Room at Glyn Davis Building (~1 min)', 'Professors Walk Cafe (~3 min)'],
    capacityNote: 'Hercus and Laby theatres, tutorial rooms, labs',
  },
}
