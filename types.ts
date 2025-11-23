
export enum IonType {
  CATION = 'CATION',
  ANION = 'ANION'
}

export enum DifficultyLevel {
  NOVICE = 'Novice',
  APPRENTICE = 'Apprentice',
  MASTER = 'Master'
}

// Helper to determine order
export const LEVEL_ORDER = [
  DifficultyLevel.NOVICE,
  DifficultyLevel.APPRENTICE,
  DifficultyLevel.MASTER
];

export interface Ion {
  symbol: string;
  name: string;
  charge: number;
  type: IonType;
  isPolyatomic?: boolean;
  elementSymbol?: string; // For grouping isotopes/charges under one table element
}

export interface Challenge {
  targetName: string;
  cation: Ion;
  anion: Ion;
}

export interface GameState {
  level: DifficultyLevel;
  score: number;
  streak: number;
  currentChallenge: Challenge | null;
  selectedCation: Ion | null;
  selectedAnion: Ion | null;
  cationCount: number;
  anionCount: number;
  gameStatus: 'playing' | 'success' | 'error';
  feedbackMessage: string;
  showTutor: boolean;
  // New progression state
  unlockedLevels: DifficultyLevel[];
  levelWins: number; // Wins in the current level
  notes: string; // Student notebook content
}

// New types for the UI
export interface PeriodicElement {
  atomicNumber: number;
  symbol: string;
  name: string;
  group: number;
  period: number;
  category: 'alkali' | 'alkaline' | 'transition' | 'post-transition' | 'metalloid' | 'nonmetal' | 'halogen' | 'noble' | 'lanthanoid' | 'actinoid';
}

export interface OxyanionRule {
  prefix: string;
  suffix: string;
  description: string;
  example: string;
}
