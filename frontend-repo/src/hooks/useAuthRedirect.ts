"use client";

import { useEffect, useState } from "react";
import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";

export function useAuthRedirect() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        router.replace("/dashboard"); // Redirect jika sudah login
      }
    });

    return () => unsubscribe();
  }, [router]);

  return { loading, user };
}
