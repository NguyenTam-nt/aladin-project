import TradeMarkServices from "@services/TradeMarkServices";
import InputTextElement from "commons/components/InputComponent/InputTextElement";
import { TradeMarkType } from "commons/contannt";
import { useEffect, useRef, useState } from "react";

interface Props {
  iTemTrade?: TradeMarkType;
  onSelectTrade: (item: TradeMarkType) => void;
}
function BoxTradeMark(props: Props) {
  const { iTemTrade, onSelectTrade } = props;
  const [tradeMark, setTrademark] = useState<TradeMarkType>(
    iTemTrade || {
      id: "",
      name: "",
      images: [],
      menuShow: false,
    }
  );
  const [isShowBox, setShowBox] = useState<boolean>(false);
  const [listTradeMark, setListTradeMark] = useState<TradeMarkType[]>([]);
  const handleSelectTrade = (item: TradeMarkType) => {
    setTrademark(item);
    const a = { ...item };
    delete a.products;
    onSelectTrade(a);
  };

  const cRef = useRef(null);
  const closeRef = useRef(null);

  const enableBox = (event: MouseEvent) => {
    if (cRef && closeRef.current && cRef.current) {
      const RefCurren: HTMLElement = cRef.current;
      const Cref: HTMLElement = closeRef.current;
      if (
        Cref.contains(event.target as HTMLElement) ||
        RefCurren.contains(event.target as HTMLElement)
      ) {
        return;
      } else {
        setShowBox(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("click", (event) => enableBox(event));
    const getListTradeMark = async () => {
      const result = await TradeMarkServices.getAllTradeMark();
      if (result) {
        setListTradeMark(result.data);
      }
    };
    getListTradeMark();
    if (iTemTrade) {
      setTrademark(iTemTrade);
    }
    return () => {
      window.removeEventListener("click", (event) => enableBox(event));
    };
  }, [iTemTrade]);
  return (
    <>
      <div className="mb-25">
        <p className="text-small mb-3">
          Thương hiệu <span className="text-main">*</span>
        </p>
        <div
          ref={closeRef}
          onClick={() => setShowBox(!isShowBox)}
          className="mb-1"
        >
          <InputTextElement
            isRequired={true}
            isReadOnly={true}
            name="name"
            className="py-3 px-5"
            placehoderText="Chọn thương hiệu"
            classWidth="w-full mr-3"
            value={tradeMark!.name || ""}
          />
        </div>
        {isShowBox && listTradeMark.length > 0 && (
          <div
            ref={cRef}
            className="rounded-md py-4 px-18px flex gap-10px border border-gray-200 max-w-[300px] overflow-hidden max-h-[150px] shadow"
          >
            <div className="w-full overflow-y-scroll hiddenScroll">
              {listTradeMark.map((itemTrade, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => handleSelectTrade(itemTrade)}
                    className={
                      " text-gray-300 inline-block text-center py-6px px-5 mb-1 mr-1 h-auto " +
                      (itemTrade.id === tradeMark.id
                        ? "btn-normal btn-normal text-sm leading-18 text-white"
                        : "textInput")
                    }
                  >
                    {itemTrade.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default BoxTradeMark;
