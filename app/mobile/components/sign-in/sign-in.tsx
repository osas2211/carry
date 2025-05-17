import { useState, useCallback } from "react"
import { alertAndLog } from "@/utils/alertAndLog"
import { useAuthorization } from "@/utils/useAuthorization"
import { useMobileWallet } from "@/utils/useMobileWallet"
import { Button } from "../ui/Button"
import { generateUserToken } from "@/services/user.service"
import {
  BASE_58_PUBLIC_KEY,
  HAS_ONBOARDED,
  SERVER_AUTH_TOKEN,
  USER_PUBLIC_KEY,
  USER_ROLE,
} from "@/constants/key_strings"
import { api } from "@/api/api.instance"
import { UserProfile } from "@/@types/user"
import { router } from "expo-router"
import { saveValue } from "@/helpers/secureStoreHelpers"
import { appColors } from "@/constants/Colors"
import { Avatar, IconAvatar } from "../ui/Avatar"

export function SignInButton() {
  const { authorizeSession } = useAuthorization()
  const { signIn } = useMobileWallet()
  const [signInInProgress, setSignInInProgress] = useState(false)
  const handleConnectPress = useCallback(async () => {
    try {
      if (signInInProgress) {
        return
      }
      setSignInInProgress(true)

      let wallet = await signIn({
        domain: "carry.com",
        statement: "Sign into Carry",
        uri: "https://carry.com",
      })

      const publicKey = wallet.publicKey?.toString() || ""
      const serverToken = await generateUserToken(publicKey)
      saveValue(USER_PUBLIC_KEY, publicKey)
      saveValue(BASE_58_PUBLIC_KEY, wallet.publicKey?.toBase58() || "")
      saveValue(SERVER_AUTH_TOKEN, serverToken.token)

      await handleWalletConnection(publicKey)
    } catch (err: any) {
      alertAndLog(
        "Error during sign in",
        err instanceof Error ? err.message : err
      )
    } finally {
      setSignInInProgress(false)
    }
  }, [signInInProgress, authorizeSession])

  const handleWalletConnection = async (pubKey: string) => {
    try {
      const data: UserProfile = (await api.get(`/users/${pubKey}`)).data
      saveValue(USER_ROLE, data.role)
      console.log("COnnected")
      saveValue(HAS_ONBOARDED, "true")
      router.replace("/")
    } catch (error: any) {
      console.log(error?.message)
      if (error?.status == 404) {
        router.push("/onboarding")
      }
    }
  }

  return (
    <Button
      icon={
        <Avatar
          src={require("../../assets/images/solona.png")}
          size={25}
          forSource
        />
      }
      title="Connect wallet"
      disabled={signInInProgress}
      onPress={handleConnectPress}
      bgColor={appColors.primary}
      // textColor={appColors.primary}
      elevation={4}
    />
  )
}
