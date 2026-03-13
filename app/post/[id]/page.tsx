"use client";

import { useParams } from "next/navigation";
import { usePostDetail, postsKeys } from "@/hooks/usePosts";
import { PageSkeleton } from "@/components/loading-skeleton";
import { ErrorState } from "@/components/error-state";
import { PredictionBadge } from "@/components/prediction-badge";
import { CommentSection } from "@/components/comments/comment-section";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost } from "@/lib/api";
import { toast } from "sonner";

export default function PostDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { data, isLoading, isError, refetch } = usePostDetail(id);
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: postsKeys.list() });
    },
    onError: () => {
      toast.error("Unable to like post right now.");
    },
  });

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-6 md:px-6 md:py-8">
        <ErrorState
          message="We couldn't load this post."
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  const post = data;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
      <article className="space-y-4 rounded-xl border bg-card/80 p-4 shadow-sm md:p-6">
        <header className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
                {post.title}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground md:text-sm">
                <span>By {post?.author?.username ?? "Unknown"}</span>
                <span>•</span>
                <span>
                  {new Date(post.created_at).toLocaleString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
            <PredictionBadge prediction={post.prediction} />
          </div>
        </header>

        <section className="prose prose-sm max-w-none text-sm leading-relaxed text-foreground dark:prose-invert md:text-base">
          <p className="whitespace-pre-wrap">{post.content}</p>
        </section>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="gap-1.5"
            onClick={() => likeMutation.mutate(post.id.toString())}
            disabled={likeMutation.isPending}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{post.likes_count ?? 0}</span>
          </Button>
          <span>{post.comments_count} comments</span>
        </div>
      </article>

      <section className="rounded-xl">
        <h2 className="text-sm font-semibold tracking-tight md:text-base">
          Discussion
        </h2>
        <div className="mt-3" id="comments">
          <CommentSection postId={post.id} />
        </div>
      </section>
    </div>
  );
}

