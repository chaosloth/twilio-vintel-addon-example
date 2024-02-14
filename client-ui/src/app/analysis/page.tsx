"use client";

import { CustomizationProvider } from "@twilio-paste/core/customization";
import CenterLayout from "@/components/CenterLayout";
import { useSearchParams } from "next/navigation";

import { useRouter } from "next/navigation";
import ApiService from "@/services/ApiService";
import { useEffect, useState } from "react";
import AnalysisTabs from "@/components/AnalysisTabs";
import {
  Heading,
  Box,
  Topbar,
  TopbarActions,
  Button,
  Text,
} from "@twilio-paste/core";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const transcriptionSid = searchParams.get("transcriptionSid");
  const [iframeUrl, setIframeUrl] = useState("about:blank");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!transcriptionSid) return;
    ApiService.getViewToken(transcriptionSid)
      .then((token) => {
        console.log("Open conversation", transcriptionSid);
        const url = `${process.env.NEXT_PUBLIC_TRANSCRIPT_VIEWER_ASSET_URL}?token=${token}`;
        // EMBEDED
        setIframeUrl(url);
      })
      .catch((err) => console.log("Error getting view token", err))
      .finally(() => setLoading(false));
  }, [transcriptionSid]);

  if (!transcriptionSid)
    return (
      <CustomizationProvider baseTheme="default">
        <CenterLayout>
          <Heading as={"div"} variant={"heading20"}>
            Analysis for this transcript is not found
          </Heading>
        </CenterLayout>
      </CustomizationProvider>
    );

  return (
    <CustomizationProvider baseTheme="default">
      <Box minWidth="size80">
        <Topbar id="topbar">
          <Heading as="h1" variant="heading20" marginBottom="space0">
            Voice Intelligence - Add-on examples
          </Heading>
          <Text as={"div"}>Transcription ID: {transcriptionSid}</Text>
          <TopbarActions justify="end">
            <Button variant={"primary"} onClick={() => router.push("/")}>
              Dashboard
            </Button>
          </TopbarActions>
        </Topbar>
      </Box>

      <CenterLayout>
        <AnalysisTabs url={iframeUrl} transcriptionSid={transcriptionSid} />
      </CenterLayout>
    </CustomizationProvider>
  );
}
