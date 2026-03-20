"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";



export function useGoogleAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const sentRef = useRef(false); // prevent double-sending in strict mode

  useEffect(() => {
    if (status !== "authenticated") {
      sentRef.current = false; // reset on logout
      return;
    }

    if (!session?.idToken || sentRef.current) return;

    sentRef.current = true;

    const sendToBackend = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: session.idToken }),
          },
        );

        if (!res.ok) throw new Error("Backend Google auth failed");
        router.push("/feed");
      } catch (err) {
        console.error("Google auth error:", err);
      }
    };

    sendToBackend();
  }, [status, session]);
}
