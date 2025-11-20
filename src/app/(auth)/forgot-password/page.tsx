import Link from "next/link";
import React from "react";
import ForgotForm from "./_components/forgot-form";

export default function ForgotPassword() {
  return (
    <div>
      <div className="w-[452px] h-[340px] m-auto mt-4">
        <ForgotForm />
        <div className="text-center text-gray-500 mt-9">
          Don’t have an account?&nbsp;
          <Link className="text-primary text-sm" href={"/register"}>
            Create yours
          </Link>
        </div>
      </div>
    </div>
  );
}
