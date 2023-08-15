import { AddImage, TrashCanIcon } from "@assets/icons";
import { ToastContex } from "@contexts/ToastContex";
import ProductServices from "@services/ProductServices";
import UploadImage from "@services/UploadImage";
import InputChecboxElement from "commons/components/InputComponent/InputChecboxElement";
import InputTextElement from "commons/components/InputComponent/InputTextElement";
import { Product } from "commons/contannt";
import {
  ChangeEvent,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import BoxChoseColor from "./BoxChoseColor";
import BoxTradeMark from "./BoxTradeMark";
import ChooseProducCategory from "./ChooseProducCategory";
import SliderPreviewImages from "./SliderPreviewImages";

interface Props {}
function ProductEditComponent(props: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { onAddToast } = useContext(ToastContex);
  const [imageProducts, setImageProducts] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [listImageActived, setListImageActived] = useState<string[]>([]);
  const [videoFile, setFileVideo] = useState<File | null>(null);
  const [imgExchangFile, setImgExchangeFile] = useState<File | null>(null);
  const [isDisable, setDisable] = useState<boolean>(false);
  const nameTable = ["Màu sắc", "Size", "Giảm giá", "Số lượng", "Giá bán"];
  const [applySale, setApplySale] = useState({
    countSale: "",
    salePrice: "",
  });
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

  const handleChoseFile = (event: ChangeEvent<HTMLInputElement>) => {
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

  const handleValueInput = (valuInput: { name: string; value: string }) => {
    const { name, value } = valuInput;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleTextInput = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFormValue((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
    setValid({
      ...validForm,
      [event.target.name]: false,
    });
  };
  const handleChoseColor = (color: string, index: number) => {
    const newColor = [...formValue.colors];
    newColor[index].colorCode = color;
    setFormValue((prev) => {
      return {
        ...prev,
        colors: newColor,
      };
    });
  };
  // thêm màu
  const handleAddColor = (value: string) => {
    let newItem: any = {
      colorName: value,
      colorCode: "",
      image: "",
    };
    if (formValue.colors.length > 0 && formValue.colors[0].sizes) {
      const checkNameColor = formValue.colors.some((item) => {
        return item.colorName === value;
      });
      if (checkNameColor) {
        onAddToast({ type: "warn", message: "Tên màu đã được sử dụng!" });
        return;
      }
      const Sizes = [...formValue.colors[0].sizes];
      const newSizes = Sizes.map((item, index) => {
        const newPriceSale =
          formValue.price -
          (formValue.price / 100) * Number(applySale.salePrice);
        return {
          ...item,
          sale: Number(applySale.countSale),
          priceSale: newPriceSale,
          total: Number(applySale.salePrice),
        };
      });
      newItem = {
        ...newItem,
        sizes: newSizes,
      };
    }

    setFormValue((prevState: any) => {
      return {
        ...prevState,
        colors: [...prevState.colors, newItem],
      };
    });
  };
  const handleChangeInputColor = (
    valuInput: { name: string; value: string },
    index: number
  ) => {
    const newColor = [...formValue.colors];
    newColor[index] = {
      ...newColor[index],
      [valuInput.name]: valuInput.value,
    };
    setFormValue({
      ...formValue,
      colors: newColor,
    });
  };
  // thêm size
  const handleAddSize = (value: string) => {
    if (formValue.colors.length > 0) {
      if (listSize.includes(value)) {
        onAddToast({ type: "warn", message: "Tên Size đã được thêm!" });
        return;
      }
      setListSize([...listSize, value]);
      const newPriceSale =
        Number(formValue.price) -
        (formValue.price / 100) * Number(applySale.salePrice);

      const newItemSize = {
        sizeName: value,
        sale: Number(applySale.salePrice),
        priceSale: newPriceSale,
        total: Number(applySale.countSale),
      };
      const sizeApply = [...formValue.colors].map((item) => {
        return {
          ...item,
          sizes: item.sizes ? [...item.sizes, newItemSize] : [newItemSize],
        };
      });

      setFormValue((prevState: any) => {
        return {
          ...prevState,
          colors: sizeApply,
        };
      });
    } else {
      return;
    }
  };
  const handleChangeSize = (
    valuInput: { name: string; value: string },
    index: number
  ) => {
    const newColor = [...formValue.colors].map((itemC, indexC) => {
      itemC.sizes.map((itemS, indexS) => {
        if (indexS === index) {
          itemS.sizeName = valuInput.value;
        }
        return itemS;
      });

      return itemC;
    });

    setFormValue({
      ...formValue,
      colors: newColor,
    });
  };
  // sửa giảm giá và số lượng cho từng size
  const handleChangeItemSize = (
    event: ChangeEvent<HTMLInputElement>,
    indexColor: number,
    indexSize: number
  ) => {
    const newColors = [...formValue.colors];
    newColors[indexColor].sizes[indexSize] = {
      ...newColors[indexColor].sizes[indexSize],
      [event.target.name]: event.target.value,
    };
    setFormValue((prev) => {
      return {
        ...prev,
        colors: newColors,
      };
    });
  };
  // áp dụng giảm giá và số lượng cho toàn bộ
  const handleApplyPrice = () => {
    if (
      applySale.countSale !== "" &&
      applySale.salePrice !== "" &&
      formValue.colors[0].sizes
    ) {
      const newPriceSale =
        Number(formValue.price) -
        (formValue.price / 100) * Number(applySale.salePrice);
      const newColorOfPrice = formValue.colors.map((item) => {
        const newItem = item.sizes.map((itemS) => {
          return {
            ...itemS,
            sale: Number(applySale.salePrice),
            priceSale: newPriceSale,
            total: Number(applySale.countSale),
          };
        });
        return {
          ...item,
          sizes: newItem,
        };
      });

      setFormValue((prev: any) => {
        return {
          ...prev,
          colors: newColorOfPrice,
        };
      });
    }
    return;
  };
  // chọn phân loại giới tính
  const handleGender = (gender: "male" | "female") => {
    const genderForm = formValue.gender;
    if (Array.isArray(genderForm)) {
      if (genderForm.length === 1 && genderForm.includes(gender)) {
        return;
      }
      if (genderForm.includes(gender)) {
        setFormValue({
          ...formValue,
          gender: genderForm.filter((item) => item !== gender),
        });
      } else {
        setFormValue({
          ...formValue,
          gender: genderForm.concat(gender),
        });
      }
    }
  };
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
  const handleDeleteColor = (
    type: "COLOR" | "SIZE",
    index: number,
    name?: string
  ) => {
    let newColor = [...formValue.colors];
    if (type === "COLOR") {
      const newImageActived = [...listImageActived].filter((item) => {
        return item != newColor[index].image;
      });
      newColor.splice(index, 1);
      setListImageActived(newImageActived);
      setFormValue((prevState) => {
        return {
          ...prevState,
          colors: newColor,
        };
      });
    } else if (type === "SIZE" && name) {
      const newListSize = [...listSize];
      const newStateColor = newColor.map((item) => {
        const newSize = item.sizes.filter((itemS) => {
          return itemS.sizeName != name;
        });

        item.sizes = newSize as any;
        return item;
      });
      newListSize.splice(index, 1);
      setListSize(newListSize);
      setFormValue((prevState) => {
        return {
          ...prevState,
          colors: newStateColor,
        };
      });
    }
    return;
  };
  const handleTrade = (item: any) => {
    setFormValue((prevState) => {
      return {
        ...prevState,
        trademark: item,
      };
    });
  };
  const onChoseCategory = (data: any) => {
    setFormValue({
      ...formValue,
      category: data,
    });
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
      const validate = handleCheckValidate();
      setDisable(true);
      if (validate) {
        let newValueForm = { ...formValue };
        newValueForm.gender = (
          newValueForm.gender!.length === 2 ? null : newValueForm.gender![0]
        ) as any;

        const formData = new FormData();
        const formExchangdata = new FormData();
        const formVideodata = new FormData();

        for (let i = 0; i < imageProducts.length; i++) {
          formData.append("file", imageProducts[i]);
        }

        formExchangdata.append("file", imgExchangFile!);
        formVideodata.append("file", videoFile!);

        const listImageproducts =
          imageProducts.length > 0
            ? await UploadImage.uploadImages(formData)
            : [];
        const videoUrl =
          videoFile && (await UploadImage.uploadVideo(formVideodata));

        const newImageCheck =
          imgExchangFile && (await UploadImage.uploadImages(formExchangdata));

        newValueForm.images = (
          id ? [...formValue.images, ...listImageproducts] : listImageproducts
        ) as any;
        newValueForm.colors.map((item, indexC) => {
          const index = imagePreview.findIndex((itemPre) => {
            return itemPre === item.image;
          });
          item.image = index > -1 ? newValueForm.images[index] : "";
        });

        newValueForm.video = videoUrl ? videoUrl : id ? formValue.video : "";
        newValueForm.imageCheck = newImageCheck
          ? newImageCheck[0]
          : id
          ? formValue.imageCheck
          : "";
        if (id) {
          const result = await ProductServices.putProducById(id, newValueForm);
          onAddToast({ type: "success", message: "Sửa sản phẩm thành công." });
          const listImage = result.images.map((item) => item);
          if (result.gender === null) {
            result.gender = ["male", "female"];
          } else {
            result.gender = [result.gender] as any;
          }
          setImagePreview(listImage);
          setFormValue(result);
        } else {
          const result = await ProductServices.addProduct(newValueForm);
          if (result) {
            handleReset();
            onAddToast({
              type: "success",
              message: "Thêm sản phẩm thành công.",
            });
          }
        }
      } else {
        onAddToast({ type: "warn", message: "bạn chưa nhập đúng dữ liệu" });
      }
      setDisable(false);
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
  return (
    <div className="flex">
      <div className="w-[300px] border-t-4 border-t-main pt-9 border-r pl-8 border-r-gray-200">
        <div className="flex items-center mb-[30px]">
          <div className="w-5 h-5 rounded-[50%] bg-gray-100 mr-3"></div>
          <p className="text-main text-base font-medium leading-5 tracking-[.03]">
            Thông tin cơ bản
          </p>
        </div>
        <div className="flex items-center ">
          <div className="w-5 h-5 rounded-[50%] bg-gray-100 mr-3"></div>
          <p className="text-main text-base font-medium leading-5 tracking-[.03]">
            Thông tin bán hàng
          </p>
        </div>
      </div>
      <div className="pt-9 pb-10px flex-1 xl:pl-8">
        <h2 className="titlePage mb-5">Thông tin cơ bản</h2>

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

        <div className="mt-8 flex gap-24">
          <div>
            <p className="text-small mb-3">Video sản phẩm</p>
            <label className="w-[100px] h-[100px] p-2 rounded-md border-[2px] border-dashed flex items-center flex-col justify-end cursor-pointer">
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
          </div>
          <div>
            <p className="max-w-[200px] text-left font-normal text-small text-gray-300 mt-8">
              Tải video dạng mp4 Độ dài từ 10s-60s Kích thước tối đa 30MB
            </p>
          </div>
        </div>

        <div className="border-b border-b-gray-200 pb-12">
          <div className="w-2/3">
            <div className="mb-25">
              <p className="text-small mb-3">
                Mã sản phẩm <span className="text-main">*</span>
              </p>
              <InputTextElement
                isRequired={true}
                name="sku"
                value={formValue.sku}
                placehoderText="Nhập mã sản phẩm"
                classWidth="w-full mr-3"
                onChangeInput={handleValueInput}
                className="py-3 px-5"
              />
            </div>
            <div className="mb-25">
              <p className="text-small mb-3">
                Tên sản phẩm <span className="text-main">*</span>
              </p>
              <InputTextElement
                isRequired={true}
                name="name"
                className="py-3 px-5"
                placehoderText="Nhập tên sản phẩm"
                classWidth="w-full mr-3"
                maxNumber={120}
                value={formValue.name}
                onChangeInput={handleValueInput}
              />
            </div>
            <ChooseProducCategory
              itemCategory={formValue.category}
              onHandleAddCategory={onChoseCategory}
            />
            <BoxTradeMark
              iTemTrade={formValue.trademark}
              onSelectTrade={handleTrade}
            />

            <div>
              <p className="text-small mb-3">Đối tượng</p>
              <div className="mt-3 flex items-center gap-12">
                <InputChecboxElement
                  onHandleChange={() => handleGender("male")}
                  isCheck={
                    Array.isArray(formValue.gender) &&
                    formValue.gender.includes("male")
                  }
                  lable="Nam"
                  name="female"
                />
                <InputChecboxElement
                  onHandleChange={() => handleGender("female")}
                  isCheck={
                    Array.isArray(formValue.gender) &&
                    formValue.gender.includes("female")
                  }
                  lable="Nữ"
                  name="female"
                />
              </div>
            </div>

            <div className="mt-7">
              <p className="text-small mb-3">
                Thông tin <span className="text-main">*</span>
              </p>
              <div className="relative mb-7">
                <textarea
                  name="detail"
                  maxLength={3000}
                  value={formValue.detail}
                  onChange={(event) => handleTextInput(event)}
                  onBlur={(event) => {
                    if (event.target.value === "") {
                      setValid({
                        ...validForm,
                        [event.target.name]: true,
                      });
                    }
                  }}
                  className={
                    "border rounded-md border-gray-200 resize-none w-full p-4 pr-12 text-small overflow-y-auto " +
                    (validForm?.detail && "border-main")
                  }
                  rows={8}
                />
                <div className="absolute right-9 bottom-[20%] font-normal text-xs text-gray-300">
                  {formValue?.detail?.length || 0}/3000
                </div>
                {validForm.detail && (
                  <p className="w-auto text-left text-main text-xs mt-1">
                    Không được để trống
                  </p>
                )}
              </div>

              <p className="text-small mb-3">Chính sách bảo hành sản phẩm</p>
              <div className="relative">
                <textarea
                  name="policy"
                  onChange={(event) => handleTextInput(event)}
                  maxLength={3000}
                  value={formValue.policy}
                  className="border rounded-md border-gray-200 resize-none w-full p-4 pr-12 text-small mb-7 overflow-y-auto"
                  rows={8}
                />
                <div className="absolute right-9 bottom-[20%] font-normal text-xs text-gray-300">
                  {formValue?.policy?.length || 0}/3000
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-2/3">
          <p className="titlePage text-2xl mb-6 mt-1">Thông tin bán hàng</p>
          <div>
            <p className="text-small font-semibold mb-5">Phân loại hàng</p>
            <div className="grid grid-cols-6">
              <div className="col-span-1">
                <p className="text-small">
                  Màu sắc <span className="text-main">*</span>
                </p>
              </div>
              <div className="col-span-5 mb-8">
                {formValue.colors.length > 0 &&
                  formValue.colors.map((itemColor, indexColor) => {
                    return (
                      <div
                        className="flex items-center gap-10px mb-10px"
                        key={indexColor}
                      >
                        <InputTextElement
                          // isReadOnly={true}
                          maxNumber={20}
                          name="colorName"
                          value={itemColor.colorName}
                          onChangeInput={(value: any) =>
                            handleChangeInputColor(value, indexColor)
                          }
                          placehoderText="Nhập mã sản phẩm"
                          classWidth="w-full  mr-3"
                          className="py-3 px-5"
                        />
                        <div
                          className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center cursor-pointer"
                          onClick={() => handleDeleteColor("COLOR", indexColor)}
                        >
                          <TrashCanIcon fill="#8E8E8E" width={14} />
                        </div>
                      </div>
                    );
                  })}

                <InputTextElement
                  maxNumber={20}
                  name="codeId"
                  isRequired
                  value={""}
                  placehoderText="Nhập loại màu"
                  classWidth="w-full max-w-[93%] mr-3"
                  onBlurInput={handleAddColor}
                  className="py-3 px-5"
                />
              </div>
              <div className="col-span-1">
                <p className="text-small">
                  Size <span className="text-main">*</span>
                </p>
              </div>
              <div className="col-span-5 mb-8">
                {formValue.colors.length > 0 &&
                  listSize.length > 0 &&
                  listSize.map((itemSize, indexSize) => {
                    return (
                      <div
                        className="flex items-center gap-10px mb-10px"
                        key={indexSize}
                      >
                        <InputTextElement
                          // isReadOnly={true}
                          maxNumber={20}
                          name="sizeName"
                          value={itemSize}
                          onChangeInput={(value: any) =>
                            handleChangeSize(value, indexSize)
                          }
                          placehoderText="Nhập mã sản phẩm"
                          classWidth="w-full  mr-3"
                          className="py-3 px-5"
                        />
                        <div
                          className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center cursor-pointer"
                          onClick={() =>
                            handleDeleteColor("SIZE", indexSize, itemSize)
                          }
                        >
                          <TrashCanIcon fill="#8E8E8E" width={14} />
                        </div>
                      </div>
                    );
                  })}
                <InputTextElement
                  name="sku"
                  maxNumber={20}
                  isRequired
                  value={""}
                  placehoderText="Nhập size sản phẩm"
                  classWidth="w-full max-w-[93%] mr-3"
                  onBlurInput={handleAddSize}
                  className="py-3 px-5"
                />
              </div>

              <div className="col-span-1 text-small">
                <p className="text-small">
                  Giá bán <span className="text-main">*</span>
                </p>
              </div>
              <div className="col-span-5 mb-8">
                <InputTextElement
                  type="number"
                  isRequired
                  isVND={true}
                  name="price"
                  maxNumber={20}
                  value={formValue.price == 0 ? "" : formValue.price}
                  onChangeInput={handleValueInput}
                  placehoderText="Nhập giá bán"
                  classWidth="w-full max-w-[93%] mr-3"
                  className="py-3 px-5"
                />
              </div>
              <div className="col-span-1 text-small">
                <p className="text-small">
                  Giá vốn <span className="text-main">*</span>
                </p>
              </div>
              <div className="col-span-5 mb-8">
                <InputTextElement
                  type="number"
                  isRequired
                  isVND={true}
                  name="cost"
                  maxNumber={20}
                  value={formValue.cost == 0 ? "" : formValue.cost}
                  onChangeInput={handleValueInput}
                  placehoderText="Nhập giá vốn"
                  classWidth="w-full max-w-[93%] mr-3"
                  className="py-3 px-5"
                />
              </div>
            </div>
          </div>

          <p className="text-small font-semibold mb-5">
            Danh sách phân loại hàng
          </p>
          <div className="w-full flex gap-10px mb-5">
            <div className="border rounded-md h-10 pt-3 px-3 pb-2 flex items-center w-[70%] 2xl:w-[78%]">
              <input
                type="number"
                className="placeholder:text-gray-200 h-full p-2 text-small border-r border-gray-200 font-normal px-10px w-2/4"
                placeholder="Số lượng"
                name="countSale"
                value={applySale.countSale}
                onChange={(event) =>
                  setApplySale({
                    ...applySale,
                    [event.target.name]: event.target.value,
                  })
                }
              />
              <input
                type="number"
                min={0}
                className="placeholder:text-gray-200 h-full p-2 text-small font-normal px-10px w-2/4"
                placeholder="Giảm giá"
                name="salePrice"
                value={applySale.salePrice}
                onChange={(event) =>
                  setApplySale({
                    ...applySale,
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
          <div className="mb-4">
            {formValue.colors.length > 0 &&
              formValue.colors[0].sizes &&
              formValue.colors[0].sizes.length > 0 && (
                <table className="w-full">
                  <thead>
                    <tr>
                      {nameTable.map((itemName, index) => {
                        return (
                          <th
                            key={index}
                            className="text-small font-normal py-3 text-center min-w-[128px]"
                          >
                            {itemName}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {formValue.colors.map((items, index) => {
                      return (
                        <Fragment key={index}>
                          <tr>
                            <td rowSpan={items.sizes.length + 1}>
                              <div className="flex flex-col justify-center items-center p-2 relative">
                                <p className="text-small font-semibold text-center mb-3">
                                  {items.colorName}
                                </p>
                                <div
                                  style={{
                                    backgroundColor: items.colorCode || "",
                                  }}
                                  className="w-10 h-10 rounded-[50%] cursor-pointer border-2 chose-color"
                                >
                                  <BoxChoseColor
                                    handleChoseColor={(value) =>
                                      handleChoseColor(value, index)
                                    }
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                          {items.sizes.map((itemSize, indexSize) => {
                            return (
                              <tr key={indexSize + "Size"} className="relative">
                                <td className="py-6 text-center text-small font-semibold uppercase max-w-[170px]">
                                  {itemSize.sizeName}
                                </td>
                                <td>
                                  <div className="flex max-w-[170px]">
                                    <div className="border-r text-gray-300 border-r-gray-200 p-2">
                                      %
                                    </div>
                                    <input
                                      value={itemSize.sale}
                                      name="sale"
                                      onChange={(event) => {
                                        handleChangeItemSize(
                                          event,
                                          index,
                                          indexSize
                                        );
                                      }}
                                      type="number"
                                      placeholder="--"
                                      className="text-small text-center font-semibold px-6 placeholder:text-gray-200 w-full"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div className="max-w-[170px]">
                                    <input
                                      name="total"
                                      value={itemSize.total}
                                      onChange={(event) => {
                                        handleChangeItemSize(
                                          event,
                                          index,
                                          indexSize
                                        );
                                      }}
                                      type="number"
                                      placeholder="--"
                                      className="text-small text-center font-semibold px-6 placeholder:text-gray-200 w-full"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div className="">
                                    <input
                                      readOnly
                                      value={(
                                        formValue.price -
                                        (formValue.price / 100) * itemSize.sale
                                      ).toLocaleString("vi", {
                                        style: "currency",
                                        currency: "VND",
                                      })}
                                      onChange={(event) => {}}
                                      type="text"
                                      placeholder="--"
                                      className="text-small text-center cursor-not-allowed font-semibold px-6 placeholder:text-gray-200 w-full"
                                    />
                                  </div>
                                </td>
                                {items.sizes.length > 1 && (
                                  <div
                                    onClick={() =>
                                      handleDeleteSize(index, indexSize)
                                    }
                                    className="absolute -right-5 top-2/4 -translate-y-[50%] cursor-pointer"
                                  >
                                    <TrashCanIcon fill="#8E8E8E" width={14} />
                                  </div>
                                )}
                              </tr>
                            );
                          })}
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              )}
          </div>
          {/* chọn màu */}
          <div className="mb-9">
            <p className="text-small font-semibold mb-5">Chọn màu</p>
            {imagePreview.length > 0 && formValue.colors.length > 0 && (
              <div className="border border-gray-200 rounded-md">
                {formValue.colors.map((item, index) => {
                  return (
                    <SliderPreviewImages
                      key={index}
                      classNavigate={"slideProduct" + index}
                      codeColor={item.colorCode}
                      nameColor={item.colorName}
                      indexSlide={index}
                      lisImages={imagePreview}
                      listImageActived={listImageActived}
                      imageActived={item.image}
                      handleActiveImage={handleSetColorIntoImage}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* bảng đổi kích cỡ ảnh */}
          <div className="mb-5">
            <p className="text-small font-semibold mb-5">
              Bảng quy đổi kích cỡ
            </p>
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

          <div className="flex item-center mt-7">
            <button
              disabled={!handleCheckValidate() || isDisable}
              className={
                "btn-normal text-sm leading-18 mr-10px " +
                (!handleCheckValidate() || isDisable
                  ? "bg-gray-300 text-white cursor-not-allowed"
                  : "")
              }
              onClick={() => handleSubmit()}
            >
              Lưu
            </button>
            <button
              className="rounded-md py-2 px-3 border border-main flex items-center text-main text-smal font-normal bg-icon"
              onClick={() => navigate("/admin/product")}
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductEditComponent;
