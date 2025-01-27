export type PlaceItemType = {
  id?: number | string | null
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
  numGuest: number
  acreage: string
  status?: boolean
  infrastructureList: PlaceItemType[]
}

export type PlaceSelectType = {
  id: number
  name: string
}



