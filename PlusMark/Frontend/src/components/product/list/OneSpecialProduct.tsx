
import Banner from '@components/Banner/Banner'
import ProductCard from '@components/Card/ProductCard'
import useI18n from '@hooks/useI18n'
import { ProductItem } from '@services/ProductServices'
import { some } from '@utility/helper'
import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
  name: string,
  banner: string[],
  data: ProductItem[]
}

function OneSpecialProduct({name, data, banner}: Props) {
    const { t } = useI18n()
    const [height, setHeight] = React.useState(0);

  return (
    <div className='mt-7 lg:mt-10 pb-9'>
        <h2 className='font-bold text-title xl:text-header2 text-main text-center pb-5 lg:pb-9'>{name}</h2>
        <div className="">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-7">
              <div className="col-span-2 h-fit">
                <Banner className={` w-full`} images={banner}  style={{height: height > 0 ? height + "px" : "fit"}}/>
                {/* <img
                    className="w-full h-56 lg:h-auto object-cover rounded-md"
                    src={"/images/product-hot.png"}
                    alt="category"
                /> */}
              </div>
              {
                data.map((p, i) => {
                  return <ProductCard product={p} hover heightProduct={height} setHeightProduct={setHeight} key={p.id} index={i} />
                })
                
              }
            </div>
        </div>
        <div className="flex justify-center">
          <Link to="/filter" className="text-normal lg:text-normal2 uppercase  mx-auto rounded-md px-5 py-4 border-main border-[2px] w-fit mt-6">
            {t("homepage.recently_product.see_more")}
          </Link>
        </div>
    </div>
  )
}

export default OneSpecialProduct