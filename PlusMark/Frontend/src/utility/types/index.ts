export type IconProps = {
    width?: number,
    height?: number,
    color?:string
}
  export  interface ItemProps {
    name: string;
    onDeleteItem: () => void;
  }
  export  interface ItemResearch {
   item: {
    price: number
    name: string;
    image?: string
   },
    handleclick: () => void;
  }
export const phoneNumber = "1900555555" 

export const isUrl = (url: string) => {
  const regexp =
      /(ftp|http|https|blog|data:image):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return regexp.test(url);
};