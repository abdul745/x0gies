/*
We're constantly improving the code you see.
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/
type Prop = {
  variant: string;
  className: string;
  propertyDefault?: string | undefined;
  property?: string | undefined;
};
export const Counter = ({
  variant,
  className,
  propertyDefault = '/img/property-1-default.svg',
  property = '/img/property-1-variant2.svg',
}: Prop) => {
  return (
    <img
      className={`w-[30px] left-0 top-0 h-[30px] absolute ${className}`}
      alt="Property default"
      src={variant === 'variant-2' ? property : propertyDefault}
    />
  );
};
