import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import Button from "../atoms/Button";
import UserInfo from "../molecules/UserInfo";
import Typography from "../atoms/Typography";
import { Box } from "@mui/material";

type DashboardContentProps = {
  email: string | null;
};

export default function DashboardContent({ email }: DashboardContentProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <Box>
      <Typography color="primary" variant="h4">
        Welcome to Dashboard
      </Typography>
      {email ? (
        <UserInfo email={email} />
      ) : (
        <Typography color="primary" variant="body1">
          Loading user info...
        </Typography>
      )}
      <Button onClick={handleLogout} color="error">
        Logout
      </Button>
    </Box>
  );
}
