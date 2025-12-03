
import { Unit } from './types';

export const IGCSE_UNIT_5: Unit = {
  id: 'igcse-topic-5',
  title: 'Unit 2: Principles of Chemistry (Part 2)',
  description: 'Advanced bonding concepts including Ionic, Covalent, and Metallic bonding and Electrolysis. (Spec Section 5)',
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
            { type: 'paragraph', content: 'Once ions are formed, they attract each other. This is NOT a physical stick connecting two ions. It is a field of force.' },
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
          id: '5.2b-transition',
          title: '5.2b: Transition Metals & Variable Charges',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: ['5.2 know the charges of these ions: Ag⁺, Cu²⁺, Fe²⁺, Fe³⁺, Pb²⁺, Zn²⁺']
            },
            { type: 'paragraph', content: 'Transition metals (the middle block) can form ions with different charges. We use **Roman Numerals** in the name to specify the charge (Systematic Name). Historically, special suffixes like **-ous** (lower charge) and **-ic** (higher charge) were used.' },
            
            { type: 'header', content: 'Variable Valency Table' },
            { type: 'paragraph', content: `
                <div class="overflow-x-auto my-6 border-2 border-indigo-100 rounded-xl shadow-sm">
                  <table class="w-full text-sm text-left border-collapse">
                    <thead class="bg-indigo-50 text-indigo-900 font-black uppercase text-xs tracking-wider">
                      <tr>
                        <th class="p-3 border-b border-indigo-100">Metal</th>
                        <th class="p-3 border-b border-indigo-100 text-center">Ion</th>
                        <th class="p-3 border-b border-indigo-100">Systematic Name</th>
                        <th class="p-3 border-b border-indigo-100 text-rose-600">Traditional Name</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white">
                      <tr class="hover:bg-slate-50"><td class="p-3 font-bold text-slate-700 border-b border-slate-100">Chromium</td><td class="p-3 text-center border-b border-slate-100"><div class="font-mono text-blue-600">Cr²⁺</div><div class="font-mono text-emerald-600">Cr³⁺</div></td><td class="p-3 border-b border-slate-100">Chromium(II)<br>Chromium(III)</td><td class="p-3 border-b border-slate-100 text-slate-500 font-serif">Chrom<strong class="text-rose-500">ous</strong><br>Chrom<strong class="text-rose-500">ic</strong></td></tr>
                      <tr class="hover:bg-slate-50"><td class="p-3 font-bold text-slate-700 border-b border-slate-100">Iron</td><td class="p-3 text-center border-b border-slate-100"><div class="font-mono text-blue-600">Fe²⁺</div><div class="font-mono text-emerald-600">Fe³⁺</div></td><td class="p-3 border-b border-slate-100">Iron(II)<br>Iron(III)</td><td class="p-3 border-b border-slate-100 text-slate-500 font-serif">Ferr<strong class="text-rose-500">ous</strong><br>Ferr<strong class="text-rose-500">ic</strong></td></tr>
                      <tr class="hover:bg-slate-50"><td class="p-3 font-bold text-slate-700 border-b border-slate-100">Cobalt</td><td class="p-3 text-center border-b border-slate-100"><div class="font-mono text-blue-600">Co²⁺</div><div class="font-mono text-emerald-600">Co³⁺</div></td><td class="p-3 border-b border-slate-100">Cobalt(II)<br>Cobalt(III)</td><td class="p-3 border-b border-slate-100 text-slate-500 font-serif">Cobalt<strong class="text-rose-500">ous</strong><br>Cobalt<strong class="text-rose-500">ic</strong></td></tr>
                      <tr class="hover:bg-slate-50"><td class="p-3 font-bold text-slate-700 border-b border-slate-100">Copper</td><td class="p-3 text-center border-b border-slate-100"><div class="font-mono text-blue-600">Cu⁺</div><div class="font-mono text-emerald-600">Cu²⁺</div></td><td class="p-3 border-b border-slate-100">Copper(I)<br>Copper(II)</td><td class="p-3 border-b border-slate-100 text-slate-500 font-serif">Cupr<strong class="text-rose-500">ous</strong><br>Cupr<strong class="text-rose-500">ic</strong></td></tr>
                      <tr class="hover:bg-slate-50"><td class="p-3 font-bold text-slate-700 border-b border-slate-100">Tin</td><td class="p-3 text-center border-b border-slate-100"><div class="font-mono text-blue-600">Sn²⁺</div><div class="font-mono text-emerald-600">Sn⁴⁺</div></td><td class="p-3 border-b border-slate-100">Tin(II)<br>Tin(IV)</td><td class="p-3 border-b border-slate-100 text-slate-500 font-serif">Stann<strong class="text-rose-500">ous</strong><br>Stann<strong class="text-rose-500">ic</strong></td></tr>
                      <tr class="hover:bg-slate-50"><td class="p-3 font-bold text-slate-700 border-b border-slate-100">Mercury</td><td class="p-3 text-center border-b border-slate-100"><div class="font-mono text-blue-600">Hg₂²⁺</div><div class="font-mono text-emerald-600">Hg²⁺</div></td><td class="p-3 border-b border-slate-100">Mercury(I)<br>Mercury(II)</td><td class="p-3 border-b border-slate-100 text-slate-500 font-serif">Mercur<strong class="text-rose-500">ous</strong><br>Mercur<strong class="text-rose-500">ic</strong></td></tr>
                      <tr class="hover:bg-slate-50"><td class="p-3 font-bold text-slate-700">Lead</td><td class="p-3 text-center"><div class="font-mono text-blue-600">Pb²⁺</div><div class="font-mono text-emerald-600">Pb⁴⁺</div></td><td class="p-3">Lead(II)<br>Lead(IV)</td><td class="p-3 text-slate-500 font-serif">Plumb<strong class="text-rose-500">ous</strong><br>Plumb<strong class="text-rose-500">ic</strong></td></tr>
                    </tbody>
                  </table>
                </div>
            `},

            { type: 'exam-hint', content: '**Traditional Naming Rule:** The suffix **-ous** is used for the ion with the **lower** charge (e.g., Ferrous Fe²⁺), while **-ic** is used for the **higher** charge (e.g., Ferric Fe³⁺).' },

            { type: 'header', content: 'The Exceptions' },
            { type: 'paragraph', content: 'Two metals you must memorize do NOT use Roman numerals because they generally only have one stable ion:' },
            { type: 'key-vocab', vocabItems: [
                { term: 'Zinc', definition: 'Always forms Zn²⁺' },
                { term: 'Silver', definition: 'Always forms Ag⁺' }
            ]},
            
            // --- NEW CHECKPOINTS ---
            { type: 'header', content: 'Naming Knowledge Check' },
            
            { type: 'checkpoint', checkpoint: {
                question: 'What does the Roman numeral in Iron(III) represent?',
                options: ['The mass number', 'The number of atoms', 'The charge of the ion (+3)', 'The period number'],
                correctIndex: 2,
                explanation: 'The Roman numeral indicates the positive charge of the transition metal ion.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'Which of these ions is also known as the "Cuprous" ion?',
                options: ['Cu⁺', 'Cu²⁺', 'Co²⁺', 'Cr³⁺'],
                correctIndex: 0,
                explanation: 'Cuprous uses the -ous suffix, indicating the lower charge for Copper, which is +1.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'What is the correct systematic name for Sn⁴⁺?',
                options: ['Tin(II)', 'Tin(IV)', 'Stannous', 'Stannic'],
                correctIndex: 1,
                explanation: 'Sn is Tin. The charge is 4+, so the systematic name uses Roman numeral IV.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'Which suffix indicates the HIGHER charge in the traditional naming system?',
                options: ['-ous', '-ic', '-ate', '-ide'],
                correctIndex: 1,
                explanation: '-ic is for the higher charge (e.g., Ferric), while -ous is for the lower charge (e.g., Ferrous).'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'What is the formula for the Mercury(I) ion?',
                options: ['Hg⁺', 'Hg²⁺', 'Hg₂²⁺', 'Hg₂⁺'],
                correctIndex: 2,
                explanation: 'Mercury(I) is unique; it exists as a diatomic ion Hg₂²⁺ (a pair of mercury atoms with a total +2 charge).'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'Which transition metal ion typically does NOT use a Roman numeral?',
                options: ['Iron', 'Copper', 'Zinc', 'Lead'],
                correctIndex: 2,
                explanation: 'Zinc almost always forms the Zn²⁺ ion, so Roman numerals are not usually required.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'The traditional name "Plumbous" refers to which ion?',
                options: ['Pb²⁺', 'Pb⁴⁺', 'Pt²⁺', 'Po²⁺'],
                correctIndex: 0,
                explanation: 'Plumbous refers to Lead (Plumbum) with the lower charge (+2).'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'What is the charge of the Cobalt ion in Cobalt(III) chloride?',
                options: ['+1', '+2', '+3', '-3'],
                correctIndex: 2,
                explanation: 'The Roman numeral (III) explicitly states the charge is +3.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'Which ion corresponds to the traditional name "Stannous"?',
                options: ['Sn²⁺', 'Sn⁴⁺', 'Sb³⁺', 'Sr²⁺'],
                correctIndex: 0,
                explanation: 'Stannous refers to Tin (Stannum) with the lower charge (+2).'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'What is the traditional name for Copper(II)?',
                options: ['Cuprous', 'Cupric', 'Cobaltous', 'Chromic'],
                correctIndex: 1,
                explanation: 'Copper(II) is the higher charge state for Copper, so it uses the -ic suffix (Cupric).'
            }}
          ]
        },
        {
          id: '5.2c-polyatomic',
          title: '5.2c: Polyatomic Ions & Naming Rules',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: [
                    '5.2 know the charges of H⁺, OH⁻, NH₄⁺, CO₃²⁻, NO₃⁻, SO₄²⁻',
                    'Understand the patterns in naming oxyanions (-ate vs -ite)'
                ]
            },
            { type: 'header', content: 'What is a Polyatomic Ion?' },
            { type: 'paragraph', content: 'A **Polyatomic Ion** (or "Molecular Ion") is a group of atoms covalently bonded together that behaves like a single unit with an overall charge. Think of them as a "team" of atoms.' },
            
            { type: 'header', content: 'The Professional\'s List' },
            { type: 'paragraph', content: 'While IGCSE focuses on a few key ions, Engineers, Doctors, and Chemists encounter many more. Mastering this list gives you a significant advantage.' },
            
            { type: 'paragraph', content: `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
                    <!-- -1 Charge -->
                    <div class="border-2 border-purple-200 rounded-xl overflow-hidden shadow-sm">
                        <div class="bg-purple-100 px-4 py-2 font-black text-purple-800 text-center uppercase text-sm tracking-wide">Charge -1</div>
                        <table class="w-full text-sm">
                            <tbody class="divide-y divide-purple-50">
                                <tr><td class="px-3 py-1 font-bold text-slate-700">Hydroxide</td><td class="px-3 py-1 text-right font-mono text-purple-600">OH⁻</td></tr>
                                <tr><td class="px-3 py-1 font-bold text-slate-700">Nitrate</td><td class="px-3 py-1 text-right font-mono text-purple-600">NO₃⁻</td></tr>
                                <tr><td class="px-3 py-1 font-bold text-slate-700">Nitrite</td><td class="px-3 py-1 text-right font-mono text-purple-600">NO₂⁻</td></tr>
                                <tr><td class="px-3 py-1 font-bold text-slate-700">Cyanide</td><td class="px-3 py-1 text-right font-mono text-purple-600">CN⁻</td></tr>
                                <tr><td class="px-3 py-1 font-bold text-slate-700">Permanganate</td><td class="px-3 py-1 text-right font-mono text-purple-600">MnO₄⁻</td></tr>
                                <tr><td class="px-3 py-1 font-bold text-slate-700">Acetate</td><td class="px-3 py-1 text-right font-mono text-purple-600">C₂H₃O₂⁻</td></tr>
                                <tr><td class="px-3 py-1 font-bold text-slate-700">Bicarbonate</td><td class="px-3 py-1 text-right font-mono text-purple-600">HCO₃⁻</td></tr>
                                <tr><td class="px-3 py-1 font-bold text-slate-700">Chlorate</td><td class="px-3 py-1 text-right font-mono text-purple-600">ClO₃⁻</td></tr>
                                <tr><td class="px-3 py-1 font-bold text-slate-700">Perchlorate</td><td class="px-3 py-1 text-right font-mono text-purple-600">ClO₄⁻</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- -2 Charge -->
                    <div class="border-2 border-orange-200 rounded-xl overflow-hidden shadow-sm">
                        <div class="bg-orange-100 px-4 py-2 font-black text-orange-800 text-center uppercase text-sm tracking-wide">Charge -2</div>
                        <table class="w-full text-sm">
                            <tbody class="divide-y divide-orange-50">
                                <tr><td class="px-3 py-1 font-bold text-slate-700">Carbonate</td><td class="px-3 py-1 text-right font-mono text-orange-600">CO₃²⁻</td></tr>
                                <tr><td class="px-3 py-1 font-bold text-slate-700">Sulfate</td><td class="px-3 py-1 text-right font-mono text-orange-600">SO₄²⁻</td></tr>
                                <tr><td class="px-3 py-1 font-bold text-slate-700">Sulfite</td><td class="px-3 py-1 text-right font-mono text-orange-600">SO₃²⁻</td></tr>
                                <tr><td class="px-3 py-1 font-bold text-slate-700">Chromate</td><td class="px-3 py-1 text-right font-mono text-orange-600">CrO₄²⁻</td></tr>
                                <tr><td class="px-3 py-1 font-bold text-slate-700">Dichromate</td><td class="px-3 py-1 text-right font-mono text-orange-600">Cr₂O₇²⁻</td></tr>
                                <tr><td class="px-3 py-1 font-bold text-slate-700">Oxalate</td><td class="px-3 py-1 text-right font-mono text-orange-600">C₂O₄²⁻</td></tr>
                                <tr><td class="px-3 py-1 font-bold text-slate-700">Peroxide</td><td class="px-3 py-1 text-right font-mono text-orange-600">O₂²⁻</td></tr>
                                <tr><td class="px-3 py-1 font-bold text-slate-700">Thiosulfate</td><td class="px-3 py-1 text-right font-mono text-orange-600">S₂O₃²⁻</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- -3 Charge -->
                    <div class="border-2 border-yellow-200 rounded-xl overflow-hidden shadow-sm">
                        <div class="bg-yellow-100 px-4 py-2 font-black text-yellow-800 text-center uppercase text-sm tracking-wide">Charge -3</div>
                        <table class="w-full text-sm">
                            <tbody class="divide-y divide-yellow-50">
                                <tr><td class="px-3 py-1 font-bold text-slate-700">Phosphate</td><td class="px-3 py-1 text-right font-mono text-yellow-600">PO₄³⁻</td></tr>
                                <tr><td class="px-3 py-1 font-bold text-slate-700">Phosphite</td><td class="px-3 py-1 text-right font-mono text-yellow-600">PO₃³⁻</td></tr>
                                <tr><td class="px-3 py-1 font-bold text-slate-700">Arsenate</td><td class="px-3 py-1 text-right font-mono text-yellow-600">AsO₄³⁻</td></tr>
                                <tr><td class="px-3 py-1 font-bold text-slate-700">Borate</td><td class="px-3 py-1 text-right font-mono text-yellow-600">BO₃³⁻</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- +1 Charge -->
                    <div class="border-2 border-emerald-200 rounded-xl overflow-hidden shadow-sm h-min">
                        <div class="bg-emerald-100 px-4 py-2 font-black text-emerald-800 text-center uppercase text-sm tracking-wide">Charge +1</div>
                        <table class="w-full text-sm">
                            <tbody class="divide-y divide-emerald-50">
                                <tr><td class="px-3 py-1 font-bold text-slate-700">Ammonium</td><td class="px-3 py-1 text-right font-mono text-emerald-600">NH₄⁺</td></tr>
                                <tr><td class="px-3 py-1 font-bold text-slate-700">Hydronium</td><td class="px-3 py-1 text-right font-mono text-emerald-600">H₃O⁺</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `},

            { type: 'header', content: 'Interactive: The Oxyanion Constructor' },
            { type: 'paragraph', content: 'Many polyatomic ions contain Oxygen. These are called **Oxyanions**. There is a systematic way to name them based on the number of oxygen atoms. Use the tool below to explore the patterns.' },
            
            { type: 'simulation', simulationId: 'oxyanion-builder' },

            { type: 'header', content: 'Decoding the Naming System' },
            { type: 'paragraph', content: 'The ending of the name tells you about the oxygen content relative to the "standard" ion.' },
            
            { type: 'list', items: [
                '**-ate:** The standard, most common form (e.g., Chlorate, Nitrate, Sulfate).',
                '**-ite:** Has **one less oxygen** than the "-ate" form. The charge stays the same.',
                '**hypo-...-ite:** Has **two less oxygens**.',
                '**per-...-ate:** Has **one extra oxygen**.'
            ]},

            { type: 'exam-hint', content: '**Top Tip:** If you memorize the "-ate" form (e.g. Sulfate SO₄²⁻), you can figure out the others. Sulfite must be SO₃²⁻.' },

            { type: 'header', content: 'Advanced Checkpoint: Master the List' },

            { type: 'checkpoint', checkpoint: {
                question: 'What is the formula for the Permanganate ion?',
                options: ['MnO₂⁻', 'MnO₄⁻', 'MgO₄⁻', 'PMg⁻'],
                correctIndex: 1,
                explanation: 'Permanganate is MnO₄ with a -1 charge. It is a strong oxidizing agent often used in titrations (purple color).'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'The Dichromate ion (Cr₂O₇) has what charge?',
                options: ['-1', '-2', '-3', '+2'],
                correctIndex: 1,
                explanation: 'Dichromate is Cr₂O₇²⁻. It is orange in color.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'Which ion has the formula C₂H₃O₂⁻?',
                options: ['Carbonate', 'Oxalate', 'Acetate', 'Cyanide'],
                correctIndex: 2,
                explanation: 'Acetate (found in vinegar) is C₂H₃O₂⁻ (sometimes written CH₃COO⁻).'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'What is the correct formula for Sodium Hypochlorite (Bleach)?',
                options: ['NaClO', 'NaClO₂', 'NaClO₃', 'NaClO₄'],
                correctIndex: 0,
                explanation: 'Chlorate is ClO₃⁻. Hypochlorite has 2 less oxygens: ClO⁻. So Sodium Hypochlorite is NaClO.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: 'What is the charge of the Phosphate ion?',
                acceptedAnswers: ['-3', '3-', '3'],
                explanation: 'Phosphate is PO₄³⁻. It is in the yellow "-3" group.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'Which of these is the only common positive polyatomic ion?',
                options: ['Nitrate', 'Ammonium', 'Sulfate', 'Hydroxide'],
                correctIndex: 1,
                explanation: 'Ammonium (NH₄⁺) is positive. Most other polyatomics are negative anions.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'Bromate is BrO₃⁻. What is the formula for Perbromate?',
                options: ['BrO₄⁻', 'BrO₂⁻', 'BrO⁻', 'Br⁻'],
                correctIndex: 0,
                explanation: '"Per...ate" means one extra oxygen than the standard "-ate". 3 + 1 = 4.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'What is the formula for the Cyanide ion?',
                options: ['Cy⁻', 'CN⁻', 'CNO⁻', 'SCN⁻'],
                correctIndex: 1,
                explanation: 'Cyanide consists of Carbon and Nitrogen: CN⁻.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'What distinguishes Sulfite from Sulfate?',
                options: ['Charge', 'Number of Sulfurs', 'Number of Oxygens', 'State of matter'],
                correctIndex: 2,
                explanation: 'Sulfate is SO₄²⁻. Sulfite is SO₃²⁻. The charge (-2) is the same, but Sulfite has one less oxygen.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: 'What is the formula for Hydrogen Carbonate (Bicarbonate)?',
                acceptedAnswers: ['HCO3-', 'HCO3'],
                explanation: 'It is Carbonate (CO₃²⁻) with a Hydrogen ion (H⁺) added, reducing the charge to -1. HCO₃⁻.'
            }}
          ]
        },
        {
          id: '5.3-formulae',
          title: '5.3: Writing Formulae',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: ['5.3 write formulae for compounds formed between the ions listed above']
            },
            { type: 'paragraph', content: 'Ionic compounds are neutral overall. The total positive charge must equal the total negative charge.' },
            { type: 'header', content: 'Drop and Swap Method' },
            { type: 'list', items: [
                '1. Write the symbols and charges: Al³⁺  O²⁻',
                '2. Cross the numbers down: Al goes with 2, O goes with 3.',
                '3. Formula: **Al₂O₃**',
                '4. Check: (2 × +3) + (3 × -2) = +6 - 6 = 0.'
            ]},
            { type: 'simulation', simulationId: 'ionic-master' },
            { type: 'checkpoint', checkpoint: {
                question: 'What is the correct formula for Ammonium Sulfate?',
                options: ['NH₄SO₄', '(NH₄)₂SO₄', 'NH₄(SO₄)₂', 'AmSO₄'],
                correctIndex: 1,
                explanation: 'Ammonium is NH₄⁺ (+1). Sulfate is SO₄²⁻ (-2). You need two ammoniums to balance one sulfate.'
            }}
          ]
        },
        {
          id: '5.3a-practice',
          title: '5.3a: Advanced Ionic Practice',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: ['Apply rules to name complex ionic compounds', 'Write formulae for compounds containing transition metals and polyatomic ions']
            },
            { type: 'paragraph', content: 'Practice makes perfect. Below are complex examples often found in exams involving variable valency (transition metals) and polyatomic groups. Type your answer carefully.' },
            
            { type: 'exam-hint', content: '**Examiner Tip:** When writing names, Roman Numerals are required for transition metals (e.g., Iron(II)). When writing formulas, brackets are needed if there is more than one polyatomic ion (e.g., Mg(NO₃)₂).' },

            { type: 'header', content: 'Set 1: Naming Ionic Compounds (Standard)' },

            // Questions 1-10
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '1. Name the compound: NaBr',
                acceptedAnswers: ['Sodium Bromide'],
                explanation: 'Sodium is Group 1 (no roman numeral). Bromine becomes Bromide.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '2. Name the compound: Sc(OH)₃',
                acceptedAnswers: ['Scandium Hydroxide', 'Scandium(III) Hydroxide'],
                explanation: 'Scandium is a transition metal, but often forms +3. Hydroxide is polyatomic.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '3. Name the compound: V₂(SO₄)₃',
                acceptedAnswers: ['Vanadium(III) Sulfate', 'Vanadium Sulfate'],
                explanation: 'Sulfate is -2. Total negative is -6. Two Vanadiums must be +6 total, so each is +3.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '4. Name the compound: NH₄F',
                acceptedAnswers: ['Ammonium Fluoride'],
                explanation: 'NH₄ is Ammonium. F is Fluoride.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '5. Name the compound: CaCO₃',
                acceptedAnswers: ['Calcium Carbonate'],
                explanation: 'Ca is Calcium. CO₃ is Carbonate.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '6. Name the compound: NiPO₄',
                acceptedAnswers: ['Nickel(III) Phosphate', 'Nickel Phosphate'],
                explanation: 'Phosphate is PO₄³⁻. Therefore Nickel must be Ni³⁺.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '7. Name the compound: Li₂SO₃',
                acceptedAnswers: ['Lithium Sulfite'],
                explanation: 'SO₃ is Sulfite (one less oxygen than Sulfate SO₄).'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '8. Name the compound: Zn₃P₂',
                acceptedAnswers: ['Zinc Phosphide', 'Zinc(II) Phosphide'],
                explanation: 'Zn is Zinc. P is Phosphide.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '9. Name the compound: Sr(C₂H₃O₂)₂',
                acceptedAnswers: ['Strontium Acetate'],
                explanation: 'Sr is Strontium. C₂H₃O₂ is the Acetate ion.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '10. Name the compound: Cu₂O',
                acceptedAnswers: ['Copper(I) Oxide'],
                explanation: 'Oxygen is -2. There are two Coppers, so each must be +1 to balance.'
            }},

            { type: 'header', content: 'Set 2: Advanced Naming (Transition Metals)' },
            { type: 'exam-hint', content: '**Examiner Tip:** If the metal is in the transition block (middle), calculate the charge of the anion first to figure out the metal\'s charge. Exceptions: Silver is always Ag⁺, Zinc is always Zn²⁺ (no roman numerals needed).' },

            // Questions 11-20
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '11. Name the compound: Ag₃PO₄',
                acceptedAnswers: ['Silver Phosphate', 'Silver(I) Phosphate'],
                explanation: 'Silver does not usually need a roman numeral (always +1).'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '12. Name the compound: YClO₃',
                acceptedAnswers: ['Yttrium Chlorate', 'Yttrium(III) Chlorate'],
                explanation: 'ClO₃ is Chlorate (-1).'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '13. Name the compound: SnS₂',
                acceptedAnswers: ['Tin(IV) Sulfide'],
                explanation: 'Sulfide is -2. Two sulfides = -4. Tin must be +4.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '14. Name the compound: Ti(CN)₄',
                acceptedAnswers: ['Titanium(IV) Cyanide'],
                explanation: 'Cyanide (CN) is -1. Four of them = -4. Titanium must be +4.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '15. Name the compound: KMnO₄',
                acceptedAnswers: ['Potassium Permanganate'],
                explanation: 'MnO₄ is Permanganate.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '16. Name the compound: Pb₃N₂',
                acceptedAnswers: ['Lead(II) Nitride'],
                explanation: 'Nitride is -3. Total neg = -6. Three Leads must equal +6, so each is +2.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '17. Name the compound: CoCO₃',
                acceptedAnswers: ['Cobalt(II) Carbonate', 'Cobalt Carbonate'],
                explanation: 'Carbonate is -2. Cobalt must be +2.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '18. Name the compound: CdSO₃',
                acceptedAnswers: ['Cadmium Sulfite', 'Cadmium(II) Sulfite'],
                explanation: 'SO₃ is Sulfite.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '19. Name the compound: Cu(NO₂)₂',
                acceptedAnswers: ['Copper(II) Nitrite'],
                explanation: 'NO₂ is Nitrite (-1). Two of them means Copper is +2.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '20. Name the compound: Fe(HCO₃)₂',
                acceptedAnswers: ['Iron(II) Bicarbonate', 'Iron(II) Hydrogen Carbonate'],
                explanation: 'HCO₃ is Bicarbonate (-1). Iron must be +2.'
            }},

            { type: 'header', content: 'Set 3: Writing Formulas (Multiple Choice)' },
            { type: 'paragraph', content: 'Select the correct formula. Pay attention to subscripts and brackets.' },

            // Questions 21-30
            { type: 'checkpoint', checkpoint: {
                question: '21. Lithium Acetate',
                options: ['LiC₂H₃O₂', 'Li₂C₂H₃O₂', 'LiAc', 'Li(C₂H₃O₂)₂'],
                correctIndex: 0,
                explanation: 'Lithium is +1, Acetate is -1. 1:1 ratio.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: '22. Iron(II) Phosphate',
                options: ['FePO₄', 'Fe₂(PO₄)₃', 'Fe₃(PO₄)₂', 'FeP'],
                correctIndex: 2,
                explanation: 'Fe²⁺ and PO₄³⁻. Swap charges: Fe₃(PO₄)₂.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: '23. Titanium(II) Selenide',
                options: ['TiSe₂', 'Ti₂Se', 'TiSe', 'Ti(II)Se'],
                correctIndex: 2,
                explanation: 'Ti²⁺ and Se²⁻ (Group 6). Charges cancel 1:1.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: '24. Calcium Bromide',
                options: ['CaBr', 'CaBr₂', 'Ca₂Br', 'Ca₂Br₂'],
                correctIndex: 1,
                explanation: 'Ca²⁺ and Br⁻. Needs two Bromides.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: '25. Gallium Chloride',
                options: ['GaCl', 'GaCl₂', 'GaCl₃', 'Ga₃Cl'],
                correctIndex: 2,
                explanation: 'Gallium is Group 3 (+3). Chlorine is -1.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: '26. Sodium Hydride',
                options: ['NaH', 'NaOH', 'Na₂H', 'NaH₂'],
                correctIndex: 0,
                explanation: 'Na⁺ and Hydride H⁻.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: '27. Beryllium Hydroxide',
                options: ['BeOH', 'Be(OH)₂', 'BeOH₂', 'Be₂OH'],
                correctIndex: 1,
                explanation: 'Be²⁺ and OH⁻. Needs brackets for the polyatomic ion: Be(OH)₂.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: '28. Zinc Carbonate',
                options: ['ZnCO₃', 'Zn(CO₃)₂', 'Zn₂CO₃', 'ZnC'],
                correctIndex: 0,
                explanation: 'Zn²⁺ and CO₃²⁻. Charges cancel 1:1.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: '29. Manganese(VII) Arsenide',
                options: ['MnAs', 'Mn₇As', 'MnAs₇', 'Mn₃As₇'],
                correctIndex: 3,
                explanation: 'Manganese(VII) is Mn⁷⁺. Arsenide (Group 5) is As³⁻. Swap: Mn₃As₇.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: '30. Copper(II) Chlorate',
                options: ['CuClO₃', 'Cu(ClO₃)₂', 'CuCl₂', 'Cu₂(ClO₃)'],
                correctIndex: 1,
                explanation: 'Cu²⁺ and Chlorate ClO₃⁻. Needs two chlorates.'
            }},

            { type: 'header', content: 'Set 4: Advanced Formulas (Text Input)' },
            { type: 'exam-hint', content: '**Examiner Tip:** For formulas, you can type standard numbers (e.g. H2O). The system ignores case.' },

            // Questions 31-40
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '31. Formula for Cobalt(III) Chromate',
                acceptedAnswers: ['Co2(CrO4)3', 'Co2(CrO4)3'],
                explanation: 'Co³⁺ and Chromate CrO₄²⁻. Swap: Co₂(CrO₄)₃.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '32. Formula for Ammonium Oxide',
                acceptedAnswers: ['(NH4)2O', '(NH4)2O'],
                explanation: 'Ammonium NH₄⁺ and Oxide O²⁻. (NH₄)₂O.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '33. Formula for Potassium Hydroxide',
                acceptedAnswers: ['KOH'],
                explanation: 'K⁺ and OH⁻. KOH.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '34. Formula for Lead(IV) Sulfate',
                acceptedAnswers: ['Pb(SO4)2'],
                explanation: 'Pb⁴⁺ and SO₄²⁻. Ratio is 2:4 which simplifies to 1:2. Pb(SO₄)₂.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '35. Formula for Silver Cyanide',
                acceptedAnswers: ['AgCN'],
                explanation: 'Ag⁺ and CN⁻.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '36. Formula for Vanadium(V) Nitride',
                acceptedAnswers: ['V3N5'],
                explanation: 'V⁵⁺ and N³⁻. Swap: V₃N₅.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '37. Formula for Strontium Acetate',
                acceptedAnswers: ['Sr(C2H3O2)2'],
                explanation: 'Sr²⁺ and Acetate C₂H₃O₂⁻.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '38. Formula for Molybdenum(VI) Sulfate',
                acceptedAnswers: ['Mo(SO4)3'],
                explanation: 'Mo⁶⁺ and SO₄²⁻. 2:6 ratio simplifies to 1:3. Mo(SO₄)₃.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '39. Formula for Platinum(II) Sulfide',
                acceptedAnswers: ['PtS'],
                explanation: 'Pt²⁺ and S²⁻. Cancel 1:1.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '40. Formula for Ammonium Sulfate',
                acceptedAnswers: ['(NH4)2SO4'],
                explanation: 'NH₄⁺ and SO₄²⁻. Need two ammoniums.'
            }},

            { type: 'header', content: 'Set 5: Final Mix (Fill in the Blank)' },
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '41. Formula for Chromium(VI) Phosphate',
                acceptedAnswers: ['Cr(PO4)2', 'Cr(PO₄)₂'],
                explanation: 'Cr⁶⁺ and PO₄³⁻. Ratio 3:6 simplifies to 1:2.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '42. Formula for Vanadium(IV) Carbonate',
                acceptedAnswers: ['V(CO3)2', 'V(CO₃)₂'],
                explanation: 'V⁴⁺ and CO₃²⁻. Ratio 2:4 simplifies to 1:2.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '43. Formula for Tin(II) Nitrite',
                acceptedAnswers: ['Sn(NO2)2', 'Sn(NO₂)₂'],
                explanation: 'Sn²⁺ and NO₂⁻. Need two nitrites.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '44. Formula for Cobalt(III) Oxide',
                acceptedAnswers: ['Co2O3', 'Co₂O₃'],
                explanation: 'Co³⁺ and O²⁻. Swap: Co₂O₃.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '45. Formula for Titanium(II) Acetate',
                acceptedAnswers: ['Ti(C2H3O2)2', 'Ti(C₂H₃O₂)₂'],
                explanation: 'Ti²⁺ and Acetate⁻.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '46. Formula for Vanadium(V) Sulfide',
                acceptedAnswers: ['V2S5', 'V₂S₅'],
                explanation: 'V⁵⁺ and S²⁻. Swap.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '47. Formula for Chromium(III) Hydroxide',
                acceptedAnswers: ['Cr(OH)3', 'Cr(OH)₃'],
                explanation: 'Cr³⁺ and OH⁻.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '48. Formula for Lithium Iodide',
                acceptedAnswers: ['LiI'],
                explanation: 'Li⁺ and I⁻.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '49. Formula for Lead(II) Nitride',
                acceptedAnswers: ['Pb3N2', 'Pb₃N₂'],
                explanation: 'Pb²⁺ and N³⁻. Swap.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: '50. Formula for Silver Bromide',
                acceptedAnswers: ['AgBr'],
                explanation: 'Ag⁺ and Br⁻.'
            }}
          ]
        },
        {
          id: '5.4-dot-cross-ionic',
          title: '5.4: Dot-and-Cross Diagrams',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: [
                    '5.4 draw dot-and-cross diagrams to show the formation of ionic compounds by electron transfer',
                    'Understand how to represent compounds with different ratios (e.g. 1:2, 2:1)',
                    'Predict the formula of an ionic compound based on group numbers'
                ]
            },
            
            // VOCABULARY
            { type: 'key-vocab', vocabItems: [
                { term: 'Dot-and-Cross Diagram', definition: 'A drawing that tracks the movement of electrons from a metal to a non-metal.' },
                { term: 'Valence Shell', definition: 'The outermost electron shell, which determines chemical reactivity.' },
                { term: 'Electron Transfer', definition: 'The movement of electrons from one atom to another (Ionic bonding).' },
                { term: 'Empirical Formula', definition: 'The simplest whole number ratio of ions in the compound.' }
            ]},

            // SECTION 1: 1:1 RATIO
            { type: 'header', content: '1. Simple 1:1 Transfer (Group 1 + Group 7)' },
            { type: 'paragraph', content: 'The simplest ionic bond is when one metal atom gives one electron to one non-metal atom. Example: **Sodium Chloride (NaCl)**.' },
            { type: 'list', items: [
                'Sodium (2.8.1) has 1 excess electron.',
                'Chlorine (2.8.7) needs 1 electron.',
                'Transfer: Na gives 1e⁻ to Cl.',
                'Result: Na⁺ (2.8) and Cl⁻ (2.8.8).'
            ]},
            
            // SIMULATION 1:1
            { type: 'header', content: 'Interactive: Electron Transfer' },
            { type: 'simulation', simulationId: 'ion-formation' },

            // SECTION 2: 1:2 RATIO
            { type: 'header', content: '2. The 1:2 Ratio (Group 2 + Group 7)' },
            { type: 'paragraph', content: 'What if the metal needs to lose 2 electrons, but the non-metal only needs 1? Example: **Magnesium Chloride (MgCl₂)**.' },
            { type: 'list', items: [
                'Magnesium (2.8.2) must lose **2 electrons** to be stable.',
                'Chlorine (2.8.7) can only accept **1 electron**.',
                'Solution: Magnesium needs **TWO** Chlorine atoms.',
                'One Mg gives one electron to the first Cl, and the second electron to the second Cl.'
            ]},
            { type: 'exam-hint', content: 'In your diagram, draw ONE Magnesium atom in the middle and TWO Chlorine atoms on the sides. Show arrows going to both.' },

            // SECTION 3: 2:1 RATIO
            { type: 'header', content: '3. The 2:1 Ratio (Group 1 + Group 6)' },
            { type: 'paragraph', content: 'Sometimes you need two metal atoms to satisfy one non-metal. Example: **Sodium Oxide (Na₂O)**.' },
            { type: 'list', items: [
                'Oxygen (2.6) needs **2 electrons**.',
                'Sodium (2.8.1) can only give **1 electron**.',
                'Solution: **TWO** Sodium atoms each give one electron to the Oxygen atom.'
            ]},

            // MAIN SIMULATION FOR RATIOS
            { type: 'header', content: 'Interactive Lab: Building Different Ratios' },
            { type: 'paragraph', content: 'Use the main simulation lab to build compounds with different ratios. Try to make **Magnesium Fluoride (MgF₂)** and **Lithium Oxide (Li₂O)**.' },
            { type: 'simulation', simulationId: 'ionic-master' },

            // QUESTIONS
            { type: 'header', content: 'Knowledge Checkpoint' },
            
            // Q1
            { type: 'checkpoint', checkpoint: {
                question: 'In a dot-and-cross diagram, why are dots and crosses used?',
                options: ['To look pretty', 'To distinguish electrons from the metal vs the non-metal', 'To show protons vs electrons', 'To show positive vs negative charge'],
                correctIndex: 1,
                explanation: 'Using different symbols helps track the origin of the electrons, showing clearly which ones were transferred.'
            }},
            
            // Q2
            { type: 'checkpoint', checkpoint: {
                question: 'Magnesium (Group 2) reacts with Oxygen (Group 6). What is the ratio?',
                options: ['1:1 (MgO)', '1:2 (MgO₂)', '2:1 (Mg₂O)', '2:3 (Mg₂O₃)'],
                correctIndex: 0,
                explanation: 'Mg loses 2e⁻. O gains 2e⁻. They balance perfectly 1:1.'
            }},

            // Q3
            { type: 'checkpoint', checkpoint: {
                question: 'How many Chlorine atoms are needed to react with one Calcium atom?',
                options: ['1', '2', '3', '4'],
                correctIndex: 1,
                explanation: 'Calcium (Ca) is Group 2 -> Ca²⁺. Chlorine (Cl) is Group 7 -> Cl⁻. You need two Cl⁻ to balance one Ca²⁺.'
            }},

            // Q4
            { type: 'checkpoint', checkpoint: {
                question: 'What is the electronic configuration of the Chloride ion in MgCl₂?',
                options: ['2.8.7', '2.8.8', '2.8', '2.8.1'],
                correctIndex: 1,
                explanation: 'Chlorine atom is 2.8.7. It gains 1 electron to become stable 2.8.8.'
            }},

            // Q5
            { type: 'checkpoint', checkpoint: {
                question: 'Which statement about the formation of Sodium Oxide (Na₂O) is correct?',
                options: [
                    'One Na gives 2 electrons to O',
                    'Two Na atoms each give 1 electron to O',
                    'O gives electrons to Na',
                    'They share electrons'
                ],
                correctIndex: 1,
                explanation: 'Sodium is Group 1 (can only lose 1). Oxygen needs 2. So you need two Sodium atoms.'
            }},

            // Q6
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: 'What is the formula for Aluminum Fluoride?',
                acceptedAnswers: ['AlF3'],
                explanation: 'Aluminum is Al³⁺. Fluorine is F⁻. You need three fluorides: AlF₃.'
            }},

            // Q7
            { type: 'checkpoint', checkpoint: {
                question: 'Which diagram would represent Calcium Oxide?',
                options: [
                    '[Ca]⁺ [O]⁻',
                    '[Ca]²⁺ [O]²⁻',
                    '[Ca]²⁺ 2[O]⁻',
                    '[Ca]⁺ [O]²⁻'
                ],
                correctIndex: 1,
                explanation: 'Ca is Group 2 (+2). O is Group 6 (-2). 1:1 ratio with double charges.'
            }},

            // Q8
            { type: 'checkpoint', checkpoint: {
                question: 'Why do we put the final ions in square brackets?',
                options: [
                    'It is just a style choice',
                    'To indicate the charge belongs to the whole ion structure',
                    'To trap the electrons',
                    'To show they are solid'
                ],
                correctIndex: 1,
                explanation: 'Square brackets with the charge outside show that the ion acts as a single charged unit.'
            }},

            // Q9
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: 'Determine the formula for Lithium Nitride (Li is Grp 1, N is Grp 5).',
                acceptedAnswers: ['Li3N'],
                explanation: 'N needs 3 electrons (to go from 5 to 8). Li can give 1. You need 3 Li atoms. Li₃N.'
            }},

            // Q10
            { type: 'checkpoint', checkpoint: {
                question: 'What is the charge on the Anion in Aluminum Oxide (Al₂O₃)?',
                options: ['-1', '-2', '-3', '+3'],
                correctIndex: 1,
                explanation: 'The anion is Oxygen (Oxide). Group 6 always forms -2 ions.'
            }}
          ]
        },
        {
          id: '5.5-ionic-bond-def',
          title: '5.5: The Nature of the Ionic Bond',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: [
                    '5.5 understand ionic bonding in terms of electrostatic attractions',
                    'Explain the non-directional nature of the ionic bond',
                    'Describe the Giant Ionic Lattice structure'
                ]
            },
            
            // --- DEFINITION ---
            { type: 'header', content: '1. The True Nature of the Bond' },
            { type: 'paragraph', content: 'Students often think an ionic bond is a stick connecting two ions. This is wrong. An ionic bond is a **field of force** that acts in all directions.' },
            { type: 'key-vocab', vocabItems: [
                { term: 'Ionic Bond', definition: 'The strong electrostatic attraction between oppositely charged ions.' },
                { term: 'Electrostatic Force', definition: 'The force of attraction between positive (+) and negative (-) charges.' },
                { term: 'Non-Directional', definition: 'The force pulls equally in all directions (360°), not just towards one specific atom.' }
            ]},

            // --- GIANT LATTICE ---
            { type: 'header', content: '2. The Giant Lattice Structure' },
            { type: 'paragraph', content: 'Because the force is non-directional, ions pack together in a huge, regular 3D arrangement called a **Giant Ionic Lattice**. There are no individual molecules.' },
            { type: 'list', items: [
                'Every positive ion is surrounded by negative ions.',
                'Every negative ion is surrounded by positive ions.',
                'Example: In NaCl, each Na⁺ is surrounded by 6 Cl⁻ ions, and vice versa.'
            ]},

            // --- CHECKPOINTS ---
            { type: 'header', content: 'Knowledge Checkpoint' },

            { type: 'checkpoint', checkpoint: {
                question: 'Which phrase best defines an Ionic Bond?',
                options: ['Sharing of electron pairs', 'Attraction between nuclei', 'Strong electrostatic attraction between opposite ions', 'Weak intermolecular forces'],
                correctIndex: 2,
                explanation: 'This is the standard definition you must write in exams. "Electrostatic" means attraction between static charges (+ and -).'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'What holds the giant ionic lattice together?',
                options: ['Gravity', 'Shared electrons', 'Strong electrostatic forces acting in all directions', 'Weak intermolecular forces'],
                correctIndex: 2,
                explanation: 'The lattice is held by the non-directional electrostatic attraction between the vast number of oppositely charged ions.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'In a NaCl lattice, how many Chloride ions surround each Sodium ion?',
                options: ['1', '4', '6', '8'],
                correctIndex: 2,
                explanation: 'In the cubic structure of NaCl, each ion is surrounded by 6 neighbors of the opposite charge (Top, Bottom, Left, Right, Front, Back).'
            }}
          ]
        },
        {
          id: '5.6-ionic-properties',
          title: '5.6: Physical Properties of Ionic Compounds',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: [
                    '5.6 understand why compounds with giant ionic lattices have high melting and boiling points',
                    'Explain the physical properties of ionic compounds (Brittleness, Solubility)',
                    'Compare lattice energies based on ion charge and size'
                ]
            },

            // --- PHYSICAL PROPERTIES ---
            { type: 'header', content: '1. Physical Properties Explained' },
            
            // Melting Point
            { type: 'paragraph', content: '**A. High Melting & Boiling Points:**' },
            { type: 'list', items: [
                '**Observation:** Ionic salts are solids at room temperature (e.g. Salt melts at 801°C).',
                '**Explanation:** The electrostatic forces holding the lattice together are extremely strong. It takes a huge amount of heat energy to break the millions of bonds in the giant lattice.'
            ]},

            // Brittleness
            { type: 'paragraph', content: '**B. Brittleness (Why they shatter):**' },
            { type: 'list', items: [
                '**Observation:** If you hit a crystal with a hammer, it shatters into powder. It does not bend like metal.',
                '**Explanation:** The force shifts a layer of ions. This brings ions of the **same charge** next to each other (e.g. + next to +).',
                '**Result:** Massive electrostatic **repulsion** pushes the layers apart, splitting the crystal.'
            ]},

            // --- INTERACTIVE SIMULATION (NEW) ---
            { type: 'header', content: 'Interactive Lab: Testing Properties' },
            { type: 'paragraph', content: 'Use the tabs below to visualize the Structure, and then perform destructive tests (Hammer & Heat) to understand the physical properties.' },
            { type: 'simulation', simulationId: 'ionic-lattice' },

            // --- LATTICE ENERGY (Advanced) ---
            { type: 'header', content: '2. Strength of the Lattice (Coulomb\'s Law)' },
            { type: 'paragraph', content: 'Not all ionic bonds are equal. The strength depends on two factors:' },
            { type: 'list', items: [
                '**Charge:** Higher charges = Stronger attraction. (Mg²⁺O²⁻ is much stronger than Na⁺Cl⁻).',
                '**Size:** Smaller ions = Closer packing = Stronger attraction.'
            ]},
            { type: 'exam-hint', content: 'Magnesium Oxide (MgO) has a melting point of 2852°C, while Sodium Chloride (NaCl) is only 801°C. Why? Because Mg²⁺ and O²⁻ have double the charge of Na⁺ and Cl⁻.' },

            // --- CHECKPOINTS ---
            { type: 'header', content: 'Knowledge Checkpoint' },

            { type: 'checkpoint', checkpoint: {
                question: 'Why do ionic crystals shatter when hit?',
                options: [
                    'They are too soft',
                    'The layers of ions slide over each other smoothly',
                    'Like charges align (+ next to +) causing repulsion',
                    'The electrons fall out'
                ],
                correctIndex: 2,
                explanation: 'A sharp blow shifts the lattice layers. Repulsion between aligned like charges pushes the crystal apart.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'Which compound would have the highest melting point?',
                options: ['NaCl (1+, 1-)', 'KBr (1+, 1-)', 'MgO (2+, 2-)', 'LiF (1+, 1-)'],
                correctIndex: 2,
                explanation: 'Higher charges create significantly stronger electrostatic attraction. 2+ attracting 2- is roughly 4x stronger than 1+ attracting 1-.'
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
          id: '5.7-ionic-conductivity',
          title: '5.7: Electrical Conductivity (Ionic)',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: [
                    '5.7 know that ionic compounds do not conduct electricity when solid, but do conduct electricity when molten and in aqueous solution'
                ]
            },
            
            // --- INTRODUCTION ---
            { type: 'header', content: 'The Condition for Conductivity' },
            { type: 'paragraph', content: 'For a substance to conduct electricity, it must contain **Charged Particles** that are **Free to Move**.' },
            { type: 'paragraph', content: 'In ionic compounds, these charged particles are the **Ions** themselves (not electrons).' },

            // --- STATES ---
            { type: 'header', content: 'Conductivity in Different States' },
            { type: 'list', items: [
                '**Solid:** Ions are locked in a rigid lattice. They can vibrate, but they cannot move to the electrodes. **Result: Insulator**.',
                '**Molten (Liquid):** Heat energy breaks the lattice. Ions are free to slide past each other and move to the electrodes. **Result: Conductor**.',
                '**Aqueous (Dissolved):** Water molecules separate the ions. The ions float freely in the solution. **Result: Conductor**.'
            ]},

            // --- SIMULATION ---
            { type: 'header', content: 'Interactive Lab: Conductivity Tester' },
            { type: 'paragraph', content: 'Switch between Solid, Molten, and Solution states. Observe the movement of the ions and whether the light bulb turns on. Pay attention to **why** the current flows.' },
            { type: 'simulation', simulationId: 'ionic-conductivity' },

            // --- KEYWORDS EXPLAINED ---
            { type: 'header', content: 'Key Terminology: Molten vs Aqueous' },
            { type: 'key-vocab', vocabItems: [
                { term: 'Molten', definition: 'The substance has been melted by HEAT. It is a pure liquid (e.g. liquid NaCl at 801°C). No water is present.' },
                { term: 'Aqueous', definition: 'The substance has been dissolved in WATER. It is a solution (e.g. Salt water at room temp).' }
            ]},
            
            { type: 'exam-hint', content: '**Exam Requirement:** When explaining why a molten/aqueous ionic compound conducts, you MUST say: "The ions are free to move." Do NOT say "electrons move" (that is for metals).' },

            // --- CHECKPOINTS ---
            { type: 'checkpoint', checkpoint: {
                question: 'Why does solid Sodium Chloride NOT conduct electricity?',
                options: ['It has no charged particles', 'The ions are fixed in a lattice and cannot move', 'It is a metal', 'It has no free electrons'],
                correctIndex: 1,
                explanation: 'The ions exist, but they are locked in position. Conductivity requires MOBILE charge carriers.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'What happens to the ions when an ionic solid melts?',
                options: ['They become electrons', 'They evaporate', 'The lattice breaks and they become free to move', 'They stop vibrating'],
                correctIndex: 2,
                explanation: 'Melting overcomes the strong electrostatic forces holding the lattice together, allowing ions to flow.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'Which of these will conduct electricity?',
                options: ['Solid NaCl', 'Solid Sugar', 'Aqueous NaCl (Salt Water)', 'Pure Water'],
                correctIndex: 2,
                explanation: 'Aqueous NaCl contains dissolved ions that are free to move. Pure water and solid salts are insulators.'
            }}
          ]
        },
        // --- NEW ASSESSMENT SECTION ---
        {
          id: '5.f-assessment',
          title: '5.F: Comprehensive Assessment (Topic 5F)',
          blocks: [
            { type: 'header', content: 'Assessment Instructions' },
            { type: 'paragraph', content: 'This comprehensive test covers content from Lessons 5.1 to 5.7. It is designed to simulate a full exam paper for this topic.' },
            { type: 'list', items: [
                '**Section A:** Fundamentals & Trends (20 Marks)',
                '**Section B:** Nomenclature & Formulae (30 Marks)',
                '**Section C:** Bonding & Structure (25 Marks)',
                '**Section D:** Physical Properties & Application (25 Marks)'
            ]},

            // --- SECTION A ---
            { type: 'header', content: 'Section A: Fundamentals & Trends (20 Marks)' },
            
            { type: 'checkpoint', checkpoint: {
                question: 'A1. Which group of elements forms 2+ ions?',
                options: ['Group 1', 'Group 2', 'Group 6', 'Group 7'],
                correctIndex: 1,
                explanation: 'Group 2 metals lose 2 electrons to form 2+ ions.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'A2. What is the electronic configuration of a Fluoride ion (F⁻)? (F is atomic no. 9)',
                options: ['2.7', '2.8', '2.8.1', '2.6'],
                correctIndex: 1,
                explanation: 'Fluorine (2.7) gains 1 electron to become Fluoride (2.8).'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'A3. Which term describes the loss of electrons?',
                options: ['Reduction', 'Oxidation', 'Redox', 'Displacement'],
                correctIndex: 1,
                explanation: 'Oxidation Is Loss (OIL).'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'A4. Which of these ions is isoelectronic with Argon?',
                options: ['Na⁺', 'O²⁻', 'K⁺', 'Li⁺'],
                correctIndex: 2,
                explanation: 'Argon is 2.8.8. Potassium (2.8.8.1) loses 1 electron to become K⁺ (2.8.8).'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'A5. What is the charge of the Sulfite ion?',
                options: ['-1', '-2', '-3', '+2'],
                correctIndex: 1,
                explanation: 'Sulfite (SO₃²⁻) has a -2 charge, same as Sulfate.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'A6. Why do atoms react to form ions?',
                options: ['To become neutral', 'To gain mass', 'To achieve a full valence electron shell', 'To become radioactive'],
                correctIndex: 2,
                explanation: 'Atoms react to achieve the stable electronic configuration of a noble gas.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'A7. What is the formula for the Ammonium ion?',
                options: ['NH₃', 'NH₄⁺', 'NO₃⁻', 'NH₂⁻'],
                correctIndex: 1,
                explanation: 'Ammonium is a polyatomic cation: NH₄⁺.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'A8. Which of these elements forms an anion?',
                options: ['Calcium', 'Potassium', 'Bromine', 'Iron'],
                correctIndex: 2,
                explanation: 'Bromine is a non-metal (Group 7) and gains electrons to form anions.'
            }},

            // --- SECTION B ---
            { type: 'header', content: 'Section B: Nomenclature & Formulae (30 Marks)' },
            { type: 'paragraph', content: 'Type the correct chemical formula. Case insensitive (e.g., Na2O or na2o).' },

            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: 'B1. Sodium Sulfide',
                acceptedAnswers: ['Na2S'],
                explanation: 'Na⁺ and S²⁻. Need two Na.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: 'B2. Magnesium Nitrate',
                acceptedAnswers: ['Mg(NO3)2'],
                explanation: 'Mg²⁺ and NO₃⁻. Need two nitrates.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: 'B3. Iron(III) Oxide',
                acceptedAnswers: ['Fe2O3'],
                explanation: 'Fe³⁺ and O²⁻. Swap charges: Fe₂O₃.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: 'B4. Aluminum Hydroxide',
                acceptedAnswers: ['Al(OH)3'],
                explanation: 'Al³⁺ and OH⁻. Need 3 hydroxides.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: 'B5. Copper(II) Sulfate',
                acceptedAnswers: ['CuSO4'],
                explanation: 'Cu²⁺ and SO₄²⁻. Charges cancel.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: 'B6. Ammonium Carbonate',
                acceptedAnswers: ['(NH4)2CO3'],
                explanation: 'NH₄⁺ and CO₃²⁻. Need two ammoniums.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: 'B7. Silver Nitrate',
                acceptedAnswers: ['AgNO3'],
                explanation: 'Ag⁺ and NO₃⁻.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: 'B8. Zinc Chloride',
                acceptedAnswers: ['ZnCl2'],
                explanation: 'Zn is always Zn²⁺. Cl⁻.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: 'B9. Potassium Permanganate',
                acceptedAnswers: ['KMnO4'],
                explanation: 'K⁺ and MnO₄⁻.'
            }},
            { type: 'checkpoint', checkpoint: {
                variant: 'text-input',
                question: 'B10. Lead(IV) Oxide',
                acceptedAnswers: ['PbO2'],
                explanation: 'Pb⁴⁺ and O²⁻. Pb₂O₄ simplifies to PbO₂.'
            }},

            // --- SECTION C ---
            { type: 'header', content: 'Section C: Bonding & Structure (25 Marks)' },

            { type: 'checkpoint', checkpoint: {
                question: 'C1. What is the definition of an Ionic Bond?',
                options: [
                    'Sharing of electrons between non-metals',
                    'Attraction between delocalised electrons and positive ions',
                    'Strong electrostatic attraction between oppositely charged ions',
                    'Weak intermolecular forces between molecules'
                ],
                correctIndex: 2,
                explanation: 'Ionic bonding is the electrostatic attraction between positive and negative ions.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'C2. Which description best fits the structure of Sodium Chloride?',
                options: [
                    'Simple molecular lattice',
                    'Giant ionic lattice',
                    'Giant covalent structure',
                    'Metallic lattice'
                ],
                correctIndex: 1,
                explanation: 'Ionic compounds form giant repeating lattices of alternating ions.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'C3. In the formation of Calcium Chloride (CaCl₂), how many electrons are transferred in total per unit?',
                options: ['1', '2', '3', '4'],
                correctIndex: 1,
                explanation: 'One Ca atom loses 2 electrons. Each Cl atom takes 1. Total transferred from metal to non-metal is 2.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'C4. Why is the ionic bond non-directional?',
                options: [
                    'Because electrons are shared',
                    'Because the electrostatic field acts in all directions around the ion',
                    'Because it only acts between specific pairs',
                    'Because ions move randomly'
                ],
                correctIndex: 1,
                explanation: 'A charged sphere attracts opposite charges from all angles (360°).'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'C5. What is the coordination number of Sodium in a NaCl lattice (how many neighbors)?',
                options: ['4', '6', '8', '12'],
                correctIndex: 1,
                explanation: 'Each Na⁺ is surrounded by 6 Cl⁻ ions (Top, Bottom, Front, Back, Left, Right).'
            }},

            // --- SECTION D ---
            { type: 'header', content: 'Section D: Physical Properties & Application (25 Marks)' },

            { type: 'checkpoint', checkpoint: {
                question: 'D1. Why do ionic compounds have high melting points?',
                options: [
                    'The ions are heavy',
                    'Covalent bonds are strong',
                    'Large amounts of energy are needed to overcome strong electrostatic forces',
                    'They contain metals'
                ],
                correctIndex: 2,
                explanation: 'The lattice is held together by millions of strong bonds. Breaking them requires high energy.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'D2. Which compound has the highest lattice energy (and melting point)?',
                options: ['NaF', 'MgO', 'KCl', 'CaBr₂'],
                correctIndex: 1,
                explanation: 'MgO has ions with charges +2 and -2. Higher charges = Stronger attraction.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'D3. Why are ionic crystals brittle?',
                options: [
                    'Layers of ions slide easily',
                    'Applied force causes like charges to align and repel',
                    'They are too hard',
                    'They contain water'
                ],
                correctIndex: 1,
                explanation: 'Shifting the lattice brings ions of the same charge together. Repulsion shatters the crystal.'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'D4. Under what condition does Potassium Bromide conduct electricity?',
                options: [
                    'Solid only',
                    'Solid and Molten',
                    'Molten and Aqueous',
                    'Never'
                ],
                correctIndex: 2,
                explanation: 'Ions must be free to move. This happens when melted (molten) or dissolved (aqueous).'
            }},
            { type: 'checkpoint', checkpoint: {
                question: 'D5. In the electrolysis of molten Lead(II) Bromide, what is formed at the Cathode?',
                options: [
                    'Bromine gas',
                    'Lead metal',
                    'Hydrogen gas',
                    'Oxygen gas'
                ],
                correctIndex: 1,
                explanation: 'The Cathode is negative. It attracts the positive Lead ion (Pb²⁺), which gains electrons to become Lead metal.'
            }}
          ]
        }
      ]
    },
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
            { type: 'paragraph', content: 'Most covalent compounds do not conduct electricity because they have no charged particles (ions or electrons) that are free to move.' },
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
