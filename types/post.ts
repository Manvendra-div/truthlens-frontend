import type { User } from "./user";
import type { Comment } from "./comment";
import type { Prediction } from "./prediction";

export type Post = {
  id: number;
  title: string;
  content: string;
  author: User;
  prediction: Prediction;
  comments_count: number;
  created_at: string;
  likes_count?: number;
  comments?: Comment[];
};
