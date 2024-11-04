import { View, Text } from "react-native";
import React from "react";
import { Button } from "tamagui";
import homeStyles from "@/style/home-style";
import { useAuth } from "@/hooks/useAuth";

export default function settings() {
  const { logout } = useAuth();
  return (
    <View style={homeStyles.box}>
      <Button onPress={() => logout()}>Logout</Button>
    </View>
  );
}
