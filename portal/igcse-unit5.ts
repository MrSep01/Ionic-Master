import { Unit } from './types';

export const IGCSE_UNIT_5: Unit = {
  id: 'igcse-topic-5',
  title: 'Unit 2: Principles of Chemistry (Part 2)',
  description: 'Advanced bonding concepts including Ionic, Covalent, Metallic bonding and Electrolysis. (Spec Section 5)',
  topics: [
    // --- SECTION 5: PRINCIPLES OF CHEMISTRY PART 2 ---
    {
      id: 'topic-5f',
      title: '5(f) Ionic Bonding',
      lessons: [
        {
          id: '5.1-ion-formation',
          title: '5.1: Ion Formation & Atomic Stability',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: [
                    '5.1 understand how ions are formed by electron loss or gain',
                    'Understand the concept of Isoelectronic species (A-Level Transition)',
                    'Explain changes in atomic radius during ion formation'
                ]
            },
            { type: 'header', content: '1. The Stability Paradox' },
            { type: 'paragraph', content: 'Atoms are electrically neutral because they have equal numbers of protons (+) and electrons (-). However, neutrality does not mean stability. Chemical reactivity is driven by the arrangement of electrons in the **Valence Shell** (outermost shell).' },
            { type: 'list', items: [
                '**Noble Gases (Group 0):** Have full valence shells (e.g., Neon: 2.8). They are stable and inert.',
                '**Other Elements:** Have incomplete shells. They are unstable and reactive.'
            ]},
            { type: 'paragraph', content: 'To achieve stability, atoms react to obtain a full outer shell, mimicking the electron configuration of the nearest Noble Gas. This is often called the **Octet Rule**.' },

            { type: 'header', content: '2. Forming Cations (Metal Ions)' },
            { type: 'paragraph', content: 'Metals (Groups 1, 2, 3) have 1, 2, or 3 outer electrons. It is energetically easier to **lose** these few electrons than to gain 5, 6, or 7 more.' },
            { type: 'key-vocab', vocabItems: [
                { term: 'Cation', definition: 'A positively charged ion formed by electron loss.' },
                { term: 'Oxidation', definition: 'Loss of electrons. (OIL: Oxidation Is Loss).' },
                { term: 'Ionization Energy', definition: '(A-Level) The energy required to remove an electron from an atom. This is an Endothermic process.' }
            ]},
            
            { type: 'checkpoint', checkpoint: {
                question: 'What is the charge of an Aluminum ion (Group 3)?',
                options: ['+1', '+2', '+3', '-3'],
                correctIndex: 2,
                explanation: 'Aluminum is in Group 3, so it loses 3 valence electrons to form an Al³⁺ ion.'
            }},

            { type: 'header', content: '3. Forming Anions (Non-Metal Ions)' },
            { type: 'paragraph', content: 'Non-metals (Groups 5, 6, 7) have nearly full shells. They **gain** electrons to complete the octet.' },
            { type: 'key-vocab', vocabItems: [
                { term: 'Anion', definition: 'A negatively charged ion formed by electron gain.' },
                { term: 'Reduction', definition: 'Gain of electrons. (RIG: Reduction Is Gain).' }
            ]},

            { type: 'checkpoint', checkpoint: {
                question: 'What is the electronic configuration of a Sulfide ion (S²⁻)?',
                options: ['2.8.6', '2.8.8', '2.8.4', '2.8.8.2'],
                correctIndex: 1,
                explanation: 'Sulfur atom is 2.8.6. It gains 2 electrons to become S²⁻, resulting in a full shell of 2.8.8.'
            }},

            { type: 'header', content: '4. Interactive Simulation: Electron Transfer' },
            { type: 'paragraph', content: 'Observe the transfer of electrons. Notice the change in size of the atoms as they become ions.' },
            { type: 'simulation', simulationId: 'ion-formation' }
          ]
        },
        {
          id: '5.2-ions-charges',
          title: '5.2: Ionic Charges',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: [
                    '5.2 know the charges of common ions (Groups 1-7, Transition Metals, Polyatomics)'
                ]
            },
            { type: 'paragraph', content: 'You must memorize the charges of common ions to write chemical formulae.' },
            { type: 'list', items: [
                '**Group 1:** +1 (Li, Na, K)',
                '**Group 2:** +2 (Mg, Ca)',
                '**Group 3:** +3 (Al)',
                '**Group 5:** -3 (N, P)',
                '**Group 6:** -2 (O, S)',
                '**Group 7:** -1 (F, Cl, Br, I)',
                '**Silver:** Ag⁺',
                '**Copper(II):** Cu²⁺',
                '**Iron(II/III):** Fe²⁺, Fe³⁺',
                '**Lead:** Pb²⁺',
                '**Zinc:** Zn²⁺'
            ]},
            { type: 'header', content: 'Polyatomic Ions' },
            { type: 'paragraph', content: 'These are ions made of more than one atom.' },
            { type: 'simulation', simulationId: 'oxyanion-builder' },
            { type: 'list', items: [
                '**Ammonium:** NH₄⁺',
                '**Hydroxide:** OH⁻',
                '**Nitrate:** NO₃⁻',
                '**Sulfate:** SO₄²⁻',
                '**Carbonate:** CO₃²⁻'
            ]}
          ]
        },
        {
          id: '5.3-formulae',
          title: '5.3: Writing Formulae',
          blocks: [
             { 
                 type: 'learning-objectives', 
                 items: [
                     '5.3 write formulae for compounds formed between the ions listed above'
                 ] 
             },
             { type: 'paragraph', content: 'Ionic compounds have no overall charge. The total positive charge must equal the total negative charge.' },
             { type: 'simulation', simulationId: 'ionic-master' },
             { type: 'checkpoint', checkpoint: {
                 question: 'What is the correct formula for Calcium Nitrate?',
                 options: ['CaNO₃', 'Ca(NO₃)₂', 'Ca₂NO₃', 'Ca₂N'],
                 correctIndex: 1,
                 explanation: 'Calcium is Ca²⁺. Nitrate is NO₃⁻. You need two nitrates to balance one calcium. Use brackets: Ca(NO₃)₂.'
             }}
          ]
        },
        {
          id: '5.4-dot-cross-ionic',
          title: '5.4: Dot-and-Cross (Ionic)',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: [
                    '5.4 draw dot-and-cross diagrams to show the formation of ionic compounds by electron transfer',
                    'Limit to combinations of Groups 1, 2, 3 and 5, 6, 7',
                    'Understand different stoichiometric ratios (1:1, 1:2, 2:1)'
                ]
            },
            { type: 'key-vocab', vocabItems: [
                { term: 'Dot-and-Cross Diagram', definition: 'A model used to show electron transfer. One atom\'s electrons are dots, the other\'s are crosses, to track where they came from.' },
                { term: 'Valence Shell', definition: 'The outermost shell of electrons, which is involved in bonding.' },
                { term: 'Octet Rule', definition: 'Atoms tend to gain, lose, or share electrons to have 8 electrons in their outer shell.' },
                { term: 'Ratio', definition: 'The proportion of ions needed to balance the charges (e.g. 1 Mg to 2 Cl).' }
            ]},
            
            { type: 'header', content: 'Drawing Conventions' },
            { type: 'paragraph', content: 'To get full marks in exams, follow these conventions:' },
            { type: 'list', items: [
                '**Outer Shells Only:** You usually only need to draw the outer shell electrons.',
                '**Distinction:** Use dots (●) for the metal electrons and crosses (×) for the non-metal electrons (or vice versa).',
                '**Transfer:** Show the electron moving from the metal to the non-metal.',
                '**Final State:** Draw the resulting ions in square brackets `[]` with the charge outside at the top right.'
            ]},

            { type: 'header', content: 'Simulation: Bonding Ratios' },
            { type: 'paragraph', content: 'Explore how atoms react in different ratios to achieve stability. Notice how Magnesium (Group 2) needs two Chlorines (Group 7) to accept its two electrons.' },
            { type: 'simulation', simulationId: 'dot-cross-ionic' },

            { type: 'header', content: 'Scenario 1: 1-to-1 Ratio' },
            { type: 'paragraph', content: 'Example: **Sodium Chloride (NaCl)**. Sodium (2.8.1) loses 1 electron. Chlorine (2.8.7) gains 1 electron. Result: [Na]⁺ and [Cl]⁻.' },

            { type: 'header', content: 'Scenario 2: 1-to-2 Ratio' },
            { type: 'paragraph', content: 'Example: **Magnesium Chloride (MgCl₂)**. Magnesium (2.8.2) needs to lose 2 electrons. Chlorine (2.8.7) can only accept 1. So you need TWO Chlorine atoms.' },

            { type: 'header', content: 'Scenario 3: 2-to-1 Ratio' },
            { type: 'paragraph', content: 'Example: **Sodium Oxide (Na₂O)**. Oxygen (2.6) needs 2 electrons. Sodium (2.8.1) can only give 1. So you need TWO Sodium atoms.' },

            { type: 'header', content: 'Mastery Checkpoints' },
            
            // 10 CHECKPOINTS
            { type: 'checkpoint', checkpoint: {
                question: 'Why do we use dots for one atom and crosses for the other?',
                options: ['Because they are different elements', 'To track the origin of the electrons', 'Because one is positive and one is negative', 'It looks prettier'],
                correctIndex: 1,
                explanation: 'It allows us to see exactly which electron came from which atom, proving that transfer has occurred.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'In Magnesium Chloride (MgCl₂), what is the charge on the Magnesium ion?',
                options: ['+1', '+2', '-1', '-2'],
                correctIndex: 1,
                explanation: 'Magnesium is in Group 2, so it loses 2 electrons to form a 2+ ion.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'Lithium is Group 1. Oxygen is Group 6. What is the formula of Lithium Oxide?',
                options: ['LiO', 'LiO₂', 'Li₂O', 'Li₂O₂'],
                correctIndex: 2,
                explanation: 'Li forms +1. O forms 2-. You need two +1 ions to balance one 2- ion. Formula: Li₂O.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'A diagram shows one [Ca]²⁺ ion and two [F]⁻ ions. What compound is this?',
                options: ['Calcium Fluoride', 'Calcium Difluoride', 'Fluorine Calcite', 'Calcium Fluorine'],
                correctIndex: 0,
                explanation: 'Ionic compounds are named Metal + Non-metal-ide. Calcium Fluoride (CaF₂).'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'After forming the Chloride ion (Cl⁻), what is its electronic configuration?',
                options: ['2.8.7', '2.8.8', '2.8', '2.8.8.1'],
                correctIndex: 1,
                explanation: 'Chlorine atom is 2.8.7. Gaining 1 electron fills the shell to 2.8.8 (Argon configuration).'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: 'Predict the formula for Aluminum Oxide (Al is Group 3, O is Group 6).',
                acceptedAnswers: ['Al2O3'],
                explanation: 'Al is 3+. O is 2-. The lowest common multiple is 6. You need 2 Al (total +6) and 3 O (total -6). Al₂O₃.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'What do the square brackets `[]` around an ion signify?',
                options: ['The atom is radioactive', 'The ion is a solid', 'The electrons are locked in and the species is charged', 'It is a gas'],
                correctIndex: 2,
                explanation: 'Brackets indicate that the species acts as a single charged unit and the electron configuration is stable.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'How many Sodium atoms are needed to react with one Sulfur atom (Group 6)?',
                options: ['1', '2', '3', '4'],
                correctIndex: 1,
                explanation: 'Sulfur needs 2 electrons (to go from 6 to 8). Sodium can only give 1. So you need 2 Sodiums.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'What holds the Magnesium and Oxide ions together in MgO?',
                options: ['Sharing of electrons', 'Magnetic poles', 'Electrostatic attraction', 'Gravity'],
                correctIndex: 2,
                explanation: 'Opposite charges attract. Mg²⁺ attracts O²⁻ strongly.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'Which noble gas has the same electron configuration as the Magnesium ion (Mg²⁺)?',
                options: ['Helium', 'Neon', 'Argon', 'Krypton'],
                correctIndex: 1,
                explanation: 'Mg is 2.8.2. Losing 2 electrons leaves 2.8, which is Neon.'
            }}
          ]
        },
        {
          id: '5.5-ionic-bond-def',
          title: '5.5: The Ionic Bond',
          blocks: [
             { 
                 type: 'learning-objectives', 
                 items: [
                     '5.5 understand ionic bonding in terms of electrostatic attractions',
                     '5.6 understand why compounds with giant ionic lattices have high melting and boiling points'
                 ] 
             },
             { type: 'paragraph', content: 'An ionic bond is defined as the **strong electrostatic attraction between oppositely charged ions**.' },
             { type: 'paragraph', content: 'Ionic compounds do not exist as simple pairs. They form a **Giant Ionic Lattice**: a regular, repeating 3D arrangement of millions of positive and negative ions.' },
             { type: 'checkpoint', checkpoint: {
                 question: 'Why does MgO have a higher melting point than NaCl?',
                 options: ['Mg is heavier than Na', 'MgO bonds are stronger due to higher charges (2+ and 2-)', 'Chlorine is a gas', 'NaCl is edible'],
                 correctIndex: 1,
                 explanation: 'The electrostatic force is proportional to charge. Mg²⁺/O²⁻ have double the charge of Na⁺/Cl⁻, creating much stronger attractions.'
             }}
          ]
        }
      ]
    },
    // --- SECTION 5g: COVALENT BONDING ---
    {
      id: 'topic-5g',
      title: '5(g) Covalent Bonding',
      lessons: [
        {
          id: '5.7-covalent-bond',
          title: '5.7: Covalent Bonding',
          blocks: [
            { 
              type: 'learning-objectives', 
              items: [
                '5.7 explain the formation of covalent bonds between non-metallic elements',
                '5.8 understand covalent bonding as strong electrostatic attraction between nuclei and shared electrons'
              ] 
            },
            { type: 'paragraph', content: 'When two non-metals react, they both need to gain electrons. They cannot transfer electrons, so they **share** them. This is called **Covalent Bonding**.' },
            { type: 'key-vocab', vocabItems: [
                { term: 'Covalent Bond', definition: 'The electrostatic attraction between a shared pair of electrons and the nuclei of the bonded atoms.' },
                { term: 'Molecule', definition: 'A particle made of two or more atoms bonded covalently.' }
            ]},
            { type: 'checkpoint', checkpoint: {
                question: 'What is a covalent bond?',
                options: ['Transfer of electrons', 'Sharing of a pair of electrons', 'Attraction between ions', 'Loss of electrons'],
                correctIndex: 1,
                explanation: 'Covalent bonding involves sharing pairs of electrons so both atoms can achieve a full outer shell.'
            }}
          ]
        },
        {
          id: '5.9-simple-molecular',
          title: '5.9: Simple Molecular Structures',
          blocks: [
            { 
              type: 'learning-objectives', 
              items: [
                '5.9 draw dot-and-cross diagrams for H₂, Cl₂, HCl, H₂O, NH₃, CH₄, O₂, N₂, CO₂, C₂H₄',
                '5.11 explain why substances with simple molecular structures have low melting and boiling points'
              ] 
            },
            { type: 'paragraph', content: 'Substances like Water (H₂O) and Carbon Dioxide (CO₂) exist as small, separate molecules.' },
            { type: 'list', items: [
                '**Intramolecular Bonds:** The covalent bonds INSIDE the molecule are very strong.',
                '**Intermolecular Forces:** The forces BETWEEN the molecules are very weak.'
            ]},
            { type: 'exam-hint', content: 'When you boil water, you are breaking the WEAK intermolecular forces, NOT the strong covalent bonds. You get steam (H₂O), not Hydrogen and Oxygen gas.' },
            { type: 'checkpoint', checkpoint: {
                question: 'Why do simple molecular substances have low melting points?',
                options: ['Covalent bonds are weak', 'Intermolecular forces are weak', 'Atoms are small', 'They conduct electricity'],
                correctIndex: 1,
                explanation: 'Little energy is needed to overcome the weak forces of attraction between the molecules.'
            }}
          ]
        },
        {
          id: '5.12-giant-covalent',
          title: '5.12: Giant Covalent Structures',
          blocks: [
            { 
              type: 'learning-objectives', 
              items: [
                '5.12 explain why giant covalent structures have high melting points',
                '5.13 explain the properties of diamond and graphite'
              ] 
            },
            { type: 'paragraph', content: 'Some covalent substances do not form small molecules. Instead, they form huge 3D networks called **Giant Covalent Lattices**.' },
            { type: 'header', content: 'Diamond vs Graphite' },
            { type: 'list', items: [
                '**Diamond:** Each Carbon bonded to 4 others. Tetrahedral. Very hard. Does not conduct electricity.',
                '**Graphite:** Each Carbon bonded to 3 others. Layers. One delocalised electron per atom (conducts electricity). Soft (layers slide).'
            ]}
          ]
        }
      ]
    },
    // --- SECTION 5h: METALLIC BONDING ---
    {
      id: 'topic-5h',
      title: '5(h) Metallic Bonding',
      lessons: [
        {
          id: '5.15-metallic',
          title: '5.15: Metallic Bonding',
          blocks: [
            { 
              type: 'learning-objectives', 
              items: [
                '5.15 understand metallic bonding in terms of electrostatic attractions',
                '5.16 explain properties of metals (malleability, conductivity)'
              ] 
            },
            { type: 'paragraph', content: 'Metals have a giant structure of **positive ions** surrounded by a **sea of delocalised electrons**.' },
            { type: 'key-vocab', vocabItems: [
                { term: 'Metallic Bond', definition: 'The electrostatic attraction between the positive metal ions and the sea of delocalised electrons.' },
                { term: 'Delocalised', definition: 'Electrons that are free to move throughout the structure.' }
            ]},
            { type: 'checkpoint', checkpoint: {
                question: 'Why do metals conduct electricity?',
                options: ['The ions vibrate', 'The delocalised electrons are free to move', 'They are magnetic', 'They are shiny'],
                correctIndex: 1,
                explanation: 'The free-moving electrons carry charge through the metal structure.'
            }}
          ]
        }
      ]
    },
    // --- SECTION 5i: ELECTROLYSIS ---
    {
      id: 'topic-5i',
      title: '5(i) Electrolysis',
      lessons: [
        {
          id: '5.17-electrolysis-intro',
          title: '5.17: Principles of Electrolysis',
          blocks: [
            { type: 'learning-objectives', items: ['5.17 understand the terms: electrolysis, electrolyte, electrode'] },
            { type: 'paragraph', content: 'Electrolysis is the breakdown of an ionic compound, molten or in aqueous solution, by the passage of electricity.' },
            { type: 'key-vocab', vocabItems: [
                { term: 'Electrolyte', definition: 'The liquid or solution that conducts electricity and is decomposed by it.' },
                { term: 'Anode', definition: 'The positive electrode. Attracts Anions (-).' },
                { term: 'Cathode', definition: 'The negative electrode. Attracts Cations (+).' }
            ]},
            { type: 'checkpoint', checkpoint: {
                question: 'Why do solid ionic compounds not conduct electricity?',
                options: ['They are insulators', 'The ions are fixed in a lattice and cannot move', 'The electrons are stuck', 'They have no charge'],
                correctIndex: 1,
                explanation: 'For electrolysis to work, ions must be free to move to the electrodes. This only happens when molten or dissolved.'
            }}
          ]
        },
        {
            id: '5.19-aqueous',
            title: '5.19: Aqueous Electrolysis Rules',
            blocks: [
                { type: 'paragraph', content: 'In aqueous solutions, water (H₂O) also ionizes into H⁺ and OH⁻. We use rules to decide which ion discharges.' },
                { type: 'list', items: [
                    '**Cathode (-):** If metal is more reactive than Hydrogen, Hydrogen is produced. If less reactive (Cu, Ag), metal is produced.',
                    '**Anode (+):** If Halide (Cl⁻, Br⁻, I⁻) is present, Halogen is produced. If not (SO₄²⁻, NO₃⁻), Oxygen is produced.'
                ]}
            ]
        }
      ]
    }
  ]
};