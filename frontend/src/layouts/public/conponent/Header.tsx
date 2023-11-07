import { ICLogo } from "@assets/icons"
import { ICGm } from "@assets/icons/ICGm"
import { ICLogoFrame } from "@assets/icons/ICLogoFrame"
import { ICMenuBar } from "@assets/icons/ICMenuBar"
import { windownSizeWidth, withResponsive } from "@constants/index"
import { IRouter, routersPublic } from "@constants/routerPublic"
import React, { ChangeEvent, memo, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { SidebarNavigation } from "./SidebarNavigation"
import HttpService from "@configs/api"

export const Header = () => {
  useEffect(() => {
    let lastIndex = 0
    window.addEventListener(
      "scroll",
      () => {
        const header = document.getElementById("header")
        if (header) {
          const headerbreak = windownSizeWidth > withResponsive._1024 ? 120 : 80

          if (lastIndex < document.documentElement.scrollTop - headerbreak) {
            header!.style.transform = `translateY(${-headerbreak}px)`

            lastIndex = document.documentElement.scrollTop - headerbreak
          } else {
            header!.style.transform = `translateY(${0}px)`
            if (lastIndex > 0)
              lastIndex = document.documentElement.scrollTop - headerbreak
          }
        }
      },
      {
        passive: true,
      }
    )

    return () => {
      window.removeEventListener("scroll", () => {
        lastIndex = document.documentElement.scrollTop
      })
    }
  }, [])

  const headerData = useMemo(() => {
    return routersPublic.filter((item) => !item.isHiden)
  }, [])

  return (
    <div
      className="w-full h-[80px] lg:h-[120px] bg-header_bg backdrop-blur-[4px] active-header"
      id="header"
    >
      {windownSizeWidth > withResponsive._1024 ? (
        <HeaderPC headerData={headerData} />
      ) : (
        <HeaderMobile />
      )}
    </div>
  )
}

const HeaderPC = ({ headerData }: { headerData: IRouter[] }) => {
  const { t } = useTranslation()
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
  async function UploadVideo(e: ChangeEvent<HTMLInputElement>) {
    const data = new FormData()
    let file = e.target.files![0]

    const toBase64 = (file: any) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })
    const video = await toBase64(file)
    console.log({ video })
    function uploadVideo(
      videoPath: any,
      authKey: any,
      libraryId: any,
      videoName: any
    ) {
      const baseUrl = "https://video.bunnycdn.com/library/"
      const createOptions = {
        url: `${baseUrl}${libraryId}/videos`,
        data: {
          title: videoName,
        },
        headers: {
          AccessKey: authKey,
          "Content-Type": "application/json",
        },
      }

      HttpService.axiosClient
        .post(createOptions.url, createOptions.data, {
          headers: createOptions.headers,
        })
        .then((response) => {
          if (response.status === 200) {
            const uploadOptions = {
              url: `${baseUrl}${libraryId}/videos/${response.data.guid}`,
              data: video,
              headers: {
                AccessKey: authKey,
                "Content-Type": "application/octet-stream",
              },
            }

            HttpService.axiosClient
              .put(uploadOptions.url, uploadOptions.data, {
                headers: uploadOptions.headers,
              })
              .then((response) => {
                if (response.status === 200) {
                  return true
                }
                return false
              })
              .catch((error) => {
                console.log(error)
                return false
              })
          }
        })
        .catch((error) => {
          console.log(error)
          return false
        })
    }
    async function uploadMyVideo() {
      const result = await uploadVideo(
        "/public/test.mp4",
        "e86d3395-3028-45b9-a5c388c5a5b1-d155-4845",
        "170205",
        "title-video"
      )
      console.log({ result })
    }

    uploadMyVideo()
  }
  return (
    <div className="w-rp h-full flex items-center text-_18 uppercase justify-between text-white">
      <input onChange={UploadVideo} type="file" />

      {headerData.slice(0, 3).map((item, index) => {
        return (
          <Link onClick={handleScrollToTop} to={item.path} key={index}>
            {t(item.name)}
          </Link>
        )
      })}
      <Link
        onClick={handleScrollToTop}
        className="flex items-center relative justify-center"
        to=""
      >
        <div className="rotate-logo ">
          <ICLogoFrame />
        </div>
        <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="scale-logo scale-0">
            <ICGm />
          </div>
        </div>
      </Link>
      {headerData.slice(3).map((item, index) => {
        return (
          <Link onClick={handleScrollToTop} to={item.path} key={index}>
            {t(item.name)}
          </Link>
        )
      })}
    </div>
  )
}

const HeaderMobile = memo(() => {
  const [isShowSidebar, setShow] = useState(false)
  const handleShow = () => {
    setShow(!isShowSidebar)
  }
  return (
    <>
      <div className="w-rp flex h-full justify-between items-center">
        <div className="flex items-center">
          <Link
            onClick={() => setShow(false)}
            className="flex items-center relative justify-center"
            to="/"
          >
            <div className="rotate-logo ">
              <ICLogoFrame width={54} height={51} />
            </div>
            <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <div className="scale-logo scale-0">
                <ICGm width={37} height={22} />
              </div>
            </div>
          </Link>
        </div>
        <p className="title-18 text-center text-white">Giang mỹ</p>
        <button onClick={handleShow}>
          <ICMenuBar />
        </button>
      </div>
      {windownSizeWidth < withResponsive._1280 ? (
        <SidebarNavigation isShowSidebar={isShowSidebar} onShow={handleShow} />
      ) : null}
    </>
  )
})
