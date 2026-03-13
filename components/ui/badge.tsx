"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "success" | "destructive" | "outline";

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: BadgeVariant }) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
        variant === "default" && "border-transparent bg-primary/10 text-primary",
        variant === "success" &&
          "border-transparent bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
        variant === "destructive" &&
          "border-transparent bg-red-500/10 text-red-600 dark:text-red-300",
        variant === "outline" && "border-border text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

