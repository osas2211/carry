import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol"

export const connectWallet = async () => {
  await transact(async (wallet) => {
    const authResult = await wallet.authorize({
      cluster: "devnet",
      identity: { name: "Solana Counter Incrementor" },
    }) // Authorizes the wallet

    const authToken = authResult.auth_token // save this for the wallet.reauthorize() function
    const publicKey = authResult.sign_in_result?.address
  })
}