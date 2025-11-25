
import { GameState, DifficultyLevel, HistoryEntry, CertificateEntry } from '../types';

const STORAGE_KEY = 'ionic_master_save_v1';

export interface SavedProgress {
  level: DifficultyLevel;
  score: number;
  streak: number;
  unlockedLevels: DifficultyLevel[];
  levelWins: number;
  notes?: string;
  history?: HistoryEntry[];
  certificates?: CertificateEntry[];
  hasSeenTutorial?: boolean;
}

export const saveProgress = (state: GameState, hasSeenTutorial: boolean = false) => {
  const dataToSave: SavedProgress = {
    level: state.level,
    score: state.score,
    streak: state.streak,
    unlockedLevels: state.unlockedLevels,
    levelWins: state.levelWins,
    notes: state.notes,
    history: state.history,
    certificates: state.certificates,
    hasSeenTutorial: hasSeenTutorial
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (e) {
    console.error('Failed to save progress', e);
  }
};

export const loadProgress = (): SavedProgress | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    return JSON.parse(saved) as SavedProgress;
  } catch (e) {
    console.error('Failed to load progress', e);
    return null;
  }
};

export const clearProgress = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear progress', e);
  }
};
