import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { GuestList } from "site/loaders/guests.ts";
import GuestSearch from "site/islands/GuestSearch.tsx";

export interface Props {
  /** @format code */
  title?: string;
  subtitle?: string;
  image?: ImageWidget;
  guests?: GuestList;
  backgroundtexture?: ImageWidget;
}

export default function HeroFlats({
  title = "Alexia & Guilherme",
  subtitle = "Save the Date",
  image = "https://placehold.co/3000x1800",
  guests,
  backgroundtexture,
}: Props) {
  return (
    <nav
      id="herosided"
      class="flex flex-row justify-center"
      style={{
        backgroundImage: backgroundtexture
          ? `url(${backgroundtexture})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div class="flex flex-row items-center relative w-full max-w-7xl lg:mx-auto h-[calc((832/1280)*100vw)] xl:h-[832px]">
        <div class="flex flex-col items-start w-1/2 z-20 p-8 space-y-6">
          <div class="space-y-4 lg:max-w-2xl animate-fadeIn">
            <div
              class="block text-5xl lg:text-8xl text-black"
              style="font-family: Mr De Haviland"
            >
              {title}
            </div>
            <div class="block text-sm lg:text-base leading-normal uppercase helvetica tracking-[8px] text-black">
              {subtitle}
            </div>
          </div>

          <GuestSearch
            guests={Array.isArray(guests?.data) ? guests.data : []}
          />
        </div>
        {image && (
          <div class="w-1/2 h-full">
            <Image
              width={640}
              height={832}
              class="w-full h-full object-cover"
              style={{ aspectRatio: "640 / 832" }}
              sizes="50vw"
              src={image}
              alt={title}
              decoding="async"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </nav>
  );
}
