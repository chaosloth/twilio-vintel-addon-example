import ApiService from "@/services/ApiService";
import { Sentence } from "@/types/Sentences";
import {
  SideModalContainer,
  SideModalBody,
  SideModalHeader,
  SideModalHeading,
  SideModal,
  Badge,
  Card,
  Heading,
  Stack,
  Spinner,
} from "@twilio-paste/core";
import { useUID } from "@twilio-paste/core/dist/uid-library";
import { FC, useEffect, useState } from "react";
import React from "react";
import AnalysisCardOpenAi from "../AnalysisCardOpenAi/AnalysisCardOpenAi";

export interface ConfirmationModalProps {
  state: any;
  transcriptionSid: string;
}

const AnalysisModal: FC<ConfirmationModalProps> = (props) => {
  // Modal properties
  const modalHeadingID = useUID();
  const [loading, setLoading] = useState(true);
  const [sentences, setSentences] = useState<Sentence[]>([]);

  useEffect(() => {
    if (!props.transcriptionSid || props.transcriptionSid == "") return;
    console.log(
      "Transcript SID changed, attempting to fetch results for: ",
      props.transcriptionSid
    );
    setLoading(true);
    ApiService.getSentences(props.transcriptionSid)
      .then((sentences) => setSentences(sentences))
      .finally(() => setLoading(false));
  }, [props.transcriptionSid]);

  // useEffect(() => {
  //   setLoading(true);
  //   ApiService.analyseSentences(sentences)
  //     .then((data) => setAnalysis(data))
  //     .finally(() => setLoading(false));
  // }, [sentences]);

  return (
    <SideModalContainer state={props.state}>
      <SideModal aria-label={""}>
        <SideModalHeader>
          <SideModalHeading as="h3" id={modalHeadingID}>
            3rd Party Analysis
          </SideModalHeading>
        </SideModalHeader>
        <SideModalBody>
          <Stack orientation={"vertical"} spacing="space80">
            <AnalysisCardOpenAi transcriptionSid={props.transcriptionSid} />
          </Stack>
        </SideModalBody>
      </SideModal>
    </SideModalContainer>
  );
};

export default AnalysisModal;
