export const WalletConnect = ({
  property1,
  className,
  propertyDefault = '/img/property-1-default-1.svg',
}: {
  property1: string;
  className: string;
  propertyDefault?: string | undefined;
}) => {
  return (
    <img
      className={`w-[231px] left-0 top-0 h-[50px] absolute ${className}`}
      alt="Property default"
      src={
        property1 === 'variant-2'
          ? '/img/property-1-variant2-1.svg'
          : propertyDefault
      }
    />
  );
};
