export interface book_table {
    id?: number,
    name: string,
    phone: string,
    email: string,
    numGuest: number,
    chooseDate: string,
    chooseIdInfrastructure: number,
    chooseInfrastructure: string,
    note: string,
    record?:boolean |null,
    feedback?:string| null,
    status?: boolean
  }
  // export interface book_table_admin extends book_table {
  //   record:string | null,
  //   feedback: string|null,
  //   status: boolean
  // }

  export interface Data_ReserTable {
    list: book_table[];
    totalElement: number;
    totalElementPage: number;
}