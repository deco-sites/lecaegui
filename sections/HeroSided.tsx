import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { GuestList } from "site/loaders/guests.ts";
import GuestSearch from "site/islands/GuestSearch.tsx";

export interface Props {
  title?: string;
  subtitle?: string;
  date?: string;
  image?: ImageWidget;
  guests?: GuestList;
  backgroundtexture?: ImageWidget;
}

export function LoadingFallback() {
  return (
    <div className="h-screen w-full flex justify-center align-center">
      <span class="loading loading-spinner loading-md"></span>
    </div>
  );
}

export default function HeroFlats({
  title = "Alexia & Guilherme",
  subtitle = "Save the Date",
  image = "https://placehold.co/3000x1800",
  guests,
  backgroundtexture,
  date,
}: Props) {
  return (
    <nav
      id="herosided"
      class="flex flex-col sm:flex-row justify-center"
      style={{
        backgroundImage: backgroundtexture
          ? `url(${backgroundtexture})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div class="flex flex-col mt-24 lg:mt-0 sm:flex-row items-center justify-center w-full max-w-7xl lg:mx-auto h-auto sm:h-[calc((832/1280)*100vw)] xl:h-[832px]">
        <div class="flex flex-col md:items-start items-center w-full sm:w-1/2 z-20 p-8 space-y-6 order-1 sm:order-1">
          <div class="flex flex-col items-center md:items-start items-center space-y-4 lg:max-w-2xl animate-fadeIn">
            <div
              class="block text-5xl lg:text-8xl text-black"
              style="font-family: Quincy CF"
            >
              {title}
            </div>
            <div class="block text-sm lg:text-base leading-normal uppercase tracking-[8px] text-black"
                  style="font-family: 'Open Sauce one', sans-serif; font-weight: 300;">
              {subtitle}
            </div>
            <div class="block font-bold text-sm lg:text-base leading-normal uppercase helvetica tracking-[8px] text-black">
              {date}
            </div>
          </div>

          <GuestSearch
            guests={Array.isArray(guests?.data) ? guests.data : []}
          />
        </div>
        {image && (
          <div class="w-full sm:w-1/2 h-full order-2 sm:order-2">
            <Image
              width={1309}
              height={1139}
              class="w-full h-full object-cover"
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
