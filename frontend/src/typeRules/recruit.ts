export interface Recruit_type {
       id?: number,
       linkMedia:string,
       title:string,
       salary: number,
       expirationDate:string,
       address:string,
       content:string
}

export interface Data_Recruit {
       list: Recruit_type[];
       totalElement: number;
       totalElementPage: number;
}