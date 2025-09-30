export type AlgorithmCategory =
  | 'supervised-learning'
  | 'unsupervised-learning'
  | 'optimization'
  | 'search-graph'
  | 'statistical';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Algorithm {
  id: string;
  name: string;
  category: AlgorithmCategory;
  difficulty: DifficultyLevel;
  description: string;
  icon: string;
  color: string;
  position: { x: number; y: number }; // For constellation map
  connections: string[]; // IDs of related algorithms
  timeComplexity: string;
  spaceComplexity: string;
  useCase: string;
}

export interface AlgorithmStep {
  id: number;
  description: string;
  state: any;
  highlight?: string[];
}

export interface VisualizationState {
  currentStep: number;
  isPlaying: boolean;
  speed: number;
  steps: AlgorithmStep[];
  data: any;
}

export interface Parameter {
  name: string;
  label: string;
  type: 'number' | 'slider' | 'select' | 'boolean';
  min?: number;
  max?: number;
  step?: number;
  default: any;
  options?: { label: string; value: any }[];
  description: string;
}

export interface Quiz {
  id: string;
  algorithmId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
}

export interface UserProgress {
  completedAlgorithms: string[];
  badges: string[];
  quizScores: Record<string, number>;
}