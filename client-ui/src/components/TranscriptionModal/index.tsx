import {
  SideModalContainer,
  SideModalBody,
  SideModalHeader,
  SideModalHeading,
  SideModal,
} from "@twilio-paste/core";
import { useUID } from "@twilio-paste/core/dist/uid-library";
import { FC } from "react";
import React from "react";

export interface ConfirmationModalProps {
  url: string;
  state: any;
}

const TranscriptionModal: FC<ConfirmationModalProps> = (props) => {
  // Modal properties
  const modalHeadingID = useUID();

  return (
    <SideModalContainer state={props.state}>
      <SideModal aria-label={""}>
        <SideModalHeader>
          <SideModalHeading as="h3" id={modalHeadingID}>
            Transcript Viewer
          </SideModalHeading>
        </SideModalHeader>
        <SideModalBody>
          <iframe
            src={props.url}
            width={"100%"}
            height={"100%"}
            frameBorder={0}
          />
        </SideModalBody>
      </SideModal>
    </SideModalContainer>
  );
};

export default TranscriptionModal;
