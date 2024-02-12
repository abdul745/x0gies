import React from 'react';

import { Button, Image } from 'components';

type SocialProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{}>;

export const Social: React.FC<SocialProps> = (props) => {
  return (
    <>
      <div className={props.className}>
       
        <Button
          className="flex h-[34px] items-center justify-center w-[34px]"
          shape="circle"
          color="white_A700"
          size="xs"
          variant="fill"
        >
          <Image src="images/img_user.svg" alt="user" />
        </Button>
        <Button
          className="flex h-[34px] items-center justify-center w-[34px]"
          shape="circle"
          variant="fill"
        >
          <Image
            className="h-[34px] w-[34px]"
            src="images/img_trash.svg"
            alt="trash"
          />
        </Button>
        
        <Button
          className="flex h-[34px] items-center justify-center w-[34px]"
          shape="circle"
          variant="fill"
        >
          <Image
            className="h-[34px] w-[34px]"
            src="images/medium.svg"
            alt="link"
          />
        </Button>
      
      </div>
    </>
  );
};
