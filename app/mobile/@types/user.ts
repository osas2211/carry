export interface CreateUserDTO {
  username?: string;
  role: UserRole;
  walletAddress: string;
  avatarUrl?: string;
  email?: string;
  bio?: string;
  signedMessage?: string;
}

export enum UserRole {
  COURIER = "COURIER",
  NORMAL_USER = "NORMAL_USER",
}

export interface UserProfile {
  id: string;
  walletAddress: string;
  username: string;
  role: UserRole;
  email: string | null;
  phone: string | null;
  avatarUrl: string | null;
  bio: string | null;
  lat: number | null;
  lng: number | null;
  reputationScore: number;
  reviewsCount: number;
  jobsCompleted: number;
  jobsPosted: number;
  earningsTotal: number;
  distanceTravelledKm: number;
  kycVerified: boolean;
  kycDocumentUrl: string | null;
  kycVerifiedAt: string | null;
  createdAt: string; // ISO date string
  updatedAt: string;

  reputation: {
    score: number;
    reviewsCount: number;
  };

  stats: {
    jobsCompleted: number;
    jobsPosted: number;
    earningsTotal: number;
    distanceTravelledKm: number;
  };
}
