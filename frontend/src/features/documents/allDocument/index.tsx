import { paths } from "@constants/router";
import NewsBanner from "@features/news/components/NewsBanner";
import NewsList from "@features/news/components/NewsList";
import React from "react"


const data = [
  {
    tagName: "Nghiên cứu khoa học",
    title: `Sinh hoạt khoa học "Từ lý thuyết nghiên cứu đến thực hành thiết kế luận văn tốt nghiệp"`,
    time: " 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/698d/38c9/e57701ea211ff234e389e516b5eb4496?Expires=1685318400&Signature=BNCSbYYHUwKIVrQ-G2tXrlw5EXIrnSUz9pNQ6QXKDzueinbT7xJpczg71i6FMIKC1Y9RJxV97g1N2c2iQ~kfIiYQFXxNXLWbg3EakUYZWPKRPJROsPTB2gY6-XbwftiXeajrM~dRABVSLGgXUPc-8i2xJkX~9qUSc6ix68XEBj-lvjNMDoCIfVdecb2BsMKEW~Sph0B0dB4sniRKMLrRo7w0wSz1YDsJc3l5A2GHDfZxV1sAWPKLv9o~6x6OkmmwXvKmYbOMNflTtz4rZ1q7xh0YVuX23LeXk9LOFm6GvP~R45ZEfsoAH8vQBVVMEWSnE1bXuMm-Ir7DBSF6aFChsg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Nhìn lại chặng đường 30 năm quan hệ Việt Nam - Hàn Quốc, hướng tới đối tác chiến,...`,
    time: " 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/5127/bafe/f323ea9d5de6930efaa28743be91a4e8?Expires=1685318400&Signature=dYpraoKdqeVN9tjsy4Bfm3eY0txNdFq~GCostGZSDs6PUuV4miq9KJQP8oR~PDfBLG4P2j-z4MTnQAJ7jDSjk2nZ66OAmkkbRJ1bjP56GX4MDzemRkXnVzuX-TypN74yMoj7Let3vjoRlmP54BRBshYgkBMRnkUl5sN1C4kzaDjH3VNJ1dafBquhc1aatuseyljSxAocu4raUFVVM4RYfiunrlfvAjB0RB6POByfMnYsW0niQe4p-GLjvnXpEpLgZDva8V-m1lQNSU4VcPh~QOO7ClPoOgB-nxiDCTsDubVxyVQLItM81BG3jG7zAYB1Jnu2W-MTyBsDcUB2vRb3mA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Nhìn lại chặng đường 30 năm quan hệ Việt Nam - Hàn Quốc, hướng tới đối tác chiến,...`,
    time: " 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/5127/bafe/f323ea9d5de6930efaa28743be91a4e8?Expires=1685318400&Signature=dYpraoKdqeVN9tjsy4Bfm3eY0txNdFq~GCostGZSDs6PUuV4miq9KJQP8oR~PDfBLG4P2j-z4MTnQAJ7jDSjk2nZ66OAmkkbRJ1bjP56GX4MDzemRkXnVzuX-TypN74yMoj7Let3vjoRlmP54BRBshYgkBMRnkUl5sN1C4kzaDjH3VNJ1dafBquhc1aatuseyljSxAocu4raUFVVM4RYfiunrlfvAjB0RB6POByfMnYsW0niQe4p-GLjvnXpEpLgZDva8V-m1lQNSU4VcPh~QOO7ClPoOgB-nxiDCTsDubVxyVQLItM81BG3jG7zAYB1Jnu2W-MTyBsDcUB2vRb3mA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Nhìn lại chặng đường 30 năm quan hệ Việt Nam - Hàn Quốc, hướng tới đối tác chiến,...`,
    time: " 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/5127/bafe/f323ea9d5de6930efaa28743be91a4e8?Expires=1685318400&Signature=dYpraoKdqeVN9tjsy4Bfm3eY0txNdFq~GCostGZSDs6PUuV4miq9KJQP8oR~PDfBLG4P2j-z4MTnQAJ7jDSjk2nZ66OAmkkbRJ1bjP56GX4MDzemRkXnVzuX-TypN74yMoj7Let3vjoRlmP54BRBshYgkBMRnkUl5sN1C4kzaDjH3VNJ1dafBquhc1aatuseyljSxAocu4raUFVVM4RYfiunrlfvAjB0RB6POByfMnYsW0niQe4p-GLjvnXpEpLgZDva8V-m1lQNSU4VcPh~QOO7ClPoOgB-nxiDCTsDubVxyVQLItM81BG3jG7zAYB1Jnu2W-MTyBsDcUB2vRb3mA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Nhìn lại chặng đường 30 năm quan hệ Việt Nam - Hàn Quốc, hướng tới đối tác chiến,...`,
    time: " 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/5127/bafe/f323ea9d5de6930efaa28743be91a4e8?Expires=1685318400&Signature=dYpraoKdqeVN9tjsy4Bfm3eY0txNdFq~GCostGZSDs6PUuV4miq9KJQP8oR~PDfBLG4P2j-z4MTnQAJ7jDSjk2nZ66OAmkkbRJ1bjP56GX4MDzemRkXnVzuX-TypN74yMoj7Let3vjoRlmP54BRBshYgkBMRnkUl5sN1C4kzaDjH3VNJ1dafBquhc1aatuseyljSxAocu4raUFVVM4RYfiunrlfvAjB0RB6POByfMnYsW0niQe4p-GLjvnXpEpLgZDva8V-m1lQNSU4VcPh~QOO7ClPoOgB-nxiDCTsDubVxyVQLItM81BG3jG7zAYB1Jnu2W-MTyBsDcUB2vRb3mA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Nhìn lại chặng đường 30 năm quan hệ Việt Nam - Hàn Quốc, hướng tới đối tác chiến,...`,
    time: " 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/5127/bafe/f323ea9d5de6930efaa28743be91a4e8?Expires=1685318400&Signature=dYpraoKdqeVN9tjsy4Bfm3eY0txNdFq~GCostGZSDs6PUuV4miq9KJQP8oR~PDfBLG4P2j-z4MTnQAJ7jDSjk2nZ66OAmkkbRJ1bjP56GX4MDzemRkXnVzuX-TypN74yMoj7Let3vjoRlmP54BRBshYgkBMRnkUl5sN1C4kzaDjH3VNJ1dafBquhc1aatuseyljSxAocu4raUFVVM4RYfiunrlfvAjB0RB6POByfMnYsW0niQe4p-GLjvnXpEpLgZDva8V-m1lQNSU4VcPh~QOO7ClPoOgB-nxiDCTsDubVxyVQLItM81BG3jG7zAYB1Jnu2W-MTyBsDcUB2vRb3mA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
];


const bannerItem = [
  {
    tagName: "Nghiên cứu khoa học",
    title: `Đẩy mạnh nghiên cứu về chính trị Hàn Quốc trong bối cảnh Việt Nam - Hàn Quốc trở thành Đối tác chiến lược toàn diện`,
    time: " 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/698d/38c9/e57701ea211ff234e389e516b5eb4496?Expires=1685318400&Signature=BNCSbYYHUwKIVrQ-G2tXrlw5EXIrnSUz9pNQ6QXKDzueinbT7xJpczg71i6FMIKC1Y9RJxV97g1N2c2iQ~kfIiYQFXxNXLWbg3EakUYZWPKRPJROsPTB2gY6-XbwftiXeajrM~dRABVSLGgXUPc-8i2xJkX~9qUSc6ix68XEBj-lvjNMDoCIfVdecb2BsMKEW~Sph0B0dB4sniRKMLrRo7w0wSz1YDsJc3l5A2GHDfZxV1sAWPKLv9o~6x6OkmmwXvKmYbOMNflTtz4rZ1q7xh0YVuX23LeXk9LOFm6GvP~R45ZEfsoAH8vQBVVMEWSnE1bXuMm-Ir7DBSF6aFChsg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Chia sẻ kinh nghiệm trong xây dựng giáo trình tiếng Hàn`,
    time: " 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/2757/f217/c01cb6e52b70c5af62529b817a5ecee9?Expires=1685318400&Signature=C9h-RQQFAP9nPeZdtuaiqZTaTMpvycCHyXQMGR0zeG5-ZRBVtEIwDzLTp8l5sbyZeQS0apDqeH-Sav7Uu2Pi5-lI2z2S~~IPhclyKONE2YlswN1lpEXxT3DSbZVInXqfDUhfnC3MAYuNCnFHc11IqwbUwVI79HStyHa1gCsSf1SS24AwM4hqfoaJ8slwvgkutx-QCv8qi3w18anxL5qTD5wA7SfBxvIMbhIf7MliAR8Jkpt4YaewSl1SUYAyUSPda9q4TW8W-q~yAUmwbD9bkU8-5uXcd0TBbxWtFkrG5-qqHEqLTQYn89ubunX7oXN2kwryM7mgUiRKSAONtyyoJg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
];


const AllDocument = () => {
  const navigatonToDetail = `${paths.documents.prefix}/${paths.documents.detail}`
  return (
    <div className="w-rp  justify-between items-center mb-[120px] ">
      <NewsBanner newsBanner={bannerItem}  navigationToDetail={navigatonToDetail} />
      <NewsList newsItem={data}  navigationToDetail={navigatonToDetail}  />
    </div>
  );
};

export default AllDocument