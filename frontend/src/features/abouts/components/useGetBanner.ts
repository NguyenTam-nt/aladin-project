import { bannerService } from "@services/banner"
import type { BannerType, IBanner } from "@typeRules/banner"
import { useEffect, useState } from "react"


export const useGetBanner = (type:BannerType) => {
    const [banner, setBanner] = useState<IBanner>( () => {
        try {
          return  JSON.parse(localStorage.getItem(`about:${type}`) || "") ?? undefined
        } catch (error) {
                return undefined
        }
    }
    )

    useEffect(() => {
        bannerService.getByType(type).then((data) => {
            setBanner(data.data?.[0])
            localStorage.setItem(`about:${type}`, JSON.stringify(data.data?.[0]))
        })
    }, [type])

    return {
        banner
    }
}