import { formatMoney } from "@utility/helper";
import InputChecboxElement from "commons/components/InputComponent/InputChecboxElement";
import { Product, ProductItemSize } from "commons/contannt";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  item: Product;
  isCheck: boolean;
  handleDelete: (id: number) => void;
  showEditLink?: boolean;
}

function ProducSizeItem(props: Props) {
  const { item, isCheck, showEditLink = true, handleDelete } = props;
  const navigator = useNavigate();
  const [listPrItem, setListPrItem] = useState<ProductItemSize[]>(
    item ? [item.colors[0]] : []
  );
  const [lengthItem, setLengItem] = useState<number>(
    item ? item.colors.length : 0
  );
  const [isShow, setShow] = useState<boolean>(true);

  const handleAddColorSize = () => {
    if (item && item.colors.length <= lengthItem) {
      const newList = [...listPrItem, item.colors[listPrItem.length]];
      setListPrItem(newList);
      if (newList.length === lengthItem) {
        setShow(false);
      }
    }
  };
  const handleRemoveColorSize = () => {
    if (listPrItem.length > 1) {
      const newColor = [...listPrItem];
      newColor.pop();
      setListPrItem(newColor);
      if (newColor.length === 1) {
        setShow(true);
      }
    }
  };
  const handleSetRows = () => {
    let rows = 0;
    if (listPrItem.length > 0) {
      listPrItem.map((item) => {
        rows += item.sizes.length;
        return item;
      });
    }
    return rows + 1;
  };

  const handleEditProduct = (id: number | string) => {
    navigator(`/admin/product/edit/${id}`);
  };
  useEffect(() => {
    if (item) {
      setListPrItem([item.colors[0]]);
      setLengItem(item.colors.length);
    }
  }, [item]);

  if (item && listPrItem.length > 0) {
    return (
      <Fragment>
        <tr>
          <td rowSpan={handleSetRows()} className="w-[375px]">
            <div className="flex items-center py-4 pl-4 pr-7 w-full h-full">
              <InputChecboxElement
                isCheck={isCheck}
                name={item.sku}
                onHandleChange={() => {
                  item.id && handleDelete(item.id);
                }}
                sizeBox="w-4 h-4 rounded-[4px]"
              />

              <div>
                <div className="flex items-center">
                  <img
                    src={item.images[0] || "/images-raw/imageTshirt.jpg"}
                    alt={item.name}
                    className="w-[52px] h-[52px] border border-gray-200 rounded-[10px] mr-3"
                  />
                  <div>
                    <p className="text-left line-clamp-2">{item.name}</p>
                  </div>
                </div>

                <p className="font-normal text-xs text-gray-300 text-left mt-2 uppercase tracking-[.03]">
                  Mã:{item.sku}
                </p>
                {showEditLink && (
                  <p
                    className="font-semibold text-small text-main text-left mt-6 cursor-pointer"
                    onClick={() => handleEditProduct(item.id!)}
                  >
                    Sửa
                  </p>
                )}
              </div>
            </div>
          </td>
        </tr>

        {listPrItem.map((itemColor, indexColor) => {
          return itemColor.sizes.map((itemSize: any, indexSize: any) => {
            return (
              <tr key={indexSize + "indexSize"}>
                <td className="text-small font-semibold p-6">
                  {itemColor.colorName + " - " + itemSize.sizeName}
                </td>
                <td className="text-small font-semibold p-6">
                  {formatMoney(itemSize.priceSale)}
                </td>
                <td
                  className={
                    "text-small font-semibold p-6 " +
                    (itemSize.total === 0 && "text-gray-200")
                  }
                >
                  {itemSize.total}
                </td>
                <td className="text-small font-semibold p-6">{item.sold}</td>
              </tr>
            );
          });
        })}
        <tr>
          <td colSpan={5} className="text-small font-semibold p-6">
            {item.colors.length > 1 && (
              <>
                {lengthItem > listPrItem.length && isShow ? (
                  <button
                    onClick={handleAddColorSize}
                    className="rounded-md px-2 py-[6px] border border-main"
                  >
                    {lengthItem - listPrItem.length} phân loại hàng khác
                  </button>
                ) : (
                  <button
                    onClick={handleRemoveColorSize}
                    className="rounded-md px-2 py-[6px] border textInput"
                  >
                    Đóng
                  </button>
                )}
              </>
            )}
          </td>
        </tr>
      </Fragment>
    );
  } else {
    return null;
  }
}

export default ProducSizeItem;
