"use client";

import {FC} from "react";
import {FaMicrophone, FaStop} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import VoiceOutput from "@/components/VoiceOutput";

interface InterviewControlsProps {
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onEnd: () => void;
  onRecordingToggle: () => void;
  isStarted: boolean;
  isPaused: boolean;
  isListening: boolean;
  isProcessing: boolean;
  isCompleted: boolean;
  questionCount: number;
  totalQuestions: number;
  isGenerating?: boolean;
  audioUrl?: string | null;
}

const InterviewControls: FC<InterviewControlsProps> = ({
  onStart,
  onPause,
  onResume,
  onEnd,
  onRecordingToggle,
  isStarted,
  isPaused,
  isListening,
  isProcessing,
  isCompleted,
  questionCount,
  totalQuestions,
  isGenerating,
  audioUrl,
}) => {
  const router = useRouter();

  if (!isStarted) {
    return (
      <div
        className="flex flex-col items-center justify-center h-full gap-8"
        role="region"
        aria-label="Interview Start Screen"
      >
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
            Ready to Begin Your Simulation?
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            You&apos;ll be asked questions through voice and can respond
            verbally. The AI assistant will provide feedback and follow-up
            questions based on your responses.
          </p>
          
          {/* Feature indicators */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="flex items-center justify-center gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-colors">
              <div className="p-2 bg-blue-500/20 rounded-full">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Voice Interaction</h3>
                <p className="text-sm text-gray-400">Speak naturally, we'll listen</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-purple-500/50 transition-colors">
              <div className="p-2 bg-purple-500/20 rounded-full">
                <svg
                  className="w-6 h-6 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Real-time Feedback</h3>
                <p className="text-sm text-gray-400">Get instant insights</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-6">
          <button
            onClick={onStart}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl font-medium flex items-center gap-3"
            aria-label="Start the simulation"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Start Simulation
          </button>
          <Link
            href="/"
            className="px-8 py-4 border-2 border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800/50 transition-all transform hover:scale-105 font-medium flex items-center gap-3"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="max-w-4xl mx-auto"
      role="region"
      aria-label="Simulation Controls"
    >
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-200">
            Simulation in Progress
          </h2>
          <div className="flex items-center gap-2">
            <span
              className="px-3 py-1 bg-blue-900/50 text-blue-200 rounded-full font-medium"
              role="status"
              aria-label={`Question ${questionCount} of ${totalQuestions}`}
            >
              Question {questionCount} of {totalQuestions}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        className="w-full bg-gray-700 rounded-full h-2.5 mb-6"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={(questionCount / totalQuestions) * 100}
        aria-label="Simulation progress"
      >
        <div
          className="bg-blue-500 h-2.5 rounded-full"
          style={{width: `${(questionCount / totalQuestions) * 100}%`}}
        ></div>
      </div>

      {/* AI Generation Status */}
      {isGenerating && (
        <div
          className="flex items-center justify-center mb-4"
          role="status"
          aria-live="polite"
        >
          <div
            className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"
            aria-hidden="true"
          ></div>
          <span className="ml-3 text-blue-400">Generating AI response...</span>
        </div>
      )}

      {/* Voice Recording Controls */}
      <div
        className="flex flex-col items-center justify-center mb-8"
        role="region"
        aria-label="Voice Recording Controls"
      >
        <button
          onClick={onRecordingToggle}
          disabled={isPaused || isProcessing}
          className={`w-20 h-20 rounded-full ${
            isListening ? "bg-red-600 animate-pulse" : "bg-blue-600"
          } flex items-center justify-center mb-2 shadow-lg`}
          aria-label={isListening ? "Stop recording" : "Start recording"}
          aria-pressed={isListening}
        >
          {isListening ? (
            <FaStop className="h-8 w-8" aria-hidden="true" />
          ) : (
            <FaMicrophone className="h-8 w-8" aria-hidden="true" />
          )}
        </button>
        {!isListening && (
          <span className="text-blue-300 text-base mb-4">Click to Speak</span>
        )}

        {/* Recording Status */}
        <div role="status" aria-live="polite">
          {isListening && (
            <div className="text-green-400 mb-4 animate-pulse">
              Listening to your answer...
            </div>
          )}
          {isProcessing && (
            <div className="text-blue-400 mb-4">Processing response...</div>
          )}
        </div>

        {/* Interview Controls */}
        <div className="flex gap-4 mt-4">
          {isPaused ? (
            <button
              onClick={onResume}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              aria-label="Resume simulation"
            >
              Resume Simulation
            </button>
          ) : (
            <button
              onClick={onPause}
              className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              aria-label="Pause simulation"
            >
              Pause Simulation
            </button>
          )}
          <button
            onClick={() => {
              onEnd();
              router.push("/results");
            }}
            className="px-6 py-2 text-red-400 border border-red-600 rounded-lg hover:bg-red-900/20 transition-colors"
            aria-label="End simulation"
          >
            End Simulation
          </button>
        </div>
      </div>

      {isCompleted && (
        <div
          className="text-center bg-green-900/20 p-6 rounded-lg border border-green-500"
          role="alert"
          aria-live="polite"
        >
          <h3 className="text-xl font-semibold mb-4 text-green-400">
            Simulation completed successfully!
          </h3>
          <div className="flex gap-4 justify-center">
            <button
              onClick={onEnd}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              aria-label="Start new simulation"
            >
              Start New Simulation
            </button>
          </div>
        </div>
      )}

      {/* Fixed height container for VoiceOutput */}
      <div className="h-[280px] flex items-center justify-center">
        {audioUrl ? (
          <VoiceOutput audioUrl={audioUrl} />
        ) : null}
      </div>
    </div>
  );
};

export default InterviewControls;
