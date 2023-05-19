
import { ImageTranslation } from "@components/ImageTranslation";
import React from "react";
import Pagination from "./Paginnation";
import TagNews from "@components/TagNews";



const NewsItem = ({ item }: { item: INewsItem }) => {
  const { tagName, title, time, image } = item;
  return (
    <div className="h-[360px]  bg-bg_FAFAFA">
      <div className=" overflow-hidden h-[184px]">
        <ImageTranslation link={image}></ImageTranslation>
      </div>
      <div className=" mx-[24px] mt-[26px]">
        <TagNews title={tagName} />
        <p className=" text-_18 font-bold leading-[32px] text-text_black  mt-[10px]">
          {title}
        </p>
        <p className=" text-_14 text-text_black "> {time}</p>
      </div>
    </div>
  );
}; 



const data = [
  {
    tagName: "Nghiên cứu khoa học",
    title: `Sinh hoạt khoa học "Từ lý thuyết nghiên cứu đến thực hành thiết kế luận văn tốt nghiệp"`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/698d/38c9/e57701ea211ff234e389e516b5eb4496?Expires=1685318400&Signature=BNCSbYYHUwKIVrQ-G2tXrlw5EXIrnSUz9pNQ6QXKDzueinbT7xJpczg71i6FMIKC1Y9RJxV97g1N2c2iQ~kfIiYQFXxNXLWbg3EakUYZWPKRPJROsPTB2gY6-XbwftiXeajrM~dRABVSLGgXUPc-8i2xJkX~9qUSc6ix68XEBj-lvjNMDoCIfVdecb2BsMKEW~Sph0B0dB4sniRKMLrRo7w0wSz1YDsJc3l5A2GHDfZxV1sAWPKLv9o~6x6OkmmwXvKmYbOMNflTtz4rZ1q7xh0YVuX23LeXk9LOFm6GvP~R45ZEfsoAH8vQBVVMEWSnE1bXuMm-Ir7DBSF6aFChsg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Nhìn lại chặng đường 30 năm quan hệ Việt Nam - Hàn Quốc, hướng tới đối tác chiến,...`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/5127/bafe/f323ea9d5de6930efaa28743be91a4e8?Expires=1685318400&Signature=dYpraoKdqeVN9tjsy4Bfm3eY0txNdFq~GCostGZSDs6PUuV4miq9KJQP8oR~PDfBLG4P2j-z4MTnQAJ7jDSjk2nZ66OAmkkbRJ1bjP56GX4MDzemRkXnVzuX-TypN74yMoj7Let3vjoRlmP54BRBshYgkBMRnkUl5sN1C4kzaDjH3VNJ1dafBquhc1aatuseyljSxAocu4raUFVVM4RYfiunrlfvAjB0RB6POByfMnYsW0niQe4p-GLjvnXpEpLgZDva8V-m1lQNSU4VcPh~QOO7ClPoOgB-nxiDCTsDubVxyVQLItM81BG3jG7zAYB1Jnu2W-MTyBsDcUB2vRb3mA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Nhìn lại chặng đường 30 năm quan hệ Việt Nam - Hàn Quốc, hướng tới đối tác chiến,...`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/5127/bafe/f323ea9d5de6930efaa28743be91a4e8?Expires=1685318400&Signature=dYpraoKdqeVN9tjsy4Bfm3eY0txNdFq~GCostGZSDs6PUuV4miq9KJQP8oR~PDfBLG4P2j-z4MTnQAJ7jDSjk2nZ66OAmkkbRJ1bjP56GX4MDzemRkXnVzuX-TypN74yMoj7Let3vjoRlmP54BRBshYgkBMRnkUl5sN1C4kzaDjH3VNJ1dafBquhc1aatuseyljSxAocu4raUFVVM4RYfiunrlfvAjB0RB6POByfMnYsW0niQe4p-GLjvnXpEpLgZDva8V-m1lQNSU4VcPh~QOO7ClPoOgB-nxiDCTsDubVxyVQLItM81BG3jG7zAYB1Jnu2W-MTyBsDcUB2vRb3mA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Nhìn lại chặng đường 30 năm quan hệ Việt Nam - Hàn Quốc, hướng tới đối tác chiến,...`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/5127/bafe/f323ea9d5de6930efaa28743be91a4e8?Expires=1685318400&Signature=dYpraoKdqeVN9tjsy4Bfm3eY0txNdFq~GCostGZSDs6PUuV4miq9KJQP8oR~PDfBLG4P2j-z4MTnQAJ7jDSjk2nZ66OAmkkbRJ1bjP56GX4MDzemRkXnVzuX-TypN74yMoj7Let3vjoRlmP54BRBshYgkBMRnkUl5sN1C4kzaDjH3VNJ1dafBquhc1aatuseyljSxAocu4raUFVVM4RYfiunrlfvAjB0RB6POByfMnYsW0niQe4p-GLjvnXpEpLgZDva8V-m1lQNSU4VcPh~QOO7ClPoOgB-nxiDCTsDubVxyVQLItM81BG3jG7zAYB1Jnu2W-MTyBsDcUB2vRb3mA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Nhìn lại chặng đường 30 năm quan hệ Việt Nam - Hàn Quốc, hướng tới đối tác chiến,...`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/5127/bafe/f323ea9d5de6930efaa28743be91a4e8?Expires=1685318400&Signature=dYpraoKdqeVN9tjsy4Bfm3eY0txNdFq~GCostGZSDs6PUuV4miq9KJQP8oR~PDfBLG4P2j-z4MTnQAJ7jDSjk2nZ66OAmkkbRJ1bjP56GX4MDzemRkXnVzuX-TypN74yMoj7Let3vjoRlmP54BRBshYgkBMRnkUl5sN1C4kzaDjH3VNJ1dafBquhc1aatuseyljSxAocu4raUFVVM4RYfiunrlfvAjB0RB6POByfMnYsW0niQe4p-GLjvnXpEpLgZDva8V-m1lQNSU4VcPh~QOO7ClPoOgB-nxiDCTsDubVxyVQLItM81BG3jG7zAYB1Jnu2W-MTyBsDcUB2vRb3mA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
];

interface INewsItem {
  tagName: string;
  title: string;
  time: string;
  image: string;
}


interface INewsList {
  newsItem : INewsItem[]
}

const NewsList = (props: INewsList) => {
  const { newsItem } = props;

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-[24px] mt-[24px]">
        {newsItem.map((item, index) => (
          <NewsItem key={index} item={item}></NewsItem>
        ))}
      </div>
      <Pagination currentPage={1} totalPages={30} />
    </>
  );
};






export default NewsList;
