"use client"

import { Trophy, RotateCcw, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ScoreSummaryProps {
  score: number
  total: number
  onRetake: () => void
  onNewTopic: () => void
}

export function ScoreSummary({ score, total, onRetake, onNewTopic }: ScoreSummaryProps) {
  const pct = Math.round((score / total) * 100)
  const message =
    pct === 100
      ? "Perfect score! You know this topic inside out."
      : pct >= 67
        ? "Nice work! A solid grasp of the material."
        : "Keep learning — review the explanations below."

  return (
    <section className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Trophy className="size-7" />
      </div>
      <h2 className="mt-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Your Score</h2>
      <p className="mt-1 text-4xl font-extrabold text-foreground">
        {score}
        <span className="text-2xl text-muted-foreground">/{total}</span>
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{message}</p>

      <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
        <Button variant="outline" onClick={onRetake} className="h-10 font-medium">
          <RotateCcw className="size-4" />
          Retake Quiz
        </Button>
        <Button onClick={onNewTopic} className="h-10 font-semibold">
          <Sparkles className="size-4" />
          New Topic
        </Button>
      </div>
    </section>
  )
}
