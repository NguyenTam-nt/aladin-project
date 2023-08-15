import useI18n from '@hooks/useI18n'
import { firstUpper, some } from '@utility/helper'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function NavigationAboutUs({policy}: some) {

  const {t} = useI18n()

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
    <div className='bg-gray-100 px-4 py-6 border-t-4 border-t-main border-transparent'>
        <div className="flex flex-col">
          <h4 className='text-normal1 font-bold mb-3'>{t("about_us.about_title")}</h4>
          {
            routeAboutus.map((item, i) => {
              return <NavLink to={item.link}  key={i} end
                className={(navData) =>
                  navData.isActive ? "text-main text-normal1 my-2" : "text-normal1 my-2"
                }
              >{item.name}</NavLink>
            })
          }
        </div>
        <div className="flex flex-col mt-5">
          <h4 className='text-normal1 font-bold mb-3'>{t("about_us.support_title")}</h4>
          {
            policy.map((item:any, i:any) => {
              return <NavLink to={`/about-us/policy/${item.id}`} 
              
                className={(navData) =>
                  navData.isActive ? "text-main text-normal1 my-2" : "text-normal1 my-2"
                } key={i}
              >{firstUpper(item.title)}</NavLink>
            })
          }
        </div>
    </div>
  )
}

export default NavigationAboutUs