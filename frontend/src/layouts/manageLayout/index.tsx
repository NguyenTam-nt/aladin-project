import React, { useLayoutEffect, useState } from "react"
import { Outlet, useNavigate, Navigate } from "react-router-dom"
import Header from "./Header"
import Navleft from "./Navleft"
import { useAuthContext } from "@contexts/hooks/auth"
import { windownSizeWidth, withResponsive } from "@constants/index"
import { RoleUser } from "@typeRules/user"

const LayoutManager = () => {
  const { isLogin, doLogin, user } = useAuthContext()
  const [isShowSidebar, setShow] = useState(
    windownSizeWidth > withResponsive._1280
  )
  // const navigate = useNavigate()
  const handleShow = () => {
    setShow(true)
  }

  const handleHiden = () => {
    if (windownSizeWidth > withResponsive._1280) return
    setShow(false)
  }

  if (!isLogin) {
    doLogin()
    return
  } else {
    if (user?.authorities?.[0].name !== RoleUser.ADMIN) {
      // navigate("/")
      return <Navigate to="/" />
    }
  }
  return (
    <div className="bg-bg_fafafa xl:min-w-[1280px] relative">
      <Navleft isShown={isShowSidebar} onShow={handleHiden} />
      <div className="w-full grid grid-cols-1 xl:grid-cols-[300px_1fr] min-h-[calc(100vh)]">
        <div className=" hidden xl:block" />
        <div className="relative xl:min-w-[calc(1280px_-_300px)] bg-bg_fafafa min-h-[calc(100vh)]">
          <Header onShow={handleShow} />
          <div className="px-[20px] xl:px-[70px] 3xl:pl-[96px] xl:min-w-[calc(1280px_-_300px)] 3xl:pr-[300px]  w-full 3xl:max-w-[calc(1920px)]  py-[20px] xl:py-[80px]">
            <div className="max-w-full">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LayoutManager
