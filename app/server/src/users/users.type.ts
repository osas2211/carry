import { Role } from '@prisma/client';

export interface CreateUserDTO {
  username?: string;
  role: Role;
  walletAddress: string;
  avatarUrl?: string;
  email?: string;
  bio?: string;
}
