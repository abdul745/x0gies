import React from "react";

const sizeClasses = {
  txtMobileFont66: "font-mobilefont font-normal",
  txtJoystixMonospaceRegular30: "font-joystix font-normal",
  txtKemcoPixelBold34: "font-bold font-kemcopixel",
  txtMSSansSerif30: "font-mssansserif font-normal",
  txtJoystixMonospaceRegular20: "font-joystix font-normal",
  txtUnkemptRegular30: "font-normal font-unkempt",
  txtJoystixMonospaceRegular16LightblueA200: "font-joystix font-normal",
  txtJoystixMonospaceRegular16: "font-joystix font-normal",
  txtBackto198212: "font-backto font-normal",
  txtKemcoPixelBold18Deeppurple900: "font-bold font-kemcopixel",
  txtKemcoPixelBold18: "font-bold font-kemcopixel",
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
