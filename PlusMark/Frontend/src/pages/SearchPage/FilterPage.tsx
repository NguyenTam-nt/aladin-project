import { ArrowDownIcon, ArrowDownManageIcon, DeleteIcon } from "@assets/icons";
import Banner from "@components/Banner/Banner";
import BreakCrumb, { BreadcrumbType } from "@components/Breadcrumb";
import CardItem from "@components/Card/CardItem";
import ProductCard from "@components/Card/ProductCard";
import ContactSession from "@components/Home/ContactSession";
import LoadingPage from "@components/LoadingPage";
import LoadingScreen from "@components/LoadingScreen";
import TitleSession from "@components/common/TitleSession";
import BrandFilter from "@components/filters/brand";
import FilteringItem from "@components/filters/filtering";
import PriceFilter from "@components/filters/price";
import ProductFilter from "@components/filters/product";
import ProductItemFilter from "@components/filters/product-item";
import ProductNew from "@components/product/ProductNew";
import ProductSale from "@components/product/ProductSale";
import ProductSpecial from "@components/product/ProductSpecial";
import ShipmentMethod from "@components/shipment/ShipmentMethod";
import useI18n from "@hooks/useI18n";
import useViewport from "@hooks/useViewPort";
import BannerServices from "@services/BannerServices";
import CategoryProductServices, {
  ProductCategoryHeader,
  ProductCategoryHeaderItem,
  ProductTrademarkHeader,
} from "@services/CategoryProductServices";
import ProductServices, { ProductItem } from "@services/ProductServices";
import categoryServices from "@services/categoryService";
import { BANNERS, SIZE_PRODUCT_LOADMORE } from "@utility/constants";
import { some } from "@utility/helper";
import clsx from "clsx";
import InputChecked from "commons/InputChecked";
import { debounce } from "lodash";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

const MIN_PRICE_DEFAULT = 0;
const MAX_PRICE_DEFAULT = 20000000;
const STEP_PRICE_DEFAULT = 100000;
const MIN_DISCOUNT_DEFAULT = 0;
const MAX_DISCOUNT_DEFAULT = 100;

function FilterPage() {
  let controller = new AbortController();
  const { width } = useViewport();
  const [searchParams, setSearchParams] = useSearchParams();
  const [navbarParam, setNavbarParam] = useState<string>("");
  const [categoryParam, setCategoryParam] = useState<string>("");
  const [detailParam, setDetailParam] = useState<string>("");
  const [keywordParam, setKeywordParam] = useState<string>();

  const { t } = useI18n();
  const [productData, setproductData] = useState<ProductItem[]>([]);
  const [filterBytexts, setFilterBytexts] = useState<some[]>([]);
  const [brandList, setBrandList] = useState<string[]>([]);
  const [categoryList, setCategoryList] = useState<ProductCategoryHeader[]>([]);
  const [categorydetailList, setCategoryDetailList] = useState<
    ProductCategoryHeaderItem[]
  >([]);

  const [minPriceChoose, setminPriceChoose] = useState(MIN_PRICE_DEFAULT);
  const [maxPriceChoose, setmaxPriceChoose] = useState(MAX_PRICE_DEFAULT);
  const [minDiscountChoose, setminDiscountChoose] =
    useState(MIN_DISCOUNT_DEFAULT);
  const [maxDiscountChoose, setmaxDiscountChoose] =
    useState(MAX_DISCOUNT_DEFAULT);
  const [genderSelected, setGenderSelected] = useState<string[]>([]);
  const [brandSelected, setBrandSelected] = useState<string[]>([]);
  const [productFilterSelected, setProductFilterSelected] = useState<
    ProductCategoryHeader[]
  >([]);
  const [productItemFilterSelected, setProductItemFilterSelected] = useState<
    ProductCategoryHeaderItem[]
  >([]);
  const [sortDesc, setSortDesc] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [noMoreItems, setNoMoreItems] = useState(false);
  const [pageProduct, setPageProduct] = useState(0);
  const sizeLoadProduct = SIZE_PRODUCT_LOADMORE;
  const [bannerProduct, setbannerProduct] = useState<string[]>([]);
  const [breakcrumData, setbreakcrumData] = useState<BreadcrumbType[]>([]);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    setPageProduct(0);
    setNoMoreItems(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setProductFilterSelected([]);
    setProductItemFilterSelected([]);
    handleRemoveAllFiltering();

    let gender, nav, cate, detail;
    if (searchParams.get("navbar") && searchParams.get("navbar") == "Nam") {
      nav = "male";
      gender = ["male"];
    } else if (
      searchParams.get("navbar") &&
      searchParams.get("navbar") == "Nữ"
    ) {
      nav = "female";
      gender = ["female"];
    } else {
      nav = searchParams.get("navbar") || "";
    }

    if (searchParams.get("category") && searchParams.get("category") == "Nam") {
      cate = "male";
      gender = ["male"];
    } else if (
      searchParams.get("category") &&
      searchParams.get("category") == "Nữ"
    ) {
      cate = "female";
      gender = ["female"];
    } else {
      cate = searchParams.get("category") || "";
    }

    setNavbarParam(nav);
    setCategoryParam(cate);
    setDetailParam(searchParams.get("detail") || "");
    setKeywordParam(searchParams.get("keyword") || undefined);
    detail = searchParams.get("detail") || "";

    if (gender) {
      setGenderSelected(gender);
    } else {
      setGenderSelected([]);
    }

    // ====================== handle set params
    handleSetBreakCrummb(nav, cate, detail);
    // console.log("Call change param", {
    //   nav, cate, detail
    // });

    let trademarkName, category;
    if (nav == "male" || nav == "female") {
      callApiGetTradeMarkSearch(nav, cate, detail);
    } else {
      if (nav && nav.length > 0) {
        if (nav == "Thương hiệu khác") {
          if (cate.length > 0) {
            trademarkName = cate;
          } else {
            callApiGetTradeMarkDiffer();
          }
        } else {
          trademarkName = nav;
        }
      }
    }

    if (trademarkName) {
      callApiGetBannerTrademark(trademarkName);
      setBrandSelected([trademarkName]);
    } else {
      setBrandSelected([]);
      // callApiGetBannerProduct()
    }

    if (
      cate.length == 0 ||
      (detail.length == 0 &&
        (cate == "male" || cate == "female" || nav == "Thương hiệu khác"))
    ) {
      callApiGetCategorySearch(gender, trademarkName);
    }

    if (detail.length == 0) {
      if (
        cate.length != 0 &&
        cate != "male" &&
        cate != "female" &&
        nav != "Thương hiệu khác"
      ) {
        category = cate;
      }
    } else {
      if (cate != "male" && cate != "female") {
        setProductItemFilterSelected([
          {
            categoryDetailName: "",
            id: Number(detail),
          },
        ]);
      } else {
        category = detail;
      }
    }

    if (category) {
      callApiGetCategoryDetailSearch(gender, category, trademarkName);
      setProductFilterSelected([
        {
          id: Number(category),
          categoryName: "",
          categoryNewDetails: [],
        },
      ]);
    }

    if (nav == "" && cate == "" && detail == "") {
      setIsLoadingMore(true);
      search(pageProduct, true, {
        minPriceParam: minPriceChoose,
        maxPriceParam: maxPriceChoose,
        minDiscountParam: minDiscountChoose,
        maxDiscountParam: maxDiscountChoose,
      });
    }
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    setPageProduct(0);
    setNoMoreItems(false);
    setproductData([]);

    if (
      genderSelected != undefined &&
      brandSelected != undefined &&
      productFilterSelected != undefined &&
      productItemFilterSelected != undefined &&
      (genderSelected.length != 0 ||
        brandSelected.length != 0 ||
        productFilterSelected.length != 0 ||
        productItemFilterSelected.length != 0)
    ) {
      console.log(
        sortDesc,
        minPriceChoose,
        maxPriceChoose,
        minDiscountChoose,
        maxDiscountChoose,
        genderSelected,
        brandSelected,
        productFilterSelected,
        productItemFilterSelected
      );
      searchDebounch(0, false, {
        minPriceParam: minPriceChoose,
        maxPriceParam: maxPriceChoose,
        minDiscountParam: minDiscountChoose,
        maxDiscountParam: maxDiscountChoose,
      });
    }

    return () => setIsLoading(false);
  }, [
    sortDesc,
    minPriceChoose,
    maxPriceChoose,
    minDiscountChoose,
    maxDiscountChoose,
    genderSelected,
    brandSelected,
    productFilterSelected,
    productItemFilterSelected,
  ]);

  useEffect(() => {
    if (pageProduct && pageProduct > 0) {
      setIsLoadingMore(true);
      search(pageProduct, true, {
        minPriceParam: minPriceChoose,
        maxPriceParam: maxPriceChoose,
        minDiscountParam: minDiscountChoose,
        maxDiscountParam: maxDiscountChoose,
      });
    }
    return () => setIsLoadingMore(false);
  }, [pageProduct]);

  const search = (page: number, loadingMoreMode: boolean, params: any) => {
    try {
      // let idProductCategories = productFilterSelected.map(e => (e.categoryNewDetails && e.categoryNewDetails.length > 0) ? e.categoryNewDetails.map(c => c.id) : e.id).flat()
      // console.log(productFilterSelected);

      let idProductCategories = productFilterSelected
        .filter(
          (e) => !e.categoryNewDetails || e.categoryNewDetails.length == 0
        )
        .map((e) => e.id);
      let idProductCategoryItems = [
        ...productItemFilterSelected.map((e) => e.id),
        ...productFilterSelected
          .filter(
            (e) => e.categoryNewDetails && e.categoryNewDetails.length > 0
          )
          .map(
            (e) => e.categoryNewDetails && e.categoryNewDetails.map((c) => c.id)
          )
          .flat(),
      ];

      // let cTemp = [...idProductCategories, ...idProductCategoryItems]
      console.log(genderSelected);

      let request = {
        gender:
          genderSelected.length == 2 || genderSelected.length == 0
            ? null
            : genderSelected[0],
        trademarkNames: brandSelected,
        categories: idProductCategories,
        categoryDetails: idProductCategoryItems,
        priceMin: params.minPriceParam,
        priceMax: params.maxPriceParam,
        saleMin: params.minDiscountParam,
        saleMax: params.maxDiscountParam,
      };

      controller.abort();
      controller = new AbortController();
      CategoryProductServices.search(
        request,
        page,
        sizeLoadProduct,
        sortDesc ? "price,desc" : "price,asc",
        controller
      )
        .then((data) => {
          // console.log(data, productData);

          setIsLoading(false);
          setIsLoadingMore(false);
          if (data && data.length == 0) {
            setNoMoreItems(true);
          }

          if (loadingMoreMode) {
            setproductData([...productData, ...data]);
          } else {
            setproductData(data);
          }
        })
        .catch((e) => {
          setIsLoading(false);
          setIsLoadingMore(false);
        });
    } catch (error) {
      setNoMoreItems(true);
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const searchDebounch = useCallback(
    debounce(
      (page: number, loadingMoreMode: boolean, params: any) =>
        search(page, loadingMoreMode, params),
      700
    ),
    [
      genderSelected,
      brandSelected,
      productFilterSelected,
      productItemFilterSelected,
      sortDesc,
    ]
  );

  useEffect(() => {
    inView &&
      !isLoadingMore &&
      !noMoreItems &&
      productData?.length != 0 &&
      setPageProduct((pre) => pre + 1);
  }, [inView]);

  // const callApiGetBannerProduct = () => {
  //   try {
  //     BannerServices.getBanner(BANNERS.PRODUCT)
  //       .then(data => {
  //         setbannerProduct(data.images)
  //       })
  //   } catch (error) {

  //   }
  // }

  const callApiGetBannerTrademark = (trademarkName: string) => {
    try {
      BannerServices.getBannerTrademark(trademarkName).then((data) => {
        setbannerProduct(data.images);
      });
    } catch (error) {}
  };

  const callApiGetTradeMarkDiffer = () => {
    // console.log("callApiGetTradeMarkDiffer");
    CategoryProductServices.getTrademarkDiffer().then((data) => {
      setBrandList(data.map((d: ProductTrademarkHeader) => d.tradeMarkName));
      onChangeFilterBranch(
        data.map((d: ProductTrademarkHeader) => d.tradeMarkName)
      );
    });
  };

  const callApiGetTradeMarkSearch = (
    gender: any,
    categoryName: any,
    categoryDetail: any
  ) => {
    // console.log("callApiGetTradeMarkSearch");
    CategoryProductServices.getTradeMarkSearch(
      gender,
      categoryName,
      categoryDetail
    ).then((data) => {
      setBrandList(data);
    });
  };

  const callApiGetCategorySearch = (gender: any, trademarkName: any) => {
    // console.log("callApiGetCategorySearch");

    CategoryProductServices.getFilterCategory(gender, trademarkName).then(
      (data) => {
        setCategoryList(data.data);
      }
    );
  };

  const callApiGetCategoryDetailSearch = (
    gender: any,
    categoryName: any,
    trademarkName: any
  ) => {
    // console.log("callApiGetCategoryDetailSearch");

    CategoryProductServices.getCategoryDetailSearch(
      gender,
      categoryName,
      trademarkName
    ).then((data) => {
      setCategoryDetailList(data.data);
    });
  };

  const onChangeFilterPrice = ({ min, max }: any) => {
    // console.log({ min, max });

    setminPriceChoose(min);
    setmaxPriceChoose(max);
    if (min != MIN_PRICE_DEFAULT || max != MAX_PRICE_DEFAULT) {
      setFilterBytexts((pre) => {
        let hasItem = false;
        let changePre = pre.map((p) => {
          if (p.type == "Price") {
            hasItem = true;
            return {
              type: "Price",
              text: `${min.toLocaleString("vi-VI")} - ${max.toLocaleString(
                "vi-VI"
              )}đ`,
            };
          }
          return p;
        });
        if (!hasItem) {
          changePre = [
            ...changePre,
            {
              type: "Price",
              text: `${min.toLocaleString("vi-VI")} - ${max.toLocaleString(
                "vi-VI"
              )}đ`,
            },
          ];
        }

        return changePre;
      });
    } else {
      onRemoveFilteringItem({ type: "Price" });
    }
  };

  const onChangeFilterDiscount = ({ min, max }: any) => {
    setminDiscountChoose(min);
    setmaxDiscountChoose(max);
    if (min != MIN_DISCOUNT_DEFAULT || max != MAX_DISCOUNT_DEFAULT) {
      setFilterBytexts((pre) => {
        let hasItem = false;
        let changePre = pre.map((p) => {
          if (p.type == "Discount") {
            hasItem = true;
            return { type: "Discount", text: `${min} - ${max}%` };
          }
          return p;
        });
        if (!hasItem) {
          changePre = [
            ...changePre,
            { type: "Discount", text: `${min} - ${max}%` },
          ];
        }

        return changePre;
      });
    } else {
      onRemoveFilteringItem({ type: "Discount" });
    }
  };

  const onChangeFilterBranch = (selected: any) => {
    setBrandSelected(selected);
    if (selected.length == 0) {
      setFilterBytexts((pre) => pre.filter((p) => p.type != "Brand"));
      return;
    }
    setFilterBytexts((pre) => {
      let hasItem = false;
      let changePre = pre.map((p) => {
        if (p.type == "Brand") {
          hasItem = true;
          return { type: "Brand", text: selected.join(" | ") };
        }
        return p;
      });
      if (!hasItem) {
        changePre = [
          ...changePre,
          { type: "Brand", text: selected.join(" | ") },
        ];
      }

      return changePre;
    });
  };

  const onChangeFilterProduct = (
    parent: ProductCategoryHeader,
    itemChoose?: ProductCategoryHeaderItem
  ) => {
    // console.log(name, itemChoose);
    let temp: ProductCategoryHeader[] = [];
    let hasItem = false;
    temp = productFilterSelected.map((s: ProductCategoryHeader) => {
      if (s.id == parent.id) {
        hasItem = true;
        if (itemChoose) {
          if (
            s.categoryNewDetails &&
            s.categoryNewDetails.find(
              (e: ProductCategoryHeaderItem) => e.id == itemChoose.id
            )?.id == itemChoose.id
          ) {
            return {
              ...s,
              categoryNewDetails: s.categoryNewDetails.filter(
                (e: ProductCategoryHeaderItem) => e.id != itemChoose.id
              ),
            };
          }
          return {
            ...s,
            categoryNewDetails: [...(s.categoryNewDetails || []), itemChoose],
          };
        } else {
          return { ...s, categoryNewDetails: parent.categoryNewDetails };
        }
      }
      return s;
    });

    if (!hasItem) {
      temp.push({
        ...parent,
        categoryNewDetails: itemChoose
          ? [itemChoose]
          : parent.categoryNewDetails,
      });
    }

    temp.forEach((item: ProductCategoryHeader) => {
      setFilterBytexts((pre) => {
        let hasItem = false;
        let changePre = pre.map((p) => {
          if (p.type == "Product-" + item.categoryName) {
            hasItem = true;
            return {
              type: "Product-" + item.categoryName,
              text:
                item.categoryName +
                (item.categoryNewDetails && item.categoryNewDetails.length > 0
                  ? " > " +
                    item.categoryNewDetails
                      .map((c) => c.categoryDetailName)
                      .join(" | ")
                  : ""),
            };
          }
          return p;
        });
        if (!hasItem) {
          changePre = [
            ...changePre,
            {
              type: "Product-" + item.categoryName,
              text:
                item.categoryName +
                (item.categoryNewDetails && item.categoryNewDetails.length > 0
                  ? " > " +
                    item.categoryNewDetails
                      .map((c) => c.categoryDetailName)
                      .join(" | ")
                  : ""),
            },
          ];
        }

        return changePre;
      });
    });

    // temp = temp.filter((i:ProductCategoryHeader) => i?.categoryNewDetails?.length > 0)
    setProductFilterSelected(temp);

    if (temp.length == 0) {
      setFilterBytexts((pre) => pre.filter((p) => !p.type.includes("Product")));
    }
  };

  const onChangeFilterProductItem = (item: ProductCategoryHeaderItem) => {
    let temp: ProductCategoryHeaderItem[] = [];
    if (
      productItemFilterSelected.find(
        (e: ProductCategoryHeaderItem) => e.id == item.id
      )?.id == item.id
    ) {
      temp = [
        ...productItemFilterSelected.filter(
          (e: ProductCategoryHeaderItem) => e.id != item.id
        ),
      ];
    } else {
      temp = [...productItemFilterSelected, item];
    }
    setProductItemFilterSelected(temp);
    // console.log(temp);

    if (temp.length > 0) {
      let hasItem = false;
      setFilterBytexts((pre) => {
        let changePre = pre.map((e) => {
          if (e.type == "ItemP") {
            hasItem = true;
            return {
              type: "ItemP",
              text: temp.map((e) => e.categoryDetailName).join(" | "),
            };
          }
          return e;
        });
        if (!hasItem) {
          changePre = [
            ...pre,
            {
              type: "ItemP",
              text: temp.map((e) => e.categoryDetailName).join(" | "),
            },
          ];
        }
        return changePre;
      });
    } else {
      setFilterBytexts((pre) => pre.filter((p) => !p.type.includes("ItemP")));
    }
  };

  const onRemoveFilteringItem = (data: any) => {
    setFilterBytexts((pre) => pre.filter((p) => p.type != data.type));
    // console.log(data);

    switch (data.type) {
      case "Price":
        setminPriceChoose(MIN_PRICE_DEFAULT);
        setmaxPriceChoose(MAX_PRICE_DEFAULT);
        break;
      case "Discount":
        setminDiscountChoose(MIN_DISCOUNT_DEFAULT);
        setmaxDiscountChoose(MAX_DISCOUNT_DEFAULT);
        break;
      case "Brand":
        setBrandSelected([]);
        break;
      case "ItemP":
        setProductItemFilterSelected([]);
        break;
      default:
        setProductFilterSelected((pre) =>
          pre.filter((p) => p.categoryName != data.type.replace("Product-", ""))
        );
    }
  };

  const handleRemoveAllFiltering = () => {
    setminPriceChoose(MIN_PRICE_DEFAULT);
    setmaxPriceChoose(MAX_PRICE_DEFAULT);
    setminDiscountChoose(MIN_DISCOUNT_DEFAULT);
    setmaxDiscountChoose(MAX_DISCOUNT_DEFAULT);
    setFilterBytexts([]);

    if (
      navbarParam == "Thương hiệu khác" ||
      navbarParam == "male" ||
      navbarParam == "female"
    ) {
      setBrandSelected([]);
    }

    if (
      detailParam.length == 0 &&
      (categoryParam.length == 0 ||
        (categoryParam.length != 0 &&
          (categoryParam == "male" ||
            categoryParam == "female" ||
            navbarParam == "Thương hiệu khác")))
    ) {
      setProductFilterSelected([]);
    }

    if (
      (detailParam.length > 0 &&
        (categoryParam == "male" || categoryParam == "female")) ||
      (detailParam.length == 0 &&
        categoryParam.length != 0 &&
        categoryParam != "male" &&
        categoryParam != "female")
    ) {
      setProductItemFilterSelected([]);
    }

    if (navbarParam == "Thương hiệu khác") {
      setPageProduct(0);
      searchDebounch(0, false, {
        minPriceParam: minPriceChoose,
        maxPriceParam: maxPriceChoose,
        minDiscountParam: minDiscountChoose,
        maxDiscountParam: maxDiscountChoose,
      });
    }
  };

  const handleSetBreakCrummb = async (nav: any, cate: any, detail: any) => {
    if (cate.length > 0 && cate != "male" && cate != "female") {
      cate = await categoryServices.getCategoryById(cate).then((data) => data);
    }

    if (detail.length > 0 && detail != "male" && detail != "female") {
      detail = await categoryServices
        .getCategoryById(detail)
        .then((data) => data);
    }

    let breakCrumb = [
      {
        name: "Trang chủ",
        clickable: true,
        active: false,
        link: "/",
      },
    ];
    if (nav == "male" || nav == "female") {
      breakCrumb.push({
        name: nav == "male" ? "Nam" : "Nữ",
        clickable: cate.length != 0,
        active: cate.length == 0,
        link: "/filter?navbar=" + (nav == "male" ? "Nam" : "Nữ"),
      });
      if (cate.length > 0) {
        breakCrumb.push({
          name: cate,
          clickable: detail.length != 0,
          active: detail.length == 0,
          link:
            "/filter?navbar=" +
            (nav == "male" ? "Nam" : "Nữ") +
            "&category=" +
            cate,
        });
        if (detail.length > 0) {
          breakCrumb.push({
            name: detail,
            clickable: false,
            active: true,
            link:
              "/filter?navbar=" +
              (nav == "male" ? "Nam" : "Nữ") +
              "&category=" +
              cate +
              "&detail=" +
              detail,
          });
        }
      }
    } else if (nav == "Thương hiệu khác") {
      if (cate.length > 0) {
        breakCrumb.push({
          name: cate,
          clickable: false,
          active: true,
          link: "",
        });
      }
    } else {
      if (nav.length > 0) {
        breakCrumb.push({
          name: nav,
          clickable: cate.length != 0,
          active: cate.length == 0,
          link: "/filter?navbar=" + nav,
        });
      }

      if (cate.length > 0) {
        breakCrumb.push({
          name: cate == "male" ? "Nam" : "Nữ",
          clickable: detail.length != 0,
          active: detail.length == 0,
          link: "/filter?navbar=" + (cate == "male" ? "Nam" : "Nữ"),
        });

        if (detail.length > 0) {
          breakCrumb.push({
            name: detail,
            clickable: false,
            active: true,
            link: "",
          });
        }
      }
    }

    // console.log(breakCrumb);

    setbreakcrumData(breakCrumb);
  };
  // console.log(breakcrumData);

  // console.log(productData);
  return (
    <div className="pt-spc30">
      <div className="product_box  flex flex-col gap-5">
        {navbarParam != "Thương hiệu khác" && breakcrumData.length > 1 ? (
          <div className="mt-4 lg:mt-6">
            <BreakCrumb
              data={breakcrumData}
              normalClass="text-wap-regular2 lg:text-normal1"
              activeClass=""
            />
          </div>
        ) : (
          <></>
        )}
        <div className="pb-2 border-b border-b-main text-lg">
          <span className="font-bold"> Đồ ăn</span> <span>(200 sản phẩm)</span>
        </div>
        <div className="flex items-center flex-wrap gap-4 text-base font-normal">
          <span className="sm:w-auto w-full font-bold sm:font-normal">
            Xếp theo :
          </span>
          <InputChecked
            checked={true}
            onChange={() => {}}
            lableText="Sản phẩm mới"
          />
          <InputChecked
            checked={false}
            onChange={() => {}}
            lableText="Bán chạy"
          />
          <InputChecked
            checked={true}
            onChange={() => {}}
            lableText="Giá cao đến thấp"
          />
          <InputChecked
            checked={false}
            onChange={() => {}}
            lableText="Giá thấp đến cao"
          />
          <InputChecked
            checked={true}
            onChange={() => {}}
            lableText="Giảm giá"
          />
        </div>
      </div>

      <ProductSale isBtn={false} />
      <ProductSpecial />

      <div className="product_box pt-spc60 pb-spc80">
        <TitleSession
          text="text.section.sale"
          isBox={true}
          className="w-full mb-6"
        />
        <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-[26px]">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => {
            return <CardItem description={`${i}`} key={i} />;
          })}
        </div>
      </div>
      <ContactSession />
      {/* <div className="mt-4 lg:mt-6">
        <h3 className="text-normal lg:text-normal2 font-medium lg:font-bold">
          {t("search_page.filter")}
        </h3>
        <div className="mt-3 lg:mt-4 flex flex-wrap gap-4 z-10 relative">
          <PriceFilter
            type="price"
            title="Giá"
            minValue={minPriceChoose}
            maxValue={maxPriceChoose}
            min={MIN_PRICE_DEFAULT}
            max={MAX_PRICE_DEFAULT}
            step={STEP_PRICE_DEFAULT}
            onChange={onChangeFilterPrice}
          />
          <PriceFilter
            type="discount"
            title="Giảm giá"
            minValue={minDiscountChoose}
            maxValue={maxDiscountChoose}
            min={MIN_DISCOUNT_DEFAULT}
            max={MAX_DISCOUNT_DEFAULT}
            step={1}
            onChange={onChangeFilterDiscount}
          />
          {brandList.length &&
          ((navbarParam == "Thương hiệu khác" && categoryParam.length == 0) ||
            navbarParam == "male" ||
            navbarParam == "female") ? (
            <BrandFilter
              title="Thương hiệu"
              selected={brandSelected}
              items={brandList}
              onChange={onChangeFilterBranch}
            />
          ) : (
            <></>
          )}
          {categoryList?.length > 0 &&
          detailParam?.length == 0 &&
          (categoryParam?.length == 0 ||
            (categoryParam?.length != 0 &&
              (categoryParam == "male" ||
                categoryParam == "female" ||
                navbarParam == "Thương hiệu khác"))) ? (
            <ProductFilter
              title="Loại sản phẩm"
              selected={productFilterSelected}
              items={categoryList}
              onChange={onChangeFilterProduct}
            />
          ) : (
            <></>
          )}
          {categorydetailList?.length > 0 &&
          ((detailParam?.length > 0 &&
            (categoryParam == "male" || categoryParam == "female")) ||
            (detailParam?.length == 0 &&
              categoryParam?.length != 0 &&
              categoryParam != "male" &&
              categoryParam != "female" &&
              navbarParam != "Thương hiệu khác")) ? (
            <ProductItemFilter
              title="Loại sản phẩm chi tiết"
              selected={productItemFilterSelected}
              items={categorydetailList}
              onChange={onChangeFilterProductItem}
            />
          ) : (
            <></>
          )}
        </div>
      </div> */}

      {/* <div className="container px-4">
        {filterBytexts && filterBytexts.length > 0 && (
          <div className="mt-4 lg:mt-6">
            <h3 className="text-normal lg:text-normal2 font-medium lg:font-bold">
              {t("search_page.filtering")}
            </h3>
            <div className="mt-3 lg:mt-4 flex flex-wrap gap-4 z-10">
              {filterBytexts.map((item, i) => {
                return (
                  <FilteringItem
                    data={item}
                    onRemove={onRemoveFilteringItem}
                    key={i}
                  />
                );
              })}
              <div
                className="hover:cursor-pointer border border-gray-100 rounded-md px-4 py-2 text-wap-regular2 lg:text-normal1 font-bold text-main"
                onClick={handleRemoveAllFiltering}
              >
                {t("search_page.remove_all_filtering")}
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 lg:mt-6">
          <h3 className="text-normal lg:text-normal2 font-medium lg:font-bold">
            {t("search_page.sort_by")}
          </h3>
          <div className="mt-3 lg:mt-4 flex gap-4 ">
            <div
              className={clsx(
                " border rounded-md px-3 py-2 flex items-center gap-2 text-wap-regular2 lg:text-normal1  hover:cursor-pointer",
                {
                  "text-main border-main bg-icon": sortDesc,
                  "text-text border-gray-100": !sortDesc,
                }
              )}
              onClick={() => setSortDesc(true)}
            >
              <ArrowDownManageIcon
                className={clsx("rotate-180", {
                  "fill-main ": sortDesc,
                  "fill-black ": !sortDesc,
                })}
              />{" "}
              Giá cao - thấp
            </div>
            <div
              className={clsx(
                "border-gray-100 border rounded-md px-3 py-2 flex items-center gap-2 text-wap-regular2 lg:text-normal1 hover:cursor-pointer",
                {
                  "text-main border-main bg-icon": !sortDesc,
                  "text-text border-gray-100": sortDesc,
                }
              )}
              onClick={() => setSortDesc(false)}
            >
              <ArrowDownManageIcon
                className={clsx("", {
                  "fill-main ": !sortDesc,
                  "fill-black ": sortDesc,
                })}
              />{" "}
              Giá thấp - cao
            </div>
          </div>
        </div>

        {keywordParam ? (
          <div className="mt-4 lg:mt-6">
            <h3 className="text-normal lg:text-normal2 font-bold">
              {t("search_page.search")}{" "}
              <span className="text-main">"{keywordParam}"</span>
            </h3>
            <div className="mt-3 lg:mt-4 text-wap-regular2 lg:text-normal1">
              {t("search_page.search_res1")}
              <span className="font-bold">
                {productData?.length || 0} {t("search_page.search_res2")}{" "}
              </span>
              {t("search_page.search_res3")}
            </div>
          </div>
        ) : (
          <></>
        )}

        {isLoading ? (
          <div className="h-48 flex justify-center items-center">
            <LoadingPage />
          </div>
        ) : (
          <>
            <div className="mt-4 lg:mt-6 grid grid-cols-2 ssm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 lg:gap-4">
              {productData &&
                productData.length > 0 &&
                productData.map((item, i) => {
                  return <ProductCard product={item} hover key={item.id} />;
                })}
            </div>
            {isLoadingMore ? (
              <div className="h-48 min-h-full w-full flex justify-center items-center">
                <LoadingPage />
              </div>
            ) : (
              <></>
            )}
          </>
        )}
        <div className="" ref={ref}></div>
      </div> */}
    </div>
  );
}

export default FilterPage;
