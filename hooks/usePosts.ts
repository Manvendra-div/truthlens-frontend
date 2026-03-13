"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Post } from "@/types/post";
import {
  createPost,
  fetchPostById,
  fetchPosts,
  likePost,
} from "@/lib/api";

const POSTS_KEY_ROOT = ["posts"] as const;

export const postsKeys = {
  all: POSTS_KEY_ROOT,
  list: () => [...POSTS_KEY_ROOT, "list"] as const,
  detail: (id: string) => [...POSTS_KEY_ROOT, "detail", id] as const,
};

export function usePosts() {
  const queryClient = useQueryClient();

  const postsQuery = useQuery<Post[]>({
    queryKey: postsKeys.list(),
    queryFn: fetchPosts,
  });

  const createPostMutation = useMutation<
    Post,
    Error,
    { title: string; content: string }
  >({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsKeys.list() });
    },
  });

  const likePostMutation = useMutation<{ likesCount: number }, Error, string>({
    mutationFn: likePost,
    onSuccess: (_data, postId) => {
      queryClient.invalidateQueries({ queryKey: postsKeys.detail(postId) });
      queryClient.invalidateQueries({ queryKey: postsKeys.list() });
    },
  });

  return {
    postsQuery,
    createPostMutation,
    likePostMutation,
  };
}

export function usePostDetail(id: string) {
  return useQuery<Post>({
    queryKey: postsKeys.detail(id),
    queryFn: () => fetchPostById(id),
    enabled: Boolean(id),
  });
}

