import { homeService } from '@services/home'
import type { HomeTopicType, ITopicType } from '@typeRules/home'
import { useEffect, useState } from 'react'


export const useGetTopic = (type:HomeTopicType) => {
    const [listBanner, setListBanner] = useState<ITopicType>()
    useEffect(() => {
        homeService.getHomeTopicByType(type).then((data) => {
            console.log({data})
            setListBanner(data)
        })
    }, [type])

    return {listBanner}
}
