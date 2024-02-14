"use client";

import { Flex, Box } from "@twilio-paste/core";
import styles from "./styles.module.css";
import { FC } from "react";

export type CenterLayoutProps = {
  children?: React.ReactNode;
};

const CenterLayout: FC<CenterLayoutProps> = ({ children }) => {
  return (
    <Box margin={"space50"}>
      <Flex hAlignContent="center" vertical>
        <Flex>
          <Box padding="space100" width="100vw">
            {children}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CenterLayout;
