import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface CTA {
  id?: string;
  href: string;
  text: string;
  outline?: boolean;
}

export interface Props {
  title?: string; 
  /** 
   * @format rich-text
   */
  description?: string;
  image?: ImageWidget;
  placement?: "left" | "right";
  cta?: CTA[];
  overlay?: boolean;
  textColorTailwind: string;
  overlayBgColor?: string;
  overlayBorderRadius?: string;
  overlayBlur?: string;
  overlayOpacity?: number;
}

const PLACEMENT = {
  left: "flex-col text-left lg:flex-row-reverse",
  right: "flex-col text-left lg:flex-row",
};

export default function HeroFlats({
  title = "Click here to tweak this text however you want.",
  description = "This text is fully editable and ready for your personal touch.",
  image = "https://placehold.co/3000x1800",
  placement = "left",
  cta = [],
  overlay = true,
  textColorTailwind = "white",
  overlayBgColor = "rgba(255, 255, 255, 0.8)",
  overlayBorderRadius = "8px",
  overlayBlur = "4px",
  overlayOpacity = 0.8,
}: Props) {
  // Adjusted to apply overlay styles directly to text container
  const textContainerStyle = overlay ? {
    backdropFilter: `blur(${overlayBlur})`,
    backgroundColor: overlayBgColor,
    borderRadius: overlayBorderRadius,
    opacity: overlayOpacity,
    padding: '20px', // Adjust padding as needed
    margin: '20px', // Centers the text container and adds margin
    maxWidth: '50%', // Ensures the text container doesn't span the full width of its parent
  } : {};

  return (
    <nav class="lg:mx-auto">
      <div class={`flex flex-col items-center gap-8 ${overlay ? "relative" : ""} text-${textColorTailwind}`}>
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
        <div
          class={`flex w-full xl:mx-auto py-20 mx-5 md:mx-10 ${overlay ? "z-20 relative" : "z-10"} ${image ? PLACEMENT[placement] : "flex-col items-center justify-center text-center"
            } lg:py-36 gap-12 md:gap-20 items-center`}
        >
          <div
            class={`mx-6 lg:mx-auto lg:w-full space-y-4 ${image ? "lg:w-1/2 lg:max-w-xl" : "flex flex-col items-center justify-center lg:max-w-3xl"}`}
            style={textContainerStyle} // Apply the style here
          >
            <div
              class="inline-block lg:text-[80px] text-4xl leading-none font-medium"
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            ></div>
            <p class="text-lg md:text-md leading-[150%]" dangerouslySetInnerHTML={{ "__html": description}}></p>
            <div class="flex items-center gap-3">
              {cta?.map((item) => (
                <a
                  key={item?.id}
                  id={item?.id}
                  href={item?.href}
                  target={item?.href.startsWith("http") ? "_blank" : "_self"}
                  class={`font-normal btn btn-primary ${item.outline ? "btn-outline" : ""}`}
                >
                  {item?.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
