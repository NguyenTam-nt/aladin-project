import { ImageTranslation } from "@components/ImageTranslation";
import Pagination from "@features/news/components/Paginnation";
import React from "react";

const dumyItems = [
  {
    imageUrl : "https://media.istockphoto.com/id/1010215852/vi/anh/c%C3%B4-g%C3%A1i-xinh-%C4%91%E1%BA%B9p-%C4%91%E1%BB%99i-m%C5%A9.jpg?s=612x612&w=0&k=20&c=6XIgByJ0OY5MFiJ83_JDdV3IuP7a39OluBebqERfpO0=" ,
    name : "Trần Hà linh" ,
    sub : "Tiếng Anh" 
  } ,
  {
    imageUrl : "https://media.istockphoto.com/id/1212702108/vi/anh/ch%C3%A0ng-trai-tr%E1%BA%BB-%C4%91%E1%BA%B9p-trai-v%E1%BB%9Bi-b%E1%BB%99-r%C3%A2u-m%E1%BA%B7c-%C3%A1o-len-gi%E1%BA%A3n-d%E1%BB%8B-%C4%91%E1%BB%A9ng-tr%C3%AAn-n%E1%BB%81n-tr%E1%BA%AFng-khu%C3%B4n-m%E1%BA%B7t-h%E1%BA%A1nh-ph%C3%BAc.jpg?s=612x612&w=0&k=20&c=T2QzSy32Olg6DbPR9O_tfRlouR_8ZpoaCiebXzZUoAQ=" ,
    name : "Nguyễn Thanh Tâm" ,
    sub : "Tin học" 
  } ,
  {
    imageUrl : "https://media.istockphoto.com/id/1322686195/vi/anh/ng%C6%B0%E1%BB%9Di-ph%E1%BB%A5-n%E1%BB%AF-t%C3%B3c-v%C3%A0ng-tr%E1%BA%BB-%C4%91%E1%BA%B9p-v%E1%BB%9Bi-m%C3%A1i-t%C3%B3c-d%C3%A0i-gi%E1%BB%AFa-trang-%C4%91i%E1%BB%83m-tinh-t%E1%BA%BF-sang-tr%E1%BB%8Dng-v%C3%A0-t%E1%BA%A1o-ki%E1%BB%83u-t%C3%B3c.jpg?s=612x612&w=0&k=20&c=IHVHCeqWjjSvwGJ52P1muz6PiORnL0ZQbiuZoxfwM-I=" ,
    name : "Ngô Thị Phương Lan" ,
    sub : "Giải tích" 
  },
  {
    imageUrl : "https://media.istockphoto.com/id/1140940699/vi/anh/ph%E1%BB%A5-n%E1%BB%AF-t%E1%BB%B1-tin-v%E1%BB%9Bi-m%C3%A1i-t%C3%B3c-h%E1%BB%93ng.jpg?s=612x612&w=0&k=20&c=JN7sZ4zYvzZcyQi1f3X5Q3x2zKDAhANmovCrKndnGaA=" ,
    name : "Trần Bảo Ngọc" ,
    sub : "Giải tích" 
  },
  {
    imageUrl : "https://media.istockphoto.com/id/1210237745/vi/anh/portarit-c%E1%BB%A7a-m%E1%BB%99t-ng%C6%B0%E1%BB%9Di-%C4%91%C3%A0n-%C3%B4ng-l%E1%BB%9Bn-tu%E1%BB%95i-%C4%91%E1%BA%B9p-trai-ng%E1%BB%93i-tr%C3%AAn-gh%E1%BA%BF-sofa.jpg?s=612x612&w=0&k=20&c=MagGTC_A7eoQUf3npTsgKJpElUM1Ov696hJSYqHg1rY=" ,
    name : "Lê Huy Chuẩn" ,
    sub : "Xác suất - Thống kê" 
  } ,
  {
    imageUrl : "https://media.istockphoto.com/id/907865186/vi/anh/ng%C6%B0%E1%BB%9Di-%C4%91%C3%A0n-%C3%B4ng-%C4%91%E1%BA%B9p-trai.jpg?s=612x612&w=0&k=20&c=pC1TdEDFGnGJwHSKxqu6bUTLpwApsOxjlvcxY0Y1M5A=" ,
    name : "Phó Đức Tài" ,
    sub : "Toán Sinh thái - Môi trường" 
  } ,
  {
    imageUrl : "https://media.istockphoto.com/id/1277996375/vi/anh/ch%C3%A2n-dung-studio-ng%C6%B0%E1%BB%9Di-ph%E1%BB%A5-n%E1%BB%AF-tr%E1%BA%BB-h%E1%BA%A1nh-ph%C3%BAc.jpg?s=612x612&w=0&k=20&c=G-AhkFbYJ-kwuSWiCefFOyglCYntVhIltjWStG-rf9Y=" ,
    name : "Đỗ Thanh Hà" ,
    sub : "Toán ứng dụng" 
  } ,
  {
    imageUrl : "https://media.istockphoto.com/id/1319848866/vi/anh/headshot-c%E1%BB%A7a-ng%C6%B0%E1%BB%9Di-ph%E1%BB%A5-n%E1%BB%AF-thanh-l%E1%BB%8Bch-t%E1%BB%B1-tin.jpg?s=612x612&w=0&k=20&c=Ch-YLh4XMrfFFXLX0QpILWx66raSmDt9gJvpPCdNST8=" ,
    name : "Phùng Thị Thuý" ,
    sub : "Đại số" 
  } ,


]

interface INewsItem  {
  imageUrl : string ,
  name : string ,
  sub : string
}


const NewsItem = (props : INewsItem) => {
  const { imageUrl, name, sub } = props
  return (
    <div className="h-[212px] xl:h-[461px]  bg-bg_FAFAFA ">
      <div className=" overflow-hidden h-[212px] xl:h-[461px] relative flex flex-1">
        <ImageTranslation link={imageUrl}></ImageTranslation>
        <div className=" absolute  bottom-0 left-0  bg-bg_0_0_0_003 h-[84px] w-full flex items-center  text-center justify-center">
          <div>
            <p className=" text-_14 xl:text-_16   text-text_white font-bold  leading-[28px] ">{name}</p>
            <p className="text-_12 xl:text-_14 text-text_white ">Giảng viên - {sub}</p>
          </div>
        </div>
      </div>
    </div>
  );
};



const CadresList = () => {
  return (
    <>
      <div className="grid grid-cols-2  xl:grid-cols-4 gap-[24px] mt-[24px]">
        {dumyItems.map((item, index) => (
          <NewsItem
            imageUrl={item.imageUrl}
            name={item.name}
            sub={item.sub}
            key={index}
          ></NewsItem>
        ))}
      </div>
      <Pagination currentPage={1} totalPages={30} />
    </>
  );
};

export default CadresList;
