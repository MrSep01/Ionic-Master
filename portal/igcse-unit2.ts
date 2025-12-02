
import { Unit } from './types';

export const IGCSE_UNIT_2: Unit = {
  id: 'igcse-chem-unit2',
  title: 'Unit 2: Inorganic Chemistry',
  description: 'Group chemistry, atmospheric gases, and reactivity series in depth.',
  topics: [
    {
      id: 'topic-2b',
      title: '2(b) Group 1 (Alkali Metals)',
      lessons: [
        {
          id: '2.1-alkali',
          title: 'Group 1 Elements',
          blocks: [
            { type: 'header', content: 'Properties & Trends' },
            { type: 'paragraph', content: 'Group 1 elements are soft metals that are highly reactive. Reactivity increases down the group.' },
            { type: 'checkpoint', checkpoint: {
                question: 'Why does reactivity increase down Group 1?',
                options: [
                    'Atoms get smaller',
                    'Outer electron is closer to nucleus',
                    'Outer electron is further from nucleus and less attracted',
                    'They have more protons'
                ],
                correctIndex: 2,
                explanation: 'As you go down, atoms get larger (more shells). The outer electron is further from the nucleus and shielded by inner shells, making it easier to lose.'
            }}
          ]
        }
      ]
    }
  ]
};
