"use client";

import { create } from "zustand";
import type { User } from "@/types/user";
import { getCurrentUser } from "@/lib/api/users";
import { logout } from "@/lib/api";

type AuthState = {
  user: User | null
  accessToken: string | null
  login: (payload: { user: User; accessToken: string }) => void
  logout: () => void
  initialize: () => Promise<void>
}


export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,

  initialize: async () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    set({ user: null, accessToken: null });
    return;
  }
  try {
    const user = await getCurrentUser();  // interceptor handles the header
    set({ user, accessToken: token });
  } catch {
    localStorage.removeItem("access_token");
    set({ user: null, accessToken: null });
  }
},

  login: ({ user }) => {
    set({ user })
  },

  logout: async () => {
    await logout()
    set({ user: null, accessToken: null })
  }
}))
