import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface Props {
  href?: string;
  image?: ImageWidget;
  alt?: string;
  width?: number;
  height?: number;
  text?: string;
}

function Footer({
  image =
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4959/d7aa9290-074f-417c-99c3-5b0587c8c2ee",
  href = "https://deco.cx/",
  text = "SAVE THE DATE — 05 . 03 . 2025",
  alt = "Made with deco.cx",
  height = 30,
  width = 60,
}: Props) {
  return (
    <div class="flex items-center w-full md:h-20 h-30 py-8 px-6 lg:px-0 bg-[#333D29] mx-auto">
      <div class="flex flex-col md:flex-row items-center justify-center w-full text-lg text-white px-8">
        {image && (
          <Image
            src={image || ""}
            alt={alt || ""}
            height={height || 20}
            width={width || 50}
            href={href || ""}
          />
        )}
        {text && <p class="text-left md:ml-auto Quincy CF">{text}</p>}
      </div>
    </div>
  );
}

export default Footer;
