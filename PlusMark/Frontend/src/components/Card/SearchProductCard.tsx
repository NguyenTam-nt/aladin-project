import { ProductItem } from "@services/ProductServices";
import { formatMoney } from "@utility/helper";
import { Link } from "react-router-dom";

type Props = {
  product: ProductItem
}

const SearchProductCard = ({product}: Props) => {

  return (
    <Link to={"/product/" + product.id} className="">
      <div className="hover:bg-gray-100 px-2 lg:px-4 xl:px-10">
        <div className="flex gap-5 py-2">
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-wap-regular2 font-semibold line-clamp-2">{product.name}</h1>
            <div className="flex justify-between flex-wrap pt-3 w-fit gap-2 items-center">
              <p className="text-normal font-semibold">{formatMoney(product?.colors[0]?.sizes[0]?.priceSale || product.price)}</p>
              {product?.colors[0]?.sizes[0]?.sale != 0 && <p className="text-wap-regular2 line-through text-[#8E8E8E]">{formatMoney(product.price)}</p>}
            </div>
          </div>
          <img className="w-24 aspect-square object-contain" src={product.images[0] ||""} alt="" />
        </div>
      </div>
    </Link>
  );
};

export default SearchProductCard;
