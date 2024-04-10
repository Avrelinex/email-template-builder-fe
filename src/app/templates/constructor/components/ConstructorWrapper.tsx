"use client";

import { Editor } from "@craftjs/core";
import React from "react";

import { Container } from "./user/Container";
import { RootContainer } from "./user/RootContainer";
import { Text } from "./user/Text";
import { Image } from "./user/Image";
import { Link } from "./user/Link";

export const ConstructorWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div style={{ margin: "0 auto", flex: "1 1 0" }}>
      <Editor
        resolver={{
          Container,
          RootContainer,
          Text,
          Image,
          Link,
        }}
      >
        {children}
      </Editor>
    </div>
  );
};