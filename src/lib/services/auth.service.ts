import { ExamResponse } from "../types/exams";
import { QuestionsResponse } from "../types/questions";
import { SubjectResponse } from "../types/subjects";
import { UserInfoResponse } from "../types/user-info";

export const getUserInfo = async () => {
  const response = await fetch("/api/user-info");

  if (!response.ok) {
    throw new Error("Failed to fetch User Data");
  }

  const payload: ApiResponse<UserInfoResponse> = await response.json();

  if ("code" in payload) {
    throw new Error(payload.message);
  }

  return payload;
};

export const getSubjects = async () => {
  const response = await fetch("/api/subjects");

  if (!response.ok) {
    throw new Error("Failed to fetch subjects");
  }

  const payload: ApiResponse<SubjectResponse> = await response.json();

  if ("code" in payload) {
    throw new Error(payload.message);
  }

  return payload;
};

export const getExams = async () => {
  const response = await fetch(`/api/exams`);

  if (!response.ok) {
    throw new Error("Failed to fetch Exams");
  }

  const payload: ApiResponse<ExamResponse> = await response.json();

  if ("code" in payload) {
    throw new Error(payload.message);
  }

  return payload;
};

export const getQuestions = async (examId: string) => {
  const response = await fetch(`/api/questions?exam=${examId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }

  const payload: ApiResponse<QuestionsResponse> = await response.json();

  if ("code" in payload) {
    throw new Error(payload.message);
  }

  return payload;
};
