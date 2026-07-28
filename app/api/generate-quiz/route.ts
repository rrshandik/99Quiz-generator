import { generateObject } from "ai"
import { z } from "zod"

export const maxDuration = 30

const quizSchema = z.object({
  questions: z
    .array(
      z.object({
        question: z.string().describe("The question text, clear and concise."),
        options: z
          .array(z.string())
          .length(4)
          .describe("Exactly four answer options, in order for labels A, B, C, D. Do not prefix with letters."),
        correctIndex: z.number().int().min(0).max(3).describe("Zero-based index of the correct option (0=A, 3=D)."),
        explanation: z.string().describe("A 1-2 sentence explanation of why the correct answer is right."),
      }),
    )
    .length(3),
})

export async function POST(req: Request) {
  try {
    const { topic } = await req.json()

    if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
      return Response.json({ error: "Please provide a topic." }, { status: 400 })
    }

    const { object } = await generateObject({
      model: "openai/gpt-4.1-mini",
      schema: quizSchema,
      system:
        "You are an expert learning-and-development specialist at 99 Group, a leading Southeast Asian proptech company " +
        "(brands include Rumah123 and 99.co). You create clear, accurate employee training quizzes about the property " +
        "market, mortgages (KPR), real estate sales, and related finance topics, with an Indonesian/Southeast Asian " +
        "market context where relevant. Questions should be practical, unambiguous, and have exactly one correct answer.",
      prompt:
        `Create a 3-question multiple-choice quiz to train 99 Group employees on the following topic:\n\n"${topic.trim()}"\n\n` +
        "Each question must have exactly 4 plausible options (only one correct), and a short explanation for the correct answer. " +
        "Vary difficulty from easy to moderate. Keep language professional and easy to understand.",
    })

    return Response.json(object)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.log("[v0] generate-quiz error:", message)

    if (/credit card|billing|payment|quota|insufficient|unlock your free credits/i.test(message)) {
      return Response.json(
        {
          error:
            "The AI service isn't activated yet. An admin needs to add a payment method to the Vercel AI Gateway to unlock free credits.",
        },
        { status: 402 },
      )
    }

    return Response.json({ error: "Failed to generate quiz. Please try again." }, { status: 500 })
  }
}
