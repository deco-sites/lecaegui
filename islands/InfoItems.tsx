import { useState } from "preact/hooks";
import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Option {
  title: string;
  image: ImageWidget;
  description: string;
}

export interface Props {
  prefixIcon?: ImageWidget;
  title?: string;
  backgroundtexture?: ImageWidget;
  options?: {
    label: string;
    items: Option[];
  }[];
}

export default function Info({
  title = "",
  prefixIcon,
  backgroundtexture,
  options = [],
}: Props) {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    options.length > 0 ? options[0].label : null,
  );

  const renderOptions = (items?: Option[]) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {items?.map((item, index) => (
          <div
            key={index}
            className="min-w-[300px] border border-[#656D4A] flex flex-col items-center"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={400}
              className="w-full h-64 object-cover"
              decoding="async"
              loading="lazy"
            />

            <div className="p-8">
              <h3 className="text-4xl font-semibold text-[#10150B] mb-2">
                {item.title}
              </h3>
              <p className="text-lg text-[#656D4A]">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const selectedItems = options.find((opt) => opt.label === selectedOption)
    ?.items;

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        backgroundImage: backgroundtexture
          ? `url(${backgroundtexture})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center relative w-full max-w-7xl lg:mx-auto h-[calc((832/1280)*100vw)] xl:h-[832px]">
        {prefixIcon && (
          <div className="w-16 h-16 mb-6">
            <Image
              width={64}
              height={64}
              src={prefixIcon}
              alt="Icon"
              className="w-full h-full object-contain"
              decoding="async"
              loading="lazy"
            />
          </div>
        )}

        <h1 className="text-4xl lg:text-5xl text-[#10150B] font-bold mb-8">
          {title}
        </h1>

        <div className="w-full">
          <div className="flex justify-center space-x-6 mb-6">
            {options.map((option, index) => (
              <button
                key={index}
                className={`px-4 py-2 text-sm text-[#656D4A] border border-[#656D4A] font-semibold rounded-full ${
                  selectedOption === option.label
                    ? "bg-[#656D4A] text-white"
                    : "bg-transparent"
                }`}
                onClick={() => setSelectedOption(option.label)}
              >
                {option.label}
              </button>
            ))}
          </div>
          {renderOptions(selectedItems)}
        </div>
      </div>
    </div>
  );
}
