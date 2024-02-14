"use client";

import { Flex, Box, Text, Badge, Separator } from "@twilio-paste/core";

import { FC } from "react";
import { ResultsPrediction } from "@/types/HumeAi";
import EmotionMapper from "@/utils/EmotionMapper";

export type PredictionProps = {
  prediction: ResultsPrediction;
};

const Prediction: FC<PredictionProps> = ({ prediction }) => {
  return (
    <Box marginBottom={"space50"}>
      <Flex hAlignContent="left">
        {prediction.models.language.grouped_predictions.map((sentence) => {
          return (
            <>
              <Flex
                minWidth={"300px"}
                vAlignContent={"center"}
                hAlignContent={"right"}
              >
                <Box
                  padding="space40"
                  borderRightStyle={"solid"}
                  borderRightColor={"colorBorderDecorative20Weaker"}
                  borderRightWidth={"borderWidth30"}
                  width={"100%"}
                >
                  <Flex
                    marginBottom={"space30"}
                    margin={"space30"}
                    hAlignContent={"right"}
                  >
                    {sentence.predictions[0].emotions.map((em, idx) => {
                      if (em.score < 0.5) return;
                      return (
                        <Badge
                          key={idx}
                          variant={EmotionMapper(em.name)}
                          as="span"
                        >
                          {em.name}
                        </Badge>
                      );
                    })}
                  </Flex>
                </Box>
              </Flex>
              <Separator orientation="vertical" verticalSpacing="space50" />
              <Flex vAlignContent={"center"} hAlignContent={"center"}>
                <Box width="100%" marginLeft={"space40"}>
                  <Text as="span">{sentence.predictions[0].text}</Text>
                </Box>
              </Flex>
            </>
          );
        })}
      </Flex>
    </Box>
  );
};

export default Prediction;
