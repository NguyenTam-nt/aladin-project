import { AddImage } from "@assets/icons";
import { useShowMessage } from "@components/Modal/DialogMessage";
import { useShowConfirm } from "@components/Modal/DiglogComfirm";
import BtnLoading from "@components/btn-loading/BtnLoading";
import { ToastContex } from "@contexts/ToastContex";
import useI18n from "@hooks/useI18n";
import { Introduce, IntroductionImage } from "@pages/AdminPage/ManagerIntroduce";
import IntroServices from "@services/IntroServices";
import TranslateService from "@services/TranslateService";
import UploadImage from "@services/UploadImage";
import { ALLOW_IMAGE_FILE_TYPE, MAX_IMAGE_BANNER_SIZE, ROUTES } from "@utility/constants";
import { useFormik } from "formik";
import { t } from "i18next";
import { useContext, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';

export default function IntroduceForm(
  { intros }: { intros: Array<Introduce> }
) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { onAddToast } = useContext(ToastContex);
  const { lang } = useI18n();
  const [imageUrlIntro, setImageUrlIntro] = useState<any>()
  const [imageUrlIntroSecond, setImageUrlIntroSecond] = useState<any>()
  const [displayImage, setDisplayImage] = useState<any>()
  const [displayImageSecond, setDisplayImageSecond] = useState<any>()
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRefSecond = useRef<HTMLInputElement>(null);
  const [intro, setIntro] = useState<any>();
  const [introSecond, setIntroSecond] = useState<any>();
  const navigate = useNavigate();
  const { showConfirm } = useShowConfirm();
  const { showError, showSuccess, showWarning } = useShowMessage();

  const onClick = (e: any) => {
    if (inputRef.current) {
      inputRef.current.click();
    }

  };

  const onClickSecond = (e: any) => {
    if (inputRefSecond.current) {
      inputRefSecond.current.click();
    }
  }

  const handleCancel = () => {
    navigate(`/admin/${ROUTES.admin.introduce.index}`);
  };

  useEffect(() => {
    setIntro(intros[0])
    setIntroSecond(intros[1])
    try {
      setDisplayImage(intros[0].introductionImage[0].url)
      setDisplayImageSecond(intros[1].introductionImage[0].url)
      setImageUrlIntro(intros[0].introductionImage[0].url)
      setImageUrlIntroSecond(intros[1].introductionImage[0].url)
      if (lang === 'ksl') {
        setValues({
          intro_title: intros[0].titleKr || "",
          intro_content: intros[0].content1_Kr || "",
          intro_second_title: intros[1].titleKr || "",
          intro_second_content_1: intros[1].content1_Kr || "",
          intro_second_content_2: intros[1].content2_Kr || "",
        })
      } else {
        setValues({
          intro_title: intros[0].titleVn || "",
          intro_content: intros[0].content1_Vn || "",
          intro_second_title: intros[1].titleVn || "",
          intro_second_content_1: intros[1].content1_Vn || "",
          intro_second_content_2: intros[1].content2_Vn || "",
        })
      }
    } catch (ex) {
      setImageUrlIntro("")
      setImageUrlIntroSecond("")
    }
  }, [lang]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files && event.target.files[0];
      if (inputRef.current) {
        if (!file) {
          inputRef.current.value = "";
          return;
        }

        if (ALLOW_IMAGE_FILE_TYPE.indexOf(file.type) === -1) {
          showWarning("warning.image_type");
          inputRef.current.value = "";
          return;
        }

        if (file.size > MAX_IMAGE_BANNER_SIZE) {
          showWarning("warning.image_size");
          inputRef.current.value = "";
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          setDisplayImage(reader.result);
        };
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append("file", file);
        const image = await UploadImage.uploadImage(formData);
        const jsonImage = JSON.parse(JSON.stringify(image));
        setImageUrlIntro(jsonImage.url);
      }
    } catch (ex) {
      showError("error.post_error");
    } finally {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleFileChangeSecond = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files && event.target.files[0];
      if (inputRefSecond.current) {
        if (!file) {
          inputRefSecond.current.value = "";
          return;
        }

        if (ALLOW_IMAGE_FILE_TYPE.indexOf(file.type) === -1) {
          showWarning("warning.image_type");
          inputRefSecond.current.value = "";
          return;
        }

        if (file.size > MAX_IMAGE_BANNER_SIZE) {
          showWarning("warning.image_size");
          inputRefSecond.current.value = "";
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          setDisplayImageSecond(reader.result);
        };
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append("file", file);
        const image = await UploadImage.uploadImage(formData);
        const jsonImage = JSON.parse(JSON.stringify(image));
        setImageUrlIntroSecond(jsonImage.url);
      }
    } catch (ex) {
      showError("error.post_error");
    } finally {
      if (inputRefSecond.current) {
        inputRefSecond.current.value = "";
      }
    }
  };


  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    touched, setValues
  } = useFormik({
    initialValues: (lang === 'ksl') ? {
      intro_title: intros[0].titleKr || "",
      intro_content: intros[0].content1_Kr || "",
      intro_second_title: intros[1].titleKr || "",
      intro_second_content_1: intros[1].content1_Kr || "",
      intro_second_content_2: intros[1].content2_Kr || "",
    } : {
      intro_title: intros[0].titleVn || "",
      intro_content: intros[0].content1_Vn || "",
      intro_second_title: intros[1].titleVn || "",
      intro_second_content_1: intros[1].content1_Vn || "",
      intro_second_content_2: intros[1].content2_Vn || "",
    },
    validationSchema: yup.object({
      intro_title: yup.string()
        .trim()
        .required("Vui lòng điền tiêu đề"),
      intro_content: yup.string()
        .trim()
        .required("Vui lòng điền nội dung"),
      intro_second_title: yup.string()
        .trim()
        .required("Vui lòng điền tiêu đề"),
      intro_second_content_1: yup.string()
        .trim()
        .required("Vui lòng điền nội dung"),
      intro_second_content_2: yup.string()
        .trim()
        .required("Vui lòng điền nội dung"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true)
        const dataSubmitIntro = (lang === 'ksl') ? {
          name: intros[0].name,
          titleVn: await TranslateService.translateToVietNam({ content: values.intro_title }),
          titleKr: values.intro_title,
          content1Vn: await TranslateService.translateToVietNam({ content: values.intro_content }),
          content1Kr: values.intro_content,
          content2Vn: "",
          content2Kr: "",
          images: [{ url: imageUrlIntro }]
        } : {
          name: intros[0].name,
          titleVn: values.intro_title,
          titleKr: await TranslateService.translateToKorea({ content: values.intro_title }),
          content1Vn: values.intro_content,
          content1Kr: await TranslateService.translateToKorea({ content: values.intro_content }),
          content2Vn: "",
          content2Kr: "",
          images: [{ url: imageUrlIntro }]
        };

        const dataSubmitIntroSecond = (lang === 'ksl') ? {
          name: intros[1].name,
          titleVn: await TranslateService.translateToVietNam({ content: values.intro_second_title }),
          titleKr: values.intro_second_title,
          content1Vn: await TranslateService.translateToVietNam({ content: values.intro_second_content_1 }),
          content1Kr: values.intro_second_content_1,
          content2Vn: await TranslateService.translateToVietNam({ content: values.intro_second_content_2 }),
          content2Kr: values.intro_second_content_2,
          images: [{ url: imageUrlIntroSecond }]
        } : {
          name: intros[1].name,
          titleVn: values.intro_second_title,
          titleKr: await TranslateService.translateToKorea({ content: values.intro_second_title }),
          content1Vn: values.intro_second_content_1,
          content1Kr: await TranslateService.translateToKorea({ content: values.intro_second_content_1 }),
          content2Vn: values.intro_second_content_2,
          content2Kr: await TranslateService.translateToKorea({ content: values.intro_second_content_2 }),
          images: [{ url: imageUrlIntroSecond }]
        };

        if (intro.id == 0) {
          const res: any = await IntroServices.post(dataSubmitIntro)
          const introInserted = {
            ...dataSubmitIntro,
            id: res.id
          }
          setIntro(introInserted)
        } else {
          await IntroServices.put(intro.id, dataSubmitIntro)
        }
        if (introSecond.id == 0) {
          const res: any = await IntroServices.post(dataSubmitIntroSecond)
          const introInserted = {
            ...dataSubmitIntroSecond,
            id: res.id
          }
          setIntroSecond(introInserted)
        } else {
          await IntroServices.put(introSecond.id, dataSubmitIntroSecond)
        }
        showSuccess("success.updated");
      } catch (ex) {
        console.log(ex)
        showError("error.update_error");
      } finally {
        setIsLoading(false)
      }
    }
  })

  return (
    <form onSubmit={handleSubmit} className="mb-20">
      <p className="text-xl font-bold">{t("text.title.about_us")} <span className="text-[#F45538]">*</span></p>
      <div className="mt-5">
        <div className="flex justify-start">
          <div
            className={`w-fit h-[190px] border-[2px] border-dashed rounded flex flex-row justify-center items-center px-5 cursor-pointer
          ` }
            onClick={onClick}
          >
            <AddImage />
            <p className="text-normal text-gray-300 pl-3">
              {t("text.image.title")} <span className="font-bold text-[#0073E5]">{t("text.image.title_here")}</span>
            </p>
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              multiple={false}
              accept={"image/jpeg, image/png"}
              onChange={handleFileChange}
            />

          </div>
          {
            displayImage &&
            <div className="w-fit h-[190px] border-[2px] border-dashed rounded flex flex-row justify-center items-center ml-10">
              <img src={displayImage} className="w-fit h-[190px] rounded p-2" />
            </div>
          }
        </div>
        <div className="flex flex-col gap-5 mt-5">
          <label className="text-lg font-bold ">
            {t("text.section.title")} <span className="text-[#F45538]">*</span>
          </label>
          <div>
            <input
              name="intro_title"
              className="w-full p-4 border-2 bg-inherit"
              onChange={handleChange}
              value={values.intro_title}
              maxLength={40}
            />
            {errors.intro_title && touched.intro_title && (
              <small className="text-[14px] leading-3 mt-1 text-[#F31A1A]">
                {errors.intro_title}
              </small>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <label className="text-lg font-bold  mt-2">
            {t("text.section.content")} <span className="text-[#F45538]">*</span>
          </label>
          <div>
            <textarea
              className="w-full p-4 border-2 bg-inherit h-[130px]"
              name="intro_content"
              onChange={handleChange}
              value={values.intro_content}
              maxLength={1000}
            />
            {errors.intro_content && touched.intro_content && (
              <small className="text-[14px] leading-3 mt-1 text-[#F31A1A]">
                {errors.intro_content}
              </small>
            )}
          </div>
        </div>
      </div>

      <p className="text-xl font-bold mt-10">MARKET MOA <span className="text-[#F45538]">*</span></p>
      <div className="mt-5">
        <div className="flex justify-start">
          <div
            className={`w-fit h-[190px] border-[2px] border-dashed rounded flex flex-row justify-center items-center px-5 cursor-pointer
          ` }
            onClick={onClickSecond}
          >
            <AddImage />
            <p className="text-normal text-gray-300 pl-3">
              {t("text.image.title")} <span className="font-bold text-[#0073E5]">{t("text.image.title_here")}</span>
            </p>
            <input
              ref={inputRefSecond}
              type="file"
              className="hidden"
              multiple={false}
              accept={"image/jpeg, image/png"}
              onChange={handleFileChangeSecond}
            />

          </div>
          {
            displayImageSecond &&
            <div className="w-fit h-[190px] border-[2px] border-dashed rounded flex flex-row justify-center items-center ml-10">
              <img src={displayImageSecond} className="w-fit h-[190px] rounded p-2" />
            </div>
          }
        </div>
        <div className="flex flex-col gap-5 mt-5">
          <label className="text-lg font-bold ">
            {t("text.section.title")} <span className="text-[#F45538]">*</span>
          </label>
          <div>
            <input
              name="intro_second_title"
              className="w-full p-4 border-2 bg-inherit"
              onChange={handleChange}
              value={values.intro_second_title}
              maxLength={40}
            />
            {errors.intro_second_title && touched.intro_second_title && (
              <small className="text-[14px] leading-3 mt-1 text-[#F31A1A]">
                {errors.intro_second_title}
              </small>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <label className="text-lg font-bold  mt-2">
            {t("text.section.content")} 1<span className="text-[#F45538]">*</span>
          </label>
          <div>
            <textarea
              className="w-full p-4 border-2 bg-inherit h-[130px]"
              name="intro_second_content_1"
              onChange={handleChange}
              value={values.intro_second_content_1}
              maxLength={1000}
            />
            {errors.intro_second_content_1 && touched.intro_second_content_1 && (
              <small className="text-[14px] leading-3 mt-1 text-[#F31A1A]">
                {errors.intro_second_content_1}
              </small>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <label className="text-lg font-bold  mt-2">
            {t("text.section.content")} 2<span className="text-[#F45538]">*</span>
          </label>
          <div>
            <textarea
              className="w-full p-4 border-2 bg-inherit h-[130px]"
              name="intro_second_content_2"
              onChange={handleChange}
              value={values.intro_second_content_2}
              maxLength={1000}
            />
            {errors.intro_second_content_2 && touched.intro_second_content_2 && (
              <small className="text-[14px] leading-3 mt-1 text-[#F31A1A]">
                {errors.intro_second_content_2}
              </small>
            )}
          </div>
        </div>
      </div>
      <div onClick={handleCancel} className="flex item-center justify-end mt-[20px] mb-[155px] gap-10px">
        {/* <button
          type="button"
          className="w-[8%] min-w-[40px] py-4 border border-main flex justify-center items-center  text-main  font-bold bg-white"

        >
          {t("text.button.cancel")}
        </button> */}
        <BtnLoading
          type="submit"
          className="w-[8%] min-w-[40px] py-4 border border-header flex justify-center items-center  text-white  font-bold bg-header"
          isLoading={isLoading}
          onClick={handleSubmit}
        >
          {t("text.button.save")}
        </BtnLoading>
      </div>

    </form>
  )
}