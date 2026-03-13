import { apiClient } from "@/lib/api";
import type { Post } from "@/types/post";

const POSTS_BASE_PATH = "/posts";

export async function getPosts(): Promise<Post[]> {
  const { data } = await apiClient.get<Post[]>(POSTS_BASE_PATH, {
    withCredentials: true,
  });
  return data;
}

export async function getPost(postId: number | string): Promise<Post> {
  const { data } = await apiClient.get<Post>(`${POSTS_BASE_PATH}/${postId}`, {
    withCredentials: true,
  });
  return data;
}

export async function createPost(payload: {
  title: string;
  content: string;
}): Promise<Post> {
  const { data } = await apiClient.post<Post>(POSTS_BASE_PATH, payload, {
    withCredentials: true,
  });
  return data;
}

export async function deletePost(postId: number | string): Promise<void> {
  await apiClient.delete(`${POSTS_BASE_PATH}/${postId}`, {
    withCredentials: true,
  });
}
