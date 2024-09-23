import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  /** @format code */
  title?: string;
  subtitle?: string;
  image?: ImageWidget;
}

export default function HeroFlats({
  title = "Alexia & Guilherme",
  subtitle = "Save the Date",
  image = "https://placehold.co/3000x1800",
}: Props) {
  return (
    <nav class="flex flex-row justify-center">
      <div
        class="flex flex-row items-center justify-between relative w-full max-w-[1280px] lg:mx-auto h-[calc((832/1280)*100vw)] xl:h-[832px]"
      >
        <div class="flex flex-col items-start w-1/2 z-20 p-8 space-y-6">
          <div class="space-y-4 lg:max-w-2xl animate-fadeIn">
            <div
              class="block text-sm lg:text-2xl leading-normal uppercase helvetica tracking-[8px] text-black"
            >
              {subtitle}
            </div>
            <div
              class="block text-5xl lg:text-8xl text-black"
              style="font-family: Mr De Haviland"
            >
              {title}
            </div>
          </div>
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text text-black">Digite o nome do convidado
              </span>
            </label>
            <input
              type="text"
              placeholder="Ex: Ana"
              class="input input-bordered w-full max-w-xs bg-white text-black"
            />
          </div>
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
