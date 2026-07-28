"use client"

import { useState } from "react"
import { CircleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TopicForm } from "@/components/topic-form"
import { QuestionCard } from "@/components/question-card"
import { ScoreSummary } from "@/components/score-summary"
import type { Quiz } from "@/lib/quiz-types"

export function QuizBuilder() {
  const [topic, setTopic] = useState("")
  const [activeTopic, setActiveTopic] = useState("")
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleGenerate() {
    setIsLoading(true)
    setError(null)
    setQuiz(null)
    setSubmitted(false)
    try {
      const res = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error ?? "Something went wrong.")
      setQuiz(data as Quiz)
      setAnswers(new Array(data.questions.length).fill(null))
      setActiveTopic(topic.trim())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate quiz.")
    } finally {
      setIsLoading(false)
    }
  }

  function handleSelect(questionIndex: number, optionIndex: number) {
    if (submitted) return
    setAnswers((prev) => {
      const next = [...prev]
      next[questionIndex] = optionIndex
      return next
    })
  }

  function handleSubmitQuiz() {
    setSubmitted(true)
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function handleRetake() {
    setAnswers(new Array(quiz?.questions.length ?? 0).fill(null))
    setSubmitted(false)
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function handleNewTopic() {
    setQuiz(null)
    setSubmitted(false)
    setAnswers([])
    setTopic("")
    setActiveTopic("")
    setError(null)
  }

  const allAnswered = quiz ? answers.every((a) => a !== null) : false
  const score = quiz ? answers.reduce((acc, a, i) => acc + (a === quiz.questions[i].correctIndex ? 1 : 0), 0) : 0

  return (
    <div className="flex flex-col gap-5">
      {!quiz ? (
        <TopicForm
          topic={topic}
          onTopicChange={setTopic}
          onGenerate={handleGenerate}
          isLoading={isLoading}
          error={error}
        />
      ) : (
        <>
          {submitted ? (
            <ScoreSummary
              score={score}
              total={quiz.questions.length}
              onRetake={handleRetake}
              onNewTopic={handleNewTopic}
            />
          ) : (
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Quiz topic</p>
              <h2 className="mt-1 text-pretty text-lg font-bold text-foreground">{activeTopic}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Answer all {quiz.questions.length} questions, then submit to see your score.
              </p>
            </div>
          )}

          {quiz.questions.map((q, i) => (
            <QuestionCard
              key={i}
              index={i}
              question={q}
              selected={answers[i]}
              submitted={submitted}
              onSelect={(opt) => handleSelect(i, opt)}
            />
          ))}

          {!submitted ? (
            <div className="flex flex-col gap-3">
              {!allAnswered ? (
                <p className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
                  <CircleAlert className="size-4" />
                  Select an answer for every question to submit.
                </p>
              ) : null}
              <Button
                onClick={handleSubmitQuiz}
                disabled={!allAnswered}
                className="h-11 w-full text-sm font-semibold"
              >
                Submit Quiz
              </Button>
              <Button variant="ghost" onClick={handleNewTopic} className="h-9 w-full text-sm">
                Start over with a new topic
              </Button>
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}
