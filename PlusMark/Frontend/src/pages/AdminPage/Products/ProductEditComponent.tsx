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
  const [imagesUpdate, setImagesUpdate] = useState<string[]>([]);
  const [listImageActived, setListImageActived] = useState<string[]>([]);
  const [videoFile, setFileVideo] = useState<File | null>(null);
  const [listProducts, setListProducts] = useState<ProductDetails[]>([]);
  const [videoUrl, setVideoUrl] = useState<string>();
  const nameTable = [
    "Kho còn hàng",
    "Tên thuộc tính",
    "Giá bán",
    " Khuyến mại",
    "Tồn kho",
  ];


  const [applyList, setApplyList] = useState({
    promo: 0,
    stockQuantity: 0
  })

  const [formValue, setFormValue] = useState<any>({
    images: [],
    video: ""
  });

  const [validForm, setValid] = useState<any>({ file: false, detail: false });

  const formik = useFormik<ProductItem>({
    initialValues: {
      productCode: '',
      productNameVn: '',
      productNameKr: '',
      categoryId: null,
      subCategoryId: 0,
      cost: 0,
      price: 0,
      promo: 0,
      stockQuantity: 0,
      salientFeaturesVn: '',
      salientFeaturesKr: '',
      detailVn: '',
      detailKr: '',
      specVn: '',
      specKr: '',
      featured: 0,
      createAt: null,
      warehouse: [],
      atributies: [
      ],
      productDetails: [
      ],
    },
    validationSchema: Yup.object({
      productCode: Yup.string().trim().required(isVn ? "Không được để trống" : "비워둘 수 없습니다."),
      productNameVn: Yup.string().trim().required("Không được để trống"),
      productNameKr: Yup.string().trim().required("비워둘 수 없습니다."),
      price: Yup.number().required(isVn ? "Không được để trống" : "비워둘 수 없습니다.").min(1, isVn ? "Quá nhỏ" : "너무 작은"),
      promo: Yup.number().required(isVn ? "Không được để trống" : "비워둘 수 없습니다.").min(0, isVn ? "Quá nhỏ" : "너무 작은"),
      salientFeaturesVn: Yup.string()
        .required("비워둘 수 없습니다."),
      salientFeaturesKr: Yup.string()
        .required("Không được để trống")
        .max(500, "Không quá 500 kí tự"),
      detailVn: Yup.string()
        .required("Không được để trống")
        .max(3000, "Không quá 3000 kí tự"),
      detailKr: Yup.string()
        .required("비워둘 수 없습니다.")
        .max(3000, "3000자 이내"),
      specVn: Yup.string()
        .required("Không được để trống")
        .max(3000, "Không quá 3000 kí tự"),
      specKr: Yup.string()
        .required("비워둘 수 없습니다.")
        .max(3000, "3000자 이내"),
      categoryId: Yup.number().required(isVn ? "Phải chọn danh mục" : "카테고리를 선택해야 합니다."),
      warehouse: Yup.array().min(1, isVn ? "Tối thiểu 1 địa điểm" : "최소 1개 위치"),
    }),
    onSubmit: async (values) => {

    },
  });
  const {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldError,
    setValues,
    handleChange,
    handleSubmit,
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

  const generateAttr = (attributeValues: any[][]): any[][] => {
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
        soldQuantity: 0,
        imageDetailUrl: "",
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
    try {
      console.log(JSON.stringify(content))
      setFieldValue(filed, JSON.stringify(content));
    } catch (error) {

    }
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

  const handleEditPriceProductDetail = (index: number, value: number) => {
    let prd = listProducts[index];
    prd = {
      ...prd,
      priceDetail: value
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
    if (listProducts.length > 0) {
      let productDetails = [...listProducts];
      if (isUnActive) {
        setListImageActived(
          [...listImageActived].filter((items) => {
            return items != item;
          })
        );
        productDetails[index].imageDetailUrl = "";
        productDetails[index].images = []
      } else {
        let newImageActived = [...listImageActived];
        if (listImageActived[index]) {
          newImageActived.splice(index, 1, item);
        } else {
          newImageActived.push(item);
        }
        setListImageActived([...newImageActived]);
        productDetails[index].imageDetailUrl = item;
        productDetails[index].images = [{url: item}]
      }
      setListProducts(productDetails)
    }
  };

  const handleDeleteImage = (pathImg: string, index: number) => {
    const isExist = formValue.images.includes(pathImg);
    if (isExist) {
      setFormValue({
        ...formValue,
        images: formValue.images.filter((item: any) => {
          return item != pathImg;
        }),
      });
      setImagePreview(
        imagePreview.filter((item) => {
          return item != pathImg;
        })
      );
      setImagesUpdate(
        imagesUpdate.filter((item) => {
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
      setImagesUpdate(
        imagesUpdate.filter((item) => {
          return item != pathImg;
        })
      );
      setImageProducts(newListFiles);
    }
  };


  const handleSubmitForm = async () => {
    try {
      const formData = new FormData();
      const formVideodata = new FormData();

      for (let i = 0; i < imageProducts.length; i++) {
        formData.append("file", imageProducts[i]);
      }

      formVideodata.append("file", videoFile!);

      const listImageproducts = imageProducts.length > 0
        ? await UploadImage.uploadListImages(formData)
        : [];

      if (id) {
        imagesUpdate.map((img) => {
          listImageproducts.push({ url: img })
        })
      }

      const video: any =
        videoFile && (await UploadImage.uploadVideos(formVideodata));


      const videoLink = id ? (videoUrl == "" ? video?.url : videoUrl) : video?.url;


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

      const dataSubmit = isVn ? {
        productCode: values.productCode,
        productNameVn: values.productNameVn,
        productNameKr: await TranslateService.translateToKorea({ content: values.productNameVn }),
        categoryId: values.categoryId,
        subCategoryId: values.subCategoryId,
        cost: 0,
        price: values.price,
        promo: values.promo,
        stockQuantity: values.stockQuantity,
        salientFeaturesVn: values.salientFeaturesVn,
        salientFeaturesKr: await TranslateService.translateToKorea({ content: values.salientFeaturesVn }),
        detailVn: values.detailVn,
        detailKr: await TranslateService.translateToKorea({ content: values.detailVn }),
        specVn: values.specVn,
        specKr: await TranslateService.translateToKorea({ content: values.specVn }),
        featured: 0,
        warehouse: values.warehouse,
        attributeFes: convertedAttributeFes,
        productDetails: listProducts,
        images: listImageproducts,
        videoUrl: videoLink
      } : {
        productCode: values.productCode,
        productNameVn: await TranslateService.translateToVietNam({ content: values.productNameKr }),
        productNameKr: values.productNameKr,
        categoryId: values.categoryId,
        subCategoryId: values.subCategoryId,
        cost: 0,
        price: values.price,
        promo: values.promo,
        stockQuantity: values.stockQuantity,
        salientFeaturesVn: await TranslateService.translateToVietNam({ content: values.salientFeaturesKr }),
        salientFeaturesKr: values.salientFeaturesKr,
        detailVn: await TranslateService.translateToVietNam({ content: values.detailKr }),
        detailKr: values.detailKr,
        specVn: await TranslateService.translateToVietNam({ content: values.specKr }),
        specKr: values.specKr,
        featured: 0,
        warehouse: values.warehouse,
        attributeFes: convertedAttributeFes,
        productDetails: listProducts,
        images: listImageproducts,
        videoUrl: videoLink
      }

      console.log(dataSubmit)

      // if (id) {
      //   await ProductServices.putProducById(id, dataSubmit);
      //   onAddToast({ type: "success", message: "Cập nhật phẩm thành công" });
      //   navigate("/admin/product")
      // } else {
      //   await ProductServices.addProduct(dataSubmit)
      //   onAddToast({ type: "success", message: "Thêm sản phẩm thành công" });
      //   navigate("/admin/product")
      // }
    } catch (error) {
      console.log(error)
      onAddToast({ type: "error", message: "Có lỗi." });
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
    const product: any = await ProductServices.findProductById(id);
    const listImagesUrl: string[] = [];
    product.images.map((img: any) => {
      listImagesUrl.push(img.url)
    })

    const productDetails = product.productDetails;


    const reversedAttributes = product.attributeFes?.map((atb: any) => {
      const { attributeFeValues, attributeFeNameKr, attributeFeNameVn } = atb;

      const valueKr = attributeFeValues.map((attributeValue: any) => attributeValue.valueKr);
      const valueVn = attributeFeValues.map((attributeValue: any) => attributeValue.valueVn);

      return {
        attributeNameKr: attributeFeNameKr,
        attributeNameVn: attributeFeNameVn,
        valueKr,
        valueVn,
      };
    });


    setValues({
      productCode: product.productCode,
      productNameVn: product.productNameVn,
      productNameKr: product.productNameKr,
      categoryId: product.categoryId,
      subCategoryId: product.subcategoryId,
      cost: product.cost,
      price: product.price,
      promo: product.promo,
      stockQuantity: product.stockQuantity,
      salientFeaturesVn: product.salientFeaturesVn,
      salientFeaturesKr: product.salientFeaturesKr,
      detailVn: product.detailVn,
      detailKr: product.detailKr,
      specVn: product.specVn,
      specKr: product.spectKr,
      featured: product.featured,
      createAt: product.createAt,
      warehouse: product.warehouse,
      atributies: reversedAttributes,
      productDetails: [
      ],
    })
    setVideoUrl(product.videoUrl || "")
    setImagePreview(listImagesUrl);
    setImagesUpdate(listImagesUrl)
    setListProducts(productDetails)
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
            value={values.productCode}
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
            name={isVn ? "productNameVn" : "productNameKr"}
            value={isVn ? values.productNameVn : values.productNameKr}
            onChange={handleChange}
            className="!rounded-sm"
          />
          {
            isVn ? (errors.productNameVn && touched.productNameVn && (
              <TextError message={errors.productNameVn} />
            )) : errors.productNameKr && touched.productNameKr && (
              <TextError message={errors.productNameKr} />
            )
          }
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
            value={values.price}
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
            value={values.promo}
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
              isVn ? (values?.salientFeaturesVn || "")
                : (values?.salientFeaturesKr || "")
            }
            onChange={(data) => setFieldValue(isVn ? "salientFeaturesVn" : "salientFeaturesKr", data)}
          />
          {isVn ? (errors.salientFeaturesVn && touched.salientFeaturesVn && (
            <TextError message={errors.salientFeaturesVn} />
          )) : (errors.salientFeaturesKr && touched.salientFeaturesKr && (
            <TextError message={errors.salientFeaturesKr} />
          ))}
        </div>
        <div>
          <TitleInput isNormal={true} isRequired name="Thông tin sản phẩm" />
          <Editor
            content={isVn ? (values?.detailVn || "") : (values?.detailKr || "")}
            onChange={(data) => setFieldValue(isVn ? "detailVn" : "detailKr", data)}
          />
          {isVn ? (errors.detailVn && touched.detailVn && (
            <TextError message={errors.detailVn} />
          )) : (errors.detailKr && touched.detailKr && (
            <TextError message={errors.detailKr} />
          ))}
        </div>
        <div>
          <TitleInput
            isNormal={true}
            isRequired={false}
            name="Thông số kĩ thuật"
          />
          <Editor
            content={isVn ? (values?.specVn || "") : (values?.specKr || "")}
            onChange={(data) => setFieldValue(isVn ? "specVn" : "specKr", data)}
          />
          {
            isVn ? (errors.specVn && touched.specVn && (
              <TextError message={errors.specVn} />
            )) : errors.specKr && touched.specKr && (
              <TextError message={errors.specKr} />
            )
          }
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

      <div className="w-4/5">
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
        <div className="mb-4 overflow-y-auto max-h-[600px]">
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
              {listProducts && listProducts.map((items, index) => {
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
                          type="number"
                          onChange={(e) => handleEditPriceProductDetail(index, Number(e.target.value))}
                          className="text-sm text-center font-semibold px-6 placeholder:text-gray-200 w-full"
                        />
                      </td>
                      <td className="border border-neutra-neutra80 p-3">
                        <input
                          value={items.promoDetail}
                          type="number"
                          min={0}
                          max={100}
                          onChange={(e) => handleEditPromoProductDetail(index, Number(e.target.value))}
                          className="text-sm text-center font-semibold placeholder:text-gray-200 w-full"
                        />
                      </td>
                      <td className="border border-neutra-neutra80 p-3">
                        <input
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
          {imagePreview.length > 0 && listProducts.length > 0 && (
            <div className="border border-gray-200 rounded-md">
              {listProducts.map((item, index) => {
                const firstImage = item.images && item.images.length > 0 ? item.images[0]?.url : null;
                const nameColor = item.attributes.map((it) => isVn ? it.valueVn : it.valueKr).join(" - ");
                return (
                  <SliderPreviewImages
                    key={index}
                    classNavigate={"slideProduct" + index}
                    indexSlide={index}
                    nameColor={nameColor}
                    lisImages={imagePreview}
                    listImageActived={listImageActived}
                    imageActived={firstImage}
                    handleActiveImage={handleSetColorIntoImage}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="flex item-center justify-end my-7">
        <GroupButton
          onSubmit={handleSubmitForm}
          onCancel={() => navigate("/admin/product")}
        />
      </div>
    </div>
  );
}

export default ProductEditComponent;
