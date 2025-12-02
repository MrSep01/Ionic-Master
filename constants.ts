

import { Ion, IonType, DifficultyLevel, PeriodicElement, OxyanionRule } from './types';

export const WINS_TO_ADVANCE = 5;

// --- Game Data: Ions ---

export const CATIONS: Ion[] = [
  // Group 1
  { symbol: 'H', name: 'Hydrogen', charge: 1, type: IonType.CATION, elementSymbol: 'H' },
  { symbol: 'Li', name: 'Lithium', charge: 1, type: IonType.CATION, elementSymbol: 'Li' },
  { symbol: 'Na', name: 'Sodium', charge: 1, type: IonType.CATION, elementSymbol: 'Na' },
  { symbol: 'K', name: 'Potassium', charge: 1, type: IonType.CATION, elementSymbol: 'K' },
  { symbol: 'Rb', name: 'Rubidium', charge: 1, type: IonType.CATION, elementSymbol: 'Rb' },
  { symbol: 'Cs', name: 'Cesium', charge: 1, type: IonType.CATION, elementSymbol: 'Cs' },
  // Group 2
  { symbol: 'Mg', name: 'Magnesium', charge: 2, type: IonType.CATION, elementSymbol: 'Mg' },
  { symbol: 'Ca', name: 'Calcium', charge: 2, type: IonType.CATION, elementSymbol: 'Ca' },
  { symbol: 'Sr', name: 'Strontium', charge: 2, type: IonType.CATION, elementSymbol: 'Sr' },
  { symbol: 'Ba', name: 'Barium', charge: 2, type: IonType.CATION, elementSymbol: 'Ba' },
  // Group 13
  { symbol: 'Al', name: 'Aluminum', charge: 3, type: IonType.CATION, elementSymbol: 'Al' },
  { symbol: 'Ga', name: 'Gallium', charge: 3, type: IonType.CATION, elementSymbol: 'Ga' },
  // Transition Metals (Variable Charge)
  { symbol: 'Fe', name: 'Iron(II)', charge: 2, type: IonType.CATION, elementSymbol: 'Fe' },
  { symbol: 'Fe', name: 'Iron(III)', charge: 3, type: IonType.CATION, elementSymbol: 'Fe' },
  { symbol: 'Cu', name: 'Copper(I)', charge: 1, type: IonType.CATION, elementSymbol: 'Cu' },
  { symbol: 'Cu', name: 'Copper(II)', charge: 2, type: IonType.CATION, elementSymbol: 'Cu' },
  { symbol: 'Zn', name: 'Zinc', charge: 2, type: IonType.CATION, elementSymbol: 'Zn' },
  { symbol: 'Ag', name: 'Silver', charge: 1, type: IonType.CATION, elementSymbol: 'Ag' },
  { symbol: 'Pb', name: 'Lead(II)', charge: 2, type: IonType.CATION, elementSymbol: 'Pb' },
  { symbol: 'Pb', name: 'Lead(IV)', charge: 4, type: IonType.CATION, elementSymbol: 'Pb' },
  { symbol: 'Sn', name: 'Tin(II)', charge: 2, type: IonType.CATION, elementSymbol: 'Sn' },
  { symbol: 'Sn', name: 'Tin(IV)', charge: 4, type: IonType.CATION, elementSymbol: 'Sn' },
  { symbol: 'Hg2', name: 'Mercury(I)', charge: 2, type: IonType.CATION, isPolyatomic: true, elementSymbol: 'Hg' }, // Hg2 2+
  { symbol: 'Hg', name: 'Mercury(II)', charge: 2, type: IonType.CATION, elementSymbol: 'Hg' },
  { symbol: 'Mn', name: 'Manganese(II)', charge: 2, type: IonType.CATION, elementSymbol: 'Mn' },
  { symbol: 'Mn', name: 'Manganese(IV)', charge: 4, type: IonType.CATION, elementSymbol: 'Mn' },
  // Polyatomic Cations (+1)
  { symbol: 'NH4', name: 'Ammonium', charge: 1, type: IonType.CATION, isPolyatomic: true },
  { symbol: 'H3O', name: 'Hydronium', charge: 1, type: IonType.CATION, isPolyatomic: true },
  { symbol: 'PH4', name: 'Phosphonium', charge: 1, type: IonType.CATION, isPolyatomic: true },
];

export const ANIONS: Ion[] = [
  // Group 17 (Halogens)
  { symbol: 'F', name: 'Fluoride', charge: -1, type: IonType.ANION, elementSymbol: 'F' },
  { symbol: 'Cl', name: 'Chloride', charge: -1, type: IonType.ANION, elementSymbol: 'Cl' },
  { symbol: 'Br', name: 'Bromide', charge: -1, type: IonType.ANION, elementSymbol: 'Br' },
  { symbol: 'I', name: 'Iodide', charge: -1, type: IonType.ANION, elementSymbol: 'I' },
  // Group 16
  { symbol: 'O', name: 'Oxide', charge: -2, type: IonType.ANION, elementSymbol: 'O' },
  { symbol: 'S', name: 'Sulfide', charge: -2, type: IonType.ANION, elementSymbol: 'S' },
  { symbol: 'Se', name: 'Selenide', charge: -2, type: IonType.ANION, elementSymbol: 'Se' },
  // Group 15
  { symbol: 'N', name: 'Nitride', charge: -3, type: IonType.ANION, elementSymbol: 'N' },
  { symbol: 'P', name: 'Phosphide', charge: -3, type: IonType.ANION, elementSymbol: 'P' },
  // Group 14
  { symbol: 'C', name: 'Carbide', charge: -4, type: IonType.ANION, elementSymbol: 'C' },
  
  // Polyatomic Anions (-1)
  { symbol: 'C2H3O2', name: 'Acetate', charge: -1, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'AlO2', name: 'Aluminate', charge: -1, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'HCO3', name: 'Bicarbonate', charge: -1, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'BrO3', name: 'Bromate', charge: -1, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'ClO3', name: 'Chlorate', charge: -1, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'ClO2', name: 'Chlorite', charge: -1, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'CN', name: 'Cyanide', charge: -1, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'H2PO4', name: 'Dihydrogen Phosphate', charge: -1, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'HSO4', name: 'Hydrogen Sulfate', charge: -1, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'OH', name: 'Hydroxide', charge: -1, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'ClO', name: 'Hypochlorite', charge: -1, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'IO3', name: 'Iodate', charge: -1, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'NO3', name: 'Nitrate', charge: -1, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'NO2', name: 'Nitrite', charge: -1, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'ClO4', name: 'Perchlorate', charge: -1, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'MnO4', name: 'Permanganate', charge: -1, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'SCN', name: 'Thiocyanate', charge: -1, type: IonType.ANION, isPolyatomic: true },

  // Polyatomic Anions (-2)
  { symbol: 'CO3', name: 'Carbonate', charge: -2, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'CrO4', name: 'Chromate', charge: -2, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'Cr2O7', name: 'Dichromate', charge: -2, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'HPO4', name: 'Hydrogen Phosphate', charge: -2, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'MnO4', name: 'Manganate', charge: -2, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'C2O4', name: 'Oxalate', charge: -2, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'O2', name: 'Peroxide', charge: -2, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'SiO3', name: 'Silicate', charge: -2, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'SO4', name: 'Sulfate', charge: -2, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'SO3', name: 'Sulfite', charge: -2, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'C4H4O6', name: 'Tartrate', charge: -2, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'B4O7', name: 'Tetraborate', charge: -2, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'S2O3', name: 'Thiosulfate', charge: -2, type: IonType.ANION, isPolyatomic: true },
  
  // Polyatomic Anions (-3)
  { symbol: 'AsO4', name: 'Arsenate', charge: -3, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'AsO3', name: 'Arsenite', charge: -3, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'BO3', name: 'Borate', charge: -3, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'C6H5O7', name: 'Citrate', charge: -3, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'PO4', name: 'Phosphate', charge: -3, type: IonType.ANION, isPolyatomic: true },
  { symbol: 'PO3', name: 'Phosphite', charge: -3, type: IonType.ANION, isPolyatomic: true },
];

// --- Visual Data: Periodic Table Grid ---

export const PERIODIC_ELEMENTS: PeriodicElement[] = [
  // Period 1
  { atomicNumber: 1, symbol: 'H', name: 'Hydrogen', group: 1, period: 1, category: 'nonmetal' },
  { atomicNumber: 2, symbol: 'He', name: 'Helium', group: 18, period: 1, category: 'noble' },
  // Period 2
  { atomicNumber: 3, symbol: 'Li', name: 'Lithium', group: 1, period: 2, category: 'alkali' },
  { atomicNumber: 4, symbol: 'Be', name: 'Beryllium', group: 2, period: 2, category: 'alkaline' },
  { atomicNumber: 5, symbol: 'B', name: 'Boron', group: 13, period: 2, category: 'metalloid' },
  { atomicNumber: 6, symbol: 'C', name: 'Carbon', group: 14, period: 2, category: 'nonmetal' },
  { atomicNumber: 7, symbol: 'N', name: 'Nitrogen', group: 15, period: 2, category: 'nonmetal' },
  { atomicNumber: 8, symbol: 'O', name: 'Oxygen', group: 16, period: 2, category: 'nonmetal' },
  { atomicNumber: 9, symbol: 'F', name: 'Fluorine', group: 17, period: 2, category: 'halogen' },
  { atomicNumber: 10, symbol: 'Ne', name: 'Neon', group: 18, period: 2, category: 'noble' },
  // Period 3
  { atomicNumber: 11, symbol: 'Na', name: 'Sodium', group: 1, period: 3, category: 'alkali' },
  { atomicNumber: 12, symbol: 'Mg', name: 'Magnesium', group: 2, period: 3, category: 'alkaline' },
  { atomicNumber: 13, symbol: 'Al', name: 'Aluminum', group: 13, period: 3, category: 'post-transition' },
  { atomicNumber: 14, symbol: 'Si', name: 'Silicon', group: 14, period: 3, category: 'metalloid' },
  { atomicNumber: 15, symbol: 'P', name: 'Phosphorus', group: 15, period: 3, category: 'nonmetal' },
  { atomicNumber: 16, symbol: 'S', name: 'Sulfur', group: 16, period: 3, category: 'nonmetal' },
  { atomicNumber: 17, symbol: 'Cl', name: 'Chlorine', group: 17, period: 3, category: 'halogen' },
  { atomicNumber: 18, symbol: 'Ar', name: 'Argon', group: 18, period: 3, category: 'noble' },
  // Period 4
  { atomicNumber: 19, symbol: 'K', name: 'Potassium', group: 1, period: 4, category: 'alkali' },
  { atomicNumber: 20, symbol: 'Ca', name: 'Calcium', group: 2, period: 4, category: 'alkaline' },
  { atomicNumber: 25, symbol: 'Mn', name: 'Manganese', group: 7, period: 4, category: 'transition' },
  { atomicNumber: 26, symbol: 'Fe', name: 'Iron', group: 8, period: 4, category: 'transition' },
  { atomicNumber: 29, symbol: 'Cu', name: 'Copper', group: 11, period: 4, category: 'transition' },
  { atomicNumber: 30, symbol: 'Zn', name: 'Zinc', group: 12, period: 4, category: 'transition' },
  { atomicNumber: 31, symbol: 'Ga', name: 'Gallium', group: 13, period: 4, category: 'post-transition' },
  { atomicNumber: 34, symbol: 'Se', name: 'Selenium', group: 16, period: 4, category: 'nonmetal' },
  { atomicNumber: 35, symbol: 'Br', name: 'Bromine', group: 17, period: 4, category: 'halogen' },
  { atomicNumber: 36, symbol: 'Kr', name: 'Krypton', group: 18, period: 4, category: 'noble' },
  // Period 5
  { atomicNumber: 37, symbol: 'Rb', name: 'Rubidium', group: 1, period: 5, category: 'alkali' },
  { atomicNumber: 38, symbol: 'Sr', name: 'Strontium', group: 2, period: 5, category: 'alkaline' },
  { atomicNumber: 47, symbol: 'Ag', name: 'Silver', group: 11, period: 5, category: 'transition' },
  { atomicNumber: 50, symbol: 'Sn', name: 'Tin', group: 14, period: 5, category: 'post-transition' },
  { atomicNumber: 53, symbol: 'I', name: 'Iodine', group: 17, period: 5, category: 'halogen' },
  { atomicNumber: 54, symbol: 'Xe', name: 'Xenon', group: 18, period: 5, category: 'noble' },
  // Period 6
  { atomicNumber: 55, symbol: 'Cs', name: 'Cesium', group: 1, period: 6, category: 'alkali' },
  { atomicNumber: 56, symbol: 'Ba', name: 'Barium', group: 2, period: 6, category: 'alkaline' },
  { atomicNumber: 80, symbol: 'Hg', name: 'Mercury', group: 12, period: 6, category: 'transition' },
  { atomicNumber: 82, symbol: 'Pb', name: 'Lead', group: 14, period: 6, category: 'post-transition' },
];

export const OXYANION_RULES: OxyanionRule[] = [
  {
    prefix: 'per-',
    suffix: '-ate',
    description: 'One more oxygen atom than the "-ate" ion.',
    example: 'ClO₄⁻'
  },
  {
    prefix: '',
    suffix: '-ate',
    description: 'The most common form. The "standard".',
    example: 'ClO₃⁻'
  },
  {
    prefix: '',
    suffix: '-ite',
    description: 'One less oxygen atom than the "-ate" ion.',
    example: 'ClO₂⁻'
  },
  {
    prefix: 'hypo-',
    suffix: '-ite',
    description: 'Two fewer oxygen atoms than the "-ate" ion.',
    example: 'ClO⁻'
  }
];

// --- Level Configuration ---

export const LEVEL_CONFIG = {
  [DifficultyLevel.NOVICE]: {
    description: "Guided learning. Monoatomic ions and metals.",
    ions: {
      // Allow all monoatomic cations (including variable charges like Cu+ and Cu2+) + Hg2
      cations: CATIONS.filter(c => !c.isPolyatomic || c.symbol === 'Hg2'),
      anions: ANIONS.filter(a => !a.isPolyatomic)
    }
  },
  [DifficultyLevel.APPRENTICE]: {
    description: "Charge balancing. Introduction of common polyatomic ions.",
    ions: {
      cations: CATIONS, // Allow all cations (superset of Novice)
      anions: ANIONS.filter(a => !a.isPolyatomic || ['OH', 'NO3', 'SO4', 'CO3', 'PO4', 'NH4', 'C2H3O2', 'HCO3'].includes(a.symbol))
    }
  },
  [DifficultyLevel.MASTER]: {
    description: "Full access. Transition metals, variable charges, and complex polyatomics.",
    ions: {
      cations: CATIONS,
      anions: ANIONS
    }
  },
  [DifficultyLevel.GRANDMASTER]: {
    description: "Nomenclature Challenge. Identify the compound name from its formula.",
    ions: {
      cations: CATIONS,
      anions: ANIONS
    }
  }
};

// --- Helpers ---

export const formatCharge = (charge: number): string => {
  if (charge === 1) return '+';
  if (charge === -1) return '-';
  return charge > 0 ? `${charge}+` : `${Math.abs(charge)}-`;
};
