import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Nav {
  text?: string;
  image?: ImageWidget;
  alt?: string;
  width?: number;
  height?: number;
  translateIcon?: ImageWidget;
  selectIcon?: ImageWidget;
}

export default function Header({
  text,
  image,
  alt,
  width,
  height,
  // translateIcon,
  // selectIcon,
}: Nav) {
  return (
    <nav className="py-8 px-6 w-full bg-transparent fixed top-0 z-10">
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between text-xl">
        <div className="flex items-center gap-8">
          <div className="flex items-center">
            {text}
            {image && (
              <Image
                src={image || ""}
                alt={alt || ""}
                height={height || 20}
                width={width || 50}
                className="ml-2"
              />
            )}
          </div>
          <div className="flex gap-4">
            <a
              href="#herosided"
              onClick={(e) => handleSmoothScroll(e, "herosided")}
            >
              RSVP
            </a>
            <span>/</span>
            <a
              href="#"
              onClick={(e) => handleSmoothScroll(e, "photogrid")}
            >
              informações
            </a>
            <span>/</span>
            <a href="#" onClick={(e) => handleSmoothScroll(e, "faq")}>
              Donate
            </a>
          </div>
        </div>

        {
          /* <div className="relative">
          <select
            className="appearance-none bg-white border border-gray-300 rounded-full py-2 px-4 pr-8 pl-10 text-sm cursor-pointer focus:outline-none focus:border-gray-500"
            onChange={(e) => handleLanguageChange(e)}
          >
            <option value="en">en</option>
            <option value="pt">pt</option>
          </select>

          {translateIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Image
                src={translateIcon}
                alt="Translate Icon"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
          )}

          {selectIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Image
                src={selectIcon}
                alt="Select Icon"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
          )}
        </div> */
        }
      </div>
    </nav>
  );
}

function handleSmoothScroll(e: Event, id: string) {
  e.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    globalThis.scrollTo({
      top: element.offsetTop,
      behavior: "smooth",
    });
  }
}

// function handleLanguageChange(e: React.ChangeEvent<HTMLSelectElement>) {
//   const selectedLanguage = e.currentTarget.value;
//   console.log(`Idioma selecionado: ${selectedLanguage}`);
// }
