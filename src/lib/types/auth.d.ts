import {
  forgotPasswordSchema,
  loginSchema,
  profileSchema,
  registerSchema,
  resetSchema,
  changePasswordSchema,
} from "../schemas/auth.schema";

export type LoginResponse = {
  token: string;
  user: User["user"];
};

export type ForgotResponse = {
  message: string;
  info: string;
};

export type ResetResponse = {
  message: string;
};

export type LoginFields = z.infer<typeof loginSchema>;

export type RegisterFields = z.infer<typeof registerSchema>;

export type OtpFields = {
  resetCode: string;
};

export type ProfileFields = z.infer<typeof profileSchema>;

export type ForgotPasswordFields = z.infer<typeof forgotPasswordSchema>;

export type ResetFields = z.infer<typeof resetSchema>;

export type changePasswordFields = z.infer<typeof changePasswordSchema>;

export type ChangePasswordPayload = {
  oldPassword: string;
  password: string;
  rePassword: string;
};
