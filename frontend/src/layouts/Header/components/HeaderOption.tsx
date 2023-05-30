import { ICArrowDown } from '@assets/icons/ICArrowDown'
// import { ICSearch } from '@assets/icons/ICSearch'
import { Colors } from '@constants/color'
import { Ilanguage, TranslateContext } from '@contexts/Translation'
import VnFlag from "@assets/images/VN.jpg";
import KoFlag from "@assets/images/korean.jpg";
import React, { useContext } from 'react'
import { HeaderItemFlag } from './HeaderItemFlag'
import { withResponsive } from '@constants/container';
import useWindowResize from '@hooks/useWindowResize';
import { AuthContext } from '@contexts/AuthContext';
import { Link } from 'react-router-dom';
import { prefixRootRoute } from '@configs/index';
import { pathsAdmin } from '@constants/routerAdmin';

export const HeaderOption = () => {
    const { t, isVn } = useContext(TranslateContext);
    const {width} = useWindowResize()
    const {doLogin, isLogin} = useContext(AuthContext)

  return (
    <div className="flex items-center">
    {/* <div className='mr-[18px] xl:mr-0'>
      <ICSearch color={width < withResponsive._1280 ? Colors.text_secondary : Colors.text_white} />
    </div>
    <HeaderOptionSlash /> */}
    <div className="flex">
      {/* <Link className="text-[14px] text-white font-normal" to="#">
    {t("home.header.signup")}
  </Link> */}
    {
      !isLogin ? (
        <button className=" hidden xl:block text-[14px] font-bold text-white" onClick={doLogin} >
          {t("home.header.login")}
        </button>

      ) : <Link className='text-[14px] font-bold text-white' to={`${prefixRootRoute.admin}/${pathsAdmin.info_account.prefix}`}>{t("home.header._managent")}</Link>
    }
    </div>
     <HeaderOptionSlash />
    <div className="relative menu">
      <div className="flex items-center cursor-pointer pl-2">
        {
          <HeaderItemFlag
            type={isVn ? Ilanguage.vi : Ilanguage.ko}
            image={isVn ? VnFlag : KoFlag}
            text={isVn ? "home.header.viTag" : "home.header.koTag"}
          />
        }
        <div>
          <ICArrowDown color={width < withResponsive._1280 ? Colors.text_secondary : Colors.text_white}  />
        </div>
      </div>
      <ul className="mt-[12px] flex items-center pl-2 bg-white border-[1px] border-solid border-br_E9ECEF z-[1]">
        <li className="flex items-center mt-[4px] cursor-pointer">
          <HeaderItemFlag
            isWhite={false}
            type={!isVn ? Ilanguage.vi : Ilanguage.ko}
            image={!isVn ? VnFlag : KoFlag}
            text={!isVn ? "home.header.viTag" : "home.header.koTag"}
          />
        </li>
      </ul>
    </div>
  </div>
  )
}

const HeaderOptionSlash = () => {
    return <div className="w-[1px] h-[16px] hidden xl:block relative bg-white mx-[24px]" />
}