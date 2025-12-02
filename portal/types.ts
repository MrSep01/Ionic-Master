
export type ContentType = 'text' | 'image' | 'video' | 'simulation' | 'quiz' | 'mock-exam';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Checkpoint {
  question: string;
  options?: string[]; // Optional for text-input
  correctIndex?: number; // For MC
  acceptedAnswers?: string[]; // For Text Input (case insensitive matching)
  explanation: string;
  variant?: 'multiple-choice' | 'text-input'; // Default to MC
}

export interface VocabularyItem {
  term: string;
  definition: string;
}

export interface ContentBlock {
  type: 'header' | 'paragraph' | 'list' | 'exam-hint' | 'checkpoint' | 'simulation' | 'image' | 'key-vocab' | 'practical' | 'learning-objectives';
  content?: string; // Markdown supported
  items?: string[]; // For lists
  checkpoint?: Checkpoint;
  vocabItems?: VocabularyItem[]; // For vocabulary lists
  src?: string; // For images
  caption?: string;
  simulationId?: string; 
}

export interface Lesson {
  id: string;
  title: string;
  blocks: ContentBlock[];
}

export interface Topic {
  id: string;
  title: string;
  lessons: Lesson[];
  quiz?: QuizQuestion[]; // End of topic quiz
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
  mockExam?: QuizQuestion[];
}
