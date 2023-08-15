import { some } from '@utility/helper'
import React from 'react'
import { Link } from 'react-router-dom'

function NewsItemHome({news}: some) {
  return (
    <div className='mb-4 lg:mb-8 flex lg:flex-col gap-4 lg:gap-0'>
        <div className="w-[40%] h-full sm:h-[168px] lg:h-[358px] lg:w-full rounded-md">
            <img src={news.imageUrl}  className='w-full h-full object-cover rounded-md' alt="news" />
        </div>
        <div className="flex-1">
          <Link to={"/about-us/news/" + news.id} className='line-clamp-2 text-normal1 lg:text-normal2 font-semibold lg:font-bold text-black mb-2 lg:mb-0 lg:mt-5'>
            {news.title}  
          </Link>
          <p className='line-clamp-3 sm:line-clamp-4 md:line-clamp-5'>
            {news.describe}  
          </p>
        </div>
    </div>
  )
}

export default NewsItemHome