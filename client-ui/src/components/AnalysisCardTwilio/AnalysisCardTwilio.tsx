import ApiService from "@/services/ApiService";
import { AnalysisOpenAI } from "@/types/Analysis";
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

export interface AnalysisCardOpenAiProps {
  transcriptionSid: string;
}
const AnalysisCardTwilio: FC<AnalysisCardOpenAiProps> = (props) => {
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState<TranscriptAnalysisResult>();

  useEffect(() => {
    setLoading(true);

    ApiService.getTranscriptAnalysis(props.transcriptionSid)
      .then((analysis) => setAnalysis(analysis))
      .catch((err) => setAnalysis(undefined))
      .finally(() => setLoading(false));
  }, [props.transcriptionSid]);

  useEffect(() => {}, [analysis]);

  if (loading)
    return (
      <Card padding={"space80"}>
        <Heading as={"div"} variant={"heading30"}>
          Summary
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
          Summary
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
        <Alert variant={"neutral"}>See transcript tab for results</Alert>
        <Heading as={"div"} variant={"heading40"}>
          Participants
        </Heading>
        <Paragraph>{analysis.participants.length}</Paragraph>

        <Heading as={"div"} variant={"heading40"}>
          Applied Models
        </Heading>

        <Stack orientation={"horizontal"} spacing="space40">
          {analysis.lup_applied_models.map((model, idx) => {
            return (
              <Flex marginBottom={"space30"} key={idx}>
                <Badge key={model.model_sid} variant={"new"} as="span">
                  {model.description}
                </Badge>
              </Flex>
            );
          })}
        </Stack>

        <Box>
          <MeterLabel
            htmlFor={"model_conf"}
            valueLabel={"" + analysis.confidence}
          >
            Model Confidence
          </MeterLabel>
          <Meter
            value={parseFloat(analysis.confidence)}
            maxValue={1}
            id={"model_conf"}
          />
          <HelpText id={"model_conf"}>
            Showing how confident the Voice Intelligence model is with call
            result.
          </HelpText>
        </Box>

        <Heading as={"div"} variant={"heading40"}>
          Direction
        </Heading>
        <Paragraph>{analysis.call_direction}</Paragraph>

        <Heading as={"div"} variant={"heading40"}>
          Status
        </Heading>
        <Paragraph>{analysis.status}</Paragraph>
      </Stack>
    </Card>
  );
};

export default AnalysisCardTwilio;
