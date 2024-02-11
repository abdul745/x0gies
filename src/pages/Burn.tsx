import React, { useEffect, useState } from "react";

import { Button, Social, Image, Text , List}  from "components";
import { Layout } from "../layouts";
import { getContract } from "../utils";
import { useAddress, useSigner, useConnect, metamaskWallet } from "@thirdweb-dev/react";
import { useSwitchChain } from "@thirdweb-dev/react";
import { Mumbai } from "@thirdweb-dev/chains";
import toast from "react-hot-toast";
import { ethers } from "ethers";

export const Burn: React.FC = () => {
  const address = useAddress();
  const signer = useSigner();
  const contract = getContract(signer);

  const connect = useConnect();
  const metamaskConfig = metamaskWallet();
  const switchChain = useSwitchChain();

  const [tokenId, setTokenId] = useState('')
  const [burntNfts , setBurntNfts] = useState('')


  const handleSetTokenId = (e) => {
    setTokenId(e.target.value);
  };
  
  useEffect(() => {
    async function getBurntNfts() {
      const _total = await contract.burntNFTs(address);
      setBurntNfts(_total.toNumber());
    }

    if (address) getBurntNfts();

    return () => { };
  }, [signer, address]);

  async function burnToken() {
    try {
      const wallet = await connect(metamaskConfig);
      console.log('connected to ', wallet)
      await switchChain(Mumbai.chainId)
      const rnfts = await contract.burntNFTs(address)
      console.log(rnfts.toNumber() , 'line34')

      try {
        const trx = await contract.burn(tokenId.toString() , {
          gasLimit : 100000
        });
        const transactionReceipt = await trx.wait();
        if (transactionReceipt.status === 1) {
          toast.success(`You have burned ${tokenId} X0gies`);
          console.log("Burned successful!");
          console.log("Burned token ID:", transactionReceipt);
        } else {
          console.error("Burned failed:", transactionReceipt.status);
        }
      } catch (e) {
        console.log(e, 'line 45')
      }
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <Layout>
      <div className="flex md:flex-col flex-row md:gap-10 gap-24 items-center justify-center max-w-[1248px] mt-[61px] mx-auto md:px-5 w-full">
        <Social className="bg-gradient  flex sm:flex-1 sm:flex-col flex-row gap-[38px] h-[59px] md:h-auto items-center justify-center sm:px-5 px-6 rounded-[16px] shadow-bs1 w-auto sm:w-full" />
        <div className="flex md:flex-1 flex-col gap-[26px] items-center justify-start w-auto md:w-full">
          <Text
            className="sm:text-3xl md:text-[32px] text-[34px] text-center text-shadow-ts2 text-white-A700 w-auto"
            size="txtKemcoPixelBold18"
          >
            Burn your whitelist NFTs
          </Text>
          <Text
            className="text-sm text-shadow-ts3 text-white-A700_bc w-auto"
            size="txtKemcoPixelBold18"
          >
            Burn Your WL NFTS By Clicking the BURN button Below
          </Text>
          <Text
            className="sm:text-3xl md:text-[32px] text-[34px] text-center text-shadow-ts2 text-white-A700 w-auto"
            size="txtKemcoPixelBold34"
          >
           Burnt NFTs : {burntNfts}
          </Text>
          <input value={tokenId} onChange={handleSetTokenId} className="h-[50px] grayscale-[1]  w-[230px]" placeholder='NFT Token Id' />
          <Button
              className="font-kemcopixel cursor-pointer h-[41px] text-center text-xl w-[229px]"
              shape="round"
              color="white_A700"
              size="xs"
              variant="fill"

              onClick={() => {
                burnToken().then(() => { });
              }}
            >
              Burn X0GIES
            </Button>
    

        </div>
      </div>
      <List
        className="sm:flex-col flex-row md:gap-10 gap-[61px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 justify-start max-w-[1431px] mt-[105px] mx-auto md:px-5 w-full"
        orientation="horizontal"
      >
        {/* {helds?.map((item, idx) => (
          <BurnCards
            key={idx}
            id={item}
            onClick={async () => {
              const trx = await contract.burn(`${item}`);
              const receipt = await trx.wait();
              if (receipt.status === 1) {
                toast.success(`you have burnt #${item} token`);
              } else {
                //
              }
            }}
            alt=""
            src="img/main-1-1.gif"
            className="bg-gradient1 flex flex-1 flex-col justify-start p-2 shadow-bs3 w-full"
          />
        ))} */}

      </List>
    </Layout>
  );
};
