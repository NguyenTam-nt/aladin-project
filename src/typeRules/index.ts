export interface IIcon {
  width?: number
  color?: string
  height?: number
}


export interface IParams {
  page?: string | number
  size?: number
  sort?: string | string[]
  [key: string]: any | undefined
}

export interface IResponseData<T> {
  totalElement: number
  totalElementPage: number
  list: T[]
}
export interface ListRenderItemInfo<ItemT> {
  item: ItemT

  index: number

  separators: {
    highlight: () => void
    unhighlight: () => void
    updateProps: (select: 'leading' | 'trailing', newProps: any) => void
    }  
  
}
