"use client";

import ApiService from "@/services/ApiService";
import { Conversation } from "@/types/Search";
import {
  Button,
  ButtonGroup,
  SkeletonLoader,
  Stack,
  TBody,
  THead,
  Table,
  Td,
  Tr,
} from "@twilio-paste/core";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const TranscriptionList: FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    ApiService.getTranscriptions()
      .then((transcripts) => setConversations(transcripts))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <Stack orientation={"vertical"} spacing={"space80"}>
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
      </Stack>
    );

  return (
    <>
      <Table>
        <THead>
          <Tr>
            <Td>Created</Td>
            <Td>SID</Td>
            <Td>From</Td>
            <Td>To</Td>
            <Td>Actions</Td>
          </Tr>
        </THead>
        <TBody>
          {conversations.map((c) => (
            <Tr key={c.sid}>
              <Td>{c.date_created.toLocaleString()}</Td>
              <Td>{c.sid}</Td>
              <Td>{c.from_number}</Td>
              <Td>{c.to_number}</Td>
              <Td>
                <Button
                  variant="link"
                  size="small"
                  onClick={() =>
                    router.push(`/analysis?transcriptionSid=${c.sid}`)
                  }
                >
                  View Analysis
                </Button>
              </Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </>
  );
};

export default TranscriptionList;
