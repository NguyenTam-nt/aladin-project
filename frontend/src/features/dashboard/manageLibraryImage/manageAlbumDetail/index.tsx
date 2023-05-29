import DialogConfirmDelete from "@components/DialogConfirmDelete";
import { ModalContext } from "@contexts/ModalContext";
import { TranslateContext } from "@contexts/Translation";
import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ICAdd } from "@assets/icons/ICAdd";
import { Button } from "@components/Button";
import { ICEditer } from "@assets/icons/ICEditer";
import type {  IGalleryImage } from "@typeRules/gallery";
import { Checkbox } from "@components/Checkbox";
import { galleryService } from "@services/gallery";
import { useSearchParams } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { Input } from "@components/Input";
import { TranslateToKorean } from "@features/dashboard/manageCadres/hooks/useTranslate";
import { uploadService } from "@services/uploadService";
import { PopUpContext } from "@contexts/PopupContext";
import { PAGE_SIZE } from "@constants/contain";
import Pagination from "@features/dashboard/components/Pagination";
import { Colors } from "@constants/color";

enum GalleryForm {
  name = "name",
  nameKo = "nameKo",
  file = "file",
}

interface FomikRefValue extends Record<string, any> {
  name: string;
  nameKo: string;
  file?: string;
}

const initialValue = {
  name: "",
  nameKo: "",
};

const ManageAlbumDetail = () => {
  const [currenPage, setCurrentPage] = useState(1);
  const formikRef = useRef<FormikProps<FomikRefValue> | null>(null);
  const { t, isVn } = useContext(TranslateContext);
  const [isChoose, setIsChoose] = useState<number[]>([]);
  const setElementModalDelete = useContext(ModalContext).setElementModal;
  const [data, setData] = useState<IGalleryImage>();
  const [totalPage, setTotalPage] = useState(0);
  const [searchParam] = useSearchParams();
  const { showSuccess, showError } = useContext(PopUpContext);
  const [editName, setEditName] = useState<boolean>(false);

  const chooseItem = (id: number) => {
    const newChoose = [...isChoose];

    if (!newChoose.includes(id)) {
      newChoose.push(id);
    } else {
      const indexToRemove = newChoose.indexOf(id);
      newChoose.splice(indexToRemove, 1);
    }
    setIsChoose(newChoose);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t("validate.required")),
  });

  const getImage = (page: number) => {
    galleryService
      .getAlbumbyId(searchParam.get("id") || "", {
        page: page,
        size: PAGE_SIZE,
      })
      .then((data) => {
        setData(data);
        formikRef.current?.setFieldValue(GalleryForm.name, data.name);
        formikRef.current?.setFieldValue(GalleryForm.nameKo, data.nameKo);
        setTotalPage(data.files.totalPages);
      });
  };

  const postName = async ({
    name,
    nameKo,
  }: {
    name: string;
    nameKo: string;
  }) => {
    const translateValue = await TranslateToKorean(
      { name: name, nameKo: nameKo },
      formikRef
    );
    if (data) {
      galleryService
        .updateAlbum(searchParam.get("id") || "", {
          ...data,
          name: name,
          ...translateValue,
          files: [...data?.files?.content],
        })
        .then(() => {
          showSuccess("message.success._success");
          getImage(0);
          setCurrentPage(1);
          setEditName(false);
        })
        .catch(() => {
          showError("message.error._error");
        });
    }
  };

  const updateImageList = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const formData = new FormData();
    formData.append("file", file);
    const urlImage = await uploadService.postImage(formData);
    if (data) {
      const files = [
        {
          type: "image",
          link: urlImage,
          name: "urlImage",
        },
        ...data?.files?.content,
      ];
      galleryService
        .updateAlbum(searchParam.get("id") || "", {
          ...data,
          files: files,
        })
        .then(() => {
          showSuccess("message.success._success");
          getImage(0);
          setCurrentPage(1);
        })
        .catch(() => {
          showError("message.error._error");
        });
    }
  };

  const onDeleteById = (id?: number) => {
    if (data) {
      const files = [...data?.files.content];
      const filteredFiles = files.filter(
        (item) => item.id && !isChoose.includes(item.id)
      );
      galleryService
        .updateAlbum(searchParam.get("id") || "", {
          ...data,
          files: filteredFiles,
        })
        .then(() => {
          showSuccess("message.success._success");
          getImage(0);
          setCurrentPage(1);
        })
        .catch(() => {
          showError("message.error._error");
        });
    }
  };

  const changePage = (page: number) => {
    setCurrentPage(page);
    getImage(page - 1);
  };
  const onChangeValueInput = (value: string, key: string) => {
    if (isVn) {
      formikRef.current?.setFieldValue(key, value);
      if (formikRef.current?.values[key + "Ko"]) {
        formikRef.current?.setFieldValue(key + "Ko", "");
      }
    } else {
      formikRef.current?.setFieldValue(key + "Ko", value);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    getImage(0);
  }, []);

  const handleShowModalDelete = (id?: number) => {
    setElementModalDelete(
      <DialogConfirmDelete
        message={
          id
            ? t("image.delete_image", {
                name: data?.files.content.filter((item) => item.id === id)?.[0]
                  ?.name,
              })
            : t("image.delete_image")
        }
        onClick={() => onDeleteById(id)}
      />
    );
  };

  return (
    <div className="px-[24px]">
      <Formik
        innerRef={formikRef}
        initialValues={initialValue}
        onSubmit={(value) =>
          postName({ name: value.name, nameKo: value.nameKo })
        }
        validationSchema={validationSchema}
      >
        <Form>
          {editName ? (
            <div className="w-full items-center">
              <div className="flex flex-row justify-center">
                <div className="w-full  ">
                  <Field
                    name={isVn ? GalleryForm.name : GalleryForm.nameKo}
                    onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                      onChangeValueInput(value.target.value, GalleryForm.name);
                    }}
                    placeholder="image._form_create._name._placeholder"
                    className="h-[44px] w-[90%]"
                    as={Input}
                  />
                </div>
                <Button
                  type="submit"
                  onClick={() => {}}
                  text={"button._save"}
                  color="primary"
                  className="!w-[120px]"
                />
              </div>
              <ErrorMessage
                name={isVn ? GalleryForm.name : GalleryForm.nameKo}
                component="div"
                className="text-red-500"
              />
            </div>
          ) : (
            <div className="flex items-center ">
              <span className="text-_40  font-bold mr-[27px] uppercase ">
                [{isVn ? data?.name : data?.nameKo}]
              </span>
              <button
                type="button"
                onClick={() => {
                  setEditName(true);
                }}
              >
                <ICEditer></ICEditer>
              </button>
            </div>
          )}
        </Form>
      </Formik>
      <div className="flex flex-space items-center justify-between mt-[42px]">
        <p className="text-_24 text-text_primary ">{t("image.title_list")}</p>
        <Button
          onClick={() => handleShowModalDelete()}
          type="button"
          text="button._delete"
          color="primary"
          className="!w-[120px] border  text-text_white bg-text_C53434"
        />
      </div>
      <div className="grid grid-cols-4 gap-[24px] mt-[40px]">
        <button className="hidden" type="button">
          <Checkbox id="album_check" onChange={() => {}} />
        </button>
        <label htmlFor={"library_image"}>
          <div className="flex h-[312px] w-full items-center justify-center  bg-bg_F5F7F9">
            <ICAdd></ICAdd>
            <input
              type="file"
              accept="image/*"
              id="library_image"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                updateImageList(e);
              }}
              className="hidden"
            />
          </div>
        </label>
        {data?.files?.content?.map((item, index) => {
          const active = item.id && isChoose.includes(item.id);
          return (
            <div key={`${item.id}-${index}`}>
              <div className="relative w-full">
                <button
                  type="button"
                  onClick={() => {
                    item.id && chooseItem(item.id);
                  }}
                  className="absolute h-[40px] w-[40px]  z-10 top-[10px] left-[20px] rounded-[20px]  border-[4px]"
                  style={{
                    backgroundColor: active ? Colors.secondary : "transparent",
                  }}
                ></button>
                <img
                  className="h-[312px] w-[312px]  items-center justify-center object-cover"
                  src={
                    item.link
                      ? item.link
                      : "https://liftlearning.com/wp-content/uploads/2020/09/default-image.png"
                  }
                ></img>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-[120px] flex justify-end">
        <Pagination
          currenPage={currenPage}
          setCurrentPage={changePage}
          total={totalPage}
        />
      </div>
    </div>
  );
};

export default ManageAlbumDetail;
