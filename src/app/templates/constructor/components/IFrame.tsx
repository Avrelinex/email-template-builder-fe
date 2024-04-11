import React, { useState } from "react";
import { createPortal } from "react-dom";

export const IFrame = ({
  children,
  ...props
}: {
  children?: React.ReactNode;
} & React.IframeHTMLAttributes<HTMLIFrameElement>) => {
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);
  const mountNode = contentRef?.contentWindow?.document?.body;

  return (
    <iframe {...props} ref={setContentRef}>
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
};
