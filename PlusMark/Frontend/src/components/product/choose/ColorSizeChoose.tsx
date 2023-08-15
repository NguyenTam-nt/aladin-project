import ColorPicker from '@components/ColorPicker/ColorPicker'
import SizePicker from '@components/SizePicker/SizePicker'
import { ProductColor, ProductSize } from '@services/ProductServices'
import { some } from '@utility/helper'
import React, { useEffect, useState } from 'react'

type Props = {
  sizeChoose?: ProductSize, 
  colorChoose?: ProductColor, 
  colorPicker?: ProductColor[], 
  onChangeSize: any, 
  onChangeColor: any, 
  close: any
}

function ColorSizeChoose({sizeChoose, colorChoose, colorPicker, onChangeSize, onChangeColor, close}: Props) {

  const [size, setsize] = useState(sizeChoose)
  const [color, setcolor] = useState(colorChoose)

  useEffect(() => {
    setcolor(colorChoose)
  }, [colorChoose])
  

  useEffect(() => {
    setsize(sizeChoose)
  }, [color, sizeChoose])

  const handleClickSaveSizeColor = () => {
    onChangeSize({...size})
    onChangeColor({...color})
    close(false)
  }

  return (
    <div className='w-full h-fit'>
      <div className="">
        {/* <div className="flex justify-center gap-5 py-2">
          {colorPicker && colorPicker.map((it, idx) => ( 
            <ColorPicker selected={color} data={it} key={idx} handleClick={setcolor}/>
          ))}
        </div> */}
        <div className="flex justify-center gap-[1px] bg-gray-300 w-fit mx-auto">
          {
            color && color.sizes.map((s, i) => {
              return <SizePicker selected={size} data={s} handleClick={setsize} key={i}/>
            })
          }
        </div>
      </div>
      <div className="flex gap-4 w-full justify-center items-center mt-3">
        <button  className="btn text-normal font-medium border-main border-2 w-fit px-4 min-w-fit h-9 text-center text-main bg-icon "
          onClick={() => close(false)}
        >
          Hủy
        </button>
        <button  className="whitespace-nowrap btn text-normal font-medium bg-main w-fit px-4 min-w-fit h-9 text-center text-white "
          onClick={handleClickSaveSizeColor}
        >
          Xác nhận
        </button>
      </div>
    </div>
  )
}

export default ColorSizeChoose