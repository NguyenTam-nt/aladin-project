import React, { memo } from "react";

export const TopicPostItem = memo(() => {
  return (
    <div className="w-full grid grid-cols-2 gap-x-[26px] h-[365px]">
      <div className="radius-tl-br h-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src="https://s3-alpha-sig.figma.com/img/bd55/ec20/02e1b3d6e1627eb1ca588b6c1e77966d?Expires=1687132800&Signature=VrdfZHwLMnP73RphEfSmz06HnnlXzSpnTdzWMHQv6v5v~rrsm6HXyZo9Gv9rSLoTjwOC1ZVkpqNvVqcR1A2elZu~EvlO4FRUAPY7qKZeQDjVcPACpPWzloq564z3TnbJ3tTKeOLz01EfUWsx8SgC4HUc-R-gBR9YfjCJaSE4dzTLWZlVYig2dUKLNJQcE9iYeKqxr4UTNFs1cNGGSbgesKuDoy6bmv9hc0I5hP60Llc8zntYxmQ8UfrRoF5jkxKL~pPzD5a78Gxqr21uaYC1LhUy~W76USP1zq~i6Eqb3orXVaNug9ClNdLfWeUi7e~ZSXmKHWfcZUA96rDedpfJUA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
          alt=""
        />
      </div>
      <div className="pt-[12px]">
        <h4 className="title-32">LONGWANG TRẢI NGHIỆM PHONG CÁCH HONGKONG</h4>
        <p className="text-_24 font-normal mt-[30px] text-GreyPrimary line-clamp-3">
          Không gian Hồng Kông tráng lệ, nhiều góc checkin Trải nghiệm lẩu hấp
          tốt cho sức khỏe, tăng sức đề kháng, dáng đẹp eo thon
        </p>
      </div>
    </div>
  );
});
