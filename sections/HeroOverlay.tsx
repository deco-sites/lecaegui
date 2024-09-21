import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  /** @format code */
  title?: string;
  subtitle?: string;
  location?: string;
  time?: string;
  image?: ImageWidget;
}

export default function HeroFlats({
  title = "Alexia & Guilherme",
  subtitle = "",
  location = "Itaipava, RJ",
  time = "03 de Maio, 2025",
  image = "https://placehold.co/3000x1800",
}: Props) {
  return (
    <nav class="flex flex-row justify-center">
      <div
        class={`flex flex-col items-center gap-8 relative text-secondary w-full max-w-[1280px] lg:mx-auto h-[calc((832/1280)*100vw)] xl:h-[832px]`}
      >
        {image && (
          <Image
            width={640}
            height={416}
            class="w-full object-cover absolute top-0 left-0 z-0"
            style={{ aspectRatio: "640 / 416" }}
            sizes="(max-width: 640px) 100vw, 100vw"
            src={image}
            alt={image}
            decoding="async"
            loading="lazy"
          />
        )}
        <div
          class={`flex w-full pb-24 pt-6 mx-2 md:mx-10 z-20 relative text-center lg:pb-40 lg:pt-16 gap-12 md:gap-20 items-center`}
        >
          <div class={`space-y-4 lg:max-w-2xl mx-auto animate-fadeIn`}>
            <div
              class="block text-sm lg:text-2xl leading-normal uppercase helvetica tracking-[8px]"
              dangerouslySetInnerHTML={{ __html: subtitle }}
            >
            </div>
            <div
              class="block text-5xl lg:text-8xl"
              style="font-family: Mr De Haviland"
              dangerouslySetInnerHTML={{ __html: title }}
            >
            </div>
            <div class="hidden md:block">
              <div
                class="text-md lg:text-2xl leading-normal"
                dangerouslySetInnerHTML={{ "__html": location }}
              >
              </div>
              <div
                class="text-xl lg:text-3xl leading-normal tracking-[8px]"
                style="font-family: Lato; font-weight: 500"
                dangerouslySetInnerHTML={{ "__html": time }}
              >
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
