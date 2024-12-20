import { View } from "react-native";
import React, { useState } from "react";
import { Input, Text } from "tamagui";
import { Link, useRouter } from "expo-router";
import StyledButton from "@/components/ui/button";
import { AuthContextProps } from "../context/AuthContext";
import styles from "./styles";
import { Eye, EyeOff } from "lucide-react-native";
import socket from "../../socket";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth() as AuthContextProps;
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("samie");
  const [password, setPassword] = useState("samie");

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
        <View
          style={{
            width: "100%",
            position: "relative",
          }}
        >
          <Input
            placeholder="Enter password"
            style={{ ...styles.input, paddingRight: 45 }}
            keyboardType="default"
            secureTextEntry={!showPassword}
            onChangeText={(text) => {
              setPassword(text);
            }}
            value={password}
          />
          {!showPassword ? (
            <Eye
              stroke="#444444"
              style={{
                position: "absolute",
                right: 10,
                top: 15,
              }}
              onPress={() => {
                setShowPassword(true);
              }}
            />
          ) : (
            <EyeOff
              stroke="#444444"
              style={{
                position: "absolute",
                right: 10,
                top: 15,
              }}
              onPress={() => {
                setShowPassword(false);
              }}
            />
          )}
        </View>
        {login.error && (
          <Text style={{ color: "red" }}>
            {login.error.response?.data || login.error.message}
          </Text>
        )}
        <StyledButton
          buttonStyle={{
            width: "100%",
            backgroundColor: login.isPending ? "#D3D3D3" : "#008080",
            borderColor: login.isPending ? "#D3D3D3" : "#008080",
          }}
          disabled={login.isPending}
          onPress={() => {
            login.mutate(
              { username, password },
              {
                onSuccess: ({ user }) => {
                  console.log({ user });
                  socket.emit("login", user);
                  router.push("/(app)/(tabs)/");
                },
              }
            );
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
              color: "#008080",
              textDecorationLine: "underline",
            }}
            fontWeight="900"
          >
            Click here to register
          </Text>
        </Link>
        <Text>Or</Text>
        <Link href="/auth/register-with-account">
          <Text
            style={{
              color: "#008080",
              textDecorationLine: "underline",
            }}
            fontWeight="900"
          >
            Register with account number
          </Text>
        </Link>
      </View>
    </View>
  );
}
