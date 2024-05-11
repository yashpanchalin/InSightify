"use client";
import React, { Children } from "react";
import reactElementToJSXString from "react-element-to-jsx-string";
import { toast, Toaster } from "sonner";
import { ButtonsCard } from "@/components/ui/tailwindcss-buttons";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <div className="flex items-center justify-center h-40">
      {buttons.map((button, idx) => (
        <ButtonsCard key={idx}>{button.component}</ButtonsCard>
      ))}
      <button onClick={onClick}>{children}</button>
    </div>
  );
};
export const buttons = [
  {
    name: "Get Started",
    showDot: false,
    component: (
      <div className="flex justify-cente md:justify-center items-center lg:justify-center">
        <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-300 px-3 py-1 text-sm font-medium text-black backdrop-blur-3xl">
            Get Started
          </span>
        </button>
      </div>
    ),
  },
];
export default Button;
