import {NextResponse} from "next/server";
import OpenAI from "openai";
import rateLimiter from "@/utils/rateLimiter";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are an English expert specializing in Business English Communication. 
Your task is to conduct an IT standup meeting session and:

1. Evaluating the candidate's communication skills for English Vocabulary.
2. Generating relevant follow-up questions based on their answers
3. Focusing on explanation, jargons and pace of the answers
4. Maintaining a professional and encouraging tone

Core topics to cover:
1. The candidate's update on work due today
2. Follow up questions about dependencies on other teams
3. Asking for an expected timeline to finish upcoming tasks
4. Reason for delay in current task
6. Small talk before ending the meeting

Guidelines for responses:
- If the answer is incomplete, ask for specific missing aspects
- If the answer is confusing, provide gentle correction and ask for clarification
- If the answer is off-topic, redirect to the topic
- For silence or unclear responses, rephrase the question
- Provide constructive feedback

Format your response as a direct follow-up question or a brief acknowledgment followed by the next question.
Ensure each response advances the meeting towards covering all the above topics.`;

export async function POST(request: Request) {
  const clientId = request.headers.get("x-forwarded-for") || "anonymous";

  const rateLimitResult = rateLimiter.consume(clientId);
  if (!rateLimitResult.success) {
    return NextResponse.json({error: rateLimitResult.message}, {status: 429});
  }

  try {
    const {currentQuestion, answer} = await request.json();

    // Handle empty or invalid answers
    if (!answer || answer.trim().length < 10) {
      return NextResponse.json({
        response:
          "I didn't catch that. Could you please elaborate on your answer to the question: " +
          currentQuestion,
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {role: "system", content: SYSTEM_PROMPT},
        {role: "assistant", content: currentQuestion},
        {role: "user", content: answer},
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const response = completion.choices[0].message.content;

    // Validate response is not empty
    if (!response) {
      throw new Error("Empty response from LLM");
    }

    return NextResponse.json({response}, {status: 200});
  } catch (error) {
    console.error("LLM generation error:", error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      {
        error: "Failed to generate response",
        response:
          "I apologize, but I'm having trouble processing that. Could you please rephrase your answer?",
      },
      {status: 500}
    );
  }
}
