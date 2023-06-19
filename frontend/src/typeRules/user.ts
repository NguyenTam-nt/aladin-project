export enum RoleUser {
  ADMIN = "ROLE_ADMIN",
  USER = "ROLE_USER",
}

export interface IUser {
  id: string;
  phone: string;
  fullname: string;
  imageUrl: string;
  authorities: {name: RoleUser}[];
}
