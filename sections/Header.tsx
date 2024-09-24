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
    <nav class="py-8 lg:px-0 px-6 bottom-0 w-full mx-auto">
      <div class="flex flex-row items-center justify-between text-xl">
        <div class="w-1/3"></div>
        <div class="flex items-center justify-center w-1/3">
          {text}
          {image && (
            <Image
              src={image || ""}
              alt={alt || ""}
              height={height || 20}
              width={width || 50}
              class="ml-2"
            />
          )}
        </div>
        <div class="flex gap-4 w-1/3 justify-end pr-6">
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
