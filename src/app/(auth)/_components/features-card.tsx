import { BookOpenCheck, Brain, RectangleEllipsis } from "lucide-react";
import Image from "next/image";

export default function FeaturesCard() {
  const features = [
    {
      icon: <Brain width={24} height={24} className="text-primary" />,
      title: "Tailored Diplomas",
      description:
        "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
    },
    {
      icon: <BookOpenCheck width={24} height={24} className="text-primary" />,
      title: "Focused Exams",
      description:
        "Access topic-specific tests including HTML, CSS, JavaScript, and more.",
    },
    {
      icon: (
        <RectangleEllipsis width={24} height={24} className="text-primary" />
      ),
      title: "Smart Multi-Step Forms",
      description:
        "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
    },
  ];
  return (
    <>
      <Image
        src="/assets/images/Overlay.png"
        alt="bg"
        fill
        style={{ filter: "blur(150px)" }}
        priority
      />

      <div
        className="relative z-10 ps-32 pe-32 flex flex-col justify-evenly"
        style={{ height: "100%" }}
      >
        <div className="flex items-center gap-2 text-primary text-xl font-semibold ">
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
          <div className="ms-5 flex flex-col">
            {features.map((item, id) => (
              <div key={id} className="flex mb-9">
                <div className="border-2 w-[32px] h-[32px] border-blue-600 p-[3px] me-5 inline-flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-primary font-semibold text-xl mb-2">
                    {item.title}
                  </h3>
                  <p className="text-base">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
