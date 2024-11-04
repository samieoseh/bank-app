import { Image, View } from "react-native";
import { Button, Text } from "tamagui";
import React from "react";
import { Redirect, useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { AuthContextProps } from "./context/AuthContext";

export default function Index() {
  const router = useRouter();
  const { authState } = useAuth() as AuthContextProps;

  if (authState?.waitAuthCheck) {
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: 900,
            textAlign: "center",
            color: "#008080",
          }}
        >
          Loading...
        </Text>
      </View>
    );
  }

  if (authState?.authenticated) {
    return <Redirect href="/(app)/(tabs)/" />;
  }

  return (
    <View
      style={{
        paddingTop: 90,
        width: "90%",
        height: "100%",
        marginHorizontal: "auto",
      }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/images/signup hero.png")}
          style={{ width: 300, height: 300 }}
        />
      </View>
      <View>
        <Text
          style={{
            marginTop: 16,
            fontSize: 24,
            fontWeight: 900,
            textAlign: "center",
          }}
        >
          Send and recieve money
        </Text>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 900,
            textAlign: "center",
          }}
        >
          effortlessly
        </Text>
      </View>
      <View>
        <Text
          style={{
            marginTop: 12,
            fontSize: 14,
            fontWeight: 400,
            textAlign: "center",
          }}
        >
          Fast, Secure and Easy Transfers
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 32,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 100,
        }}
      >
        <Button
          style={{
            flex: 1,
            backgroundColor: "#fff",
            borderColor: "#008080",
            borderWidth: 1,
            color: "#008080",
          }}
          hoverStyle={{ borderColor: "#008080" }}
          pressStyle={{ borderColor: "#008080" }}
          onPress={() => {
            router.push("/auth/login");
          }}
        >
          Login
        </Button>
        <Button
          style={{
            flex: 1,
            color: "#fff",
            backgroundColor: "#008080",
            borderWidth: 1,
            borderColor: "#008080",
          }}
          onPress={() => {
            router.push("/auth/signup");
          }}
          hoverStyle={{ backgroundColor: "#008080", borderColor: "#008080" }}
          pressStyle={{ backgroundColor: "#008080", borderColor: "#008080" }}
        >
          Sign up
        </Button>
      </View>
    </View>
  );
}
