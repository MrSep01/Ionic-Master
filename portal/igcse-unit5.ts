
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
            
            // --- INTRODUCTION ---
            { type: 'header', content: '1. The Stability Paradox' },
            { type: 'paragraph', content: 'Atoms are electrically neutral because they have equal numbers of protons (+) and electrons (-). However, neutrality does not mean stability. Chemical reactivity is driven by the arrangement of electrons in the **Valence Shell** (outermost shell).' },
            { type: 'list', items: [
                '**Noble Gases (Group 0):** Have full valence shells (e.g., Neon: 2.8). They are stable and inert.',
                '**Other Elements:** Have incomplete shells. They are unstable and reactive.'
            ]},
            { type: 'paragraph', content: 'To achieve stability, atoms react to obtain a full outer shell, mimicking the electron configuration of the nearest Noble Gas. This is often called the **Octet Rule**.' },

            // --- FORMING CATIONS ---
            { type: 'header', content: '2. Forming Cations (Metal Ions)' },
            { type: 'paragraph', content: 'Metals (Groups 1, 2, 3) have 1, 2, or 3 outer electrons. It is energetically easier to **lose** these few electrons than to gain 5, 6, or 7 more.' },
            { type: 'key-vocab', vocabItems: [
                { term: 'Cation', definition: 'A positively charged ion formed by electron loss.' },
                { term: 'Oxidation', definition: 'Loss of electrons. (OIL: Oxidation Is Loss).' },
                { term: 'Ionization Energy', definition: '(A-Level) The energy required to remove an electron from an atom. This is an Endothermic process (energy must be put in).' }
            ]},
            { type: 'paragraph', content: '**Example: Sodium (Na)**' },
            { type: 'list', items: [
                'Atom: 2.8.1 (11p, 11e). Neutral.',
                'Reaction: Loses 1 electron.',
                'Ion: 2.8 [Na]⁺ (11p, 10e). Net Charge +1.',
                'Configuration matches **Neon**.'
            ]},

            // --- CHECKPOINT 1 & 2 ---
            { type: 'checkpoint', checkpoint: {
                question: 'What is the charge of an Aluminum ion (Group 3)?',
                options: ['+1', '+2', '+3', '-3'],
                correctIndex: 2,
                explanation: 'Aluminum is in Group 3, so it loses 3 valence electrons to form an Al³⁺ ion.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'Which term describes the formation of a positive ion?',
                options: ['Reduction', 'Oxidation', 'Neutralization', 'Polymerization'],
                correctIndex: 1,
                explanation: 'Oxidation Is Loss of electrons (OIL).'
            }},

            // --- BRIDGE: ATOMIC RADIUS ---
            { type: 'exam-hint', content: 'BRIDGE TO A-LEVEL: Why is a Cation smaller than its parent atom? 1) It loses an entire electron shell. 2) The remaining electrons are pulled closer by the nucleus because the proton-to-electron ratio has increased.' },

            // --- FORMING ANIONS ---
            { type: 'header', content: '3. Forming Anions (Non-Metal Ions)' },
            { type: 'paragraph', content: 'Non-metals (Groups 5, 6, 7) have nearly full shells. They **gain** electrons to complete the octet.' },
            { type: 'key-vocab', vocabItems: [
                { term: 'Anion', definition: 'A negatively charged ion formed by electron gain.' },
                { term: 'Reduction', definition: 'Gain of electrons. (RIG: Reduction Is Gain).' },
                { term: 'Electron Affinity', definition: '(A-Level) The energy change when an electron is added to an atom. This is often Exothermic (releases energy) due to attraction from the nucleus.' }
            ]},
            { type: 'paragraph', content: '**Example: Chlorine (Cl)**' },
            { type: 'list', items: [
                'Atom: 2.8.7 (17p, 17e). Neutral.',
                'Reaction: Gains 1 electron.',
                'Ion: 2.8.8 [Cl]⁻ (17p, 18e). Net Charge -1.',
                'Configuration matches **Argon**.'
            ]},

            // --- CHECKPOINT 3 & 4 ---
            { type: 'checkpoint', checkpoint: {
                question: 'What is the electronic configuration of a Sulfide ion (S²⁻)? (Sulfur is Atomic No. 16)',
                options: ['2.8.6', '2.8.8', '2.8.4', '2.8.8.2'],
                correctIndex: 1,
                explanation: 'Sulfur atom is 2.8.6. It gains 2 electrons to become S²⁻, resulting in a full shell of 2.8.8.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'Why is an Anion larger than its parent atom? (Advanced)',
                options: ['It has more shells', 'It has more protons', 'Electron-electron repulsion pushes the shell outwards', 'The nucleus gets weaker'],
                correctIndex: 2,
                explanation: 'The number of shells stays the same, but adding extra electrons increases repulsion between them, causing the electron cloud to expand.'
            }},

            // --- SIMULATION ---
            { type: 'header', content: '4. Interactive Simulation: Electron Transfer' },
            { type: 'paragraph', content: 'Observe the transfer of electrons. Notice the change in size of the atoms as they become ions. The metal shrinks (cation), and the non-metal expands slightly (anion).' },
            { type: 'simulation', simulationId: 'ion-formation' },

            // --- ISOELECTRONIC SERIES ---
            { type: 'header', content: '5. Isoelectronic Series (A-Level Concept)' },
            { type: 'paragraph', content: 'Species are **Isoelectronic** if they have the **same electron configuration**. Even though they have the same electrons, their sizes are different due to the number of protons.' },
            { type: 'paragraph', content: 'Consider the series matching Neon (2.8):' },
            { type: 'list', items: [
                '**N³⁻** (7p, 10e): Large radius (weak pull).',
                '**O²⁻** (8p, 10e)',
                '**F⁻** (9p, 10e)',
                '**Ne** (10p, 10e): Neutral.',
                '**Na⁺** (11p, 10e)',
                '**Mg²⁺** (12p, 10e)',
                '**Al³⁺** (13p, 10e): Smallest radius (strongest nuclear pull).'
            ]},

            // --- CHECKPOINT 5, 6, 7 ---
            { type: 'checkpoint', checkpoint: {
                question: 'Which pair of species is isoelectronic?',
                options: ['Li⁺ and Na⁺', 'Na⁺ and Ne', 'Mg²⁺ and Ar', 'Cl⁻ and F⁻'],
                correctIndex: 1,
                explanation: 'Sodium (2.8.1) loses 1e to become 2.8. Neon is 2.8. They have the exact same electron arrangement.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'In an isoelectronic series (e.g. O²⁻, F⁻, Na⁺, Mg²⁺), which ion is the smallest?',
                options: ['O²⁻', 'F⁻', 'Na⁺', 'Mg²⁺'],
                correctIndex: 3,
                explanation: 'Mg²⁺ has the most protons (12) pulling on the same number of electrons (10). Stronger pull = Smaller radius.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'Why does reactivity increase down Group 1? (e.g. K > Na)',
                options: ['More protons attract electrons better', 'Outer electron is further away and shielded', 'Atoms get smaller', 'More neutrons make it heavy'],
                correctIndex: 1,
                explanation: 'As you go down, atoms get bigger. The outer electron is further from the nucleus and shielded by inner shells, making it easier to lose (Lower Ionization Energy).'
            }},

            // --- THE IONIC BOND ---
            { type: 'header', content: '6. The Ionic Bond Definition' },
            { type: 'paragraph', content: 'Once ions are formed, they attract each other. This is NOT a physical stick connecting two balls. It is a field of force.' },
            { type: 'key-vocab', vocabItems: [
                { term: 'Ionic Bond', definition: 'The strong electrostatic attraction between oppositely charged ions.' },
                { term: 'Lattice', definition: 'A regular repeating arrangement of ions in 3D space.' }
            ]},

            // --- CHECKPOINT 8, 9, 10 ---
            { type: 'checkpoint', checkpoint: {
                question: 'Which phrase best defines an Ionic Bond?',
                options: ['Sharing of electron pairs', 'Attraction between nuclei', 'Strong electrostatic attraction between opposite ions', 'Weak intermolecular forces'],
                correctIndex: 2,
                explanation: 'This is the standard definition you must write in exams. "Electrostatic" means attraction between static charges (+ and -).'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'Magnesium reacts with Chlorine. What is the formula of the product?',
                options: ['MgCl', 'Mg₂Cl', 'MgCl₂', 'Mg₂Cl₂'],
                correctIndex: 2,
                explanation: 'Mg is Group 2 (2+). Cl is Group 7 (1-). You need two Cl⁻ to balance one Mg²⁺.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'Why do ionic compounds have high melting points?',
                options: ['Intermolecular forces are weak', 'Covalent bonds are strong', 'Giant lattice structure with strong electrostatic forces', 'They are metals'],
                correctIndex: 2,
                explanation: 'It takes a lot of energy to break the millions of strong electrostatic bonds in the giant lattice structure.'
            }}
          ]
        },
        {
          id: '5.2a-monoatomic',
          title: '5.2a: Monoatomic Ions & Periodic Trends',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: [
                    '5.2 know the charges of these ions: metals in Groups 1, 2 and 3; non-metals in Groups 5, 6 and 7',
                    'Deduce the charge of an ion from its electronic configuration',
                    'Name simple monoatomic ions'
                ]
            },
            
            { type: 'header', content: 'Predicting Charge from the Periodic Table' },
            { type: 'paragraph', content: 'The Group number tells you the number of outer electrons. This determines how many electrons are lost or gained to achieve a full shell.' },
            
            // Periodic Table Visual
            { type: 'paragraph', content: `
                <div class="overflow-x-auto my-6">
                  <div class="min-w-[600px] grid grid-cols-8 gap-1 text-center font-bold text-xs sm:text-sm">
                    <!-- Charges Header -->
                    <div class="text-blue-600 text-lg mb-2">+1</div>
                    <div class="text-blue-600 text-lg mb-2">+2</div>
                    <div class="text-slate-300 mb-2 italic font-normal text-xs flex items-center justify-center">Transition<br>Metals</div>
                    <div class="text-blue-600 text-lg mb-2">+3</div>
                    <div class="text-slate-400 text-lg mb-2">±4</div>
                    <div class="text-emerald-600 text-lg mb-2">-3</div>
                    <div class="text-emerald-600 text-lg mb-2">-2</div>
                    <div class="text-emerald-600 text-lg mb-2">-1</div>

                    <!-- Group Headers -->
                    <div class="bg-slate-200 py-1">Group 1</div>
                    <div class="bg-slate-200 py-1">Group 2</div>
                    <div class="bg-slate-100 py-1"></div>
                    <div class="bg-slate-200 py-1">Group 3</div>
                    <div class="bg-slate-200 py-1">Group 4</div>
                    <div class="bg-slate-200 py-1">Group 5</div>
                    <div class="bg-slate-200 py-1">Group 6</div>
                    <div class="bg-slate-200 py-1">Group 7</div>

                    <!-- Row 2 -->
                    <div class="bg-blue-100 border border-blue-300 py-2 rounded">Li⁺</div>
                    <div class="bg-blue-100 border border-blue-300 py-2 rounded">Be²⁺</div>
                    <div class="opacity-0"></div>
                    <div class="bg-blue-100 border border-blue-300 py-2 rounded">B³⁺</div>
                    <div class="bg-slate-50 text-slate-400 py-2 rounded">C</div>
                    <div class="bg-emerald-100 border border-emerald-300 py-2 rounded">N³⁻</div>
                    <div class="bg-emerald-100 border border-emerald-300 py-2 rounded">O²⁻</div>
                    <div class="bg-emerald-100 border border-emerald-300 py-2 rounded">F⁻</div>

                    <!-- Row 3 -->
                    <div class="bg-blue-100 border border-blue-300 py-2 rounded">Na⁺</div>
                    <div class="bg-blue-100 border border-blue-300 py-2 rounded">Mg²⁺</div>
                    <div class="opacity-0"></div>
                    <div class="bg-blue-100 border border-blue-300 py-2 rounded">Al³⁺</div>
                    <div class="bg-slate-50 text-slate-400 py-2 rounded">Si</div>
                    <div class="bg-emerald-100 border border-emerald-300 py-2 rounded">P³⁻</div>
                    <div class="bg-emerald-100 border border-emerald-300 py-2 rounded">S²⁻</div>
                    <div class="bg-emerald-100 border border-emerald-300 py-2 rounded">Cl⁻</div>

                     <!-- Row 4 -->
                    <div class="bg-blue-100 border border-blue-300 py-2 rounded">K⁺</div>
                    <div class="bg-blue-100 border border-blue-300 py-2 rounded">Ca²⁺</div>
                    <div class="opacity-0"></div>
                    <div class="bg-blue-100 border border-blue-300 py-2 rounded">Ga³⁺</div>
                    <div class="bg-slate-50 text-slate-400 py-2 rounded">Ge</div>
                    <div class="bg-emerald-100 border border-emerald-300 py-2 rounded">As³⁻</div>
                    <div class="bg-emerald-100 border border-emerald-300 py-2 rounded">Se²⁻</div>
                    <div class="bg-emerald-100 border border-emerald-300 py-2 rounded">Br⁻</div>
                  </div>
                </div>
            `},

            { type: 'header', content: 'Common Simple Ions Reference' },
            { type: 'paragraph', content: 'Memorize the names and charges of these common ions. Notice the naming pattern for anions.' },

            // Common Ions Table
            { type: 'paragraph', content: `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                    <!-- Cations -->
                    <div class="border-2 border-blue-100 rounded-xl overflow-hidden shadow-sm">
                         <div class="bg-blue-50 px-4 py-2 font-black text-blue-800 text-center uppercase text-sm tracking-wide">Cations (+)</div>
                         <table class="w-full text-sm">
                            <tbody class="divide-y divide-blue-50">
                                <tr><td class="p-2 font-mono text-blue-600 font-bold">H⁺</td><td class="p-2">Hydrogen</td></tr>
                                <tr><td class="p-2 font-mono text-blue-600 font-bold">Li⁺</td><td class="p-2">Lithium</td></tr>
                                <tr><td class="p-2 font-mono text-blue-600 font-bold">Na⁺</td><td class="p-2">Sodium</td></tr>
                                <tr><td class="p-2 font-mono text-blue-600 font-bold">K⁺</td><td class="p-2">Potassium</td></tr>
                                <tr><td class="p-2 font-mono text-blue-600 font-bold">Ag⁺</td><td class="p-2">Silver</td></tr>
                                <tr class="bg-blue-50/30"><td class="p-2 font-mono text-blue-600 font-bold">Mg²⁺</td><td class="p-2">Magnesium</td></tr>
                                <tr class="bg-blue-50/30"><td class="p-2 font-mono text-blue-600 font-bold">Ca²⁺</td><td class="p-2">Calcium</td></tr>
                                <tr class="bg-blue-50/30"><td class="p-2 font-mono text-blue-600 font-bold">Ba²⁺</td><td class="p-2">Barium</td></tr>
                                <tr class="bg-blue-50/30"><td class="p-2 font-mono text-blue-600 font-bold">Zn²⁺</td><td class="p-2">Zinc</td></tr>
                                <tr class="bg-blue-50/50"><td class="p-2 font-mono text-blue-600 font-bold">Al³⁺</td><td class="p-2">Aluminum</td></tr>
                            </tbody>
                         </table>
                    </div>
                    
                    <!-- Anions -->
                    <div class="border-2 border-emerald-100 rounded-xl overflow-hidden shadow-sm">
                         <div class="bg-emerald-50 px-4 py-2 font-black text-emerald-800 text-center uppercase text-sm tracking-wide">Anions (-)</div>
                         <table class="w-full text-sm">
                            <tbody class="divide-y divide-emerald-50">
                                <tr><td class="p-2 font-mono text-emerald-600 font-bold">H⁻</td><td class="p-2">Hydride</td></tr>
                                <tr><td class="p-2 font-mono text-emerald-600 font-bold">F⁻</td><td class="p-2 font-bold text-emerald-700">Fluoride</td></tr>
                                <tr><td class="p-2 font-mono text-emerald-600 font-bold">Cl⁻</td><td class="p-2 font-bold text-emerald-700">Chloride</td></tr>
                                <tr><td class="p-2 font-mono text-emerald-600 font-bold">Br⁻</td><td class="p-2 font-bold text-emerald-700">Bromide</td></tr>
                                <tr><td class="p-2 font-mono text-emerald-600 font-bold">I⁻</td><td class="p-2 font-bold text-emerald-700">Iodide</td></tr>
                                <tr class="bg-emerald-50/30"><td class="p-2 font-mono text-emerald-600 font-bold">O²⁻</td><td class="p-2 font-bold text-emerald-700">Oxide</td></tr>
                                <tr class="bg-emerald-50/30"><td class="p-2 font-mono text-emerald-600 font-bold">S²⁻</td><td class="p-2 font-bold text-emerald-700">Sulfide</td></tr>
                                <tr class="bg-emerald-50/50"><td class="p-2 font-mono text-emerald-600 font-bold">N³⁻</td><td class="p-2 font-bold text-emerald-700">Nitride</td></tr>
                                <tr class="bg-emerald-50/50"><td class="p-2 font-mono text-emerald-600 font-bold">P³⁻</td><td class="p-2 font-bold text-emerald-700">Phosphide</td></tr>
                            </tbody>
                         </table>
                    </div>
                </div>
            `},

            { type: 'header', content: 'The Naming Rules' },
            { type: 'list', items: [
                '**Cations (Metals):** Keep the same name as the element. (e.g., Sodium atom → Sodium ion).',
                '**Anions (Non-Metals):** The name changes. Drop the ending and add **-ide**.',
                '**Exceptions:** Hydrogen can be H⁺ (Hydrogen ion) or H⁻ (Hydride ion).'
            ]},

            { type: 'header', content: 'Interactive: Ionic Balancer' },
            { type: 'paragraph', content: 'Test your knowledge by balancing charges to create neutral compounds.' },
            { type: 'simulation', simulationId: 'ionic-master' },

            // Checkpoints
            { type: 'header', content: 'Knowledge Check' },
            { type: 'checkpoint', checkpoint: {
                question: 'Which Group 1 element forms a +1 ion used in nerve impulses?',
                options: ['Sodium (Na)', 'Magnesium (Mg)', 'Chlorine (Cl)', 'Neon (Ne)'],
                correctIndex: 0,
                explanation: 'Sodium (Na) is in Group 1 and forms Na⁺. It is crucial for nerve function.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'What is the correct name for the ion N³⁻?',
                options: ['Nitrogen ion', 'Nitrate', 'Nitride', 'Nitrite'],
                correctIndex: 2,
                explanation: 'Monoatomic anions end in "-ide". Nitrogen becomes Nitride. (Nitrate/Nitrite are polyatomic oxyanions).'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'An ion has a charge of 2- and is in Period 3. What is it?',
                options: ['Oxide', 'Sulfide', 'Chloride', 'Magnesium'],
                correctIndex: 1,
                explanation: 'Period 3, Group 6 is Sulfur. It gains 2 electrons to become Sulfide (S²⁻).'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: 'What is the formula for the Calcium ion?',
                acceptedAnswers: ['Ca2+', 'Ca+2'],
                explanation: 'Calcium is in Group 2, so it loses 2 electrons to form Ca²⁺.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: 'What is the name of the ion H⁻?',
                acceptedAnswers: ['Hydride'],
                explanation: 'When Hydrogen gains an electron (acting like a halogen), it is called Hydride.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'Which element forms a +3 ion with the same electron configuration as Neon?',
                options: ['Boron', 'Aluminum', 'Nitrogen', 'Sodium'],
                correctIndex: 1,
                explanation: 'Aluminum (Al) is atomic number 13. Losing 3 electrons leaves 10 electrons, which matches Neon.'
            }}
          ]
        },
        {
          id: '5.4-dot-cross-ionic',
          title: '5.4: Dot-and-Cross Diagrams',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: ['5.4 draw dot-and-cross diagrams to show the formation of ionic compounds by electron transfer, limited to combinations of elements from Groups 1, 2, 3 and 5, 6, 7']
            },
            { type: 'key-vocab', vocabItems: [
                { term: 'Dot-and-Cross', definition: 'A diagram that shows the transfer of electrons from metal atoms (dots) to non-metal atoms (crosses).' },
                { term: 'Ratio', definition: 'The proportion of ions needed to balance charges (e.g., 1:2 in MgCl₂).' },
                { term: 'Valence Electron', definition: 'An electron in the outermost shell of an atom.' }
            ]},
            { type: 'header', content: 'Why do we need diagrams?' },
            { type: 'paragraph', content: 'Chemical formulas like NaCl or MgCl₂ tell us the ratio of atoms, but they don\'t show **how** the bond formed. Dot-and-cross diagrams visualize the movement of electrons to create stable ions.' },
            
            { type: 'simulation', simulationId: 'ionic-bonding' },

            { type: 'header', content: 'Scenario 1: The 1:1 Ratio (NaCl)' },
            { type: 'list', items: [
                '**Metal:** Sodium (2.8.1) wants to lose 1 electron.',
                '**Non-Metal:** Chlorine (2.8.7) wants to gain 1 electron.',
                '**Result:** Perfect match! One Na gives to one Cl.',
                '**Formula:** NaCl'
            ]},

            { type: 'header', content: 'Scenario 2: The 1:2 Ratio (MgCl₂)' },
            { type: 'paragraph', content: 'Sometimes a single non-metal atom cannot accept all the electrons a metal needs to lose.' },
            { type: 'list', items: [
                '**Metal:** Magnesium (2.8.2) needs to lose **2 electrons**.',
                '**Non-Metal:** Chlorine (2.8.7) can only accept **1 electron**.',
                '**Solution:** Magnesium gives one electron to the first Chlorine, and the second electron to a **second** Chlorine.',
                '**Ratio:** 1 Magnesium : 2 Chlorines.',
                '**Formula:** MgCl₂'
            ]},

            { type: 'header', content: 'Scenario 3: The 2:1 Ratio (Na₂O)' },
            { type: 'paragraph', content: 'Sometimes the non-metal needs more electrons than a single metal atom can provide.' },
            { type: 'list', items: [
                '**Non-Metal:** Oxygen (2.6) needs to gain **2 electrons**.',
                '**Metal:** Sodium (2.8.1) can only give **1 electron**.',
                '**Solution:** Two Sodium atoms are needed. Each gives one electron to the same Oxygen atom.',
                '**Ratio:** 2 Sodiums : 1 Oxygen.',
                '**Formula:** Na₂O'
            ]},

            { type: 'checkpoint', checkpoint: {
                question: 'In Magnesium Chloride, why do we need two Chlorine atoms?',
                options: [
                    'Magnesium has 2 electrons to lose, but Chlorine can only take 1',
                    'Chlorine is a gas',
                    'Magnesium is larger than Chlorine',
                    'To make the mass equal'
                ],
                correctIndex: 0,
                explanation: 'Magnesium (Group 2) loses 2e-. Chlorine (Group 7) only needs 1e-. Therefore, two chlorines are required to accept both electrons.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'What is the ratio of ions in Aluminum Oxide (Al₂O₃)?',
                options: ['1:1', '1:2', '2:3', '3:2'],
                correctIndex: 2,
                explanation: 'Aluminum loses 3e-. Oxygen gains 2e-. The lowest common multiple of 2 and 3 is 6. So we need 2 Al (2x3=6) and 3 O (3x2=6).'
            }},
            { type: 'exam-hint', content: 'When drawing these diagrams in an exam: 1. Draw outer shells only. 2. Use different symbols (dots vs crosses) for different elements. 3. Show the charge on the final ions clearly.' }
          ]
        },
        {
          id: '5.5-ionic-bond-def',
          title: '5.5: The Ionic Bond',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: ['5.5 understand ionic bonding in terms of electrostatic attractions']
            },
            { type: 'paragraph', content: 'The definition of an ionic bond is precise.' },
            { type: 'key-vocab', vocabItems: [
                { term: 'Ionic Bond', definition: 'The strong electrostatic attraction between oppositely charged ions.' }
            ]},
            { type: 'checkpoint', checkpoint: {
                question: 'What forces hold ionic compounds together?',
                options: ['Magnetic forces', 'Electrostatic forces', 'Gravitational forces', 'Intermolecular forces'],
                correctIndex: 1,
                explanation: 'Electrostatic forces act between positive and negative charges.'
            }}
          ]
        },
        {
          id: '5.6-giant-lattices',
          title: '5.6: Giant Ionic Lattices',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: ['5.6 understand why compounds with giant ionic lattices have high melting and boiling points']
            },
            { type: 'paragraph', content: 'Ionic compounds form giant 3D lattice structures. Every positive ion is surrounded by negative ions, and vice versa.' },
            { type: 'list', items: [
                'There are **many strong electrostatic bonds** in all directions.',
                'A **large amount of energy** is required to overcome these forces.',
                'Therefore, they have **high melting and boiling points**.'
            ]},
            { type: 'checkpoint', checkpoint: {
                question: 'Which compound would have the highest melting point?',
                options: ['NaCl (+1/-1)', 'MgO (+2/-2)', 'KBr (+1/-1)', 'LiF (+1/-1)'],
                correctIndex: 1,
                explanation: 'MgO has ions with 2+ and 2- charges. The electrostatic attraction is stronger than in 1+/1- compounds, so more energy is needed to break the lattice.'
            }}
          ]
        },
        {
          id: '5.7-ionic-conductivity',
          title: '5.7: Electrical Conductivity (Ionic)',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: ['5.7 know that ionic compounds do not conduct electricity when solid, but do conduct electricity when molten and in aqueous solution']
            },
            { type: 'list', items: [
                '**Solid:** Ions are fixed in position in the lattice. They cannot move. No conductivity.',
                '**Molten (Liquid) or Aqueous (Dissolved):** The lattice breaks down. Ions are free to move and carry the electric charge. Conducts electricity.'
            ]},
            { type: 'checkpoint', checkpoint: {
                question: 'Why does solid Sodium Chloride NOT conduct electricity?',
                options: ['It has no electrons', 'The ions are not free to move', 'It is a metal', 'It has no charge'],
                correctIndex: 1,
                explanation: 'Charged particles (ions) must be mobile to conduct electricity. In a solid, they are locked in place.'
            }}
          ]
        }
      ]
    },
    // ... Rest of the unit remains unchanged ...
    {
      id: 'topic-5g',
      title: '5(g) Covalent Bonding',
      lessons: [
        {
          id: '5.8-covalent-def',
          title: '5.8: The Covalent Bond',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: ['5.8 know that a covalent bond is formed between atoms by the sharing of a pair of electrons']
            },
            { type: 'paragraph', content: 'Covalent bonding occurs between **non-metal** atoms. They share pairs of electrons to achieve a full outer shell.' }
          ]
        },
        // ... (truncated for brevity, ensuring rest of file structure is maintained if I were outputting the whole file, but I will just output the changed part or the whole file if easier)
        {
          id: '5.9-covalent-electrostatic',
          title: '5.9: Electrostatic Attraction',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: ['5.9 understand covalent bonds in terms of electrostatic attractions']
            },
            { type: 'paragraph', content: 'Even though they share electrons, there is still an attraction involved.' },
            { type: 'key-vocab', vocabItems: [
                { term: 'Covalent Attraction', definition: 'The strong electrostatic attraction between the shared pair of electrons (negative) and the nuclei (positive) of the bonded atoms.' }
            ]}
          ]
        },
        {
          id: '5.10-dot-cross-covalent',
          title: '5.10: Dot-and-Cross (Covalent)',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: ['5.10 understand how to use dot-and-cross diagrams to represent covalent bonds']
            },
            { type: 'paragraph', content: 'You must be able to draw diagrams for:' },
            { type: 'list', items: [
                '**Diatomic molecules:** H₂, Cl₂, O₂, N₂, HCl',
                '**Inorganic molecules:** H₂O, NH₃, CO₂',
                '**Organic molecules:** CH₄, C₂H₆, C₂H₄'
            ]},
            { type: 'paragraph', content: 'Note: C₂H₄ (Ethene) contains a double bond (two pairs shared), and CO₂ contains two double bonds.' }
          ]
        },
        {
          id: '5.11-simple-molecular',
          title: '5.11: Simple Molecular Structures',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: ['5.11 explain why substances with simple molecular structures are gases or liquids, or solids with low melting and boiling points']
            },
            { type: 'paragraph', content: 'Substances like water (H₂O) or carbon dioxide (CO₂) are made of separate small molecules.' },
            { type: 'paragraph', content: 'The **covalent bonds** within the molecule are strong, but the **intermolecular forces** between the molecules are weak.' },
            { type: 'paragraph', content: 'It takes very little energy to overcome these weak forces, so they have low melting and boiling points.' }
          ]
        },
        {
          id: '5.12-mr-trend',
          title: '5.12: Melting Points & Mr',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: ['5.12 explain why the melting and boiling points of substances with simple molecular structures increase, in general, with increasing relative molecular mass']
            },
            { type: 'paragraph', content: 'As molecules get larger (higher relative molecular mass, Mr), the intermolecular forces between them get stronger.' },
            { type: 'paragraph', content: 'Example: Boiling points of Halogens increase down the group (F₂ < Cl₂ < Br₂ < I₂) because the molecules get heavier and larger, creating stronger forces of attraction between them.' }
          ]
        },
        {
          id: '5.13-giant-covalent',
          title: '5.13: Giant Covalent Structures',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: ['5.13 explain why substances with giant covalent structures are solids with high melting and boiling points']
            },
            { type: 'paragraph', content: 'Some covalent substances do not form small molecules but giant lattices. Examples: Diamond, Graphite, Silicon Dioxide (Sand).' },
            { type: 'paragraph', content: 'To melt these, you must break **many strong covalent bonds** (not just weak forces). This requires huge amounts of energy.' }
          ]
        },
        {
          id: '5.14-allotropes',
          title: '5.14: Diamond, Graphite & C60',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: ['5.14 explain how the structures of diamond, graphite and C60 fullerene influence their physical properties, including electrical conductivity and hardness']
            },
            { type: 'header', content: 'Diamond' },
            { type: 'list', items: [
                'Each Carbon bonded to 4 others.',
                'Tetrahedral structure.',
                'Very hard (drill tips).',
                'Does not conduct electricity (no free electrons).'
            ]},
            { type: 'header', content: 'Graphite' },
            { type: 'list', items: [
                'Each Carbon bonded to 3 others.',
                'Layers of hexagons.',
                'Soft/Slippery (layers slide - lubricant).',
                'Conducts electricity (one delocalised electron per atom).'
            ]},
            { type: 'header', content: 'C60 Fullerene' },
            { type: 'list', items: [
                'Simple molecular structure (not giant).',
                'Hollow sphere of 60 carbons.',
                'Lower melting point than diamond/graphite (weak intermolecular forces).'
            ]}
          ]
        },
        {
          id: '5.15-covalent-conductivity',
          title: '5.15: Conductivity',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: ['5.15 know that covalent compounds do not usually conduct electricity']
            },
            { type: 'paragraph', content: 'Most covalent compounds do not conduct electricity because they have no charged particles (ions) and no delocalised electrons that are free to move.' },
            { type: 'paragraph', content: 'Graphite is a notable exception.' }
          ]
        }
      ]
    },
    {
      id: 'topic-5h',
      title: '5(h) Metallic Bonding',
      lessons: [
        {
          id: '5.16c-metallic-lattice',
          title: '5.16C: Metallic Lattice 2D',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: ['5.16C know how to represent a metallic lattice by a 2-D diagram']
            },
            { type: 'paragraph', content: 'You should be able to draw a regular arrangement of circles (positive ions) touching each other, with small dots or e- symbols (electrons) moving between them.' }
          ]
        },
        {
          id: '5.17c-metallic-bonding',
          title: '5.17C: Metallic Bonding',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: ['5.17C understand metallic bonding in terms of electrostatic attractions']
            },
            { type: 'key-vocab', vocabItems: [
                { term: 'Metallic Bond', definition: 'The strong electrostatic attraction between positive metal ions and a sea of delocalised electrons.' }
            ]}
          ]
        },
        {
          id: '5.18c-metal-properties',
          title: '5.18C: Properties of Metals',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: ['5.18C explain typical physical properties of metals, including electrical conductivity and malleability']
            },
            { type: 'list', items: [
                '**Electrical Conductivity:** The delocalised electrons are free to move throughout the structure and carry charge.',
                '**Malleability:** The layers of positive ions can slide over each other. The delocalised electrons move with the layers, maintaining the bond so it doesn\'t break.'
            ]}
          ]
        }
      ]
    },
    {
      id: 'topic-5i',
      title: '5(i) Electrolysis',
      lessons: [
        {
          id: '5.19c-covalent-no-conduct',
          title: '5.19C: Covalent Conductivity',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: ['5.19C understand why covalent compounds do not conduct electricity']
            },
            { type: 'paragraph', content: 'Covalent compounds consist of neutral molecules. They do not contain charged particles (ions or electrons) that are free to move.' }
          ]
        },
        {
          id: '5.20c-ionic-conductivity',
          title: '5.20C: Ionic Conductivity',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: ['5.20C understand why ionic compounds conduct electricity only when molten or in aqueous solution']
            },
            { type: 'paragraph', content: 'In a solid, ions are locked in a lattice. In liquid form (molten or dissolved), the lattice is broken, and ions are free to move to the electrodes.' }
          ]
        },
        {
          id: '5.21c-anion-cation',
          title: '5.21C: Anions and Cations',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: ['5.21C know that anion and cation are terms used to refer to negative and positive ions respectively']
            },
            { type: 'list', items: [
                '**PANIC:** Positive Anode Negative Is Cathode.',
                '**Cation:** Positive ion (attracted to Cathode).',
                '**Anion:** Negative ion (attracted to Anode).'
            ]}
          ]
        },
        {
          id: '5.22c-experiments',
          title: '5.22C: Electrolysis Experiments',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: ['5.22C describe experiments to investigate electrolysis, using inert electrodes, of molten compounds and aqueous solutions']
            },
            { type: 'header', content: 'Molten Lead(II) Bromide' },
            { type: 'list', items: [
                '**Cathode (-):** Lead metal (Pb).',
                '**Anode (+):** Bromine gas (Br₂).'
            ]},
            { type: 'header', content: 'Aqueous Solutions (Rules)' },
            { type: 'list', items: [
                '**Cathode:** Hydrogen gas forms UNLESS Copper, Silver, or Gold is present.',
                '**Anode:** Halogen (Cl₂, Br₂, I₂) forms if halide ions are concentrated. Otherwise Oxygen forms (from OH⁻).'
            ]}
          ]
        },
        {
          id: '5.23c-half-equations',
          title: '5.23C: Half-Equations',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: ['5.23C write ionic half-equations representing the reactions at the electrodes and understand why these reactions are classified as oxidation or reduction']
            },
            { type: 'paragraph', content: '**OIL RIG:** Oxidation Is Loss of electrons, Reduction Is Gain.' },
            { type: 'list', items: [
                '**Cathode (Reduction):** Positive ions gain electrons. e.g., Pb²⁺ + 2e⁻ → Pb',
                '**Anode (Oxidation):** Negative ions lose electrons. e.g., 2Br⁻ → Br₂ + 2e⁻'
            ]}
          ]
        },
        {
          id: '5.24c-practical',
          title: '5.24C: Practical',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: ['5.24C practical: investigate the electrolysis of aqueous solutions']
            },
            { type: 'practical', content: 'Electrolysis of Copper Sulfate', items: [
                '**Graphite Electrodes:** Cathode gains copper coating (pink/brown). Anode produces Oxygen bubbles.',
                '**Copper Electrodes:** Mass of Anode decreases (Cu → Cu²⁺ + 2e⁻). Mass of Cathode increases (Cu²⁺ + 2e⁻ → Cu). Solution stays blue.'
            ]}
          ]
        }
      ]
    }
  ]
};
