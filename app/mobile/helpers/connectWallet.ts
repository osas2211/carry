import {
  SolanaMobileWalletAdapter,
  createDefaultAddressSelector,
  createDefaultAuthorizationResultCache,
} from '@solana-mobile/wallet-adapter-mobile'
import { saveValue } from "./secureStoreHelpers"
import { AUTH_TOKEN, USER_PUBLIC_KEY } from "@/constants/key_strings"

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


export const connectWallet = async () => {
  let pubKey: string = ""
  let token: string = ""
  await wallet.disconnect()
  const data = await wallet.performAuthorization()
  const authToken = data.auth_token // save this for the wallet.reauthorize() function

  const publicKey = wallet.publicKey?.toString() || ""
  // console.log(wallet.publicKey)
  pubKey = publicKey
  token = authToken
  saveValue(USER_PUBLIC_KEY, String(publicKey))
  saveValue(AUTH_TOKEN, String(authToken))


  return { pubKey, token }
}