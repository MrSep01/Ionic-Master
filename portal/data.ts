
export type CourseLevel = 'IGCSE' | 'A-LEVEL';

export interface Resource {
  title: string;
  type: 'PDF' | 'VIDEO' | 'LINK';
  url: string;
}

export interface Module {
  id: string;
  unitNumber: number; // Or Topic Number
  title: string;
  description: string;
  level: CourseLevel;
  status: 'COMPLETED' | 'ACTIVE' | 'LOCKED';
  appLink?: boolean; // If true, launches the internal IonicMaster app
  appLabel?: string;
  resources: Resource[];
}

export const CURRICULUM: Module[] = [
  // --- IGCSE EDEXCEL (9-1) ---
  {
    id: 'igcse-topic-1',
    unitNumber: 1,
    title: 'Principles of Chemistry (Part 1)',
    description: 'States of matter, atomic structure, the Periodic Table, and chemical formulae.',
    level: 'IGCSE',
    status: 'ACTIVE',
    appLink: true, // Launches IonicMaster
    appLabel: 'Launch Ionic Simulation',
    resources: [
      { title: 'Syllabus Specification (Topic 1)', type: 'PDF', url: '#' },
      { title: 'Atomic Structure Notes', type: 'PDF', url: '#' }
    ]
  },
  {
    id: 'igcse-topic-2',
    unitNumber: 2,
    title: 'Inorganic Chemistry (Part 1)',
    description: 'Group 1 (Alkali metals), Group 7 (Halogens), Gases in the atmosphere, and Reactivity series.',
    level: 'IGCSE',
    status: 'ACTIVE',
    resources: [
      { title: 'Group 1 & 7 Trends', type: 'VIDEO', url: '#' }
    ]
  },
  {
    id: 'igcse-topic-3',
    unitNumber: 3,
    title: 'Physical Chemistry (Part 1)',
    description: 'Energetics, Rates of reaction, and Reversible reactions and equilibria.',
    level: 'IGCSE',
    status: 'LOCKED',
    resources: []
  },
  {
    id: 'igcse-topic-4',
    unitNumber: 4,
    title: 'Organic Chemistry (Part 1)',
    description: 'Introduction to organic compounds, Alkanes, Alkenes, Alcohols, and Carboxylic acids.',
    level: 'IGCSE',
    status: 'LOCKED',
    resources: []
  },
  {
    id: 'igcse-topic-5',
    unitNumber: 5,
    title: 'Principles of Chemistry (Part 2)',
    description: 'Ionic, Covalent, and Metallic bonding, Giant structures, and Electrolysis.',
    level: 'IGCSE',
    status: 'ACTIVE',
    appLink: true,
    appLabel: 'Bonding Simulation',
    resources: []
  },

  // --- A LEVEL EDEXCEL (IAL) ---
  {
    id: 'alevel-unit-1',
    unitNumber: 1,
    title: 'Structure, Bonding & Intro to Organic',
    description: 'Formulae, equations, ionic/covalent bonding, and introductory organic chemistry.',
    level: 'A-LEVEL',
    status: 'ACTIVE',
    appLink: true, // Launches IonicMaster (Useful for recap + complex ions)
    appLabel: 'Launch Bonding Lab',
    resources: [
      { title: 'Unit 1 Specification', type: 'PDF', url: '#' },
      { title: 'Born-Haber Cycles', type: 'VIDEO', url: '#' }
    ]
  },
  {
    id: 'alevel-unit-2',
    unitNumber: 2,
    title: 'Energetics, Group Chemistry & Alcohols',
    description: 'Enthalpy changes, Group 2 & 7 trends, Halogenoalkanes, and Alcohols.',
    level: 'A-LEVEL',
    status: 'LOCKED',
    resources: []
  },
  {
    id: 'alevel-unit-4',
    unitNumber: 4,
    title: 'Transition Metals & Organic Nitrogen',
    description: 'Complex ions, transition metal chemistry, and organic nitrogen compounds.',
    level: 'A-LEVEL',
    status: 'LOCKED',
    resources: []
  },
  {
    id: 'alevel-unit-5',
    unitNumber: 5,
    title: 'Redox & Transition Metals',
    description: 'Redox equilibria, transition metals chemistry, and organic synthesis.',
    level: 'A-LEVEL',
    status: 'LOCKED',
    resources: []
  }
];
