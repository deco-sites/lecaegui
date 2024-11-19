import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";


export interface Props {
    image?: ImageWidget
    backgroundTexture? : ImageWidget
}

export default function ScreeImage({image, backgroundTexture}: Props)  {
    return (
        
        <div className="flex flex-col justify-center"
        style={{
          backgroundImage: backgroundTexture
            ? `url(${backgroundTexture})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>

            <Image
            src={image || ""}
            alt="Background"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            decoding="async"
            loading="lazy"
            />
            </div>
      
    )
}