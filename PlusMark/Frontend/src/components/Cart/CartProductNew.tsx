import { CircleFilledIcon, DeleteIcon, TickIcon } from "@assets/icons";
import DiscountFlag from "@components/Flag/DiscountFlag";
import AmountChange from "@components/common/AmountChange";
import ColorSizeChoose from "@components/product/choose/ColorSizeChoose";
import { CartItem, useCart } from "@contexts/CartContext";
import ProductServices, { ProductColor, ProductItem, ProductSize } from "@services/ProductServices";
import { ROUTES } from "@utility/constants";
import { formatMoney } from "@utility/helper";
import clsx from "clsx";
import {  useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  itemCart: CartItem, 
  change?: any, 
  size: string, 
  border?: any,
  className?: string
}

const CartProductNew = ({className, itemCart, change, size, border}: Props) => {
  const {onChangeItem, chooseProduct} = useCart()
  const [checked, setChecked] = useState<boolean>(itemCart.choose || false);
  const [quantityDescActive, setQuantityDescActive] = useState<boolean>(false);
  const [quantityAscActive, setQuantityAscActive] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(itemCart.quantity);
  const [openChoseSizeColor, setopenChoseSizeColor] = useState(false)
  const [productData, setproductData] = useState<ProductItem>()
  
  const [sizeChoose, setsizeChoose] = useState<ProductSize | undefined>(itemCart.size)
  const [colorChoose, setcolorChoose] = useState<ProductColor | undefined>(itemCart.color)


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
    if(itemCart.quantity > 0) {
      setQuantityDescActive(true)
    } else {
      setQuantityDescActive(false)
    }

    if(itemCart.size.total <= itemCart.quantity) {
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
  
  const handleIncrease = () => {
    if(quantity + 1 <= itemCart.size.total) {
      setQuantity((prev) => 1 + prev);
      itemCart.quantity += 1
      onChangeItem(itemCart.id, itemCart)
      setQuantityDescActive(true)
      if(quantity + 1 == itemCart.size.total) {
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
    
    if(sizeChoose && colorChoose && (itemCart.size?.sizeName != sizeChoose?.sizeName || itemCart.color?.colorName != colorChoose?.colorName)) {
      // console.log(itemCart);
      let itemCartRemove = {...itemCart}
      itemCartRemove.quantity = 0
      itemCart.size = sizeChoose
      itemCart.color = colorChoose
      onChangeItem(itemCart.id, itemCart, itemCartRemove)
    }
  }, [sizeChoose, colorChoose])

  return (
    <div className={`${className} ${border && 'border-b'} ${size == 'sm' && 'py-6'} ${size == 'cart' && 'py-4'} py-10 flex items-center border-b-[1px] botder-b-backgroud-100`}>
      {change && (
        <div>
          <label>
            <input
              className="hidden"
              type="checkbox"
              checked={checked}
              onChange={handleChecked}
            />
            <div
              className={`w-6 sm:w-8 aspect-square p-1 border-2 flex items-center justify-center rounded-sm ${
                checked ? "bg-main" : ""
              }`}
            >
              {itemCart.size.total > 0 && checked && <TickIcon />}
            </div>
          </label>
        </div>
      )}
      <div
        className={clsx({
          "gap-6": size == 'sm',
          "gap-4": size == 'cart',
          "gap-8": size == 'normal',
          
        }, `flex-1 flex flex-row ${
          change ? "pl-2 ssm:pl-3 sm:pl-6" : ""
        }`)}
      >
        <img
          className={` 
            ${size == 'sm' && 'max-w-[64px] sm:max-w-[120px]'} 
            ${size == 'cart' && 'max-w-[64px] sm:max-w-[100px]'} 
            w-[240px] aspect-square object-contain`
          }
          src={itemCart.image }
          alt=""
        />

        <div className="flex-1 min-h-full flex flex-col justify-between">
          <div className="flex justify-between gap-3">
            <div className="flex-1 relative">
              <div className="flex items-center justify-between gap-3 ">
                <Link to={ROUTES.product.detail(itemCart.id)} className={clsx("hover:cursor-pointer text-normal font-semibold text-black mb-2 line-clamp-2 ", {"mb-1 text-wap-regular2": size == 'cart'})}>
                  {itemCart.name}
                </Link>
                {change && size == 'normal' && <div className="text-main text-normal2 font-bold">{formatMoney(itemCart.price)}</div>}
              </div>
              <div className={clsx("  hover:cursor-pointer text-normal font-semibold text-black", {"text-wap-regular2": size == 'cart'})}
                onClick={() => {setopenChoseSizeColor(!openChoseSizeColor)}}
              >
                {sizeChoose && sizeChoose.sizeName}
                 {/* / {colorChoose && colorChoose.colorName} */}
              </div>
              {
                change && 
                  <div className={clsx("   z-10 absolute -translate-x-1/2 lg:translate-x-0 left-4 lg:left-0 top-[calc(100%_+_4px)] lg:top-[calc(100%_+_18px)] bg-white rounded-md p-4  border border-gray-100", {
                    "block": openChoseSizeColor,
                    "hidden": !openChoseSizeColor
                  })}
                  style={{boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}  
                >
                  <div className="hidden lg:block absolute left-6 -top-2.5 w-5 h-5 rotate-45 border-t border-l "></div>
                  <div className="w-fit h-fit bg-white"> 
                    <ColorSizeChoose 
                      sizeChoose={sizeChoose} 
                      colorChoose={colorChoose}
                      colorPicker={productData?.colors}
                      onChangeSize={setsizeChoose}
                      onChangeColor={setcolorChoose}
                      close={setopenChoseSizeColor}
                    />
                  </div>
                </div>
              }
            </div>
            {
              size == 'cart' && 
              <button className="hover:text-black  w-6 h-6 flex justify-center items-center text-gray-200 border border-gray-200 text-normal1 pb-1 "
                onClick={handleRemoveFromCart}
              >
                x
              </button>
            }
          </div>
          <div className="">
            {change && size == 'normal' ? (
              <div className="flex items-center justify-between">
                {itemCart.size.total == 0 ? <span>Đã hết hàng</span> :
                <AmountChange 
                  className = " text-normal2"
                  quantity={quantity}   
                  descActive={quantityDescActive}
                  ascActive={quantityAscActive}
                  handleIncrease={handleIncrease}
                  handleDecrease={handleDecrease}
                /> }
                <div className="min-h-full flex items-end">
                  <button onClick={handleRemoveFromCart}>
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            ) :  size == 'cart' ? (
              <div className="flex justify-between items-center mt-2 sm:mt-4">
                 {itemCart.size.total == 0 ? <span>Đã hết hàng</span> :
                 <AmountChange 
                  className = "text-wap-regular2 "
                  quantity={quantity}   
                  descActive={quantityDescActive}
                  ascActive={quantityAscActive}
                  handleIncrease={handleIncrease}
                  handleDecrease={handleDecrease}
                /> }
                <div className="text-main text-normal1 font-bold">{formatMoney(itemCart.price)}</div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <p className="text-wap-regular2 py-2 text-main">
                  x
                  <span className="px-3 text-main">{quantity}</span>
                </p>
                <div className="text-main text-normal1 font-bold">{formatMoney(itemCart.price)}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductNew;
