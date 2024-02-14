import ApiService from "@/services/ApiService";
import { AnalysisOpenAI } from "@/types/Analysis";
import { HumeAIResult } from "@/types/HumeAi";
import { TranscriptAnalysisResult } from "@/types/TranscriptAnalysis";

import {
  Badge,
  Card,
  Heading,
  Stack,
  SkeletonLoader,
  Paragraph,
  Box,
  HelpText,
  Meter,
  MeterLabel,
  Flex,
  Text,
  Alert,
} from "@twilio-paste/core";

import { FC, useEffect, useState } from "react";
import React from "react";
import Prediction from "../HumePrediction/HumePrediction";

export interface AnalysisCardOpenAiProps {
  transcriptionSid: string;
}
const AnalysisCardHumeAi: FC<AnalysisCardOpenAiProps> = (props) => {
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState<HumeAIResult>();

  useEffect(() => {
    setLoading(false);

    ApiService.getAnalysisHumeAi(props.transcriptionSid)
      .then((analysis) => {
        console.log("Hume Mock returned", analysis);
        setAnalysis(analysis);
      })
      .catch((err) => setAnalysis(undefined))
      .finally(() => setLoading(false));
  }, [props.transcriptionSid]);

  useEffect(() => {
    console.log("Hume Analysis", analysis);
  }, [analysis]);

  if (loading)
    return (
      <Card padding={"space80"}>
        <Heading as={"div"} variant={"heading30"}>
          Hume AI
        </Heading>
        <Stack orientation={"vertical"} spacing="space70">
          Loading analysis
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </Stack>
      </Card>
    );

  if (!analysis)
    return (
      <Card padding={"space80"}>
        <Heading as={"div"} variant={"heading30"}>
          Hume AI
        </Heading>
        <Stack orientation={"vertical"} spacing="space70">
          Analysis has not been performed on this transcript
        </Stack>
      </Card>
    );

  return (
    <Card padding={"space80"}>
      <Heading as={"div"} variant={"heading30"}>
        Summary
      </Heading>

      <Stack orientation={"vertical"} spacing={"space40"}>
        <Heading as={"div"} variant={"heading40"}>
          Source
        </Heading>
        <Paragraph>{analysis.source.type}</Paragraph>

        <Heading as={"div"} variant={"heading40"}>
          Transcription
        </Heading>

        <Flex hAlignContent="left" vertical>
          {analysis.results.predictions.map((prediction, idx) => (
            <Prediction key={idx} prediction={prediction}></Prediction>
          ))}
        </Flex>
      </Stack>
    </Card>
  );
};

export default AnalysisCardHumeAi;
