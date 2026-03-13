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
    try {
      const user = await getCurrentUser()
      set({ user })
    } catch {
      set({ user: null })
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
