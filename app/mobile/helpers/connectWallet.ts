import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol"
import { saveValue } from "./secureStoreHelpers"
import { AUTH_TOKEN, USER_PUBLIC_KEY } from "@/constants/key_strings"

export const connectWallet = async () => {
  await transact(async (wallet) => {
    const authResult = await wallet.authorize({
      cluster: "devnet",
      identity: { name: "SpeedFi", icon: "../assets/images/icon.png" },
    }) // Authorizes the wallet

    const authToken = authResult.auth_token // save this for the wallet.reauthorize() function
    const publicKey = authResult.accounts[0]?.address
    saveValue(USER_PUBLIC_KEY, String(publicKey))
    saveValue(AUTH_TOKEN, String(authToken))
  })
}