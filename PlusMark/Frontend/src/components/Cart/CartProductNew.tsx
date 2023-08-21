import { TickIcon, RemoveCartIcon } from "@assets/icons";
import DiscountFlag from "@components/Flag/DiscountFlag";
import AmountChange from "@components/common/AmountChange";
import ColorSizeChoose from "@components/product/choose/ColorSizeChoose";
import { CartItem, useCart } from "@contexts/CartContext";
import ProductServices, { ProductColor, ProductItem, ProductSize } from "@services/ProductServices";
import { ROUTES } from "@utility/constants";
import { formatMoney } from "@utility/helper";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  itemCart: CartItem,
  change?: any,
  size: string,
  border?: any,
  className?: string,
  payment?: boolean
}

const CartProductNew = ({ className, itemCart, change, size, border, payment }: Props) => {
  const { onChangeItem, chooseProduct } = useCart()
  const [checked, setChecked] = useState<boolean>(itemCart.choose || false);
  const [quantityDescActive, setQuantityDescActive] = useState<boolean>(false);
  const [quantityAscActive, setQuantityAscActive] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(itemCart.quantity);
  const [openChoseSizeColor, setopenChoseSizeColor] = useState(false)
  const [productData, setproductData] = useState<ProductItem>()

  const [sizeChoose, setsizeChoose] = useState<ProductSize | undefined>(itemCart.size)
  const [colorChoose, setcolorChoose] = useState<ProductColor | undefined>(itemCart.color)
  const [itemChoose, setItemChoose] = useState<boolean | undefined>(true)


  useEffect(() => {
    try {
      ProductServices.getProductDetail(itemCart.id || "64536161a112f548a8ba6f0e")
        .then(data => {
          setproductData(data)
        })
    } catch (error) {

    }
  }, [])


  useEffect(() => {
    setQuantity(itemCart.quantity)
    if (itemCart.quantity > 0) {
      setQuantityDescActive(true)
    } else {
      setQuantityDescActive(false)
    }

    if (itemCart.size.total <= itemCart.quantity) {
      setQuantityAscActive(false)
    } else {
      setQuantityAscActive(true)
    }
  }, [itemCart.quantity])

  useEffect(() => {
    setsizeChoose(itemCart.size)

  }, [itemCart.size])

  useEffect(() => {
    setcolorChoose(itemCart.color)

  }, [itemCart.color])

  useEffect(() => {
    setItemChoose(itemCart.choose)
  })

  const handleIncrease = () => {
    if (quantity + 1 <= itemCart.size.total) {
      setQuantity((prev) => 1 + prev);
      itemCart.quantity += 1
      onChangeItem(itemCart.id, itemCart)
      setQuantityDescActive(true)
      if (quantity + 1 == itemCart.size.total) {
        setQuantityAscActive(false)
      }
    }
  };

  const handleDecrease = () => {
    setQuantity((prev) => prev - 1);
    itemCart.quantity -= 1
    onChangeItem(itemCart.id, itemCart)
  };

  const handleRemoveFromCart = () => {
    itemCart.quantity = 0
    onChangeItem(itemCart.id, itemCart)
  }

  const handleChecked = (e: any) => {
    setChecked(e.target.checked)
    chooseProduct(itemCart.id, itemCart.size.sizeName, itemCart.color.colorName, e.target.checked)
  }

  useEffect(() => {
    // console.log(itemCart.size?.sizeName, sizeChoose?.sizeName, itemCart.color?.colorName, colorChoose?.colorName);

    if (sizeChoose && colorChoose && (itemCart.size?.sizeName != sizeChoose?.sizeName || itemCart.color?.colorName != colorChoose?.colorName)) {
      // console.log(itemCart);
      let itemCartRemove = { ...itemCart }
      itemCartRemove.quantity = 0
      itemCart.size = sizeChoose
      itemCart.color = colorChoose
      onChangeItem(itemCart.id, itemCart, itemCartRemove)
    }
  }, [sizeChoose, colorChoose])

  return (
    <div className={`${className} ${size == 'sm' && 'py-6'} ${size == 'cart' && 'py-4'} py-5 flex items-center `}>
      {change && (
        <div>
          <label>
            <input
              className="hidden"
              type="checkbox"
              checked={itemChoose}
              onChange={handleChecked}
            />
            <div
              className={`w-6 sm:w-7 lg:mt-7 aspect-square p-1 border-2 flex items-center justify-center rounded-sm ${itemChoose ? "bg-main" : ""
                }`}
            >
              {itemCart.size.total > 0 && itemChoose && <TickIcon />}
            </div>
          </label>
        </div>
      )}
      <div
        className={clsx({
          "gap-6": size == 'sm',
          "gap-4": size == 'cart',
          "gap-8": size == 'normal',

        }, `flex-1 flex flex-row ${change ? "pl-2 ssm:pl-3 sm:pl-6" : ""
        }`)}
      >
        <img
          className={` 
          false 
          max-w-[64px]
           max-h-[64px]  
          lg:w-[240px] aspect-square object-contain lg:mt-7`
          }
          src={itemCart.image}
          alt=""
        />

        <div className="flex-1 min-h-full flex flex-col justify-between">
          <div className="flex justify-between gap-3">
            <div className="flex-1 relative">
              <div className="flex gap-3 justify-between items-center pt-9">
                <div className={`flex flex-wrap ${payment ? "" : "lg:w-1/4"} border-l-2`}>
                  <Link to={ROUTES.product.detail(itemCart.id)} className={clsx("hover:cursor-pointer text-normal text-black mb-2 line-clamp-2 pl-1", { "mb-1 text-wap-regular2": size == 'cart' })}>
                    {itemCart.name}
                  </Link>
                  <div className={`w-full`}>
                    <div className="flex justify-between">
                      <label className={`font-bold text-main pl-1 mb-2 ${payment ? "block" : "hidden"} `}>x{itemCart.quantity}</label>
                      <div className={`text-main pl-1 font-bold ${payment ? "block" : "block lg:hidden"} `}>{formatMoney(itemCart.price)}</div>
                    </div>
                  </div>
                </div>
                {size == 'normal' &&
                  <>
                    <div className="text-main text-text font-bold">{formatMoney(itemCart.price)}</div>
                    {itemCart.size.total == 0 ? <span>Đã hết hàng</span> :
                      <AmountChange
                        className="text-normal2"
                        quantity={quantity}
                        descActive={quantityDescActive}
                        ascActive={quantityAscActive}
                        handleIncrease={handleIncrease}
                        handleDecrease={handleDecrease}
                      />}
                    <div className="text-[#FF7D03] font-bold pr-8">{formatMoney(itemCart.price * itemCart.quantity)}</div>
                    <div className="min-h-full flex">
                      <RemoveCartIcon onClick={handleRemoveFromCart}>
                      </RemoveCartIcon>
                    </div>
                  </>
                }
              </div>
            </div>
          </div>
          <div>
            {change && size == 'cart' &&
              <div className="mt-2 sm:mt-4">
                <div className="flex justify-between items-center mt-2 sm:mt-4">
                  {itemCart.size.total == 0 ? <span>Đã hết hàng</span> :
                    <AmountChange
                      className="text-wap-regular2 mt-4"
                      quantity={quantity}
                      descActive={quantityDescActive}
                      ascActive={quantityAscActive}
                      handleIncrease={handleIncrease}
                      handleDecrease={handleDecrease}
                    />}
                  <div className="min-h-full flex">
                    <RemoveCartIcon onClick={handleRemoveFromCart}>
                    </RemoveCartIcon>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductNew;