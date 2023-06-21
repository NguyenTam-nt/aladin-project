export type PlaceItemType = {
  id?: number | string
  description: string
  linkMediaFirst: string
  linkMediaSecond: string
  linkMediaThird: string
  linkMediaFour: string
}

export type PlaceType = {
  id?: number
  name: string
  address: string
  phone: string
  zalo: string
  linkMap: string
  status?: boolean
  infrastructureList: PlaceItemType[]
}

