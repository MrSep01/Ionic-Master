
export enum IonType {
  CATION = 'CATION',
  ANION = 'ANION'
}

export enum DifficultyLevel {
  NOVICE = 'Novice',
  APPRENTICE = 'Apprentice',
  MASTER = 'Master',
  GRANDMASTER = 'Grandmaster'
}

// Helper to determine order
export const LEVEL_ORDER = [
  DifficultyLevel.NOVICE,
  DifficultyLevel.APPRENTICE,
  DifficultyLevel.MASTER,
  DifficultyLevel.GRANDMASTER
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
  cationOptions?: string[]; // Multiple choice options for GM level
  anionOptions?: string[];  // Multiple choice options for GM level
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  targetName: string;
  cation: Ion;
  anion: Ion;
  cationCount: number;
  anionCount: number;
  funFact: string;
}

export interface CertificateEntry {
  level: DifficultyLevel;
  timestamp: number;
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
  // Progression state
  unlockedLevels: DifficultyLevel[];
  levelWins: number; // Wins in the current level
  notes: string; // Student notebook content
  history: HistoryEntry[]; // Log of synthesized compounds
  certificates: CertificateEntry[]; // Earned certificates
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
