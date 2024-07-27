export interface CTA {
  id?: string;
  href: string;
  text: string;
  style?: "Outline" | "Ghost";
}

export interface Props {
  title?: string;
  /** @format code */
  description?: string;
  textPlacement?: "justify" | "center";
  cta?: CTA[];
  disableSpacing?: {
    top?: boolean;
    bottom?: boolean;
  };
}

const PLACEMENT = {
  justify: "",
  center: "text-center",
};

export default function TextParagraph({
  title = "Sobre o casamento",
  description =
  "Vamos curtir um fim de semana na serra do Rio. A cerimônia e festa são no sábado, dia 3. Reserve a sua agenda, compre as suas passagens e conte os dias conosco! 😄",
  textPlacement = "justify",
  disableSpacing,
}: Props) {
  return (
    <div class="lg:container md:max-w-6xl lg:mx-auto mx-4 md:mx-8 text-lg">
      <div
        class={`flex flex-col gap-12 md:gap-20 text-left items-center z-10 px-4 ${disableSpacing?.top ? "" : "pt-16 lg:pt-32"
          } ${disableSpacing?.bottom ? "" : "pb-16 lg:pb-32"}`}
      >
        <div class={`w-full max-w-xl gap-4 z-10 ${PLACEMENT[textPlacement]
          }`}>
          <p    
            class="text-3xl lg:text-5xl !leading-normal"
            style="font-family: Lateef;">
            {title}
          </p>
          <div class="text-md lg:text-lg leading-[171.3%] mt-4"
            dangerouslySetInnerHTML={{ "__html": description }}
            style="font-family: Lato;">
          </div>
        </div>
      </div>
    </div>
  );
}
