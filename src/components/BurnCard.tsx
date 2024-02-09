import React, { useEffect, useState } from "react";
import { Image } from "./";

interface BurnCardsProps {
  id: number | string;
  className?: string;
  src: string;
  alt: string;
  onClick: () => void;
}

export const BurnCards: React.FC<BurnCardsProps> = ({
  id,
  className,
  src,
  alt,
  onClick,
}) => {
  const [image, setImage] = useState();
  async function getImage() {
    const res = await fetch(
      `https://gateway.pinata.cloud/ipfs/QmVK9JphGobZGKT8WZYD1CoTNUq37tdonzyvyadj4hZeSP/metadata/${id}.json`,
    );

    const data = await res.json();
    setImage(data.image);
  }
  useEffect(() => {
    getImage();
  }, []);
  return (
    <div className={className}>
      <div className="bg-white-A700_33 h-4 mr-[280px] w-4"></div>
      <div className="flex flex-col gap-[46px] items-center justify-start mt-0.5 mx-auto w-4/5 md:w-full">
        <Image
          className="h-[232px] md:h-auto object-cover w-[232px]"
          src={image ?? src}
          alt={alt}
        />
        <button onClick={onClick}>
          <Image
            className="h-[50px] grayscale-[1]"
            src="img/wallet-connect-4.svg"
            alt="walletconnect"
          />
        </button>
      </div>
      <div className="bg-black-900_33 h-4 md:ml-[0] ml-[279px] mt-[7px] w-4"></div>
    </div>
  );
};
