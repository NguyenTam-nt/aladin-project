import React from "react";

const RelatedItem = () => {
  return (
    <div className="flex flex-row bg-bg_FAFAFA  mt-[16px]">
      <div className=" h-[128px] w-[96px]">
        <img
          className="w-full h-full object-cover"
          src="https://images.pexels.com/photos/10495920/pexels-photo-10495920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        ></img>
      </div>
      <div className=" mx-[24px] mt-[16px] flex-1">
        <p className=" text-_12 bg-green-600 text-center font-bold text-text_white leading-[20px] px-[16px] inline-block ">
          Tag green
        </p>
        <p className=" text-_18 font-bold leading-[32px] text-text_black  mt-[10px]">
          Nulla ullamcorper volutpat.
        </p>
        <p className=" text-_14 text-text_black mt-[8px]">
          Ngày đăng tải: 23/02/2023
        </p>
      </div>
    </div>
  );
};

const NewsRelated = () => {
  return (
    <div className="">
      <p className=" text-_40 font-semibold text-text_primary mb-[56px]">
        Bài viết liên quan
      </p>
      {[1, 2, 3].map((item) => (
        <RelatedItem></RelatedItem>
      ))}
    </div>
  );
};

export default NewsRelated;
