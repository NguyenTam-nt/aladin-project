import { withResponsive } from '@constants/container'
import { TranslateContext } from '@contexts/Translation'
import useWindowResize from '@hooks/useWindowResize'
import React, { useContext } from 'react'
import { GeneralHistorySliderPC } from './GeneralHistorySliderPC'
import { GeneralHitorySliderMobile } from './GeneralHitorySliderMobile'
import { GeneralTitle } from './GeneralTitle'

const data = [
  {
    year: 1994,
    des_vn: "Nghành Hàn Quốc học ra đời trực thuộc Bô môn Đông Á, Khoa Đông phương học, Trường Đại học Tổng hợp TP.HCM (tên gọi cũ của Trường ĐH KHXH&NV)",
    des_ko: "한국학과는 호치민대학교(구 인문사회과학대학교) 동양학부 동아시아학과 산하에서 탄생하였습니다.",
    img: "https://s3-alpha-sig.figma.com/img/c4c3/bb2a/f93c401d5b10916d928e617feefd2e53?Expires=1685318400&Signature=EnIMLkJkqE6VBG820mg0Zddsyy~olAUO3hDfbq-mYBraa1d4t87K1c1G1cMS0xqbGnNy9SCWz7GBmY31Tdcrs3WaVPfnfPXJzruUhE37Z8KaIOC5sVJ-t0oJZ81rR2WMllOzOMZID2I2QwL~9aVpFlvDMP-ap5UhNqq7-7T9B4p7edM~gowrg2rZvFy4vZShetP0p5K6B8qdcF~R-Me0GpYTNPEEa3pDfFhdCKNLvVdkrvk7kR3hI-G2rGUTxYpRXoZv-99j7FzRks6v7AW6l6lDjwLwfD25WSTDwtdgweIBpZg4fpw94wyFkU2nx5U0QItWXYhKas8ybdpDsqv0-A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
  },
  {
    year: 2010,
    des_vn: "Bộ môn Hàn Quốc tách ra khỏi khoa Đông phương học, trở thành bộ môn Hàn Quốc học tương đương cấp khoa độc lập đầu tiên trong hệ thống giáo dục đại học Việt Nam",
    des_ko: "한국어학과는 동양학부에서 분리되어 베트남 고등교육체계에서 최초로 독립된 학과급 한국어과목이 되었다.",
    img: "https://s3-alpha-sig.figma.com/img/ad7b/591e/4de45de3e788433f9c9f444e9debd713?Expires=1685318400&Signature=oHo5YUNVBdFsOgyqXvyfFWwJvi0kdwgVFEBwAX0FaijvF9~uGntYt6j7DS-2zaKnX5vxEUnyEFeSz3HURVqG~xDPrrEYA45ovwTnTKDQa8Idp5qt6K8mJEt34npKJ2Vh3gATpewizmSt4fT-6XA6C4ZPqXiclc3cfYOp6SSK4yR-lakAx2AeSCrhZRZKpZwnSKvvLzhSN3bNW9nHDt4CsRORshvc75Uk~C8hKVQDzN1F-VunFoIIo~YVO4M0oOwq7f9CPvQDxRFm9pHNiu1mGhX43TbxFbAUfvwhD4WeJWfAWHxklBleKVB~7-lhnuZd7uez-fPtONTIgiJMjKrk4A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
  },
  {
    year: 2015,
    des_vn: "Bộ môn Hàn Quốc được nâng cấp thành Khoa Hàn Quốc học trực thuộc Trường ĐH KHXH&NV, ĐHQG-HCM. Đây cũng là khoa đào tạo nghành Hàn Quốc học đầu tiên trên cả nước.",
    des_ko: "VNU-HCM 인문사회과학대학 한국학부 한국학부로 승격 국내 최초의 한국학부이기도 하다.",
    img: "https://s3-alpha-sig.figma.com/img/6eb9/7eea/6d30c85783979399ebead17e2bc083d1?Expires=1685318400&Signature=CXvxgP0aLZzSfZ9w6cVH1YZVQU9BicQIb0Au8RoETPbB7wslldnIP9SSmG1ky69ANF0syq5uolRTeoddUV2gtCKWT9-2haRf3mV-J5-Qc0ELoUUw7LMMhhQ1-WXAUQYxCxXSCAc5l4a0uS51Aeu~IVKEPHKYDrYQmcBpJMsUvNAgyKe0j7iwJh-12EAvAN8TlQ1aq4vAtwd4i7gq2ljBlIHYGy6XMALVcW7IhR2BSC6aFxzxrK8QZlM16hPEnf8ao~0qVeDnHNjBZNljdP5qfHKUc~z0oLcNiizK4ub~YYAiCCuA6LUdrfhJGYuXmQeNFLm-EFT-Ozcb7MqoYXFtmw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
  },
  {
    year: 2023,
    des_vn: "Khoa Hàn Quốc học tiếp tục phát triển không ngừng, khẳng định vị thế là đơn vị đào tạo Hàn Quốc học hàng đầu Việt Nam, một đầu mối nghiên cứu khoa học, hợp tác quốc tế về Hàn Quốc học trong nước và Đông Nam Á",
    des_ko: "한국학부는 지속적으로 발전하고 있으며, 베트남과 동남아시아에서 한국학에 대한 과학 연구 및 국제 협력의 중심지이자 베트남의 선도적인 한국학 교육 기관으로서의 위치를 ​​확고히 하고 있습니다.",
    img: "https://s3-alpha-sig.figma.com/img/73f6/35e0/92d4ece804d1f35355cd77f685dc1dc2?Expires=1685318400&Signature=Y0Iwrm-n8v2cjZFIPMS1viPlDpuUi6b86KrbOv5PgAPCkDrQUqPT4Dsy2aHP6hFmXKJ1wUybs5SaBVx2QHZ~JIUwt8PMT0Bc4bVZEnzTrt9VNCnuEiVMDclmq63oF9DsJbdpSDWvjuqBzlQnRvk32TdpWkZRtL~XmPomoxvSrrb2k4E6S~BWY~jlyZ6UXq1qTSwm8NkpWFNJOAHKjt8vIs5X4Uz3ymGhy04sviZ4CESso528z522uBvD-HUM-RcdhI4kf19xAjycRFe4nBspm1b-cfOK0l~FoKodm6Z4oBIiexH~tKqM1bVIE~i1cGbAiRC7nzQOaAzKJW0Oubfj1A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
  }
]

export const GeneralHistory = () => {
    const { width } = useWindowResize();
    const {isVn} = useContext(TranslateContext)
  return (
    <div>
       <GeneralTitle title={isVn ? "1. Lịch sử hình thành và phát triển" : "1. 형성과 발전의 역사"} />
        {width >= withResponsive._992 ? (
          <GeneralHistorySliderPC data={data} />
        ) : (
          <GeneralHitorySliderMobile data={data} />
        )}
      </div>
  )
}
