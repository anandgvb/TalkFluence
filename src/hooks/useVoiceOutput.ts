"use client";

import {useState, useCallback} from "react";
import {ERROR_MESSAGES, TIMEOUTS} from "@/utils/constants";
import {useInterview} from "@/context/InterviewContext";
import {apiClient} from "@/utils/apiClient";

interface UseVoiceOutputReturn {
  generateVoice: (text: string) => Promise<string | null>;
  isGenerating: boolean;
  error: string | null;
}

export const useVoiceOutput = (): UseVoiceOutputReturn => {
  const {setAudioUrl} = useInterview();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateVoice = useCallback(async (text: string): Promise<string | null> => {
    try {
      setIsGenerating(true);
      const voiceBlob = await apiClient.generateVoice(text);
      const voiceUrl = URL.createObjectURL(voiceBlob);
      setAudioUrl(voiceUrl);
      return voiceUrl;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.log("Voice generation was aborted");
        return null;
      }
      console.error("Error generating voice:", error);
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, [setAudioUrl]);

  return {
    generateVoice,
    isGenerating,
    error,
  };
};
