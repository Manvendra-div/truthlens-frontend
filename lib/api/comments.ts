import { apiClient } from "@/lib/api";
import type { Comment } from "@/types/comment";

const COMMENTS_BASE_PATH = "/comments";

export async function getComments(postId: number | string): Promise<Comment[]> {
  const { data } = await apiClient.get<Comment[]>(
    `${COMMENTS_BASE_PATH}/${postId}`,
    {
      withCredentials: true,
    }
  );
  return data;
}

export async function createComment(
  postId: number | string,
  content: string
): Promise<Comment> {
  const { data } = await apiClient.post<Comment>(
    `${COMMENTS_BASE_PATH}/${postId}`,
    { content },
    {
      withCredentials: true,
    }
  );
  return data;
}

export async function deleteComment(
  commentId: number | string
): Promise<void> {
  await apiClient.delete(`${COMMENTS_BASE_PATH}/${commentId}`, {
    withCredentials: true,
  });
}

