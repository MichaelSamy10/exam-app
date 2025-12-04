import { ExamResponse } from "@/lib/types/exams";
import { createAuthenticatedHandler } from "@/lib/utils/api-handler";

// export async function GET(req: NextRequest) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   if (!token?.accessToken) {
//     return NextResponse.json(
//       { message: "token not provided" },
//       { status: 401 }
//     );
//   }

//   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exams`, {
//     headers: {
//       token: token?.accessToken,
//     },
//   });

//   const data: ApiResponse<ExamResponse> = await response.json();

//   if ("code" in data) {
//     throw new Error(data.message);
//   }

//   return NextResponse.json(data);
// }

export const GET = createAuthenticatedHandler<ExamResponse>("/exams");
