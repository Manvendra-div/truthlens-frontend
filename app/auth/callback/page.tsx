"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { apiClient } from "@/lib/api";

export default function AuthCallbackPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const initialize = useAuthStore((s) => s.initialize);
  const sentRef = useRef(false);

  useEffect(() => {
    console.log("[Callback] status:", status, "idToken:", session?.idToken);

    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.replace("/login");
      return;
    }

    if (status === "authenticated" && !sentRef.current) {
      sentRef.current = true;

      if (!session?.idToken) {
        console.error("[Callback] No idToken in session", session);
        router.replace("/login");
        return;
      }

      const exchange = async () => {
        try {
          console.log("[Callback] Sending token to backend...");
          const { data, status } = await apiClient.post("/auth/google", {
            token: session.idToken,
          });

          console.log("[Callback] access_token:", data.access_token);
          console.log("[Callback] Backend status:", status);
          console.log("[Callback] Backend response:", data);

          if (!data.access_token) {
            console.error("[Callback] No access_token in response", data);
            router.replace("/login");
            return;
          }

          // ← add these two lines
          localStorage.setItem("access_token", data.access_token);
          apiClient.defaults.headers.common["Authorization"] =
            `Bearer ${data.access_token}`;

          await initialize();
          router.replace("/feed");
        } catch (err) {
          console.error("[Callback] Error:", err);
          router.replace("/login");
        }
      };

      exchange();
    }
  }, [status, session]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-sm text-muted-foreground">Signing you in…</p>
    </div>
  );
}
