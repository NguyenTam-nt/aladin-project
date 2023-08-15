import useI18n from '@hooks/useI18n'
import { firstUpper, some } from '@utility/helper'
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function NavigationAboutUsMobile({policy}: some) {

  const {t} = useI18n()

  const [open, setopen] = useState(false)

  const routeAboutus = [
    {
      name: t("about_us.introduce_title"),
      link: "/about-us"
    },
    {
      name: t("about_us.news_title"),
      link: "/about-us/news"
    },
    {
      name: t("about_us.contact_title"),
      link: "/about-us/contact"
    },
  ]
  

  return (
    <div className=' px-4 py-2 border border-gray-200 rounded-sm '>
      <button className="hover:text-main text-wap-regular2 font-semibold underline underline-offset-8 mb-2 " onClick={() => setopen(!open)}>
        Danh mục trang
      </button>
      {open && <div className="flex gap-4 mt-4">
        <div className="flex-1 flex flex-col">
          <h4 className='text-normal font-semibold mb-2'>{t("about_us.about_title")}</h4>
          {
            routeAboutus.map((item, i) => {
              return <NavLink to={item.link}  key={i} end={item.link == "/about-us"}
                className={(navData) =>
                  navData.isActive ? "text-main text-wap-regular2 my-2" : "text-wap-regular2 my-2"
                }
              >{item.name}</NavLink>
            })
          }
        </div>
        <div className="flex-1 flex flex-col">
          <h4 className='text-normal font-semibold mb-2'>{t("about_us.support_title")}</h4>
          {
            policy.map((item: any, i: any) => {
              return <NavLink to={`/about-us/policy/${item.id}`} 
                className={(navData) =>
                  navData.isActive ? "text-main text-wap-regular2 my-2" : "text-wap-regular2 my-2"
                } key={i}
              >{firstUpper(item.title)}</NavLink>
            })
          }
        </div>
      </div>}
    </div>
  )
}

export default NavigationAboutUsMobile