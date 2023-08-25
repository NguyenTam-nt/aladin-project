import CloseIcon from "@assets/iconElements/CloseIcon";
import PrevIconElm from "@assets/iconElements/PrevIconElm";
import { KoreanFlagImage, VietnamsFlagImage } from "@assets/images";
import CricleButton from "@components/Buttons/CricleButton";
import DynamicButton from "@components/Buttons/DynamicButton";
import { GroupInput } from "@components/input/GroupInput";
import { InputComponent } from "@components/input/InputComponent";
import { TextError } from "@components/input/TextError";
import { TextareaComponent } from "@components/input/TextareaComponent";
import TitleInput from "@components/input/TitleInput";
import { ModalContext } from "@contexts/contextModal";
import useFocusOut from "@hooks/useFocusOut";
import { colors } from "@utility/colors";
import { useFormik } from "formik";
import { useContext, ReactNode, useState } from 'react';
import { useTranslation } from "react-i18next";
import * as Yup from 'yup';

export type COUNTRY = 'Vietnamese' | 'Korea'
const MOBILE_TELEPHONE_PREFIXES: { country: COUNTRY; telephone_prefixes: string, image: string }[] = [
    { country: "Vietnamese", telephone_prefixes: "+84", image: VietnamsFlagImage },
    { country: "Korea", telephone_prefixes: "+82", image: KoreanFlagImage },
]

const GetFreeConsulationModal = () => {
    const { setShowModal } = useContext(ModalContext);
    const [preview, setPreview] = useState(MOBILE_TELEPHONE_PREFIXES[0]);

    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: {
            fullName: "",
            phoneNumber: "",
            email: "",
            address: "",
            content: ""
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .required("message.form.required")
                .max(40, "message.form.max"),
            job: Yup.string()
                .required("message.form.required")
                .max(350, "message.form.max"),
            comment: Yup.string()
                .required("message.form.required")
                .max(180, "message.form.max"),

        }),
        onSubmit: async (value) => {
            console.log({ value });
        }
    });

    const {
        clickShow,
        setClickShow,
        ref
    } = useFocusOut();

    const SelectPhoneNumber = () => {
        return (
            <>
                <div ref={ref}>
                    <div className="flex flex-row gap-x-1 justify-center items-center">
                        <img src={preview.image} alt={preview.country} />
                        <p>{preview.telephone_prefixes}</p>
                        <div className="relative">
                            <button
                                onClick={() => setClickShow((prev) => !prev)}
                                className="-rotate-90 flex justify-center items-center">
                                <div className="">
                                    <PrevIconElm width={15} height={12} color={colors.darkOrange} />
                                </div>
                            </button>
                            {
                                clickShow && (
                                    <div className="absolute z-10 w-[104px] top-4 left-0 ">
                                        <div className="bg-neutra-neutral98 rounded">
                                            {
                                                MOBILE_TELEPHONE_PREFIXES.map((it, idx) => {
                                                    return (
                                                        it.country !== preview.country && (
                                                            <>
                                                                <button
                                                                    key={idx}
                                                                    onClick={() => {
                                                                        setPreview(it)
                                                                        setClickShow((prev => !prev))
                                                                    }}
                                                                    className="px-[9px] py-[6px] flex flex-row gap-x-2 justify-center items-center" >
                                                                    <img src={it.image} alt={it.country} className="" />
                                                                    <p className="w-11 flex items-start text-normal text-neutra-neutral2 font-normal font-NunitoSans">{it.telephone_prefixes}</p>
                                                                </button >
                                                            </>
                                                        )
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                </div >
            </>
        )
    }
    return (
        <>
            <div className="w-[680px] pt-[22px] pb-10 bg-white rounded-[20px]">
                <div className="px-11 ">
                    <div className="flex flex-row justify-between">
                        <p className="text-main font-bold text-title font-NunitoSans">
                            {t('product.get-free-consulation.title')}
                        </p>
                        <CricleButton
                            onClick={() => setShowModal((prev: boolean) => !prev)}
                            className=""
                            icon={<CloseIcon width={24} height={24} color={colors.aqua02} />}
                        />
                    </div>
                    <div className="pt-[14px]">
                        <p className="text-normal font-NunitoSans font-normal text-neutra-neutra20">{t('product.get-free-consulation.content')}</p>
                        <div className="pt-4 flex flex-col gap-y-5">
                            <div>
                                <GroupInput
                                    title="product.get-free-consulation.form.full-name"
                                    valueInput={formik.values.fullName}
                                    nameInput="fullName"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="product.get-free-consulation.form.placeholder-full-name"
                                    titleError={formik.touched.fullName && formik.errors.fullName ? formik.errors.fullName : ""}
                                />
                            </div>
                            <div>
                                <TitleInput isRequired={true} name={"product.get-free-consulation.form.phone-number"} />
                                <InputComponent
                                    value={formik.values.phoneNumber}
                                    name="phoneNumber"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="product.get-free-consulation.form.placeholder-phone-number"
                                    renderLeft={() => {
                                        return (
                                            <span className="mr-[16px]">
                                                <SelectPhoneNumber />
                                            </span>
                                        );
                                    }}
                                />
                                <TextError message={formik.touched.phoneNumber && formik.errors.phoneNumber ? formik.errors.phoneNumber : ""} option={{ max: 40 }} />
                            </div>
                            <div>
                                <GroupInput
                                    title="product.get-free-consulation.form.email"
                                    valueInput={formik.values.email}
                                    nameInput="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="product.get-free-consulation.form.placeholder-email"
                                    titleError={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                                />
                            </div>
                            <div>
                                <GroupInput
                                    title="product.get-free-consulation.form.address"
                                    valueInput={formik.values.address}
                                    nameInput="address"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="product.get-free-consulation.form.placeholder-address"
                                    titleError={formik.touched.address && formik.errors.address ? formik.errors.address : ""}
                                />
                            </div>
                            <div>
                                <TitleInput isRequired={true} name={"product.get-free-consulation.form.content"} />
                                <TextareaComponent
                                    name="content"
                                    value={formik.values.content}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="product.get-free-consulation.form.placeholder-content"
                                />
                                <TextError message={formik.touched.phoneNumber && formik.errors.phoneNumber ? formik.errors.phoneNumber : ""} option={{ max: 40 }} />
                            </div>
                        </div>
                        <div className="pt-9 flex flex-col gap-y-3">
                            <DynamicButton
                                onClick={() => { }}
                                text={t('product.button.ask-for-advice')}
                                gradien={true}

                                className="w-full !rounded-[20px] !px-[6px] !py-2 !min-w-[83px] text-[16px] leading-normal font-bold font-NunitoSans"
                            />
                            <DynamicButton
                                onClick={() => { }}
                                text={t('product.button.view-more-products')}
                                textGradient={true}
                                className="flex-1 !rounded-[20px] !px-[6px] !py-2 !min-w-[83px] text-[16px] leading-normal font-bold font-NunitoSans"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default GetFreeConsulationModal;