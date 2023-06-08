import React, { memo } from "react";

export const TopicNewsItem = memo(() => {
  return (
    <div className="radius-tl-br overflow-hidden bg-white">
      <div>
        <img
          className=""
          alt=""
          src="https://s3-alpha-sig.figma.com/img/b2fb/aa5a/22df85e7704e2bc690aafd7d3f824f88?Expires=1687132800&Signature=Wyct8BxDsTm3Gu~308PUtKM67dghUOBZAVcX-notcvM~vJYq9Zxu2WDiG6~miqFzZ2j9xpFce44KJYKLO4dOoYazO53OuiQYKhsQeVxGH~fFjS3NiLhrkIE1XBFUgq92ZVmy1OdAiJ7DoYPahUWFOJXft1wvAhePgTIGoyvhVHGINzW0Vgw3c948iptjeORjK8GdFrnw4xslYSnN3NbVUbNOjd0uJFjUygwaatgtICogISL0vS3-aOpSRmjwQPVhBNY~pe7e0tCKgAApvPOsdBaWha0Q0tX2pGPmYPNLBR-4L6NSC8197~4XnRPsgCPxeU6SRJsmgWh-1RWGNgPl6g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
        />
      </div>
      <div className="px-[16px] py-[24px]">
        <p className="text-_16 font-semibold text-GreyPrimary line-clamp-2">
          Combo 2 Người lớn ăn thả ga không lo hết món
        </p>
        <p className="text-_14 mt-1 font-normal text-text_secondary">
          25/12/2023
        </p>
      </div>
    </div>
  );
})
