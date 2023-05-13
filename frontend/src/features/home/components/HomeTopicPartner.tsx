
import BannerProposal from "@assets/images/home_banner_proposal.png"
import BannerBg from "@assets/images/home_banner_bg.png"
import LogoPartner from "@assets/images/logo_partner.png"

export const HomeTopicPartner = () => {

    return (
        <>
            <div className="bg-bg_F8F8F8 relative h-[422px] mt-[140px]">
            <div className="w-rp">
                <img className="w-full h-[283px] object-cover translate-y-[-50%]" src={BannerProposal} alt="" />
            </div>
                <img className="w-full absolute object-cover bottom-0" src={BannerBg} alt=""  />

                <div className="w-rp-l grid grid-cols-7 gap-x-[72px] gap-y-[24px]">
                    <div>
                        <img src={LogoPartner} alt="" />
                    </div>
                    <div>
                        <img src={LogoPartner} alt="" />
                    </div>
                    <div>
                        <img src={LogoPartner} alt="" />
                    </div>
                    <div>
                        <img src={LogoPartner} alt="" />
                    </div>


                    <div>
                        <img src={LogoPartner} alt="" />
                    </div>
                    <div>
                        <img src={LogoPartner} alt="" />
                    </div>
                    <div>
                        <img src={LogoPartner} alt="" />
                    </div>
                    {/* <div>
                        <img src={LogoPartner} alt="" />
                    </div> */}
                </div>
            </div>

        </>
    )
}