import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useTabState,
} from "@twilio-paste/core";
import CallList from "../CallList";
import TranscriptionList from "../TranscriptionList";

import { FC } from "react";

const useMyTabState = () => {
  const tab = useTabState();
  return {
    ...tab,
    baseId: "layout",
  };
};

export type MainTabsProps = {};

const MainTabs: FC<MainTabsProps> = (props) => {
  const tabState = useMyTabState();

  return (
    <Tabs state={tabState}>
      <TabList aria-label="Call and transcription list">
        <Tab id={"tab-transcriptions"}>Transcripts</Tab>
        <Tab id={"tab-calls"}>Call Recordings</Tab>
      </TabList>
      <TabPanels>
        <TabPanel tabId={"tab-transcriptions"}>
          <TranscriptionList />
        </TabPanel>
        <TabPanel tabId={"tab-calls"}>
          <CallList />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default MainTabs;
