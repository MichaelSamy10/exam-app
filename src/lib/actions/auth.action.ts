import {
  ForgotResponse,
  LoginResponse,
  RegisterFields,
  ResetFields,
  ResetResponse,
} from "../types/auth";
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
