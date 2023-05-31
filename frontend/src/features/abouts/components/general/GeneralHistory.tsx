import { withResponsive } from '@constants/container'
import { TranslateContext } from '@contexts/Translation'
import useWindowResize from '@hooks/useWindowResize'
import React, { useContext, useEffect, useState } from 'react'
import { GeneralHistorySliderPC } from './GeneralHistorySliderPC'
import { GeneralHitorySliderMobile } from './GeneralHitorySliderMobile'
import { GeneralTitle } from './GeneralTitle'
import type { IHistory } from '@typeRules/history'
import { historySevice } from '@services/historyService'
import { PAGE_SIZE_HISTORY } from '@constants/contain'

export const GeneralHistory = () => {
    const { width } = useWindowResize();
    const {isVn} = useContext(TranslateContext)
    const [data, setData] = useState<IHistory[]>([])
    useEffect(() => {
      historySevice.get({page: 0, size: PAGE_SIZE_HISTORY, sort: "year,desc"}).then((data) => {
        setData(data.data)
      })
    }, [])
  return (
    data.length > 0 ? (
    <div>
       <GeneralTitle title={isVn ? "1. Lịch sử hình thành và phát triển" : "1. 형성과 발전의 역사"} />
        {width >= withResponsive._992 ? (
          <GeneralHistorySliderPC data={data} />
        ) : (
          <GeneralHitorySliderMobile data={data} />
        )}
      </div>
    ) : null
  )
}
