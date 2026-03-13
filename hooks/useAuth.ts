"use client";

import { useAuthStore } from "@/store/auth-store";
import { useEffect } from "react";

export function useAuth() {
  const { user, accessToken, login, logout, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, []);
  
  return { user, accessToken, login, logout, isAuthenticated: !!user };
}

