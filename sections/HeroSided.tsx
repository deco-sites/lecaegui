import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { GuestList } from "site/loaders/guests.ts";
import GuestSearch from "site/islands/GuestSearch.tsx";

export interface Props {
  title?: string;
  titleBrake?: string;
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
  title = "Alexia",
  titleBrake = "& Guilherme",
  subtitle = "Save the Date",
  image = "https://placehold.co/3000x1800",
  guests,
  backgroundtexture,
  date,
}: Props) {

  return (
    <nav
      id="herosided"
      class="relative flex justify-center items-center h-screen"
      style={{
        backgroundImage: backgroundtexture
          ? `url(${backgroundtexture})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Imagem de fundo ocupando 2/3 da tela */}
      {image && (
        <div
          class="absolute top-0 right-0 w-2/3 h-full"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      )}

      {/* Conteúdo sobreposto à imagem */}
      <div class="relative z-10 w-full sm:w-9/12 max-w-7xl mx-auto flex flex-col justify-center h-screen p-8 space-y-6">
        <div class="flex flex-col md:items-start items-center font-quincy space-y-4 animate-fadeIn">
          <h1 class="text-5xl lg:text-9xl text-black">{title}</h1>
          <h1 class="text-5xl lg:text-9xl text-black">{titleBrake}</h1>
          <p
            class="text-sm lg:text-base leading-normal uppercase tracking-[8px] text-black"
            style={{
              fontFamily: "Open Sauce one Regular, serif",
              fontWeight: 300,
            }}
          >
            {subtitle}
          </p>
          <p class="font-bold text-sm lg:text-base leading-normal uppercase tracking-[8px] text-black">
            {date}
          </p>
        </div>

        <GuestSearch
          guests={Array.isArray(guests?.data) ? guests.data : []}
        />
      </div>
    </nav>
  );
}
