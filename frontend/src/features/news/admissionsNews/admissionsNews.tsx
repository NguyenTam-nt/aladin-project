import React from "react"
import NewsList from "../components/NewsList"
import NewsBanner from "../components/NewsBanner"


const data = [
  {
    tagName: "Nghiên cứu khoa học",
    title: `Sinh hoạt khoa học "Từ lý thuyết nghiên cứu đến thực hành thiết kế luận văn tốt nghiệp"`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/4eba/b34c/ffb638b0ed06731b19dc5b56c505a215?Expires=1685318400&Signature=WIiH-yzEtPnd8mscxc1933z2Bs2d9SwlLkRsLVJ-~1gLZ6iH6tv5Mc0yRKoqGxQ7K7VMF7kuA~xpq0IGwNsmsVFMLLkPwuD0Ap-Jq9r3JrOD8NX3M3dwnNVo0TuTwJQK-JmxhbiXjZVtXgzMaO2wAPUUfRJoBeVdcbfIugad7DPKoQdJVxguyCv7YUm3EwpzNcQv98RP5IlTXXo~Do5s3JR58Gf~qeFpRdi-JBrBh5lStVhviFiMlSa7beGnAVVlH85J92Y5gQ6R3hzqsz7HcRG14LHl0NEvDOSCp~W8GoxHeHLNGKHqSJOItQIPfohGO~H3sxlE2awqhaNlNpwCXg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Nhìn lại chặng đường 30 năm quan hệ Việt Nam - Hàn Quốc, hướng tới đối tác chiến,...`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/a3e8/5d5c/d2bc2f649041aa95286f4f2a3cc6ebcc?Expires=1685318400&Signature=j2HC1NcHUz~BUYwlrDSoyOLqHm2LrfiueRW3rykXrfiQHwrtzgYnaY5Xp~LIhHTZeGm7rA0~mjfrJWIHKOWQAk98j3MaFl1T7RtvAcbZyfdK~VLvb1ZG5RpIplHYCHHhfXnt5TtmdBfwOxeaabLILTDOgZQ69XOfM51F8hDr5u6trRO9SkUn8f0Ipzntg4u7fxKeT3SDzoF0vQaQlNOITktnaxMiUihHGc60k1QPPz9njEbeXY~TXwKSoR8FeQiqaju4~jRQl8iHzd6-n0dtVVI0e61RS8fIzsi6xrpb22ST50oRUD1Cm2Silxj9NOmhPOACh82HPVAQit4gEUZsPQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Nhìn lại chặng đường 30 năm quan hệ Việt Nam - Hàn Quốc, hướng tới đối tác chiến,...`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/4357/2454/47604e28b8c453c8e9134dacf5ea851a?Expires=1685318400&Signature=NYXWZLIy94PV8kvhKjQ2MmH88~4ppAs9tN4sm6CsBEhWLzyBySXokSIS9L7~0S5xyy5kc8YH2O3~e-DueH3ARO8G~1jiOeswX21IJbQUYnp9amcHsRvK-0pVv-y0LdtKbM4-sQiGsdBZg2p8pZjj54kPBcrINQuf9bUqzU9xBd04XH5LM8-yNBDNuNoQMzhYvTSgk0MaEsxDK0NLpCqT4CJiOautNSwr7yUG5s-TBesrHFeQUAbvISuI~bl-J1DMwUEIAVXqZWWC7B0T3pp3VTbV48wYYqv8AV~1WXw6U8wv-FatJtb6TSBDVVVUvCGpAnA8tkHr81v1G4oNMXxPIA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Nhìn lại chặng đường 30 năm quan hệ Việt Nam - Hàn Quốc, hướng tới đối tác chiến,...`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/6b05/324b/6eb8de9beb66d339f47da8748daa6b4e?Expires=1685318400&Signature=E45dJ~So8e~mkSnyTk-Vp-Y6527XL4YUCJkmlVye3EmrcUjOUT2iQFqhzTpPrpQ4OS4ZDVuKNcvU3uc6egwWhv1rI2omVA0buKrJOZCtWKe7ZDnCTpB1xlZQ3Zra2f8Fvry0y50Imubk0fgmvAoZy6d8PN2ok7TsJLcoeclIrNH6lZ0AD4ItZrAJ9o8zdc2VRoBDkNW~zegNw2XT6PYZKl5mD649BaV4jUVuMz-2eP05Q3kknUDfcu-eJpot54NsRXIPh~p71-FBIlPZlJvN5GDo32M3N2v~WzCugZqR9YsOXW58EhV0XXH3AkvC3LCQnBwCpDOSeSDLsYUMVe36BQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Nhìn lại chặng đường 30 năm quan hệ Việt Nam - Hàn Quốc, hướng tới đối tác chiến,...`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/071c/f08b/cd66a816e2175ac1df82ce222c397dd3?Expires=1685318400&Signature=DmrF~DRG1lxll3F8Df6oBMwJRb~2lMtwYA9dCGWHr6zQtwPVgFrvZXuQ9vEYi6dKzXoBqjJjTGbrfVATbIkACylibkz6MM~PlrpX08xgMevmG8SAW~T-RzGDO~8zKm-9EW7S-9MMJe7A7dLVbAaQm2~64KOePb22ptL2to16VgzYvj31htXgf-67mJ3bcmtaYURmDCfXbrEOQacKRmfc~PzX1l3PQaf0rz7mWhxICHiY3gRPPPD-KFh-n5qxwLQGfewjdJaH0mvIxGVLk6RMdjqVmGDQ2Fwt~wxad-gu3LyVeQAXSqcIhfKvZidTZQn6RTq18gaMNiROuCzMkNVadQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Nhìn lại chặng đường 30 năm quan hệ Việt Nam - Hàn Quốc, hướng tới đối tác chiến,...`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/7041/0e56/273997807f6a6eca557b02393b75fbc7?Expires=1685318400&Signature=iDCTud9AsKbKZsD6OiRvqz3KRXLP3w9kbUa6so~0DtWJNnykxg7~KtCPD7LhlNAn3tbQtxJItehghiALbgE3oowLM~v7gkrvek7-rrfvZIw9vU9L~nKkmci-PYXlNHMG7oHc72OEJaUS5RXCbp~mOjSda-qmdJaxpu1kjwoOPdDORwiAUDewic7Ja1RkuN29WArPVk1tWnff0AwBhejOSN8rD2P9sk2CLl9sArUHZcIZPtQ3wuLcOmyPLGcCrhL-kaZ~laK7FynAXc4wHt3IxRzU9PzN4JTdUOOg4PeNGH4DYCslJEUHpR2Atr~coY-QRVp0Qh8ypAzJtXM1Lp-ELg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
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

const AdmissionsNews = () => {
     return (
       <div className="w-rp  justify-between items-center mb-[120px] ">
       <NewsBanner newsBanner={ bannerItem} />
      <NewsList  newsItem={data}/>
       </div>
     );
}

export default AdmissionsNews