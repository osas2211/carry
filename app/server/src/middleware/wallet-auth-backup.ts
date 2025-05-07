import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import * as nacl from 'tweetnacl'
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

    const signatureBase64 = authHeader.replace('Bearer ', '').trim()
    const message = decodeURIComponent(messageHeader)

    try {
      const signatureBytes = Uint8Array.from(Buffer.from(signatureBase64, 'base64'))
      const messageBytes = new TextEncoder().encode(message)
      const pubKeyBytes = new PublicKey(publicKey).toBytes()

      // Defensive checks
      if (signatureBytes.length !== 64) {
        throw new UnauthorizedException('Invalid signature length')
      }
      console.log(req.headers)

      const isValid = nacl.sign.detached.verify(messageBytes, signatureBytes, pubKeyBytes)

      if (!isValid) {
        throw new UnauthorizedException('Invalid wallet signature')
      }

      req.publicKey = publicKey
      next()
    } catch (err) {
      console.error('❌ Wallet verification error:', err)
      throw new UnauthorizedException('Signature verification failed')
    }
  }
}
