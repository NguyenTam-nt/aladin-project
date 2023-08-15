import BreakCrumb, { BreadcrumbType } from '@components/Breadcrumb'
import FormContactNew from '@components/Form/ContactFormNew'
import Map from '@components/Map/Map'
import useI18n from '@hooks/useI18n'
import ContactServices, { ResponseContactStoreInfo } from '@services/ContactServices'
import FooterServices, { ContentFooter, ResponseFooter } from '@services/FooterService'
import { nl2br } from '@utility/helper'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'

function ContactPage() {

    const {t} = useI18n()
    const [contactStoreInfo, setcontactStoreInfo] = useState<ResponseContactStoreInfo>()
    const [footerInfo, setFooterInfo] = useState<ContentFooter>()
    const [ggMapLink, setggMapLink] = useState<string>("")

    const [breakcrumDataMobile, setbreakcrumDataMobile] = useState<BreadcrumbType[]>([
        {
            name: "Trang chủ",
            clickable: true,
            active: false,
            link: "/"
        },
        {
            name: "Liên hệ",
            clickable: false,
            active: true,
            link: ""
        }
    ])

    useEffect(() => {
        try {

            FooterServices.get()
            .then(data => {
              setFooterInfo(data)
              
            })
      
            ContactServices.getInfo()
              .then(data => {
                setcontactStoreInfo(data)
                setggMapLink(data?.data?.stores[0]?.linkGgMap || "")
              })
          } catch (error) {
            
          }
    }, [])

    const handleChangeAddress = (p: string) => {
        console.log(p);
        
        setggMapLink(p)
    }
    

  return (
    <>
        <div className="flex lg:hidden h-9 items-center absolute top-0">
            <BreakCrumb data={breakcrumDataMobile} normalClass="text-wap-regular2" activeClass=" line-clamp-1 font-semibold" />
        </div>
        <div className='mb-20'>
            <div className="">
                <h3 className='hidden lg:block text-title font-bold mb-10'>{t("about_us.contact_title")}</h3>
                <div className="mb-5 lg:mb-10">
                    <h4 className='text-wap-regular2 lg:text-normal1 mb-2'>{t("about_us.contact.address")}</h4>
                    {
                        contactStoreInfo?.data?.stores.map((s, i) => {
                            return <p key={i} className={clsx('text-wap-regular2 lg:text-normal1 mb-2 font-bold cursor-pointer', {
                                "text-main": s.linkGgMap == ggMapLink
                            })} onClick={() => handleChangeAddress(s.linkGgMap)}>
                                {s.address}
                            </p>
                        })
                    }
                </div>
                <div className="mb-5 lg:mb-10">
                    <h4 className='text-wap-regular2 lg:text-normal1 mb-2'>{t("about_us.contact.email")}</h4>
                    <a href={`mailto:${footerInfo?.email}`} className='text-wap-regular2 lg:text-normal1 mb-2 font-bold'>
                        {footerInfo?.email}
                    </a>
                </div>
                <div className="mb-5 lg:mb-10">
                    <h4 className='text-wap-regular2 lg:text-normal1 mb-2'>{t("about_us.contact.phone")}</h4>
                    <p className='text-wap-regular2 lg:text-normal1 mb-2 font-bold'>
                        {footerInfo?.phoneNumber?.map((p, i) => {
                        if(i < footerInfo?.phoneNumber?.length - 1)
                            p += " / "
                        return <a key={i} href={`tel:${p.replace(/\s/g, '').replace('/', '')}`} className="">{p}</a>
                        })}
                    </p>
                </div>
                <div className="mb-5 lg:mb-10">
                    <h4 className='text-wap-regular2 lg:text-normal1 mb-2'>{t("about_us.contact.work_time")}</h4>
                    <div
                        className='text-wap-regular2 lg:text-normal1 mb-2 font-bold'
                        dangerouslySetInnerHTML={{__html: contactStoreInfo?.data ? nl2br(contactStoreInfo?.data?.workingTime) : ''}}
                    />
                </div>
                <div className="h-[316px]">
                    <Map ggMapLink={ggMapLink} width={"100%"} height={"100%"} />
                </div>
            </div>

            <div className="mt-16">
                <h3 className='text-normal2 font-semibold lg:text-title lg:font-bold mb-5 lg:mb-10'>{t("about_us.contact.form.title")}</h3>
                <div className="">
                    <FormContactNew />
                </div>
            </div>
        </div>
    </>
  )
}

export default ContactPage