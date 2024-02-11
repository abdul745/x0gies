import React, { useEffect, useState } from "react";

import { Button, Social, Image, Text } from "components";
import { Layout } from "../layouts";
import { getContract } from "../utils";
import { useAddress, useSigner, useConnect, metamaskWallet } from "@thirdweb-dev/react";
import { useSwitchChain } from "@thirdweb-dev/react";
import { Mumbai } from "@thirdweb-dev/chains";
import toast from "react-hot-toast";
import { ethers } from "ethers";

export const Mint: React.FC = () => {
  const address = useAddress();
  const signer = useSigner();
  const contract = getContract(signer);
  const [MAX, setMax] = useState(2435);
  const [totalNftsMinted, setTotalNftsMinted] = useState(0);
  const [noOfMints, setNoOfMints] = useState('');
  const [priceInEther, setPriceInEther] = useState('');

  const connect = useConnect();
  const metamaskConfig = metamaskWallet();
  const switchChain = useSwitchChain();

  const handleSetNoOfMints = (e) => {
    setNoOfMints(e.target.value);
  };

  useEffect(() => {
    async function getData() {
      const _total = await contract.totalSupply();
      setTotalNftsMinted(Number(_total));
    }

    if (address) getData();

    return () => { };
  }, [signer, address]);

  useEffect(() => {
    async function fetchPrice() {
      const mintPrice = await contract.PUBLIC_MINT_PRICE();
      const priceInString = mintPrice.toString();
      const priceInEther = ethers.utils.formatEther(priceInString);
      setPriceInEther(priceInEther);
    }

    fetchPrice();
  }, [contract]);


  async function publicMint() {
    try {
      const wallet = await connect(metamaskConfig);
      console.log('connected to ', wallet)
      await switchChain(Mumbai.chainId)

      console.log(address)
      const isPaused = await contract.PAUSED();
      (!isPaused)
        ? (async () => {
          try {
            const nftCost = (0.004 * (10 ** 18))
            const finalPrice = nftCost * Number(noOfMints)
            const trx = await contract.publicMinting(noOfMints.toString(), {
              value: finalPrice.toString(),
            });
            const transactionReceipt = await trx.wait();
            const finalWeiPrice = finalPrice / 1e18
            if (transactionReceipt.status === 1) {
              toast.success(`You have Minted ${noOfMints} X0gies for ${finalWeiPrice} ETH`);
              const _total = await contract.totalSupply();
              setTotalNftsMinted(Number(_total));
              console.log("Mint successful!");
              console.log("Minted token ID:", transactionReceipt);

            } else {
              console.error("Mint failed:", transactionReceipt.status);
            }
          } catch (error) {
            alert("Please check your input")
            console.log("error", error.message);
          }
        })()
        : alert("Contract is Paused");
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Layout>
      <div className="flex md:flex-col flex-row font-kemcopixel  items-center justify-between   w-full">
        <div className="flex md:flex-1 flex-col md:gap-10 gap-[181px] items-start justify-start w-auto md:w-full">
          <div className="flex flex-col gap-[38px] items-start justify-start w-auto md:w-full">
            <div className="flex flex-col gap-[43px] items-start justify-start w-auto md:w-full">
              <Text
                className="sm:text-3xl md:tconst mintPrice = await contract.PUBLIC_MINT_PRICE();
      const priceInString = mintPrice.toString();
      const priceInEther = ethers.utils.formatEther(priceInString)ext-[32px] text-[34px] text-center text-shadow-ts2 text-white-A700 w-auto"
                size="txtKemcoPixelBold34"
              >
                The BEST PIXEL ART ON ETHEREUM 🔥
              </Text>
              <Text className="font-bold font-kemcopixel leading-[30.00px] text-sm sm:text-[26px] md:text-[28px] text-shadow-ts3 text-white-A700_bc">
                <>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                  <br /> Lorem Ipsum has been the industry&#39;s standard dummy
                  text ever since the <br />
                  1500s, when an unknown printer took a galley of type and
                  scrambled it to make <br />a type specimen book
                </>
              </Text>
            </div>
            <div
              className="bg-cover bg-no-repeat flex flex-col h-[50px] items-end justify-start p-[11px] grayscale-[1]   md:w-full"
              style={{
                backgroundImage: "url('images/img_publicbtn.svg')",
              }}
            >
              <div className="flex  items-center gap-2 justify-end mb-1.5 mr-3 ">
                <Text className=" text-center w-full text-deep_purple-900 text-lg uppercase">
                  PUBLIC MINT
                </Text>
                <Image
                  className="h-[22px] ml-0.5 w-[21px]"
                  src="images/img_arrowleft.svg"
                  alt="arrowleft"
                />
              </div>
            </div>
          </div>
          <Social className="bg-gradient  flex sm:flex-col flex-row gap-[38px] h-[59px] md:h-auto items-center justify-center sm:px-5 px-6 rounded-[16px] shadow-bs1 w-auto sm:w-full" />
        </div>
        <div className="bg-cover bg-gradient1  bg-no-repeat flex sm:flex-1 flex-col font-joystix h-[729px] items-center justify-start py-6 shadow-bs2 w-[509px] sm:w-full">
          <div className="flex flex-col gap-2.5 items-center justify-start w-[77%] md:w-full">
            <Button
              className="font-kemcopixel cursor-pointer h-[41px] text-center text-xl w-[229px]"
              shape="round"
              color="white_A700"
              size="xs"
              variant="fill"
            >
              Mint X0GIES
            </Button>
            <div className="flex flex-col items-center justify-start w-auto sm:w-full">
              <div className="flex flex-row gap-[72px] items-start justify-start w-auto">
                <Text
                  className="text-base text-center text-white-A700 w-[130px]"
                  size="txtKemcoPixelBold18"
                >
                  PUBLIC SUPPLY
                </Text>
                <Text
                  className="text-base text-center text-white-A700 w-[106px]"
                  size="txtKemcoPixelBold18"
                >
                  {totalNftsMinted}/{MAX}
                </Text>
              </div>
              <div className="flex flex-col gap-3 items-end justify-start w-auto sm:w-full">
                <Image
                  className="h-[390px] md:h-auto object-cover w-[390px] sm:w-full"
                  src="img/main-1-1.gif"
                  alt="mainOne"
                />
                <div className="flex flex-col gap-3 items-start justify-start w-[388px] sm:w-full">
                  <div className="border-b-2 border-solid border-white-A700 flex flex-row items-start justify-between pb-3 w-full">
                    <Text
                      className="text-base text-center text-white-A700 w-[66px]"
                      size="txtKemcoPixelBold18"
                    >
                      PRICE
                    </Text>
                    <Text
                      className="text-base text-center text-white-A700 w-[106px]"
                      size="txtKemcoPixelBold18"
                    >
                      {priceInEther}
                    </Text>
                  </div>

                </div>
              </div>
            </div>
            <input value={noOfMints} onChange={handleSetNoOfMints} className="h-[50px] grayscale-[1]  w-[230px]" placeholder='No of Mints' />
            <button
              onClick={() => {
                publicMint().then(() => { });
              }}
            >
              <Image
                className="h-[50px] grayscale-[1]  w-[230px]"
                src="/images/mint.png"
                alt="walletconnect_One"
              />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};