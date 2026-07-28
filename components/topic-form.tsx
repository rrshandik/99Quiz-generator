"use client"

import type React from "react"
import { Sparkles, LoaderCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const SUGGESTIONS = [
  "Property Market Updates in Jakarta",
  "KPR Basics",
  "Rumah123 Listing Best Practices",
  "First-Time Home Buyer Tips",
]

interface TopicFormProps {
  topic: string
  onTopicChange: (value: string) => void
  onGenerate: () => void
  isLoading: boolean
  error: string | null
}

export function TopicForm({ topic, onTopicChange, onGenerate, isLoading, error }: TopicFormProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isLoading && topic.trim()) onGenerate()
  }

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <h1 className="text-pretty text-xl font-bold text-foreground sm:text-2xl">Build a training quiz in seconds</h1>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        Enter any property, mortgage, or sales topic and generate 3 multiple-choice questions for your team.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
        <label htmlFor="topic" className="text-sm font-medium text-foreground">
          Quiz topic
        </label>
        <textarea
          id="topic"
          value={topic}
          onChange={(e) => onTopicChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && !e.nativeEvent.isComposing) {
              handleSubmit(e)
            }
          }}
          rows={3}
          placeholder="e.g. Property Market Updates in Jakarta"
          disabled={isLoading}
          className="w-full resize-none rounded-xl border border-input bg-background px-3.5 py-3 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 disabled:opacity-60"
        />

        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              disabled={isLoading}
              onClick={() => onTopicChange(s)}
              className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-60"
            >
              {s}
            </button>
          ))}
        </div>

        {error ? (
          <p role="alert" className="text-sm font-medium text-destructive">
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={isLoading || !topic.trim()}
          className="h-11 w-full text-sm font-semibold sm:w-auto sm:self-start sm:px-6"
        >
          {isLoading ? (
            <>
              <LoaderCircle className="size-4 animate-spin" />
              Generating quiz...
            </>
          ) : (
            <>
              <Sparkles className="size-4" />
              Generate Quiz
            </>
          )}
        </Button>
      </form>
    </section>
  )
}
