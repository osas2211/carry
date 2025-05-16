import nacl from 'tweetnacl';
import bs58 from 'bs58';
import { PublicKey } from '@solana/web3.js';

// verifySignature returns true if `sig` is a valid signature of `message` by `pubkey`
export function verifySignature({
  pubkey, // Base58 string, e.g. "3Nd1…"
  message, // the exact string you signed
  signature, // Base58 string returned by wallet.signMessages
}: {
  pubkey: string;
  message: string;
  signature: string;
}): boolean {
  // 1) turn everything into Uint8Arrays
  const messageBytes = new TextEncoder().encode(message);
  const sigBytes = bs58.decode(signature);
  const pubkeyBytes = new PublicKey(pubkey);

  // 2) verify with tweetnacl
  return nacl.sign.detached.verify(
    messageBytes,
    sigBytes,
    pubkeyBytes.toBytes(),
  );
}
