import { Element } from "@craftjs/core";
import { Container } from "./Container";
import { Link } from "./Link";
import { Text } from "./Text";
import { Image } from "./Image";
import { SocialMediaLinks } from "./SocialMediaLinks";

export const Signature = () => {
  const linkProps = {
    padding: 5,
    border: "none",
    backgroundColor: "transparent",
  };

  return (
    <Element
      is={Container}
      canvas
      flexDirection="column"
      alignItems="start"
      id="signature"
    >
      <Text text="Best Regards," />
      <Element
        is={Container}
        canvas
        flexDirection="row"
        gap={10}
        id="signature-content"
      >
        <Image
          src="https://via.placeholder.com/150"
          alt=""
          width={150}
          height={150}
        />
        <Element
          is={Container}
          canvas
          flexDirection="column"
          id="signature-text"
        >
          <Text text="John Doe" />
          <Text text="CEO" />
          <Link link="https://google.com" {...linkProps}>
            <Text text="Company Name" />
          </Link>
          <SocialMediaLinks />
        </Element>
      </Element>
    </Element>
  );
};
