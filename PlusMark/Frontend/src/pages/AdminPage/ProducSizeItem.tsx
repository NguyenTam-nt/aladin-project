import { IconFeaturedProduct } from "@assets/icons";
import useI18n from "@hooks/useI18n";
import { ProductDetails } from "@services/Types/product";
import { formatMoney } from "@utility/helper";
import InputChecboxElement from "commons/components/InputComponent/InputChecboxElement";
import { Product, ProductItemSize } from "commons/contannt";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  item: any;
  isCheck: boolean;
  handleDelete: (id: string) => void;
  showEditLink?: boolean;
}

function ProducSizeItem(props: Props) {
  const { item, isCheck, showEditLink = true, handleDelete } = props;
  const navigator = useNavigate();
  const { isVn } = useI18n();
  // const [listPrItem, setListPrItem] = useState<ProductItemSize[]>(
  //   item ? [item?.colors[0]] : []
  // );
  // const [lengthItem, setLengItem] = useState<number>(
  //   item ? item.colors.length : 0
  // );
  const [isShow, setShow] = useState<boolean>(true);

  // const handleAddColorSize = () => {
  //   if (item && item.colors.length <= lengthItem) {
  //     const newList = [...listPrItem, item.colors[listPrItem.length]];
  //     setListPrItem(newList);
  //     if (newList.length === lengthItem) {
  //       setShow(false);
  //     }
  //   }
  // };
  // const handleRemoveColorSize = () => {
  //   if (listPrItem.length > 1) {
  //     const newColor = [...listPrItem];
  //     newColor.pop();
  //     setListPrItem(newColor);
  //     if (newColor.length === 1) {
  //       setShow(true);
  //     }
  //   }
  // };
  // const handleSetRows = () => {
  //   let rows = 0;
  //   if (listPrItem.length > 0) {
  //     listPrItem.map((item) => {
  //       rows += item.sizes.length;
  //       return item;
  //     });
  //   }
  //   return rows + 1;
  // };

  const handleEditProduct = (id: number | string) => {
    navigator(`/admin/product/edit/${id}`);
  };
  // useEffect(() => {
  //   if (item) {
  //     setListPrItem([item.colors[0]]);
  //     setLengItem(item.colors.length);
  //   }
  // }, [item]);

  if (item) {
    return (
      <Fragment>
        <tr>
          <td className="w-[375px]">
            <div className="flex items-center py-4 pl-4 pr-7 w-full h-full">
              <InputChecboxElement
                isCheck={isCheck}
                name={isVn ? item.productNameVn : item.productNameKr}
                onHandleChange={() => {
                  item.id && handleDelete(item.id);
                }}
                sizeBox="w-4 h-4 rounded-[4px] mb-10"
              />

              <div className="flex items-center flex-wrap pl-4">
                <div className="flex items-center w-full">
                  <img
                    src={"/images-raw/imageTshirt.jpg"}
                    alt={isVn ? item.productNameVn : item.productNameKr}
                    className="w-[72px] h-[72px] border border-gray-200 rounded-[10px] mr-3 shadow"
                  />
                  <div className="flex flex-col gap-1">
                    <div className="italic">
                      {item.productCode}
                    </div>
                    <div className="font-bold">
                      {isVn ? item.productNameVn : item.productNameKr}
                    </div>
                    <div className="flex">
                      <IconFeaturedProduct />
                      <span className="pl-1 text-small">Chọn làm sản phẩm nổi bật</span>
                    </div>
                  </div>
                </div>
                <div className="w-full ">
                  <div className="w-[72px] flex justify-between">
                    {showEditLink && (
                      <p
                        className="font-semibold text-small text-main mt-6 cursor-pointer"
                        onClick={() => handleEditProduct(item.id!)}
                      >
                        Sửa
                      </p>
                    )}
                    {showEditLink && (
                      <p
                        className="font-semibold text-small text-main mt-6 cursor-pointer"
                        onClick={() => handleDelete(item.id!)}
                      >
                        Xóa
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </td>
          {item.productDetails.map((detail: ProductDetails, index: number) => {
            return (
              <tr className="items-center">
                <td className="">
                  {detail.attributes.map((it) => it.valueVn).join(" - ")}
                </td>
                <td>
                  {detail.promoDetail}
                </td>
                <td>
                  {detail.addressWarehouse}
                </td>
                <td>
                  {detail.stockQuantity}
                </td>
                <td>
                  {detail.soldQuantity}
                </td>
              </tr>
            )
          })}
        </tr>
      </Fragment>
    );
  } else {
    return null;
  }
}

export default ProducSizeItem;
