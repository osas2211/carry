import {
  SolanaMobileWalletAdapter,
  createDefaultAddressSelector,
  createDefaultAuthorizationResultCache,
} from '@solana-mobile/wallet-adapter-mobile'
import { saveValue } from "./secureStoreHelpers"
import {
  AUTH_TOKEN,
  BASE_58_PUBLIC_KEY,
  SERVER_AUTH_TOKEN,
  SIGNATURE,
  SIGNATURE_MESSAGE,
  USER_PUBLIC_KEY
} from "@/constants/key_strings"
import { generateUserToken } from '@/services/user.service'

const authorizationResultCache = createDefaultAuthorizationResultCache()
const addressSelector = createDefaultAddressSelector()

// @ts-ignore 
export const wallet = new SolanaMobileWalletAdapter({
  appIdentity: {
    name: 'Carry',
    // uri: "https://www.zhap.org/", 
  },
  authorizationResultCache,
  cluster: "testnet",
  // chain: "testnet",

  addressSelector,
  onWalletNotFound: async () => {
    console.error('Wallet not found')
    return Promise.resolve()
  },
})


export const connectWallet = async () => {
  await wallet.disconnect()

  const authData = await wallet.performAuthorization({
    statement: "Sign in to Carry with your wallet",
  })
  // console.log(authData)

  const publicKey = wallet.publicKey?.toString() || ""
  const authToken = authData.auth_token

  if (!authToken) {
    throw new Error("Missing auth token from wallet authorization")
  }

  const serverToken = await generateUserToken(publicKey)

  saveValue(USER_PUBLIC_KEY, publicKey)
  saveValue(BASE_58_PUBLIC_KEY, wallet.publicKey?.toBase58() || "")
  saveValue(AUTH_TOKEN, authToken)
  saveValue(SERVER_AUTH_TOKEN, serverToken.token)

  return { pubKey: publicKey, token: authToken }
}
