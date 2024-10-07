import { View } from "react-native";
import React, { useState } from "react";
import { Input, Text } from "tamagui";
import styles from "@/app/auth/styles";
import ActionButton from "./action-button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  selectUserRegistrationData,
  setUserRegistrationData,
} from "@/store/authSlice";
import { Eye, EyeOff } from "lucide-react-native";

export default function StepFive({
  incrementStep,
}: {
  incrementStep: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const registrationData = useSelector((state: RootState) =>
    selectUserRegistrationData(state)
  );

  const dispatch: AppDispatch = useDispatch();

  const canContinue = () => {
    return (
      registrationData.password.length >= 8 &&
      registrationData.password === registrationData.confirmPassword
    );
  };

  return (
    <View
      style={{
        height: "100%",
      }}
    >
      <View
        style={{
          paddingVertical: 15,
          gap: 10,
        }}
      >
        <Text fontSize="$6" fontWeight="900">
          Create your password
        </Text>
        <Text fontSize="$2">Please enter a strong password</Text>
      </View>
      <View
        style={{
          width: "100%",
          marginHorizontal: "auto",
          position: "relative",
          marginTop: 20,
        }}
      >
        <Input
          placeholder="Password"
          style={{
            ...styles.input,
            paddingRight: 45,
          }}
          keyboardType="default"
          secureTextEntry={!showPassword}
          onChangeText={(text) => {
            dispatch(setUserRegistrationData({ password: text }));
          }}
          value={registrationData.password}
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

      <View
        style={{
          width: "100%",
          marginHorizontal: "auto",
          position: "relative",
          marginTop: 20,
        }}
      >
        <Input
          placeholder="Confirm Password"
          style={{
            ...styles.input,
            paddingRight: 45,
          }}
          keyboardType="default"
          secureTextEntry={!showConfirmPassword}
          onChangeText={(text) => {
            dispatch(setUserRegistrationData({ confirmPassword: text }));
          }}
          value={registrationData.confirmPassword}
        />
        {!showConfirmPassword ? (
          <Eye
            stroke="#444444"
            style={{
              position: "absolute",
              right: 10,
              top: 15,
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
              top: 15,
            }}
            onPress={() => {
              setShowConfirmPassword(false);
            }}
          />
        )}
      </View>

      <ActionButton
        canContinue={canContinue}
        pressHandler={async () => {
          incrementStep();
        }}
      />
    </View>
  );
}
