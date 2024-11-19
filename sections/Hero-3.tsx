import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: ImageWidget;
  placement?: "left" | "right";
  backgroundtexture?: ImageWidget;
  prefixIcon?: ImageWidget;
}

const PLACEMENT = {
  left: "flex-col-reverse text-left lg:flex-row-reverse",
  right: "flex-col-reverse text-left lg:flex-row",
};

export function LoadingFallback() {
  return (
    <div className="h-screen w-full flex justify-center align-center">
      <span class="loading loading-spinner loading-md"></span>
    </div>
  );
}

export default function HeroFlats({
  title = "Click here to tweak this text however you want.",
  subtitle = "",
  description =
    "This text is fully editable and ready for your personal touch. Just click here, head over to the section window, or dive straight into the code to make changes as you see fit. Whether it's about the content, formatting, font, or anything in between, editing is just a click away.",
  image = "https://placehold.co/3000x1800",
  placement = "left",
  backgroundtexture,
  prefixIcon,
}: Props) {
  return (
    <div
      style={{
        backgroundImage: backgroundtexture
          ? `url(${backgroundtexture})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <nav class="lg:container lg:mx-auto mx-4">
        <div class="flex flex-col items-center gap-8">
          <div
            class={`flex w-full xl:container xl:mx-auto py-20 mx-5 md:mx-10 ${
              image
                ? PLACEMENT[placement]
                : "flex-col items-center justify-center text-center"
            } lg:py-36 gap-12 md:gap-20 items-center`}
          >
            {image && (
              <div class="w-1/2 h-full">
                <Image
                  width={640}
                  height={832}
                  class="w-full h-full object-contain"
                  style={{ aspectRatio: "815 / 943" }}
                  sizes="50vw"
                  src={image}
                  alt={title}
                  decoding="async"
                  loading="lazy"
                />
              </div>
            )}

            <div
              class={`mx-6 lg:mx-auto lg:w-full space-y-4 gap-4 ${
                image
                  ? "lg:w-1/2 lg:max-w-xl"
                  : "flex flex-col items-center justify-center lg:max-w-3xl"
              }`}
            >
              {prefixIcon && (
                <div class="w-16 h-16">
                  <Image
                    width={64}
                    height={64}
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
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
