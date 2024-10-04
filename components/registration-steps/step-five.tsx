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

export default function StepFive({
  incrementStep,
}: {
  incrementStep: () => void;
}) {
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
      <Input
        placeholder="Password"
        style={{
          ...styles.input,
          marginTop: 20,
        }}
        keyboardType="default"
        secureTextEntry
        onChangeText={(text) => {
          dispatch(setUserRegistrationData({ password: text }));
        }}
        value={registrationData.password}
      />
      <Input
        placeholder="Confirm Password"
        style={{
          ...styles.input,
          marginTop: 20,
        }}
        keyboardType="default"
        secureTextEntry
        onChangeText={(text) => {
          dispatch(setUserRegistrationData({ confirmPassword: text }));
        }}
        value={registrationData.confirmPassword}
      />
      <ActionButton
        canContinue={canContinue}
        pressHandler={async () => {
          incrementStep();
        }}
      />
    </View>
  );
}
