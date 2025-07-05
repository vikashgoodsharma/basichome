// components/ImageWrapper.js
import Image from "next/image";

const ImageWrapper = ({ src, alt, objectFit = "contain" }) => {
  return (
    <div
      className="relative overflow-hidden mb-4 hover:shadow-lg transition-transform w-full h-[150px]"
      // style={{ width: `${width}px`, height: `${height}px` }}
    >
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit={objectFit}
        className="hover:scale-105 transition-transform duration-300 ease-in-out"
      />
    </div>
  );
};

export default ImageWrapper;
