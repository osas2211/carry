import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { PublicKey } from '@solana/web3.js'

// Replace with the public key or keySet Solana Mobile uses to sign auth tokens (or fetch from JWKS URL)
const WALLET_AUTH_PUBLIC_KEY = process.env.WALLET_AUTH_PUBLIC_KEY || ''

@Injectable()
export class WalletAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    const walletAddress = req.headers["x-wallet-address"]

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or malformed authorization header')
    }

    const token = authHeader.replace('Bearer ', '')

    try {
      // ⚠️ This part depends on how the wallet signs the JWT.
      // You might need to fetch the key or validate with a public key set or endpoint.
      const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY || "")
      const decoded: { pubKey: string } = JSON.parse(JSON.stringify(verifiedToken) as string)
      // console.log(token, decoded)

      if (!decoded?.pubKey) {
        throw new UnauthorizedException('Invalid wallet token')
      }
      if (decoded.pubKey !== walletAddress) {
        throw new UnauthorizedException("Wallet address doesn't match")

      }

      req.publicKey = decoded.pubKey
      next()
    } catch (err) {
      console.error('❌ Auth token verification failed:', err)
      throw new UnauthorizedException('Invalid wallet authorization token')
    }
  }
}
