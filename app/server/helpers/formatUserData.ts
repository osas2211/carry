import { User } from "@prisma/client"

export const formatUserData = (user: User) => {
  return {
    ...user,
    reputation: {
      score: user.reputationScore,
      reviewsCount: user.reviewsCount,
    },
    stats: {
      jobsCompleted: user.jobsCompleted,
      jobsPosted: user.jobsPosted,
      earningsTotal: user.earningsTotal,
      distanceTravelledKm: user.distanceTravelledKm,
    }
  }
}