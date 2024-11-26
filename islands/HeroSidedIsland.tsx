import { useState, useEffect } from "preact/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { GuestList } from "site/loaders/guests.ts";
import GuestSearch from "site/islands/GuestSearch.tsx";

export interface Props {
  title?: string;
  titleBrake?: string; // Usado no desktop
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

export default function ResponsiveHeroFlats({
  title = "Alexia",
  titleBrake = "& Guilherme",
  subtitle = "Save the Date",
  image = "https://placehold.co/3000x1800",
  guests,
  backgroundtexture,
  date,
}: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(globalThis.innerWidth < 768); // Define o breakpoint para telas mobile
    };

    handleResize(); // Chamada inicial
    globalThis.addEventListener("resize", handleResize); // Atualiza ao redimensionar

    return () => {
      globalThis.removeEventListener("resize", handleResize); // Limpa o evento
    };
  }, []);

  if (isMobile) {
    // Primeiro código (para mobile)
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
            <div class="flex flex-col items-center font-quincy md:items-start items-center space-y-4 lg:max-w-2xl animate-fadeIn">
              <div class="block text-5xl lg:text-8xl text-black">{title} {titleBrake}</div>
              <div
                class="block text-sm lg:text-base leading-normal uppercase tracking-[8px] text-black"
                style={{
                  fontFamily: "Open Sauce one Regular, serif",
                  fontWeight: 300,
                }}
              >
                {subtitle}
              </div>
              <div class="block font-bold font-opensauce text-sm lg:text-base leading-normal uppercase tracking-[8px] text-black">
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

  // Segundo código (para desktop)
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
