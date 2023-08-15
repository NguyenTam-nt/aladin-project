import SearchProductCard from "@components/Card/SearchProductCard";
import { Link } from "react-router-dom";
import {useCallback, useEffect, useState} from "react"
import ProductServices, { ResponseProductItems } from "@services/ProductServices";
import useI18n from "@hooks/useI18n";
import { ROUTES } from "@utility/constants";
import { debounce } from "lodash";
import LoadingPage from "@components/LoadingPage";

interface Props {
  close: () => void;
  keyword: string
}
const SearchDropdown = (props: Props) => {

  const {t} = useI18n()

  const [loading, setloading] = useState(false)
  const [productResponse, setproductResponse] = useState<ResponseProductItems>()



  useEffect(() => {
    if(props.keyword && props.keyword.length > 0) {
      setloading(true)
      debounceDropDown(props.keyword);
    } else {
      debounceDropDown.cancel();
      setproductResponse(undefined)
      setloading(false)
    }
  }, [props.keyword])

  const debounceDropDown = useCallback(
    debounce((key) => callSearchApi(key), 700),
    []
  );

  console.log(props.keyword);
  

  const callSearchApi = (key: string) => {
    
    ProductServices.searchHeader({page: 0, size: 5, keyword: key})
      .then(data => {
        setproductResponse(data)
      })
      .finally(() => {
        setloading(false)
      })
  }

  if(loading) {
    return <div
      className="bg-white absolute top-full w-full max-h-[60vh] rounded-md shadow overflow-hidden border pt-2 flex flex-col"
      onClick={() => props.close()}
    >
      <div className="h-60 flex items-center justify-center">
        <LoadingPage />
      </div>
    </div>
  }

  return (
    <div
      className="bg-white absolute top-full w-full max-h-[60vh] rounded-md shadow overflow-hidden border pt-2 flex flex-col"
      onClick={() => props.close()}
    >
      {
        productResponse && productResponse.data.length > 0 ? <>
          <div className="flex-1 overflow-y-auto">
            {
              productResponse.data.slice(0, 5).map((it, idx) => (
                <SearchProductCard product={it}  key={idx} />
              ))
            }
          </div>
          <div className="px-10">
            {productResponse && productResponse?.total - 5 > 0 ? <div className="text-center text-wap-regular2 font-semibold border-t py-3">
              <Link to={`${ROUTES.search.index}?keyword=${props.keyword}`}>{t("header.search_see_more", {amount: productResponse?.total - 5})} </Link>
            </div> : <></>}
          </div>
        </> : <div className="px-5 pt-3 pb-4 flex justify-center items-center flex-col rounded-md">
            <img src="/images-raw/not-found-product.png" className="mb-2" alt="not-found-product.png" />
            {t("header.search_notfound")}
        </div>
      }
    </div>
  )
};

export default SearchDropdown;
