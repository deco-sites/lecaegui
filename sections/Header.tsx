import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Nav {
  text: string
  image?: ImageWidget;
  alt?: string;
  width?: number;
  height?: number;
}

export default function Header({text, image, alt, width, height} : Nav) {
  return (
    <nav className="bg-[#ECE1D3] py-8 px-6 w-full">
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between text-xl">
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
          <a href="#herosided" onClick={(e) => handleSmoothScroll(e, 'herosided')}>Rsvp</a>
          <a href="#photogrid" onClick={(e) => handleSmoothScroll(e, 'photogrid')}>Data</a>
          <a href="#faq" onClick={(e) => handleSmoothScroll(e, 'faq')}>Sobre</a>
        </div>
      </div>
    </nav>
  );
}

function handleSmoothScroll(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
  e.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    window.scrollTo({
      top: element.offsetTop,
      behavior: 'smooth',
    });
  }
}
