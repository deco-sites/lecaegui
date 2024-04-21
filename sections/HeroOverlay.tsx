import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface CTA {
  id?: string;
  href: string;
  text: string;
  outline?: boolean;
}

export interface Props {
  /** @format rich-text */ 
  title?: string;
  /** @format rich-text */ 
  description?: string;
  image?: ImageWidget;
  placement?: "left" | "right" | "center";
  cta?: CTA[];
  textColorTailwind: string;
  overlayBgColor?: string;
  overlayBorderRadius?: string;
  overlayBlur?: string;
  overlayOpacity?: number;
}

export default function HeroFlats({
  title = "Click here to tweak this text however you want.",
  description = "This text is fully editable and ready for your personal touch.",
  image = "https://placehold.co/3000x1800",
  placement = "left",
  cta = [],
  textColorTailwind = "white",
  overlayBgColor = "rgba(255, 255, 255, 0.8)",
  overlayBorderRadius = "8px",
  overlayBlur = "4px",
  overlayOpacity = 0.8,
}: Props) {
  const textContainerStyle = {
    backdropFilter: `blur(${overlayBlur})`,
    backgroundColor: overlayBgColor,
    borderRadius: overlayBorderRadius,
    opacity: overlayOpacity,
    padding: '20px',
    maxWidth: '60%',
  };

  // Adjust margin based on placement
  const textContainerMargin = placement === 'left' ? 'mr-auto ml-20' : placement === 'right' ? 'ml-auto mr-20' : 'mx-auto';
  const alignmentClasses = placement === 'center' ? 'text-center' : placement === 'left' ? 'text-left' : 'text-right';

  return (
    <nav class="lg:mx-auto">
      <div class={`flex flex-col items-center gap-8 relative text-${textColorTailwind}`}>
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
        <div class={`flex w-full xl:mx-auto py-10 mx-2 md:mx-10 z-20 relative ${alignmentClasses} lg:py-36 gap-12 md:gap-20 items-center`}>
          <div class={`space-y-4 lg:w-1/2 lg:max-w-xl ${textContainerMargin}`} style={textContainerStyle}>
            <div
              class="inline-block text-6xl leading-none"
              dangerouslySetInnerHTML={{ __html: title }}
            ></div>
            <p class="text-lg leading-[150%]" dangerouslySetInnerHTML={{ "__html": description }}></p>
            <div class="flex items-center gap-3 justify-center lg:justify-start">
              {cta.map((item) => (
                <a
                  key={item.id}
                  id={item.id}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : "_self"}
                  class={`font-normal btn btn-primary ${item.outline ? "btn-outline" : ""}`}
                >
                  {item.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
