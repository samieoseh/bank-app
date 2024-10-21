import { View } from "react-native";
import React from "react";
import { Image, Text } from "tamagui";

export default function Favorite({
  data,
}: {
  data: { firstName: string; lastName: string };
}) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-start",
        padding: 8,
        gap: 8,
      }}
    >
      <View
        style={{
          borderRadius: 24,
          overflow: "hidden",
          width: 48,
          height: 48,
        }}
      >
        <Image
          source={{
            uri: "https://picsum.photos/200/300",
          }}
          style={{
            width: 48,
            height: 48,
          }}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          fontSize="$3"
          fontWeight="500"
          style={{ color: "#111", marginBottom: 0, lineHeight: 18 }}
        >
          {data.lastName}
        </Text>
        <Text
          fontSize="$3"
          fontWeight="500"
          style={{ color: "#111", marginBottom: 0, lineHeight: 18 }}
        >
          {data.firstName}
        </Text>
      </View>
    </View>
  );
}
