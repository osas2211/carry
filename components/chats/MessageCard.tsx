import { View, Text, Image } from "react-native"
import React from "react"
import { Message } from "@/@types/chat"
import { appColors } from "@/constants/Colors"
import moment from "moment"
import { Ionicons } from "@expo/vector-icons"

const MessageCard = ({ message }: { message: Message }) => {
  const is_me = message.sender_id === "123456789"
  return (
    <View
      style={{
        marginBottom: 20,
        alignItems: is_me ? "flex-end" : "flex-start",
        width: "100%",
      }}
    >
      {message?.image_url && (
        <Image
          src={message?.image_url}
          style={{
            width: "90%",
            height: 200,
            objectFit: "cover",
            borderRadius: 10,
            marginBottom: 5,
          }}
        />
      )}
      {message?.message && (
        <View
          style={{
            backgroundColor: is_me ? "#d1fc88" : appColors.grey,
            width: "90%",
            padding: 15,
            // minHeight: 100,
            borderRadius: 15,
            borderStartStartRadius: is_me ? 15 : 0,
            borderEndEndRadius: is_me ? 0 : 15,
          }}
        >
          <Text style={{ lineHeight: 20, fontSize: 13.5 }}>
            {message?.message}
          </Text>
        </View>
      )}
      <View style={{ flexDirection: "row", gap: 5, marginTop: 5 }}>
        <Text style={{ fontWeight: 400, fontSize: 11, marginTop: 1.5 }}>
          {moment(message.createdAt).format("LT")}
        </Text>
        <>
          {is_me ? (
            <>
              {!message?.delivered ? (
                <Ionicons name="checkmark" size={20} color="black" />
              ) : (
                <Ionicons
                  name="checkmark-done"
                  size={20}
                  color={message?.is_read ? appColors.blue : "black"}
                />
              )}
            </>
          ) : (
            <></>
          )}
        </>
      </View>
    </View>
  )
}

export default MessageCard
