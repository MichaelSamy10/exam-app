import React from "react";
import RegisterForm from "./_components/register-form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="w-[452px] m-auto">
      <h2 className="font-secondary font-bold text-3xl mb-10">
        Create Account
      </h2>
      <RegisterForm />
      <div className="text-center text-gray-500">
        Already have an account?{" "}
        <Link className="text-primary text-sm" href={"/login"}>
          Login
        </Link>
      </div>
    </div>
  );
}
