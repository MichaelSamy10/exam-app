import {
  ForgotResponse,
  LoginResponse,
  RegisterFields,
  ResetFields,
  ResetResponse,
} from "../types/auth";
import { AnswerCheckBody, CheckQuestionResponse } from "../types/questions";
import { apiRequest } from "../utils/api-handler";

export function forgotPassword(data: { email: string }) {
  return apiRequest<{ email: string }, ForgotResponse>(
    "/auth/forgotPassword",
    data,
    "POST"
  );
}

export function verifyResetCode(data: { resetCode: string }) {
  return apiRequest<{ resetCode: string }, { status: string }>(
    "/auth/verifyResetCode",
    data,
    "POST"
  );
}

export function resetPassword(data: ResetFields) {
  return apiRequest<ResetFields, ResetResponse>(
    "/auth/resetPassword",
    data,
    "PUT"
  );
}

export function registerUser(data: RegisterFields) {
  return apiRequest<RegisterFields, LoginResponse>(
    "/auth/signup",
    data,
    "POST"
  );
}

export async function submitAnswers(answers: AnswerCheckBody) {
  try {
    const response = await fetch("/api/check-answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answers }),
    });

    const data: CheckQuestionResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
