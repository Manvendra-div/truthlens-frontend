"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, Newspaper, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/ui/mode-toggle";

const navLinks = [
  { href: "/feed", label: "Feed" },
  { href: "/create", label: "Create" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const desktopContent = (
    <>
      <nav className="flex flex-1 items-center justify-center gap-6 text-sm md:justify-start">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "transition-colors hover:text-foreground/90",
              pathname?.startsWith(link.href)
                ? "font-medium text-foreground"
                : "text-muted-foreground"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <ModeToggle />
        {user ? (
          <>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hidden text-xs font-medium md:inline-flex"
            >
              <Link href="/profile">@{user.username}</Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="hidden text-xs md:inline-flex"
              asChild
            >
              <Link href="/login">Log in</Link>
            </Button>
            <Button size="sm" className="text-xs" asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
          </>
        )}
      </div>
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Newspaper className="h-4 w-4" />
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight">
              TruthLens
            </span>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              See the truth behind the story
            </span>
          </div>
        </Link>

        <div className="ml-auto flex items-center gap-2 md:hidden">
          <ModeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Open menu">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-6">
              <SheetHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                  <Newspaper className="h-4 w-4 text-primary" />
                  <SheetTitle>TruthLens</SheetTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="ml-auto"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </SheetHeader>
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-sm font-medium",
                      pathname?.startsWith(link.href)
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-3">
                  {user ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        onClick={() => setOpen(false)}
                      >
                        <Link href="/profile">@{user.username}</Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          handleLogout();
                          setOpen(false);
                        }}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        onClick={() => setOpen(false)}
                      >
                        <Link href="/login">Log in</Link>
                      </Button>
                      <Button
                        size="sm"
                        asChild
                        onClick={() => setOpen(false)}
                      >
                        <Link href="/signup">Sign up</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="ml-6 hidden flex-1 items-center justify-between gap-4 md:flex">
          {desktopContent}
        </div>
      </div>
    </header>
  );
}

