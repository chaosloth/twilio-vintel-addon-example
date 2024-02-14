"use client";

import ApiService from "@/services/ApiService";
import { Recording } from "@/types/Recordings";
import {
  Badge,
  SkeletonLoader,
  Stack,
  TBody,
  THead,
  Table,
  Td,
  Tr,
} from "@twilio-paste/core";
import { FC, useEffect, useState } from "react";

const CallList: FC = (props) => {
  const [loading, setLoading] = useState(true);
  const [calls, setCalls] = useState<Recording[]>([]);

  useEffect(() => {
    ApiService.getCalls()
      .then((calls) => setCalls(calls))
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
    <Table>
      <THead>
        <Tr>
          <Td>Created</Td>
          <Td>Call SID</Td>
          <Td>Channels</Td>
          <Td>Duration</Td>
          <Td>Status</Td>
          <Td>Price</Td>
          <Td>Source</Td>
        </Tr>
      </THead>
      <TBody>
        {calls.map((call) => (
          <Tr key={call.sid}>
            <Td>{call.date_created}</Td>
            <Td>{call.call_sid}</Td>
            <Td>{call.channels}</Td>
            <Td>{call.duration}</Td>
            <Td>{call.status}</Td>
            <Td>{call.price + " " + call.price_unit} </Td>
            <Td>{call.source}</Td>
          </Tr>
        ))}
      </TBody>
    </Table>
  );
};

export default CallList;
