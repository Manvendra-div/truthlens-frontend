import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Comment } from "@/types/comment";
import { getComments, deleteComment } from "@/lib/api/comments";
import { CommentItem } from "./comment-item";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/error-state";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

type CommentListProps = {
  postId: number | string;
};

const commentsKey = (postId: number | string) => ["comments", postId] as const;

export function CommentList({ postId }: CommentListProps) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const currentUserId = user?.id ? Number(user.id) : undefined;

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery<Comment[]>({
    queryKey: commentsKey(postId),
    queryFn: () => getComments(postId),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: (_data, commentId) => {
      queryClient.setQueryData<Comment[]>(commentsKey(postId), (existing) =>
        existing ? existing.filter((c) => c.id !== Number(commentId)) : existing
      );
    },
    onError: () => {
      toast.error("Unable to delete comment right now.");
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorState
        message="Unable to load comments."
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No comments yet. Be the first to share your view.
      </p>
    );
  }

  return (
    <ul className="space-y-2 md:space-y-3">
      {data.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          canDelete={
            typeof currentUserId === "number" &&
            currentUserId === comment.user_id
          }
          onDelete={(id) => deleteMutation.mutate(id)}
        />
      ))}
    </ul>
  );
}

export { commentsKey };

