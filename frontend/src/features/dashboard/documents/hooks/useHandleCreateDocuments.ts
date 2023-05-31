import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useGetCategory } from "./useGetCategory";
import { ChangeEvent, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ICategoryChild, INews } from "@typeRules/news";
import { PopUpContext } from "@contexts/PopupContext";
import { useHandleImage } from "@features/dashboard/hooks/useHandleImage";
import { pathDocumentsHandle } from "@constants/contain";
import { newsService } from "@services/newsService";
import { useFormik } from "formik";
import * as Yub from "yup"
import { uploadService } from "@services/uploadService";
import { prefixRootRoute } from "@configs/index";
import { pathsAdmin } from "@constants/routerAdmin";
import { TranslateContext } from "@contexts/Translation";
import { convertContent } from "@commons/index";
import { translateService } from "@services/translate";

export interface IFileList {
  id?: number;
  type?: string;
  link?: string;
  name?: string;
  file? : File;
}

export const useHandleCreateDocuments = () => {
    const params = useParams();
    const [searchParam] = useSearchParams();
    const { categories } = useGetCategory(100);
    const [fileList , setFileList] = useState<IFileList[]>([])
    const [currentCategory, setCurrentCategory] = useState<ICategoryChild[]>([]);
    const { showSuccess, showError } = useContext(PopUpContext);
    const [currentDocuments, setCurrentDocuments] = useState<INews>();
    const navigation = useNavigate();
    const { preViewImage, handleChange, file, message, handleMessageFile } =
      useHandleImage(currentDocuments && currentDocuments?.files?.[0]?.link);
    const isAdd = useMemo(() => {
      return params?.type === pathDocumentsHandle.add;
    }, [params?.type]);
    
    useEffect(() => {
      if (!isAdd) {
        const id = searchParam.get("slug");
        newsService.getNewsById(Number(id)).then((data) => {
          setCurrentDocuments(data);
          formik.setFieldValue("title", data?.title);
          formik.setFieldValue("titleKo", data?.titleKo);
          formik.setFieldValue("description", data?.description);
          formik.setFieldValue("descriptionKo", data?.descriptionKo);
          formik.setFieldValue("content", data?.content);
          formik.setFieldValue("contentKo", data?.contentKo);
          formik.setFieldValue("idParent", data?.newsCategory?.id);
          setFileList(data.files!.slice(1));
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



          const formDataArray: IFileList[] = [];
          if (fileList.length > 0) {
            const uploadPromises = fileList
              .map((file) => {
                if (file.file) {
                  const formData = new FormData();
                  formData.append("files", file.file);
                  return uploadService.postFiles(formData);
                } else {
                  return file;
                }
              })
              .filter((promise) => promise !== undefined);

            await Promise.all(uploadPromises)
              .then((file) => {
                formDataArray.push(
                  ...file.map((fileData, index) => {
                    console.log("fileData" ,fileData);
                    
                    if (fileData.id) {
                      console.log("aaabbbb");
                      
                      return fileData;
                    }
                    return {
                      link: fileData[0],
                      type: fileList[index].type,
                      name: fileList[index].name,
                    };
                  })
                );
              })
              .catch((error) => {
                console.error(error);
              });
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
                  ...formDataArray,
                ],
              })
              .then(() => {
                showSuccess("message.success._success");
                navigation(
                  `${prefixRootRoute.admin}/${pathsAdmin.documents.prefix}`
                );
              })
              .catch(() => {
                showError("message.error._error");
              });
  
          }else {
            newsService
              .putNews({
                ...currentDocuments,
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
                    id: currentDocuments?.files?.[0]?.id,
                    link: image ? image : currentDocuments?.files?.[0]?.link,
                  },
                  ...formDataArray,
                ],
              })
              .then(() => {
                showSuccess("message.success._success");
                navigation(
                  `${prefixRootRoute.admin}/${pathsAdmin.documents.prefix}`
                );
              })
              .catch(() => {
                showError("message.error._error");
              });
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

    console.log({
      formik
    })

    const handleChangFile = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files![0];

      setFileList([
        ...fileList,
        { file: file, type: file.type, name: file.name },
      ]);
    };

    const handleDeleteFile = (index: number) => {
      let newFileList = [...fileList];
      newFileList.splice(index, 1);
      setFileList(newFileList);
    };

    return {
        handleBlur,
        handleChange,
        handleChangeCheckbox,
        handleChangFile,
        handleDeleteFile,
        handleChangeEdit,
        handleChangeEditor,
        handleMessageFile,
        handleTranslate,
        currentCategory,
        currentDocuments,
        preViewImage,
        message,
        isAdd,
        isVn,
        formik,
        categories,
        fileList,
        t
    }
}