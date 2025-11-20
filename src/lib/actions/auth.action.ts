export async function forgotPassword(email: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/forgotPassword`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to send reset link");
  }

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

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to verify code");
  }

  return res.json();
}

// lib/services/auth.ts

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

    if (!res.ok) {
      throw new Error(result.message || "Failed to reset password");
    }

    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
