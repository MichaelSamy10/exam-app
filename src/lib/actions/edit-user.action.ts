import { ProfileFields } from "../types/auth";
import { UserInfoResponse } from "../types/user-info";

export const editUserInfo = async (data: ProfileFields) => {
  try {
    const response = await fetch("/api/edit-user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const payload: ApiResponse<UserInfoResponse> = await response.json();

    if ("code" in payload) {
      return { ok: false, error: payload.message };
    }

    return { ok: true, data: payload };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Something went wrong",
    };
  }
};
