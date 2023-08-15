import { Link, useNavigate, useSearchParams } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdow";
import useFocusOut from "@hooks/useFocusOut";
import { firstUpper, some } from "@utility/helper";
import { useState, useEffect } from "react";
import { ArrowDownIcon } from "@assets/icons";
import clsx from "clsx";
import { CategoryHeader, CategoryHeaderItem } from "./Header";
import { ProductCategoryHeader } from "@services/CategoryProductServices";

interface PropsParent {
  data: CategoryHeader;
}

const CategoryMobileItem = ({data}: PropsParent) => {

  const navigate = useNavigate()
  const [open, setopen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const [navbarParam, setNavbarParam] = useState<string>("")

  useEffect(() => {

    setNavbarParam(searchParams.get("navbar") || "")
    setopen(searchParams.get("navbar") == data.text)
  }, [searchParams])

  const handleClickParrent = () => {
    navigate("/filter?navbar=" + data.text)
    setopen(!open)
  }

  return (
    <div
      className="text-normal1 "
    >
      <div className="flex justify-between w-full py-2">
        <div className={clsx("flex-1 hover:text-main text-normal1 font-semibold uppercase", {"text-main": open})} 
          onClick={handleClickParrent}
        >{data.text}</div>
        {data.items && data.items.length > 0 ? 
          <ArrowDownIcon className={clsx("w-3  fill-black", {"fill-main": open, "-rotate-90 ": !open})} /> : <></>
        }
      </div>
      {open && <div className={clsx("pl-4")}>
        {
          data.items.map((item:CategoryHeaderItem, i:any) => {
            return <CategoryMobileChild navbar={data.text} data={item}  key={i}/>
          })
        }
      </div>}
    </div>
  );
};

interface Props {
  navbar: string,
  data: CategoryHeaderItem;
}

const CategoryMobileChild = ({navbar, data}: Props) => {

  const [open, setopen] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()
  const [navbarParam, setNavbarParam] = useState<string>("")
  const [categoryParam, setCategoryParam] = useState<string>("")
  const [detailParam, setDetailParam] = useState<string>("")

  useEffect(() => {

    setNavbarParam(searchParams.get("navbar") || "")
    setCategoryParam(searchParams.get("category") || "")
    setDetailParam(searchParams.get("detail") || "")

    setopen(searchParams.get("category") == (data.id ? data.id : data.title))
  }, [searchParams])

  return (
    <div className="">
      <div className="flex justify-between w-full pt-2">
        <Link  to={`/filter?navbar=${navbar}&category=${data.id ? data.id : data.title}`}
          className={clsx("flex-1  hover:text-main text-normal font-semibold", {"text-main": open})} 
          onClick={() => setopen(!open)}
        >
          {firstUpper(data.title)}
        </Link>
        {data.items && data.items.length > 0 ? 
          <ArrowDownIcon className={clsx("w-3  fill-black", {"fill-main": open, "-rotate-90 ": !open})} />: <></>
        }
      </div>
      {
        open && data.items && data.items.map((item: CategoryHeaderItem, i:any) => {
          return <Link key={i} to={`/filter?navbar=${navbar}&category=${data.id ? data.id : data.title}&detail=${item.id ? item.id : item.title}`}
           className={clsx("block hover:text-main text-wap-regular2 py-2", {
            "text-main": detailParam == (item.id ? item.id : item.title) && categoryParam == (data.id ? data.id : data.title),
            "text-text": detailParam != (item.id ? item.id : item.title) || categoryParam != (data.id ? data.id : data.title),
          })}
           
           >{firstUpper(item.title)}</Link>
        })
      }
    </div>
  )
}

export default CategoryMobileItem;
