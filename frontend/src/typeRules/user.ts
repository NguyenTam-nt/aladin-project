export enum StatusUser {
    "Block" = 0,
    "Active" = 1,
}

export interface IUser {
    authorities: any;
    "id": number,
    "username": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "password": "string",
    "phone": "string",
    "userStatus": StatusUser
  }