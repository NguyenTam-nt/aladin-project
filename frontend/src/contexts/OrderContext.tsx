import type { IProduct } from "@typeRules/product";
import React, {
  ReactNode,
  createContext,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useModalContext } from "./hooks/modal";
import { DiglogComfirmDelete } from "@features/dashboard/components/DiglogComfirmDelete";
import { positionCart } from "@components/MenusRight";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";
import { productService } from "@services/product";

interface IOrderState {
  listOrder: IProduct[];
  handlePlusCart: (
    product: IProduct,
    count: number,
    animate?: { top: number; left: number }
  ) => void;
  handleMinusCart: (id: number, count: number) => void;
  handleDeleteCart: (id: number) => void;
  handleDeleteAll: () => void;
}

export const OrderContext = createContext<IOrderState>({
  listOrder: [],
  handlePlusCart: () => {},
  handleMinusCart: () => {},
  handleDeleteCart: () => {},
  handleDeleteAll: () => {},
});

type Props = {
  children: ReactNode;
};

type ProductAnimated = {
  id: string;
  image: string;
  xStart: number;
  yStart: number;
};

export const OrderProvider = ({ children }: Props) => {
  const { setElementModal, hideModal } = useModalContext();
  const [listAnimated, setListAnimated] = useState<ProductAnimated[]>([]);
  const timeDelay = useRef<number>(0);

  const [listOrder, setListOrder] = useState<IProduct[]>(() => {
    try {
      return JSON.parse(sessionStorage.getItem("cart") || "") || [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    (async () => {
      const listOrders: IProduct[] =
        JSON.parse(sessionStorage.getItem("cart") || "") || [];
      if (listOrders.length) {
        const listMap = listOrders.map((item) => {
          return productService.getById(Number(item.id));
        });
        Promise.all(listMap).then((data: IProduct[]) => {
       
          const newData: IProduct[] | any[] = listOrders.map((item, index) => {
            const product = data.find((_item) => _item.id === item.id);
            return product ? { ...product, quantity: listOrders[index].quantity } : undefined
          });
         
          const finalData = newData.filter(item => !!item)

         setListOrder(finalData)
         sessionStorage.setItem("cart", JSON.stringify(finalData));
        });
      }
    })();
  }, []);

  const handlePlusCart = useCallback(
    (
      product: IProduct,
      count: number,
      animate?: { top: number; left: number }
    ) => {
      const now = Date.now();
      const delay = 300;
      if (timeDelay.current !== undefined && now - timeDelay.current > delay) {
        timeDelay.current = now;
        if (animate) {
          setListAnimated((animated) => [
            ...animated,
            {
              id: uuidv4() + now,
              image: product.linkMedia + "",
              xStart: animate.left,
              yStart: animate.top,
            },
          ]);
        }
        const newProducts = [...listOrder];
        const index = newProducts.findIndex((item) => item.id === product.id);
        if (index !== -1) {
          newProducts[index].quantity =
            Number(newProducts[index].quantity || 0) + count;
          setListOrder([...newProducts]);
          sessionStorage.setItem("cart", JSON.stringify(newProducts));
          return;
        }
        newProducts.unshift({ ...product, quantity: count });
        setListOrder([...newProducts]);
        sessionStorage.setItem("cart", JSON.stringify(newProducts));
      }
    },
    [listOrder]
  );

  const handleDeleteCart = useCallback(
    (id: number) => {
      const newProducts = [...listOrder];
      const index = newProducts.findIndex((item) => item.id === id);
      if (index !== -1) {
        newProducts.splice(index, 1);
        setListOrder([...newProducts]);
        sessionStorage.setItem("cart", JSON.stringify(newProducts));
      }
    },
    [listOrder]
  );

  const handleMinusCart = useCallback(
    (id: number, count: number) => {
      const newProducts = [...listOrder];
      const index = newProducts.findIndex((item) => item.id === id);
      if (index !== -1) {
        const quantity = Number(newProducts[index].quantity || 0) - count;
        if (quantity > 0) {
          newProducts[index].quantity =
            Number(newProducts[index].quantity || 0) - count;
          setListOrder([...newProducts]);
          sessionStorage.setItem("cart", JSON.stringify(newProducts));
        } else {
          setElementModal(
            <DiglogComfirmDelete
              message="Bạn chắc chắn muốn xóa món ăn này khỏi giỏ hàng?"
              onClick={() => {
                handleDeleteCart(id);
                hideModal();
              }}
            />
          );
        }
      }
    },
    [listOrder, handleDeleteCart]
  );

  const handleDeleteAll = () => {
    setListOrder([]);
    sessionStorage.removeItem("cart");
  };

  const handleDeleteProductAnimated = useCallback((id: string) => {
    setListAnimated((animateds) => animateds.filter((item) => item.id !== id));
  }, []);

  return (
    <OrderContext.Provider
      value={{
        listOrder,
        handleDeleteCart,
        handleMinusCart,
        handlePlusCart,
        handleDeleteAll,
      }}
    >
      {children}
      {listAnimated.map((item) => {
        return (
          <ProductAnimated
            onDelete={handleDeleteProductAnimated}
            data={item}
            key={item.id}
          />
        );
      })}
    </OrderContext.Provider>
  );
};

const ProductAnimated = memo(
  ({
    data,
    onDelete,
  }: {
    data: ProductAnimated;
    onDelete: (id: string) => void;
  }) => {
    const refProductAnimted = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (refProductAnimted.current) {
        refProductAnimted.current?.style.setProperty("--x", `${data.xStart}px`);
        refProductAnimted.current?.style.setProperty("--y", `${data.yStart}px`);
        refProductAnimted.current?.style.setProperty(
          "--xF",
          `${positionCart.positionX}px`
        );
        refProductAnimted.current?.style.setProperty(
          "--yF",
          `${positionCart.positionY}px`
        );
        refProductAnimted.current.classList.add("animation_product");
        setTimeout(() => {
          onDelete(data.id);
        }, 1000);
      }
    }, [data, onDelete]);

    return (
      <div
        ref={refProductAnimted}
        className={clsx(
          " w-[60px] bg-white hidden items-end top-0 left-0 flex-col h-[60px] fixed z-10"
        )}
      >
        <div className="w-full absolute inset-0 h-full">
          <img className="w-full h-full object-cover" src={data.image} alt="" />
        </div>
      </div>
    );
  }
);
