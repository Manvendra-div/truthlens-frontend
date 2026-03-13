"use client";

import { usePosts } from "@/hooks/usePosts";
import { PostCard } from "./post-card";
import { FeedSkeleton } from "@/components/loading-skeleton";
import { ErrorState } from "@/components/error-state";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PostFeed() {
  const { postsQuery } = usePosts();

  if (postsQuery.isLoading) {
    return <FeedSkeleton />;
  }

  if (postsQuery.isError) {
    return (
      <ErrorState
        onRetry={() => postsQuery.refetch()}
        message="Unable to load the feed right now."
      />
    );
  }

  if (!postsQuery.data || postsQuery.data.length === 0) {
    return (
      <div className="mt-8 rounded-xl border bg-card/70 p-6 text-center text-sm text-muted-foreground">
        <p>No posts yet. Be the first to analyze a story.</p>
        <Button asChild size="sm" className="mt-3">
          <Link href="/create">Create your first post</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {postsQuery.data.map((post) => (
        <PostCard key={post.id} post={post} compact />
      ))}
    </div>
  );
}
