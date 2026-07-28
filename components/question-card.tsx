"use client"

import { CheckCircle2, XCircle, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"
import { OPTION_LABELS, type QuizQuestion } from "@/lib/quiz-types"

interface QuestionCardProps {
  index: number
  question: QuizQuestion
  selected: number | null
  submitted: boolean
  onSelect: (optionIndex: number) => void
}

export function QuestionCard({ index, question, selected, submitted, onSelect }: QuestionCardProps) {
  const isCorrect = selected === question.correctIndex

  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
          {index + 1}
        </span>
        <div className="flex-1">
          <h3 className="text-pretty text-base font-semibold leading-snug text-foreground">{question.question}</h3>

          <fieldset className="mt-4 flex flex-col gap-2.5" disabled={submitted}>
            <legend className="sr-only">{`Answer options for question ${index + 1}`}</legend>
            {question.options.map((option, optIndex) => {
              const isSelected = selected === optIndex
              const isAnswer = question.correctIndex === optIndex

              const showCorrect = submitted && isAnswer
              const showWrong = submitted && isSelected && !isAnswer

              return (
                <label
                  key={optIndex}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 text-sm transition-colors",
                    !submitted && "border-border bg-background hover:border-primary/50 hover:bg-accent",
                    !submitted && isSelected && "border-primary bg-accent",
                    showCorrect && "border-success bg-success/10",
                    showWrong && "border-destructive bg-destructive/10",
                    submitted && !showCorrect && !showWrong && "border-border bg-background opacity-70",
                    submitted && "cursor-default",
                  )}
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    className="sr-only"
                    checked={isSelected}
                    onChange={() => onSelect(optIndex)}
                  />
                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-xs font-bold",
                      !submitted && isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-secondary text-secondary-foreground",
                      showCorrect && "border-success bg-success text-success-foreground",
                      showWrong && "border-destructive bg-destructive text-white",
                    )}
                  >
                    {OPTION_LABELS[optIndex]}
                  </span>
                  <span className="flex-1 text-foreground">{option}</span>
                  {showCorrect ? <CheckCircle2 className="size-5 text-success" /> : null}
                  {showWrong ? <XCircle className="size-5 text-destructive" /> : null}
                </label>
              )
            })}
          </fieldset>

          {submitted ? (
            <div className="mt-4 rounded-xl border border-border bg-muted/60 p-3.5">
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <Lightbulb className="size-3.5" />
                {isCorrect ? "Correct" : "Explanation"}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                <span className="font-semibold text-success">
                  {OPTION_LABELS[question.correctIndex]}. {question.options[question.correctIndex]}
                </span>{" "}
                — {question.explanation}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  )
}
