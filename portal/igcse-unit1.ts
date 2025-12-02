
import { Unit } from './types';

export const IGCSE_UNIT_1: Unit = {
  id: 'igcse-chem-unit1',
  title: 'Unit 1: Principles of Chemistry',
  description: 'The fundamental building blocks of matter, covering states of matter, atomic structure, the Periodic Table, bonding, and calculations. (Based on Spec 4XCH1)',
  topics: [
    // --- SECTION 1: PRINCIPLES OF CHEMISTRY ---
    {
      id: 'topic-1a',
      title: '1(a) States of Matter',
      lessons: [
        {
          id: '1.1-states',
          title: '1.1: The Three States of Matter',
          blocks: [
            { 
                type: 'learning-objectives', 
                items: [
                    '1.1 understand the three states of matter in terms of the arrangement, movement and energy of the particles'
                ]
            },
            { type: 'header', content: 'The Kinetic Particle Theory' },
            { type: 'paragraph', content: 'Everything in the universe is made of matter. Matter consists of particles (atoms, molecules, or ions). The **Kinetic Theory** explains how these particles are arranged and how they move in the three states of matter: Solid, Liquid, and Gas.' },
            
            { type: 'key-vocab', vocabItems: [
                { term: 'Matter', definition: 'Anything that has mass and takes up space (volume).' },
                { term: 'Particle', definition: 'A general term for a small piece of matter. In chemistry, usually an atom, molecule, or ion.' },
                { term: 'Kinetic Energy', definition: 'The energy of motion. The faster particles move, the more kinetic energy they have.' },
                { term: 'Intermolecular Forces', definition: 'The weak forces of attraction between particles that hold them together.' }
            ]},

            { type: 'header', content: 'Interactive: Particle Arrangement' },
            { type: 'paragraph', content: 'Use the simulation below. Toggle between states to observe the differences in **arrangement** and **movement**. Note how the "Kinetic Energy" changes as you heat the substance.' },
            { type: 'simulation', simulationId: 'particle-model' },

            { type: 'header', content: 'Solids' },
            { type: 'paragraph', content: 'In a solid, particles have the least amount of energy. They are held together tightly by strong forces of attraction.' },
            { type: 'list', items: [
                '**Arrangement:** Regular, fixed lattice structure. Particles are touching.',
                '**Movement:** Vibrate around fixed positions. They do not move from place to place.',
                '**Properties:** Fixed shape, fixed volume. Cannot be compressed.'
            ]},
            
            { type: 'checkpoint', checkpoint: {
                question: 'Why do solids have a fixed shape?',
                options: [
                    'Because particles are far apart',
                    'Because strong forces hold particles in a fixed lattice',
                    'Because particles have high kinetic energy',
                    'Because particles can slide over each other'
                ],
                correctIndex: 1,
                explanation: 'The strong forces of attraction prevent particles from moving out of their fixed positions in the lattice, maintaining the shape.'
            }},

            { type: 'header', content: 'Liquids' },
            { type: 'paragraph', content: 'In a liquid, particles have more energy than in a solid. The forces of attraction are strong enough to keep them touching, but weak enough to allow movement.' },
            { type: 'list', items: [
                '**Arrangement:** Random. Particles are touching but not in a regular pattern.',
                '**Movement:** Slide past each other randomly.',
                '**Properties:** Fixed volume, but take the shape of the container. Cannot be easily compressed.'
            ]},

            { type: 'checkpoint', checkpoint: {
                question: 'Which word best describes the arrangement of particles in a liquid?',
                options: [
                    'Regular',
                    'Random',
                    'Lattice',
                    'Distant'
                ],
                correctIndex: 1,
                explanation: 'Liquid particles are arranged randomly, unlike the regular arrangement of a solid.'
            }},

            { type: 'header', content: 'Gases' },
            { type: 'paragraph', content: 'In a gas, particles have the highest energy. They have overcome the forces of attraction almost completely.' },
            { type: 'list', items: [
                '**Arrangement:** Random and far apart.',
                '**Movement:** Move quickly in all directions. Collide with walls and each other.',
                '**Properties:** No fixed shape or volume. Fills the entire container. Easily compressed.'
            ]},

            { type: 'checkpoint', checkpoint: {
                question: 'Which state of matter has the highest kinetic energy?',
                options: [
                    'Solid',
                    'Liquid',
                    'Gas',
                    'All are equal'
                ],
                correctIndex: 2,
                explanation: 'Gas particles move the fastest and have overcome attractive forces, meaning they possess the most kinetic energy.'
            }}
          ]
        },
        {
            id: '1.2-interconversions',
            title: '1.2: Interconversions',
            blocks: [
                { 
                    type: 'learning-objectives', 
                    items: [
                        '1.2 understand the interconversions between the three states of matter in terms of: the names of the interconversions, how they are achieved, the changes in arrangement, movement and energy of the particles.'
                    ]
                },
                { type: 'header', content: 'Phase Changes' },
                { type: 'paragraph', content: 'A substance changes state when energy is added or removed. This breaks or forms the bonds (forces) between particles. No new substances are formed; these are **Physical Changes**.' },
                
                { type: 'key-vocab', vocabItems: [
                    { term: 'Melting', definition: 'Solid → Liquid. Requires heat (Endothermic).' },
                    { term: 'Boiling', definition: 'Liquid → Gas. Occurs throughout the liquid at boiling point.' },
                    { term: 'Evaporation', definition: 'Liquid → Gas. Occurs at the surface below boiling point.' },
                    { term: 'Freezing', definition: 'Liquid → Solid. Releases heat (Exothermic).' },
                    { term: 'Condensation', definition: 'Gas → Liquid. Releases heat.' },
                    { term: 'Sublimation', definition: 'Solid → Gas directly (e.g. Dry Ice, Iodine).' },
                    { term: 'Deposition', definition: 'Gas → Solid directly.' }
                ]},

                { type: 'header', content: 'Heating Curves & Latent Heat' },
                { type: 'paragraph', content: 'When you heat a solid, its temperature rises. However, during a change of state (like melting), the **temperature stops rising**. Why? Because the heat energy is being used to break the bonds between particles, not to make them move faster.' },
                
                { type: 'exam-hint', content: 'Look for the **flat horizontal lines** on a graph. These flat sections represent the phase changes (Melting and Boiling). The sloped lines represent the solid, liquid, or gas heating up.' },

                { type: 'header', content: 'Interactive: Heating Curve' },
                { type: 'paragraph', content: 'Drag the slider to simulate heating a substance from -20°C to 120°C. Watch how the state changes over time.' },
                { type: 'simulation', simulationId: 'heating-curve' },

                { type: 'checkpoint', checkpoint: {
                    question: 'Why does the temperature remain constant during melting?',
                    options: [
                        'The particles stop moving',
                        'Heat energy is used to overcome forces of attraction (Latent Heat)',
                        'The substance is cooling down',
                        'Energy is being lost to the surroundings'
                    ],
                    correctIndex: 1,
                    explanation: 'During a phase change, supplied energy is "Latent Heat" used to break bonds/forces (potential energy increases) rather than making particles move faster (kinetic energy/temperature stays same).'
                }},

                { type: 'checkpoint', checkpoint: {
                    question: 'What is the difference between Boiling and Evaporation?',
                    options: [
                        'They are the same thing',
                        'Boiling happens at any temperature, Evaporation only at fixed point',
                        'Boiling happens throughout the liquid at a fixed point; Evaporation happens at the surface at any temp',
                        'Evaporation is Solid to Gas'
                    ],
                    correctIndex: 2,
                    explanation: 'Boiling is rapid and occurs throughout the liquid at the specific Boiling Point. Evaporation is slower and surface-only.'
                }}
            ]
        },
        {
            id: '1.3-diffusion',
            title: '1.3: Diffusion Experiments',
            blocks: [
                { 
                    type: 'learning-objectives', 
                    items: [
                        '1.3 understand how the results of experiments involving the dilution of coloured solutions and diffusion of gases can be explained'
                    ]
                },
                { type: 'key-vocab', vocabItems: [
                    { term: 'Diffusion', definition: 'The random movement of particles from an area of high concentration to an area of lower concentration.' },
                    { term: 'Concentration Gradient', definition: 'The difference in concentration between two areas. Diffusion happens "down" the gradient.' },
                    { term: 'Relative Molecular Mass (Mr)', definition: 'The mass of a molecule. Heavier molecules diffuse slower.' }
                ]},
                
                { type: 'header', content: 'Experiment: Ammonia & Hydrogen Chloride' },
                { type: 'paragraph', content: 'A classic experiment to demonstrate diffusion involves the reaction between two gases: **Ammonia (NH₃)** and **Hydrogen Chloride (HCl)**.' },
                
                { type: 'exam-hint', content: 'It is important to distinguish between the solution and the gas. The cotton wool is soaked in **Hydrochloric Acid** (the solution). This releases **Hydrogen Chloride gas**, which diffuses down the tube.' },

                { type: 'practical', content: 'Method', items: [
                    'A cotton wool pad soaked in **Concentrated Ammonia Solution** is placed at one end.',
                    'A cotton wool pad soaked in **Concentrated Hydrochloric Acid** is placed at the other end.',
                    'The tube is sealed immediately with rubber bungs.',
                    'The Ammonia gas and Hydrogen Chloride gas diffuse towards each other.',
                    'When they meet, they react to form a white solid ring of **Ammonium Chloride (NH₄Cl)**.'
                ]},

                { type: 'header', content: 'Interactive Lab: The Diffusion Tube' },
                { type: 'paragraph', content: 'Run the simulation below. Observe that the white ring forms closer to the HCl end. Why?' },
                { type: 'simulation', simulationId: 'diffusion' },

                { type: 'header', content: 'Explaining the Result' },
                { type: 'paragraph', content: 'The white ring does **not** form in the middle. It forms closer to the **HCl** end. This proves that Ammonia particles travel faster than Hydrogen Chloride particles.' },
                
                { type: 'list', items: [
                    '**Ammonia (NH₃):** Nitrogen (14) + 3 Hydrogen (3) = **Mr 17**',
                    '**Hydrogen Chloride (HCl):** Hydrogen (1) + Chlorine (35.5) = **Mr 36.5**'
                ]},
                
                { type: 'paragraph', content: 'Because Ammonia (Mr 17) is much lighter than HCl (Mr 36.5), it diffuses much quicker (approx 1.5x faster), covering more distance in the same time.' },

                { type: 'checkpoint', checkpoint: {
                    question: 'Which gas diffuses faster and why?',
                    options: [
                        'HCl because it is an acid',
                        'NH₃ because it has a lower Relative Molecular Mass (Mr)',
                        'HCl because it has a higher Relative Molecular Mass (Mr)',
                        'They diffuse at the same speed'
                    ],
                    correctIndex: 1,
                    explanation: 'Lighter particles diffuse faster. Ammonia (Mr 17) is lighter than Hydrogen Chloride (Mr 36.5).'
                }},

                { type: 'checkpoint', checkpoint: {
                    question: 'What is the white solid formed in the tube?',
                    options: [
                        'Ammonia Chloride',
                        'Hydrogen Chloride',
                        'Ammonium Chloride',
                        'Chlorine Gas'
                    ],
                    correctIndex: 2,
                    explanation: 'Ammonia (NH₃) + Hydrogen Chloride (HCl) → Ammonium Chloride (NH₄Cl). It is a white solid.'
                }}
            ]
        },
        {
            id: '1.4-definitions',
            title: '1.4: Solution Terminology',
            blocks: [
                { 
                    type: 'learning-objectives', 
                    items: [
                        '1.4 know what is meant by the terms: solvent, solute, solution, saturated solution'
                    ]
                },
                { type: 'header', content: 'Understanding Solutions' },
                { type: 'paragraph', content: 'When a solid dissolves in a liquid, it doesn\'t just disappear. The particles break away from the solid structure and mix with the liquid. This process creates a **Solution**.' },
                
                { type: 'key-vocab', vocabItems: [
                    { term: 'Solute', definition: 'The substance that dissolves in a liquid (e.g., Salt, Sugar).' },
                    { term: 'Solvent', definition: 'The liquid in which the solute dissolves (e.g., Water, Ethanol).' },
                    { term: 'Solution', definition: 'The mixture formed when a solute dissolves in a solvent. It is transparent (though may be coloured).' },
                    { term: 'Insoluble', definition: 'A substance that will not dissolve in a particular solvent (e.g., Sand in water).' }
                ]},

                { type: 'header', content: 'Simulation: The Dissolving Process' },
                { type: 'paragraph', content: 'Use the microscopic view below to observe what happens when a crystal (Solute) is placed in water (Solvent). Experiment with **Temperature** and **Stirring**.' },
                { type: 'simulation', simulationId: 'solution-dissolving' },

                { type: 'header', content: 'Saturated Solutions & Equilibrium' },
                { type: 'paragraph', content: 'If you keep adding solute to a solvent, eventually no more will dissolve. The solution is now **Saturated**.' },
                { type: 'paragraph', content: 'At this point, a **Dynamic Equilibrium** is established: Particles are dissolving from the solid at the exact same rate that dissolved particles are recrystallizing back onto the solid. The net amount of dissolved solute remains constant.' },
                
                { type: 'header', content: 'Supersaturated Solutions' },
                { type: 'paragraph', content: 'A **Supersaturated** solution contains *more* dissolved solute than it should theoretically hold at that temperature. This is an unstable state.' },
                { type: 'list', items: [
                    '**How to make it:** Saturate a solution at a high temperature, then cool it down very slowly and carefully without disturbing it.',
                    '**What happens:** The excess solute stays dissolved temporarily.',
                    '**The Trigger:** Adding a single "seed crystal" or shaking the solution causes all the excess solute to instantly crystallize out.'
                ]},

                { type: 'header', content: 'Effect of Temperature on Saturation' },
                { type: 'paragraph', content: 'This is a critical concept for crystallization. The solubility of most solids increases as temperature rises.' },
                { type: 'list', items: [
                    '**Heating:** If you heat a saturated solution, it can now dissolve MORE solute. It becomes unsaturated.',
                    '**Cooling:** If you cool a saturated solution, it can hold LESS solute. The excess solute must leave the solution, forming solid crystals (precipitation).'
                ]},
                { type: 'exam-hint', content: 'Remember: Gases are the opposite. Gases become LESS soluble as temperature increases (why fizzy drinks go flat faster when warm).' },

                { type: 'header', content: 'Factors Affecting Rate of Dissolving' },
                { type: 'list', items: [
                    '**Temperature:** Higher temp = particles move faster = more frequent collisions = faster dissolving.',
                    '**Stirring:** Moves saturated liquid away from the solid surface, allowing fresh solvent to reach it.',
                    '**Surface Area:** Powder dissolves faster than lumps because more particles are exposed to the solvent.'
                ]},

                { type: 'checkpoint', checkpoint: {
                    question: 'Which of these best describes a "Saturated Solution"?',
                    options: [
                        'A solution with no solute',
                        'A solution that can dissolve more solute',
                        'A solution containing the max solute possible at that temp',
                        'A solution that has been heated to boiling'
                    ],
                    correctIndex: 2,
                    explanation: 'Saturated means "full". It cannot hold any more solute at that specific temperature. If you add more, it will just sit at the bottom.'
                }},

                { type: 'checkpoint', checkpoint: {
                    question: 'What happens when a hot saturated solution of Copper Sulfate is cooled?',
                    options: [
                        'Nothing happens',
                        'It dissolves more solid',
                        'Blue crystals form (precipitate) because solubility decreases',
                        'It turns into a gas'
                    ],
                    correctIndex: 2,
                    explanation: 'As temperature drops, solubility decreases. The solution cannot hold the same amount of dissolved solid, so the excess turns back into solid crystals.'
                }}
            ]
        },
        {
            id: '1.5-solubility-units',
            title: '1.5C: Solubility Calculations',
            blocks: [
                { 
                    type: 'learning-objectives', 
                    items: [
                        '1.5C know what is meant by the term solubility in the units g per 100 g of solvent'
                    ]
                },
                { type: 'header', content: 'What is Solubility?' },
                { type: 'paragraph', content: 'We know that sugar dissolves in water, but sand does not. However, even for soluble substances, there is a limit to how much can dissolve. This limit is called **Solubility**.' },
                
                { type: 'key-vocab', vocabItems: [
                    { term: 'Solubility Definition', definition: 'The maximum mass of solute that dissolves in 100g of solvent at a specific temperature.' },
                    { term: 'Unit', definition: 'g per 100g of water.' }
                ]},

                { type: 'exam-hint', content: 'The unit is grams per 100g of **solvent**, NOT solution. This is a very common mistake. Read the question carefully.' },

                { type: 'header', content: 'Interactive Lab: The Solubility Calculator' },
                { type: 'paragraph', content: 'In this simulation, you are given a random amount of water. Add salt until it stops dissolving (saturation). Then, use your data to calculate the standard solubility.' },
                { type: 'simulation', simulationId: 'solubility-calc' },

                { type: 'header', content: 'Calculation Type 1: Scaling Up' },
                { type: 'paragraph', content: 'If you have data for a smaller amount of water (e.g. 25g), you must scale it up to find the value for 100g.' },
                { type: 'list', items: [
                    '**Example:** 12g of salt dissolves in 25g of water.',
                    '**Goal:** Find mass for 100g of water.',
                    '**Step 1:** How many times does 25g fit into 100g? (100 ÷ 25 = 4).',
                    '**Step 2:** Multiply the salt mass by the same factor (12g × 4 = 48g).',
                    '**Answer:** Solubility is 48g per 100g of water.'
                ]},

                { type: 'checkpoint', checkpoint: {
                    question: 'If 5g of solid dissolves in 10g of water to form a saturated solution, what is the solubility?',
                    options: [
                        '5g per 100g',
                        '10g per 100g',
                        '50g per 100g',
                        '20g per 100g'
                    ],
                    correctIndex: 2,
                    explanation: '10g of water is 1/10th of 100g. Multiply the solute mass by 10. 5g * 10 = 50g.'
                }},

                { type: 'header', content: 'Calculation Type 2: The Solution Trap' },
                { type: 'paragraph', content: 'Sometimes exam questions give you the mass of the **Solution** (Total) and the mass of the **Solute** (Solid), but NOT the mass of the Water.' },
                { type: 'list', items: [
                    '**Formula:** Mass of Solvent = Mass of Solution - Mass of Solute',
                    '**Example:** "Evaporating 25g of saturated solution produced 5g of crystals."',
                    '**Step 1:** Find mass of water. 25g (Total) - 5g (Solid) = **20g Water**.',
                    '**Step 2:** Scale up. 100g ÷ 20g = 5.',
                    '**Step 3:** Calculate Solubility. 5g Solid × 5 = **25g**.',
                    '**Answer:** 25g per 100g of water.'
                ]},

                { type: 'checkpoint', checkpoint: {
                    question: 'A student evaporates 60g of saturated solution and is left with 10g of solid. What is the solubility?',
                    options: [
                        '10g per 100g water',
                        '16.6g per 100g water',
                        '20g per 100g water',
                        '60g per 100g water'
                    ],
                    correctIndex: 2,
                    explanation: 'Mass Water = 60g - 10g = 50g. We have 10g solute in 50g water. Scale to 100g water: 10g x 2 = 20g.'
                }}
            ]
        },
        {
            id: '1.6-curves',
            title: '1.6C: Solubility Curves',
            blocks: [
                { 
                    type: 'learning-objectives', 
                    items: [
                        '1.6C understand how to plot and interpret solubility curves'
                    ]
                },
                { type: 'header', content: 'Interpreting the Graph' },
                { type: 'paragraph', content: 'A solubility curve shows how solubility changes with temperature. For most solids, solubility **increases** as temperature increases. For gases, solubility usually **decreases** as temperature increases.' },
                
                { type: 'list', items: [
                    '**On the line:** The solution is saturated.',
                    '**Below the line:** The solution is unsaturated (can dissolve more).',
                    '**Above the line:** The solution is supersaturated (unstable) or crystals will start to form.'
                ]},

                { type: 'header', content: 'Interactive: Solubility Curves & Precipitate' },
                { type: 'paragraph', content: 'Use the simulation below to explore the curves for different salts. Switch to **Calc Precipitate** mode to calculate how much solid forms when a solution is cooled.' },
                { type: 'simulation', simulationId: 'solubility-curve' },

                { type: 'header', content: 'Calculating Precipitate (Crystals)' },
                { type: 'paragraph', content: 'A common exam question asks how much solid forms (precipitates) when a solution is cooled. As the solution cools, the water can hold less solute, so the excess turns back into crystals.' },
                { type: 'list', items: [
                    '**Step 1:** Read solubility at the HIGH temperature (e.g., 80g at 60°C).',
                    '**Step 2:** Read solubility at the LOW temperature (e.g., 30g at 20°C).',
                    '**Step 3:** Subtract the difference. 80g - 30g = **50g** of solid will crystallize out.'
                ]},

                { type: 'exam-hint', content: 'Watch out for the mass of water! The graph is always for 100g of water. If the question says "in 50g of water", you calculate the value for 100g first, then HALVE your final answer.' },

                { type: 'checkpoint', checkpoint: {
                    question: 'Solubility of KNO₃ is 110g/100g at 60°C and 40g/100g at 30°C. How much crystallizes if we cool 100g of saturated solution from 60°C to 30°C?',
                    options: [
                        '150g',
                        '70g',
                        '40g',
                        '110g'
                    ],
                    correctIndex: 1,
                    explanation: 'Mass crystallized = Solubility(High) - Solubility(Low) = 110g - 40g = 70g.'
                }},

                { type: 'checkpoint', checkpoint: {
                    question: 'Why do fish die in water that gets too hot (thermal pollution)?',
                    options: [
                        'The water boils',
                        'The solubility of Oxygen gas DECREASES as temperature increases',
                        'The salt concentration increases',
                        'The acidity changes'
                    ],
                    correctIndex: 1,
                    explanation: 'Unlike solids, gases (like Oxygen) become LESS soluble in hot water. Fish suffocate due to lack of dissolved oxygen.'
                }}
            ]
        },
        {
            id: '1.7-practical',
            title: '1.7C: Core Practical - Solubility',
            blocks: [
                { 
                    type: 'learning-objectives', 
                    items: [
                        '1.7C practical: investigate the solubility of a solid in water at a specific temperature'
                    ]
                },
                { type: 'header', content: 'Objective' },
                { type: 'paragraph', content: 'To find the solubility of a solid (e.g., Ammonium Chloride or Potassium Nitrate) at different temperatures and plot a solubility curve.' },

                { type: 'header', content: 'Virtual Lab: Finding the Crystallisation Point' },
                { type: 'paragraph', content: 'Use the interactive lab below to perform the experiment. Weigh the water, dissolve the solid, and then watch carefully as it cools to find the exact temperature where crystals appear.' },
                { type: 'simulation', simulationId: 'solubility-practical' },

                { type: 'practical', content: 'Method', items: [
                    'Weigh an empty boiling tube.',
                    'Add 10g of water and weigh again to confirm mass of solvent.',
                    'Add roughly 3g of solid (solute).',
                    'Heat the tube in a water bath until all solid dissolves. Do not boil the water.',
                    'Remove the tube and place a thermometer inside.',
                    'Allow to cool slowly while stirring.',
                    '**Record the temperature** the exact moment crystals start to form. This is the saturation point.',
                    'Add more water (e.g. 5g) and repeat the heating/cooling process.'
                ]},

                { type: 'header', content: 'Analysis' },
                { type: 'paragraph', content: 'For each experiment, you know the mass of solute (fixed) and the mass of water (changing). Calculate solubility:' },
                { type: 'paragraph', content: '**Solubility = (Mass of Solute / Mass of Water) × 100**' },
                { type: 'paragraph', content: 'Plot Solubility (y-axis) against Temperature (x-axis) to draw the curve.' },

                { type: 'checkpoint', checkpoint: {
                    question: 'Why is it better to measure the temperature when crystals appear (cooling) rather than when they dissolve (heating)?',
                    options: [
                        'It is faster',
                        'Heating is dangerous',
                        'It is easier to see the exact moment crystals appear (cloudiness) than the moment the last grain disappears',
                        'Thermometers only work when cooling'
                    ],
                    correctIndex: 2,
                    explanation: 'Dissolving can be slow and hard to judge (when does the last spec disappear?). Determining the "cloud point" on cooling is much sharper and more reproducible.'
                }}
            ]
        }
      ]
    },
    {
        id: 'topic-1b',
        title: '1(b) Elements, Compounds & Mixtures',
        lessons: [
            {
                id: '1.8-classifying',
                title: '1.8: Classifying Substances',
                blocks: [
                    { 
                        type: 'learning-objectives', 
                        items: [
                            '1.8 understand how to classify a substance as an element, compound or mixture'
                        ]
                    },
                    { type: 'header', content: 'Pure Substances vs Mixtures' },
                    { type: 'paragraph', content: 'In Chemistry, we classify matter into two broad categories: Pure Substances and Mixtures.' },
                    
                    { type: 'key-vocab', vocabItems: [
                        { term: 'Element', definition: 'Substance made of only one type of atom. Cannot be split into anything simpler chemically (e.g., Gold, Oxygen).' },
                        { term: 'Compound', definition: 'Substance made of two or more different elements chemically bonded together in fixed proportions (e.g., Water H₂O).' },
                        { term: 'Mixture', definition: 'Two or more substances (elements or compounds) mixed together but not chemically bonded. Can be separated physically (e.g., Air, Salt Water).' }
                    ]},

                    { type: 'header', content: 'Interactive Lab: Matter Sorter' },
                    { type: 'paragraph', content: 'Drag the particles into the correct bin. Pay attention to whether atoms are the same (Element) or different (Compound), and if they are bonded or just mixed.' },
                    { type: 'simulation', simulationId: 'matter-sorter' },

                    { type: 'header', content: 'Diatomic Molecules (Mnemonics)' },
                    { type: 'paragraph', content: 'Some elements never exist as single atoms. They always travel in pairs. You must memorize these 7 elements.' },
                    { type: 'exam-hint', content: 'Use the mnemonic: **"Have No Fear Of Ice Cold Beer"**' },
                    { type: 'list', items: [
                        '**Have** - Hydrogen (H₂)',
                        '**No** - Nitrogen (N₂)',
                        '**Fear** - Fluorine (F₂)',
                        '**Of** - Oxygen (O₂)',
                        '**Ice** - Iodine (I₂)',
                        '**Cold** - Chlorine (Cl₂)',
                        '**Beer** - Bromine (Br₂)'
                    ]},

                    { type: 'header', content: 'Homogeneous vs Heterogeneous Mixtures' },
                    { type: 'paragraph', content: 'Mixtures can be further classified by how well they are mixed.' },
                    { type: 'simulation', simulationId: 'mixture-types' },
                    { type: 'list', items: [
                        '**Homogeneous (Solutions):** The mixture looks the same throughout. You cannot see the separate parts (e.g., Salt water, Air).',
                        '**Heterogeneous (Suspensions):** You can see the separate parts. It is not uniform (e.g., Sand in water, Oil and vinegar).'
                    ]},

                    { type: 'header', content: 'Knowledge Checkpoint' },
                    { type: 'checkpoint', checkpoint: {
                        question: 'Air contains Nitrogen, Oxygen, Argon, and CO₂. Is Air an element, compound, or mixture?',
                        options: ['Element', 'Compound', 'Mixture', 'Pure Substance'],
                        correctIndex: 2,
                        explanation: 'Air is a mixture. The gases are not chemically bonded to each other and can be separated physically.'
                    }},
                    { type: 'checkpoint', checkpoint: {
                        question: 'Water (H₂O) is made of Hydrogen and Oxygen. Is it a mixture?',
                        options: ['Yes, because it has two elements', 'No, it is an element', 'No, it is a compound', 'Yes, because it is a liquid'],
                        correctIndex: 2,
                        explanation: 'Water is a compound. The elements are chemically bonded in a fixed ratio (2:1).'
                    }},
                    { type: 'checkpoint', checkpoint: {
                        question: 'Which of the following is a diatomic element?',
                        options: ['Helium', 'Chlorine', 'Carbon', 'Sodium'],
                        correctIndex: 1,
                        explanation: 'Chlorine (Cl₂) is diatomic ("Ice Cold Beer"). Helium is a noble gas (monatomic). Carbon and Sodium exist as giant structures or metallic lattices.'
                    }},
                    { type: 'checkpoint', checkpoint: {
                        question: 'What is the key difference between a mixture of Iron+Sulfur and the compound Iron Sulfide?',
                        options: ['The compound can be separated with a magnet', 'The mixture requires heat to form', 'In the mixture, iron retains its magnetic properties', 'They are the same'],
                        correctIndex: 2,
                        explanation: 'In a mixture, elements keep their own properties (Iron is still magnetic). In a compound, new properties are formed (Iron Sulfide is not magnetic).'
                    }},
                    { type: 'checkpoint', checkpoint: {
                        question: 'Brass is an alloy of Copper and Zinc. Is it a compound?',
                        options: ['Yes, metals bond chemically', 'No, alloys are mixtures of metals', 'Yes, it has a formula', 'No, it is an element'],
                        correctIndex: 1,
                        explanation: 'Alloys are mixtures. The metal atoms are mixed in the lattice but not chemically bonded in fixed proportions.'
                    }},
                    { type: 'checkpoint', checkpoint: {
                        question: 'Which diagram represents a pure compound?',
                        options: ['Different colored atoms floating separately', 'Same colored atoms bonded in pairs', 'Different colored atoms bonded together, all identical', 'Different molecules mixed together'],
                        correctIndex: 2,
                        explanation: 'A pure compound consists of only one type of molecule, made of different atoms bonded together.'
                    }},
                    { type: 'checkpoint', checkpoint: {
                        question: 'Is orange juice with pulp homogeneous or heterogeneous?',
                        options: ['Homogeneous', 'Heterogeneous', 'Pure Substance', 'Element'],
                        correctIndex: 1,
                        explanation: 'It is heterogeneous because you can see the separate pulp particles floating in the liquid.'
                    }},
                    { type: 'checkpoint', checkpoint: {
                        question: 'Which technique is used to separate a mixture based on boiling points?',
                        options: ['Filtration', 'Distillation', 'Magnetism', 'Chromatography'],
                        correctIndex: 1,
                        explanation: 'Distillation utilizes differences in boiling points to separate liquids.'
                    }},
                    { type: 'checkpoint', checkpoint: {
                        question: 'Is O₃ (Ozone) an element or compound?',
                        options: ['Element', 'Compound', 'Mixture', 'Ion'],
                        correctIndex: 0,
                        explanation: 'It is an element because it is made of only one type of atom (Oxygen), even though there are 3 of them.'
                    }},
                    { type: 'checkpoint', checkpoint: {
                        question: 'Why do we call tap water a mixture?',
                        options: ['It contains H and O', 'It contains dissolved minerals and chlorine', 'It is a liquid', 'It is pure'],
                        correctIndex: 1,
                        explanation: 'Tap water is not just H₂O; it has dissolved salts, minerals, and often chlorine added to it.'
                    }}
                ]
            },
            {
                id: '1.9-purity',
                title: '1.9: Purity & Melting Points',
                blocks: [
                    { 
                        type: 'learning-objectives', 
                        items: [
                            '1.9 understand that a pure substance has a fixed melting and boiling point, but that a mixture may melt or boil over a range of temperatures'
                        ]
                    },
                    { type: 'header', content: 'Scientific Purity vs Everyday Purity' },
                    { type: 'paragraph', content: 'In everyday life, "pure" often means natural or clean (e.g. Pure Orange Juice). In Chemistry, it has a precise definition.' },
                    { type: 'key-vocab', vocabItems: [
                        { term: 'Pure Substance', definition: 'Consists of only ONE type of element or compound. Nothing else is mixed in.' },
                        { term: 'Impure Substance', definition: 'A mixture containing more than one substance.' }
                    ]},

                    { type: 'header', content: 'Testing for Purity' },
                    { type: 'paragraph', content: 'The easiest way to tell if a substance is pure is to measure its **Melting Point** or **Boiling Point**.' },
                    
                    { type: 'list', items: [
                        '**Pure:** Melts and boils at a **sharp, specific temperature**. (e.g. Pure water boils at exactly 100°C).',
                        '**Impure (Mixture):** Melts and boils over a **range of temperatures**. (e.g. Salt water boils at 100°C - 104°C).'
                    ]},

                    { type: 'header', content: 'Interactive Lab: Melting Point Test' },
                    { type: 'paragraph', content: 'Use the oil bath apparatus below to determine if Samples A, B, and C are pure. Watch the heating curve graph carefully.' },
                    { type: 'simulation', simulationId: 'melting-point' },

                    { type: 'header', content: 'Effects of Impurities' },
                    { type: 'paragraph', content: 'Adding an impurity has two main effects on melting/boiling points:' },
                    { type: 'list', items: [
                        '**Melting Point DECREASES:** Impurities disrupt the regular lattice arrangement, making it easier to melt (requires less energy).',
                        '**Boiling Point INCREASES:** Impurities attract the solvent molecules, making it harder for them to escape as gas (requires more energy).'
                    ]},

                    { type: 'header', content: 'Real World Application: Salting Roads' },
                    { type: 'paragraph', content: 'In winter, we put salt on icy roads. Why? Salt is an impurity. Adding it to water (ice) **lowers the melting point** of the ice (e.g., to -5°C). This causes the ice to melt even if the air temperature is below freezing (0°C).' },

                    { type: 'header', content: 'Heating Curves of Mixtures' },
                    { type: 'paragraph', content: 'If you plot a heating curve for a **pure** substance, the line is perfectly flat (horizontal) during melting. For an **impure** substance (mixture), the line is slanted or curved during the state change because the composition of the liquid changes as it melts.' },

                    { type: 'checkpoint', checkpoint: {
                        question: 'A solid sample melts between 125°C and 132°C. What can you conclude?',
                        options: ['It is a pure substance', 'It is a mixture (impure)', 'The thermometer is broken', 'It is a compound'],
                        correctIndex: 1,
                        explanation: 'Pure substances melt at a sharp, single temperature. A melting range (125-132°C) indicates the presence of impurities.'
                    }},

                    { type: 'checkpoint', checkpoint: {
                        question: 'How does adding salt affect the boiling point of water?',
                        options: ['Lowers it', 'Raises it', 'No change', 'Makes it boil instantly'],
                        correctIndex: 1,
                        explanation: 'Impurities raise the boiling point. Salt water boils above 100°C.'
                    }},

                    { type: 'checkpoint', checkpoint: {
                        question: 'Which graph line represents a pure substance melting?',
                        options: ['A sloped line going up', 'A perfectly horizontal flat line', 'A curved line', 'A zig-zag line'],
                        correctIndex: 1,
                        explanation: 'During the phase change of a pure substance, temperature remains constant (flat line) until the change is complete.'
                    }}
                ]
            },
            {
                id: '1.10-separation',
                title: '1.10: Separation Techniques',
                blocks: [
                    { 
                        type: 'learning-objectives', 
                        items: [
                            '1.10 describe these experimental techniques for the separation of mixtures: simple distillation, fractional distillation, filtration, crystallisation, paper chromatography'
                        ]
                    },
                    { type: 'key-vocab', vocabItems: [
                        { term: 'Filtrate', definition: 'The liquid that passes through the filter paper.' },
                        { term: 'Residue', definition: 'The solid that stays on the filter paper.' },
                        { term: 'Distillate', definition: 'The pure liquid collected after distillation.' },
                        { term: 'Miscible', definition: 'Liquids that mix completely with each other (e.g., Water and Ethanol).' },
                        { term: 'Immiscible', definition: 'Liquids that do not mix (e.g., Oil and Water).' }
                    ]},
                    
                    { type: 'header', content: 'Method 1: Filtration & Crystallisation' },
                    { type: 'paragraph', content: 'This two-step process separates a mixture containing an **insoluble solid** (e.g., Sand) and a **soluble solid** (e.g., Salt) mixed in water.' },
                    
                    { type: 'list', items: [
                        '**Step 1 - Dissolve:** Add water. Salt dissolves, Sand does not.',
                        '**Step 2 - Filter:** Pour through filter paper. **Sand (Residue)** stays on paper. **Salt Water (Filtrate)** passes through.',
                        '**Step 3 - Wash:** Rinse the sand with distilled water to remove any remaining salt solution.',
                        '**Step 4 - Crystallise:** Heat filtrate to evaporate water until saturation point. Cool slowly to form salt crystals.'
                    ]},

                    { type: 'exam-hint', content: 'Students often forget the **washing** step. Washing the residue ensures all valuable soluble product is collected in the filtrate and the residue is pure.' },

                    { type: 'simulation', simulationId: 'filtration' },

                    { type: 'header', content: 'Method 2: Simple Distillation' },
                    { type: 'paragraph', content: 'Used to separate a **Liquid (Solvent)** from a **Solution**. Example: Getting pure water from seawater or ink.' },
                    
                    { type: 'list', items: [
                        '**Boiling:** The solution is heated. The solvent boils and turns to vapor. The solute (e.g., salt) has a high boiling point and stays behind.',
                        '**Condensing:** The vapor travels into the Liebig Condenser. The cold water jacket cools the vapor back into a liquid.',
                        '**Collecting:** The pure liquid drips into the beaker as the **distillate**.'
                    ]},

                    { type: 'header', content: 'Interactive: Simple Distillation' },
                    { type: 'paragraph', content: 'Click "Start Heating" to see the process in action. Notice how the thermometer reading stays constant at the boiling point (100°C) while the water distills over.' },
                    { type: 'simulation', simulationId: 'simple-distillation' },

                    { type: 'exam-hint', content: 'Water enters the condenser at the **bottom** and leaves at the **top**. This ensures the condenser jacket is always full of cold water for efficient cooling.' },

                    { type: 'header', content: 'Method 3: Fractional Distillation' },
                    { type: 'paragraph', content: 'Used to separate a mixture of **Miscible Liquids** with different boiling points. Example: Ethanol (BP 78°C) and Water (BP 100°C).' },
                    
                    { type: 'list', items: [
                        '**Apparatus:** Similar to simple distillation but includes a **Fractionating Column** packed with glass beads.',
                        '**Process:** The vapor rises up the column. The liquid with the LOWER boiling point reaches the top first. The higher boiling point liquid condenses on the beads and drips back down.',
                        '**Result:** Pure ethanol is collected first. When the thermometer hits 100°C, change the beaker to collect water.'
                    ]},

                    { type: 'checkpoint', checkpoint: {
                        question: 'Which method would you use to obtain pure water from salt water?',
                        options: ['Filtration', 'Crystallisation', 'Simple Distillation', 'Fractional Distillation'],
                        correctIndex: 2,
                        explanation: 'Filtration removes insoluble solids. Crystallisation gets the salt but loses the water. Simple distillation captures the water.'
                    }},

                    { type: 'checkpoint', checkpoint: {
                        question: 'Where should the cold water enter the Liebig condenser?',
                        options: ['At the top', 'At the bottom', 'It does not matter', 'In the middle'],
                        correctIndex: 1,
                        explanation: 'Entering at the bottom ensures the jacket fills completely against gravity, maximizing cooling efficiency.'
                    }},
                    
                    { type: 'checkpoint', checkpoint: {
                        question: 'What is the purpose of the fractionating column?',
                        options: ['To look cool', 'To increase surface area for condensation', 'To filter solids', 'To heat the gas'],
                        correctIndex: 1,
                        explanation: 'The glass beads provide surface area for vapors to condense and re-evaporate, improving separation efficiency.'
                    }}
                ]
            },
            {
                id: '1.11-chromatography-setup',
                title: '1.11: Paper Chromatography Setup',
                blocks: [
                    { 
                        type: 'learning-objectives', 
                        items: [
                            '1.11 describe the use of paper chromatography to separate mixtures'
                        ]
                    },
                    { type: 'header', content: 'Setting up the Experiment' },
                    { type: 'paragraph', content: 'Chromatography is used to separate mixtures of soluble substances, such as food colourings, inks, or dyes. To get accurate results, the setup must be precise.' },
                    
                    { type: 'practical', content: 'Method: The Rules', items: [
                        '**Baseline:** Draw a line in **pencil** about 1-2 cm from the bottom of the chromatography paper.',
                        '**Spotting:** Place small spots of the inks on the pencil line.',
                        '**Tank:** Pour a small amount of solvent (e.g., water) into a beaker.',
                        '**Level:** The solvent level must be **BELOW** the pencil line.',
                        '**Seal:** Place a lid on top to prevent solvent evaporation.',
                        '**Run:** Let the solvent travel up the paper, carrying the dyes.'
                    ]},

                    { type: 'header', content: 'Interactive Lab: Build the Setup' },
                    { type: 'paragraph', content: 'Build the apparatus correctly below. Choose the right materials and levels. If you make a mistake (like using a pen), the experiment will fail!' },
                    { type: 'simulation', simulationId: 'chromatography-setup' },

                    { type: 'exam-hint', content: 'Why Pencil? Graphite is insoluble in water. If you use ink, the line itself will dissolve and run up the paper, confusing the results.' },
                    { type: 'exam-hint', content: 'Why Solvent Below Line? If the solvent is above the line, the ink spots will dissolve directly into the liquid in the beaker instead of traveling up the paper.' },

                    { type: 'checkpoint', checkpoint: {
                        question: 'Why must the baseline be drawn in pencil?',
                        options: [
                            'It is cheaper',
                            'It is easier to erase',
                            'It is insoluble and won\'t move with the solvent',
                            'It looks neater'
                        ],
                        correctIndex: 2,
                        explanation: 'Pencil lead (graphite) is insoluble. An ink pen would dissolve and ruin the chromatogram.'
                    }}
                ]
            },
            {
                id: '1.12-interpreting',
                title: '1.12: Interpreting Chromatograms',
                blocks: [
                    { 
                        type: 'learning-objectives', 
                        items: [
                            '1.12 understand how to interpret a chromatogram'
                        ]
                    },
                    { type: 'header', content: 'Reading the Results' },
                    { type: 'paragraph', content: 'Once the solvent has moved near the top, we remove the paper and let it dry. The resulting pattern is called a **Chromatogram**.' },
                    
                    { type: 'list', items: [
                        '**Pure Substance:** Separates into only **one spot**.',
                        '**Mixture:** Separates into **two or more spots**.',
                        '**Insoluble Substance:** Stays on the baseline.'
                    ]},

                    { type: 'header', content: 'Interactive: Run the Chromatogram' },
                    { type: 'paragraph', content: 'Run the simulation to separate "Mixture M". Does it contain Dye A or Dye B? Watch how the different components move at different speeds.' },
                    { type: 'simulation', simulationId: 'chromatography-run' },

                    { type: 'header', content: 'Identifying Components' },
                    { type: 'paragraph', content: 'We can identify the components of a mixture by comparing them to known pure substances run on the same paper. If spots are at the **same height** and have the **same colour**, they are likely the same substance.' },

                    { type: 'checkpoint', checkpoint: {
                        question: 'A mixture separates into three distinct spots. Is it pure?',
                        options: [
                            'Yes',
                            'No, it is impure',
                            'Impossible to tell',
                            'It depends on the solvent'
                        ],
                        correctIndex: 1,
                        explanation: 'A pure substance produces exactly one spot. Multiple spots indicate a mixture (impure).'
                    }}
                ]
            },
            {
                id: '1.13-rf-values',
                title: '1.13: Rf Values',
                blocks: [
                    { 
                        type: 'learning-objectives', 
                        items: [
                            '1.13 calculate Rf values from a chromatogram'
                        ]
                    },
                    { type: 'header', content: 'The Retardation Factor (Rf)' },
                    { type: 'paragraph', content: 'We can identify substances scientifically using the Rf value. This value is a ratio that is constant for a specific compound in a specific solvent.' },
                    
                    { type: 'paragraph', content: '$$ R_f = \\frac{\\text{Distance moved by spot}}{\\text{Distance moved by solvent}} $$' },

                    { type: 'header', content: 'Interactive Lab: Measure Rf' },
                    { type: 'paragraph', content: 'Use the tool below to measure the distances on the chromatogram. Toggle the measurements, calculate the Rf value, and input it to check your answer.' },
                    { type: 'simulation', simulationId: 'chromatography-rf' },

                    { type: 'exam-hint', content: 'Measurements must be taken from the **baseline** (pencil line) to the **center** of the spot. The Rf value is always less than 1.' },

                    { type: 'header', content: 'Why do substances move differently?' },
                    { type: 'paragraph', content: 'Separation depends on the balance between:' },
                    { type: 'list', items: [
                        '**Solubility** in the mobile phase (solvent). More soluble = Moves faster/further.',
                        '**Attraction** to the stationary phase (paper). More attraction = Moves slower/less distance.'
                    ]},

                    { type: 'checkpoint', checkpoint: {
                        question: 'A spot moves 4cm and the solvent moves 10cm. What is the Rf?',
                        options: [
                            '0.4',
                            '2.5',
                            '40',
                            '0.25'
                        ],
                        correctIndex: 0,
                        explanation: 'Rf = Distance moved by spot / Distance moved by solvent = 4 / 10 = 0.4.'
                    }},
                    { type: 'checkpoint', checkpoint: {
                        question: 'Which substance travels the furthest up the paper?',
                        options: [
                            'The one most attracted to the paper',
                            'The one least soluble in the solvent',
                            'The one most soluble in the solvent',
                            'The heaviest one'
                        ],
                        correctIndex: 2,
                        explanation: 'Substances that are highly soluble in the solvent stay in the mobile phase longer and travel further up the paper.'
                    }}
                ]
            }
        ]
    },
    {
        id: 'topic-1c',
        title: '1(c) Atomic Structure',
        lessons: [
            {
                id: '1.14-atoms',
                title: '1.14: Atoms & Molecules',
                blocks: [
                    { type: 'learning-objectives', items: [
                        '1.14 know what is meant by the terms atom and molecule'
                    ]},
                    { type: 'header', content: 'Atoms' },
                    { type: 'paragraph', content: 'An **Atom** is the smallest part of an element that can exist. All matter is made of atoms.' },
                    { type: 'header', content: 'Molecules' },
                    { type: 'paragraph', content: 'A **Molecule** is a particle made of two or more atoms chemically bonded together. They can be atoms of the same element (like O₂) or different elements (like CO₂).' },
                    { type: 'checkpoint', checkpoint: {
                        question: 'Which of these is a molecule but NOT a compound?',
                        options: ['CO₂', 'H₂O', 'O₂', 'He'],
                        correctIndex: 2,
                        explanation: 'O₂ is a molecule because it has two atoms bonded. It is not a compound because the atoms are the same element.'
                    }}
                ]
            },
            {
                id: '1.15-structure',
                title: '1.15: Sub-atomic Particles',
                blocks: [
                    { type: 'learning-objectives', items: [
                        '1.15 know the structure of an atom in terms of the positions, relative masses and relative charges of sub-atomic particles'
                    ]},
                    { type: 'header', content: 'Inside the Atom' },
                    { type: 'paragraph', content: 'Atoms are made of three sub-atomic particles: Protons, Neutrons, and Electrons.' },
                    { type: 'list', items: [
                        '**Proton:** Charge +1, Mass 1. Position: Nucleus.',
                        '**Neutron:** Charge 0, Mass 1. Position: Nucleus.',
                        '**Electron:** Charge -1, Mass 1/1840 (Negligible). Position: Shells.'
                    ]},
                    { type: 'checkpoint', checkpoint: {
                        question: 'Where is most of the mass of an atom located?',
                        options: ['In the shells', 'In the nucleus', 'Evenly distributed', 'In the electrons'],
                        correctIndex: 1,
                        explanation: 'Protons and Neutrons have mass 1, while electrons have negligible mass. Since protons/neutrons are in the nucleus, that is where the mass is.'
                    }}
                ]
            },
            {
                id: '1.16a-atomic-number',
                title: '1.16: Atomic & Mass Numbers',
                blocks: [
                    { type: 'learning-objectives', items: [
                        '1.16 know what is meant by the terms atomic number and mass number'
                    ]},
                    { type: 'key-vocab', vocabItems: [
                        { term: 'Atomic Number', definition: 'The number of Protons in the nucleus. This defines the element.' },
                        { term: 'Mass Number', definition: 'The total number of Protons + Neutrons.' }
                    ]},
                    { type: 'paragraph', content: 'Since atoms are neutral, the number of **Electrons** equals the number of **Protons**.' },
                    { type: 'header', content: 'Calculating Neutrons' },
                    { type: 'paragraph', content: 'Number of Neutrons = Mass Number - Atomic Number.' },
                    { type: 'checkpoint', checkpoint: {
                        question: 'Sodium has Mass Number 23 and Atomic Number 11. How many neutrons does it have?',
                        options: ['11', '12', '23', '34'],
                        correctIndex: 1,
                        explanation: 'Neutrons = Mass (23) - Atomic (11) = 12.'
                    }}
                ]
            },
            {
                id: '1.16b-isotopes',
                title: '1.16: Isotopes',
                blocks: [
                    { type: 'learning-objectives', items: [
                        '1.16 know what is meant by the term isotopes'
                    ]},
                    { type: 'paragraph', content: '**Isotopes** are atoms of the same element that have the **same number of protons** but a **different number of neutrons**.' },
                    { type: 'list', items: [
                        'Same Atomic Number (same element).',
                        'Different Mass Number.',
                        'Same chemical properties (because they have the same electron configuration).'
                    ]},
                    { type: 'checkpoint', checkpoint: {
                        question: 'Why do isotopes have the same chemical properties?',
                        options: ['Same number of neutrons', 'Different masses', 'Same number of electrons in outer shell', 'They are radioactive'],
                        correctIndex: 2,
                        explanation: 'Chemical reactions depend on electrons. Since isotopes have the same number of electrons, they react in the same way.'
                    }}
                ]
            },
            {
                id: '1.17-ar',
                title: '1.17: Relative Atomic Mass (Ar)',
                blocks: [
                    { type: 'learning-objectives', items: [
                        '1.17 calculate the relative atomic mass of an element from isotopic abundances'
                    ]},
                    { type: 'paragraph', content: 'The Relative Atomic Mass ($A_r$) is the weighted average mass of the isotopes of the element.' },
                    { type: 'header', content: 'Calculation Formula' },
                    { type: 'paragraph', content: '$$ A_r = \\frac{(\\%_1 \\times \\text{Mass}_1) + (\\%_2 \\times \\text{Mass}_2)}{100} $$' },
                    { type: 'paragraph', content: '**Example:** Chlorine is 75% ³⁵Cl and 25% ³⁷Cl.' },
                    { type: 'paragraph', content: '$$ A_r = \\frac{(75 \\times 35) + (25 \\times 37)}{100} = 35.5 $$' },
                    { type: 'checkpoint', checkpoint: {
                        question: 'Calculate the Ar of Boron given: 20% is Boron-10 and 80% is Boron-11.',
                        options: ['10.2', '10.5', '10.8', '11.0'],
                        correctIndex: 2,
                        explanation: '((20 * 10) + (80 * 11)) / 100 = (200 + 880) / 100 = 1080 / 100 = 10.8'
                    }}
                ]
            }
        ]
    },
    {
        id: 'topic-1d',
        title: '1(d) The Periodic Table',
        lessons: [
            {
                id: '1.18-periodic-table',
                title: '1.18: Arrangement',
                blocks: [
                    { type: 'learning-objectives', items: [
                        '1.18 understand how elements are arranged in the Periodic Table: in order of atomic number, in groups and periods'
                    ]},
                    { type: 'paragraph', content: 'The Periodic Table arranges all known elements in order of increasing **Atomic Number**.' },
                    { type: 'list', items: [
                        '**Groups (Vertical Columns):** Elements have the same number of outer electrons. They have similar chemical properties.',
                        '**Periods (Horizontal Rows):** Elements have the same number of electron shells.'
                    ]},
                    { type: 'checkpoint', checkpoint: {
                        question: 'What do elements in Group 2 have in common?',
                        options: ['2 electron shells', '2 protons', '2 electrons in the outer shell', 'Mass number of 2'],
                        correctIndex: 2,
                        explanation: 'The Group number tells you the number of valence (outer) electrons.'
                    }}
                ]
            },
            {
                id: '1.19-configurations',
                title: '1.19: Electronic Configurations',
                blocks: [
                    { type: 'learning-objectives', items: [
                        '1.19 understand how to deduce the electronic configurations of the first 20 elements from their positions in the Periodic Table'
                    ]},
                    { type: 'paragraph', content: 'Electrons orbit the nucleus in shells. Shells fill from the inside out.' },
                    { type: 'list', items: [
                        '**1st Shell:** Holds max 2 electrons',
                        '**2nd Shell:** Holds max 8 electrons',
                        '**3rd Shell:** Holds max 8 electrons (for GCSE simplifications)'
                    ]},
                    { type: 'paragraph', content: 'Example: Magnesium (Atomic No. 12) has 12 electrons. Config: **2.8.2**.' },
                    { type: 'checkpoint', checkpoint: {
                        question: 'What is the electronic configuration of Chlorine (Atomic Number 17)?',
                        options: ['2.8.1', '2.8.7', '2.8.8', '2.7.8'],
                        correctIndex: 1,
                        explanation: '17 electrons: 2 in first, 8 in second, remaining 7 in third shell.'
                    }}
                ]
            },
            {
                id: '1.20-metals',
                title: '1.20: Metals vs Non-Metals',
                blocks: [
                    { type: 'learning-objectives', items: [
                        '1.20 understand how to classify elements as metals or non-metals using their electrical conductivity and the acid-base character of their oxides'
                    ]},
                    { type: 'paragraph', content: 'We can distinguish metals from non-metals by their physical and chemical properties.' },
                    { type: 'list', items: [
                        '**Metals:** Conduct electricity. Form **Basic Oxides** (e.g. MgO). Found on the left side of the Periodic Table.',
                        '**Non-Metals:** Do not conduct electricity (insulators), except graphite. Form **Acidic Oxides** (e.g. SO₂, CO₂). Found on the right side.'
                    ]},
                    { type: 'checkpoint', checkpoint: {
                        question: 'An element forms an oxide that dissolves in water to make an acidic solution. Is it a metal or non-metal?',
                        options: ['Metal', 'Non-Metal', 'Metalloid', 'Noble Gas'],
                        correctIndex: 1,
                        explanation: 'Non-metal oxides are acidic (think Acid Rain from SO₂). Metal oxides are basic.'
                    }}
                ]
            },
            {
                id: '1.21-group-trends',
                title: '1.21: Group Properties',
                blocks: [
                    { type: 'learning-objectives', items: [
                        '1.21 understand why elements in the same group of the Periodic Table have similar chemical properties'
                    ]},
                    { type: 'paragraph', content: 'Chemical reactions involve the outer electrons. Since elements in the same Group have the **same number of outer electrons**, they react in very similar ways.' },
                    { type: 'paragraph', content: 'Example: Lithium (2.1) and Sodium (2.8.1) both lose 1 electron to react. They are both in Group 1.' },
                    { type: 'checkpoint', checkpoint: {
                        question: 'Why do Fluorine and Chlorine have similar reactions?',
                        options: ['They are both gases', 'They both have 7 outer electrons', 'They are in different periods', 'They have different masses'],
                        correctIndex: 1,
                        explanation: 'They are both in Group 7, meaning they both need to gain 1 electron to fill their shell.'
                    }}
                ]
            },
            {
                id: '1.22-noble-gases',
                title: '1.22: Noble Gases',
                blocks: [
                    { type: 'learning-objectives', items: [
                        '1.22 understand why noble gases (Group 0) do not readily react'
                    ]},
                    { type: 'paragraph', content: 'Group 0 elements (Helium, Neon, Argon) are called **Noble Gases**.' },
                    { type: 'paragraph', content: 'They are unreactive (inert) because they have a **full outer shell** of electrons. They do not need to lose, gain, or share electrons to become stable.' },
                    { type: 'checkpoint', checkpoint: {
                        question: 'Argon is used in light bulbs because it is...',
                        options: ['Flammable', 'Unreactive (Inert)', 'Toxic', 'A metal'],
                        correctIndex: 1,
                        explanation: 'Argon does not react with the hot filament, preventing it from burning out.'
                    }}
                ]
            }
        ]
    },
    {
        id: 'topic-1e',
        title: '1(e) Chemical Formulae',
        lessons: [
            {
                id: '1.25-formulae',
                title: '1.25: Writing Formulae',
                blocks: [
                    { type: 'paragraph', content: 'To write formulae for ionic compounds, you must balance the positive and negative charges to zero.' },
                    { type: 'list', items: [
                        '**Group 1 Metals:** +1 charge (e.g., Na⁺)',
                        '**Group 2 Metals:** +2 charge (e.g., Mg²⁺)',
                        '**Group 7 Halogens:** -1 charge (e.g., Cl⁻)',
                        '**Complex Ions:** Nitrate (NO₃⁻), Sulfate (SO₄²⁻), Carbonate (CO₃²⁻), Hydroxide (OH⁻), Ammonium (NH₄⁺)'
                    ]},
                    { type: 'simulation', simulationId: 'ionic-master' },
                    { type: 'exam-hint', content: 'Don\'t forget brackets for polyatomic ions if there is more than one! e.g. Mg(NO₃)₂' }
                ]
            },
            {
                id: '1.26-moles',
                title: '1.26 - 1.30: Moles & Calculations',
                blocks: [
                    { type: 'key-vocab', vocabItems: [
                        { term: 'Mole', definition: 'The unit for amount of substance. 1 mol = 6.02 x 10²³ particles.' },
                        { term: 'Molar Mass (Mr)', definition: 'Sum of relative atomic masses in the formula.' }
                    ]},
                    { type: 'header', content: 'Key Equations' },
                    { type: 'list', items: [
                        'Moles = Mass / Mr',
                        'Concentration = Moles / Volume (dm³)',
                        'Moles (Gas) = Volume (dm³) / 24'
                    ]},
                    { type: 'checkpoint', checkpoint: {
                        question: 'Calculate moles in 10g of Calcium Carbonate (CaCO₃). Ar: Ca=40, C=12, O=16.',
                        options: [
                            '0.01 mol',
                            '0.1 mol',
                            '1.0 mol',
                            '10 mol'
                        ],
                        correctIndex: 1,
                        explanation: 'Mr = 40 + 12 + (16x3) = 100. Moles = 10 / 100 = 0.1 mol.'
                    }}
                ]
            },
            {
                id: '1.31-empirical',
                title: '1.31 - 1.36: Formula Calculations',
                blocks: [
                    { type: 'paragraph', content: '**Empirical Formula:** The simplest whole number ratio of atoms in a compound. **Molecular Formula:** The actual number of atoms.' },
                    { type: 'practical', content: 'Find Formula of Magnesium Oxide', items: [
                        'Weigh empty crucible + lid.',
                        'Add Mg ribbon and weigh again.',
                        'Heat the tube in a water bath until all solid dissolves. Do not boil the water.',
                        'Weigh final product (MgO).',
                        'Calculate mass of O added. Find mole ratio of Mg to O.'
                    ]}
                ]
            }
        ]
    },
    {
        id: 'topic-2a',
        title: '2(a) Reactivity Series',
        lessons: [
            {
                id: '2.1-reactivity',
                title: '2.1 - 2.7: Metals & Rusting',
                blocks: [
                    { type: 'paragraph', content: 'Metals are arranged by reactivity. A more reactive metal displaces a less reactive metal from its compound.' },
                    { type: 'header', content: 'The Series' },
                    { type: 'list', items: [
                        '**Most Reactive:** Potassium, Sodium, Lithium, Calcium',
                        '**Medium:** Magnesium, Aluminum, Zinc, Iron',
                        '**Least:** Copper, Silver, Gold'
                    ]},
                    { type: 'header', content: 'Rusting' },
                    { type: 'paragraph', content: 'Iron rusts when exposed to **Water** AND **Oxygen**. Methods to prevent rusting:' },
                    { type: 'list', items: [
                        '**Barrier:** Painting, Oiling (stops water/air reaching iron).',
                        '**Galvanising:** Coating in Zinc.',
                        '**Sacrificial Protection:** Attaching blocks of Zinc. Zinc is more reactive than Iron, so it oxidizes (sacrifices itself) first.'
                    ]},
                    { type: 'checkpoint', checkpoint: {
                        question: 'Why does Zinc protect Iron from rusting?',
                        options: [
                            'Zinc is harder than Iron',
                            'Zinc forms a waterproof layer only',
                            'Zinc is more reactive and loses electrons in preference to Iron',
                            'Zinc is less reactive than Iron'
                        ],
                        correctIndex: 2,
                        explanation: 'Zinc is more reactive. It oxidizes (loses electrons) more easily than Iron, preventing the Iron from oxidizing.'
                    }}
                ]
            }
        ]
    }
  ],
  mockExam: [
    {
      id: 'm1',
      question: 'Which technique separates a soluble solid from a solution?',
      options: ['Filtration', 'Crystallisation', 'Chromatography', 'Distillation'],
      correctIndex: 1,
      explanation: 'Crystallisation evaporates the solvent to leave the soluble solid crystals behind.'
    },
    {
      id: 'm2',
      question: 'What is the electronic configuration of Chlorine (Atomic Number 17)?',
      options: ['2.8.1', '2.8.7', '2.8.8', '2.7.8'],
      correctIndex: 1,
      explanation: '17 electrons fill as 2 in first shell, 8 in second, leaving 7 for the outer shell.'
    },
    {
      id: 'm3',
      question: 'Which gas diffuses faster: Ammonia (Mr 17) or Hydrogen Chloride (Mr 36.5)?',
      options: ['Ammonia', 'Hydrogen Chloride', 'Both same speed', 'Neither diffuses'],
      correctIndex: 0,
      explanation: 'Ammonia has a lower molar mass (lighter particles), so at the same temperature, it diffuses faster.'
    },
    {
      id: 'm4',
      question: 'What is the colour of Methyl Orange in acid?',
      options: ['Yellow', 'Blue', 'Red', 'Colourless'],
      correctIndex: 2,
      explanation: 'Methyl Orange is Red in acidic solutions and Yellow in alkaline solutions.'
    }
  ]
};
