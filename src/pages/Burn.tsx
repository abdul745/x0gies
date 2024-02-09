import React, { useEffect, useState } from "react";

import { BurnCards, Button, Image, List, Social, Text } from "components/index";
import { Layout } from "../layouts";
import { useAddress, useSigner } from "@thirdweb-dev/react";
import { getContract } from "../utils";
import toast from "react-hot-toast";

export const Burn: React.FC = () => {
  const address = useAddress();
  const signer = useSigner();
  const contract = getContract(signer);
  const [helds, setHelds] = useState([]);

  useEffect(() => {
    getTokensHeld();
  }, [signer]);
  async function getTokensHeld() {
    const adr = await signer.getAddress();
    const tokens_held = (await contract.getTokenIdsForOwner(adr)).map(
      (n: any) => Number(n),
    );
    setHelds(tokens_held);
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
            NFTs to BURN: 4
          </Text>
        </div>
      </div>
      <List
        className="sm:flex-col flex-row md:gap-10 gap-[61px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 justify-start max-w-[1431px] mt-[105px] mx-auto md:px-5 w-full"
        orientation="horizontal"
      >
        {helds?.map((item, idx) => (
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
        ))}
      </List>
    </Layout>
  );
};
