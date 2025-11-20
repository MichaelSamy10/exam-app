"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import PasswordField from "./password-field";

export default function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: !email.trim(),
      password: !password.trim(),
    };

    if (email.trim() === "" || password.trim() === "") {
      setErrors(newErrors);
    }

    if (newErrors.email || newErrors.password) return;

    router.push("/dashboard");
  };
  return (
    <form onSubmit={handleLogin}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              hasError={errors.email}
              value={email}
              id="firstName"
              type="text"
              placeholder="Ahmed"
              onChange={(e) => setEmail(e.target.value)}
              errorMessage={errors.email ? "Your email is required" : ""}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              hasError={errors.email}
              value={email}
              id="lastName"
              type="text"
              placeholder="Abdullah"
              onChange={(e) => setEmail(e.target.value)}
              errorMessage={errors.email ? "Your email is required" : ""}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            hasError={errors.email}
            value={email}
            id="username"
            type="text"
            placeholder="user123"
            onChange={(e) => setEmail(e.target.value)}
            errorMessage={errors.email ? "Your email is required" : ""}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            hasError={errors.email}
            value={email}
            id="email"
            type="email"
            placeholder="user@example.com"
            onChange={(e) => setEmail(e.target.value)}
            errorMessage={errors.email ? "Your email is required" : ""}
          />
        </div>
        <PhoneInput
          placeholder="1012345678"
          id="phone"
          className="mt-0"
          errorMessage=""
        />

        <PasswordField
          label="Password"
          value={password}
          id="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          hasError={errors.password}
          errorMessage={errors.password ? "Your password is required" : ""}
        />

        <PasswordField
          label="Confirm Password"
          value={password}
          id="confirmPassword"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          hasError={errors.password}
          errorMessage={errors.password ? "Your password is required" : ""}
        />

        <Button className="w-full mb-9" type="submit">
          Create Account
        </Button>
      </div>
    </form>
  );
}
