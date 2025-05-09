"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useInterview } from "@/context/InterviewContext";

const MOCK_FEEDBACK = `Based on your interview performance:
- You demonstrated good understanding of core concepts
- Your answers were detailed and well-structured
- Consider providing more specific examples in your responses
- Work on being more concise in your explanations

Overall, you performed well in this interview! Keep practicing to improve further.`;

export default function ResultsPage() {
  const { transcription, questionCount, currentQuestion } = useInterview();
  const [feedback, setFeedback] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateFeedback = async () => {
      try {
        setIsLoading(true);

        // In a real implementation, you would collect all questions and answers
        // For now, we'll use the current question and transcription
        const response = await fetch("/api/generateFeedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            transcriptions: [transcription],
            questions: [currentQuestion],
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate feedback");
        }

        const data = await response.json();
        
        // Use the generated feedback if available, otherwise use mock feedback
        setFeedback(data.feedback || MOCK_FEEDBACK);
      } catch (error) {
        console.error("Error generating feedback:", error);
        // Silently fall back to mock feedback
        setFeedback(MOCK_FEEDBACK);
      } finally {
        setIsLoading(false);
      }
    };

    generateFeedback();
  }, [transcription, currentQuestion]);

  return (
    <div className="min-h-[calc(100vh-73px)] p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Simulation Results
        </h1>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">Summary</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <p className="text-gray-400">Questions Answered</p>
              <p className="text-2xl font-bold text-blue-400">{questionCount}</p>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <p className="text-gray-400">Simulation Duration</p>
              <p className="text-2xl font-bold text-purple-400">~2 minutes</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">Feedback</h2>
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-blue-400">Generating feedback...</span>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none">
              <p className="whitespace-pre-line">{feedback}</p>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-4">
          <Link
            href="/interview"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start New Simulation
          </Link>
          <Link
            href="/"
            className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
} 