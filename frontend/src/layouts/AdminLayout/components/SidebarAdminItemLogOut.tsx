import { ICLogout } from '@assets/icons/AdminNavigation/ICLogout'
import { prefixRootRoute } from '@configs/index'
import { AuthContext } from '@contexts/AuthContext'
import { TranslateContext } from '@contexts/Translation'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

export const SidebarAdminItemLogOut = () => {
    const {t} = useContext(TranslateContext)
    const {doLogout} = useContext(AuthContext)
    const navigate = useNavigate()
    const handleLogout = () => {
      navigate(prefixRootRoute.public)
      doLogout()
    }
  return (
    <div onClick={handleLogout} className="flex items-center cursor-pointer h-[60px]  px-[29px] border-l-[4px] border-solid border-transparent">
    <div>
        <ICLogout />
    </div>
    <span className='ml-[16px] text-_16 font-normal text-text_C53434'>{t("admin.navigation._logout")}</span>
</div>
  )
}
