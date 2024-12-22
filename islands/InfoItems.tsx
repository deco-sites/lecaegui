import { useState } from "preact/hooks";
import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Option {
  title: string;
  image?: ImageWidget;
  description: string;
  site?: string;
  phone?: string;
  distance?: string;
  observation?: string;
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
            className="min-w-[300px] border border-[#656D4A] flex flex-col items-center mx-4 md:mx-0 rounded"
          >
            {item.image && (
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                className="w-full h-64 object-cover"
                decoding="async"
                loading="lazy"
              />
            )}
            <div className="p-8 text-left">
              <h3 className="text-4xl font-semibold text-[#10150B] mb-2">
                {item.title}
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {item.site && (
                  <a
                    href={item.site}
                    target="_blank"
                    className="px-4 py-1 text-sm bg-[#656D4A] text-white rounded-full flex items-center gap-1"
                  >
                    <span>🌐</span>
                    <span>Site</span>
                  </a>
                )}
                {item.phone && (
                  <div className="px-6 py-1 text-sm bg-[#656D4A] text-white rounded-full flex items-center gap-1">
                    <span>📞</span>
                    <span>{item.phone}</span>
                  </div>
                )}
                {item.distance && (
                  <div className="px-6 py-1 text-sm bg-[#656D4A] text-white rounded-full flex items-center gap-1">
                    <span>➜</span>
                    <span>{item.distance.replace('min', 'minutos de distância do evento')}</span>
                  </div>
                )}
              </div>
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
    <nav
      id="information"
      className="flex flex-col items-center justify-center"
      style={{
        backgroundImage: backgroundtexture
          ? `url(${backgroundtexture})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center relative w-full max-w-7xl lg:mx-auto">
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

        <h1 className="text-4xl font-quincy lg:text-5xl text-[#10150B] font-bold mb-8 text-center md:text-left">
          {title}
        </h1>

        <div className="w-full flex flex-col items-center">
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
    </nav>
  );
}
