import { News } from '@pages/Newspage/Banner';
import { some } from '@utility/helper';
import clsx from 'clsx';
import React from 'react'
import { Link } from 'react-router-dom'


function RelatedNewsItem({ type, news }: some) {
  return (
    <div>
        <Link
            to={`/about-us/news/${news.id}`}
            className={clsx("flex gap-2 mb-5 border-b-[1px] border-b-gray-100 pb-4", {"flex-col": type})}
        >
            <div className={clsx("w-1/3 h-full rounded-md", {"h-48 lg:h-48 xl:h-64 w-full": type})}>
                <img
                    src={news && news.imageUrl ? news.imageUrl : ""} 
                    alt="news1"
                    className="w-full h-full object-cover rounded-md"
                />
            </div>
            <div className="flex-1">

            <p className={clsx(" leading-[18.5px]", {"text-normal1 font-bold": type, "text-wap-regular2 font-semibold": !type})}>
                {news.title}
            </p>
            </div>
        </Link>
    </div>
  )
}

export default RelatedNewsItem