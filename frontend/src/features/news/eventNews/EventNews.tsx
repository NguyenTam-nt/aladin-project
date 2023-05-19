import React from 'react';
import NewsList from '../components/NewsList';
import NewsBanner from '../components/NewsBanner';
const data = [
  {
    tagName: "Nghiên cứu khoa học",
    title: `Sinh hoạt khoa học "Từ lý thuyết nghiên cứu đến thực hành thiết kế luận văn tốt nghiệp"`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/92a1/16de/2aa86665113a7593f0001e56f8cd98e6?Expires=1685318400&Signature=FYtacZdtgBGRuDF-0bgdK5l9XFty1gD76DbPED1kOMGSLwjRpPEa2IVmQZ0XhihtFSsXbN5~vSl1BHdjowQyRbAoBJhtIllaRbxRXyWHCmhoE4-7obcUCKkwrAhFGO2jTjyyA5kWe58PfLDus47~RrpH3IE3KM6cwZF1nXSAMu6I6WbpI78p~TeEoyRLlWtW5YXyJ1VGAWeZijJcfEHwgUUMI1uwCaQmb0qDC7XJWi~UB0kw-7hpZPak4-vcoIL6c46k0j0LX-GMx8LhkNud8xdshrc3vmgJguCzFxz8YEbZF7-eKrFfYbU5w-Ax8HnyBRhMvcUpK0ESX5uJ5n-Ofg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Nhìn lại chặng đường 30 năm quan hệ Việt Nam - Hàn Quốc, hướng tới đối tác chiến,...`,
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
      "https://s3-alpha-sig.figma.com/img/440e/2ca7/dd9e8e24e6a2cc592c6432049dedc718?Expires=1685318400&Signature=Q4U-8cgMhqx52ZeDgjCGQlyqWvHwot~8rKtwd50GJSMiNB5FU3jN2vH~snZ104wBs7ZoGLJEK-OyIHBVaFOYrVXxTYJ2Bt5ncpYR~bpYisOKLkURlVIgqI5f2CVbLJOp~fL3RF4fkNBJyIsexClepFCaD9bcvJJ1mt8anC42mJtffzuUfWEXtITSXNXsVvOB6Kj2APFRoZIDzoZmAwHj2KyqlIOUbuPwDLcdQM2RekLWQugcyovSmttJC-AUQ7yJlis6scVMcPUq6y2d4hyOZ026Jm56SRHkl9wNgql6GjY78uEiv9NusO-uAY64oBUhGzadXz06FovqjL-V~~NQ~A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
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
];

const bannerItem = [
  {
    tagName: "Nghiên cứu khoa học",
    title: `Đẩy mạnh nghiên cứu về chính trị Hàn Quốc trong bối cảnh Việt Nam - Hàn Quốc trở thành Đối tác chiến lược toàn diện`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/5ea1/ff68/3019dd98b7e0ec07431ab83f95d6e5a7?Expires=1685318400&Signature=EqH6fnojCmfI6QR~Vs8U~uEvQwg2iHUXjybBoM0iAhOLVSRWlKlPhx~FYQgL~O0D4fzAPT4r1Me-XypzqwijP~Ily4uN0vGDVa0uEYa98gvDElQwKqNj4K8DgyAqsHdxrfkzrpcAC7fqUOQ4rWhVvEP601fWbWy4bSy3SUetoeM9QuWf5xyhKukny8JPC7uswuS1lsO1MSBlB0Z6uprhxyHVfXNm9jLkOUKi3e5LX~rgYqmrmucjPVqSIbHuXc2z2Ud~Ugnf3eJ3FNWtfptGQjvpFdODdzGkIEsBJYrBG2jyBuR-nh8LbtB203kmo8LkAHYdKitKe~lvmtvOAdSVSg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Chia sẻ kinh nghiệm trong xây dựng giáo trình tiếng Hàn`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/4357/2454/47604e28b8c453c8e9134dacf5ea851a?Expires=1685318400&Signature=NYXWZLIy94PV8kvhKjQ2MmH88~4ppAs9tN4sm6CsBEhWLzyBySXokSIS9L7~0S5xyy5kc8YH2O3~e-DueH3ARO8G~1jiOeswX21IJbQUYnp9amcHsRvK-0pVv-y0LdtKbM4-sQiGsdBZg2p8pZjj54kPBcrINQuf9bUqzU9xBd04XH5LM8-yNBDNuNoQMzhYvTSgk0MaEsxDK0NLpCqT4CJiOautNSwr7yUG5s-TBesrHFeQUAbvISuI~bl-J1DMwUEIAVXqZWWC7B0T3pp3VTbV48wYYqv8AV~1WXw6U8wv-FatJtb6TSBDVVVUvCGpAnA8tkHr81v1G4oNMXxPIA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
];


const EventNews = () => {
  return (
    <div className="w-rp  justify-between items-center mb-[120px] ">
      <NewsBanner newsBanner={bannerItem} />
      <NewsList newsItem={data} />
    </div>
  );
};

export default EventNews