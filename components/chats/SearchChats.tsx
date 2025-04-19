import { View, Text, TextInput } from "react-native"
import React from "react"
import { appColors } from "@/constants/Colors"
import AntDesign from "@expo/vector-icons/AntDesign"
import { Input } from "../ui/Input"

export const SearchChats = () => {
  return (
    <>
      <Input
        icon={<AntDesign name="search1" size={24} color="#A5A5A5" />}
        placeholder="Search"
      />
    </>
  )
}
