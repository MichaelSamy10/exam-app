import Link from "next/link";
import LoginForm from "./_components/login-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="w-[452px] m-auto">
      <h2 className="font-secondary font-bold text-3xl mb-10">Login</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
      <div className="text-center text-gray-500 mt-9">
        Don’t have an account?&nbsp;
        <Link className="text-primary text-sm" href={"/register"}>
          Create yours
        </Link>
      </div>
    </div>
  );
}
