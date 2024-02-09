import { Counter, WalletConnect } from './index';

export const Cards = ({
  property1,
  className,
  walletConnectPropertyDefault = '/img/wallet-connect.svg',
  counterPropertyDefault = '/img/counter.svg',
  counterProperty = '/img/counter-1.svg',
}: {
  property1: string;
  className: string;
  walletConnectPropertyDefault?: string | undefined;
  counterPropertyDefault?: string | undefined;
  counterProperty?: string | undefined;
}) => {
  return (
    <div
      className={`[background:linear-gradient(180deg,rgb(98,42,255)_0%,rgba(98,42,255,0)_100%)] shadow-[inset_8px_8px_0px_#ffffff33] bg-[#ffffff01] relative ${
        ['mint-card', 'wl-card'].includes(property1) ? 'w-[486px]' : 'w-[312px]'
      } ${
        ['mint-card', 'wl-card'].includes(property1) ? 'h-[740px]' : 'h-[386px]'
      } ${className}`}
    >
      <div className="w-[16px] left-[8px] top-[8px] h-[16px] bg-[#ffffff33] absolute" />
      <div
        className={`w-[16px] h-[16px] bg-[#00000033] absolute ${
          ['mint-card', 'wl-card'].includes(property1)
            ? 'left-[462px]'
            : 'left-[288px]'
        } ${
          ['mint-card', 'wl-card'].includes(property1)
            ? 'top-[716px]'
            : 'top-[362px]'
        }`}
      />
      {['burn-card-3', 'burn-card-4', 'burn-card2', 'burncard-1'].includes(
        property1,
      ) && (
        <WalletConnect
          className="!left-[40px] !top-[304px]"
          property1="default"
          propertyDefault={
            property1 === 'burn-card2'
              ? '/img/wallet-connect-3.svg'
              : property1 === 'burn-card-3'
              ? '/img/wallet-connect-4.svg'
              : property1 === 'burn-card-4'
              ? '/img/wallet-connect-5.svg'
              : '/img/wallet-connect-2.svg'
          }
        />
      )}

      {[
        'burn-card-3',
        'burn-card-4',
        'burn-card2',
        'burncard-1',
        'wl-card',
      ].includes(property1) && (
        <img
          className={`object-cover absolute ${
            property1 === 'wl-card' ? 'w-[390px]' : 'w-[232px]'
          } ${property1 === 'wl-card' ? 'left-[40px]' : 'left-[42px]'} ${
            property1 === 'wl-card' ? 'top-[97px]' : 'top-[26px]'
          } ${property1 === 'wl-card' ? 'h-[390px]' : 'h-[232px]'}`}
          alt="X"
          src={
            property1 === 'burn-card2'
              ? '/img/x-0gies-2.png'
              : property1 === 'burn-card-3'
              ? '/img/x-0gies-9.png'
              : property1 === 'burn-card-4'
              ? '/img/x-0gies-3.png'
              : property1 === 'wl-card'
              ? '/img/main-1-1.gif'
              : '/img/x-0gies-27.png'
          }
        />
      )}

      {property1 === 'wl-card' && (
        <>
          <div className="flex w-[229px] h-[41px] items-center justify-center gap-[10px] p-[10px] absolute top-[20px] left-[120px] bg-white rounded-[6px]">
            <div className="relative w-fit mt-[-14.50px] mb-[-12.50px] text-black text-[20px] [font-family:'Joystix-Monospace',Helvetica] font-normal text-center tracking-[0] leading-[48px] whitespace-nowrap">
              Mint X0GIES
            </div>
          </div>
          <div className="absolute h-[48px] top-[515px] left-[102px] text-white text-[20px] [font-family:'Joystix-Monospace',Helvetica] font-normal text-center tracking-[0] leading-[48px] whitespace-nowrap">
            Possible WL mints
          </div>
        </>
      )}

      {['mint-card', 'wl-card'].includes(property1) && (
        <div
          className={`absolute ${
            property1 === 'wl-card' ? 'w-[376px]' : 'w-[391px]'
          } ${property1 === 'wl-card' ? 'left-[43px]' : 'left-[40px]'} ${
            property1 === 'wl-card' ? 'top-[585px]' : 'top-[76px]'
          } ${property1 === 'wl-card' ? 'h-[44px]' : 'h-[412px]'}`}
        >
          {property1 === 'mint-card' && (
            <>
              <img
                className="absolute w-[390px] h-[390px] top-[21px] left-0 object-cover"
                alt="Main"
                src="/img/main-1-1.gif"
              />
              <img
                className="absolute w-[391px] h-[2px] top-[410px] left-0"
                alt="Line"
                src="/img/line-4.svg"
              />
              <div className="inline-flex items-start gap-[72px] absolute top-0 left-[21px]">
                <div className="relative w-[137px] h-[26px] mt-[-1.00px] [font-family:'Joystix-Monospace',Helvetica] font-normal text-white text-[16px] text-center tracking-[0] leading-[48px] whitespace-nowrap">
                  MAX SUPPLY
                </div>
                <div className="relative w-[137px] h-[26px] mt-[-1.00px] [font-family:'Joystix-Monospace',Helvetica] font-normal text-white text-[16px] text-center tracking-[0] leading-[48px] whitespace-nowrap">
                  0/333333
                </div>
              </div>
            </>
          )}

          {property1 === 'wl-card' && (
            <>
              <div className="absolute w-[17px] h-[33px] top-0 left-[192px] text-white text-[30px] [font-family:'Joystix-Monospace',Helvetica] font-normal text-center tracking-[0] leading-[48px] whitespace-nowrap">
                5
              </div>
              <div className="absolute w-[376px] h-[26px] top-[18px] left-0" />
            </>
          )}
        </div>
      )}

      {property1 === 'wl-card' && (
        <WalletConnect
          className="!left-[128px] !top-[658px]"
          property1="default"
          propertyDefault="/img/wallet-connect-1.svg"
        />
      )}

      {property1 === 'mint-card' && (
        <>
          <div className="flex w-[229px] h-[41px] items-center justify-center gap-[10px] p-[10px] absolute top-[20px] left-[120px] bg-white rounded-[6px]">
            <div className="relative w-fit mt-[-14.50px] mb-[-12.50px] [font-family:'Joystix-Monospace',Helvetica] font-normal text-black text-[20px] text-center tracking-[0] leading-[48px] whitespace-nowrap">
              Mint X0GIES
            </div>
          </div>
          <WalletConnect
            className="!left-[128px] !top-[658px]"
            property1="default"
            propertyDefault={walletConnectPropertyDefault}
          />
          <img
            className="absolute w-[391px] h-[2px] top-[532px] left-[41px]"
            alt="Line"
            src="/img/line-4.svg"
          />
          <img
            className="absolute w-[391px] h-[2px] top-[589px] left-[41px]"
            alt="Line"
            src="/img/line-4.svg"
          />
          <img
            className="absolute w-[391px] h-[2px] top-[642px] left-[41px]"
            alt="Line"
            src="/img/line-4.svg"
          />
          <div className="inline-flex items-start gap-[173px] absolute top-[499px] left-[42px]">
            <div className="w-[66px] relative h-[26px] mt-[-1.00px] [font-family:'Joystix-Monospace',Helvetica] font-normal text-white text-[16px] text-center tracking-[0] leading-[48px] whitespace-nowrap">
              PRICE
            </div>
            <div className="w-[120px] relative h-[26px] mt-[-1.00px] [font-family:'Joystix-Monospace',Helvetica] font-normal text-white text-[16px] text-center tracking-[0] leading-[48px] whitespace-nowrap">
              0.04 ETH
            </div>
          </div>
          <div className="inline-flex items-start gap-[173px] absolute top-[603px] left-[43px]">
            <div className="w-[76px] relative h-[26px] mt-[-1.00px] [font-family:'Joystix-Monospace',Helvetica] font-normal text-white text-[16px] text-center tracking-[0] leading-[48px] whitespace-nowrap">
              PRICE
            </div>
            <div className="w-[127px] relative h-[26px] mt-[-1.00px] [font-family:'Joystix-Monospace',Helvetica] font-normal text-white text-[16px] text-center tracking-[0] leading-[48px] whitespace-nowrap">
              0.04 ETH
            </div>
          </div>
          <div className="inline-flex items-center gap-[87px] absolute top-[547px] left-[42px]">
            <div className="relative w-[80px] h-[26px] [font-family:'Joystix-Monospace',Helvetica] font-normal text-white text-[16px] text-center tracking-[0] leading-[48px] whitespace-nowrap">
              Amount
            </div>
            <div className="inline-flex items-end gap-[54px] relative flex-[0_0_auto]">
              <div className="inline-flex items-center gap-[13px] relative flex-[0_0_auto]">
                <Counter
                  className="!relative !left-[unset] !top-[unset]"
                  variant="default"
                  propertyDefault={counterPropertyDefault}
                />
                <div className="relative w-[14px] h-[25px] [font-family:'Joystix-Monospace',Helvetica] font-normal text-white text-[16px] text-center tracking-[0] leading-[48px] whitespace-nowrap">
                  1
                </div>
                <Counter
                  className="!relative !left-[unset] !top-[unset]"
                  property={counterProperty}
                  variant="variant-2"
                />
              </div>
              <div className="inline-flex h-[28px] items-center justify-center gap-[10px] p-[10px] relative flex-[0_0_auto]">
                <div className="relative w-[40px] h-[23px] mt-[-8.50px] mb-[-6.50px] [font-family:'Joystix-Monospace',Helvetica] font-normal text-[#37dbff] text-[16px] text-center tracking-[0] leading-[48px] whitespace-nowrap">
                  max
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
