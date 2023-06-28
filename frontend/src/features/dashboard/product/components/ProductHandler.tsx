import TitleInput from "@components/TitleInput";
import { Input } from "@features/dashboard/components/Input";
import { TitleTopic } from "@features/dashboard/home/components/TitleTopic";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ProductHandlerImages } from "./ProductHandlerImages";
import { ProductHandlerVideo } from "./ProductHandlerVideo";
import { formatNumberDot } from "@commons/formatMoney";
import { ICArowDown } from "@assets/icons/ICArowDown";
import { Colors } from "@constants/color";
import { ProductHandlerCategory } from "./ProductHandlerCategory";
import { ProductHandlerPlace } from "./ProductHandlerPlace";
import { Textarea } from "@features/dashboard/components/Textarea";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import { useFormik } from "formik";
import { useHandleMultiImage } from "../useHandleMultiImage";
import { useHandleImage } from "@features/dashboard/home/useHandleImage";
import * as Yup from "yup";
import { TextError } from "@features/dashboard/components/TextError";
import { productService } from "@services/product";
import {
  IListInfrastructure,
  IListMedia,
  IProduct,
  MediaType,
} from "@typeRules/product";
import { useNavigate, useParams } from "react-router-dom";
import { useGetDetailProduct } from "./useGetDetailProduct";
import { useHandleLoading } from "@features/dashboard/components/Loading";
import { uploadService } from "@services/upload";
import { useShowMessage } from "@features/dashboard/components/DiglogMessage";

export const ProductHandler = () => {
  //   const [value, setValue] = useState("");
  //   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //     setValue(event.currentTarget.value.replaceAll(".", ""));
  //   };

  const params = useParams();
  const isAdd = useMemo(() => {
    return !params.id;
  }, []);
  const { product, loading } = useGetDetailProduct(Number(params?.id));
  const { showLoading } = useHandleLoading();
  const { showSuccess, showError } = useShowMessage();
  const navigation = useNavigate();

  const fomick = useFormik<IProduct>({
    initialValues: {
      code: "",
      name: "",
      price: "",
      pricePromotion: "",
      description: "",
      category: undefined,
      listInfrastructure: [],
    },
    validationSchema: Yup.object({
      code: Yup.string().trim().required("message.form.required"),
      name: Yup.string().trim().required("message.form.required"),
      price: Yup.number().moreThan(0, "Vui lòng nhập số lớn hơn 0").typeError("Vui lòng nhập số.")
        .required("message.form.required"),
      pricePromotion: Yup.number().typeError("Vui lòng nhập số.").moreThan(0, "Vui lòng nhập số lớn hơn 0")
        .required("message.form.required").max(Yup.ref("price"), "Giá khuyến mãi phải nhỏ hơn hoặc bằng giá gốc."),
      description: Yup.string().trim().required("message.form.required"),
      category: Yup.object().required("message.form.required"),
      listInfrastructure: Yup.array<IListMedia>().required(
        "message.form.required"
      ),
    }),
    onSubmit: async (values) => {
      try {
        if (!listImage.preViewImage.length) {
          if (!listImage.preViewImage.length) {
            listImage.handleMessageFile();
          }
          // if (!listImage.preViewImage) {
          //   listImage.handleMessageFile();
          // }
          return;
        }
        showLoading();
        let images: IListMedia[] = imagesState.current;
        let videos: IListMedia[] = [];

        if (listImage.file?.length) {
          const formData = new FormData();

          listImage.file.forEach((file) => {
            formData.append("file", file.file);
          });

          const imagesMedia = await uploadService.postImage(formData);

          images = [
            ...images,
            ...imagesMedia.list.map((item) => {
              return {
                id: null,
                linkMedia: item?.linkMedia || "",
                type: MediaType.image,
              };
            }),
          ];
        }
        if (videoFile.file) {
          const formData = new FormData();
          formData.append("file", videoFile.file);
          const videoMedia = await uploadService.postVideo(formData);
          videos.push({
            linkMedia: videoMedia?.linkMedia || "",
            type: MediaType.video,
            id: null,
          });
        }

        // const list = video ?
        if (!isAdd && videoState.current) {
          videos.push(videoState.current);
        }

        const finalData: IProduct = {
          id: isAdd ? null : product?.id || null,
          ...values,
          listMedia: [...videos, ...images]
        };

        if (isAdd) {
          productService
            .post(finalData)
            .then(() => {
              showSuccess("Thêm sản phẩm thành công.");
              navigation(-1);
            })
            .catch(() => {
              showError("Thêm sản phẩm thất bại.");
            });
        } else {
          productService
            .update(finalData)
            .then(() => {
              showSuccess("Thêm sản phẩm thành công.");
              navigation(-1);
            })
            .catch(() => {
              showError("Thêm sản phẩm thất bại.");
            });
        }
      } catch (error) {}
    },
  });

  useEffect(() => {
    if (!isAdd) {
      fomick.setFieldValue("code", product?.code || "");
      fomick.setFieldValue("name", product?.name || "");
      fomick.setFieldValue("price", product?.price || "");
      fomick.setFieldValue("description", product?.description || "");
      fomick.setFieldValue("pricePromotion", product?.pricePromotion || "");
      fomick.setFieldValue("category", product?.category);
      fomick.setFieldValue("listInfrastructure", product?.listInfrastructure);
      listImage.setPreViewImage(
        product?.listMedia
          ?.filter((i) => i.type === MediaType.image)
          .map((i) => ({ id: i?.id + "", previewImage: i?.linkMedia || "" })) || []
      );
      imagesState.current =
        product?.listMedia?.filter((i) => i.type === MediaType.image) || [];
      videoState.current = product?.listMedia?.filter(
        (i) => i.type === MediaType.video
      )?.[0];
    }
  }, [isAdd, product]);

  const imagesState = useRef(
    product?.listMedia?.filter((i) => i.type === MediaType.image) || []
  );
  const videoState = useRef(
    product?.listMedia?.filter((i) => i.type === MediaType.video)?.[0]
  );




  const handleDeleteImage = useCallback(
    (id: number | string) => {
      if (!isAdd) {
        const index = imagesState.current.findIndex(i => i.id == id)
        if(index !== -1) {
          imagesState.current.splice(index, 1);
        }
      }
    },
    [imagesState, isAdd]
  );

  const handleDeleteVideo = useCallback(
    () => {
      if (!isAdd) {
        videoState.current = undefined
      }
    },
    [imagesState, isAdd]
  );

  const listImage = useHandleMultiImage(
    product?.listMedia
      ?.filter((i) => i.type === MediaType.image)
      .map((i) => ({ id: i?.id + "", previewImage: i?.linkMedia || "" })) || [],
    undefined,
    handleDeleteImage
  );

  const videoFile = useHandleImage(
    product?.listMedia?.filter((i) => i.type === MediaType.video)?.[0]?.linkMedia,
    undefined,
    handleDeleteVideo
  );

  const hanleChangeData = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.currentTarget;
      fomick.setFieldValue(name, value.replaceAll(".", ""));
    },
    []
  );

  const handleBluerCode = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget;
      if(product && product.code === value.trim()) return 
      productService.checkCode(value).catch((error) => {
        const status = error?.response?.data?.status;
        if (status === 400) {
          fomick.setFieldError("code", "Mã món ăn đã tồn tại.");
        }
      });
      fomick.handleBlur(event);
    },
    [product]
  );

  const handleChangeCategory = useCallback(
    (data: { id: number; idParent: number }) => {
      fomick.setFieldValue("category", data);
    },
    []
  );

  const handleChangePlace = useCallback((data: IListInfrastructure[]) => {
    fomick.setFieldValue("listInfrastructure", data);
  }, []);

  return (
    <div>
      <TitleTopic isRequired={false} name={isAdd ? "adminProduct.form.title_add"  :"adminProduct.form.title_edit" }/>
      <div className="grid grid-cols-2 gap-[24px]">
        <div className=" col-span-1">
          <TitleInput name="adminProduct.form.code" />
          <Input
            name="code"
            value={fomick.values.code}
            onChange={fomick.handleChange}
            onBlur={handleBluerCode}
            placeholder="adminProduct.form.code_placeholder"
            maxLength={255}
          />
          {fomick.errors.code && fomick.touched.code && (
            <TextError message={fomick.errors.code} />
          )}
        </div>
        <div className=" col-span-1">
          <TitleInput name="adminProduct.form.name" />
          <Input
            name="name"
            value={fomick.values.name}
            onChange={fomick.handleChange}
            onBlur={fomick.handleBlur}
            placeholder="adminProduct.form.name_placeholder"
            maxLength={255}
          />
          {fomick.errors.name && fomick.touched.name && (
            <TextError message={fomick.errors.name} />
          )}
        </div>
        <ProductHandlerImages listImage={listImage} />
        <ProductHandlerVideo videoFile={videoFile} />
        <div className=" col-span-1">
          <TitleInput name="adminProduct.form.cost" />
          <Input
            name="price"
            value={formatNumberDot(fomick.values.price)}
            onChange={hanleChangeData}
            onBlur={fomick.handleBlur}
            placeholder="adminProduct.form.cost_placeholder"
          />
          {fomick.errors.price && fomick.touched.price && (
            <TextError message={fomick.errors.price} />
          )}
        </div>
        <div className=" col-span-1">
          <TitleInput name="adminProduct.form.discount" />
          <Input
            name="pricePromotion"
            value={formatNumberDot(fomick.values.pricePromotion)}
            onChange={hanleChangeData}
            onBlur={fomick.handleBlur}
            placeholder="adminProduct.form.discount_placeholder"
          />
          {fomick.errors.pricePromotion && fomick.touched.pricePromotion && (
            <TextError message={fomick.errors.pricePromotion} />
          )}
        </div>
        <ProductHandlerCategory
          category={product?.category}
          onChange={handleChangeCategory}
        />
        <ProductHandlerPlace
          listValue={product?.listInfrastructure}
          onChange={handleChangePlace}
        />
        <div className=" col-span-2">
          <TitleInput name="adminProduct.form.info" />
          <Textarea
            name="description"
            value={fomick.values.description}
            onChange={fomick.handleChange}
            onBlur={fomick.handleBlur}
            maxLength={2000}
            placeholder="adminProduct.form.info_placeholder"
          />
          {fomick.errors.description && fomick.touched.description && (
            <TextError message={fomick.errors.description} />
          )}
        </div>
        <div className="col-span-2 flex justify-end">
          <GroupButtonAdmin isAdd={isAdd} onSubmit={fomick.handleSubmit} />
        </div>
      </div>
    </div>
  );
};
