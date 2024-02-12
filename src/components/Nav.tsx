import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Image, Text, WalletConnect } from "./index";
import { ConnectWallet, useAddress, useSigner } from "@thirdweb-dev/react";

function NavItem({
  active = false,
  text = "",
}: {
  active: boolean;
  text: string;
}) {
  return (
    <Text
      className={`${
        active && "bg-light_blue-A200 rounded-md"
      } justify-center px-2 py-0.5  text-center text-lg text-white-A700 uppercase`}
      size="txtKemcoPixelBold18"
    >
      {text}
    </Text>
  );
}
export const Nav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const address = useAddress();
  return (
    <header className="bg-[#2b2828]  py-3 flex md:flex-wrap  md:gap-12 justify-around    items-center md:px-5 shadow-bs4 w-full">
      <div className="flex gap-12 items-center justify-center w-auto sm:w-full">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          <NavItem active={pathname == "/"} text="Public Mint" />
        </button>
        <button
          onClick={() => {
            navigate("/whitelist");
          }}
        >
          <NavItem active={pathname == "/whitelist"} text="whitelist mint" />
        </button>
        <button
          onClick={() => {
            navigate("/burn");
          }}
          className="flex flex-col items-center justify-start px-[18px]"
        >
          <NavItem active={pathname == "/burn"} text="Burn" />
        </button>
      </div>

      <Image className="h-[72px]" src="images/logo.png" alt="walletconnect" />
      <div className="bg-gray-900 h-0.5 w-[1%]"></div>
      <ConnectWallet
        btnTitle={"CONNECT WALLET"}
        switchToActiveChain={true}
        theme={"light"}
        detailsBtn={() => {
          return address ? (
            <span
              style={{
                color: "white",
              }}
            >
              {address.slice(0, 4)}...{" "}
              {address.slice(address.length - 4, address.length - 1)}
            </span>
          ) : (
            <Image
              className="h-[50px] w-[230px]  grayscale-[1] "
              src="images/img_walletconnect.svg"
              alt="walletconnect"
            />
          );
        }}
        modalSize={"compact"}
        className={"bg-transparent"}
        style={{    color: '#000' , backgroundColor: 'white'
        }}
      />
    </header>
  );
};
