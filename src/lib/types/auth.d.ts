export type LoginResponse = {
  token: string;
  user: User["user"];
};

export type LoginFields = {
  email: string;
  password: string;
};

export interface ResetPasswordForm {
  newPassword: string;
  confirmPassword: string;
}
