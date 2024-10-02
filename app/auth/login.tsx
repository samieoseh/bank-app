import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Input, Text, YStack } from "tamagui";
import { Link, useRouter } from "expo-router";
import StyledButton from "@/components/ui/button";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin@123");
  const router = useRouter();

  return (
    <View style={styles.container}>
      <YStack
        padding="$3"
        gap="$2"
        style={{
          width: "100%",
        }}
      >
        <Text
          style={{
            textAlign: "left",
            width: "100%",
          }}
          fontSize="$8"
          fontWeight="900"
        >
          Sign In
        </Text>
        <Text fontSize="$2">
          Start using the app by signing into your account
        </Text>
      </YStack>

      <YStack
        padding="$3"
        gap="$3"
        style={{
          width: "100%",
          marginHorizontal: "auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Input
          placeholder="Username"
          style={styles.input}
          keyboardType="default"
          onChangeText={(text) => {
            setUsername(text);
          }}
          value={username}
        />
        <Input
          placeholder="Enter the 6-digit password"
          style={styles.input}
          keyboardType="default"
          secureTextEntry
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
        />
        {login.error && (
          <Text style={{ color: "red" }}>{login.error.response?.data}</Text>
        )}
        <StyledButton
          buttonStyle={{
            width: "100%",
            backgroundColor: login.isPending ? "#D3D3D3" : "#0EBC60",
            borderColor: login.isPending ? "#D3D3D3" : "#0EBC60",
          }}
          disabled={login.isPending}
          onPress={() => {
            login.mutate({ username, password });
          }}
        >
          {login.isPending ? "Please wait..." : "Sign In"}
        </StyledButton>
      </YStack>

      <YStack
        padding="$3"
        gap="$2"
        style={{
          width: "100%",
          marginHorizontal: "auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Don't have an account yet</Text>
        <Link href="/auth/login">
          <Text
            style={{
              color: "#0EBC60",
              fontWeight: "900",
            }}
          >
            Click here to register
          </Text>
        </Link>
      </YStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginHorizontal: "auto",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    width: "100%",
    height: 50,
    borderRadius: 4,
    padding: 8,
  },
});
