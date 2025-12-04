import { QuestionsResponse } from "@/lib/types/questions";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  try {
    if (!token?.accessToken) {
      return NextResponse.json(
        { message: "token not provided" },
        { status: 401 }
      );
    }

    const examId = req.nextUrl.searchParams.get("exam");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/questions?exam=${examId}`,
      {
        headers: {
          token: token?.accessToken,
        },
      }
    );

    const data: ApiResponse<QuestionsResponse> = await response.json();

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
