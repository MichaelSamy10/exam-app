import { SubjectResponse } from "@/lib/types/subjects";
import { createAuthenticatedHandler } from "@/lib/utils/api-handler";

// export async function GET(req: NextRequest) {
//   try {
//     const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//     if (!token?.accessToken) {
//       return NextResponse.json(
//         { message: "token not provided", code: 401 },
//         { status: 401 }
//       );
//     }

//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/subjects`,
//       {
//         headers: {
//           token: token?.accessToken,
//         },
//       }
//     );

//     // Always parse the JSON response from your backend
//     const data: ApiResponse<SubjectResponse> = await response.json();

//     // Check if backend returned an error (has 'code' property)
//     if ("code" in data) {
//       return NextResponse.json({ message: data.message, code: data.code });
//     }

//     // Success response (has 'data' property)
//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json({
//       message: error instanceof Error ? error.message : "An unexpected error occurred",
//       code: 500,
//     });
//   }
// }

export const GET = createAuthenticatedHandler<SubjectResponse>("/subjects");
