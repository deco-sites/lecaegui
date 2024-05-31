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
  subtitle = "Save the Date",
  location = "Itaipava, RJ",
  time = "03.05.2025",
  image = "https://placehold.co/3000x1800",
}: Props) {

  return (
    <nav class="lg:mx-auto">
      <div class={`flex flex-col items-center gap-8 relative text-secondary`}>
        {image && (
          <Image
            width={640}
            class="w-full lg:w-full object-cover absolute top-0 left-0 h-full z-0"
            sizes="(max-width: 640px) 100vw, 100vw"
            src={image}
            alt={image}
            decoding="async"
            loading="lazy"
          />
        )}
        <div class={`flex w-full xl:mx-auto py-10 mx-2 md:mx-10 z-20 relative text-center lg:py-36 gap-12 md:gap-20 items-center`}>
          <div class={`space-y-4 lg:w-1/3 w-2/3  lg:max-w-xl mx-auto`}>
            <div
              class="inline-block text-2xl leading-none"
              dangerouslySetInnerHTML={{ __html: subtitle }}
            ></div>
            <div
              class="inline-block text-6xl leading-none"
              dangerouslySetInnerHTML={{ __html: title }}
            ></div>
            <div class="text-2xl leading-[150%]" dangerouslySetInnerHTML={{ "__html": location }}></div> 
            <div class="text-2xl leading-[150%]" dangerouslySetInnerHTML={{ "__html": time }}></div> 
          </div>
        </div>
      </div>
    </nav>
  );
}
