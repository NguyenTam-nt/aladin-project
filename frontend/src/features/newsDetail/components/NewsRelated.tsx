import TagNews from "@components/TagNews";
import { TranslateContext } from "@contexts/Translation";
import React, { useContext } from "react";

const dummyImage = [
  "https://s3-alpha-sig.figma.com/img/f646/dc4f/2a6db8c1626eb03d1e3e7dff78eae957?Expires=1685318400&Signature=FvrtWEgG5EIqeCHYN3kpNQxKOl68Gm14yakFEoffpmydgeG~W6-QndzRSpKjp~Aqr2iEFHrzhTfu3215GRgUQ5z8qYtwX9WSOTl7PUmcGA28jEPr-f4TwfzgGBSOa38kbdrG6Q3STV9DlhQpvl76OXiG1iOgYiai2BR3-lNKu2LaeFv6UvYJCCSPpo0FC9SDTF4wvf-~-oXWXemmMiUaj15JUw6b33xsq-mwZ8QGIM0wCs2CqmdPbwV1l1YTrARaTzxAn2U-oWKDWVovdL10jcIZV4DdrtuE5LzJZuo82ggXLLaRg2Wduthrgomd3xMGugcBi520kK806GTOjWMCBQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" ,
   "https://s3-alpha-sig.figma.com/img/2e14/89d9/97529da6306562bd15909dfffe77c61c?Expires=1685318400&Signature=EMr~vbgjEn815P7ZLGLK8~cxkPijDWj79J8ZZW0CElORmdKq-SLUMKPuxuw8rK-qJKa6TmLgcC3Ae2kzpkdNUwVhabew7uUyDKl34VRPfUQTS6zGmgP8YvTToujcUUzayYyD4Y85e1B73Zx3-2FV0uLGjLEFp59r1gwRMgnBjiAb3TBXUWkKl1j2NCnd2XPcB6RWWCRqGrT3Qk90tF4x~VgmwGSggwyWkbLsraBQ388HS27jX06J9zeLk6k1~C-FzS4SqFDCfW9AcLyy0uwYta-SquNBcPrDMVlf6CBBF9RssJLDZa0lucrlAeBRZ7~rKsZ1HM6i87CLtGys5gdyGg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" ,
   "https://s3-alpha-sig.figma.com/img/0e7e/44c8/258a68d673a3bb412cdefdde0e4b0b6b?Expires=1685318400&Signature=TQ7Lv9e7xj8mciW4SXGBtUjakWb7PG4l0nPBb4MlyLBaYDkR6E1z0YUzJoTrkQZKFDE-Fq8ThxdfrUv6euJlGDutqGa0gaggzRn0srNfoDGbPChXTZu6SnaiWpnuzXZQkOcQgAlvJSeWJb4OmQeKd4~DK3T5GJNY33CY~I7zr9ygfKMgNfIWuskw5yIVJG72TbGU242nhTx7Nfo3amUJFgWlBOMez2v6qb~tWOXpiKBmqh2n1HteOdqgfr5QlK0PIPX~38~eS7riSMZqFhlCZPlWYjUWDIvJETdO57jCAnyDiYendbony3PwRreQ9OKvpSVQtA6S6KQtheYNw0z6Aw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" ,
]

const RelatedItem = React.memo(({url}  : { url : string} ) => {
  
  return (
    <div className="flex flex-row bg-bg_FAFAFA  mt-[16px]">
      <div className=" h-[128px] w-[96px]">
        <img
          className="w-full h-full object-cover"
          src={url}
        ></img>
      </div>
      <div className=" mx-[24px] mt-[16px] flex-1">
        <TagNews></TagNews>
        <p className=" text-_18 font-bold leading-[32px] text-text_black  mt-[10px] line-clamp-1">
          Nulla ullamcorper volutpat.
        </p>
        <p className=" text-_14 text-text_black mt-[8px]">
          Ngày đăng tải: 23/02/2023
        </p>
      </div>
    </div>
  );
});



const NewsRelated = () => {
  const { t } = useContext(TranslateContext);
  return (
    <div >
      <p className=" text-_24 xl:text-_40  font-semibold text-text_primary mb-[24px] xl:mb-[56px] mt-[40px] xl:mt-[0px]">
        {t("common._newRelated")}
      </p>
      {dummyImage.map((item, index) => (
        <RelatedItem  url={item} key={index}></RelatedItem>
      ))}
    </div>
  );
};

export default NewsRelated;
