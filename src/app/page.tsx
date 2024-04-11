import { Email, Send } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { FeatureCard } from "./components/featureCard";

export default function Page() {
  return (
    <Box>
      <Typography
        sx={{ my: "2rem", fontSize: "3rem", fontWeight: "500" }}
        variant="h1"
      >
        Wellcome user
      </Typography>
      <Box sx={{ display: "flex" }}>
        <FeatureCard
          Icon={Email}
          link="templates/new"
          label="Email template"
          description="Elevate your communication game with beautifully crafted email templates designed to impress and capture attention"
          buttonText="Create new template"
        />
        <FeatureCard
          Icon={Send}
          link="images/new"
          label="Upload images"
          description="Upload images to use in your email templates"
          buttonText="Upload new image"
        />
      </Box>
    </Box>
  );
}
