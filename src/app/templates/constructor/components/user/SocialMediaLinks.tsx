import { Element } from "@craftjs/core";
import { Container } from "./Container";
import { Link } from "./Link";
import { Image } from "./Image";

export const SocialMediaLinks = () => {
  const linkProps = {
    padding: 5,
    border: "none",
    backgroundColor: "transparent",
  };

  const imageProps = {
    width: 40,
    height: 40,
  };

  const instagramIcon =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/768px-Instagram_icon.png";
  const linkedinIcon =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1200px-LinkedIn_icon.svg.png";

  return (
    <Element
      is={Container}
      canvas
      flexDirection="row"
      gap={8}
      id="social-media-links"
    >
      <Element
        is={Link}
        canvas
        link="https://instagram.com"
        {...linkProps}
        id="instagram"
      >
        <Image src={instagramIcon} alt="Instagram" {...imageProps} />
      </Element>
      <Element
        is={Link}
        canvas
        link="https://linkedin.com"
        {...linkProps}
        id="linkedin"
      >
        <Image src={linkedinIcon} alt="LinkedIn" {...imageProps} />
      </Element>
    </Element>
  );
};
