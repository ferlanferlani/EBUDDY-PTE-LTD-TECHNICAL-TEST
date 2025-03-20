import { useState } from "react";
import Input from "../atoms/InputTextField";
import Button from "../atoms/Button";
import Typography from "../atoms/Typography";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Email and password cannot be empty!");
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError("Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        fullWidth
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
        fullWidth
      />
      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
      <Button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </>
  );
}
