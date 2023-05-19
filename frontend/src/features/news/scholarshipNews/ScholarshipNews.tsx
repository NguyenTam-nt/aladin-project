import React from 'react';
import NewsList from '../components/NewsList';
import NewsBanner from '../components/NewsBanner';

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
       "https://s3-alpha-sig.figma.com/img/1089/dbcc/24959fec347aa456bcdcad35e40d7d47?Expires=1685318400&Signature=ZvHvzA~xSnKGXTEC~Ytn49uOvHMPSJggLTrZjhGiL~lqJ05-V8kwM2V0Nx8GdfbL4K1hIT2CMJEwYdPyK7nkxYyDRmPBPI8B57Rt8AxMD3FlCvjxqJIS231nFxfvyqUZf7MHD3Xc6-rKbVsygERUqr~4bHoKJ3~A-W~vqLkGJNO8ubuSP5oSbRwHUVg6A1aKNpJ~~x9-NefhXBiwOeVdKg57FOIDXjJ8HbaXc0gIOOYaKnrC750uM97xfqLXkWFNWsT6npS0XOC3iYTsWnOHRhNQC5EFKNh0dn7p9Ixa8RLKylbcoG-Y0OfSegVSZ9-RY~oogb020-aDU9GT7rOk~g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Nhìn lại chặng đường 30 năm quan hệ Việt Nam - Hàn Quốc, hướng tới đối tác chiến,...`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/a3fb/54a5/000aeb8f88ab4f603f136a4f04d08719?Expires=1685318400&Signature=OvmO2sjici1qj0QfS7nsyq5U96wey3CSewFahDu4B2LtJYPopEeMU~KYTrln8-8lIUlZY618yfQA-x3Uw9xczEQDeujsJfPvjoobZ6ITgcc2L3aOpZvnpMvBXfMU3XsTWhShCrRGFZcoqTfWl3pKJ6tdr~9xJjKyvj9WEjvq1pFLt96i~4IRIpX9mBy1pXhb3PQeR2LSGRNf6CfK~0eYG7fCk7eW7PHvn3K0e8ZdSy4z37T3WKpIKF~tryd~O8kyH2ExePDbzQXfqIDIaQHwuvI1QpFw09Kiiwlw~i8MSm1EdunZ52AKul-0k5XjVzbm2phg29U4RtGELSJbgBdTpw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Nhìn lại chặng đường 30 năm quan hệ Việt Nam - Hàn Quốc, hướng tới đối tác chiến,...`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/ea8f/209f/73bd789639078264242ef478ddc5cb4e?Expires=1685318400&Signature=POb3UpG3dkvl8y0uUdJaOAfVyliqZtzrhjL-gCcJBq1BI8Je7AxR9h9Ci-B8ySr3RiyEn7ShEfPXjwyaoTlejec5D1-8OGVuNB3~WYPwcwODRDdAhZJ2TFTPxpwXwuI0VQ-V1kKBflRm7ytIkfCSDMZmZX2Xa-NR49fwCzHiBFMfO61UTCo5dXwrwsUBAD7InFNViZeo5WkAo5oI4hDHEbT0v9hwVtlTpxYtcz7-GT2FG4pZlGSF-mtNHe4uXcTB4F-Ggi8q6~TxIfAQpXg~b0rsWXyOBesfkYmCC2obWUMqp8gr1WBkNzK1oem08aW7zOZ6WzRnzefLTOM0gYR4DQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Nhìn lại chặng đường 30 năm quan hệ Việt Nam - Hàn Quốc, hướng tới đối tác chiến,...`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/0544/3eab/70c34f5fc2023f5837fbddad31a4f99b?Expires=1685318400&Signature=hwobLr-j0RbNiI88zET4ArPqPsuWl0Qrts4XQjNq7rawVxs~LlbEklDQe69v548foQeYdxqum9TosISKUl44Y7R59TRtNViw0GLonjL59n-Vpw1giYDp7qmZb-ssTLnTyAF-3hEDhUki3Y~D5Gg30lasyFYu2cvRTaiWST7z68dxiuQWp4UjcS~PkQDAkv15f2QbH4I11L~a2IlosBr0Z1fZdu-ctCBljdutQAIQWgbKXTW3b5w46wNfXEWCxGl~XT1MYe3-at-kEKaPkxFmEDYdafDqm1wcXONjTG-2wNAwG9PsBnPCqv1F13ByedeoFUs7C18uel~WNmmWjpmcgA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Nhìn lại chặng đường 30 năm quan hệ Việt Nam - Hàn Quốc, hướng tới đối tác chiến,...`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/4b01/a767/22ccedf09fa43dbb2e0231f639822d91?Expires=1685318400&Signature=qIhxvE1G78o4NTq3xtUmTcBZPiM4S0Okcq84BbbG2OEDPzj4iI51~XUUU3BO2Q0gvVm0UTtScqeDLryySFo3BYCY2d63n0GkEDuHCubUpQsrADQZ60P8QbkDrLB12XRFLYAcLpMgGcHavTccU9WIYYzIqL4Okb09FixUWZBBD0Qb8GzL0H0h704o4kXuCJsEQfASDjGps~VDFGLOE-hjtOSwMmXaXefokpcVJKqc1eekkH0Ys3X~xRLqJnK9I6rsDcXpRtOLHfbA~O4rA9VnKxkrpKLC6oXoEyT3LV6CITYTX7ZpOM8jMJc3gHuQO6xRSLm3tqWYJtGe5KX98pYJfg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
];

const bannerItem = [
  {
    tagName: "Nghiên cứu khoa học",
    title: `Nulla ullamcorper volutpat proin integer nisi ullamcorper ut diam. Tortor velit orci a mi ac nibh.Nulla ullamcorper volutpat proin integer nisi ullamcorper ut diam. Tortor velit orci.`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/c9fb/14ce/da96cc95d6c0dc202a4dbf3b2ead178a?Expires=1685318400&Signature=kGvpfWMb0m39zgwnVp6RTxa3yoKLK9dQGswpwegr3YcU2NI9kbNeOPnjwyERgMHj7nWZRfuEyZvmiflcLT7Qfrt4UK4Fp8rJW006I2YrsLeelUPQG3ipGGXr4ZzDGX6751HSF~GTocvUCP7eS0zAStTfuqj00Ks2qvsnd5FWQnnNJ3D5kJe3s5XjpGXtCVgIOX~sKDIyUwyZh0BtSEh3tbq524twNw-rfxaavXw7MQ5VMAG7uO-fhWgIkuriY151Lu76f8XzsF8BLY~YLQ1CyQMe3UhQeNUr7d-W8AEs8WWvgnLWGzHmm1RQ0OPJ1hkkGcOxqJkLjwuAL1kf-OBdwQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    tagName: "Nghiên cứu khoa học",
    title: `Nulla ullamcorper volutpat proin integer nisi ullamcorper ut diam. `,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://s3-alpha-sig.figma.com/img/d41b/df9c/d6a342a19acea50588de317e08b61d98?Expires=1685318400&Signature=Fv965dy6bF6vSqcGqsyoLSr8Kq2cWgHxTsmXizpFumIQu26DRAKi5g-bt1Y8vgtnH68SL~VKrPYU81u62m7VrtVgbwyQgdqmZgsUGEHeID~qV8RcKsmkL~mcLKMZPCJ3tcJZ0ecm-en4Ju5z0yQFFJ-A~EuwcGyl52rLxHc1QHw2-F6KylNuNKPrFjXY0HwW2pkuygqaXFSgOZaTMqOtlv~Aen9-Gr0~KvHdmc2nvaFY8918sBij1C5nEm1FL8A91Vt2ptmLE-BCVkmGcIXxTdHIcVJWlEU4cA-0mRwO4-0UpXrD~b88fr-F0TXDtmwfxwftPgkxCz5OLBECkO3FJg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
];


const ScholarshipNews = () => {
  return (
    <div className="w-rp  justify-between items-center mb-[120px] ">
      <NewsBanner newsBanner={bannerItem} />
      <NewsList newsItem={data} />
    </div>
  );
};

export default ScholarshipNews