import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set, get) => ({
      // User progress tracking
      progress: {
        limits: { completed: false, quizScore: null },
        derivatives: { completed: false, quizScore: null },
        multivariable: { completed: false, quizScore: null },
        integration: { completed: false, quizScore: null },
        series: { completed: false, quizScore: null },
        vectorCalculus: { completed: false, quizScore: null },
        mlApplications: { completed: false, quizScore: null },
      },

      // Bookmarks
      bookmarks: [],

      // Current topic
      currentTopic: 'home',

      // Actions
      updateProgress: (topic, data) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [topic]: { ...state.progress[topic], ...data },
          },
        })),

      addBookmark: (bookmark) =>
        set((state) => ({
          bookmarks: [...state.bookmarks, { ...bookmark, id: Date.now() }],
        })),

      removeBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.id !== id),
        })),

      setCurrentTopic: (topic) => set({ currentTopic: topic }),

      // Get completion percentage
      getCompletionPercentage: () => {
        const progress = get().progress
        const topics = Object.keys(progress)
        const completed = topics.filter((t) => progress[t].completed).length
        return Math.round((completed / topics.length) * 100)
      },

      // Reset progress
      resetProgress: () =>
        set({
          progress: {
            limits: { completed: false, quizScore: null },
            derivatives: { completed: false, quizScore: null },
            multivariable: { completed: false, quizScore: null },
            integration: { completed: false, quizScore: null },
            series: { completed: false, quizScore: null },
            vectorCalculus: { completed: false, quizScore: null },
            mlApplications: { completed: false, quizScore: null },
          },
        }),
    }),
    {
      name: 'calculus-ml-storage',
    }
  )
)

export default useStore
