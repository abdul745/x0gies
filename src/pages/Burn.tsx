import React, { useEffect, useState } from "react";

import { Button, Social, Image, Text, List } from "components";
import { Layout } from "../layouts/index copy";
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
  const [burntNfts, setBurntNfts] = useState('')


  const handleSetTokenId = (e) => {
    const value = e.target.value;
    if (value === '' || (Number.isInteger(+value))) {
      setTokenId(value);
    }
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
      const isPaused = await contract.PAUSED();
      (!isPaused)
        ? (async () => {
          try {
            const trx = await contract.burn(tokenId.toString(), {
              gasLimit: 300000
            });
            const transactionReceipt = await trx.wait();
            if (transactionReceipt.status === 1) {
              toast.success(`You have Burnt 1 X0gies Token with Token ID: ${tokenId}`);
              console.log("Burned successful!");
              console.log("Burned token ID:", transactionReceipt);
              const _total = await contract.burntNFTs(address);
              setBurntNfts(_total.toNumber());
            } else {
              console.error("Burned failed:", transactionReceipt.status);
            }
          } catch (e) {
            console.log(e, 'line 45')
          }
        })()
        : alert("Contract is Paused");
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <Layout>
      <div className="flex md:flex-col flex-row md:gap-10 gap-24 items-center justify-center max-w-[1248px] mt-[61px] mx-auto md:px-5 w-full" >
        {/* <Social className="bg-gradient  flex sm:flex-1 sm:flex-col flex-row gap-[38px] h-[59px] md:h-auto items-center justify-center sm:px-5 px-6 rounded-[16px] shadow-bs1 w-auto sm:w-full" /> */}
        <div className="flex md:flex-1 flex-col gap-[26px] items-center justify-start w-auto md:w-full" >
          <Text
            className="sm:text-3xl md:text-[32px] text-[34px] text-center text-shadow-ts2 text-white-A700 w-auto"
            size="txtKemcoPixelBold18"
          >
            Burn your NFTs
          </Text>
          <Text
            className="text-sm text-shadow-ts3 text-white-A700_bc w-auto"
            size="txtKemcoPixelBold18"
          >
            Burn Your Occupied NFTS By Clicking the BURN button Below
          </Text>
          <Text
            className="sm:text-3xl md:text-[32px] text-[34px] text-center text-shadow-ts2 text-white-A700 w-auto"
            size="txtKemcoPixelBold34"
          >
            Burnt NFTs : {burntNfts}
          </Text>
          <input value={tokenId} onChange={handleSetTokenId} className="h-[50px] grayscale-[1]  w-[230px]" placeholder='Token Id' style={{textAlign: 'center' , backgroundColor: 'white', 
        color: '#000', 
        padding: '10px', 
        borderRadius: '5px',
        boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.2)' 
} } />
          <Button
            className="font-HISKYFLIPPERHIBOLD cursor-pointer h-[41px] text-center text-xl w-[229px]"
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
   
    </Layout>
  );
};
