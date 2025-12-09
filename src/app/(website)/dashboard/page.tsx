// "use client";

// import { authOptions } from "@/auth";
// import { getServerSession } from "next-auth";
// import { signOut, useSession } from "next-auth/react";
import { GraduationCap } from "lucide-react";
import DashboardHeading from "./_components/dashboard-heading";
import DiplomaCard from "./_components/diploma-card";
import BreadCrumb from "./_components/breadcrumb";

export default async function Home() {
  return (
    <>
      <BreadCrumb />

      <div className="bg-gray-50 p-6 min-h-screen">
        <DashboardHeading
          backButton={false}
          title="Diplomas"
          icon={<GraduationCap width={45} height={45} />}
        />
        <DiplomaCard />
      </div>
    </>
  );
}
