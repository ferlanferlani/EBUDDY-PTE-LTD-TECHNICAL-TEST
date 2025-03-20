"use client";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export default function LoginPage() {
  const { loading } = useAuthRedirect(); // Login check
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Email and password cannnot be empty!");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Login successful:", userCredential.user);
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        const errorMessage = err.message;
        if (errorMessage.includes("auth/invalid-email")) {
          setError("Your email is not valid!");
        } else if (errorMessage.includes("auth/user-not-found")) {
          setError("Account not found!");
        } else if (errorMessage.includes("auth/wrong-password")) {
          setError("Wrong password!");
        } else if (errorMessage.includes("auth/too-many-requests")) {
          setError("Too many requests! Try again later.");
        } else if (errorMessage.includes("auth/network-request-failed")) {
          setError("Network request failed! Check your connection.");
        } else if (errorMessage.includes("auth/invalid-credential")) {
          setError("Email or password is invalid!");
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" suppressHydrationWarning>
      {!isClient || loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          minHeight="100vh"
        >
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Email"
            required
            fullWidth
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            sx={{ mt: 2 }}
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
          <Typography sx={{ textAlign: "center", mt: 2 }}>
            <Link href="/">Back to Home Page</Link>
          </Typography>
        </Box>
      )}
    </Container>
  );
}
