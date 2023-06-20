import { homeService } from '@services/home'
import type { HomeTopicType, ITopicType } from '@typeRules/home'
import { useEffect, useState } from 'react'


export const useGetTopic = (type:HomeTopicType) => {
    const [listBanner, setListBanner] = useState<ITopicType>(() => {
        try {
            return (
              JSON.parse(localStorage.getItem(`banner-${type}`) || "") ?? undefined
            );
          } catch (error) {
            return undefined;
          }
    })
    useEffect(() => {
        homeService.getHomeTopicByType(type).then((data) => {
           
            setListBanner(data)
            localStorage.setItem(`banner-${type}`, JSON.stringify(data))
        })
    }, [type])

    return {listBanner, setListBanner}
}
