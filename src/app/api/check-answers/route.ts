import { CheckQuestionResponse } from "@/lib/types/questions";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token?.accessToken) {
    return NextResponse.json(
      { message: "token not provided" },
      { status: 401 }
    );
  }

  const { answers } = await req.json();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/questions/check`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token?.accessToken,
      },
      body: JSON.stringify({ answers }),
    }
  );

  const data: ApiResponse<CheckQuestionResponse> = await response.json();

  if ("code" in data) {
    throw new Error(data.message);
  }

  return NextResponse.json(data);
}
