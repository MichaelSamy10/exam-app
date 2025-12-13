import { ExamResponse } from "@/lib/types/exams";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.accessToken) {
      return NextResponse.json(
        { message: "token not provided" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/subjects?${searchParams.toString()}`,
      {
        headers: {
          token: token.accessToken,
        },
      }
    );

    const data: ApiResponse<ExamResponse> = await response.json();

    if ("code" in data) {
      return NextResponse.json(
        { message: data.message },
        { status: data.code }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
