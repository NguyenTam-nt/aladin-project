import { CircleFilledIcon, DeleteIcon, TickIcon } from "@assets/icons";
import DiscountFlag from "@components/Flag/DiscountFlag";
import { forwardRef, useImperativeHandle, useState } from "react";

interface Props {
  [key: string]: any;
}

const CartProduct = forwardRef((props: Props, ref) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  useImperativeHandle(ref, () => ({ checked: checked, quantity: quantity }));
  const handleIncrease = () => {
    setQuantity((prev) => 1 + prev);
  };
  const handleDecrease = () => {
    setQuantity((prev) => {
      if (prev > 1) return prev - 1;
      else return prev;
    });
  };

  return (
    <div className="border-b py-10 flex items-center">
      {props.change && (
        <div>
          <label>
            <input
              className="hidden"
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <div
              className={`w-8 aspect-square p-1 border-2 flex items-center justify-center ${
                checked ? "bg-icon" : ""
              }`}
            >
              {checked && <TickIcon />}
            </div>
          </label>
        </div>
      )}
      <div
        className={`flex-1 flex flex-row gap-8 px-14 ${
          props.change ? "pl-6" : ""
        }`}
      >
        <img
          className="w-[240px] aspect-square object-contain"
          src="/category.png"
          alt=""
        />

        <div className="flex-1 min-h-full">
          <DiscountFlag value={30} />
          <h1 className="text-normal2 font-medium text-main py-2">
            Apple iPhone 14 Pro Max (128GB){" "}
          </h1>
          <p className="text-wap-regular2 py-2 text-background-100">
            516GB Chính hãng VN/A
          </p>
          <div className="flex gap-3 py-1 flex-wrap items-baseline">
            <div className="text-icon text-normal1 font-bold">17.000.000D</div>
            <div className="text-background-100 text-wap-regular1 line-through">
              1.000.000D
            </div>
          </div>
          <div className="w-full flex gap-2 py-3">
            <CircleFilledIcon className="fill-main" />
          </div>
          {props.change ? (
            <div className="flex bg-background-200 rounded-sm w-fit text-normal2 text-main">
              <button className="px-3 py-1" onClick={handleDecrease}>
                -
              </button>
              <div className="py-1 px-5">{quantity}</div>
              <button className="px-3 py-1" onClick={handleIncrease}>
                +
              </button>
            </div>
          ) : (
            <div>
              <p className="text-wap-regular2 py-2 text-background-100">
                Số lương:
                <span className="px-3 text-main">{quantity}</span>
              </p>
            </div>
          )}
        </div>

        {props.change && (
          <div className="min-h-full flex items-end">
            <button>
              <DeleteIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

export default CartProduct;
