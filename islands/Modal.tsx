import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useState } from "preact/hooks";

export interface Props {
  pixCode?: ImageWidget;
}

export default function Modal({
  pixCode,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button className="btn" onClick={openModal}>Open QR Code</button>
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <span className="close" onClick={closeModal}>&times;</span>

            {pixCode && (
              <div className="w-full sm:w-1/2 h-full">
                <Image
                  width={240}
                  height={240}
                  className="w-full h-full object-cover"
                  src={pixCode}
                  decoding="async"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
