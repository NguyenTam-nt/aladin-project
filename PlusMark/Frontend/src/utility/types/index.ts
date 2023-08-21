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