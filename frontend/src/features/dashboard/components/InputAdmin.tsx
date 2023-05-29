import { ICSearch } from '@assets/icons/ICSearch';
import { Input } from '@components/Input'
import { Colors } from '@constants/color';
import React, { ChangeEvent, memo, useCallback } from 'react'

type Props = {
  onChange?: (event:ChangeEvent<HTMLInputElement>) => void
  searchQuery?: string
}

export const InputAdmin = memo(({onChange, searchQuery}:Props) => {
    const renderRight = useCallback(() => {
        return (
          <div>
            <ICSearch color={Colors.secondary} />
          </div>
        );
      }, []);
  return (
    <div className="flex-1 h-full">
    <Input onChange={onChange} value={searchQuery} placeholder="common._placeholder_search" className="!h-[48px]" renderRight={renderRight} />
  </div>
  )
})
