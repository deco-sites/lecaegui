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
      <div class="flex flex-row gap-1 items-center justify-center text-xl helvetica">
        {text}
        {image && (
          <Image
            src={image || ""}
            alt={alt || ""}
            height={height || 20}
            width={width || 50}
          />
        )}
      </div>
    </nav>
  );
}
