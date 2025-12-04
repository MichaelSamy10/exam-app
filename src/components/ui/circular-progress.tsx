import React from "react";

interface CircularProgressProps {
  value: number; // 0 → 100 (%)
  size?: number; // width/height in px
  strokeWidth?: number;
}

export function CircularProgress({
  value,
  size = 80,
  strokeWidth = 6,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      className="rotate-[-90deg] overflow-visible"
    >
      {/* Background Circle */}
      <circle
        stroke="#DBEAFE"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />

      {/* Progress Circle */}
      <circle
        stroke="#155DFC"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeLinecap="butt"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        r={radius}
        cx={size / 2}
        cy={size / 2}
        className="transition-all duration-300"
      />
    </svg>
  );
}
