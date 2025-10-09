
import Image from "next/image"


type ProductImageProps ={
    src : string,
    alt : string,
    heightClass? : string,
    widthClass? : string,
}

const ProductImage : React.FC<ProductImageProps> = ({src, alt, heightClass, widthClass}) => {

    return (

        <div className="avatar">

            <div 
                className={` mask mask-squircle shadow-2xl${heightClass} ${widthClass}`}
            >
                <Image 
                    src={src} 
                    alt={alt}
                    quality={100}
                    height={500}
                    width={500}
                    className="object-cover object-center "
                />

            </div>

        </div>
    )
}

export default ProductImage;