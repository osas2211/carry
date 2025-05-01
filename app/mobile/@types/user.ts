export interface CreateUserDTO {
  username?: string,
  role: UserRole,
  walletAddress: string,
  avatarUrl?: string,
  email?: string,
  bio?: string,

}

export enum UserRole {
  COURIER = "COURIER",
  NORMAL_USER = "NORMAL_USER"
}