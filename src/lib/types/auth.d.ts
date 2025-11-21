export type LoginResponse = {
  token: string;
  user: User["user"];
};

export type RegisterFields = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
};

export type LoginFields = {
  email: string;
  password: string;
};

export interface ResetPasswordFields {
  newPassword: string;
  confirmPassword: string;
}
