import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CheckQuestionResponse } from "@/lib/types/questions";
import React from "react";
import { Pie, PieChart } from "recharts";

type ResultsProps = {
  result: CheckQuestionResponse;
};

export default function ResultsChart({ result }: ResultsProps) {
  const chartData = [
    {
      name: "Correct",
      value: result.correct,
      fill: "#00BC7D",
    },

    {
      name: "Wrong",
      value: result.wrong,
      fill: "#EF4444",
    },
  ];

  const chartConfig = {
    value: {
      label: "Answers",
    },
    Correct: {
      label: "Correct",
      color: "#00BC7D",
    },
    Wrong: {
      label: "Wrong",
      color: "#EF4444",
    },
  } as ChartConfig;

  return (
    <Card className="flex flex-col justify-center items-center border-none shadow-none">
      <CardContent className="">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-[203px] h-[203px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="90%"
              innerRadius="60%"
              strokeWidth={0}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 items-start">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 text bg-green-500"></div>
          <span className="text-sm">Correct: {result.correct}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500"></div>
          <span className="text-sm">Wrong: {result.wrong}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
