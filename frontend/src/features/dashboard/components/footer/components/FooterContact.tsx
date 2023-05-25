import { SubHeaderTopic } from '@features/dashboard/home/components/SubHeaderTopic'
import React from 'react'
import TitleInput from '../../TitleInput'
import { Input } from '@components/Input'

export const FooterContact = () => {
  return (
    <div>
        <SubHeaderTopic title='admin._footer._contact._title' />
        <div className=''>
            <TitleInput name='admin._footer._contact._fb' forId='' />
            <Input placeholder='admin._footer._contact._placeholder' />
        </div>
        <div className='mt-[16px]'>
            <TitleInput name='admin._footer._contact._yt' forId='' />
            <Input placeholder='admin._footer._contact._placeholder' />
        </div>
        <div className='mt-[16px]'>
            <TitleInput name='admin._footer._contact._lk' forId='' />
            <Input placeholder='admin._footer._contact._placeholder' />
        </div>
    </div>
  )
}
