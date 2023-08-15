import { CartIcon, CircleFilledIcon } from "@assets/icons";
import HotDiscountFlag from "@components/Flag/HotDiscountFlag";
import { CartItem, useCart } from "@contexts/CartContext";
import { ToastContex } from "@contexts/ToastContex";
import { ProductItem } from "@services/ProductServices";
import { ROUTES } from "@utility/constants";
import { formatMoney } from "@utility/helper";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

interface Props {
  data: ProductItem;
}
const HotSaleProductCard = (props: Props) => {
  const navigate = useNavigate()
  const { data } = props;
  const {onChangeItem} = useCart()
  const { listToast, onAddToast } = useContext(ToastContex);
  // console.log(data);

  const handleBuyNow = () => {
    let size, color;
    for(let i = 0; i < data.colors.length; i++) {
      for(let j = 0; j < data.colors[i].sizes.length; j++) {
        if( data.colors[i].sizes[j].total > 0) {
          size = data.colors[i].sizes[j]
          color = data.colors[i]
          break
        }
      }
    }
    
    if(!size || !color) {
      onAddToast({ type: "error", message: `Số lượng sản phẩm đã hết!` });
      return
    }
    
    const cartItem: CartItem = {
      id: data?.id || "",
      name: data?.name || "",
      image: color.image || data.images[0] || "",
      price: size.priceSale || 0,
      size: size,
      color: color,
      quantity: 1,
      choose: true,
      sku: data?.sku || "",
    }
    onChangeItem(data?.id || "", cartItem)
    navigate("/cart")
  }
  
  return (
    <div className="relative h-full hover:cursor-pointer"
    >
      <div className="aspect-[2/3] flex flex-col items-center p-4 md:p-6 lg:p-4 2lg:p-6 xl:p-6  bg-white rounded-lg border shadow">
        <img
          className="w-full aspect-square object-cover"
          src={(data?.images && data?.images[0])}
          alt="category"
          onClick={() => {navigate(ROUTES["product"].detail(data.id))}}
        />
        <div className="flex-1 w-full flex flex-col">
          <Link className="hover:underline" to={ROUTES["product"].detail(data.id)}>
            <h1 className="mt-2 mb-1 text-text text-normal font-semibold line-clamp-2 h-[44px]">
              {data.name}
            </h1>
          </Link>
          {/* <p className="text-wap-regular2 py-2 text-background-100">
            516GB Chính hãng VN/A
          </p> */}
          <div className="flex  gap-3 py-1 flex-col items-baseline">
            <div className="text-main text-normal1 font-bold">{formatMoney(data.colors[0]?.sizes[0]?.priceSale || 0)}</div>
            <div className="text-background-100 text-wap-regular2 line-through h-[14px]">
              {data?.colors[0]?.sizes[0]?.sale > 0 && formatMoney(data.price || 0)}
            </div>
          </div>
          <div className="w-full flex gap-2 py-2">
            {/* {[].map((it, idx) => (
              <CircleFilledIcon key={idx} className="fill-main" />
            ))} */}
          </div>
        </div>
        <div className="w-full flex justify-between items-baseline">
          <button className="btn rounded-md px-2 py-3 h-fit bg-main text-white text-wap-regular2"
            onClick={handleBuyNow}
          >
            Mua ngay
          </button>
        </div>
      </div>
      {
        data?.colors[0]?.sizes[0]?.sale > 0 && 
          <div className="absolute top-0 left-0">
            <HotDiscountFlag value={data.colors[0].sizes[0].sale} />
          </div>
      }
    </div>
  );
};

export default HotSaleProductCard;
