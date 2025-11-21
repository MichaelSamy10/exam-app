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
  } catch (error: any) {
    throw new Error(error.message);
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
  } catch (err: any) {
    return { ok: false, error: err.message || "Something went wrong" };
  }
}
