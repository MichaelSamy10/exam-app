import React from "react";
import FeaturesCard from "./_components/features-card";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex md:flex-col lg:flex-row min-h-screen">
      <div className="flex-1 relative overflow-hidden md:block hidden">
        <FeaturesCard />
      </div>
      <div className="flex-1 self-center pt-8 lg:pt-0">{children}</div>
    </div>
  );
}
