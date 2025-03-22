import { Box } from "@mui/material";
import HomeText from "../molecules/HomeWelcomeText";
import Button from "../atoms/Button";

export default function HomeSection() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
    >
      <HomeText />
      <Button sx={{ mt: 2 }} href="/auth/login">
        Go to Login Page
      </Button>
    </Box>
  );
}
