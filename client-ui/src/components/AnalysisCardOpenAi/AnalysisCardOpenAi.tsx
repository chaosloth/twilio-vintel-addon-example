import ApiService from "@/services/ApiService";
import { AnalysisOpenAI } from "@/types/Analysis";

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
} from "@twilio-paste/core";
import { useUID } from "@twilio-paste/core/dist/uid-library";
import { FC, useEffect, useState } from "react";
import React from "react";

export interface AnalysisCardOpenAiProps {
  transcriptionSid: string;
}
const AnalysisCardOpenAi: FC<AnalysisCardOpenAiProps> = (props) => {
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState<AnalysisOpenAI>();

  useEffect(() => {
    setLoading(true);

    ApiService.getAnalysisOpenAi(props.transcriptionSid)
      .then((analysis) => setAnalysis(analysis))
      .catch((err) => setAnalysis(undefined))
      .finally(() => setLoading(false));
  }, [props.transcriptionSid]);

  useEffect(() => {}, [analysis]);

  if (loading)
    return (
      <Card padding={"space80"}>
        <Heading as={"div"} variant={"heading30"}>
          Analysis
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
          Analysis
        </Heading>
        <Stack orientation={"vertical"} spacing="space70">
          Analysis has not been performed on this transcript
        </Stack>
      </Card>
    );

  return (
    <Card padding={"space80"}>
      <Heading as={"div"} variant={"heading30"}>
        Analysis
      </Heading>

      <Stack orientation={"horizontal"} spacing={"space40"}>
        {analysis && (
          <Stack orientation={"vertical"} spacing={"space40"}>
            <Heading as={"div"} variant={"heading40"}>
              Summary
            </Heading>
            <Paragraph>{analysis.summary}</Paragraph>

            <Heading as={"div"} variant={"heading40"}>
              Intervention
            </Heading>
            <Paragraph>
              {analysis.intervention_required ? (
                <Badge as="span" variant="error">
                  Yes Intervention Required
                </Badge>
              ) : (
                <Badge as="span" variant="success">
                  No intervention required
                </Badge>
              )}
            </Paragraph>

            <Box>
              <MeterLabel
                htmlFor={"nps"}
                valueLabel={"" + analysis.predicted_nps_score}
              >
                Predicted NPS
              </MeterLabel>
              <Meter
                value={analysis.predicted_nps_score}
                maxValue={10}
                id={"nps"}
              />
              <HelpText id={"nps"}>
                Showing predicted NPS based on entire transcript.
              </HelpText>
            </Box>

            <Box>
              <MeterLabel
                htmlFor={"csat"}
                valueLabel={"" + analysis.predicted_csat_score}
              >
                Predicted CSAT
              </MeterLabel>
              <Meter
                value={analysis.predicted_csat_score}
                maxValue={10}
                id={"csat"}
              />
              <HelpText id={"csat"}>
                Showing predicted CSAT based on entire transcript.
              </HelpText>
            </Box>

            <Heading as={"div"} variant={"heading40"}>
              Business Outcome
            </Heading>
            <Paragraph>{analysis.business_outcome}</Paragraph>

            <Heading as={"div"} variant={"heading40"}>
              Sentiment
            </Heading>
            <Paragraph>{analysis.sentiment}</Paragraph>
          </Stack>
        )}
      </Stack>
    </Card>
  );
};

export default AnalysisCardOpenAi;
