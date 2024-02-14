"use client";

import { CustomizationProvider } from "@twilio-paste/core/customization";
import CenterLayout from "@/components/CenterLayout";
import {
  Box,
  Button,
  Heading,
  Stack,
  Topbar,
  TopbarActions,
} from "@twilio-paste/core";
import MainTabs from "@/components/MainTabs";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <CustomizationProvider baseTheme="default">
      <Box minWidth="size80">
        <Topbar id="topbar">
          <Heading as="h1" variant="heading20" marginBottom="space0">
            Voice Intelligence - Add-on examples
          </Heading>

          <TopbarActions justify="end">
            <Button variant={"primary"} onClick={() => router.refresh()}>
              Refresh
            </Button>
          </TopbarActions>
        </Topbar>
      </Box>

      <CenterLayout>
        <MainTabs />
      </CenterLayout>
    </CustomizationProvider>
  );
}
