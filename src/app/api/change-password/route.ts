import { ResetResponse } from "@/lib/types/auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token?.accessToken) {
      return NextResponse.json(
        { message: "token not provided" },
        { status: 401 }
      );
    }

    const passwords = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/changePassword`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: token?.accessToken,
        },
        body: JSON.stringify(passwords),
      }
    );

    const data: ApiResponse<ResetResponse> = await response.json();

    if ("code" in data) {
      return NextResponse.json({ message: data.message, code: data.code });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
      code: 500,
    });
  }
}
