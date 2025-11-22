"use client";

// import { authOptions } from "@/auth";
import { Button } from "@/components/ui/button";
// import { getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  // const session = await getServerSession(authOptions);
  const { data: session } = useSession();
  return (
    <div>
      <p>
        {/* {session?.user?.firstName} {session?.user?.lastName} */}
        {session?.user?.firstName} {session?.user?.lastName}
      </p>
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
}
