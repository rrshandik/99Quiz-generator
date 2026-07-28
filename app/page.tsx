import { AppHeader } from "@/components/app-header"
import { QuizBuilder } from "@/components/quiz-builder"

export default function Page() {
  return (
    <main className="min-h-dvh bg-background">
      <AppHeader />
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
        <QuizBuilder />
        <footer className="mt-10 text-center text-xs text-muted-foreground">
          Built for 99 Group HR · Quizzes are AI-generated — review before sharing with your team.
        </footer>
      </div>
    </main>
  )
}
