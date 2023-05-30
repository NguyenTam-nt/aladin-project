export enum StatusUser {
  "Block" = 0,
  "Active" = 1,
}

export enum RoleUser {
    ADMIN = "ROLE_ADMIN",
    USER = "ROLE_USER",
}

export interface IUser {
  role?: RoleUser;
  id: number;
  username: "string";
  firstName: "string";
  lastName: "string";
  email: "string";
  password: "string";
  phone: "string";
  userStatus: StatusUser;
}
