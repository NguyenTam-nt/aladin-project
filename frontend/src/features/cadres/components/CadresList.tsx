import { ImageTranslation } from "@components/ImageTranslation";
import Pagination from "@features/news/components/Paginnation";
import React from "react";

const dumyItems = [
  {
    imageUrl : "https://s3-alpha-sig.figma.com/img/261a/531d/1d0e01f0952185440e03681d5c2666cd?Expires=1685318400&Signature=o66zwYhgYfNHF9-9qdp2wm-99RGtlWUWfhgLQJTwG9U3IksxpDiyf~yZc2O1aPc0CQLVGStw1OvUn1qL4D76NkFUs9jjDH3GXi1c~funyTAJBw5Cb1RZ5seqbDOXQJE~fpe14Cz7V7AHDF1lJ2z4WfEZsd7gnJB1Pu1ZXZEFhWZh5XnxI9TNziDcRjN07t~b5iSdHTpSFka8GKaflo~JeDzpGJsnDpgB0H1Sx0ZwqwsvcSkLv4CqnQ5ynx4cnJ5HiM0FZBiq0wu3Wk1AP09-vL23LRQDyKPhYaoOfVFBZUnw5~wW2jvRh3QIz5HlhFAHvVOJvQDYqhPGLiua-n4~Jw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" ,
    name : "Trần Hà linh" ,
    sub : "Giảng viên - Tiếng Anh" 
  } ,
  {
    imageUrl : "https://s3-alpha-sig.figma.com/img/3b6e/2c35/6589f6135cdea7acd8d1844588821353?Expires=1685318400&Signature=MCZbQW4b9Z2YNPU83JD5J6whe~JVgxhJuTlVcFjw-vIE7aEbRges863NSlAB82cCi8qltJeT3c8VPyDSzSRar0tN5FiaqsRBXYRnQoXDO9GE9SGeodSDSJYC5tvXiB6108Im6SIvIe-jpLLNYVLZYMjuo15Kw-cz4ayjdjnn-zSc75mIeb2JZnVNIG2iZCiIt07R9RkiifE3MH5gKn1WzrFEwkGQ60zssAsW9lXV5SxqVk6952ulTkf9veas9LxHsp2lQE~OCkP~uIPf-rC9s2aLQysS6r9V~0~xaryIq6NpVSag8vmQ6GKsvsBT7xq6SWv0A1q7oZTF3u1KxIKzDg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" ,
    name : "Nguyễn Thanh Tâm" ,
    sub : "Giảng viên - Tin học" 
  } ,
  {
    imageUrl : "https://s3-alpha-sig.figma.com/img/4566/bdfc/5ccc5e00e9e5717dc438be37b2690d62?Expires=1685318400&Signature=HXronoJPGzTruBBVy4bQrPobUNsMAJ2GzAhSOG1a0yNn1kGG70SXtka8YWvtOhluHzdutEMl8SLdsa2jlgB4dg4ipP4TFUDPV-mLrhrhYO0bCeTLqvQzGG3g8YKFSdvAlSjUaO4CgWLklsKDdQDoXKVAJ~CV1VjujYR6cqWGyZiYJwwN8k-zXXSymZVuTB~5unkJrEtXm9bqn5s0PgMeEyBIiVWhWKAtOV0pDJAI1sQPutmw71l9gHgh1gfg58KegkE71gRS1d8zszxmVnjkHtwL2gdsBO7ylOBvVan3jkc5XSPCH-FEYL5ivG1bhDb8m8MI8xBgFXjkul2k8Zv2EA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" ,
    name : "Ngô Thị Phương Lan" ,
    sub : "Giảng viên - Giải tích" 
  },
  {
    imageUrl : "https://media.istockphoto.com/id/1140940699/vi/anh/ph%E1%BB%A5-n%E1%BB%AF-t%E1%BB%B1-tin-v%E1%BB%9Bi-m%C3%A1i-t%C3%B3c-h%E1%BB%93ng.jpg?s=612x612&w=0&k=20&c=JN7sZ4zYvzZcyQi1f3X5Q3x2zKDAhANmovCrKndnGaA=" ,
    name : "Trần Bảo Ngọc" ,
    sub : "Giảng viên - Giải tích" 
  },
  {
    imageUrl : "https://s3-alpha-sig.figma.com/img/a588/7973/180d32875567ae1a042114362a283edb?Expires=1685318400&Signature=fvmv~uX5DgsLGf-BKlaRtr6udR8MXa2MCJ8wHz3J1qmcZ~sTXaHUb0-VqpMzw2vz03v5fMvlzI1Iu9B1TYmxPJTiZgRkp343-dsjffy7MqYBnFNUQV4zV~wBoNIqD38Z~16PGnMuuSBUwN3rUeplGNXFVSHTJV7FvfEAxy-zMx55SdesbLB11uvjmPvVEBUdRp5WTgK7y7~gdC5mU4SE1sakIvkr4GnjoCo7puUPgOW6W9iFRJHJKotKI6oXswacKls82CZUaoZVzT771banuXzOPBObUglvQC8hXkNSYNDtE7SIaA65eJYpJfRzqT7hk0FvuIDtK1RVZ9-6x~WfgA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" ,
    name : "Lê Huy Chuẩn" ,
    sub : "Giảng viên - Xác suất - Thống kê" 
  } ,
  {
    imageUrl : "https://media.istockphoto.com/id/907865186/vi/anh/ng%C6%B0%E1%BB%9Di-%C4%91%C3%A0n-%C3%B4ng-%C4%91%E1%BA%B9p-trai.jpg?s=612x612&w=0&k=20&c=pC1TdEDFGnGJwHSKxqu6bUTLpwApsOxjlvcxY0Y1M5A=" ,
    name : "Phó Đức Tài" ,
    sub : "Giảng viên - Toán Sinh thái - Môi trường" 
  } ,
  {
    imageUrl : "https://media.istockphoto.com/id/1277996375/vi/anh/ch%C3%A2n-dung-studio-ng%C6%B0%E1%BB%9Di-ph%E1%BB%A5-n%E1%BB%AF-tr%E1%BA%BB-h%E1%BA%A1nh-ph%C3%BAc.jpg?s=612x612&w=0&k=20&c=G-AhkFbYJ-kwuSWiCefFOyglCYntVhIltjWStG-rf9Y=" ,
    name : "Đỗ Thanh Hà" ,
    sub : "Giảng viên - Toán ứng dụng" 
  } ,
  {
    imageUrl : "https://media.istockphoto.com/id/1319848866/vi/anh/headshot-c%E1%BB%A7a-ng%C6%B0%E1%BB%9Di-ph%E1%BB%A5-n%E1%BB%AF-thanh-l%E1%BB%8Bch-t%E1%BB%B1-tin.jpg?s=612x612&w=0&k=20&c=Ch-YLh4XMrfFFXLX0QpILWx66raSmDt9gJvpPCdNST8=" ,
    name : "Phùng Thị Thuý" ,
    sub : "Giảng viên - Đại số" 
  } ,

]

const dumyItem2 = [
  {
    imageUrl : "https://salt.tikicdn.com/cache/w1200/media/catalog/product/b/i/bia.u2469.d20160905.t102129.472049.jpg" ,
    name : "Tiếng Hàn 1" ,
    sub :  "Tempor feugiat iaculis ultrices" 
  } ,
  {
    imageUrl : "https://katchup.vn/asset/upload/2018/09/Sach-Tu-dien-Han-Viet-%E2%80%93-Le-Huy-Khoa-Bia-cung-%E2%80%93-Co-lon-0-472x600.jpg" ,
    name : "Tiếng Hàn 2",
    sub :  "Tempor feugiat iaculis ultrices" 
  } ,
  {
    imageUrl : "https://newshop.vn/public/uploads/products/10100/cam-nang-tieng-han-trong-giao-tiep-thuong-mai-tap-1-bia.jpg" ,
    name : "Tiếng Hàn 3" ,
    sub :  "Tempor feugiat iaculis ultrices" 
  },
  {
    imageUrl : "https://s3-alpha-sig.figma.com/img/69c8/967d/c1c605d88bf61bcbbd1de9b2ee9d6a97?Expires=1685318400&Signature=md85AyTb2xLVuoGHA1He8boi9IjamQ4SPInoIGTM5skx9Nrsg21T34khSWqrZX~qBEs9Dxtl9iDbQ5IxxVe4GDjF1Y9e-XHl3cuurAWfwOzanS7IeuUZe3j7J7c7wxq9AKV32lMzwpe1toiTAGatMBjJAVPmLNm3~gRTP51d4n4T3H-nAeXlqLxc7DiC4CEF1f4wbI1usr-Aq0XobV4nfSy81phkPKkYM3OXtcXEdcDVhH5wHmFtw5zseCDSB6UmWFxOFwuJc6BU2oRLhxr-mVQr8S5HA~16rinMKygbgdrG16dYVFSi0tSLrg9qzWAht8MQp6k6gc90L419i5Glrg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" ,
    name :  "Tiếng Hàn 4",
    sub : "Tempor feugiat iaculis ultrices" 
  },
  {
    imageUrl : "https://bizweb.dktcdn.net/100/318/046/products/hoc-tieng-han-that-la-don-gian-trinh-do-so-cap-bia-truoc-1.jpg?v=1626444842427" ,
    name :  "Tiếng Hàn 5" ,
    sub : "Tempor feugiat iaculis ultrices" 
  } ,
  {
    imageUrl : "https://mcbooks.vn/wp-content/uploads/2019/02/bia-sau.png" ,
    name : "Tiếng Hàn 6",
    sub : "Tempor feugiat iaculis ultrices" 
  } ,
  {
    imageUrl : "https://sach.info/wp-content/uploads/2022/12/image_188259-5.jpg" ,
    name :  "Tiếng Hàn 7" ,
    sub : "Tempor feugiat iaculis ultrices" 
  } ,
  {
    imageUrl : "https://kanata.edu.vn/wp-content/uploads/2019/09/25.png" ,
    name :  "Tiếng Hàn 8" ,
    sub : "Tempor feugiat iaculis ultrices" 
  } ,

]

interface INewsItem  {
  imageUrl : string ,
  name : string ,
  sub : string , 
}


const NewsItem = (props : INewsItem) => {
  const { imageUrl, name, sub  } = props
  return (
    <div className="h-[212px] xl:h-[461px]  bg-bg_FAFAFA ">
      <div className=" overflow-hidden h-[212px] xl:h-[461px] relative flex flex-1">
        <ImageTranslation link={imageUrl}></ImageTranslation>
        <div className=" absolute  bottom-0 left-0  bg-bg_0_0_0_003 h-[84px] w-full flex items-center  text-center justify-center">
          <div>
            <p className=" text-_14 xl:text-_16   text-text_white font-bold  leading-[28px] ">{name}</p>
            <p className="text-_12 xl:text-_14 text-text_white ">{sub}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


interface CadresListProps {
  type?: boolean
}


const CadresList = (props : CadresListProps ) => {
  return (
    <>
      <div className="grid grid-cols-2  xl:grid-cols-4 gap-[24px] mt-[24px]">
        {(!props?.type ? dumyItems : dumyItem2).map((item, index) => (
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
