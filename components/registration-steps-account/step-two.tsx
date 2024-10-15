import { View } from "react-native";
import React, { useState } from "react";
import { Input, Text } from "tamagui";
import { Eye, EyeOff } from "lucide-react-native";
import styles from "@/app/auth/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserUpdateRegistrationData,
  setUserUpdateRegistrationData,
} from "@/store/authSlice";
import { RootState } from "@/store";
import ActionButton from "../registration-steps/action-button";

export default function StepTwo({
  incrementStep,
}: {
  incrementStep: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const userUpdateRegistrationData = useSelector((state: RootState) =>
    selectUserUpdateRegistrationData(state)
  );

  const canContinue = () => {
    return (
      userUpdateRegistrationData.username.length >= 8 &&
      userUpdateRegistrationData.password.length >= 8 &&
      userUpdateRegistrationData.password ===
        userUpdateRegistrationData.confirmPassword
    );
  };

  return (
    <View>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            color: "#A5A5A5",
          }}
        >
          Username
        </Text>

        <Input
          placeholder="Username"
          style={{
            ...styles.input,
            marginTop: 5,
          }}
          keyboardType="default"
          onChangeText={(text) => {
            dispatch(setUserUpdateRegistrationData({ username: text }));
          }}
          value={userUpdateRegistrationData.username}
        />
      </View>

      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            color: "#A5A5A5",
          }}
        >
          Password
        </Text>
        <Input
          placeholder="Enter password"
          style={{ ...styles.input, marginTop: 5 }}
          keyboardType="default"
          secureTextEntry={!showPassword}
          onChangeText={(text) => {
            dispatch(setUserUpdateRegistrationData({ password: text }));
          }}
          value={userUpdateRegistrationData.password}
        />
        {!showPassword ? (
          <Eye
            stroke="#444444"
            style={{
              position: "absolute",
              right: 10,
              top: 33,
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
              top: 33,
            }}
            onPress={() => {
              setShowPassword(false);
            }}
          />
        )}
      </View>

      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            color: "#A5A5A5",
          }}
        >
          Confirm Password
        </Text>
        <Input
          placeholder="Enter password"
          style={{ ...styles.input, marginTop: 5 }}
          keyboardType="default"
          secureTextEntry={!showConfirmPassword}
          onChangeText={(text) => {
            dispatch(setUserUpdateRegistrationData({ confirmPassword: text }));
          }}
          value={userUpdateRegistrationData.confirmPassword}
        />
        {!showConfirmPassword ? (
          <Eye
            stroke="#444444"
            style={{
              position: "absolute",
              right: 10,
              top: 33,
            }}
            onPress={() => {
              setShowConfirmPassword(true);
            }}
          />
        ) : (
          <EyeOff
            stroke="#444444"
            style={{
              position: "absolute",
              right: 10,
              top: 33,
            }}
            onPress={() => {
              setShowConfirmPassword(false);
            }}
          />
        )}
      </View>

      <ActionButton
        canContinue={() => canContinue()}
        pressHandler={async () => {
          incrementStep();
        }}
      />
    </View>
  );
}
