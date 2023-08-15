import { AddImage, TrashCanIcon } from "@assets/icons";
import { ToastContex } from "@contexts/ToastContex";
import TradeMarkServices from "@services/TradeMarkServices";
import UploadImage from "@services/UploadImage";
import { ROUTES } from "@utility/constants";
import InputTextElement from "commons/components/InputComponent/InputTextElement";
import RadioElement from "commons/components/InputComponent/RadioElement";
import { TradeMarkType } from "commons/contannt";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Props {}
function TradeMarkComponent(props: Props) {
  const { id } = useParams();
  const navigator = useNavigate();
  const { onAddToast } = useContext(ToastContex);
  const [isDisable, setDisable] = useState<boolean>(false);
  const [listImageTrade, setListImageTrade] = useState<File[] | []>([]);
  const [listImageTradePrev, setListImageTradePrev] = useState<string[]>([]);
  const [formData, setFormData] = useState<TradeMarkType>({
    id: "",
    name: "",
    images: [],
    menuShow: false,
  });

  const handleValueInput = (valuInput: { name: string; value: string }) => {
    setFormData((prev) => {
      return {
        ...prev,
        name: valuInput.value,
      };
    });
  };

  const handleChoseFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (listImageTrade.length < 2 && listImageTradePrev.length < 2 && file) {
      setListImageTrade([...listImageTrade, file[0]]);
      const prevImg = URL.createObjectURL(file[0]);
      setListImageTradePrev((prev) => {
        return [...prev, prevImg];
      });
    } else {
      onAddToast({
        type: "error",
        message: "Đã có tối đa 2 ảnh",
      });
    }
    event.target.value = "";
  };
  const handleCancel = () => {
    navigator(`/admin/${ROUTES.admin.cartegory.index}`);
  };
  const handleDeleteImgPrev = (index: number) => {
    let newImg = [...listImageTrade];
    let newImgPrev = [...listImageTradePrev];
    const indeximage = formData.images.includes(listImageTradePrev[index]);
    if (indeximage) {
      newImgPrev.splice(index, 1);
      setFormData((prev) => {
        return {
          ...prev,
          images: prev.images.filter(
            (item) => item != listImageTradePrev[index]
          ),
        };
      });
    } else {
      newImgPrev.splice(index, 1);
      newImg.splice(index, 1);
      URL.revokeObjectURL(listImageTradePrev[index]);
      setListImageTrade(newImg);
    }
    setListImageTradePrev(newImgPrev);
  };
  const handleReset = () => {
    setFormData({
      id: "",
      name: "",
      images: [],
      menuShow: false,
    });
    setListImageTrade([]);
    setListImageTradePrev([]);
  };
  const getTradeMarkId = async (id: string) => {
    try {
      const result = await TradeMarkServices.getTradeMarkById(id);
      if (result) {
        setFormData({
          ...result,
        });
        setListImageTradePrev(result.images);
      }
    } catch (error) {
      console.log("lỗi không lấy đc chi tiết thương hiệu");
    }
  };
  const onSave = async () => {
    let newFormData = { ...formData };
    try {
      if (formData.name == "" || listImageTradePrev.length === 0) return;
      setDisable(true);
      const formFileData = new FormData();
      for (let i = 0; i < listImageTrade.length; i++) {
        formFileData.append("file", listImageTrade[i]);
      }
      const imageTrades =
        listImageTrade.length > 0
          ? await UploadImage.uploadImages(formFileData)
          : [];
      newFormData.images = id
        ? [...formData.images, ...imageTrades]
        : imageTrades;

      const dataPost = id
        ? newFormData
        : {
            name: newFormData.name,
            images: newFormData.images,
            menuShow: newFormData.menuShow,
          };
      //  log
      const result = id
        ? await TradeMarkServices.addOrUpdateTradeMark(dataPost, formData.id)
        : await TradeMarkServices.addOrUpdateTradeMark(dataPost);
      if (id && result) {
        onAddToast({
          type: "success",
          message: "Sửa Thương hiệu thành công.",
        });
        //
        navigator(`/admin/trade-mark/edit/${result.name}`);
        setFormData(result);
        setListImageTrade([]);
        setListImageTradePrev(result.images);
      } else {
        onAddToast({
          type: "success",
          message: "Thêm Thương hiệu thành công.",
        });
        handleReset();
      }
      setDisable(false);
    } catch (error) {
      onAddToast({
        type: "error",
        message: "Có lỗi.",
      });
      setDisable(false);
    }
  };

  useEffect(() => {
    if (id) {
      getTradeMarkId(id);
    }
    return () => {};
  }, [id]);
  useEffect(() => {
    return () => {
      if (listImageTrade.length > 0) {
        listImageTradePrev.forEach((item) => {
          URL.revokeObjectURL(item);
        });
      }
    };
  }, []);

  return (
    <div className=" pt-9 pb-10px">
      <h2 className="titlePage mb-9">
        {id ? "Sửa thương hiệu" : "Tạo thương hiệu"}
      </h2>

      <div>
        <p className="text-small">
          Tên thương hiệu<span className="text-main">*</span>
        </p>
        <div className="mt-3 mb-9">
          <InputTextElement
            value={formData.name}
            name="name"
            maxNumber={20}
            classWidth="w-2/4"
            isRequired
            onChangeInput={handleValueInput}
            className="py-3 px-5"
            placehoderText="Nhập tên thương hiệu"
          />
        </div>
        <p className="text-small mb-5">
          Banner thương hiệu<span className="text-main">*</span>
        </p>

        <div className="mb-10 flex items-center justify-start gap-5">
          <label
            htmlFor="fileTrade"
            className="w-[274px] h-[148px] border-[2px] border-dashed rounded cursor-pointer flex flex-col justify-end items-center pb-8"
          >
            <AddImage />
            <input
              id="fileTrade"
              type="file"
              className="hidden"
              onChange={(event) => handleChoseFile(event)}
            />
            <p className="text-normal text-gray-300 mt-10px">
              Tải lên banner ({listImageTrade.length}/2)
            </p>
          </label>
          {listImageTradePrev.map((itemPrev, indexPrev) => {
            return (
              <div
                key={indexPrev}
                className="text-center w-[274px] h-[148px] rounded-[5px] border-[2px] relative"
              >
                <img src={itemPrev} alt="" className="w-full h-full rounded" />
                <TrashCanIcon
                  onClick={() => handleDeleteImgPrev(indexPrev)}
                  width={18}
                  className="absolute top-3 right-4 cursor-pointer"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-20 mb-16">
        <p className="text-smal">Hiển thị trên thanh menu:</p>
        <RadioElement
          isChecked={!formData.menuShow}
          handleChange={() =>
            setFormData({
              ...formData,
              menuShow: false,
            })
          }
          name="active"
          lable="không"
        />
        <RadioElement
          handleChange={() =>
            setFormData({
              ...formData,
              menuShow: true,
            })
          }
          isChecked={formData.menuShow}
          name="active"
          lable="có"
        />
      </div>

      <div className="flex item-center">
        <button
          onClick={onSave}
          disabled={
            formData.name === "" || listImageTradePrev.length === 0 || isDisable
          }
          className={
            "btn-normal text-sm leading-18 mr-10px " +
            ((formData.name === "" ||
              listImageTradePrev.length === 0 ||
              isDisable) &&
              "bg-gray-300 text-white cursor-not-allowed")
          }
        >
          Lưu
        </button>
        <button
          className="rounded-md py-2 px-3 border border-main flex items-center text-main text-small font-normal bg-icon"
          onClick={handleCancel}
        >
          Hủy
        </button>
      </div>
    </div>
  );
}

export default TradeMarkComponent;
