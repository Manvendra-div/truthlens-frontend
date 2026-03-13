"use client";

import { CreatePostForm } from "@/components/posts/create-post-form";

export default function CreatePostPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-6 md:px-6 md:py-8">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
          Analyze & publish a story
        </h1>
        <p className="text-xs text-muted-foreground md:text-sm">
          Paste a headline or article, run the AI prediction, and share it with the community.
        </p>
      </div>
      <CreatePostForm />
    </div>
  );
}

