import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProgress, VisualizationState } from '@/types';

interface ThemeStore {
  isDark: boolean;
  toggle: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      isDark: false,
      toggle: () => set((state) => ({ isDark: !state.isDark })),
    }),
    {
      name: 'theme-storage',
    }
  )
);

interface ProgressStore extends UserProgress {
  completeAlgorithm: (algorithmId: string) => void;
  addBadge: (badgeId: string) => void;
  updateQuizScore: (quizId: string, score: number) => void;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set) => ({
      completedAlgorithms: [],
      badges: [],
      quizScores: {},
      completeAlgorithm: (algorithmId) =>
        set((state) => ({
          completedAlgorithms: [...new Set([...state.completedAlgorithms, algorithmId])],
        })),
      addBadge: (badgeId) =>
        set((state) => ({
          badges: [...new Set([...state.badges, badgeId])],
        })),
      updateQuizScore: (quizId, score) =>
        set((state) => ({
          quizScores: { ...state.quizScores, [quizId]: score },
        })),
    }),
    {
      name: 'progress-storage',
    }
  )
);

interface VisualizationStore extends VisualizationState {
  setCurrentStep: (step: number) => void;
  play: () => void;
  pause: () => void;
  setSpeed: (speed: number) => void;
  reset: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setData: (data: any) => void;
}

export const useVisualizationStore = create<VisualizationStore>((set) => ({
  currentStep: 0,
  isPlaying: false,
  speed: 1,
  steps: [],
  data: null,
  setCurrentStep: (step) => set({ currentStep: step }),
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  setSpeed: (speed) => set({ speed }),
  reset: () => set({ currentStep: 0, isPlaying: false }),
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, state.steps.length - 1),
    })),
  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    })),
  setData: (data) => set({ data, currentStep: 0, isPlaying: false }),
}));