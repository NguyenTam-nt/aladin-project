import { AboutUsIcon, TargetIcon, ValueIntroIcon } from "@assets/icons";
import React from "react";

function Intropage2() {
  return (
    <div className="bg-white">
      <div
        className="w-full h-[293px] xl:h-[414px] flex justify-center items-center relative"
        style={{
          backgroundImage: "url('/images-raw/intro/banner-intro.png')",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-[#5C9A75] opacity-[0.25]"></div>
        <h1 className="font-valky underline decoration-2 underline-offset-[20px] hidden lg:block text-title lg:text-header3 text-white z-1">
          CHÚNG TÔI LÀ SME
        </h1>
      </div>
      <div className="lg:pb-[93px] px-4 pb-[17px] bg-[#E7EAE5] overflow-hidden">
        <div className="container ">
          <div className="lg:pt-[63px] pt-[26px] h-auto">
            <h2 className="font-valky text-title lg:text-header2 text-main leading-normal uppercase">
              VỀ CHÚNG TÔI
            </h2>
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-[25px] relative mt-[12px] lg:mt-[16px]">
            <div className="flex-1">
              <p className="text-main text-wap-regular1 lg:text-normal text-justify">
                Với triết lý kinh doanh lấy khách hàng làm trọng tâm, HMC luôn
                không ngừng nâng cao chất lượng sản phẩm và dịch vụ để mang đến
                cho khách hàng những giá trị tốt nhất. HMC xin trân thành cảm ơn
                tất cả Quý khách hàng đã tin tưởng lựa chọn chúng tôi là người
                bạn đồng hành và hợp tác trong suốt thời gian qua. Nhờ sự tin
                tưởng của khách hàng mà chúng tôi có được thành công như ngày
                hôm nay.
              </p>
              <div className="mt-4 w-full">
                <img src="/images-raw/intro/about-us-left.png" className="w-full" />
              </div>
            </div>
            <div className="w-full mt-[11px] lg:mt-0 lg:w-[40%] ">
              <img src="/images-raw/intro/about-us-right.png" className="w-full" />
            </div>

            {/* <img src='/images-raw/intro/about-us-icon.png' className='absolute  -right-0 -bottom-0 w-[80%]'/> */}
            <div className="absolute right-0 bottom-0 w-[125%] lg:w-10/12">
              <AboutUsIcon className=" w-full h-auto " />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8  lg:mt-0 bg-white">
        <div className="">
          <div
            className="font-valky uppercase px-[15%] text-title lg:text-header2 lg:leading-9 leading-normal   font-medium text-white w-4/5 lg:w-3/5   text-left bg-main pt-2 pb-1 lg:pt-4 lg:pb-3 landing-tag "
            style={{
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            Giá trị
          </div>
        </div>
        <div className="px-4">
          <div className="container ">
            <div className="w-full flex lg:flex-row flex-col mt-4 items-end">
              <img
                src="/images-raw/intro/value-top.png"
                className="w-full lg:w-[55%] h-auto z-1"
              />
              <div className="w-full lg:w-auto flex-1 lg:-ml-[48px] mt-2 lg:mt-0">
                <ValueIntroIcon />
              </div>
            </div>
            <div className="w-full flex lg:flex-row flex-col-reverse mt-4 gap-2 lg:gap-6">
              <div className="w-full lg:w-[55%] text-main text-justify">
                <p className=" text-wap-regular1 lg:text-normal">
                  Công ty cổ phần Khoáng sản luyện kim màu tiền thân là Công ty
                  cổ phần Nhựa Hamico được thành lập ngày 03 tháng 08 năm 2009
                  với số đăng ký kinh doanh là 0700382548. Ngành nghề kinh doanh
                  chủ yếu là sản xuất kinh doanh và in ấn các loại bao bì, các
                  loại sản phẩm có nguồn gốc từ nhựa và hạt nhựa, kinh doanh
                  xuất nhập khẩu nhựa, giấy và các sản phẩm từ nhựa, giấy. Công
                  ty cổ phần Khoáng sản luyện kim màu là đơn vị hàng đầu trong
                  lĩnh vực khai thác và chế biến khoáng sản, vật liệu xây dựng
                  của tỉnh Hòa Bình.
                </p>
                <p className="  text-wap-regular1 lg:text-normal mt-4">
                  Với quyết tâm đón đầu công nghệ, Công ty đã nghiên cứu và đưa
                  vào sản xuất nhiều loại máy móc, thiết bị, quy trình hiện đại
                  nhằm nâng cao tối đa năng suất cũng như giảm thiểu những tác
                  động xấu tới môi trường và cảnh quan xung quanh.
                </p>
              </div>
              <div className="flex-1 ">
                <img
                  src="/images-raw/intro/value-bottom.png"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#E7EAE5]  lg:pb-[135px]">
        <div className="px-4">
          <div className="container lg:pl-[88px] lg:pr-[68px]">
            <div className="pt-6 lg:pt-[63px] h-auto relative">
              <h2 className="font-valky text-title lg:text-header2 text-main leading-normal uppercase w-2/3 ">
                Tầm nhìn & sứ mệnh
              </h2>
              <div className="w-[86%] lg:w-[85%]  border-transparent border-t-main border-r-main  border-[3px] relative pb-12 lg:pb-0">
                <div
                  className="

                          absolute -top-[9.5px] -left-[3px]
                          border-t-[8px] border-t-transparent
                          border-l-[20px] border-l-main
                          border-b-[8px] border-b-transparent"
                ></div>
                <div className="w-[80%] lg:w-2/3 mt-[36px]">
                  <p className="text-main text-wap-regular1 lg:text-normal text-justify">
                    Đến năm 2030 trở thành công ty hàng đầu về lĩnh vực thiết kế,
                    chế tạo, cung cấp và lắp đặt các dây chuyền thiết bị trong
                    ngành công nghiệp luyện kim.
                  </p>
                  <p className="text-main text-wap-regular1 lg:text-normal text-justify mt-4">
                    Không ngừng phát triển nguồn nhân lực, đầu tư trang thiết bị
                    hiện đại và áp dụng công nghệ tiên tiến trên thế giới để tạo
                    ra các sản phẩn đạt chất lượng cao theo tiêu chuẩn châu Âu.
                    Luôn lấy niềm tin và sự thỏa mãn của khách hàng làm động lực
                    cho sự phát triển của HMC.
                  </p>
                </div>
                <div className="hidden lg:flex mt-6 gap-4 -mb-[21px]">
                  <div
                    className="bg-[#D9D9D9] w-[8%] h-[42px] rounded-[3px]"
                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
                  ></div>
                  <div
                    className="bg-[#D9D9D9] flex-1 h-[42px] rounded-[3px]"
                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
                  ></div>
                </div>
                <div className="absolute absolute-center-object-br w-auto h-1/2  sm:h-[60%]  md:h-[80%] lg:h-full ">
                  <TargetIcon  height="100%"  className="" />
                </div>
              </div>
            </div>
            
            <div className="flex lg:hidden w-[150%] -ml-[30%]   gap-4 -mb-[21px] -mt-[21px]">
              <div
                className="bg-[#D9D9D9] w-[32%] h-[42px] rounded-[3px]"
              ></div>
              <div
                className="bg-[#D9D9D9] flex-1 h-[42px] rounded-[3px]"
              ></div>
            </div>

            <div className="hidden lg:block  lg:pt-[134px] h-auto ">
              <div className="relative w-full">
                <h2 className="font-valky text-title lg:text-header2 text-main leading-normal uppercase  w-2/3">
                  đội ngũ nhân sự có kinh nghiệm
                </h2>
                <div className="absolute lg:left-[70%] top-1/2 w-[100%] h-[3px] bg-main ">
                  <div
                    className="
                              absolute -top-[6.5px] left-0
                              border-t-[8px] border-t-transparent
                              border-l-[20px] border-l-main
                              border-b-[8px] border-b-transparent"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:pb-[48px] -mt-[46px] ">
        <div className="container px-4 lg:pl-[88px] lg:pr-[68px]">
          <div
            className="w-2/3 pt-[46px] pl-[61px] pb-4  bg-[#E7EAE5] z-10 relative"
            style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="w-1/2 pt-4 border-t-[#9CB148] border-[3px] text-main ">
              <p className="text-justify text-normal">
                Với châm ngôn bình đẳng, đoàn kết cùng phát triển, HMC luôn nỗ
                lực phát triển giá trị con người. Chúng tôi tôn trọng, đối xử
                bình đẳng với nhân viên của mình.
              </p>
              <p className="mt-4 text-justify text-normal">
                Tinh thần đoàn kết cũng là điều mà công ty chúng tôi hướng đến.
                Sở hữu đội ngũ nhân sự dày dặn kinh nghiệm, tay nghề cao, đội
                ngũ HMC luôn không ngừng học hỏi, trau dồi, làm mới bản thân để
                hoàn thành những yêu cầu có độ phức tạp cao và đưa tới những giá
                trị làm hài lòng khách hàng.
              </p>
            </div>
            <div className="absolute bottom-[103px] left-[60%] -right-[40%] -top-[90px] ">
              <img
                src="/images-raw/intro/worker.png"
                className="w-full  h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="block lg:hidden px-4 pt-[88px] pb-8">
        <div className="container">
          <h2 className="font-valky text-title text-main leading-normal text-center uppercase  w-full">
            đội ngũ nhân sự có kinh nghiệm
          </h2>
        </div>
        <div className="-mx-4">
            <div className="w-[86%] bg-[#EBEBEB] h-[486px] relative mt-[11%]">
              <img
                src="/images-raw/intro/worker.png"
                className="absolute bottom-[10%] left-[14%] w-full  h-full object-cover"
              />
            </div>
            
        </div>
        <div className="container">
          <div className="w-full pt-4  text-main ">
            <div className="border-t-[#9CB148] border-[4px] w-3/4 mx-auto pt-1 pb-4 border-transparent"></div>
            <p className="text-justify text-wap-regular1">
              Với châm ngôn bình đẳng, đoàn kết cùng phát triển, HMC luôn nỗ
              lực phát triển giá trị con người. Chúng tôi tôn trọng, đối xử
              bình đẳng với nhân viên của mình.
            </p>
            <p className="mt-4 text-justify text-wap-regular1">
              Tinh thần đoàn kết cũng là điều mà công ty chúng tôi hướng đến.
              Sở hữu đội ngũ nhân sự dày dặn kinh nghiệm, tay nghề cao, đội
              ngũ HMC luôn không ngừng học hỏi, trau dồi, làm mới bản thân để
              hoàn thành những yêu cầu có độ phức tạp cao và đưa tới những giá
              trị làm hài lòng khách hàng.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intropage2;
