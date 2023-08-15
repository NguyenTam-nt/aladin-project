
import { some } from '@utility/helper';
import { DATE_FORMAT_3 } from '@utility/moment';
import moment from 'moment';
import { Link } from 'react-router-dom';

function NewsItem({ type, news }: some) {
  
  return (
    
    <Link to={`/about-us/news/${news.id}`} className='flex gap-4 gl:gap-8 mb-6 min-h-[160px] '>
      <div className="w-1/3 rounded-md">
          <img className="w-full h-full object-cover rounded-md aspect-video" src={news.imageUrl ? news.imageUrl : "/images-raw/news/news-item-image.png"} alt='news images'/>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="">
          <h3 className="text-normal1 lg:text-normal2 font-bold line-clamp-1  border-b-main border-b-[1px] border-transparent">
            {news.title}
          </h3>
          <p className="mt-4 text-wap-regular2 lg:text-normal1 text-[#303030]  line-clamp-3">
            {news.describe}
          </p>
        </div>

        <p className="text-main text-wap-regular2 mt-4">
          {news && (news.createdAt || news.updatedAt) ? moment(news.createdAt || news.updatedAt).format(DATE_FORMAT_3) : ''}
        </p>
      </div>
    </Link>
  )
}

export default NewsItem