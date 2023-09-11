import PlusLinerIcon from "@assets/iconElements/PlusLinerIcon";
import { AddImage, TrashCanIcon } from "@assets/icons";
import GroupButton from "@components/Buttons/GroupButton";
import LinearButton from "@components/Buttons/LinearButton";
import { useShowMessage } from "@components/Modal/DialogMessage";
import { InputComponent } from "@components/input/InputComponent";
import TitleInput from "@components/input/TitleInput";
import { ToastContex } from "@contexts/ToastContex";
import useI18n from "@hooks/useI18n";
import ProductServices from "@services/ProductServices";
import TranslateService from "@services/TranslateService";
import { CategoryType } from "@services/Types/category";
import { Atribuite, ListAtribuite, ProductDetails, ProductItem } from "@services/Types/product";
import UploadImage from "@services/UploadImage";
import categoryServices from "@services/categoryService";
import clsx from "clsx";
import Editor from "commons/Editor";
import { TextError } from "commons/TextError";
import DropdowBox from "commons/components/DropdowBox";
import { Product } from "commons/contannt";
import { useFormik } from "formik";
import {
  ChangeEvent,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import BoxChoseColor from "../../../components/AdminComponents/BoxChoseColor";
import SliderPreviewImages from "../../../components/AdminComponents/SliderPreviewImages";
import province_data from "../../../utility/province_date.json";
import ChoseCategory from "./ChoseCategory";
import AtributeItem from "./component/AtributeItem";
import { ModalContext } from "@contexts/contextModal";
import AddAtributeForm from "./component/AddAtributeForm";
import { ICDeleteTrashLight } from "@assets/iconElements/ICDeleteTrashLight";

interface Props { }
function ProductEditComponent(props: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { onAddToast } = useContext(ToastContex);
  const { setShowModal, closeModal, setContentModal } =
    useContext(ModalContext);
  const { showError, showSuccess, showWarning } = useShowMessage();
  const { isVn } = useI18n();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoryName, setCategoryName] = useState<string>("Chọn Phân loại");
  const [imageProducts, setImageProducts] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [listImageActived, setListImageActived] = useState<string[]>([]);
  const [videoFile, setFileVideo] = useState<File | null>(null);
  const [imgExchangFile, setImgExchangeFile] = useState<File | null>(null);
  const [isDisable, setDisable] = useState<boolean>(false);
  const [listProducts, setListProducts] = useState<ProductDetails[]>([]);
  const nameTable = [
    "Kho còn hàng",
    "Tên thuộc tính",
    "Giá bán",
    " Khuyến mại",
    "Tồn kho",
  ];
  const [applySale, setApplySale] = useState({
    countSale: "",
    salePrice: "",
  });


  const [applyList, setApplyList] = useState({
    promo: 0,
    stockQuantity: 0
  })

  const [listSize, setListSize] = useState<string[]>([]);

  const [formValue, setFormValue] = useState<Product>({
    sku: "",
    name: "",
    images: [],
    video: "",
    detail: "",
    policy: "",
    price: 0,
    cost: 0,
    imageCheck: "",
    seen: 0,
    sold: 0,
    remaining: 0,
    saleMin: 0,
    saleMax: 0,
    gender: ["male", "female"],
    category: {
      categoryId: null,
      categorySId: null,
      categoryName: "",
      parentId: null,
      parentSId: null,
    },
    trademark: {
      id: "",
      name: "",
      images: [],
      menuShow: true,
    },
    colors: [],
  });

  const [validForm, setValid] = useState<any>({ file: false, detail: false });

  const formik = useFormik<ProductItem>({
    initialValues: {
      productCode: "",
      productNameVn: "",
      productNameKr: "",
      categoryId: null,
      subCategoryId: 0,
      cost: 0,
      price: 0,
      promo: 0,
      stockQuantity: 0,
      salientFeaturesVn: "",
      salientFeaturesKr: "",
      detailVn: "",
      detailKr: "",
      specVn: "",
      specKr: "",
      featured: 0,
      createAt: null,
      warehouse: [],
      atributies: [
      ],
      productDetails: [
      ],
    },
    validationSchema: Yup.object({
      productCode: Yup.string().trim().required("Không được để trống"),
      productNameVn: Yup.string().trim().required("Không được để trống"),
      price: Yup.number().required("Không được để trống").min(1, "Quá nhỏ"),
      promo: Yup.number().required("Không được để trống").min(0, "Quá nhỏ"),
      salientFeaturesVn: Yup.string()
        .required("Không được để trống")
        .max(500, "Không quá 500 kí tự"),
      detailVn: Yup.string()
        .required("Không được để trống")
        .max(500, "Không quá 500 kí tự"),
      specVn: Yup.string()
        .required("Không được để trống")
        .max(500, "Không quá 500 kí tự"),
      categoryId: Yup.number().required("Phải chọn danh mục"),
      warehouse: Yup.array().min(1, "tối thiểu 1 địa điểm"),
    }),
    onSubmit: async () => {

    },
  });
  const {
    values,
    errors,
    touched,
    isSubmitting,
    setSubmitting,
    setFieldValue,
    setFieldError,
    setValues,
    handleChange
  } = formik;



  const handleChoseCategory = (id: number, subId?: number) => {
    setFieldValue("categoryId", id);
    setFieldValue("subCategoryId", subId);
    setFieldError("categoryId", undefined);
  };

  // modal thêm hoặc sửa thuộc tính
  const handleShowAtributeEdit = (data?: ListAtribuite, index?: number) => {
    setContentModal(
      <AddAtributeForm
        handleEdit={handleAddAtribute}
        attibute={data}
        indexEdit={index}
      />
    );
    setShowModal(true);
  };

  // thêm hoặc sửa thuộc tính
  const handleAddAtribute = (data: ListAtribuite, index: number) => {
    const attributeList = [...values.atributies!];
    let productDetails = [...values.productDetails];

    if (index > 0) {
      productDetails = productDetails.map((detail, index) => {
        if (detail.attributes.length > 0) {
          const listAtb = detail.attributes.map((subDetail, index) => {
            if (
              subDetail.attributeNameVn.includes(
                attributeList[index as number].attributeNameVn
              )
            ) {
              subDetail = {
                ...subDetail,
                attributeNameVn: data.attributeNameVn,
                attributeNameKr: data.attributeNameKr,
              };
            }
            return subDetail;
          });
          return { ...detail, attributes: listAtb };
        } else {
          detail.attributes.push({
            attributeNameVn: data.attributeNameVn,
            attributeNameKr: data.attributeNameKr,
            valueVn: "",
            valueKr: ""
          })
          return detail;
        }
      })

      attributeList[index as number] = data;
      setFieldValue("atributies", attributeList);
      setFieldValue("productDetails", productDetails);
      closeModal();
      return;
    }

    const checkName = attributeList.findIndex(
      (item) => item.attributeNameVn == data.attributeNameVn
    );
    if (checkName < 0) {
      attributeList.push(data);
      setFieldValue("atributies", attributeList);
      closeModal();
    } else {
      showError("tên giá trị đã tồn tại");
    }
  };

  const handleDeleteAtb = (index: number, indexSub: number = -1) => {
    const attributeList = [...values.atributies!];
    if (indexSub > -1) {
      attributeList[index].valueVn.splice(indexSub, 1);
      attributeList[index].valueKr.splice(indexSub, 1);
    } else {
      attributeList.splice(index, 1);
    }

    setFieldValue("attributes", attributeList)
    handleAddValueAtribute("", -1, attributeList, values.warehouse);
  };

  function generateAttr(attributeValues: any[][]): any[][] {
    const attributes: any[][] = [];

    function generateProductsRecursive(currentAttributes: any[], currentIdx: number) {
      if (currentIdx === attributeValues.length) {
        attributes.push([...currentAttributes]);
        return;
      }

      const values = attributeValues[currentIdx];
      for (const value of values) {
        currentAttributes.push(value);

        generateProductsRecursive(currentAttributes, currentIdx + 1);

        currentAttributes.pop();
      }
    }

    generateProductsRecursive([], 0);

    return attributes;
  }

  const convertToAttributes = async (item: any) => {
    const listAtt: Atribuite[] = [];
    let idx = 0;
    await Promise.all(item.map(async (i: any) => {
      const att: Atribuite = (isVn) ? {
        valueVn: i,
        valueKr: await TranslateService.translateToKorea({ content: i }),
        attributeNameVn: values.atributies![idx].attributeNameVn,
        attributeNameKr: values.atributies![idx].attributeNameKr
      } : {
        valueVn: await TranslateService.translateToVietNam({ content: i }),
        valueKr: i,
        attributeNameVn: values.atributies![idx].attributeNameVn,
        attributeNameKr: values.atributies![idx].attributeNameKr
      }
      listAtt.push(att)
      idx++;
    }))
    return listAtt
  }

  const handleAddValueAtribute = async (value: string, idx: number, attributes?: ListAtribuite[], warehouses?: any) => {
    const attributeList = attributes ? attributes : [...values.atributies!];
    if (value != "" && idx != -1) {
      const checkDupicate = attributeList[idx]
        ? isVn
          ? attributeList[idx].valueVn.includes(value)
          : attributeList[idx].valueKr.includes(value)
        : false;
      if (checkDupicate) {
        return showError("tên giá trị đã tồn tại");
      }

      const translated = isVn
        ? await TranslateService.tranSlateKr({ nameVn: value, nameKr: "" })
        : await TranslateService.tranSlateVn({ nameVn: "", nameKr: value });
      attributeList[idx].valueVn.push(translated.nameVn);
      attributeList[idx].valueKr.push(translated.nameKr);
    }

    const listOfValueVn = attributeList.map(item => item.valueVn);

    const listAttVn = generateAttr(listOfValueVn)


    const listProductDetails: ProductDetails[] = await Promise.all(listAttVn.map(async (it) => {
      return {
        priceDetail: values.price,
        promoDetail: values.promo,
        stockQuantity: 0,
        addressWarehouse: "",
        images: [],
        attributes: await convertToAttributes(it)
      };
    }))

    const listProductDetailsWareHouse: ProductDetails[] = [];

    const whs = warehouses ? warehouses : values.warehouse;

    whs.forEach((wh: any) => {
      const listPrds = listProductDetails.map((prd: any) => ({
        ...prd,
        addressWarehouse: wh.address
      }));
      listProductDetailsWareHouse.push(...listPrds);
    });

    setFieldValue("atributies", attributeList);
    setListProducts(listProductDetailsWareHouse);
  };


  const getCategory = async () => {
    try {
      const result = await categoryServices.getAllCategory();
      setCategories(result);
    } catch (error) { }
  };

  const handlechangeContentEditor = (content: any, filed: string) => {
    const data = JSON.stringify(content);
    setFieldValue(filed, data != '""' ? data : "");
  };

  const handleAddWarehowse = (province: string) => {
    const newListAddress = [...values.warehouse];
    const checkProvince = newListAddress.findIndex(
      (item) => item.address === province
    );
    if (checkProvince < 0) {
      newListAddress.push({ address: province });
    } else {
      newListAddress.splice(checkProvince, 1);
    }
    setFieldValue("warehouse", newListAddress);
    handleAddValueAtribute("", -1, values.atributies, newListAddress);
  };

  const checkProvinceActive = (province: string) => {
    const checkProvince = values.warehouse.findIndex(
      (item) => item.address === province
    );
    return checkProvince >= 0 ? true : false;
  };

  /* plust*/
  const handleChoseFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files!;
    if (
      imageProducts.length >= 9 ||
      files.length > 9 ||
      files.length + imagePreview.length > 9
    ) {
      onAddToast({ type: "warn", message: "Thêm tối đa 9 ảnh sản phẩm" });
      return;
    }
    if (id && files.length > 9 - imagePreview.length) {
      onAddToast({ type: "warn", message: "Thêm tối đa 9 ảnh sản phẩm" });
      return;
    }

    if (files) {
      let listFile: File[] = [];
      let listPrew: string[] = [];
      for (let i = 0; i < files.length; i++) {
        let urlImage = URL.createObjectURL(files[i]);
        listFile.push(files[i]);
        listPrew.push(urlImage);
      }
      setImageProducts((prevState) => {
        return [...prevState, ...listFile];
      });
      setImagePreview((prevState) => {
        return [...prevState, ...listPrew];
      });
      setValid({ ...validForm, file: false });
    }
    event.target.value = "";
  };

  const handleChoseVideo = (event: ChangeEvent<HTMLInputElement>) => {
    const fileVideo = event.target.files![0];
    if (!fileVideo.type.includes("mp4") || fileVideo.size > 31457280) {
      return;
    }
    setFileVideo(fileVideo);
    event.target.value = "";
  };

  // áp dụng giảm giá và số lượng cho toàn bộ
  const handleApplyPrice = () => {
    const listPrds = listProducts.map((item) => {
      return {
        ...item,
        promoDetail: applyList.promo,
        stockQuantity: applyList.stockQuantity
      }
    })
    console.log(listPrds)
    setListProducts(listPrds)
  };

  const removeProductDetail = (index: number) => {
    const prds = [...listProducts];
    prds.splice(index, 1);
    setListProducts(prds)
  }

  const handleEditPromoProductDetail = (index: number, value: number) => {
    if (value > 100) {
      value = 100
    }
    let prd = listProducts[index];
    prd = {
      ...prd,
      promoDetail: value
    }
    listProducts[index] = prd;
    const prds = [...listProducts]
    setListProducts(prds)
  }

  const handleEditStockQuantityProductDetail = (index: number, value: any) => {
    let prd = listProducts[index];
    prd = {
      ...prd,
      stockQuantity: value
    }
    listProducts[index] = prd;

    const prds = [...listProducts]

    setListProducts(prds)
  }

  // chọn ảnh tương ứng với màu
  const handleSetColorIntoImage = (
    item: string,
    index: number,
    isUnActive: boolean
  ) => {
    if (formValue.colors.length > 0) {
      let newColor = [...formValue.colors];
      if (isUnActive) {
        setListImageActived(
          [...listImageActived].filter((items) => {
            return items != item;
          })
        );
        newColor[index].image = "";
      } else {
        let newImageActived = [...listImageActived];
        if (listImageActived[index]) {
          newImageActived.splice(index, 1, item);
        } else {
          newImageActived.push(item);
        }
        setListImageActived([...newImageActived]);
        newColor[index].image = item;
      }
      setFormValue((prev) => {
        return {
          ...prev,
          colors: newColor,
        };
      });
    }
  };

  // xoa anh
  const handleDeleteImage = (pathImg: string, index: number) => {
    const isExist = formValue.images.includes(pathImg);
    if (isExist) {
      setFormValue({
        ...formValue,
        images: formValue.images.filter((item) => {
          return item != pathImg;
        }),
      });
      setImagePreview(
        imagePreview.filter((item) => {
          return item != pathImg;
        })
      );
    } else {
      const newListFiles = [...imageProducts];
      const indexDFile = index + 1 - formValue.images.length - 1;
      newListFiles.splice(indexDFile, 1);
      setImagePreview(
        imagePreview.filter((item) => {
          return item != pathImg;
        })
      );
      setImageProducts(newListFiles);
    }
  };
  const handleValidateColor = useCallback(() => {
    const lengths = formValue.colors.length > 0;
    const checkColorAndSize = formValue.colors.every((item, index) => {
      if (
        item.colorName &&
        item.colorCode &&
        // item.image &&
        item.sizes.length > 0
      ) {
        return true;
      } else {
        return false;
      }
    });
    if (lengths && checkColorAndSize) {
      return true;
    }
    return false;
  }, [formValue.colors]);

  const handleCheckValidate = () => {
    let checkImage;
    if (id) {
      checkImage = imageProducts.length > 0 || imagePreview.length > 0;
    } else {
      checkImage = imageProducts.length > 0;
    }
    const isCheckAll =
      checkImage &&
      formValue &&
      formValue.sku &&
      formValue.sku &&
      formValue.name &&
      formValue.detail &&
      formValue.price > 0 &&
      formValue.cost > 0 &&
      formValue.category.categorySId != null &&
      formValue.category.categoryName != "" &&
      formValue.trademark.id != "" &&
      handleValidateColor();
    if (isCheckAll) {
      return true;
    }
    return false;
  };
  const handleDeleteSize = (indexColor: number, indexSize: number) => {
    const name = formValue.colors[indexColor].sizes[indexSize].sizeName;
    const newColor = formValue.colors;
    newColor[indexColor].sizes.splice(indexSize, 1);

    const checkIView = newColor.some((item) => {
      return item.sizes.some((itemS) => {
        return itemS.sizeName == name;
      });
    });

    if (!checkIView) {
      setListSize(
        listSize.filter((item) => {
          return item != name;
        })
      );
    }
    setFormValue({
      ...formValue,
      colors: newColor,
    });
  };

  const handleReset = () => {
    setImageProducts([]);
    setImagePreview([]);
    setFormValue({
      sku: "",
      name: "",
      images: [],
      video: "",
      detail: "",
      policy: "",
      price: 0,
      cost: 0,
      imageCheck: "",
      seen: 0,
      sold: 0,
      remaining: 0,
      saleMin: 0,
      saleMax: 0,
      gender: ["male", "female"],
      category: {
        categoryId: null,
        categorySId: null,
        categoryName: "",
        parentId: null,
        parentSId: null,
      },
      trademark: {
        id: "",
        name: "",
        images: [],
        menuShow: true,
      },
      colors: [],
    });
    setListImageActived([]);
    setFileVideo(null);
    setImgExchangeFile(null);
    setListSize([]);
    setApplySale({
      countSale: "",
      salePrice: "",
    });
    setValid({ file: false, detail: false });
  };

  const handleSubmit = async () => {
    try {
      // const validate = handleCheckValidate();
      // setDisable(true);
      // if (validate) {
      //   let newValueForm = { ...formValue };
      //   newValueForm.gender = (
      //     newValueForm.gender!.length === 2 ? null : newValueForm.gender![0]
      //   ) as any;

      //   const formData = new FormData();
      //   const formExchangdata = new FormData();
      //   const formVideodata = new FormData();

      //   for (let i = 0; i < imageProducts.length; i++) {
      //     formData.append("file", imageProducts[i]);
      //   }

      //   formExchangdata.append("file", imgExchangFile!);
      //   formVideodata.append("file", videoFile!);

      //   const listImageproducts =
      //     imageProducts.length > 0
      //       ? await UploadImage.uploadImages(formData)
      //       : [];
      //   const videoUrl =
      //     videoFile && (await UploadImage.uploadVideo(formVideodata));

      //   const newImageCheck =
      //     imgExchangFile && (await UploadImage.uploadImages(formExchangdata));

      //   newValueForm.images = (
      //     id ? [...formValue.images, ...listImageproducts] : listImageproducts
      //   ) as any;
      //   newValueForm.colors.map((item, indexC) => {
      //     const index = imagePreview.findIndex((itemPre) => {
      //       return itemPre === item.image;
      //     });
      //     item.image = index > -1 ? newValueForm.images[index] : "";
      //   });

      //   newValueForm.video = videoUrl ? videoUrl : id ? formValue.video : "";
      //   newValueForm.imageCheck = newImageCheck
      //     ? newImageCheck[0]
      //     : id
      //       ? formValue.imageCheck
      //       : "";
      //   if (id) {
      //     const result = await ProductServices.putProducById(id, newValueForm);
      //     onAddToast({ type: "success", message: "Sửa sản phẩm thành công." });
      //     const listImage = result.images.map((item) => item);
      //     if (result.gender === null) {
      //       result.gender = ["male", "female"];
      //     } else {
      //       result.gender = [result.gender] as any;
      //     }
      //     setImagePreview(listImage);
      //     setFormValue(result);
      //   } else {
      //     const result = await ProductServices.addProduct(newValueForm);
      //     if (result) {
      //       handleReset();
      //       onAddToast({
      //         type: "success",
      //         message: "Thêm sản phẩm thành công.",
      //       });
      //     }
      //   }
      // } else {
      //   onAddToast({ type: "warn", message: "bạn chưa nhập đúng dữ liệu" });
      // }
      // setDisable(false);

      const formData = new FormData();
      const formVideodata = new FormData();

      for (let i = 0; i < imageProducts.length; i++) {
        formData.append("file", imageProducts[i]);
      }

      formVideodata.append("file", videoFile!);

      const listImageproducts =
        imageProducts.length > 0
          ? await UploadImage.uploadListImages(formData)
          : [];
      const videoUrl : any =
        videoFile && (await UploadImage.uploadVideos(formVideodata));

      const convertedAttributeFes = values.atributies && values.atributies.map((item) => {
        const attributeFeValues = item.valueKr.map((valueKr, index) => ({
          valueVn: item.valueVn[index],
          valueKr,
        }));

        return {
          attributeFeValues,
          attributeFeNameKr: item.attributeNameKr,
          attributeFeNameVn: item.attributeNameVn,
        };
      });

      const dataSubmit = {
        productCode: values.productCode,
        productNameVn: values.productNameVn,
        productNameKr: values.productNameKr,
        categoryId: values.categoryId,
        subCategoryId: values.subCategoryId,
        cost: 0,
        price: values.price,
        promo: values.promo,
        stockQuantity: values.stockQuantity,
        salientFeaturesVn: values.salientFeaturesVn,
        salientFeaturesKr: values.salientFeaturesKr,
        detailVn: values.detailVn,
        detailKr: values.detailKr,
        specVn: values.specVn,
        specKr: values.specKr,
        featured: 0,
        warehouse: values.warehouse,
        attributeFes: convertedAttributeFes,
        productDetails: listProducts,
        images: listImageproducts,
        videoUrl: videoUrl.url
      }

      await ProductServices.addProduct(dataSubmit)
      onAddToast({ type: "success", message: "Thêm sản phẩm thành công" });
      navigate("/admin/product")
    } catch (error) {
      onAddToast({ type: "error", message: "Có lỗi." });
      setDisable(false);
    }
  };

  useEffect(() => {
    imagePreview.forEach((item) => {
      URL.revokeObjectURL(item);
    });
    URL.revokeObjectURL(formValue.imageCheck);
    getCategory();
  }, []);

  const getProducbyId = async (id: string) => {
    const product = await ProductServices.getProductById(id);
    let newProduct = product;
    const newListActived = product.colors.map((item) => {
      return item.image;
    });
    if (product.gender === null) {
      newProduct.gender = ["male", "female"];
    } else {
      newProduct.gender = [product.gender] as any;
    }
    const detailModify = product.detail.replaceAll("<p>", " ");
    const newDetail = detailModify.replaceAll("</p>", "\n");
    setFormValue({
      ...product,
      detail: newDetail,
    });

    setImagePreview(product.images);
    setListImageActived(newListActived);
  };
  useEffect(() => {
    if (id) {
      getProducbyId(id);
    }
  }, [id]);
  useEffect(() => {
    const name = categories.find((item) => item.id == values.categoryId);
    if (name) {
      setCategoryName(isVn ? name.categoryNameVn! : name.categoryNameKr!);
    } else {
      setCategoryName("Chọn Phân loại sản phẩm");
    }
  }, [values.categoryId, categories]);

  return (
    <div className="pt-9 pb-10px flex-1">
      <h2 className="titlePage mb-5">Thông tin cơ bản</h2>
      <div className="flex gap-x-14 gap-y-5 flex-row flex-wrap mb-3">
        <div>
          <p className="text-small">
            Hình ảnh sản phẩm <span className="text-main">*</span>
          </p>
          <div className="flex gap-[10px] mt-3">
            {imagePreview.map((itemPreview, indexPreview) => {
              return (
                <div
                  key={indexPreview}
                  className="w-[100px] h-[100px] rounded-md bg-slate-400 relative"
                >
                  <img
                    src={itemPreview}
                    alt=""
                    className="w-full h-full rounded-md"
                  />
                  <div
                    onClick={() => {
                      handleDeleteImage(itemPreview, indexPreview);
                    }}
                    className="absolute top-2 cursor-pointer right-1 z-50"
                  >
                    <TrashCanIcon width={15} height={15} />
                  </div>
                </div>
              );
            })}
            <label
              className={
                "w-[100px] h-[100px] p-2 rounded-md border-[2px] border-dashed flex items-center flex-col justify-end cursor-pointer " +
                (validForm?.file && "border-main")
              }
            >
              <input
                type="file"
                multiple
                className="hidden"
                onChange={(event) => handleChoseFile(event)}
              />
              <AddImage width={36} />
              <p className="text-xs tracking-[.03] text-gray-300 text-center">
                Thêm hình ảnh ({id ? imagePreview.length : imageProducts.length}
                /9)
              </p>
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-3 ">
          <p className="text-small">Video sản phẩm</p>
          <div className="flex items-center gap-3 w-fit rounded-md  border-[2px] border-dashed h-[100px] px-3">
            <label className="w-[100px] px-2 flex items-center flex-col justify-center cursor-pointer">
              <input
                type="file"
                name="video"
                className="hidden"
                onChange={(event) => handleChoseVideo(event)}
              />
              <AddImage width={36} />
              <p className="text-xs tracking-[.03] text-gray-300 text-center">
                Thêm video ({formValue.video ? 1 : videoFile ? 1 : 0}/1)
              </p>
            </label>
            <p className="max-w-[200px] text-left font-normal text-small text-gray-300">
              Tải video dạng mp4 Độ dài từ 10s-60s Kích thước tối đa 30MB
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-[34px] gap-y-3">
        <div>
          <TitleInput isNormal={true} isRequired={true} name="Mã sản phẩm" />
          <InputComponent
            name="productCode"
            onChange={handleChange}
            className="!rounded-sm"
          />
          {errors.productCode && touched.productCode && (
            <TextError message={errors.productCode} />
          )}
        </div>
        <div>
          <TitleInput isNormal={true} isRequired={true} name="Tên sản phẩm" />
          <InputComponent
            name="productNameVn"
            onChange={handleChange}
            className="!rounded-sm"
          />
          {errors.productNameVn && touched.productNameVn && (
            <TextError message={errors.productNameVn} />
          )}
        </div>

        <div>
          <TitleInput
            isNormal={true}
            isRequired={false}
            name="Phân loại hàng hóa"
          />
          <DropdowBox nameBox={categoryName}>
            <div className="h-[200px] w-full overflow-y-auto">
              {categories.map((item, index) => {
                return (
                  <ChoseCategory
                    itemCategory={item}
                    key={index}
                    categoryCheck={{
                      id: values.categoryId,
                      idSub: values.subCategoryId,
                    }}
                    handleClick={handleChoseCategory}
                  />
                );
              })}
            </div>
          </DropdowBox>
          {errors.categoryId && touched.categoryId && (
            <TextError message={errors.categoryId} />
          )}
        </div>
        <div>
          <TitleInput isNormal={true} isRequired name="Kho còn hàng" />
          <DropdowBox
            nameBox={
              values.warehouse[0]
                ? values.warehouse[0].address + "..."
                : "Chọn kho còn hàng"
            }
          >
            <div className="h-[300px] w-full overflow-y-auto flex flex-wrap gap-2 p-5">
              {province_data.map((province, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => handleAddWarehowse(province.Name)}
                    className={clsx(
                      "p-2 w-fit text-text-main flex items-center rounded-sm",
                      {
                        "bg-aqua-aq03 text-main": checkProvinceActive(
                          province.Name
                        ),
                        "border border-neutra-neutra80": !checkProvinceActive(
                          province.Name
                        ),
                      }
                    )}
                  >
                    {province.Name}
                  </div>
                );
              })}
            </div>
          </DropdowBox>
          {errors.warehouse && touched.warehouse && (
            <TextError message={errors.warehouse.toString()} />
          )}
        </div>

        <div>

          <TitleInput isNormal={true} isRequired name="Giá bán" />
          <InputComponent
            name="price"
            type="number"
            onChange={handleChange}
            className="!rounded-sm"
          />
          {errors.price && touched.price && (
            <TextError message={errors.price} />
          )}
        </div>
        <div>
          <TitleInput isNormal={true} isRequired={false} name="Khuyến mại" />
          <InputComponent
            name="promo"
            type="number"
            onChange={handleChange}
            className="!rounded-sm"
          />
          {errors.promo && touched.promo && (
            <TextError message={errors.promo} />
          )}
        </div>
      </div>
      <div className="py-10 flex flex-col gap-7">
        <p className="text-title font-semibold text-main">Mô tả chi tiết</p>
        <div>
          <TitleInput isNormal={true} isRequired name="Đặc điểm nổi bật" />
          <Editor
            content={
              values.salientFeaturesVn
                ? JSON.parse(values.salientFeaturesVn)
                : ""
            }
            onChange={(data) =>
              handlechangeContentEditor(data, "salientFeaturesVn")
            }
          />
          {errors.salientFeaturesVn && touched.salientFeaturesVn && (
            <TextError message={errors.salientFeaturesVn} />
          )}
        </div>
        <div>
          <TitleInput isNormal={true} isRequired name="Thông tin sản phẩm" />
          <Editor
            content={values.detailVn ? JSON.parse(values.detailVn) : ""}
            onChange={(data) => handlechangeContentEditor(data, "detailVn")}
          />
          {errors.detailVn && touched.detailVn && (
            <TextError message={errors.detailVn} />
          )}
        </div>
        <div>
          <TitleInput
            isNormal={true}
            isRequired={false}
            name="Thông số kĩ thuật"
          />
          <Editor
            content={values.specVn ? JSON.parse(values.specVn) : ""}
            onChange={(data) => handlechangeContentEditor(data, "specVn")}
          />
          {errors.specVn && touched.specVn && (
            <TextError message={errors.specVn} />
          )}
        </div>
      </div>
      <div className="mb-10">
        <p className="text-title font-semibold text-main mb-5">Thuộc tính</p>
        {values.atributies &&
          values.atributies.map((item, index) => {
            return (
              <AtributeItem
                key={index}
                indexAtribute={index}
                handleAddValue={handleAddValueAtribute}
                atribute={item}
                handleDelete={handleDeleteAtb}
                handleEditAtb={() => {
                  handleShowAtributeEdit(item, index);
                }}
              />
            );
          })}
        <LinearButton
          text="button.add_product"
          iconLeft={<PlusLinerIcon />}
          className="w-[170px] h-10 !rounded !text-sm overflow-hidden"
          className_child="rounded !text-sm "
          onClick={() => handleShowAtributeEdit()}
        />
      </div>

      <div className="w-2/3">
        <p className="text-small font-semibold mb-5">
          Danh sách phân loại hàng
        </p>
        <div className="w-full flex gap-spc30 mb-10">
          <div className="border rounded-md h-10 pt-3 px-3 pb-2 flex items-center w-[70%] 2xl:w-[78%]">
            <input
              type="number"
              className="placeholder:text-gray-200 h-full p-2 text-small border-r border-gray-200 font-normal px-10px w-2/4"
              placeholder="Khuyến mãi"
              name="promo"
              onChange={(event) =>
                setApplyList({
                  ...applyList,
                  [event.target.name]: event.target.value,
                })
              }
            />
            <input
              type="number"
              min={0}
              className="placeholder:text-gray-200 h-full p-2 text-small font-normal px-10px w-2/4"
              placeholder="Tồn kho"
              name="stockQuantity"
              onChange={(event) =>
                setApplyList({
                  ...applyList,
                  [event.target.name]: event.target.value,
                })
              }
            />
          </div>
          <button
            className="btn-normal justify-center px-0 items-center w-[30%] 2xl:w-[22%] text-sm leading-18"
            onClick={handleApplyPrice}
          >
            Áp dụng cho tất cả
          </button>
        </div>

        {/* bảng chọn size và giá */}
        <div className="mb-4 overflow-y-auto h-[600px]">
          <table className="w-full border-collapse border border-neutra-neutra80">
            <thead>
              <tr className="">
                {nameTable.map((itemName, index) => {
                  return (
                    <th
                      key={index}
                      className={clsx(
                        "text-sm font-normal py-3 text-center min-w-[128px] border border-neutra-neutra80"
                      )}
                    >
                      {itemName}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody >
              {listProducts.map((items, index) => {
                return (
                  <Fragment key={index}>
                    <tr className="relative">
                      <td className="py-6 text-center text-sm font-semibold uppercase min-w-[170px] border border-neutra-neutra80">
                        {items.addressWarehouse}
                      </td>
                      <td className="py-6 text-center text-sm font-semibold uppercase min-w-[170px] border border-neutra-neutra80">
                        {items.attributes.map((atb) => (isVn ? atb.valueVn : atb.valueKr)).join(" - ")}
                      </td>
                      <td className="border border-neutra-neutra80">
                        <input
                          value={items.priceDetail}
                          name="sale"
                          type="number"
                          placeholder="--"
                          readOnly
                          className="text-sm text-center font-semibold px-6 placeholder:text-gray-200 w-full"
                        />
                      </td>
                      <td className="border border-neutra-neutra80 p-3">
                        <input
                          value={items.promoDetail}
                          name="sale"
                          type="number"
                          min={0}
                          max={100}
                          onChange={(e) => handleEditPromoProductDetail(index, Number(e.target.value))}
                          className="text-sm text-center font-semibold placeholder:text-gray-200 w-full"
                        />
                      </td>
                      <td className="border border-neutra-neutra80 p-3">
                        <input
                          name="total"
                          value={items.stockQuantity}
                          type="number"
                          min={0}
                          onChange={(e) => handleEditStockQuantityProductDetail(index, Number(e.target.value))}
                          className="text-small text-center font-semibold placeholder:text-gray-200 w-full"
                        />
                      </td>
                      <td className="border border-neutra-neutra80">
                        {items.attributes.length > 1 && (
                          <div className="p-5" onClick={() => removeProductDetail(index)}><ICDeleteTrashLight /></div>
                        )}
                      </td>
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* chọn màu */}
        <div className="mb-9">
          <TitleInput
            isNormal={true}
            isRequired={false}
            name="Chọn ảnh phân loại hàng"
          />
          {imagePreview.length > 0 && values.productDetails.length > 0 && (
            <div className="border border-gray-200 rounded-md">
              {values.productDetails.map((item, index) => {
                return (
                  <SliderPreviewImages
                    key={index}
                    classNavigate={"slideProduct" + index}
                    // codeColor={item.colorCode}
                    nameColor={item.attributes[0].attributeNameVn}
                    indexSlide={index}
                    lisImages={imagePreview}
                    listImageActived={listImageActived}
                    imageActived={item.images[0].url}
                    handleActiveImage={handleSetColorIntoImage}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* bảng đổi kích cỡ ảnh */}
        <div className="mb-5">
          <p className="text-small font-semibold mb-5">Bảng quy đổi kích cỡ</p>
          <div className="border-2 border-dashed rounded-md cursor-pointer ">
            <label className=" h-195px flex flex-col items-center justify-center">
              {formValue.imageCheck && formValue.imageCheck != "" ? (
                <img
                  src={formValue.imageCheck}
                  alt=""
                  className="max-w-full max-h-full border-dashed cursor-pointer rounded-md"
                />
              ) : (
                <>
                  <AddImage className="m-0" />
                  <p className="text-xs tracking-[.03] text-gray-300 text-center">
                    Tải ảnh lên
                  </p>
                </>
              )}

              <input
                id="fileSize"
                name=""
                type="file"
                className="hidden"
                onChange={(event) => {
                  setFormValue({
                    ...formValue,
                    imageCheck: URL.createObjectURL(event?.target.files![0]),
                  });
                  setImgExchangeFile(event?.target.files![0]);
                  event.target.value = "";
                }}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="flex item-center justify-end my-7">
        <GroupButton
          onSubmit={handleSubmit}
          onCancel={() => navigate("/admin/product")}
        />
      </div>
    </div>
  );
}

export default ProductEditComponent;
