import React, { memo } from 'react'
import { TitleTopic } from '../TitleTopic'

import device1 from "@assets/images/home/device1.webp";
import device2 from "@assets/images/home/device2.png";
import device3 from "@assets/images/home/device3.png";
import device4 from "@assets/images/home/device4.png";

const data = [
  {
    name: "Không dầu mỡ, không chiên rán, healthy, tốt cho sức khỏe",
    image: device1,
  },
  {
    name: "Công nghệ hấp số 1 Hồng Kông giúp giữ được nguyên vẹn vitamin và dưỡng chất.",
    image: device2,
  },
  {
    name: "Không gian phong cách Hồng Kông sang trọng, hiện đại, tha hồ check - in",
    image: device3,
  },
  {
    name: "Phục vụ tận tình: Chu đáo, luôn đặt khách hàng là trung tâm",
    image: device4,
  },
];

export const HomeTopicDeviceList = memo(() => {
  return (
    <div className="w-rp ">
    <div className="flex justify-center mb-[64px]">
      <TitleTopic title="home.device.title" />
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px]">
      {data.map((item, index) => {
        return (
          <div
            key={index}
            className="flex flex-col gap-y-[24px] items-center justify-center"
          >
            <div className='w-[80px] h-[80px] lg:w-[120px] lg:h-[120px]'>
              <img className='w-full h-full object-cover' src={item.image} />
            </div>
            <p className="text-center">{item.name}</p>
          </div>
        );
      })}
    </div>
  </div>
  )
})
