import { UserInfoResponse } from "@/lib/types/user-info";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token?.accessToken) {
      return NextResponse.json(
        { message: "token not provided" },
        { status: 401 }
      );
    }
    const userData = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/editProfile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token?.accessToken,
        },
        body: JSON.stringify(userData),
      }
    );

    const data: ApiResponse<UserInfoResponse> = await response.json();

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
