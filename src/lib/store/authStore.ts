"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      login: (email, name) =>
        set({
          user: {
            id: crypto.randomUUID(),
            email,
            phone: "",
            name: name || email.split("@")[0],
          },
        }),
      logout: () => set({ user: null }),
      isAuthenticated: () => !!get().user,
    }),
    { name: "vss-auth" }
  )
);