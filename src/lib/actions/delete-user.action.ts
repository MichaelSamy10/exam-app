export const deleteUser = async () => {
  try {
    const response = await fetch("/api/delete-user", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
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
