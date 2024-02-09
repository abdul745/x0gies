import React, { useEffect, useState } from "react";

import { Button, Image, Text } from "components";
import { useAddress, useSigner } from "@thirdweb-dev/react";
import { getContract, merkleFunc } from "../utils";
import toast from "react-hot-toast";

type WhiteListCardProps = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "buttonlabel" | "maxsupplytext" | "headingtext"
> &
  Partial<{
    buttonlabel: string;
    maxsupplytext: string;
    headingtext: string;
  }>;

export const WhiteListCard: React.FC<WhiteListCardProps> = (props) => {
  const address = useAddress();
  const signer = useSigner();
  const contract = getContract(signer);

  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [possibleWlMint, setPossibleWLMint] = useState(0);

  const [MAX, setMax] = useState(1000);
  const [totalSupply, setTotalSupply] = useState(0);

  useEffect(() => {
    const proof = merkleFunc(address);
    console.log("... proof", proof);
    async function getData() {
      const whitelist_count = await contract.whitelist_mint_count(address);

      const _total = await contract.totalSupply();

      setPossibleWLMint(Number(whitelist_count));
      setTotalSupply(Number(_total));
    }

    if (address) getData();
    setIsWhitelisted(proof.length > 0);

    return () => {};
  }, [signer, address]);

  async function whitelistMint() {
    const adr = await signer.getAddress();
    const hexProof = merkleFunc(adr);
    const whitelist_count = await contract.whitelist_mint_count(adr);
    setPossibleWLMint(Number(whitelist_count));
    const balance = await contract.balanceOf(adr);
    if (Number(whitelist_count) < Number(balance)) {
      toast.error(
        `you have reached whitelist limit: Allowed ${Number(
          whitelist_count,
        )} mints`,
      );
      return;
    }
    // if(whitelist_count > ) {

    // }
    try {
      const trx = await contract.whitelistMint(hexProof, {
        gasLimit: 2000000,
      });
      const receipt = await trx.wait();
      console.log("receipt", receipt);
      if (receipt.status === 1) {
        toast.success("you have minted 1 x0gies");
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <>
      <div className={props.className}>
        <div className="flex flex-col items-center justify-start mb-[11px] mr-3 w-[90%] md:w-full">
          <Button
            className="font font-kemcopixel cursor-pointer h-[41px] text-center text-xl w-[229px]"
            shape="round"
            color="white_A700"
            size="xs"
            variant="fill"
          >
            {props?.buttonlabel}
          </Button>
          <div className="flex flex-col items-center justify-start mt-2.5 w-auto sm:w-full">
            <div className="flex flex-row gap-3 items-start justify-center w-auto">
              <Text
                className="text-base text-center text-white-A700"
                size="txtKemcoPixelBold18"
              >
                {totalSupply}
              </Text>
              <Text
                className="text-base text-center text-white-A700"
                size="txtKemcoPixelBold18"
              >
                /
              </Text>
              <Text
                className="text-base text-center text-white-A700"
                size="txtKemcoPixelBold18"
              >
                {MAX}
              </Text>
            </div>
            <div className="flex flex-col gap-9 items-end justify-start w-auto sm:w-full">
              <Image
                className="h-[390px] md:h-auto object-cover w-[390px] sm:w-full"
                src="img/main-1-1.gif"
                alt="mainOne"
              />
              <div className="flex flex-col gap-3 items-center justify-start w-[388px] sm:w-full">
                <Text
                  className="text-center text-white-A700 text-xl w-auto"
                  size="txtKemcoPixelBold18"
                >
                  {props?.headingtext}
                </Text>
                <Text
                  className="text-3xl sm:text-[26px] md:text-[28px] text-center text-white-A700 w-[21px]"
                  size="txtKemcoPixelBold18"
                >
                  {possibleWlMint == 0 ? "...." : possibleWlMint}
                </Text>
              </div>
            </div>
          </div>
          <button
            disabled={!isWhitelisted}
            onClick={() => {
              whitelistMint().then(() => {
                //
              });
            }}
          >
            <Image
              className="h-[50px] grayscale-[1]  mt-[35px]"
              src={"images/mint.png"}
              alt="walletconnect_One"
            />
            ...
          </button>
        </div>
      </div>
    </>
  );
};

WhiteListCard.defaultProps = {
  buttonlabel: "Mint X0GIES ",
  maxsupplytext: "MAX SUPPLY",
  headingtext: "Possible WL mints",
};
