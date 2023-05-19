import React from "react"
import NewsList from "../components/NewsList"
import NewsBanner from "../components/NewsBanner";


const data = [
  {
    tagName: "Nghiên cứu khoa học",
    title: `Sinh hoạt khoa học "Từ lý thuyết nghiên cứu đến thực hành thiết kế luận văn tốt nghiệp"`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/aa5e/c703/01e8ac2f8994a6e1ae5fcb0134df6e6e?Expires=1685318400&Signature=VCeGlW6kb8iMw9Whe0H0QUJOxbf1gOLBTqGsiHSASjhy5MHgOg~9xb8slZEwJdkOox0Yoko9bLhn9GlUNgLXyPHY~YryCzSa75rWvNL2smx7GskitkXKDro5akS5VMm2~H30QG8sVjvJ2W5WtrjVNXhsNS0IRUnGzCiKEZq~n~D1C8x1Q3ZGXQQ79D5Z85nz3Fz2DLOkUcC3ewFO6ZmKfKO-7JvG3ZosgT6dket8oDfk706PI-I-ERTFwSqCgjQvIDTTSIcgIU9eVBa4PEwA9p8TRgu1ybhoG-WBQ3QEIHSPgea9D5RxAogLi~cMOZDnhAKKUfZfLgMuWPSs0oKGJw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
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
      "https://s3-alpha-sig.figma.com/img/92a1/16de/2aa86665113a7593f0001e56f8cd98e6?Expires=1685318400&Signature=FYtacZdtgBGRuDF-0bgdK5l9XFty1gD76DbPED1kOMGSLwjRpPEa2IVmQZ0XhihtFSsXbN5~vSl1BHdjowQyRbAoBJhtIllaRbxRXyWHCmhoE4-7obcUCKkwrAhFGO2jTjyyA5kWe58PfLDus47~RrpH3IE3KM6cwZF1nXSAMu6I6WbpI78p~TeEoyRLlWtW5YXyJ1VGAWeZijJcfEHwgUUMI1uwCaQmb0qDC7XJWi~UB0kw-7hpZPak4-vcoIL6c46k0j0LX-GMx8LhkNud8xdshrc3vmgJguCzFxz8YEbZF7-eKrFfYbU5w-Ax8HnyBRhMvcUpK0ESX5uJ5n-Ofg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Nhìn lại chặng đường 30 năm quan hệ Việt Nam - Hàn Quốc, hướng tới đối tác chiến,...`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/173a/266a/9adda3b7a37b27aad79a718fa8c49bd7?Expires=1685318400&Signature=cjR5U-ZEij2FMN-EPoj5piPOQrLA75lerQfA-UKfuDuZUUB9ocLJXWgD4bYZmRxgF7geioTG2xiKHFa60FuJKv1AaTOMN7DmL84ROLgbRTPCRUK8goueP~Z4Ckuoq7Z2Zus~1FsRbbE2DkWmIi-KmjSojFf1yc3YDsqxPoKaMauKRxEniMeCKzK5gay3Ss8N6u4KP6-xVC9KjTyOdwygJe93UY9Qgb0~vtRnXlednNHmWSR2JRGrWLKwIPyfDCxfwfqzoaNFKwvcMxmdwTPJOj99DDuEoYBh3dwZQoC-8nya3WlPYVC1Ws97fvce4VCs9BKKfKTjIY-CCqeNNyb1tA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Nhìn lại chặng đường 30 năm quan hệ Việt Nam - Hàn Quốc, hướng tới đối tác chiến,...`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/8860/cdae/581c4c18c0a0b12f115da6616f76361b?Expires=1685318400&Signature=oDI4s4pqXbZZu~bwH5WuAlH-5KQ8Ym-yNmfi97jeRJ2MAVQvIsrWx7IKYdJTh7IrXWmOe8vdPYIuENkqKlNd3PhQtSF7pmnDdeSOyHtGdbrTt3BQGOUFh0YUcYmrn0XlD9yCXOKacrLNuSOecxsn0qkf-6tfZGFaIq6FK~fFk0a0TDxUWwsDSMTbvF~LFWeY0etlEXcMl1IBPUaW32D-0zMuhSICERh~11KkrO89WevZTimRwXObF3E509xf7L5UwRdclhjufIwNbMYniCDjf9LrDWXPURNYuOXKNhvS82GUDVtMDkxiwVbBWabYEeCdmXyxec8uWt511EOiq2Lckg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Nhìn lại chặng đường 30 năm quan hệ Việt Nam - Hàn Quốc, hướng tới đối tác chiến,...`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/440e/2ca7/dd9e8e24e6a2cc592c6432049dedc718?Expires=1685318400&Signature=Q4U-8cgMhqx52ZeDgjCGQlyqWvHwot~8rKtwd50GJSMiNB5FU3jN2vH~snZ104wBs7ZoGLJEK-OyIHBVaFOYrVXxTYJ2Bt5ncpYR~bpYisOKLkURlVIgqI5f2CVbLJOp~fL3RF4fkNBJyIsexClepFCaD9bcvJJ1mt8anC42mJtffzuUfWEXtITSXNXsVvOB6Kj2APFRoZIDzoZmAwHj2KyqlIOUbuPwDLcdQM2RekLWQugcyovSmttJC-AUQ7yJlis6scVMcPUq6y2d4hyOZ026Jm56SRHkl9wNgql6GjY78uEiv9NusO-uAY64oBUhGzadXz06FovqjL-V~~NQ~A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
];

const bannerItem = [
  {
    tagName: "Nghiên cứu khoa học",
    title: `Đẩy mạnh nghiên cứu về chính trị Hàn Quốc trong bối cảnh Việt Nam - Hàn Quốc trở thành Đối tác chiến lược toàn diện`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/698d/38c9/e57701ea211ff234e389e516b5eb4496?Expires=1685318400&Signature=BNCSbYYHUwKIVrQ-G2tXrlw5EXIrnSUz9pNQ6QXKDzueinbT7xJpczg71i6FMIKC1Y9RJxV97g1N2c2iQ~kfIiYQFXxNXLWbg3EakUYZWPKRPJROsPTB2gY6-XbwftiXeajrM~dRABVSLGgXUPc-8i2xJkX~9qUSc6ix68XEBj-lvjNMDoCIfVdecb2BsMKEW~Sph0B0dB4sniRKMLrRo7w0wSz1YDsJc3l5A2GHDfZxV1sAWPKLv9o~6x6OkmmwXvKmYbOMNflTtz4rZ1q7xh0YVuX23LeXk9LOFm6GvP~R45ZEfsoAH8vQBVVMEWSnE1bXuMm-Ir7DBSF6aFChsg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Chia sẻ kinh nghiệm trong xây dựng giáo trình tiếng Hàn`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/2757/f217/c01cb6e52b70c5af62529b817a5ecee9?Expires=1685318400&Signature=C9h-RQQFAP9nPeZdtuaiqZTaTMpvycCHyXQMGR0zeG5-ZRBVtEIwDzLTp8l5sbyZeQS0apDqeH-Sav7Uu2Pi5-lI2z2S~~IPhclyKONE2YlswN1lpEXxT3DSbZVInXqfDUhfnC3MAYuNCnFHc11IqwbUwVI79HStyHa1gCsSf1SS24AwM4hqfoaJ8slwvgkutx-QCv8qi3w18anxL5qTD5wA7SfBxvIMbhIf7MliAR8Jkpt4YaewSl1SUYAyUSPda9q4TW8W-q~yAUmwbD9bkU8-5uXcd0TBbxWtFkrG5-qqHEqLTQYn89ubunX7oXN2kwryM7mgUiRKSAONtyyoJg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
];

const StudyNews = () => {
     return (
          <div className="w-rp  justify-between items-center mb-[120px] ">
            <NewsBanner newsBanner={bannerItem}/>
            <NewsList  newsItem={data}/>
          </div>
        );
}

export default StudyNews