export enum StatusUser {
  "Block" = 0,
  "Active" = 1,
}

export enum RoleUser {
  SYSTEM = "ROLE_SYSTEM",
  ADMIN = "ROLE_ADMIN",
  USER = "ROLE_USER",
}

export interface IUser {
  id?: string
  email?: string
  login?: string
  password?: string
  fullname?: string
  yearOfBirth?: string
  gender?: string
  position?: string
  phoneNumber?: string
  imageUrl?: string
  role?: RoleUser
}
