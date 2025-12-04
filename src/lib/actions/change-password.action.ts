import { ChangePasswordPayload } from "../types/auth";

export const changePassword = async (data: ChangePasswordPayload) => {
  try {
    const response = await fetch("/api/change-password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const payload = await response.json();

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
