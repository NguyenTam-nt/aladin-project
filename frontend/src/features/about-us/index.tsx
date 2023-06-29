import { paths } from '@constants/routerPublic'
import React, { useEffect, useState } from 'react'
import bgContact from "@assets/images/contact/bg-contact.webp";
import AboutUsItem from './components/AboutUsItem';
import PlaceService from '@services/PlaceService';
import { SIZE_DATA } from '@constants/index';
import type { IResponseData } from '@typeRules/index';
import type { PlaceType } from '@typeRules/place';
import { HomeTopicType } from '@typeRules/home';
import { Banner } from '@components/Banner';

function AboutUsPage() {

  const [placeResponse, setPlaceResponse] = useState<IResponseData<PlaceType>>()

  useEffect(() => {
    getPlaceData(0)
  
  }, [])
  

  const getPlaceData = async (page:number) => {
    try {
      PlaceService.get_home({page: page, size: SIZE_DATA, sort: "id,asc"})
        .then(response => {
          setPlaceResponse(response)
        })
        .catch(error => {
        })
    } catch (error) {
    } 
  }
  return (
    <div className='h-full'>
      {/* <Banner name="Giới thiệu" Link={paths.about.prefix} /> */}

      <Banner type={HomeTopicType.about} />
      <div className="w-full h-full py-10 lg:py-20"
         style={{
          backgroundImage: `url(${bgContact})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {
          placeResponse && placeResponse.list && placeResponse.list.map((item, idx) => {
            return <AboutUsItem item={item} idx={idx + 1} key={item.id} />
          })
        }
      </div>
    </div>
  )
}

export default AboutUsPage