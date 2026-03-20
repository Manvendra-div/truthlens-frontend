"use client";

import { PostCard } from "@/components/posts/post-card";
import { FeedSkeleton } from "@/components/loading-skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { usePosts } from "../../hooks/usePosts";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { postsQuery } = usePosts();

  if (!user) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-4 px-4 py-10 md:px-6">
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
          You&apos;re not logged in
        </h1>
        <p className="text-sm text-muted-foreground">
          Log in to view your profile and posts.
        </p>
        <div className="flex gap-3">
          <Button asChild size="sm">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      </div>
    );
  }

  const myPosts =
    postsQuery.data?.filter((post) => post.author.id === user.id) ?? [];


  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
      <section className="flex flex-col gap-4 rounded-xl border bg-card/80 p-4 shadow-sm md:flex-row md:items-center md:justify-between md:p-6">
        <div className="space-y-1.5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Profile
          </p>
          <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
            @{user.username}
          </h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <div className="flex gap-3">
          <Button asChild size="sm" variant="outline">
            <Link href="/create">New post</Link>
          </Button>
          <Button
            type="button"
            size="sm"
            variant="destructive"
            onClick={logout}
          >
            Log out
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-tight md:text-base">
            Your posts
          </h2>
          <span className="text-xs text-muted-foreground">
            {myPosts.length} total
          </span>
        </div>
        {postsQuery.isLoading ? (
          <FeedSkeleton />
        ) : myPosts.length > 0 ? (
          <div className="space-y-4">
            {myPosts.map((post) => (
              <PostCard key={post.id} post={post} compact />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border bg-card/70 p-6 text-sm text-muted-foreground">
            You haven&apos;t posted yet. Share a story you&apos;re unsure about
            and let TruthLens analyze it.
          </div>
        )}
      </section>
    </div>
  );
}

