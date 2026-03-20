/** Real UoM building metadata — researched from university website, library pages, architecture databases. */
export interface BuildingMeta {
  description: string
  address: string
  tips: string[]
  nearbyFood: string[]
  capacityNote: string
}

export const BUILDING_META: Record<string, BuildingMeta> = {
  'baillieu-library': {
    description: 'Main campus library with 500+ study seats across 5 levels. Home to arts, humanities, and social sciences collections plus the Rare Books collection.',
    address: '11 Professors Walk, Parkville',
    tips: ['Ground floor has 290+ study spaces with bookable computers and study booths.', 'Level 1 graduate study room with 24 power-enabled desks.'],
    nearbyFood: ['Professors Walk Cafe (beside entrance)', 'ST. ALi at Arts & Cultural Building'],
    capacityNote: '~500+ seats across 5 public levels',
  },
  'erc-library': {
    description: 'Home to physical sciences, maths, engineering and East Asian collections. Recently refurbished with Chill Out pods and collaborative study areas.',
    address: 'Monash Road, Parkville',
    tips: ['After-hours study zone (Basement to Level 1) accessible with student card.', 'Level 3 Graduate Student lounge — swipe access for postgrads.'],
    nearbyFood: ['Student Pavilion food court (adjacent)', 'Campus Canteen at 201 Grattan St'],
    capacityNote: 'Multiple levels with carrels, pods, and collaborative areas',
  },
  'arts-west': {
    description: 'Home to the Faculty of Arts with 24 teaching spaces, a digital studio, and gallery showcasing university cultural collections.',
    address: 'Professors Walk, Parkville',
    tips: ['Breakout spaces on every level with device charging between classes.', 'Object-Based Learning labs with artefacts from 23 cultural collections.'],
    nearbyFood: ['Professors Walk Cafe (adjacent)', 'University Cafe on Lygon St (2 min)'],
    capacityNote: '150-seat lecture theatre plus specialist rooms',
  },
  'engineering-1': {
    description: 'Home to the Melbourne School of Engineering. Lecture theatres, laboratories, and tutorial rooms for engineering students.',
    address: 'Grattan Street, Parkville',
    tips: ['Check ERC Library next door for quieter study.', 'Ground-floor common areas have power outlets — less crowded than libraries.'],
    nearbyFood: ['PappaRich at Doug McDonell (2 min)', 'Campus Canteen at 201 Grattan St'],
    capacityNote: 'Multiple lecture theatres and tutorial rooms',
  },
  'ict-building': {
    description: 'Home to the School of Computing and Information Systems. Computing labs, teaching spaces, and the CIS Heritage Collection on levels 7-8.',
    address: 'Porters Lane, Parkville',
    tips: ['PappaRich on ground floor — best-value meals on campus.', 'Upper levels (7-8) are quieter with heritage computing displays.'],
    nearbyFood: ['PappaRich (ground floor, Mon-Fri)', 'Gong Cha at Student Pavilion'],
    capacityNote: 'Computer labs and tutorial rooms across 8+ levels',
  },
  'law-school': {
    description: 'Home to Melbourne Law School. 12-storey building with a 3-level law library, moot courtroom, and the Woodward Conference Centre.',
    address: '185 Pelham Street, Parkville',
    tips: ['Law Library (levels 3-5) has 2,800+ power outlets.', 'Level 3 study area requires swipe card — quieter.'],
    nearbyFood: ['Amicus Espresso (ground floor)', 'Lygon Street restaurants (3 min)'],
    capacityNote: '3-level law library, lecture theatres, moot courtroom',
  },
  'fbe-building': {
    description: 'Home to the Faculty of Business & Economics. Houses the Giblin Eunson Library with 16 bookable project rooms and extended hours.',
    address: '111 Barry Street, Parkville',
    tips: ['Giblin Eunson Library open 7am-1am with student card.', 'FBE computing spaces auto-accessible based on enrolment.'],
    nearbyFood: ['Cafe in Giblin Eunson Library', 'The Spot cafes next door'],
    capacityNote: '16 bookable project rooms, 18-machine computing lab',
  },
  'the-spot': {
    description: 'Teaching and research centre for Business & Economics. 5 Star Green Star building with student lounges on 4 levels.',
    address: '198 Berkeley Street, Parkville',
    tips: ['Student lounges on Levels 1, 2, 3, and 6 — higher floors are quieter.', 'One of the most energy-efficient buildings on campus.'],
    nearbyFood: ['Haymarket Place Cafe on Berkeley St', 'Lygon Street dining (3 min)'],
    capacityNote: '25,851 sqm with student lounges on 4 levels',
  },
  'melbourne-school-of-design': {
    description: 'Home to Architecture, Building and Planning. Award-winning 6 Star Green Star building with design studios, the Brian Lewis Atrium, and ABP Library.',
    address: 'Masson Road, Parkville',
    tips: ['Brian Lewis Atrium on Level 1 is great for informal study and group work.', 'Japanese Room and Design Gallery worth visiting between classes.'],
    nearbyFood: ['Standing Room (ground floor — specialty coffee)', 'Professors Walk Cafe'],
    capacityNote: 'Lecture theatres, design studios, Brian Lewis Atrium',
  },
  'kwong-lee-dow': {
    description: 'Home to the Graduate School of Education. Flexible learning spaces that reconfigure from exam halls to classrooms.',
    address: '234 Queensberry Street, Parkville',
    tips: ['Level 1 has comfy couches and study nooks around the perimeter.', 'Smart furniture and variable lighting designed for focused study.'],
    nearbyFood: ['Cafe Commercio on Leicester St', 'Queensberry Street cafes (1-2 min)'],
    capacityNote: 'Seven 42-person rooms or 300 exam seats',
  },
  'old-arts': {
    description: 'Heritage-listed 1924 Tudor-Gothic building with iconic clock tower. Home to Faculty of Arts departments and tutorial rooms.',
    address: 'Professors Walk, Parkville',
    tips: ['Heritage architecture — one of the most atmospheric study spots on campus.', 'Located next to Old Quadrangle and South Lawn.'],
    nearbyFood: ['Professors Walk Cafe (1 min)', 'ST. ALi at Arts & Cultural Building (2 min)'],
    capacityNote: 'Tutorial rooms and offices — limited open study',
  },
  'redmond-barry': {
    description: 'Home to Psychological Sciences (levels 6-12) and Biosciences (levels 2-5). Houses the Rivett Theatre for lectures.',
    address: 'Tin Alley, Parkville',
    tips: ['Rivett Theatre on lower levels — arrive early for good seats.', 'Wheelchair access via northern or eastern entrances.'],
    nearbyFood: ['Standing Room at Glyn Davis Building', 'Professors Walk Cafe (2 min)'],
    capacityNote: '12 levels with Rivett Theatre and computer labs',
  },
  'john-medley': {
    description: 'Twin-tower building home to social science departments and PhD study spaces. Connected by walkways on levels 2-5.',
    address: 'Kernot Road, Parkville',
    tips: ['Level 1 East Tower has a dedicated PhD study space.', 'Linkway meeting rooms between towers on upper levels.'],
    nearbyFood: ['Cafe Commercio on Leicester St', 'Grattan Street food outlets (2 min)'],
    capacityNote: 'Study spaces and meeting rooms across both towers',
  },
  'chemistry-building': {
    description: 'Home to Australia\'s oldest and largest School of Chemistry. Heritage 1938 Gothic building with the Masson Theatre lecture hall.',
    address: 'Masson Road, Parkville',
    tips: ['Masson Theatre — one of the most characterful lecture spaces on campus.', 'Room numbering can be confusing — check timetable carefully.'],
    nearbyFood: ['Standing Room at Glyn Davis Building (2 min)', 'Professors Walk Cafe (3 min)'],
    capacityNote: 'Masson Theatre, teaching labs, research labs',
  },
  'peter-hall': {
    description: 'Home to the School of Mathematics and Statistics. Named after Professor Peter Hall, a world-leading statistician.',
    address: 'Monash Road, Parkville',
    tips: ['Upper levels are quieter — mainly research staff and PhD students.', 'Tutorial rooms have whiteboards — useful for group study.'],
    nearbyFood: ['Campus Canteen at 201 Grattan St (2 min)', 'Student Pavilion food court (3 min)'],
    capacityNote: 'Tutorial rooms, computer labs, offices',
  },
  'alan-gilbert': {
    description: 'Modern teaching building for medicine and health science students. Flexible spaces with Skyfold walls and floor-to-ceiling windows.',
    address: '100 Grattan Street, Parkville',
    tips: ['Student Study Space (G26) has USB and power at most seats.', 'Two bookable meeting rooms on Level 2 (capacity 20 each).'],
    nearbyFood: ['Gilbert at Grattan (ground floor cafe)', 'Haymarket Place Cafe (1 min)'],
    capacityNote: 'Study space, flexible seminar rooms, meeting rooms',
  },
  'student-pavilion': {
    description: 'Purpose-built student hub (2023) with food court, study spaces, recreation library, and a game room. Part of the New Student Precinct.',
    address: '11 Monash Road, Parkville',
    tips: ['Level 4 has the best city views and a bookable student kitchen.', 'Recreation library has fiction, graphic novels, and a game room.'],
    nearbyFood: ["Ho Ho's Xpress, Moonfishh, Gong Cha (inside)", 'Journeys Cafe (ASRC social enterprise, under $10)'],
    capacityNote: 'Multiple levels of dining, study, and event spaces',
  },
  'david-caro': {
    description: 'Home to the School of Physics. Contains the Hercus and Laby lecture theatres and research labs.',
    address: 'Tin Alley / Swanston Street, Parkville',
    tips: ['Ground-level common areas near theatres good for study between lectures.', 'Physics South Block adjacent has extra tutorial rooms.'],
    nearbyFood: ['Standing Room at Glyn Davis Building (1 min)', 'Professors Walk Cafe (3 min)'],
    capacityNote: 'Hercus and Laby theatres, tutorial rooms, labs',
  },
}
