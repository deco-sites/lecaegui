import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy alt
 */
export interface Photo {
  /**
   * @title Image
   */
  image?: ImageWidget;
  /**
   * @description Number to appear in front of image
   */
  text: string;
}

export interface Props {
  banners: Photo[];
  preload?: boolean;
}

export default function PhotoGrid(props: Props) {
  const {
    banners = [],
    preload,
  } = props;

  return (
    <section
      id="photogrid"
      class="w-full px-4 lg:px-8 py-12 max-w-[1280px] mx-auto"
    >
      <div
        class={`grid sm:grid-cols-3 gap-4 xl:gap-8`}
      >
        {banners.map(({ text, image }, index) => (
          <a
            key={index}
            style={{ aspectRatio: "384 / 536" }}
            class={`group relative overflow-hidden`}
          >
            {image && (
              <Image
                width={384}
                height={536}
                class="w-full object-cover absolute top-0 left-0 z-0"
                style={{ aspectRatio: "384 / 536" }}
                src={image}
                alt={image}
                decoding="async"
                loading={preload ? "eager" : "lazy"}
              />
            )}
            <div
              class={`flex w-full h-full z-20 relative text-center items-end justify-center`}
            >
              <span
                class="text-[#FBFAF9] text-[100px] lg:text-[175px] xl:text-[200px] leading-none"
                style="font-family:'jsMath-cmr10 cmr10';"
              >
                {text}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
