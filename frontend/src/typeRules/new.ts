export interface newItem_type {
       id?: number,
       linkMedia:string,
       title:string,
       content:string,
       description:string,
       createdDate?: string
}

export interface Data_ListNew {
    list: newItem_type[];
    totalElement: number;
    totalElementPage: number;
}