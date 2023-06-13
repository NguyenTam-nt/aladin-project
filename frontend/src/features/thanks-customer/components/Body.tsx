import React from 'react'
import { useTranslation } from 'react-i18next'
import { BodyList } from './BodyList'
import { Pagination } from '@components/Paginnation'
import { usePagination } from '@hooks/usePagination'

export const Body = () => {
    const {t} = useTranslation()
    const {currentPage, setCurrentPage} = usePagination()
  return (
    <div className='w-rp py-[120px]'>
        <h3 className='title-48 text-secondary'>{t("home.customer.title")}</h3>
        <BodyList />
        <div className='flex justify-end mt-[40px]'>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={10} />
        </div>
    </div>
  )
}
