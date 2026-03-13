import Link from "next/link";
import { MessageCircle, Share2, ThumbsUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PredictionBadge } from "@/components/prediction-badge";
import type { Post } from "@/types/post";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost } from "@/lib/api";
import { postsKeys } from "../hooks/usePosts";
import { toast } from "sonner";
import { CommentSection } from "@/components/comments/comment-section";

type PostCardProps = {
  post: Post;
  compact?: boolean;
};

export function PostCard({ post, compact }: PostCardProps) {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsKeys.list() });
      queryClient.invalidateQueries({ queryKey: postsKeys.detail(post.id.toString()) });
    },
    onError: () => {
      toast.error("Unable to like post right now.");
    },
  });

  const handleLike = () => {
    if (!isAuthenticated) {
      toast.info("Log in to like posts.");
      return;
    }
    likeMutation.mutate(post.id.toString());
  };

  return (
    <Card className="group border-border/70 bg-card/70 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
      <CardHeader className="gap-1 pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-base md:text-lg">
              <Link href={`/post/${post.id}`} className="hover:underline">
                {post.title}
              </Link>
            </CardTitle>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span>{post.author?.username ?? "Unknown"}</span>
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
      </CardHeader>
      <CardContent className="pb-3 text-sm text-muted-foreground">
        <p className="line-clamp-3 leading-relaxed">
          {compact ? `${post.content.slice(0, 240)}…` : post.content}
        </p>
      </CardContent>
      <CardFooter className="justify-between gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleLike}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition hover:text-primary"
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{post.likes_count ?? 0}</span>
          </button>
          <Link
            href={`/post/${post.id}#comments`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition hover:text-primary"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{post.comments_count}</span>
          </Link>
        </div>
        <Button
          variant="ghost"
          size="xs"
          type="button"
          className="ml-auto h-7 gap-1 text-[11px] text-muted-foreground hover:text-primary"
          onClick={() => {
            void navigator.clipboard
              .writeText(window.location.origin + `/post/${post.id}`)
              .then(() => toast.success("Link copied to clipboard"))
              .catch(() => toast.error("Unable to copy link"));
          }}
        >
          <Share2 className="h-3 w-3" />
          Share
        </Button>
      </CardFooter>
      <div className="border-t px-4 pb-4 pt-3 md:px-6">
        <CommentSection postId={post.id} />
      </div>
    </Card>
  );
}

