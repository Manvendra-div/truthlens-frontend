"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

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
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`,
            {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token: session.idToken }),
            }
          );

          console.log("[Callback] Backend status:", res.status);
          const body = await res.json();
          console.log("[Callback] Backend response:", body);

          if (!res.ok) throw new Error(JSON.stringify(body));

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
