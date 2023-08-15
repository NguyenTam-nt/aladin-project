export const HELPER = {}

export interface some {
    [key: string]: any,
}


export function firstUpper(str: string) {
    if(!str || str.length == 0) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();
}

export function formatMoney(price: number) {
    if(price)
        return price.toLocaleString('vi-VI') + 'đ'
    return '0đ'
}

export const nl2br = (text: string) => {
    if (!text) {
      return text;
    }

    return text.replace(/(?:\r\n|\r|\n)/g, "<br />");
  };