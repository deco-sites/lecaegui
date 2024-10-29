import { useEffect, useState } from "preact/hooks";
import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  image: ImageWidget;
  title: string;
  subtitle: string;
  backgroundTexture: ImageWidget;
}

export default function CountdownBanner(
  { image, title, subtitle, backgroundTexture }: Props,
) {
  const targetDate = new Date("2025-03-05T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        const dias = Math.floor(distance / (1000 * 60 * 60 * 24));
        const horas = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutos = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ dias, horas, minutos, segundos });
      } else {
        setTimeLeft({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
        clearInterval(interval);
      }
    };

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div
      className="flex flex-col justify-center"
      style={{
        backgroundImage: backgroundTexture
          ? `url(${backgroundTexture})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Image
        src={image}
        alt="Background"
        width={1920}
        height={1080}
        className="w-full h-full object-cover"
        decoding="async"
        loading="lazy"
      />

      <div className="flex flex-col w-full bg-[#656D4A] py-12 px-14 items-center text-center md:flex-row md:justify-evenly md:text-left">
        <div className="mb-6 md:mb-0">
          <p className="text-2xl uppercase text-[#7E8A5A]">{title}</p>
          <h2 className="text-4xl text-white max-w-[19ch] break-words text-center lg:text-left">
            {subtitle}
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {["dias", "horas", "minutos", "segundos"].map((unit, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#333D29] flex items-center justify-center text-white text-3xl font-bold">
                {timeLeft[unit as keyof typeof timeLeft]}
              </div>
              <span className="mt-2 text-white text-sm uppercase">
                {unit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
