import { Button } from "@/components/ui/button";
import React from "react";

export default function TestComp() {
  return (
    <div>
      <Button variant={"destructive"} size={"default"} className="h-[2.8rem]">
        Click here
      </Button>
    </div>
  );
}
