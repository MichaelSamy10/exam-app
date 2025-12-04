import z from "zod";

export const loginSchema = z.object({
  email: z.email({
    error: (issue) =>
      issue.input === "" ? "Email is required" : "Invalid email",
  }),
  password: z.string().nonempty("Password is required"),
});

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .nonempty("First name is required")
      .min(3, "first name must be at least 3 characters"),
    lastName: z
      .string()
      .nonempty("Last name is required")
      .min(3, "last name must be at least 3 characters"),
    username: z
      .string()
      .nonempty("Username is required")
      .min(3, "Username must be at least 3 characters"),
    email: z.email({
      error: (issue) =>
        issue.input === "" ? "Email is required" : "Invalid email",
    }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Password must include at least one lowercase letter")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter")
      .regex(/\d/, "Password must include at least one number")
      .regex(/[^\w\s]/, "Password must include at least one special character"),
    rePassword: z.string().nonempty("Password is required"),
    phone: z.string().nonempty("Phone is required"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.email({
    error: (issue) =>
      issue.input === "" ? "Email is required" : "Invalid email",
  }),
});

export const resetSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Password must include at least one lowercase letter")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter")
      .regex(/\d/, "Password must include at least one number")
      .regex(/[^\w\s]/, "Password must include at least one special character"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Password must include at least one lowercase letter")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter")
      .regex(/\d/, "Password must include at least one number")
      .regex(/[^\w\s]/, "Password must include at least one special character"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  firstName: z
    .string()
    .nonempty("First name is required")
    .min(3, "First name must be at least 3 characters"),
  lastName: z
    .string()
    .nonempty("Last name is required")
    .min(3, "Last name must be at least 3 characters"),
  username: z
    .string()
    .nonempty("Username is required")
    .min(3, "Username must be at least 3 characters"),
  email: z.email({
    error: (issue) =>
      issue.input === "" ? "Email is required" : "Invalid email",
  }),
  phone: z
    .string()
    .nonempty("Phone number is required")
    .transform((val) => (val.startsWith("+20") ? val.slice(3) : val))
    .refine((val) => /^(\+20)?01[0125][0-9]{8}$/.test(val), {
      message: "Invalid mobile number",
    }),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().nonempty("Current Password is required"),
    newPassword: z
      .string()
      .nonempty("New Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Password must include at least one lowercase letter")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter")
      .regex(/\d/, "Password must include at least one number")
      .regex(/[^\w\s]/, "Password must include at least one special character"),
    confirmNewPassword: z
      .string()
      .nonempty("Confirm Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Password must include at least one lowercase letter")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter")
      .regex(/\d/, "Password must include at least one number")
      .regex(/[^\w\s]/, "Password must include at least one special character"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });
