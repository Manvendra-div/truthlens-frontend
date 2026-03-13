import { apiClient } from "@/lib/api";
import type { User } from "@/types/user";

const USERS_BASE_PATH = "/auth";

export async function getCurrentUser(): Promise<User> {
  const { data } = await apiClient.get<User>(`${USERS_BASE_PATH}/me`, {
    withCredentials: true,
  });
  return data;
}
