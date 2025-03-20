"use client";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/middlewares/protectedRoute";
import { auth } from "@/config/firebase";
import DashboardTemplate from "@/components/templates/DashboardTemplate";

export default function DashboardPage() {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ProtectedRoute>
      <DashboardTemplate email={user?.email ?? null} />
    </ProtectedRoute>
  );
}
