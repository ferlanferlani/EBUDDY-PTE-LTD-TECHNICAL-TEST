"use client";
import { useEffect, useState } from "react";
import LoginTemplate from "@/components/templates/LoginTemplate";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { CircularProgress, Box } from "@mui/material";

export default function LoginPage() {
  const { loading } = useAuthRedirect();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return <LoginTemplate />;
}
