import { routing } from "@/i18n/routing";
import { BookOpenCheck, Brain, RectangleEllipsis } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function FeaturesCard() {
  // Translation
  const t = useTranslations("auth-pages.auth-layout");

  const features = [
    {
      icon: <Brain />,
      title: t("title-1"),
      description: t("description-1"),
    },
    {
      icon: <BookOpenCheck />,
      title: t("title-2"),
      description: t("description-2"),
    },
    {
      icon: <RectangleEllipsis />,
      title: t("title-3"),
      description: t("description-1"),
    },
  ];

  return (
    <>
      <Image
        src="/assets/images/Overlay.png"
        alt="bg"
        fill
        sizes="100%"
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
          {t("header")}
        </div>
        <div>
          <h2 className="text-gray-800 font-secondary rtl:font-tajawal font-bold text-3xl mb-14 ">
            {t("subtitle")}
          </h2>
          <div className="ms-5 flex flex-col">
            {features.map((item, id) => (
              <div key={id} className="flex mb-9">
                <div className="text-primary border-2 w-[32px] h-[32px] border-blue-600 p-[3px] me-5 inline-flex items-center justify-center">
                  <span className="w-6 h-6">{item.icon}</span>
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
