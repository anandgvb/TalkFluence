import {ERROR_MESSAGES} from "./constants";

interface GenerateQuestionsResponse {
  response: string;
}

const ML_PROMPT = `Generate a standup meeting question for an IT professional. The question should:
- The candidate's update on work due today
- Follow up questions about dependencies on other teams
- Asking for an expected timeline to finish upcoming tasks
- Reason for delay in current task
- Small talk before ending the meeting
  Return only the question text.`;

export async function generateMLQuestions(): Promise<string> {
  try {
    const response = await fetch("/api/llmGenerate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentQuestion: "",
        answer: ML_PROMPT,
      }),
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }

    const data: GenerateQuestionsResponse = await response.json();
    return data.response;
  } catch (error) {
    console.error("Failed to generate simulation question:", error);
    throw new Error("Failed to generate simulation question");
  }
}
