import { DarkMode } from "@/app/templates/components/DarkMode";
import { MobileMode } from "@/app/templates/components/MobileMode";
import { Grid } from "@mui/material";

export const Topbar = ({
  mobileMode,
  setMobileMode,
  darkMode,
  setDarkMode,
  iframeId,
}: {
  mobileMode: boolean;
  setMobileMode: (value: boolean) => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  iframeId: string;
}) => {
  return (
    <>
      <Grid item>
        <DarkMode
          iframeId={iframeId}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      </Grid>
      <Grid item>
        <MobileMode mobileMode={mobileMode} setMobileMode={setMobileMode} />
      </Grid>
    </>
  );
};
