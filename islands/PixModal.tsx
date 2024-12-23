import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  pixCode?: ImageWidget;
  buttonText?: string;
  id: string;
}

export default function PixModal({
  pixCode,
  buttonText,
  id,
}: Props) {
  const handleClick = () => {
    (document.getElementById(`${id}`) as HTMLDialogElement)?.showModal();
  };

  return (
    <>
      <button
        onClick={handleClick}
        class="btn rounded-full bg-[#656D4A] text-white hover:bg-[#4A4F3A]"
      >
        {buttonText}
      </button>
      <dialog id={id} className="modal">
        <div className="modal-box p-4 max-w-sm w-auto flex flex-col items-center">
          {pixCode && (
            <div className="flex justify-center items-center mb-4">
              <Image
                width={240}
                height={240}
                class="object-contain"
                src={pixCode}
                decoding="async"
                loading="lazy"
              />
            </div>
          )}

          <div className="modal-action w-full flex justify-center">
            <form method="dialog">
              <button className="btn bg-[#656D4A] text-white hover:bg-[#4A4F3A]">
                Fechar
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
