import React from "react";
import FeaturesCard from "./_components/features-card";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row min-h-screen ">
      <div className="flex-1 relative  overflow-hidden">
        <FeaturesCard />
      </div>
      <div className="flex-1 self-center">{children}</div>
    </div>
  );
}
