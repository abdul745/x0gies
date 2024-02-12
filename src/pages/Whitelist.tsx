import React from "react";

import { useNavigate } from "react-router-dom";

import { Button, Image, Text } from "components";
import { Social, WhiteListCard } from "components";
import { Layout } from "../layouts";
import { useAddress, useContract } from "@thirdweb-dev/react";

export const Whitelist: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex md:flex-col flex-row font-HISKYFLIPPERHIBOLD  items-center justify-between   w-full">
        <div className="flex md:flex-1 flex-col items-start justify-start w-[59%] md:w-full">
          <Text
            className="sm:text-3xl md:text-[32px] text-[34px] text-center text-shadow-ts2 text-white-A700"
            size="txtKemcoPixelBold34"
          >
            Get You wallet Whitelisted 🔥
          </Text>
          <Text
            className="leading-8 text-sm text-shadow-ts3 text-white-A700_bc"
            size="txtKemcoPixelBold18"
          >
            <>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
              <br /> Lorem Ipsum has been the industry&#39;s standard dummy text
              ever since the <br />
              1500s, when an unknown printer took a galley of type and scrambled
              it to make <br />a type specimen book
            </>
          </Text>
          {/* <Image
            className="common-pointer h-[50px] md:ml-[0] ml-[5px] mt-[95px] grayscale-[1]"
            src="images/img_publicbtn_black_900.svg"
            alt="publicbtn"
            onClick={() => navigate("/")}
          /> */}
          <Button
                className="font-HISKYFLIPPERHIBOLD cursor-pointer h-[50px] text-center md:ml-[0] ml-[5px] mt-[95px] text-xl w-[230px]"
                shape="round"
                color="white_A700"
                size="xs"
                variant="fill"

                onClick={() => {
                  navigate('/');
                }}
              >
                Public Mint
              </Button>
          <Social className="bg-gradient  flex sm:flex-col flex-row gap-[38px] h-[59px] md:h-auto items-center justify-center mt-[124px] sm:px-5 px-6 rounded-[16px] shadow-bs1 w-auto sm:w-full" />
        </div>
        <WhiteListCard className="bg-cover bg-gradient1  bg-no-repeat flex md:flex-1 flex-col h-[fit-content] items-end justify-start md:mt-0 mt-[11px] p-6 sm:px-5 shadow-bs2 w-[388px]  md:w-full" />
      </div>
    </Layout>
  );
};
