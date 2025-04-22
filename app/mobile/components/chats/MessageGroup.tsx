import {
  View,
  Text,
  FlatList,
  ScrollView,
  SectionList,
  SectionListRenderItemInfo,
  SectionListData,
} from "react-native"
import React, { useEffect, useRef } from "react"
import { Message } from "@/@types/chat"
import MessageCard from "./MessageCard"
import { appColors } from "@/constants/Colors"
import { GroupedMessages } from "@/utils/getMesssagesByDateGroup"

const MessageGroup = ({
  grouped_message,
}: {
  grouped_message: GroupedMessages[]
}) => {
  const sectionListRef = useRef<SectionList>(null)
  // Format for SectionList
  const sections = grouped_message.map((group) => ({
    title: group.date,
    data: group.messages.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    ),
  }))

  return (
    <View style={{ gap: 15, marginBottom: 100, minHeight: "86%" }}>
      {/* <ScrollView>
        
      </ScrollView> */}
      <SectionList
        ref={sectionListRef}
        sections={sections}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `${item.sender_id}_${index}`}
        renderItem={({ item, index }: SectionListRenderItemInfo<Message>) => (
          <MessageCard key={index} message={item} />
        )}
        renderSectionHeader={({ section }) => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontWeight: 600,
                textAlign: "center",
                backgroundColor: appColors.grey,
                padding: 5,
                paddingInline: 10,
                borderRadius: 7,
              }}
            >
              {section.title}
            </Text>
          </View>
        )}
        // onContentSizeChange={() => {
        //   sectionListRef.current?.scrollToLocation({
        //     animated: true,
        //     sectionIndex: 0,
        //     itemIndex: 0,
        //   })
        // }}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  )
}

export default MessageGroup
