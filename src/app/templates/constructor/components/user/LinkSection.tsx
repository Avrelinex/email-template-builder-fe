import { Element } from "@craftjs/core";
import { Container } from "./Container";
import { Link } from "./Link";
import { Text } from "./Text";

export const LinkSection = () => {
  const linkProps = {
    padding: 5,
    border: "none",
    backgroundColor: "transparent",
  };

  return (
    <Element
      is={Container}
      canvas
      flexDirection="row"
      justifyContent="space-around"
      alignSelf="stretch"
      id="link-section"
    >
      <Element
        is={Link}
        canvas
        link="https://google.com"
        {...linkProps}
        id="link-1"
      >
        <Text text="Link 1" />
      </Element>
      <Element
        is={Link}
        canvas
        link="https://google.com"
        {...linkProps}
        id="link-2"
      >
        <Text text="Link 2" />
      </Element>
      <Element
        is={Link}
        canvas
        link="https://google.com"
        {...linkProps}
        id="link-3"
      >
        <Text text="Link 3" />
      </Element>
    </Element>
  );
};
