import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { transcriptions, questions } = await request.json();

    // Call the LLM API directly
    const response = await fetch("http://localhost:3000/api/llmGenerate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentQuestion: "Generate detailed feedback for this simulation based on the following transcriptions and questions:",
        answer: `Questions asked: ${questions.join("\n")}\n\nAnswers given: ${transcriptions.join("\n")}\n\nPlease provide detailed feedback on:\n1. English Vocabulary and Jargons\n2. Emotions and talking pace\n3. Areas for improvement\n4. Overall performance\n\nFormat the feedback in a clear, constructive manner.`,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate feedback");
    }

    const data = await response.json();
    return NextResponse.json({ feedback: data.response });
  } catch (error) {
    console.error("Error generating feedback:", error);
    return NextResponse.json(
      { error: "Failed to generate feedback" },
      { status: 500 }
    );
  }
} 