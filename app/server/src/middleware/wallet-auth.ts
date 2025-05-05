import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import * as nacl from 'tweetnacl'
import bs58 from 'bs58'
import { PublicKey } from '@solana/web3.js'
import * as dotenv from 'dotenv'

dotenv.config()

declare global {
  namespace Express {
    interface Request {
      publicKey?: string
    }
  }
}

@Injectable()
export class WalletAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    const messageHeader = req.headers['x-wallet-message']
    const publicKey = req.headers['x-wallet-address'] as string

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or malformed authorization header')
    }

    if (!messageHeader || typeof messageHeader !== 'string') {
      throw new UnauthorizedException('Missing or invalid wallet message')
    }

    const signature = authHeader.replace('Bearer ', '')
    const message = decodeURIComponent(messageHeader)
    const expectedMessage = process.env.WALLET_AUTH_MESSAGE || "Sign in to SpeedFi with your wallet"

    if (!signature || !message || !publicKey) {
      throw new UnauthorizedException('Missing wallet auth headers')
    }

    if (message !== expectedMessage) {
      throw new UnauthorizedException('Message mismatch')
    }

    try {
      const messageBytes = new TextEncoder().encode(message)
      const signatureBytes = bs58.decode(signature)
      const pubKeyBytes = new PublicKey(publicKey).toBytes()

      // Defensive checks before verification
      if (signatureBytes.length !== 64) {
        throw new UnauthorizedException('Invalid signature length')
      }

      if (pubKeyBytes.length !== 32) {
        throw new UnauthorizedException('Invalid public key length')
      }

      const isValid = nacl.sign.detached.verify(messageBytes, signatureBytes, pubKeyBytes)

      if (!isValid) {
        throw new UnauthorizedException('Invalid wallet signature')
      }

      req.publicKey = publicKey
      // console.log(req.publicKey)
      // console.log('✅ Wallet signature verified:', publicKey)
      next()
    } catch (err) {
      console.error('❌ Wallet verification error:', err)
      throw new UnauthorizedException('Signature verification failed')
    }
  }
}
