import { RegisterFields } from "../types/auth";

export async function forgotPassword(email: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/forgotPassword`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }
  );

  return res.json();
}

export async function verifyResetCode(code: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/verifyResetCode`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resetCode: code }),
    }
  );

  return res.json();
}

export async function resetPassword(email: string, newPassword: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/resetPassword`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      }
    );

    const result = await res.json();

    return { ok: true, result };
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export async function registerUser(payload: RegisterFields) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    return { ok: true, data };
  } catch (err: unknown) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Something went wrong",
    };
  }
}
