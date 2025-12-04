import { BookOpenCheck } from "lucide-react";
import React from "react";
import DashboardHeading from "../_components/dashboard-heading";
import ExamsCard from "./_components/examsCard";
import BreadCrumb from "../_components/breadcrumb";

export default function Exams() {
  return (
    <div>
      <BreadCrumb items={[{ label: "Exams", href: "/dashboard/exams" }]} />

      <div className="bg-gray-50 p-6">
        <DashboardHeading
          title="Exams"
          icon={<BookOpenCheck width={45} height={45} />}
          backButton={true}
        />
        <ExamsCard />
      </div>
    </div>
  );
}
