import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token?.accessToken) {
      return NextResponse.json(
        { message: "token not provided" },
        { status: 401 }
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/deleteMe`,
      {
        method: "DELETE",
        headers: {
          token: token?.accessToken,
        },
      }
    );

    const data: ApiResponse<{ message: string }> = await response.json();

    if ("code" in data) {
      throw new Error(data.message);
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
