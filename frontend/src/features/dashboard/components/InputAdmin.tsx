import { ICSearch } from '@assets/icons/ICSearch';
import { Input } from '@components/Input'
import { Colors } from '@constants/color';
import React, { useCallback } from 'react'

export const InputAdmin = () => {
    const renderRight = useCallback(() => {
        return (
          <div>
            <ICSearch color={Colors.secondary} />
          </div>
        );
      }, []);
  return (
    <div className="flex-1 h-full">
    <Input placeholder="common._placeholder_search" className="!h-[48px]" renderRight={renderRight} />
  </div>
  )
}
