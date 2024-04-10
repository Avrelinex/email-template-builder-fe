"use client";

import { Editor } from "@craftjs/core";
import React from "react";

import { Button } from "./user/Button";
import { Container } from "./user/Container";
import { Text } from "./user/Text";
import { Image } from "./user/Image";
import { ImageLink } from "./user/ImageLink";
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
          Button,
          Text,
          Container,
          Image,
          ImageLink,
          Link,
        }}
      >
        {children}
      </Editor>
    </div>
  );
};
