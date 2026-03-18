import { PostFeed } from "@/components/posts/post-feed";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FeedPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-6 md:px-6 md:py-8">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
            Latest posts
          </h1>
          <p className="text-xs text-muted-foreground md:text-sm">
            AI-scored news and discussions from the TruthLens community.
          </p>
        </div>
        <Button asChild size="sm" className="shrink-0">
          <Link href="/create">New post</Link>
        </Button>
      </div>

      <PostFeed />
    </div>
  );
}

