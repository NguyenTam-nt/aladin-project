import { paths } from '@constants/routerPublic'
import { Banner } from '@features/contact/components/Banner'
import React from 'react'
import bgContact from "@assets/images/contact/bg-contact.jpg";
import AboutUsItem from './components/AboutUsItem';

function AboutUsPage() {
  return (
    <div className='h-full'>
      <Banner name="Giới thiệu" Link={paths.about.prefix} />

      <div className="w-full h-full py-10 lg:py-20"
         style={{
          backgroundImage: `url(${bgContact})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <AboutUsItem />
        <AboutUsItem />
        <AboutUsItem />
        <AboutUsItem />
      </div>
    </div>
  )
}

export default AboutUsPage