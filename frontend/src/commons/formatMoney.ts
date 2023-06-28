import { windownSizeWidth, withResponsive } from "@constants/index";

export function formatNumberDot(num: number | string = 0) {
  if (num) {
    // const money = Math.round(Number(num))
    return `${num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`;
  }
  return "";
}

export function formatNumberDotWithO(num: number | string = 0) {
  if (num) {
    // const money = Math.round(Number(num))
    return `${num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`;
  }
  return 0;
}


export function formatNumberDotSlice(money: number) {
  if (money) {

    // const money = Math.round(Number(num))
    // return formatNumberDotWithO(Number(money)).toString().length > nu ? formatNumberDotWithO(Number(money)).toString().slice(0, nu - 3) + "..." : formatNumberDotWithO(Number(money));
    return money.toString().length < 10 ? formatNumberDotWithO(Number(money)).toString().length > 10 ? formatNumberDotWithO(Number(money)).toString().slice(0, 10 - 3) + "..." : formatNumberDotWithO(Number(money)) : money.toExponential();
  }
  return 0;
}

export function formatNumberDotWithVND(num: number | string = 0) {
  if (num) {
    // const money = Math.round(Number(num))
    return `${num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")} VNĐ`;
  }
  return "0 VNĐ";
}
