import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  pixCode?: ImageWidget;
}

export default function PixModal({
  pixCode,
}: Props) {
  const handleClick = () => {
    (document.getElementById("my_modal_1") as HTMLDialogElement)?.showModal();
  };

  return (
    <>
      <button
        onClick={handleClick}
        class="btn rounded-full bg-[#656D4A] text-white hover:bg-[#4A4F3A]"
      >
        Doar agora!
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          {pixCode && (
            <div class="w-1/2 h-full">
              <Image
                width={240}
                height={240}
                class="w-full h-full object-contain"
                src={pixCode}
                decoding="async"
                loading="lazy"
              />
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Fechar</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
