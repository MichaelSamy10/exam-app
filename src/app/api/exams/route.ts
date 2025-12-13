import { ExamResponse } from "@/lib/types/exams";
import { createAuthenticatedHandler } from "@/lib/utils/api-handler";

export const GET = createAuthenticatedHandler<ExamResponse>("/exams");
