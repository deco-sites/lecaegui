import { useEffect, useState } from "preact/hooks";
import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Nav {
  text?: string;
  image?: ImageWidget;
  alt?: string;
  width?: number;
  height?: number;
  translateIcon?: ImageWidget;
  selectIcon?: ImageWidget;
}

function HeaderNav({
  text,
  image,
  alt,
  width,
  height,
}: Nav) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = globalThis.scrollY;

    const handleScroll = () => {
      if (globalThis.scrollY > lastScrollY) {
        // Rolando para baixo
        setIsVisible(false);
      } else {
        // Rolando para cima
        setIsVisible(true);
      }
      lastScrollY = globalThis.scrollY;
    };

    globalThis.addEventListener("scroll", handleScroll);
    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`py-8 px-6 w-full bg-transparent fixed top-0 z-10 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between text-xl">
        <div className="flex items-center gap-8">
          <div className="flex items-center">
            {text}
            {image && (
              <Image
                src={image || ""}
                alt={alt || ""}
                height={height || 20}
                width={width || 50}
                className="ml-2"
              />
            )}
          </div>

          <div className="hidden md:flex gap-4">
            <a
              href="#herosided"
              onClick={(e) => handleSmoothScroll(e, "herosided")}
            >
              RSVP
            </a>
            <span>/</span>
            <a
              href="#information"
              onClick={(e) => handleSmoothScroll(e, "information")}
            >
              Informações
            </a>
            <span>/</span>
            <a href="#donate" onClick={(e) => handleSmoothScroll(e, "donate")}>
              Donate
            </a>
          </div>
        </div>

        {/* Botão de menu hamburguer para dispositivos móveis */}
        <button
          className="md:hidden flex items-center text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Menu de navegação para dispositivos móveis */}
        {menuOpen && (
          <div className="absolute top-20 right-6 bg-[#FEFAE0] rounded-lg p-6 shadow-md flex flex-col items-center gap-4 text-lg">
            <a
              href="#herosided"
              onClick={(e) => {
                handleSmoothScroll(e, "herosided");
                setMenuOpen(false);
              }}
            >
              RSVP
            </a>
            <a
              href="#information"
              onClick={(e) => {
                handleSmoothScroll(e, "information");
                setMenuOpen(false);
              }}
            >
              Informações
            </a>
            <a
              href="#donate"
              onClick={(e) => {
                handleSmoothScroll(e, "donate");
                setMenuOpen(false);
              }}
            >
              Donate
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

// Função de scroll suave
function handleSmoothScroll(e: Event, id: string) {
  e.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default HeaderNav;
