import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { DonorList } from "site/loaders/donates.ts";
import PixModal from "site/islands/PixModal.tsx";

export interface Props {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: ImageWidget;
  placement?: "left" | "right";
  backgroundtexture?: ImageWidget;
  prefixIcon?: ImageWidget;
  donors?: DonorList;
  pixQRCode?: ImageWidget;
}

const PLACEMENT = {
  left: "flex-col text-left lg:flex-row-reverse",
  right: "flex-col text-left lg:flex-row",
};

export function LoadingFallback() {
  return (
    <div className="h-screen w-full flex justify-center align-center">
      <span class="loading loading-spinner loading-md"></span>
    </div>
  );
}

export default function HeroFlats({
  title = "Main Title",
  subtitle = "",
  description = "This is the description text.",
  image = "https://placehold.co/3000x1800",
  placement = "right",
  backgroundtexture,
  prefixIcon,
}: Props) {
  return (
    <nav
      id="donate"
      style={{
        backgroundImage: backgroundtexture
          ? `url(${backgroundtexture})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div class="relative flex flex-col items-center gap-12 lg:container lg:mx-auto mx-4 py-10">
        <div
          class={`flex w-full xl:container xl:mx-auto py-20 mx-5 md:mx-10 ${
            image ? PLACEMENT[placement] : "flex-col items-center text-center"
          } lg:py-36 gap-16 md:gap-20 items-center relative`}
        >
          {image && (
            <div class="w-2/3 h-full relative">
              <Image
                width={1000}
                height={832}
                class="w-full h-full object-cover"
                sizes="50vw"
                src={image}
                alt={title}
                decoding="async"
                loading="lazy"
              />

              {/* Contêiner para Cards sobrepostos com mais espaçamento */}
              <div class="absolute inset-0 flex flex-col items-center justify-center gap-8 p-12">
                {/* Linha de 3 cards */}
                <div class="flex gap-8">
                  <div class="bg-white p-6 shadow-lg rounded-lg">Card 1</div>
                  <div class="bg-white p-6 shadow-lg rounded-lg">Card 2</div>
                  <div class="bg-white p-6 shadow-lg rounded-lg">Card 3</div>
                </div>

                {/* Linha de 2 cards */}
                <div class="flex gap-8">
                  <div class="bg-white p-6 shadow-lg rounded-lg">Card 4</div>
                  <div class="bg-white p-6 shadow-lg rounded-lg">Card 5</div>
                </div>

                {/* Linha de 3 cards */}
                <div class="flex gap-8">
                  <div class="bg-white p-6 shadow-lg rounded-lg">Card 6</div>
                  <div class="bg-white p-6 shadow-lg rounded-lg">Card 7</div>
                  <div class="bg-white p-6 shadow-lg rounded-lg">Card 8</div>
                </div>

                {/* Linha de 2 cards */}
                <div class="flex gap-8">
                  <div class="bg-white p-6 shadow-lg rounded-lg">Card 9</div>
                  <div class="bg-white p-6 shadow-lg rounded-lg">Card 10</div>
                </div>
              </div>
            </div>
          )}

          {/* Conteúdo principal */}
          <div
            class={`mx-6 lg:mx-auto lg:w-full space-y-6 gap-6 ${
              image
                ? "lg:w-1/2 lg:max-w-xl"
                : "flex flex-col items-center lg:max-w-3xl"
            }`}
          >
            {prefixIcon && (
              <div class="w-40 h-26">
                <Image
                  width={180}
                  height={70}
                  src={prefixIcon}
                  alt="Icon"
                  class="w-full h-full object-contain"
                  decoding="async"
                  loading="lazy"
                />
              </div>
            )}

            {subtitle && (
              <p
                class="text-[24px] font-semibold uppercase"
                style={{ color: "#606C3866" }}
              >
                {subtitle}
              </p>
            )}

            <div
              class="inline-block text-[48px] leading-none font-medium"
              style={{ color: "#10150B" }}
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            >
            </div>

            <p class="text-[18px]" style={{ color: "#333D29" }}>
              {description}
            </p>
            <PixModal />
          </div>
        </div>
      </div>
    </nav>
  );
}
