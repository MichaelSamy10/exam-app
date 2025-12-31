import { cn } from "@/lib/utils/tailwind-merge";
import { BookOpenCheck, Brain, RectangleEllipsis } from "lucide-react";
import Image from "next/image";

export default function FeaturesCard() {
  const features = [
    {
      icon: Brain,
      title: "Tailored Diplomas",
      description:
        "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
    },
    {
      icon: BookOpenCheck,
      title: "Focused Exams",
      description:
        "Access topic-specific tests including HTML, CSS, JavaScript, and more.",
    },
    {
      icon: RectangleEllipsis,
      title: "Smart Multi-Step Forms",
      description:
        "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
    },
  ];
  return (
    <div
      className={cn(
        "px-32 flex flex-col justify-evenly relative",
        "before:absolute before:top-24 before:-right-16 before:bg-blue-200 before:size-80 before:rounded-full before:blur-3xl before:-z-10",
        "after:absolute after:-bottom-24 after:-left-16 after:bg-blue-200 after:size-80 after:rounded-full after:blur-3xl after:-z-10"
      )}
      style={{ height: "100%" }}
    >
      <div className="flex items-center gap-2 text-primary text-xl font-semibold">
        <Image
          src="/assets/icons/folder-code.svg"
          width={40}
          height={40}
          alt="icon"
        />
        Exam App
      </div>
      <div>
        <h2 className="text-gray-800 font-secondary font-bold text-3xl mb-14 ">
          Empower your learning journey with our smart exam platform.
        </h2>
        <div className="flex flex-col space-y-9">
          {features.map((item, id) => (
            <div key={id} className="flex gap-5">
              {/* Icon */}
              <span className="border-2 border-blue-600 text-blue-600 size-9 flex items-center justify-center shrink-0">
                <item.icon className="size-6" />
              </span>

              {/* Content */}
              <div className="space-y-2.5">
                {/* Title */}
                <p className="text-primary font-semibold text-xl">
                  {item.title}
                </p>
                <p className="text-gray-700">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
