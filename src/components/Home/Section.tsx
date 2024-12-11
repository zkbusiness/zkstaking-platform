import Image from "next/image";

export interface SectionProps {
  subtitle: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  reversed?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  subtitle,
  title,
  description,
  imageSrc,
  imageAlt,
  reversed = false,
}) => {
  return (
    <section
      className={` px-6 lg:px-12 xl:px-28 py-8 md:py-10 ${
        reversed ? "" : "md:flex-row-reverse"
      } flex flex-col md:flex-row  justify-between items-center gap-10 z-50`}
    >
      {imageSrc && (
        <div className="w-full max-w-[400px]  aspect-square relative">
          <Image
            src={imageSrc || ""}
            alt={imageAlt || ""}
            width={400}
            height={400}
          />
        </div>
      )}
      <div
        className={`space-y-4 md:space-y-6 ${
          imageSrc ? "md:max-w-[50%]" : ""
        } `}
      >
        <h3 className="text-[#4075FF]  tracking-wider text-lg md:text-xl font-bold">
          {subtitle}
        </h3>
        <h2
          className={`text-5xl font-bold ${
            imageSrc ? "max-w-[500px]" : ""
          } text-white`}
        >
          {title}
        </h2>

        <p className="text-lg md:text-xl flex flex-col mt-10 space-y-16 ">
          {description}
        </p>
      </div>
    </section>
  );
};
