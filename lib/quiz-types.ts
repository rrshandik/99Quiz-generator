export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface Quiz {
  questions: QuizQuestion[]
}

export const OPTION_LABELS = ["A", "B", "C", "D"] as const
