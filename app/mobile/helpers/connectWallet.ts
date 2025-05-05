import {
  SolanaMobileWalletAdapter,
  createDefaultAddressSelector,
  createDefaultAuthorizationResultCache,
} from '@solana-mobile/wallet-adapter-mobile'
import { saveValue } from "./secureStoreHelpers"
import { AUTH_TOKEN, BASE_58_PUBLIC_KEY, SIGNATURE, SIGNATURE_MESSAGE, USER_PUBLIC_KEY } from "@/constants/key_strings"
import bs58 from 'bs58'

const authorizationResultCache = createDefaultAuthorizationResultCache()
const addressSelector = createDefaultAddressSelector()

export const wallet = new SolanaMobileWalletAdapter({
  appIdentity: {
    name: 'SpeedFi',
    // icon: 'https://res.cloudinary.com/osaretinfrank/image/upload/v1744061454/sourcifyai_logo_ep6fzt.jpg',
    uri: "https://www.zhap.org/"
  },
  authorizationResultCache,
  // chain: "testnet",
  cluster: "testnet",
  addressSelector: addressSelector,
  onWalletNotFound: async (mobileWalletAdapter) => {
    console.error('Wallet not found')
    return Promise.resolve()
  },

})

const message = "Sign in to SpeedFi with your wallet"

export const connectWallet = async () => {
  let pubKey: string = ""
  let token: string = ""
  await wallet.disconnect()
  const data = await wallet.performAuthorization()
  const encodedMessage = new TextEncoder().encode(message)
  const signedMessage = await wallet.signMessage(encodedMessage)
  const signature = bs58.encode(signedMessage)
  const authToken = data.auth_token // save this for the wallet.reauthorize() function


  const publicKey = wallet.publicKey?.toString() || ""
  // console.log(wallet.publicKey)
  pubKey = publicKey
  token = authToken
  saveValue(USER_PUBLIC_KEY, String(publicKey))
  saveValue(BASE_58_PUBLIC_KEY, String(wallet.publicKey?.toBase58()))
  saveValue(AUTH_TOKEN, String(authToken))
  saveValue(SIGNATURE, String(signature))
  saveValue(SIGNATURE_MESSAGE, String(encodeURIComponent(message)))



  return { pubKey, token }
}