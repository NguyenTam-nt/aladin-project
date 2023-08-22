import CloseIcon from "@assets/iconElements/CloseIcon";
import PrevIconElm from "@assets/iconElements/PrevIconElm";
import CricleButton from "@components/Buttons/CricleButton";
import { ModalContext } from "@contexts/contextModal";
import { colors } from "@utility/colors";
import { useContext } from 'react';
const GetFreeConsulationModal = () => {
    const { setShowModal } = useContext(ModalContext);
    return (
        <>
            <div className="w-[680px] pt-[22px] pb-10 bg-white">
                <div className="px-11 ">
                    <div className="flex flex-row justify-between">
                        <p className="text-main font-bold text-title font-NunitoSans">
                            NHẬN TƯ VẤN MIỄN PHÍ
                        </p>
                        <CricleButton
                            onClick={() => setShowModal((prev: boolean) => !prev)}
                            className=""
                            icon={<CloseIcon width={24} height={24} color={colors.aqua02} />}
                        />
                    </div>
                    <div className="pt-[14px]">
                        <p className="text-normal font-NunitoSans font-normal text-neutra-neutra20">Chúng tôi rất vui khi được nhận thông tin từ bạn. Bạn có thể điền đầy đủ thông tin vào form bên dưới, SME Store sẽ phản hồi lại bạn trong thời gian sớm nhất.</p>
                    </div>
                </div>
            </div>
        </>
    )
};

export default GetFreeConsulationModal;