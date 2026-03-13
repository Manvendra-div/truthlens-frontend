"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "@/lib/api/comments";
import { commentsKey } from "./comment-list";
import { toast } from "sonner";
import type { Comment } from "@/types/comment";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "../ui/input";
import { MessageCircle } from "lucide-react";

type CommentFormProps = {
  postId: number | string;
};

export function CommentForm({ postId }: CommentFormProps) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (content: string) => createComment(postId, content),
    onMutate: async (content: string) => {
      if (!isAuthenticated) {
        toast.info("Log in to comment.");
        throw new Error("Not authenticated");
      }

      await queryClient.cancelQueries({ queryKey: commentsKey(postId) });
      const previous = queryClient.getQueryData<Comment[]>(commentsKey(postId));

      const optimistic: Comment = {
        id: Date.now(),
        content,
        user_id: user?.id ? Number(user.id) : 0,
        post_id: Number(postId),
        created_at: new Date().toISOString(),
      };

      queryClient.setQueryData<Comment[]>(commentsKey(postId), (existing) =>
        existing ? [...existing, optimistic] : [optimistic]
      );

      setValue("");

      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(commentsKey(postId), context.previous);
      }
      toast.error("Unable to add comment right now.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: commentsKey(postId) });
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    mutation.mutate(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 relative bg-background p-4 rounded-b-md">
      <Textarea
        placeholder={
          isAuthenticated
            ? "Add your perspective…"
            : "Log in to join the discussion…"
        }
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={mutation.isPending || !isAuthenticated}
        maxLength={150}
        className={`${isFocused ? "ring-8 ring-primary/40" : undefined} bg-background`}
      />
      <span className="text-xs text-muted-foreground absolute bottom-13 right-6">{value.length}/150</span>

      <Button
        type="submit"
        size="sm"
        disabled={mutation.isPending || !value.trim() || !isAuthenticated}
        className="w-full"
      >
        <MessageCircle className="size-4" />
        {mutation.isPending ? "Posting…" : "Post comment"}
      </Button>

    </form>
  );
}

