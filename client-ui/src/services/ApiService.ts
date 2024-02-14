import { AnalysisOpenAI } from "@/types/Analysis";
import { HumeAIResult } from "@/types/HumeAi";
import { Recording, RecordingsResponse } from "@/types/Recordings";
import { Conversation } from "@/types/Search";
import { Sentence } from "@/types/Sentences";
import { Transcript } from "@/types/Transcript";
import { TranscriptAnalysisResult } from "@/types/TranscriptAnalysis";
import MockData from "./MockData";

class ApiService {
  token: string = "";

  async init(): Promise<String> {
    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_OVERRIDE || ""}/api/token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token } = await resp.json();
      this.token = token;

      return this.token;
    } catch (error) {
      console.error("Error initializing VoiceService:", error);
      throw error;
    }
  }

  async getViewToken(transcriptionSid: string): Promise<String> {
    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_OVERRIDE || ""}/api/view-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ transcriptionSid }),
        }
      );

      const { token } = await resp.json();
      this.token = token;

      return this.token;
    } catch (error) {
      console.error("Error initializing VoiceService:", error);
      throw error;
    }
  }

  getToken(): string {
    return this.token;
  }

  async getCalls(): Promise<Recording[]> {
    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_OVERRIDE || ""}/api/recordings`
      );

      const { recordings } = await resp.json();
      return recordings;
    } catch (error) {
      console.error("Error initializing VoiceService:", error);
      throw error;
    }
  }

  async getTranscriptions(): Promise<Conversation[]> {
    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_OVERRIDE || ""}/api/transcriptions`
      );

      const { conversations } = await resp.json();
      return conversations;
    } catch (error) {
      console.error("Error initializing VoiceService:", error);
      throw error;
    }
  }

  async getTranscriptAnalysis(
    transcriptionSid: string
  ): Promise<TranscriptAnalysisResult> {
    try {
      const resp = await fetch(
        `${
          process.env.NEXT_PUBLIC_DOMAIN_OVERRIDE || ""
        }/api/transcript?transcriptionSid=${transcriptionSid}`
      );

      return await resp.json();
    } catch (error) {
      console.error("Error initializing VoiceService:", error);
      throw error;
    }
  }

  async getSentences(transcriptSid: string): Promise<Sentence[]> {
    try {
      const resp = await fetch(
        `${
          process.env.NEXT_PUBLIC_DOMAIN_OVERRIDE || ""
        }/api/transcript?callSid=${transcriptSid}`
      );

      const { sentences } = await resp.json();
      return sentences;
    } catch (error) {
      console.error("Error initializing VoiceService:", error);
      throw error;
    }
  }

  async analyseSentences(sentences: Sentence[]): Promise<any> {
    try {
      const formatMessage = (channel: number, text: string) => ({
        role: channel == 2 ? "user" : "assistant",
        content: text,
      });

      const prompt = [
        {
          role: "system",
          content: `Anaylse this customer service interaction, respond base with a JSON object with the keys {"sentiment","business_outcome","summary"}`,
        },
      ];

      sentences.forEach(({ channel, transcript }) =>
        prompt.push(formatMessage(channel, transcript))
      );

      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_OVERRIDE || ""}/api/analyse`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(prompt),
        }
      );
    } catch (error) {
      console.error("Error initializing VoiceService:", error);
      throw error;
    }
  }

  async getAnalysisOpenAi(transcriptSid: string): Promise<AnalysisOpenAI> {
    try {
      const resp = await fetch(
        `${
          process.env.NEXT_PUBLIC_DOMAIN_OVERRIDE || ""
        }/api/fetch-analysis-openai?transcriptionSid=${transcriptSid}`
      );

      if (resp.status !== 200) {
        throw new Error("Analysis not found");
      }
      return await resp.json();
    } catch (error) {
      console.error("Error getting Open AI:", error);
      throw error;
    }
  }

  async getAnalysisHumeAi(transcriptSid: string): Promise<HumeAIResult> {
    try {
      const resp = await fetch(
        `${
          process.env.NEXT_PUBLIC_DOMAIN_OVERRIDE || ""
        }/api/fetch-analysis-humeai?transcriptionSid=${transcriptSid}`
      );

      if (resp.status !== 200) {
        throw new Error("Analysis not found");
      }
      return await resp.json();
    } catch (error) {
      console.error("Error getting Hume AI:", error);
      throw error;
    }
  }

  async getAnalysisHumeAiMock(transcriptSid: string): Promise<HumeAIResult> {
    const data = MockData;
    return new Promise<HumeAIResult>((resolve, reject) => {
      console.log("Returning Mock Hume Data", data);
      resolve(data as HumeAIResult);
    });
  }
}

const service = new ApiService();

export default service;
