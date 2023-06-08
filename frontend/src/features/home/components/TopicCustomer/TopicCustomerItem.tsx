import { ICQuotation } from "@assets/icons/ICQuotation";
import { Avatar } from "@components/Avatar";
import React, { memo } from "react";

export const TopicCustomerItem = memo(() => {
  return (
    <div className="p-[24px] flex flex-col h-[426px] bg-white radius-tl-br">
      <div className="w-full  h-[148px]">
        <img
          className="w-full h-full object-cover radius-tl-br"
          src="https://s3-alpha-sig.figma.com/img/90cc/9a92/d02385ece99c55bbe6af88550ddc417d?Expires=1687132800&Signature=HfBOlUVwwmFYk3Ipbwuzbx9uT2xTW70Hvmx5Or6FWbruJbLG1Bavn6cTGszJJ9h-Syc8no0PYX1FYMm-s83iUqATVf6Udr4tQ9q~0jpcr6LN70rBtw2s1JsgFzAsQMgEWlCiu3DXJ-yIG1OWuchpzbw8FpawpGH0TepdKJCF8kXYkDIDZfeIXacfS1L0JqeBbEF1kx-mBtBriiFzO2fHKoFw0edcdbAz-8AuXDTp926fA5cwBp8OY5bXmLhfAbSJSki4ODppAAiMpExBTBUcV4BvSikq~3wyAMQ6q40eNKvRS0uFqAqZMx~cGV1siF47-bNyQa1HhNMGgCYK5T9plQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
        />
      </div>
      <div className="my-[16px]">
        <ICQuotation />
      </div>
      <p className="text-_14 font-normal text-GreyPrimary line-clamp-5 leading-[22px]">
        Feugiat habitasse amet in bibendum fusce ornare. Molestie elementum amet
        integer gravida suspendisse tortor. Pellentesque risus tincidunt
        bibendum eget donec nulla quis in tellus.
      </p>
      <div className="mt-auto flex items-center gap-x-2">
        <Avatar size={48} name="Nguyễn Cường Phong" />
        <div>
          <p className="text-_16 font-semibold text-GreyPrimary">
            Nguyễn Cường Phong
          </p>
          <p className="text-_12 font-normal text-text_secondary">
            UX/UI Designer
          </p>
        </div>
      </div>
    </div>
  );
})
