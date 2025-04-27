export interface CreateUserDTO {
  name: string,
  role: UserRole,
  address: string,
  avatar: string
}

export enum UserRole {
  RIDER = "RIDER",
  NORMAL_USER = "NORMAL_USER"
}