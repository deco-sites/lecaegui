import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Nav {
  text?: string;
  image?: ImageWidget;
  alt?: string;
  width?: number;
  height?: number;
}

export default function Header({ text, image, alt, width, height }: Nav) {
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
            <a href="#" onClick={(e) => handleSmoothScroll(e, "faq")}>Donate</a>
          </div>
        </div>
        <span>tradução</span>
      </div>
    </nav>
  );
}

function handleSmoothScroll(
  e: Event,
  id: string,
) {
  e.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    globalThis.scrollTo({
      top: element.offsetTop,
      behavior: "smooth",
    });
  }
}
