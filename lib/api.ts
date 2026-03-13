import axios from "axios";
import type { Post } from "@/types/post";
import type { Prediction } from "@/types/prediction";
import type { Comment } from "@/types/comment";
import type { User } from "@/types/user";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("tl_access_token");
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

type AuthResponse = {
  access_token: string;
  user: User;
};

export async function signup(payload: {
  username: string;
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>("/auth/signup", payload);
  return data;
}

export async function login(payload: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>("/auth/login", payload);
  return data;
}

export async function logout(): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>("/auth/logout");
  return data;
}

export async function getGoogleLoginUrl(): Promise<{ url: string }> {
  const { data } = await apiClient.get<{ url: string }>("/auth/google/login");
  return data;
}

export async function createPost(payload: {
  title: string;
  content: string;
}): Promise<Post> {
  const { data } = await apiClient.post<Post>("/posts", payload);
  return data;
}

export async function fetchPosts(): Promise<Post[]> {
  const { data } = await apiClient.get<Post[]>("/posts");
  return data;
}

export async function fetchPostById(id: string): Promise<Post> {
  const { data } = await apiClient.get<Post>(`/posts/${id}`);
  return data;
}

export async function createComment(payload: {
  postId: string;
  content: string;
}): Promise<Comment> {
  const { data } = await apiClient.post<Comment>("/comments", payload);
  return data;
}

export async function likePost(postId: string): Promise<{ likesCount: number }> {
  const { data } = await apiClient.post<{ likesCount: number }>("/likes", {
    postId,
  });
  return data;
}

export async function runPrediction(payload: {
  text: string;
}): Promise<Prediction> {
  const { data } = await apiClient.post<Prediction>("/predict", payload);
  return data;
}

