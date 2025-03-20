import { Box } from "@mui/material";
import Typography from "../atoms/Typography";
import LoginForm from "../molecules/LoginForm";

export default function LoginBox() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h5" color="primary" align="center">
        Login
      </Typography>
      <LoginForm />
    </Box>
  );
}
