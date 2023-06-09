import React, { memo, useState } from 'react'
import { DiscountItem } from '../DiscountItem';
import { formatNumberDot } from '@commons/formatMoney';
import { MoneyLineThrough } from '../MoneyLineThrough';
import { Button } from '@components/Button';

export const TopicMenuItem = memo(() => {
    const [count, setCount] = useState(1);
    const handleMinusCount = () => {
      if(count <= 1) return
      setCount(count => count - 1)
    }
  
    const handlePlusCount = () => {
      // if(count <= 1) return
      setCount(count => count + 1)
    }
  
    return (
      <div className="radius-tl-br flex flex-col overflow-hidden relative h-[492px] max-h-auto bg-white">
        <DiscountItem discount={30} />
        <div className="h-[312px] w-full">
          <img
            className="w-full h-full"
            src="https://s3-alpha-sig.figma.com/img/579d/3c95/b57c670f37f72c0fd934419fc49f5a78?Expires=1687132800&Signature=nnB5CB3xuAgNPpmhie8~qiYxBhx2gBNPCORP~y6pJklisKnI1mGxwbu8ecp9jf6w88kxp84QAD1F5HNG60U8Ikwr7IQT-Y6-QEAP6b8Lzr4XhpG8QSGD7hAZEFx~h70EIZaEyqUgKoIceRr-X2TqwjoszAIdbv2tEj-0e2fvLWLvyDOOr1W~iIve8c55WBE6yQSIGIt2Huupy239CUsVmZmFA1GhhdbAjmjH0bZbGmXCby8ZJgj6jSJl4dVoRT~0ZxU8noZrL6QW75fQ-ETmQcGY2Yxyn3dabj~-E5kysOqAfi3WyLgqnIdzXKZsDqXs~nEhXspHWWC9B~1sT9~bIA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            alt=""
          />
        </div>
        <div className="p-[16px] flex-1 flex flex-col">
          <p className="text-GreyPrimary text-_16 font-semibold line-clamp-2">
            Combo 2 Người lớn ăn thả ga không lo hết món
          </p>
          <p className="text-_18 font-bold mt-2 text-secondary">
            {formatNumberDot(600000)}
            <MoneyLineThrough money={800000} />
          </p>
          <div className="flex flex-1 max-h-[48px] justify-between items-end mt-auto gap-x-[16px]">
            <div className="flex items-center self-center flex-1 gap-x-[16px] text-GreyPrimary text-_14 font-semibold">
              <button onClick={handleMinusCount} className="text-_24 w-[30px] h-[30px]  flex items-center justify-center hover:shadow rounded">-</button>
              <span className=" break-words">{count}</span>
              <button onClick={handlePlusCount} className="text-_24 w-[30px] h-[30px] flex items-center justify-center hover:shadow rounded">+</button>
            </div>
            <div className="w-[167px]">
              <Button text="Thêm vào giỏ" className="min-w-[167px] h-[48px] !text-_14 font-bold" color="primary" />
            </div>
          </div>
        </div>
      </div>
    );
  });
  