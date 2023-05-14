import { withResponsive } from '@constants/container'
import useWindowResize from '@hooks/useWindowResize'
import React from 'react'
import { GeneralHistorySliderPC } from './GeneralHistorySliderPC'
import { GeneralHitorySliderMobile } from './GeneralHitorySliderMobile'
import { GeneralTitle } from './GeneralTitle'

export const GeneralHistory = () => {
    const { width } = useWindowResize();
  return (
    <div>
       <GeneralTitle title="1. Lịch sử hình thành và phát triển" />
        {width >= withResponsive._992 ? (
          <GeneralHistorySliderPC />
        ) : (
          <GeneralHitorySliderMobile />
        )}
      </div>
  )
}
