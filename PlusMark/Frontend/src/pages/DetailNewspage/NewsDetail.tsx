import convertToHtml from "@utility/convertoHtml";
import moment from 'moment';
import { DATE_FORMAT_3 } from "@utility/moment";
import { some } from "@utility/helper";


type Props = {
    news: some;
};

export default function NewsDetail({news}: Props) {

    // console.log(news)
    
    return (
        <div className="mb-8">
            <div className="mb-4 lg:mb-6 pb-5 lg:pb-7 border-b-[1px] border-b-gray-100">
                <img className="w-full  rounded-lg object-cover h-auto lg:h-[50vh]" 
                    src={news.imageUrl ? news.imageUrl : ""} alt="news avatar" />
                <h3 className="text-normal1 lg:text-normal2 font-bold mt-8 mb-4">
                    {news?.title}
                </h3>
                <p className="text-main text-wap-regular2">{news && (news.createdAt || news.updatedAt) ? moment(news.createdAt || news.updatedAt).format(DATE_FORMAT_3) : ''}</p>
            </div>
            <div className="mb-4">
                <p className="text-wap-regular2 lg:text-normal1 font-semibold lg:font-bold ">{news?.describe}</p>
            </div>
            {
                news ? (
                    <div className="leading-tight font-normal myEditor" dangerouslySetInnerHTML={{__html: news.content ? convertToHtml( news.content  ) : "" }}>
                    </div>
                    ): <></>
            }
        </div>
    )
}
