"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { login, signup } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import Link from "next/link";
import { Mail, Lock, User, Chrome } from "lucide-react";
import { signIn } from "next-auth/react";

type AuthMode = "login" | "signup";

type BaseProps = {
  mode: AuthMode;
};

export function AuthCard({ mode }: BaseProps) {
  const isLogin = mode === "login";
  const router = useRouter();
  const { login: setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      if (isLogin) {
        const res = await login({ email, password });
        setAuth({ user: res.user, accessToken: res.access_token });
        toast.success("Welcome back.");
      } else {
        const res = await signup({ username, email, password });
        setAuth({ user: res.user, accessToken: res.access_token });
        toast.success("Account created.");
      }
      router.push("/feed");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error("Authentication failed. Please check your details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setIsGoogleLoading(true);
    try {
      await signIn("google", { callbackUrl: "/auth/callback" });
    } catch {
      toast.error("Unable to start Google login.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-120px)] items-center justify-center px-4 py-10 md:px-6">
      <Card className="w-full max-w-md border-border/70 bg-card/80 shadow-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="text-xl">
            {isLogin ? "Welcome back" : "Join TruthLens"}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {isLogin
              ? "Sign in to analyze news and join the discussion."
              : "Create an account to post, vote, and help verify stories."}
          </p>
        </CardHeader>
        <CardContent className="space-y-5">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                    <User className="h-3.5 w-3.5" />
                  </span>
                  <Input
                    id="username"
                    className="pl-9"
                    placeholder="lens_reader"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                </span>
                <Input
                  id="email"
                  type="email"
                  className="pl-9"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                  <Lock className="h-3.5 w-3.5" />
                </span>
                <Input
                  id="password"
                  type="password"
                  className="pl-9"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  minLength={6}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="mt-2 w-full"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? isLogin
                  ? "Signing in…"
                  : "Creating account…"
                : isLogin
                  ? "Sign in"
                  : "Sign up"}
            </Button>
          </form>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
              Or continue with
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogle}
            disabled={isGoogleLoading}
          >
            <Chrome className="mr-2 h-4 w-4" />
            {isGoogleLoading ? "Redirecting…" : "Continue with Google"}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            {isLogin ? (
              <>
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Log in
                </Link>
              </>
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

