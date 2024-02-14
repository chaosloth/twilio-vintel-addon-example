import {
  Box,
  Column,
  Grid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useTabState,
} from "@twilio-paste/core";

import { FC } from "react";
import AnalysisCardOpenAi from "../AnalysisCardOpenAi/AnalysisCardOpenAi";
import AnalysisCardTwilio from "../AnalysisCardTwilio/AnalysisCardTwilio";
import AnalysisCardHumeAi from "../AnalysisCardHumeAi/AnalysisCardHumeAi";

const useMyTabState = () => {
  const tab = useTabState();
  return {
    ...tab,
    baseId: "layout",
  };
};

export type AnalysisTabsProps = {
  transcriptionSid: string;
  url: string;
};

const AnalysisTabs: FC<AnalysisTabsProps> = (props) => {
  const tabState = useMyTabState();

  return (
    <Tabs state={tabState}>
      <TabList aria-label="Transcript and analysis">
        <Tab id={"tab-analysis"}>Analysis</Tab>
        <Tab id={"tab-hume"}>Hume AI</Tab>
        <Tab id={"tab-transcription"}>Transcript</Tab>
      </TabList>
      <TabPanels>
        <TabPanel tabId={"tab-analysis"}>
          <Grid gutter="space30">
            <Column span={6}>
              <AnalysisCardOpenAi transcriptionSid={props.transcriptionSid} />
            </Column>
            <Column span={6}>
              <AnalysisCardTwilio transcriptionSid={props.transcriptionSid} />
            </Column>
          </Grid>
        </TabPanel>

        <TabPanel tabId={"tab-hume"}>
          <AnalysisCardHumeAi transcriptionSid={props.transcriptionSid} />
        </TabPanel>
        <TabPanel tabId={"tab-transcription"}>
          <Box height={"70vh"}>
            <iframe
              src={props.url}
              width={"100%"}
              height={"100%"}
              style={{ border: "0" }}
            />
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default AnalysisTabs;
