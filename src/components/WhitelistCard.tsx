import React, { useEffect, useState } from "react";

import {
  useAddress,
  useSigner,
  useConnect,
  metamaskWallet,
} from "@thirdweb-dev/react";
import { Button, Image, Text } from "components";
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
  const connect = useConnect();
  const metamaskConfig = metamaskWallet();
  const [noOfMints, setNoOfMints] = useState("");

  const handleSetNoOfMints = (e) => {
    const value = e.target.value;
    if (value === '' || (Number.isInteger(+value))) {
      setNoOfMints(value);
    }
  };

  const address = useAddress();
  const signer = useSigner();
  const contract = getContract(signer);

  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [possibleWlMint, setPossibleWLMint] = useState(0);


  useEffect(() => {
    const proof = merkleFunc(address);
    console.log("... proof", proof);
    async function getData() {

      const allowedFreeMints = await contract.whitelistMints(address);
      console.log(allowedFreeMints.toNumber());
      const claimedTokens = await contract.claimedWhitelistTokens(address);
      const remainingAllowedTokens = allowedFreeMints - claimedTokens;
      setPossibleWLMint(Number(remainingAllowedTokens));
      // setTotalSupply(Number(4444));
    }

    if (address) getData();
    setIsWhitelisted(proof.length > 0);

    return () => { };
  }, [signer, address]);


  async function whitelistMint() {
    const allowedFreeMints = await contract.whitelistMints(address);
    console.log(allowedFreeMints.toNumber());
    const claimedTokens = await contract.claimedWhitelistTokens(address);
    const remainingAllowedTokens = allowedFreeMints - claimedTokens;
    const isPaused = await contract.PAUSED();
    (!isPaused)
      ? (async () => {
        if (remainingAllowedTokens >= Number(noOfMints)) {

          try {
            const trx = await contract.whitelistedMinting(noOfMints, {
              gasLimit: 2000000,
            });
            const receipt = await trx.wait();
            console.log("receipt", receipt);
            if (receipt.status === 1) {
              toast.success(`You Have Minted ${noOfMints} X0GIES`);
            }
            setPossibleWLMint(remainingAllowedTokens - Number(noOfMints))
          } catch (error) {
            console.log("error", error);
          }
        } else {
          alert("Not Enough NFTs Allowed to Mint!");
        }
      })()
      : alert("Contract is Paused");
  }
  return (
    <>
      <div className={props.className}>
        <div className="flex flex-col gap-2.5 items-center justify-start mb-[11px] mr-3 w-[95%] md:w-full">
          <Text
            className="font-HISKYFLIPPERHIBOLD text-center text-xl w-[229px]"
            style={{ color: 'white' }}
          >
            WL Mint X0GIES
          </Text>
          <div className="flex flex-col items-center justify-start mt-2.5 w-auto sm:w-full">

            <div className="flex flex-col gap-9 items-center justify-start w-auto sm:w-full">
              <Image
                className="h-[390px] md:h-auto object-cover w-[350px] sm:w-full"
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
                  {possibleWlMint}
                </Text>
              </div>
            </div>
          </div>
          <input value={noOfMints} onChange={handleSetNoOfMints} className="h-[50px] grayscale-[1]  w-[230px]" placeholder='No of Mints' style={{
            textAlign: 'center', backgroundColor: 'white',
            color: '#000',
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.2)'
          }} />
          <Button
            className="font-HISKYFLIPPERHIBOLD cursor-pointer h-[50px] text-center text-xl w-[230px] grayscale-[1]"

            shape="round"
            color="white_A700"
            size="xs"
            variant="fill"

            onClick={() => {
              whitelistMint().then(() => { });
            }}
          >
            WhiteList Mint
          </Button>
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
