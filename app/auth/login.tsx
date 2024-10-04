import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Input, Text, YStack } from "tamagui";
import { Link, useRouter } from "expo-router";
import StyledButton from "@/components/ui/button";
import { useAuth } from "../context/AuthContext";
import styles from "./styles";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("samieoseh");
  const [password, setPassword] = useState("12345678");

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          padding: 10,
          gap: 3,
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
      </View>

      <View
        style={{
          width: "100%",
          marginHorizontal: "auto",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          gap: 8,
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
          placeholder="Enter password"
          style={styles.input}
          keyboardType="default"
          secureTextEntry
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
        />
        {login.error && (
          <Text style={{ color: "red" }}>
            {login.error.response?.data || login.error.message}
          </Text>
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
      </View>

      <View
        style={{
          width: "100%",
          marginHorizontal: "auto",
          justifyContent: "center",
          alignItems: "center",
          padding: 3,
          gap: 5,
        }}
      >
        <Text>Don't have an account yet</Text>
        <Link href="/auth/signup">
          <Text
            style={{
              color: "#0EBC60",
              fontWeight: "900",
            }}
          >
            Click here to register
          </Text>
        </Link>
      </View>
    </View>
  );
}

