import { CircleFilledIcon } from '@assets/icons'
import ColorPicker from '@components/ColorPicker/ColorPicker'
import HotDiscountFlag from '@components/Flag/HotDiscountFlag'
import SizePicker from '@components/SizePicker/SizePicker'
import { CartItem, useCart } from '@contexts/CartContext'
import { ToastContex } from '@contexts/ToastContex'
import useViewport from '@hooks/useViewPort'
import { ProductColor, ProductItem, ProductSize } from '@services/ProductServices'
import { ROUTES } from '@utility/constants'
import { formatMoney, some } from '@utility/helper'
import clsx from 'clsx'
import React, { useState, useEffect, useContext, useLayoutEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

type Props = {
  hover?: boolean, 
  product: ProductItem,
  heightProduct?: any,
  setHeightProduct?: any,
  index?: number
}

function ProductCard({product, hover, heightProduct, setHeightProduct, index}: Props) {

  const navigate = useNavigate()
  const {onChangeItem} = useCart()
  const { listToast, onAddToast } = useContext(ToastContex);
  const { width } = useViewport()
  const ref = React.useRef<any>(null);
  const [height, setHeight] = React.useState(0);
  const [imageView, setimageView] = useState(product.images[0])
  const [colorSelected, setcolorSelected] = useState<ProductColor | undefined>(product?.colors[0])
  const [sizeSelected, setsizeSelected] = useState<ProductSize | undefined>()

  
  useEffect(() => {
    // setsizeSelected(product.colors[0].sizes[0])
    // setcolorSelected(product.colors[0])
  }, [])

  useEffect(() => {
    // if(colorSelected?.image) {
    //   setimageView(colorSelected?.image || product.images[0])
    // }
    setSize()
  }, [colorSelected])
  
  useLayoutEffect(() => {
      handleSetHeight()
  }, [ref.current, width ])

  const setSize = () => {
    setsizeSelected(undefined)
    if(colorSelected && colorSelected.sizes) {
      for(let i = 0; i < colorSelected.sizes.length; i++) {
        if(colorSelected.sizes[i].total > 0) {
          setsizeSelected(colorSelected.sizes[i])
          break
        }
      }
    }
  }

  const handleSetHeight = () => {
    if (ref.current && ref.current.getBoundingClientRect().height) {
      setHeight(ref.current.getBoundingClientRect().height);
      
      if(setHeightProduct ) {
        if(width > 1280) {
          if((index == 0 || index == 1) && heightProduct < ref.current.getBoundingClientRect().height) {
            setHeightProduct(ref.current.getBoundingClientRect().height)
          }
        } else if(index == 0 && heightProduct < ref.current.getBoundingClientRect().height) {
          setHeightProduct(ref.current.getBoundingClientRect().height)
        }
      }
    }
  }

  
  const handleBuyNow = () => {
    
    if(!colorSelected || !sizeSelected) {
      onAddToast({ type: "error", message: `Số lượng sản phẩm đã hết!` });
      return
    }
    
    const cartItem: CartItem = {
      id: product?.id || "",
      name: product?.name || "",
      image: product.images[0] || colorSelected.image || "",
      price: sizeSelected.priceSale || 0,
      size: sizeSelected,
      color: colorSelected,
      quantity: 1,
      choose: true,
      sku: product?.sku || "",
    }
    onChangeItem(product?.id || "", cartItem)
    navigate("/cart")
  }
  
  
  return (
    <div className={clsx(`relative mt-4 lg:mt-0 hover:cursor-pointer`)} style={{height: height > 0 ? height + "px" : "fit"}}>
      <div className={
          clsx(' relative  z-1 bg-white   rounded-md transition-all',
            {"group hover:p-4 hover:absolute hover:-top-2 hover:-left-2 hover:w-[calc(100%_+_16px)] hover:z-10 hover:shadow-lg hover:border-[3px] hover:border-gray-200 hover:cursor-pointer": hover}
          )} ref={ref} >
        <div className="rounded-md  relative"
          onClick={() => {navigate(ROUTES["product"].detail(product.id))}}
        >
          <img
                className="w-full aspect-square object-cover rounded-md"
                src={product.images[0]}
                alt="category"
          />
          {
            sizeSelected && sizeSelected.sale > 0 &&  <div className="absolute top-0 left-0">
              <div className="py-1 px-1 lg:px-2 flex items-center bg-icon text-normal2 font-bold text-main rounded-tl-md rounded-br-md">
                {sizeSelected.sale}%
              </div>
            </div>
          }
        </div>
        <Link to={ROUTES["product"].detail(product.id)}>
          <h3 className='text-wap-regular2 lg:text-normal font-semibold mt-2 lg:mt-3 mb-1 line-clamp-2'
          >{product.name}</h3>
        </Link>
        <div className="flex flex-col gap-1 lg:py-1 flex-wrap items-baseline">
          <div className="text-main text-normal lg:text-normal1 font-semibold lg:font-bold">{formatMoney(sizeSelected?.priceSale || product.price || 0)}</div>
          <div className="text-background-100 text-wap-regular2 line-through">
            {sizeSelected && sizeSelected.sale > 0 && formatMoney(product.price || 0)}
          </div>
        </div>
        {/* <div className="hidden group-hover:flex justify-center ">
          <div className="flex gap-3 py-1 lg:py-2">
            {product.colors.map((it, idx) => ( 
                <ColorPicker hiddenText selected={colorSelected} data={it} key={idx} handleClick={setcolorSelected}/>
              ))
            }
          </div>
        </div> */}
        
        <div className="hidden group-hover:flex mt-1 justify-center">
          <div className="flex justify-center ] flex-wrap  w-fit mx-auto">
            {
              colorSelected && colorSelected.sizes.map((s, i) => {
                return <SizePicker selected={sizeSelected} data={s} handleClick={setsizeSelected} key={i}/>
              })
            }
          </div>
        </div>
        <div className="hidden group-hover:flex justify-center mt-2">
          <button  className="btn  text-white bg-main text-wap-regular2 md:text-normal lg:text-normal2 font-bold px-2 py-2.5 md:px-8 md:py-3 h-fit  rounded-md flex items-center gap-1"
            onClick={handleBuyNow}
          >
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard