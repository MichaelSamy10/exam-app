import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function LoginPage() {
  return (
    <div className="m-5">
      <Label htmlFor="email">Email</Label>
      <Input className="w-80" type="email" placeholder="Email" />
    </div>
  );
}
