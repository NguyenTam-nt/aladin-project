import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useGetCategory } from "./useGetCategory";
import { ChangeEvent, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ICategoryChild, INews } from "@typeRules/news";
import { PopUpContext } from "@contexts/PopupContext";
import { useHandleImage } from "@features/dashboard/hooks/useHandleImage";
import { pathNewsHandle } from "@constants/contain";
import { newsService } from "@services/newsService";
import { useFormik } from "formik";
import * as Yub from "yup"
import { uploadService } from "@services/uploadService";
import { prefixRootRoute } from "@configs/index";
import { pathsAdmin } from "@constants/routerAdmin";
import { TranslateContext } from "@contexts/Translation";
import { convertContent } from "@commons/index";
import { translateService } from "@services/translate";

export const useHandleCreateNews = () => {
    const params = useParams();
    const [searchParam] = useSearchParams();
    const { categories } = useGetCategory(100);
    const [currentCategory, setCurrentCategory] = useState<ICategoryChild[]>([]);
    const { showSuccess, showError } = useContext(PopUpContext);
    const [currentNews, setCurrentNews] = useState<INews>();
    const navigation = useNavigate();
    const { preViewImage, handleChange, file, message, handleMessageFile } =
      useHandleImage(currentNews && currentNews?.files?.[0]?.link);
    const isAdd = useMemo(() => {
      return params?.type === pathNewsHandle.add;
    }, [params?.type]);

    useEffect(() => {
      if (!isAdd) {
        const id = searchParam.get("slug");
        newsService.getNewsById(Number(id)).then((data) => {
          setCurrentNews(data);
          formik.setFieldValue("title", data?.title);
          formik.setFieldValue("titleKo", data?.titleKo);
          formik.setFieldValue("description", data?.description);
          formik.setFieldValue("descriptionKo", data?.descriptionKo);
          formik.setFieldValue("content", data?.content);
          formik.setFieldValue("contentKo", data?.contentKo);
          formik.setFieldValue("idParent", data?.newsCategory?.id);
        });
      }
    }, [isAdd]);
  
    const formik = useFormik({
      initialValues: {
        title: "",
        titleKo: "",
        description: "",
        descriptionKo: "",
        content: "",
        contentKo: "",
        idParent: "",
        idChild: "",
      },
      validationSchema: Yub.object({
        title: Yub.string().required("message.warn._required"),
        titleKo: Yub.string().required("message.warn._required"),
        description: Yub.string().required("message.warn._required"),
        descriptionKo: Yub.string().required("message.warn._required"),
        content: Yub.string().required("message.warn._required"),
        contentKo: Yub.string().required("message.warn._required"),
        idParent: Yub.string().required("message.warn._required"),
      }),
      onSubmit: async (value) => {
        if (!file && isAdd) {
          handleMessageFile();
          return;
        }
        try {
          const formData = new FormData();
          let image = ""
          if(file) {
            formData.append("file", file);
             image = await uploadService.postImage(formData);
          }
          if(isAdd) {
            newsService
              .postNews({
                title: value.title,
                titleKo: value.titleKo,
                description: value.description,
                descriptionKo: value.descriptionKo,
                content: value.content,
                contentKo: value.contentKo,
                newsCategory: {
                  id: value.idChild
                    ? Number(value.idChild)
                    : Number(value.idParent),
                },
                files: [
                  {
                    link: image,
                  },
                ],
              })
              .then(() => {
                showSuccess("message.success._success");
                navigation(`${prefixRootRoute.admin}/${pathsAdmin.news.prefix}`);
              })
              .catch(() => {
                showError("message.error._error");
              });
  
          }else {
            newsService.putNews({
              ...currentNews,
              title: value.title,
              titleKo: value.titleKo,
              description: value.description,
              descriptionKo: value.descriptionKo,
              content: value.content,
              contentKo: value.contentKo,
              newsCategory: {
                id: value.idChild
                  ? Number(value.idChild)
                  : Number(value.idParent),
              },
              files: [
                {
                  id: currentNews?.files?.[0]?.id,
                  link: image ? image : currentNews?.files?.[0]?.link,
                },
              ],
            }).then(() => {
              showSuccess("message.success._success");
              navigation(`${prefixRootRoute.admin}/${pathsAdmin.news.prefix}`)
            }).catch(() => {
              showError("message.error._error");
            })
          }
        } catch (error) {}
      },
    });
    
    const { t, isVn } = useContext(TranslateContext);
    // const [currentContent, setCurrenContent] = useState("")
  
    const handleChangeCheckbox = (event: ChangeEvent<HTMLSelectElement>) => {
      const id = event.target.value;
      const newCaregory = categories.find((item) => item.id === Number(id));
      setCurrentCategory(newCaregory?.children ?? []);
      formik.handleChange(event);
    };
  
    const handleChangeEdit = useCallback((_: string) => {
      // setCurrenContent(content)
    }, []);
  
    const handleTranslate = useCallback(
      async (name: string, value: string) => {
        if (isVn && value) {
          try {
            const newContent = convertContent(value);
            const content = await translateService.post(newContent);
            formik.setFieldValue(`${name}Ko`, content);
            // if(name === 'content') {
            //   setCurrenContent(content)
            // }
          } catch (error) {}
        }
      },
      [isVn]
    );
  
    const handleBlur = async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      handleTranslate(name, value);
      formik.handleBlur(event);
    };

    const handleChangeEditor = useCallback(
      (content: string) => {
        if (isVn) {
          formik.setFieldValue("content", content);
          handleTranslate("content", content);
        } else {
          formik.setFieldValue("contentKo", content);
        }
      },
      [handleTranslate, isVn]
    );
  

    return {
        handleBlur,
        handleChange,
        handleChangeCheckbox,
        handleChangeEdit,
        handleChangeEditor,
        handleMessageFile,
        handleTranslate,
        currentCategory,
        currentNews,
        preViewImage,
        message,
        isAdd,
        isVn,
        formik,
        categories,
        t
    }
}