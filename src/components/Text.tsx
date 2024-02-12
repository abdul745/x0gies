import React from "react";

const sizeClasses = {
  txtMobileFont66: "font-mobilefont font-HISKYFLIPPERHIBOLD",
  txtJoystixMonospaceRegular30: "font-HISKYFLIPPERHIBOLD font-normal",
  txtKemcoPixelBold34: "font-bold font-HISKYFLIPPERHIBOLD",
  txtMSSansSerif30: "font-HISKYFLIPPERHIBOLD font-normal",
  txtJoystixMonospaceRegular20: "font-HISKYFLIPPERHIBOLD font-normal",
  txtUnkemptRegular30: "font-normal font-HISKYFLIPPERHIBOLD",
  txtJoystixMonospaceRegular16LightblueA200: "font-HISKYFLIPPERHIBOLD font-normal",
  txtJoystixMonospaceRegular16: "font-HISKYFLIPPERHIBOLD font-normal",
  txtBackto198212: "font-HISKYFLIPPERHIBOLD font-normal",
  txtKemcoPixelBold18Deeppurple900: "font-bold font-HISKYFLIPPERHIBOLD",
  txtKemcoPixelBold18: "font-bold font-HISKYFLIPPERHIBOLD",
} as const;

export type TextProps = Partial<{
  className: string;
  size: keyof typeof sizeClasses;
  as: any;
}> &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >;

const Text: React.FC<React.PropsWithChildren<TextProps>> = ({
  children,
  className = "",
  size,
  as,
  ...restProps
}) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-left ${className} ${size && sizeClasses[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
