import { UserInfoResponse } from "@/lib/types/user-info";
import { createAuthenticatedHandler } from "@/lib/utils/api-handler";

export const GET =
  createAuthenticatedHandler<UserInfoResponse>("/auth/profileData");
